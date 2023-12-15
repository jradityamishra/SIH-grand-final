import React from 'react'
import Layout from '../components/layout/Layout'
import { ChatState } from '../context/ChatProvider'
const Home = () => {
  const {groupId}=ChatState();
  console.log("kskdskjksd:",groupId)
  return (
    <Layout>
        <div>Home</div>
    </Layout>
  )
}

export default Home