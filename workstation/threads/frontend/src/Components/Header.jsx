import { Flex, Button } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Flex justifyContent={'center'} mt='6' mb={12}>
      <Button alt="logo" onClick={toggleColorMode}>
      Toggle{colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>

    </Flex>
  )
}

export default Header