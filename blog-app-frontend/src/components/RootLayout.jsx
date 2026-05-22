import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router";
import {useEffect} from 'react'
import { useAuth } from "../store/authStore";
import { pageBackground } from "../styles/common";



function RootLayout() {

  //import check checkAuth
  let checkAuth=useAuth(state=>state.checkAuth)

  useEffect(()=>{
    checkAuth()
  },[])


  return (
    <div className={pageBackground}>
      <Header />
        <div className="mx-8 md:mx-32 py-10">
          <Outlet />
        </div>
      <Footer />
    </div>
  );
}

export default RootLayout;