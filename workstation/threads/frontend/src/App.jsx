import {Container} from '@chakra-ui/react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import UserPage from './Pages/UserPage/UserPage'
import PostPage from './Pages/PostPage/PostPage'
import Header from './Components/Header'
import HomePage from './Pages/HomePage/HomePage'


function App() {
  return (
    <Container maxW='container.sm'>
      <Header/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/:username' element={<UserPage />} />
        <Route path='/:username/post/:pid' element={<PostPage/>} />
      </Routes>
    </Container>
  )
}

export default App
