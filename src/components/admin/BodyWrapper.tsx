
import React, {memo, } from 'react';
const BodyWrapper = memo(({children}:any) => {
    return (
        <div className="wrapper">
                {children}
        </div>
    )
},(prevProps:any, nextProps:any) => {
    return prevProps.children == nextProps.children
})
export default  BodyWrapper;