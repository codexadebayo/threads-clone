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
  Portal,
  useToast,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import "./CSS/UserHeader.css";
import { CgMoreO } from "react-icons/cg";

const UserHeader = () => {
  const toast = useToast();
  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() =>
      toast({
        description: "profile link copied.",
        duration: 3000,
        isClosable: true,
      })
    );
  };
  return (
    <VStack gap={4} alignItems={"start"}>
      <Flex justifyContent={"space-between"} w={"full"} className="user-banner">
        <Box>
          <Text fontSize={"2xl"} fontWeight={"bold"}>
            Username
          </Text>
          <Flex gap={2} alignItems={"center"}>
            <Text fontSize={"sm"}>User Description</Text>
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
          <Avatar
            name="David Adebayo"
            src="https://bit.ly/sage-adebayo"
            size={
                {
                    base:'md',
                    md: 'xl'
                }
            }
          />
        </Box>
      </Flex>
      <Flex className="user-description">
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates,
          impedit.
        </Text>
      </Flex>
      <Flex
        width={"full"}
        justifyContent={"space-between"}
        className="banner-footer"
      >
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"}>followers</Text>
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
