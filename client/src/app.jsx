import { useState } from 'preact/hooks'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from './User';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import NoPage from './NoPage';

export function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />}></Route>
            <Route path="/create" element={<CreateUser />} ></Route>
            <Route path="/update/:id" element={<UpdateUser />} ></Route>
            <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
