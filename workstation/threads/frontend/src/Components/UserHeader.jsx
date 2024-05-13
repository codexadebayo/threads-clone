import React from "react";
import {
  Flex,
  VStack,
  Box,
  Avatar,
  Text,
  Link,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Button,
  Portal,
  useToast,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { BsInstagram } from "react-icons/bs";
import "./CSS/UserHeader.css";
import { CgMoreO } from "react-icons/cg";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom); //logged in user
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  );
  const [updating, setUpdating] = useState(false);

  console.log(following);

  const toggleFollow = async () => {
    if(!currentUser){
      showToast("Error", "Please login to follow", "error");
      return;
    }
    if(updating) return;
    setUpdating(true)
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.error) {
        showToast("Error", data.error, "error");
        return;
      }

      if (following) {
        showToast("success", `Unfollowed ${user.name}`, "success");
        console.log(`Unfollowed ${user.name} Successfully`);
        user.followers.pop();
      } else {
        showToast("success", `Followed ${user.name}`, "success");
        console.log(`Followed ${user.name} Successfully`);
        user.followers.push(currentUser._id);
      }
      setFollowing(!following);

      console.log(data);
    } catch (error) {
      showToast("Error", error, "error")
      console.log(`Error: ${error}`);
    } finally{
      setUpdating(false)
    }
  };

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => showToast("Copied", "profile link", "success")
    );
  };

  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"} className="user-banner">
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            {user.name}
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>{user.username}</Text>
            <Text
              fontSize={"xm"}
              bg={"#1e1e1e"}
              color={"gray.light"}
              p={2}
              borderRadius={"full"}
            >
              threads.net
            </Text>
          </Flex>
        </Box>
        <Box>
          {user.profilePic && (
            <Avatar
              name={user.name}
              src={user.profilePic}
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
          {!user.profilePic && (
            <Avatar
              name={user.name}
              src="https://bit.ly/broken-link"
              size={{
                base: "md",
                md: "xl",
              }}
            />
          )}
        </Box>
      </Flex>
      <Flex className="user-description">
        <Text>{user.bio}</Text>
      </Flex>
      {currentUser._id === user._id && (
        <Link as={RouterLink} to="/update">
          <Button size={"sm"}>Update Profile</Button>
        </Link>
      )}
      {currentUser._id !== user._id && (
        <Button size={"sm"} onClick={toggleFollow} isLoading={updating}>
          {following ? "Unfollow" : "Follow"}
        </Button>
      )}
      <Flex
        width={"full"}
        justifyContent={"space-between"}
        className="banner-footer"
      >
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>{user.followers.length} Followers</Text>
          <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
          <Link color={"gray.light"}>instagram.com</Link>
        </Flex>
        <Flex>
          <Box className="icon-bg">
            <BsInstagram size={24} cursor={"pointer"} />{" "}
          </Box>

          <Box className="icon-bg">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"} padding={1}>
                  <MenuItem
                    bg={"gray.dark"}
                    color={"gray.light"}
                    onClick={copyURL}
                  >
                    {" "}
                    copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>
      <Flex w={"full"}>
        <Flex
          flex={1}
          borderBottom={"1.5px solid white"}
          justifyContent={"center"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Threads</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={"1px solid gray"}
          justifyContent={"center"}
          color={"gray.light"}
          pb={3}
          cursor={"pointer"}
        >
          <Text fontWeight={"bold"}>Replies</Text>
        </Flex>
      </Flex>
    </VStack>
  );
};

export default UserHeader;
