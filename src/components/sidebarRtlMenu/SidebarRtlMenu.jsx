import React from 'react'
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { AdjustmentsHorizontalIcon, Bars3Icon, ChartBarIcon, ClipboardDocumentCheckIcon, UsersIcon } from '@heroicons/react/24/solid'
import { Link } from "react-router-dom";

export default function SidebarRtlMenu({collapsed}) {
  return (
    <div style={{ display: 'fix', height: '100vh', minHeight: '400px' }}>
      <Sidebar rtl={true} collapsed={collapsed} transitionDuration={1000} className='w-full h-full'>
        <Menu>
          <MenuItem icon={<ChartBarIcon className='h-6 w-6 text-primary' />}> داشبورد</MenuItem>
          <SubMenu icon={<ClipboardDocumentCheckIcon className='h-6 w-6 text-primary' />} label="گزارشات">
            <MenuItem> مربیان</MenuItem>
            <MenuItem> باشگاه ها</MenuItem>
            <MenuItem> سالن های ورزشی</MenuItem>
            <MenuItem> <Link to='/'>دسته بندی ها</Link></MenuItem>
          </SubMenu>
          <SubMenu icon={<UsersIcon className='h-6 w-6 text-primary' />} label="کاربران">
            <MenuItem> ادمین های اصلی</MenuItem>
            <MenuItem> تعریف کاربر</MenuItem>
            <MenuItem> دسترسی ها</MenuItem>
          </SubMenu>
          
          <SubMenu icon={<AdjustmentsHorizontalIcon className='h-6 w-6 text-primary' />} label="تنظیمات">
            <MenuItem> تعریف وظایف</MenuItem>
            <MenuItem> تنظیمات تم</MenuItem>
            <MenuItem> <Link to='/state'>مراکز استان</Link> </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
    </div>
  )
}
