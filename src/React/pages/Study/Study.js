import React, { useState, useEffect } from 'react'

import Card from '../../components/Card/Card'
import styles from './studyStyles.css'

let time = null

const Study = ({ deck }) => {
  const [curIndex, setCurIndex] = useState(0)
  const [topXVal, setTopXVal] = useState(0)
  const topCard = deck.cards.length > 0 ? deck.cards[curIndex] : null
  const bottomCard = deck.cards.length > 1 ? deck.cards[curIndex + 1] : null
  const nextCard = xVal => {
    if (time) return
    setTopXVal(xVal)
    time = setTimeout(() => {
      if (xVal < 0) {
        topCard.updateRecallScore(false, 0)
      } else {
        topCard.updateRecallScore(true, 0)
      }
      setCurIndex(previous => Math.min(previous + 1, deck.cards.length))
      setTopXVal(0)
      time = null
    }, 1000)
  }

  useEffect(() => {
    const goToNextCard = e => {
      if (topCard) {
        if (e.keyCode === 39) {
          nextCard(100)
        } else if (e.keyCode === 37) {
          nextCard(-100)
        }
      }
    }
    document.addEventListener('keydown', goToNextCard)
    return () => document.removeEventListener('keydown', goToNextCard)
  })

  return curIndex !== deck.cards.length ? (
    <div>
      <div>
        <span>{deck.stats.getCardsCleared()}</span>
        <span>{deck.stats.getDeckSize()}</span>
      </div>
      <div className={styles.deck}>
        {bottomCard && <Card data={bottomCard} />}
        {topCard && <Card data={topCard} xPos={topXVal} />}
      </div>
    </div>
  ) : (
    <button onClick={() => setCurIndex(0)}>Reset</button>
  )
}

export default Study
