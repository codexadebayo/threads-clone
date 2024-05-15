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
import { Link, useNavigate } from "react-router-dom";
import {formatDistanceToNow} from "date-fns";





const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${postedBy}`);
        const data = await res.json();
        if (data.error) {
          console.log(data.error);
          return;
        }
        setUser(data);
      } catch (err) {
        console.log(err);
        setUser(null);
      }
    };
    getUser();
  }, [postedBy]);
  if (!user) return null;
  //fetch the postedBy profilePic and username
  return (
    // <Link to={"/badman/post/8"}>
    <Link to={`/${user.username}/post/${post._id}`}>
      <Flex gap={3} mb={4} py={5}>
        <Flex flexDirection={"column"} alignItems={"center"}>
          <Avatar
            size={"md"}
            name={user.name}
            src={user.profilePic}
            bottom={"15px"}
            onClick={(e) => {
              e.preventDefault();
              navigate(`/${user.username}`);
            }}
          />
          <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
          <Box position={"relative"} w={"full"}>
            {post.replies.length === 0 && (
              <Avatar
                size={"xs"}
                name="badman"
                src=""
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
            )}
            {post.replies[0] && (
              <Avatar
                size={"xs"}
                name="badman"
                src={post.replies[0].userProfilePic}
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              />
            )}
            {post.replies[1] && (
              <Avatar
                size={"xs"}
                name="badman"
                src={post.replies[1].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              />
            )}
            {post.replies[2] && (
              <Avatar
                size={"xs"}
                name="badman"
                src={post.replies[2].userProfilePic}
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              />
            )}
          </Box>
        </Flex>
        <Flex flex={1} flexDirection={"column"} gap={2}>
          <Flex justifyContent={"space-between"}>
            <Flex w={"full"} alignItems={"center"}>
              <Text
                fontSize={"small"}
                fontWeight={"bold"}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${user.username}`);
                }}
              >
                {user.username}
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={"center"}>
              <Text fontSize={"sm"}  width={36}color={"gray.light"} textAlign={'right'} >
                {formatDistanceToNow(new Date(post.createdAt))} ago
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
            <Actions post={post} />
          </Flex>

          
        </Flex>
      </Flex>
      <Divider mb={"10px"} />
    </Link>
  );
};

export default Post;
