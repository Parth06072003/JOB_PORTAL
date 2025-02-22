
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './App.css'
import Navbar from './components/shared/Navbar'
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'

const appRouter= createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/Login',
    element:<Login/>
  },
  {
    path:'/Signup',
    element:<Signup/>
  },
  {
    path:'/Jobs',
    element:<Jobs/>
  },
  {
    path:'/browse',
    element:<Browse/>
  }
])

function App() {


  return (
    <div>
  <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
