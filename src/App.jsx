import { useState } from 'react'
import './index.css'
import TaskManager from './component/TaskManger'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <TaskManager />
    </>
  )
}

export default App
