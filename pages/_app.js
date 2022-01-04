import '../styles/globals.css'
import { useState, useEffect } from 'react'
import Layout from '../components/layout'

function GetProps() {
  const [userActive, setUserActive] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("");
  useEffect(() => {
    if(sessionStorage.getItem("userid")) {
      setUserActive(true);
    }
  })

  return {userActive, setUserActive, categoryTitle, setCategoryTitle}
}

function MyApp({ Component, pageProps={GetProps} }) {
  return (
  <Layout>
    <Component {...pageProps} />
  </Layout>
  )
}

export default MyApp
