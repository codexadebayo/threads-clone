import { Button, Container, useColorMode } from '@chakra-ui/react'
import './App.css'


function App() {
  const { toggleColorMode } = useColorMode()

  return (
    <Container maxW='container.sm'>
      <Button onClick={toggleColorMode}>
        Theme
      </Button>
    </Container>
  )
}

export default App
