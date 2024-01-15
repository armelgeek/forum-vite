import React, { memo } from "react";
const NavItem = memo(({ title }: any) => {
  return <div className="sidebar-menu-header flex flex-row justify-between items-center font-semibold opacity-60">
    <div>{title}</div>
  </div>;
},(prevProps:any, nextProps:any) => {
  return prevProps.title == nextProps.title
});
export default NavItem;
