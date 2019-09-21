import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styles from './CardStyles.css'

const handleKeyPress = () => {}

const Card = ({ data, xPos }) => {
  const { definition, kanji, kana } = data
  const isFlipped = data.getIsFlipped()

  const rotateZ = xPos === 0 ? 0 : 2 * Math.sign(xPos)

  return (
    <div
      className={styles.card}
      onClick={data.flip}
      onKeyPress={handleKeyPress}
      role="presentation"
      style={{
        transform: `translateX(${-50 + xPos * 2.5}%) translateY(${
          xPos !== 0 ? -46 : -50
        }%) scale(${xPos !== 0 ? 1.05 : 1}) rotateZ(${rotateZ}deg)`,
        transition: xPos !== 0 ? '1s' : '0s',
      }}
    >
      <div className={`${styles.side} ${!isFlipped ? styles.visible : ''}`}>
        <h1 className={styles.kanji}>{kanji}</h1>
        <h2 className={styles.kana}>{kana}</h2>
      </div>
      <div className={`${styles.side} ${isFlipped ? styles.visible : ''}`}>
        {definition}
      </div>
    </div>
  )
}

Card.propTypes = {
  data: PropTypes.any.isRequired,
}

export default Card
