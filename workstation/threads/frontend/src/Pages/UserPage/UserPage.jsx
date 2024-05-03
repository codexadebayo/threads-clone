import UserHeader from '../../Components/UserHeader'
import UserPost from '../../Components/UserPost'
import './UserPage.css'
import React from 'react'

const UserPage = () => {
  return (
    <>
      <UserHeader/>
      <UserPost likes={20} comments={78} postImg='./post1.png' postTitle='Let plant some peppers' />
      <UserPost likes={2} comments={8} postImg='/post3.png' postTitle='Let travel' />
      <UserPost likes={17} comments={9} postTitle='Rain is coming' />
    </>
  )
}

export default UserPage