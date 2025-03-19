import './App.css'
import Loginpage2 from './loginpage2'
import Home from './home'
import {BrowserRouter , Routes , Route} from 'react-router-dom'
import Admin from './admin'
import PostNews from './postNews'
import ViewNews from './viewNews'

function App() {

  return (

         <BrowserRouter>
          <Routes>
           <Route path='/login' element={<Loginpage2/>}></Route>
           <Route path='/' element={<Home/>}></Route>
           <Route path='/admin' element={<Admin/>}></Route>
           <Route path='/post' element={<PostNews/>}></Route>
           <Route path='/viewNews/:slug' element={<ViewNews/>}></Route>
          </Routes>
         </BrowserRouter>

  )
}

export default App
