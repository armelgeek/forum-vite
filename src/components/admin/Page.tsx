
import React, {memo } from 'react';
const Page = memo(({children}:any) => {
    return (
        <>
            <main className="container w-full flex-grow pl-3 pr-3">
                {children}
            </main>
        </>
    )
}, (prevProps: any, nextProps: any) => {
    return  prevProps.children == nextProps.children
});
export default  Page;