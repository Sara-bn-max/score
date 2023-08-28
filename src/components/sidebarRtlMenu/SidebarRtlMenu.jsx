import React from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./sidebarRtlMenuStyle.css";

export default function SidebarRtlMenu() {
  return (
    <div className="sidebarMenu">
      <Sidebar rtl="true">
        <Menu
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <SubMenu  icon={<Icon name="bar-chart" />} label="Charts">
            <MenuItem> منو </MenuItem>
            <MenuItem> منو </MenuItem>
          </SubMenu>
          <MenuItem icon={<Icon name="book-2" />}>Documentation</MenuItem>
          <MenuItem icon={<Icon name="calendar" />}> Calendar</MenuItem>
          <MenuItem icon={<Icon name="shopping-cart" />}> E-commerce</MenuItem>
          <MenuItem icon={<Icon name="service" />}> Examples</MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
