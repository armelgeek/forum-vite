import React,{memo} from "react";
function ActiveLink({ title }:any) {
    return <li className="breadcrumb-item">{title}</li>;
}

export default memo(ActiveLink,(prevProps:any, nextProps:any) => {
    return prevProps.title == nextProps.title
});
