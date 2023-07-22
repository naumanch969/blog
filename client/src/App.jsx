
import { Home, Blog, Blogs, Write, Account, Register, Login, Contact } from './pages'
import { Navbar } from './components'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const App = () => {

  const { loggedUser: user } = useSelector(state => state.user)

  return (
    <div className='' >

      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/blogs' element={<Blogs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/write' element={<Write />} />
        <Route path='/account' element={user ? <Account /> : <Navigate to='/register' />} />
        <Route path='/write' element={user ? <Write /> : <Navigate to='/register' />} />
        <Route path='/register' element={user ? <Home /> : <Register />} />
        <Route path='/login' element={user ? <Home /> : <Login />} />
      </Routes>

    </div>
  )
}

export default App;