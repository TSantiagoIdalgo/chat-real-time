import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/user/login/login';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;