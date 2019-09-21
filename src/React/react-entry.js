import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

import Study from './pages/Study/Study'
import data from '../data/data_new.json'
import { createDeck } from '../state/deck'

const App = () => {
  const [duck, updateDeck] = useState(null)
  const [_, forceUpdate] = useState(false)
  useEffect(() => {
    const created = createDeck(data, updateDeck)
    updateDeck(created)
  }, [])
  return duck && <Study deck={duck} />
}

const mountNode = document.getElementById('app')
ReactDOM.render(<App />, mountNode)
