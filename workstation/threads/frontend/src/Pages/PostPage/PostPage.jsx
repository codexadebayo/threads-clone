import React, { useState } from 'react'
import './PostPage.css'
import { Avatar, Box, Button, Divider, Flex, Text, Image } from '@chakra-ui/react'
import { BsThreeDots } from 'react-icons/bs'
import Actions from '../../Components/Actions'
import Comment from '../../Components/Comment'

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  return (
    <>
      <Flex>
        <Flex w={'full'} alignItems={'center'} gap={3}>
          <Avatar src='https://bit.ly/dan-abramov' size={'md'} name='baddo' />
          <Flex>
            <Text fontSize={'sm'} fontWeight={'bold'}>Baddosner</Text>
            <Image src='/verified.png' w={4} h={4} ml={4}></Image>
          </Flex>
        </Flex>
        <Flex gap={4} alignItems={'center'} >
          <Text fontSize={'sm'} color={'gray.light'}>1d</Text>
          <BsThreeDots />
        </Flex>


      </Flex>
      <Text my={3}>Talk about threads</Text>
      <Box position={'relative'} borderRadius={6} overflow={'hidden'} border={'1px solid'} borderColor={'gray.light'}>
        <Image src='/post3.png' w={'full'} />
      </Box>

      <Flex gap={3} mr={3}>
        <Actions liked={liked} setLiked={setLiked} />
      </Flex>
      <Flex gap={2} alignItems={'center'}>
        <Text color={'gray.light'} fontSize={'small'}>126 replies</Text>
        <Box w={0.5} h={0.5} borderRadius={'full'} bg={'gray.light'}></Box>
        <Text color={'gray.light'} fontSize={'small'}>
          {70 + (liked ? 1 : 0)}
        </Text>
      </Flex>
      <Divider my={4} />
      <Flex justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text fontSize={'2xl'}></Text>
          <Text color={'gray.light'}>Get the app to reply</Text>

        </Flex>
        <Button>Get</Button>
      </Flex>
      <Divider pt={4} />
      <Comment userComment="looks really good"
        createdAt='2d'

        likes={4}
        userName='Hanzo Hasashi'
        userAvatar="https://bit.ly/ryan-florence" />
      <Comment userComment="Check out my twitter clone"
        createdAt='3s'
        likes={8}
        userName='Kun Lao'
        userAvatar="https://bit.ly/code-beast" />
    </>
  )
}

export default PostPage