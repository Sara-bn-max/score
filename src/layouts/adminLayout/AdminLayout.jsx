import React from "react";
import SidebarRtlMenu from "../../components/sidebarRtlMenu/SidebarRtlMenu";
import Navbar from "../../components/navbar/Navbar";
import { Bars3Icon } from "@heroicons/react/24/solid";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = React.useState(true);

  return (
    <div>
      <div className="flex flex-row">
        <SidebarRtlMenu collapsed={collapsed} />
        <div className="mainPart">
          <Navbar />
          <div className="pageContent">
            <main style={{ padding: 10 }}>
              <div>
                <Bars3Icon
                  onClick={() => setCollapsed(!collapsed)}
                  className="h-6 w-6 text-primary"
                />
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
