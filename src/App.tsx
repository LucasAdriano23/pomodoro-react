import { useState } from 'react'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>Olá Mundo {count}</div>
  )
}

export default App
