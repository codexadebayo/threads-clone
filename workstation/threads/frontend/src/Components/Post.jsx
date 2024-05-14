import React, { useEffect, useState } from "react";
import {
  Flex,
  Box,
  Divider,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Avatar } from "@chakra-ui/avatar";
import Actions from "./Actions";
import { Link } from "react-router-dom";


const Post = ({post, postedBy}) => {
  const [liked, setLiked] = useState(false);
  useEffect(()=>{
    const getUser = async ()=>{
        try {
            const res = await fetch("/api/users/profile" + postedBy)
            const data = await res.json()
            console.log(data);
            if(data.error){
                console.log("Error: ", data.error);
                return;
            }    
        } catch (err) {
            console.log("Error: ", err);
        }
    }
  },[postedBy])
  //fetch the postedBy profilePic and username
  return (
    // <Link to={"/badman/post/8"}>
    <Link to={"/badman/post/8"}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name="Badman"
            src="https://bit.ly/sage-adebayo"
            bottom={"15px"}
          />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            <Avatar
              size={"xs"}
              name="badman"
              src="https://bit.ly/dan-abramov"
              position={"absolute"}
              top={"0px"}
              left={"15px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="badman"
              src="https://bit.ly/kent-c-dodds"
              position={"absolute"}
              bottom={"0px"}
              right={"-5px"}
              padding={"2px"}
            />
            <Avatar
              size={"xs"}
              name="badman"
              src="https://bit.ly/code-beast"
              position={"absolute"}
              bottom={"0px"}
              left={"4px"}
              padding={"2px"}
            />
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text fontSize={"small"} fontWeight={"bold"}>
                Badman
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontStyle={"sm"} color={"gray.light"}>
                1d
              </Text>
              <Menu>
                <MenuButton>
                  <BsThreeDots />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"} padding={1}>
                    <MenuItem bg={"gray.dark"} color={"gray.light"}>
                      copy link
                    </MenuItem>
                    <MenuItem bg={"gray.dark"} color={"gray.light"}>
                      save
                    </MenuItem>
                    <MenuItem bg={"gray.dark"} color={"gray.light"}>
                      blacklist
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Flex>
          </Flex>
          <Text fontSize={"sm"}>{post.text}</Text>
          {post.img && (
            <Box
              position={"relative"}
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src={post.img} w={"full"} />
            </Box>
          )}
          <Flex gap={3} my={1}>
            <Actions liked={liked} setLiked={setLiked} />
          </Flex>

          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>
            { post.comments && post.comments.length || 0} 
              comments
            </Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>
              { post.likes && post.likes.length || 0} 
              likes
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Divider mb={"10px"} />
    </Link>
  );
};

export default Post;
 