import React from 'react'
import SignupCard from '../Components/SignupCard'
import LoginCard from '../Components/LoginCard'
import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom);
  console.log(authScreenState)
  
  return (
    <>
    {authScreenState === "login"? <LoginCard/> : <SignupCard/>}
        
    </>
  )
}

export default AuthPage