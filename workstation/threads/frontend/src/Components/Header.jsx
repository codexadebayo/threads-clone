import { Flex, Button, Link } from "@chakra-ui/react"
import { useColorMode } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import {Link as RouterLink} from 'react-router-dom'
import {RxAvatar} from 'react-icons/rx';

import {AiFillHome} from 'react-icons/ai'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = useRecoilValue(userAtom);

  return (
    <Flex justifyContent={'space-between'} mt='6' mb={12}>
      {user && (
        <Link as={RouterLink}  to='/'>
        <AiFillHome size={24} />
        </Link>
      )}


      <Button alt="logo" onClick={toggleColorMode}>
      Toggle{colorMode === 'light' ? 'Dark' : 'Light'}
    </Button>
    {user && (
        <Link as={RouterLink}  to={`/${user.username}`}>
        <RxAvatar size={24} />
        </Link>
      )}

    </Flex>
  )
}

export default Header