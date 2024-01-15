import React from 'react';
import {Route, Redirect, Link} from 'react-router-dom';
const RedirectRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = false;
    return (
        <>
            <Route
                {...rest}
                render={(props: any) =>
                    !isAuthenticated ? <Component {...props} /> : <Redirect to="/"/>
                }
            />
        </>
    );
};

export default RedirectRoute;
