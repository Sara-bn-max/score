import React from "react";
import SidebarRtlMenu from "../../components/sidebarRtlMenu/SidebarRtlMenu";
import Navbar from "../../components/navbar/Navbar";
import { Bars3Icon } from "@heroicons/react/24/solid";
import { Outlet } from "react-router-dom";

export default function AdminLayout({children}) {
  const [collapsed, setCollapsed] = React.useState(true);
  const handleCollapseMenu = () =>{
    setCollapsed(!collapsed)
  }
  return (
    <div>
      <div className="w-full overflow-hidden min-h-screen">
      <div className="w-full flex flex-row">
        <div className="sidebarmenu"><SidebarRtlMenu collapsed={collapsed} /></div>
        <div className="mainPart w-full bg-gray-light">
          <div className=""><Navbar handleCollapseMenu={handleCollapseMenu}  /></div>
          <div className="pageContent">
            <main className="min-h-screen" style={{ padding: 10 }}>
              <Outlet />
            </main>
          </div>
        </div>
      </div>
      </div>
      
    </div>
  );
}
