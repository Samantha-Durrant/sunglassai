import React from 'react'
import ReactDOM from 'react-dom/client'

function App() {
  return React.createElement('div', {}, 
    React.createElement('h1', {}, 'Hello from React!'),
    React.createElement('p', {}, 'This is a minimal React app without JSX'),
    React.createElement('button', { 
      onClick: () => alert('React is working!') 
    }, 'Click me')
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(React.createElement(App))
