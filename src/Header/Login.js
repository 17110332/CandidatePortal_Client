import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {decode as base64_decode, encode as base64_encode} from 'base-64';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            FullName:""
        }
    }
    componentDidMount()
    {
        let tokenlogin = localStorage.getItem("TokenLogin");
        let fullname=tokenlogin ? base64_decode(tokenlogin).split("___+=()*")[0] : ""
        this.setState({
            FullName:fullname
        })
    }
    OnLogOut = ()=>
    {

        this.setState({
            FullName:""
        },()=>{
            localStorage.removeItem("TokenLogin");
        })
    }
    render()
    {
        let tokenlogin = localStorage.getItem("TokenLogin");
        let {FullName} = this.state;
        return(
            <div>
                <div className="container-fluid fluid-nav" style={{ backgroundColor:'#0c0c38'}}> 
                    <div className="container cnt-tnar">
                            <nav className="navbar navbar-expand-lg navbar-light bg-light tjnav-bar">
    
                                <Link className="nav-logo" to="/">
                                    <img src="img/techjobs_bgb.png" alt="" />
                               </Link>
                                <button className="navbar-toggler tnavbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <i className="fa fa-bars icn-res" aria-hidden="true"></i>
                                </button>
    
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mr-auto tnav-left tn-nav">
                                        <li className="nav-item">
                                            {/* <a className="nav-link" href="index.html">Việc Làm IT</a> */}
                                            <Link className="nav-link" to="/">Trang chủ</Link>

                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="index.html">Tin Tức</a>
                                        </li>
                                        {/* <li className="nav-item dropdown">
                                            <a href="index.html" className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            Dropdown
                                            </a>
                                            <div className="dropdown-menu tdropdown" aria-labelledby="navbarDropdown">
                                            <a href="index.html" className="dropdown-item" >Action</a>
                                            <a href="index.html" className="dropdown-item">Another action</a>
                                            <div className="dropdown-divider"></div>
                                            <a href="index.html" className="dropdown-item" >Something else here</a>
                                            </div>
                                        </li> */}
                                </ul>
                                    <ul className="navbar-nav mr-auto my-2 my-lg-0 tnav-right tn-nav">
                                        <li className="nav-item active">
                                            <a  className="nav-link" ><i className="fa fa-search" aria-hidden="true"></i> <span className="hidden-text">Tìm kiếm</span></a>
                                        </li>
                                        {
                                            FullName !="" && 
                                            <li className="nav-item dropdown">
                                                 <a className="nav-link dropdown-toggle" to="/Register" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Xin chào {FullName}</a>
                                                 <div className="dropdown-menu tdropdown" aria-labelledby="navbarDropdown">
                                                 <Link className="dropdown-item" to="/Myprofile">Thông tin cá nhân</Link>
                                                </div>
                                            </li>
                                            
                                        }
                                        {
                                              FullName !="" && 
                                            <li className="nav-item">
                                                 <Link className="nav-link" to="/" onClick={this.OnLogOut}>Đăng xuất</Link>
                                            </li>
                                        }
                                        {
                                            FullName =="" && 
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Register">Đăng Ký</Link>
                                            </li>
                                            
                                        }
                                        {
                                              FullName =="" && 
                                              <li className="nav-item">
                                                    <Link className="nav-link" to="/Login">Đăng Nhập</Link>
                                               </li>
                                        }
                                       
                                        
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            VI
                                            </a>
                                            <div className="dropdown-menu tdropdown" aria-labelledby="navbarDropdown">
                                            <a  className="dropdown-item">English</a>
                                            </div>
                                        </li>
                                        {/* <li className="nav-item">
                                            <a href="index.html" className="nav-link btn-employers"  tabIndex="-1" aria-disabled="true">Nhà Tuyển Dụng</a>
                                        </li> */}
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
            </div>
        )
    }
   
}
export default Login