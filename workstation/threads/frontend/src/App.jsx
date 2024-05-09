import {Container} from '@chakra-ui/react'
import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserPage from './Pages/UserPage/UserPage'
import PostPage from './Pages/PostPage/PostPage'
import Header from './Components/Header'
import LogoutButton from './Components/LogoutButton'
import HomePage from './Pages/HomePage/HomePage'
import AuthPage from './Pages/AuthPage'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import UpdateUserProfile from './Pages/UpdateUserProfile/UpdateUserProfile'


function App() {
  const user = useRecoilValue(userAtom);
  console.log(user);
  return (
    <Container maxW='container.sm'>
      <Header/>
      <Routes>
        <Route path='/' element={user ? <HomePage/> : <Navigate to="/oauth"/>}/>
        <Route path='/oauth' element={!user ? <AuthPage/> : <Navigate to="/"/>}></Route>
        <Route path='/update' element={user? <UpdateUserProfile/> : <Navigate to='/oauth'/>} ></Route>
        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage/>} />
      </Routes>
      

      {user && <LogoutButton/>}
    </Container>
  )
}

export default App
