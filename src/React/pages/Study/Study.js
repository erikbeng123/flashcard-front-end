import React, { useState, useEffect } from 'react'

import Card from '../../components/Card/Card'
import styles from './studyStyles.css'

const Study = ({ deck }) => {
  const [curIndex, setCurIndex] = useState(0)
  const [topXVal, setTopXVal] = useState(0)
  let time = null
  const topCard = deck.cards[curIndex]
  const bottomCard = deck.cards[curIndex + 1]
  const nextCard = () => {
    if (time) {
      return
    }
    setTopXVal(100)
    time = setTimeout(() => {
      setCurIndex(previous => Math.min(previous + 1, deck.cards.length))
      setTopXVal(0)
      time = null
    }, 1000)
  }

  const previousCard = () => {
    if (time) {
      return
    }
    setTopXVal(-100)
    time = setTimeout(() => {
      setCurIndex(previous => Math.min(previous + 1, deck.cards.length))
      setTopXVal(0)
      time = null
    }, 1000)
  }

  useEffect(() => {
    document.addEventListener('keydown', e => {
      if (e.keyCode === 39) {
        nextCard()
      } else if (e.keyCode === 37) {
        previousCard()
      }
    })
  }, [])

  return (
    <div>
      <div className={styles.deck}>
        <Card data={bottomCard} />
        <Card data={topCard} xPos={topXVal} />
      </div>
      <button onClick={nextCard}>Next</button>
    </div>
  )
}

export default Study
