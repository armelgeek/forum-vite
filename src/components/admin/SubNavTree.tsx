
import React, { memo, } from 'react';
import { Link } from "react-router-dom";
const SubNavTree = memo(({ title, icon = null, route, scope }: any) => {
    return (
        <ul className="sidebar-submenu">
            <Link to={route} className="sidebar-menu">
                {icon && <span className="sidebar-menu-icon"></span>}
                <span className={"sidebar-menu-text"}>{title}</span>
            </Link>
        </ul>
    )
}, (prevProps: any, nextProps: any) => {
    return prevProps.title == nextProps.title 
    && prevProps.icon == nextProps.icon && prevProps.route == nextProps.route
});
export default SubNavTree;