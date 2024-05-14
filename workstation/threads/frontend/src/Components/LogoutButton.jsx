import { Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { useState } from "react";

import React from "react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/userAtom";
import useShowToast from "../hooks/useShowToast";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const showToast = useShowToast();
  const setUser = useSetRecoilState(userAtom);
  const handleLogout = async () => {

    try {
      setLoading(true)
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      if (data.error) {
        showToast("Error", data.error, "Error");
        return;
      }

      localStorage.removeItem("user-threads");

      setUser(null);
    } catch (error) {
        showToast("Logout Error", error, "error");
    } finally{
      setLoading(false)
    }
  };
  return (
    <Button
    loadingText="logging out"
      position={"fixed"}
      top={"30px"}
      right={"30px"}
      size={"sm"}
      onClick={handleLogout}
      isLoading={loading}
    >
      <FiLogOut size={20}/>
    </Button>
  );
};

export default LogoutButton;
