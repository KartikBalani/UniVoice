import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './home';
import LoginPage2 from './loginpage2';
import Admin from './admin';
import PostNews from './postNews';
import ViewNews from './viewNews';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
          <Routes>
           <Route path='/login' element={<LoginPage2/>}></Route>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/admin' element={<Admin/>}></Route>
           <Route path='/post' element={<PostNews/>}></Route>
           <Route path='/viewNews/:slug' element={<ViewNews/>}></Route>
          </Routes>
         </BrowserRouter>
    </UserProvider>
  );
}

export default App;



    