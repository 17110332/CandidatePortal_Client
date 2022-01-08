import React from "react";
import Joblist from "./Body/Joblist";
import Notfound from "./Body/Notfound";
import Jobdetail from "./Body/Jobdetail";
import Login from "./Body/Login";
import Register from "./Body/Register";
import QuyTrinhTuyenDung from "./Body/QuyTrinhTuyenDung";
import Myprofile from "./Profile/Myprofile";
import Recruit from "./Hr/Recruit";
import Candidate from "./Hr/Candidate"
import Profilecandidate from "./Profile/Profilecandidate";
import Candidatetmp from "./Hr/Candidatetmp";
import ResultCandidate from "./Profile/ResultCandidate";
import Changepassword from "./Body/Changepassword";
import Forgotpassword from "./Body/Forgotpassword";
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
        path: "/Changepassword",
        exact: false,
        main: ()=><Changepassword />
    },
    {
        path: "/Forgotpassword",
        exact: false,
        main: ()=><Forgotpassword />
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
        path: "/HrCandidate",
        exact: false,
        main: ()=><Candidate />
    },
    {
        path: "/Profilecandidate/:applicantcode",
        exact: false,
        main: ({match})=><Profilecandidate match={match} />
    },
    {
        path: "/HrCandidateTmp",
        exact: false,
        main: ()=><Candidatetmp />
    },
    {
        path: "/ResultCandidate",
        exact: false,
        main: ()=><ResultCandidate />
    },
    {
        path: "",
        exact: false,
        main: ()=><Notfound />
    }
];

export default routes;