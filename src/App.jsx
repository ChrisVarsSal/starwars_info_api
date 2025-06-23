import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom';
import CharacterList from './pages/CharacterList';

function App() {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={<CharacterList />} />
          <Route path='/character/:id' element={<h1>Character</h1>} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
