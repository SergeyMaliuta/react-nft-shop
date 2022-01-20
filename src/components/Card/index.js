import React from "react"
import ContentLoader from "react-content-loader"

import AppContext from "../../context"

import styles from "./Card.module.scss"

function Card({ id, title, imageUrl, price, onPlus, loading = false }) {
  const { isItemAdded } = React.useContext(AppContext)

  const obj = { id, parentId: id, title, imageUrl, price }

  const onClickPlus = () => {
    onPlus(obj)
  }

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={220}
          height={260}
          viewBox="0 0 270 280"
          backgroundColor="#4C2349"
          foregroundColor="#63345F"
        >
          <rect x="0" y="0" rx="20" ry="20" width="270" height="190" />
          <rect x="10" y="200" rx="5" ry="5" width="155" height="15" />
          <rect x="10" y="230" rx="5" ry="5" width="100" height="15" />
          <rect x="10" y="270" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="310" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <img className={styles.itemImg} src={imageUrl} alt="Item" />
          <h5>{title}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Price:</span>
              <b>
                {price}
                <img width={12} height={12} src="/img/weth.svg" alt="Price" />
              </b>
            </div>
            {onPlus && (
              <img
                width={24}
                height={24}
                className={styles.plus}
                onClick={onClickPlus}
                src={isItemAdded(id) ? "/img/btn-checked.svg" : "/img/plus.svg"}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default Card
