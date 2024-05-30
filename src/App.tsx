import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Chat from './components/chat/chat';
import Login from './components/login/login';
function App() {

  return (
    <div>
    <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/chat' element={<Chat/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;