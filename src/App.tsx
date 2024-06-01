import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserLogin from './modules/login/components/user-login/user-login';
import Chat from './modules/chat/chat';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<UserLogin/>}/>
        <Route path='/chat' element={<Chat/>}/>
      </Routes>
    </div>
  );
}

export default App;