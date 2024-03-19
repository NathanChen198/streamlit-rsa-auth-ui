/*
author: Nathan Chen
date  : 12-Mar-2024
*/


import React from "react";
import { createRoot } from "react-dom/client";
import SigninForm from "./signin_form";
import { ComponentProps, withStreamlitConnection } from "streamlit-component-lib";
import SignoutForm from "./signout_form";
import ChangePasswordForm from "./change_password_form";
import RegisterForm from "./register_form";


const getComponent = (props: ComponentProps) => {
    const id = props.args['id']
    switch (id){
        case 'signin': return (<SigninForm {...props} />)
        case 'signout': return (<SignoutForm {...props} />)
        case 'changePassword': return(<ChangePasswordForm {...props} />)
        case 'register': return(<RegisterForm {...props} />)
        default: return (<div />)
    }
}


const StreamlitComponent = withStreamlitConnection(getComponent)


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <StreamlitComponent />
    </React.StrictMode>
);