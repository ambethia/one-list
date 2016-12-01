import './index.html'
import './styles/screen.sass'

// Our entry point
const main = () => {
  // Event handler for when a user presses ENTER on the text input
  document.querySelector('form').addEventListener('submit', (event) => {
    // Stop the page from reloading because of the form submittion
    event.preventDefault()
    // Find the input element
    const input = document.querySelector('input')
    // Create a new list item, passing the input's value as the label
    createItem(input.value, false)
    // Reset the list item
    input.value = ''
  })
  // Retrive previously saved data from local storage
  const items = JSON.parse(window.localStorage.getItem('items'))
  // If there _was_ previously saved data
  if (items) {
    // Go through each datum
    for (let i = 0; i < items.length; i++) {
      // And create an element with it's properties
      createItem(items[i].label, items[i].done)
    }
  }
}

// Our function to create a new item: `createItem('Learn JS', false)`
const createItem = (label, done) => {
  // Create a new LI element (it does NOT exist in the page _yet_)
  const newItem = document.createElement('li')
  // Set it's text content to be our label
  newItem.textContent = label
  // If it's done
  if (done) {
    // Add the 'done' class (for styling)
    newItem.className = 'done'
  }
  // Put it on the page
  document.querySelector('ul').appendChild(newItem)

  // A variable we'll use to keep track of clicks
  let didDblClick = false

  // Persist the newly created item to the local storage.
  saveItems()

  // When a use Clicks on an item
  newItem.addEventListener('click', () => {
    // Wait half a second to see if they double click too
    setTimeout(() => {
      // If they didn't double click
      if (!didDblClick) {
        // If it was previosly marked done
        if (newItem.className === 'done') {
          // Un do it
          newItem.className = ''
        } else {
          // Mark it done
          newItem.className = 'done'
        }
        // Persist that change to local storage.
        saveItems()
      }
    }, 500) // This is the 2nd argument to the setTimeout from earlier
  })

  // When a user double clicks
  newItem.addEventListener('dblclick', () => {
    // Set this to true so we know that a double click is happening
    // (see the timeout in the other click handler)
    didDblClick = true
    // Remove the item from the DOM
    newItem.remove()
    // Trigger the persistence
    saveItems()
  })
}

// Look at all the LIs and record their state
const saveItems = () => {
  // An array to hold the data in
  let items = []
  // Find all the list items
  const lis = document.querySelectorAll('li')
  // Go through each one
  for (let i = 0; i < lis.length; i++) {
    // Make an object that looks like: { label: 'Learn Sass', done: true }
    items.push({
      label: lis[i].textContent,
      done: lis[i].className === 'done'
    })
  }
  // Encode to JSON and save in local storage
  window.localStorage.setItem('items', JSON.stringify(items))
}

// When the DOM is ready, start up our app
document.addEventListener('DOMContentLoaded', main)

// Webpack junk
if (module.hot) {
  module.hot.dispose(() => window.location.reload())
  module.hot.accept(err => console.error(err))
}
