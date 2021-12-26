import React from "react";
import Joblist from "./Body/Joblist";
import Notfound from "./Body/Notfound";
import Jobdetail from "./Body/Jobdetail";
import Login from "./Body/Login";
import Register from "./Body/Register";
import QuyTrinhTuyenDung from "./Body/QuyTrinhTuyenDung";
import Myprofile from "./Profile/Myprofile";
import Recruit from "./Hr/Recruit";
const routes = [
    {
        path: "/",
        exact: true,
        main: ()=> <Joblist />
    } ,
    {
        path: "/Jobdetail/:id",
        exact: false,
        main: ({match})=><Jobdetail match={match} />
    },
    {
        path: "/Login",
        exact: false,
        main: ()=><Login />
    },
    {
        path: "/Register",
        exact: false,
        main: ()=><Register />
    },
    {
        path: "/Myprofile",
        exact: false,
        main: ()=><Myprofile />
    },
    {
        path: "/QuyTrinhTuyenDung",
        exact: false,
        main: ()=><QuyTrinhTuyenDung />
    },
    {
        path: "/HrProfile",
        exact: false,
        main: ()=><Recruit />
    },
    {
        path: "",
        exact: false,
        main: ()=><Notfound />
    }
];

export default routes;