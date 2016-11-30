import './index.html'
import './styles/screen.sass'

const main = () => {
  document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()
    const input = document.querySelector('input')
    console.log(input)
    const newItem = document.createElement('li')
    newItem.textContent = input.value
    document.querySelector('ul').appendChild(newItem)
    input.value = ''
  })
}

document.addEventListener('DOMContentLoaded', main)

if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
