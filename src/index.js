import './index.html'
import './styles/screen.sass'

const main = () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const input = document.querySelector('input')
    const newItem = document.createElement('li')
    newItem.textContent = input.value
    document.querySelector('ul').appendChild(newItem)
    input.value = ''
    newItem.addEventListener('click', () => {
      if (newItem.className === 'done') {
        newItem.className = ''
      } else {
        newItem.className = 'done'
      }
    })
  })
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
