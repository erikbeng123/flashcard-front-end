import React from 'react'
import PropTypes from 'prop-types'
import styles from './CardStyles.css'

const Card = ({ data, xPos }) => {
  const { definition, kanji, kana } = data
  const isFlipped = data.getIsFlipped()

  const translateX = -50 + xPos * 2.5
  const translateY = xPos !== 0 ? -46 : -50
  const scale = xPos !== 0 ? 1.05 : 1
  const rotateZ = xPos === 0 ? 0 : 2 * Math.sign(xPos)
  const transition = xPos !== 0 ? '1s' : '0s'

  return (
    <div
      className={styles.card}
      onClick={data.flip}
      role="presentation"
      style={{
        transition,
        transform: `translateX(${translateX}%) translateY(${translateY}%) scale(${scale}) rotateZ(${rotateZ}deg)`,
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
