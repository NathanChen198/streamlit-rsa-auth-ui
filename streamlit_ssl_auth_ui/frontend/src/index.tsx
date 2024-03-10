/*
author: Nathan Chen
date  : 08-Mar-2024
*/


import React from "react";
import { createRoot } from "react-dom/client";
import LoginForm from "./login_form";


const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
    <React.StrictMode>
        <LoginForm/>
    </React.StrictMode>
);