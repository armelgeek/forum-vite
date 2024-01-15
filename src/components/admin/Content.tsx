
import React, {memo, } from 'react';
import Footer from './Footer';
const Content = memo(({children}:any) => {
    return (
        <div className="content h-full overflow-hidden">
                {children}
        </div>
    )
},(prevProps:any, nextProps:any) => {
    return prevProps.children == nextProps.children
})
export default  Content;