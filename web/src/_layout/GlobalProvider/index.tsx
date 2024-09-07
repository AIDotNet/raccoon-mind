import { memo } from "react";
import GlobalProvider from "./GlobalProvider";
import { Outlet } from "react-router-dom";


const GlobalLayout = memo(()=>{

    return(
        <GlobalProvider>
            <Outlet/>
        </GlobalProvider>
    )
})

export default GlobalLayout;