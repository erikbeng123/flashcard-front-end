const capitalize = string =>
  string
    .split('')
    .map((x, i) => (i === 0 ? x.toUpperCase() : x))
    .join('')

const calculateScore = (recallSucessful, ellapsedTime) => {
  return recallSucessful ? 100 - ellapsedTime : -ellapsedTime * 1000
}

const createDeck = (data, updateFn) => {
  const preparedUpdateFn = () => updateFn({ ...deck })
  let cardsCleared = data.vocab.reduce(
    (score, x) => (score + x.recallScore > 100 ? 1 : 0),
    0
  )

  const stats = {
    getCardsCleared: () => cardsCleared,
    getDeckSize: () => data.length,
  }

  const cards = data.vocab.map(x => {
    let isFlipped = false
    let recallScore = 0
    return {
      getIsFlipped: () => isFlipped,
      flip: () => {
        isFlipped = !isFlipped
        preparedUpdateFn()
      },
      updateRecallScore: (recallSucessful, ellapsedTime) => {
        const scoreDelta = calculateScore(recallSucessful, ellapsedTime)
        const newScore = recallScore + scoreDelta
        if (recallScore < 100 && newScore >= 100) {
          cardsCleared += 1
        } else if (recallScore >= 100 && newScore < 100) {
          cardsCleared -= 1
        }
        recallScore = newScore
        preparedUpdateFn()
      },
      getRecallScore: () => recallScore,
      kanji: x.kanji,
      kana: x.kana,
      definition: x.definition
        ? x.definition
            .split(',')
            .map(capitalize)
            .join(', ')
        : '',
    }
  })

  const deck = {
    cards,
    stats,
  }

  return deck
}

export { createDeck }
