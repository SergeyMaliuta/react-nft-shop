import React from "react"
import { Routes, Route } from "react-router-dom"
import axios from "axios"
import Header from "./components/Header"
import Drawer from "./components/Drawer"
import AppContext from "./context"

import Home from "./pages/Home"
import Orders from "./pages/Orders"

function App() {
  const [items, setItems] = React.useState([])
  const [cartItems, setCartItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, itemsResponse] = await Promise.all([
          axios.get("https://61e3b9f4fbee6800175eb0b4.mockapi.io/cart"),
          axios.get("https://61e3b9f4fbee6800175eb0b4.mockapi.io/items"),
        ])

        setIsLoading(false)
        setCartItems(cartResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert("Error requesting data")
        console.error(error)
      }
    }

    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(
        (item) => Number(item.parentId) === Number(obj.id)
      )
      if (findItem) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.parentId) !== Number(obj.id))
        )
        await axios.delete(
          `https://61e3b9f4fbee6800175eb0b4.mockapi.io/cart/${findItem.id}`
        )
      } else {
        setCartItems((prev) => [...prev, obj])
        const { data } = await axios.post(
          "https://61e3b9f4fbee6800175eb0b4.mockapi.io/cart",
          obj
        )
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              }
            }
            return item
          })
        )
      }
    } catch (error) {
      alert("Error adding to cart")
      console.error(error)
    }
  }

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://61e3b9f4fbee6800175eb0b4.mockapi.io/cart/${id}`)
      setCartItems((prev) =>
        prev.filter((item) => Number(item.id) !== Number(id))
      )
    } catch (error) {
      alert("Error when deleting from cart")
      console.error(error)
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        isItemAdded,
        onAddToCart,
        setCartOpened,
        setCartItems,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          items={cartItems}
          onClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
          opened={cartOpened}
        />

        <Header onClickCart={() => setCartOpened(true)} />

        <Routes>
          <Route
            path=""
            exact
            element={
              <Home
                items={items}
                cartItems={cartItems}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                onChangeSearchInput={onChangeSearchInput}
                onAddToCart={onAddToCart}
                isLoading={isLoading}
              />
            }
          ></Route>
        </Routes>

        <Routes>
          <Route path="orders" exact element={<Orders />}></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App
