import { AddIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import usePreviewImg from "../hooks/usePreviewImg";
import {
    Modal,
    Textarea,
    Input,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useColorModeValue,
    useDisclosure,
    FormControl,
    Text,
    Flex,
    Image,
    CloseButton,
} from "@chakra-ui/react";
import { BsFillImageFill } from "react-icons/bs";
const MAX_CHAR = 500;
const CreatePosts = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg();
    const imgRef = useRef(null);
    const [postText, setPostText] = useState("");
    const [remainingCharacters, setRemainingCharacters]=useState(MAX_CHAR)


    const handleTextChange = (e) => { 
        const inputText = e.target.value;
        if(inputText.length > MAX_CHAR){
            const truncatedText = inputText.slice(0, MAX_CHAR);
            setPostText(truncatedText);
            setRemainingCharacters(0)
        } else{
            setPostText(inputText);
            setRemainingCharacters(MAX_CHAR - inputText.length)
        }
    };
    const handleCreatePost = async ()=>{
        
    };

    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
            >
                Post
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Textarea
                                placeholder="post content goes here"
                                onChange={handleTextChange}
                                value={postText}
                            />
                            <Text
                                fontSize={"sm"}
                                fontWeight={"bold"}
                                textAlign={"right"}
                                m={1}
                                color={"gray.800"}
                            >
                                {remainingCharacters}/{MAX_CHAR}
                            </Text>
                            <Input
                                type="file"
                                hidden
                                ref={imgRef}
                                onChange={handleImageChange}
                            />
                            <BsFillImageFill
                                style={{ marginLeft: "5px", cursor: "pointer" }}
                                size={16}
                                onClick={() => imgRef.current.click()}
                            />
                        </FormControl>
                        {imgUrl && <Flex mt={5} w={'full'} position={'relative'}>
                            <Image src={imgUrl} alt="Selected Image" />
                            <CloseButton
                                onClick={()=>{
                                    setImgUrl("")
                                } }
                                bg={"gray.800"}
                                position={"absolute"}
                                top={2}
                                right={2}

                            />
                        </Flex>}
                        Some Texts
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleCreatePost}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreatePosts;
