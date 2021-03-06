import React from "react"
import { Link } from "react-router-dom"

import { useCart } from "../hooks/useCart"

function Header(props) {
  const { totalPrice } = useCart()

  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to="/">
        <div className="d-flex align-center">
          <img src="/img/logo.svg" alt="Logo" />
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img width={18} height={18} src="img/cart.svg" alt="Cart" />
          <span>
            {totalPrice}
            <img width={12} height={12} src="/img/weth.svg" alt="Price" />
          </span>
        </li>
        <li>
          <Link to="/orders">
            <img width={18} height={18} src="img/user.svg" alt="User" />
          </Link>
        </li>
      </ul>
    </header>
  )
}

export default Header
