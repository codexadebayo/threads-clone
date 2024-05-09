import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useRecoilState } from "recoil";
import userAtom from "../../atoms/userAtom";
import usePreviewImg from "../../hooks/usePreviewImg";
import { Form } from "react-router-dom";
import useShowToast from "../../hooks/useShowToast";

export default function UpdateUserProfile() {
  const [user, setUser] = useRecoilState(userAtom);

  const [inputs, setInputs] = useState({
    name: user.name,
    username: user.username,
    bio: user.bio,
    email: user.email,
    password: "",
  });

  const fileRef = useRef(null);
  const showToast = useShowToast()

  const { handleImageChange, imgUrl } = usePreviewImg();
  const handleSubmit = async (e)=>{
    e.preventDefault();
    try {
        console.log(inputs)
        
    } catch (error) {
        showToast('Error submitting request', "Unable to update profile. Try again", "error") 
    }
  }

  console.log(user);
  return (
    <Form onSubmit={handleSubmit}>
      <Flex align={"center"} justify={"center"} my={6}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={useColorModeValue("white", "gray.dark")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={["column", "row"]} spacing={6}>
              <Center>
                <Avatar
                  size="xl"
                  boxShadow={"md"}
                  src={imgUrl || user.profilePic}
                />
                <Input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={handleImageChange}
                />
              </Center>
              <Center w="full">
                <Button w="full" onClick={() => fileRef.current.click()}>
                  Change Avatar
                </Button>
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="UserName"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              _placeholder={{ color: "gray.500" }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="Full Name"
              value={inputs.name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              _placeholder={{ color: "gray.light" }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              _placeholder={{ color: "gray.light" }}
              type="email"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Bio Description"
              _placeholder={{ color: "gray.light" }}
              value={inputs.bio}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              type="text"
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="password"
              _placeholder={{ color: "gray.light" }}
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              bg={"red.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "red.500",
              }}
            >
              Cancel
            </Button>
            <Button
              bg={"green.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "green.500",
              }}
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Form>
  );
}
