import './index.css'
import TaskManager from './component/TaskManger'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './component/Auth';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Auth />} />
        <Route path="/tasks" element={<TaskManager />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
