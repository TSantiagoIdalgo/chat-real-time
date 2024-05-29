import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/user/login/login';
import Register from './components/user/register/register';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Navigate to='/login' />} />
      </Routes>
    </div>
  );
}

export default App;