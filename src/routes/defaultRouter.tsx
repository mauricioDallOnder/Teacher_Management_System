import { Outlet } from "react-router-dom"
import MyAppBar from "./navBar"


export const DefaultRouter=()=>{
    return(
        <>
        <MyAppBar/>
        <Outlet/>
        </>
    )
}