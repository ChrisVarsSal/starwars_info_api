import './App.css'
import Navbar from './components/Navbar'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <>
    <NavBar/>
    <div className='container'>
      <Routes>
        <Route path='/' element={<h1>List</h1>}></Route>
        <Route path='/character/:id' element={<h1>Character</h1>}></Route>
      </Routes>
    </div>
    </>
  )
}

export default App
