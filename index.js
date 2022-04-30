function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const cards = Array.from(document.querySelectorAll('.flip-card'))
const topFlipTemplate = document.querySelector('#top-flip-template')
const bottomFlipTemplate = document.querySelector('#bottom-flip-template')

const dividers = Array.from(document.querySelectorAll('.divider'))

const flip = (card, nextNumber) => {
  if (nextNumber === card.dataset.number) return
  const topCard = card.querySelector('.top-card')
  const bottomCard = card.querySelector('.bottom-card')
  const currentNumber = parseInt(card.dataset.number)
  const topFlip = topFlipTemplate.content.firstElementChild.cloneNode(true)
  const bottomFlip =
    bottomFlipTemplate.content.firstElementChild.cloneNode(true)
  //   const nextNumber = (currentNumber + 1) % 10
  topFlip.addEventListener('animationstart', () => {
    topCard.textContent = nextNumber
    card.dataset.number = nextNumber
  })
  topFlip.addEventListener('animationend', () => {
    topFlip.remove()
  })
  bottomFlip.addEventListener('animationend', () => {
    bottomCard.textContent = nextNumber
    bottomFlip.remove()
  })
  topFlip.textContent = currentNumber
  bottomFlip.textContent = nextNumber
  card.append(topFlip, bottomFlip)
}

const updateTime = () => {
  const time = new Date()
  const hourParts = Array.from(time.getHours().toString())
  if (hourParts.length === 1) hourParts.unshift(0)
  const minuteParts = Array.from(time.getMinutes().toString())
  if (minuteParts.length === 1) minuteParts.unshift(0)
  const secondParts = Array.from(time.getSeconds().toString())
  if (secondParts.length === 1) secondParts.unshift(0)
  flip(cards[0], hourParts[0])
  flip(cards[1], hourParts[1])
  flip(cards[2], minuteParts[0])
  flip(cards[3], minuteParts[1])
  flip(cards[4], secondParts[0])
  flip(cards[5], secondParts[1])
}

const toggleDividers = () => {
  dividers.forEach(divider => {
    if (divider.style.opacity !== '0') {
      divider.style.opacity = 0
    } else {
      divider.style.opacity = 1
    }
  })
}

const timeInterval = setInterval(updateTime, 1000)
const dividerInterval = setInterval(toggleDividers, 700)

updateTime()
