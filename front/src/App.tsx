// import { useState } from 'react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const handleLogin = () => {
    window.location.href = 'https://127.0.0.1:8000/connect/google'; // Update with your Symfony app domain
  };
  return (
    <>
      <button onClick={handleLogin}>Login with Google</button>
    </>
  )
}

export default App
