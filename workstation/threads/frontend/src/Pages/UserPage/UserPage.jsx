import { useParams } from "react-router-dom";
import UserHeader from "../../Components/UserHeader";
import UserPost from "../../Components/UserPost";
import "./UserPage.css";
import React, { useEffect, useState } from "react";
import useShowToast from "../../hooks/useShowToast";
import { Spinner, Flex } from "@chakra-ui/react";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/users/profile/${username}`);
        const data = await res.json();
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        };
        setUser(data);
      } catch (error) {
        showToast("Error", error, "error");
      } finally {setLoading(false);}
    };

    getUser();
  }, [username]);
  if(!user && loading ){
    return(
      <Flex justifyContent={"center"}>
        <Spinner size={'xl'}/>
      </Flex>
    )
  }
  if(!user && !loading) return <h1>User not found</h1>;

  return (
    <>
      <UserHeader user={user} />
      <UserPost
        likes={20}
        comments={78}
        postImg="./post1.png"
        postTitle="Let plant some peppers"
      />
      <UserPost
        likes={2}
        comments={8}
        postImg="/post3.png"
        postTitle="Let travel"
      />
      <UserPost likes={17} comments={9} postTitle="Rain is coming" />
    </>
  );
};

export default UserPage;
