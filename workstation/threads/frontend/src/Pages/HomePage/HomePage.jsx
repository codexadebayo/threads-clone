import React, { useEffect, useState } from "react";
import "./Homepage.css";
import useShowToast from '../../hooks/useShowToast'
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../../Components/Post";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const showToast = useShowToast()
  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        if(data.error){
          console.log("Error: ", data.error);
          return
        }
        setPosts(data)
        console.log(data);
        // useShowToast("Posts", "getting Posts", "Success")
      } catch (err) {
        // showToast("error", err, "Error" )

        console.log("Error : ", err);
      } finally {
        setLoading(false);
      }
    };
    getFeedPosts()
  }, []);
  return (
    //button of new post to load and show new posts
    <>
     {!loading && posts.length === 0 && <h1>Follow another user to see feed</h1>
    }
    {loading && (
      <Flex justifyContent={"center"} >
        <Spinner size={'xl'}/>

      </Flex>
    )}
    {posts.map((post) => (
      <Post key={post._id} post={post} postedBy={post.postedBy}/>
    ))}  
    
    </>
  );
};

export default HomePage;
