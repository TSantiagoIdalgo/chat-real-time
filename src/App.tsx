import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './modules/login/login';
import Chat from './modules/chat/chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;