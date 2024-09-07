import { SidebarTabKey } from "@/store/global/initialState";
import { useLocation } from "react-router-dom";

export const useActiveTabKey = () => {
    const pathname = useLocation().pathname;
  
    return pathname.split('/').find(Boolean)! as SidebarTabKey;
  };