import React, {Component} from 'react';
import {Link,Redirect } from "react-router-dom";
 import { ToastContainer,toast } from 'react-toastify';  
 import 'react-toastify/dist/ReactToastify.css';  
 import Listconst from './../Const/Listconst';
 import axios from 'axios';
 import {decode as base64_decode, encode as base64_encode} from 'base-64';
 import Joblist  from './Joblist';
 const APIstr = Listconst.API;
class Login extends Component{
  constructor(props)
    {
        super(props);
        this.state={
            Password:"",
            Username:""
        }
    } 
    onChange =(e)=>{
      var target = e.target;
      var name = target.name;
      var value = target.type=="checkbox" ? target.checked : target.value;
      this.setState({
        [name]: value
      });
    }

    onLogin =()=>{
      let{Password,Username} = this.state
        if(Username=="" || Password=="")
        {
            toast.warning('Tài khoản hoặc mật khẩu không được trống!',{autoClose:2000})
            return;
        }
        var account = new FormData();
        account.set('Username',Username);
        account.set('Password',base64_encode(Password));
        axios.post(APIstr +`api/AccountAction/Login`,account)
        .then(res=>{
                if(res && res.data==0)
                {
                  toast.error('Sai tài khoản hoặc mật khẩu!')
                  return;
                }
                else
                {
                  if(res.data && res.data.sessionLogin)
                  {
                      localStorage.setItem("TokenLogin",res.data.sessionLogin)
                  }
                  let urlredirec =window.location.href ? window.location.href.split("//")[0] +"//" + window.location.href.split("//")[1].split("/")[0]: ""
                  window.location.href=urlredirec;
                }
        })
        .catch(err=>{
            toast.error('Đăng nhập thất bại!')
            return;
        })
    }
    _handleKeyDown = (e) => { // xử lý khi nhấn enter
    //  e.preventDefault();
      if (e.key === 'Enter') {
        e.preventDefault();
          setTimeout(() => {
            this.onLogin();
          }, 300);
        
      }
    }
    render()
    {
      let{Password,Username} = this.state
        return(
            <div className="login-main">
          <div className="w-login m-auto">
            <div className="row">
              <div className="col-md-6 col-sm-12 col-12 login-main-left">
                <img src="img/banner-login.png" />
              </div>
              <div className="col-md-6 col-sm-12 col-12 login-main-right">
                <form className="login-form"> 
                  <div className="login-main-header">
                    <h3>Đăng Nhập</h3>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input type="text" className="input form-control-lgin"  name="Username" value={Username} onKeyPress={this._handleKeyDown} onChange={this.onChange} placeholder='Tài khoản'/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input type="password" className="input form-control-lgin" name="Password" value={Password} onKeyPress={this._handleKeyDown} onChange={this.onChange} placeholder='Mật khẩu' />
                    </div>
                  </div>
                  <div className="form-group d-block frm-text">
                    <a href="#" className="fg-login d-inline-block">Quên mật khẩu</a>
                    <Link className="fg-login float-right d-inline-block" to="/Register">Bạn chưa có tài khoản? Đăng ký</Link>

                  </div>
                  <button type="button" className="btn btn-primary float-right btn-login d-block w-100" onClick={this.onLogin}>
                    Đăng Nhập
                  </button>
                  {/* <div className="form-group d-block w-100 mt-5">
                    <div className="text-or text-center">
                      <span>Hoặc</span>
                    </div>

                    <div className="row">
                      <div className="col-sm-6 col-12 pr-7">
                        <button className="
                            btn btn-secondary btn-login-facebook
                            btnw
                            w-100
                            float-left
                          ">
                          <i className="fa fa-facebook" aria-hidden="true"></i>
                          <span>Đăng nhập bằng Facebook</span>
                        </button>
                      </div>
                      <div className="col-sm-6 col-12 pl-7">
                        <button className="
                            btn btn-secondary btn-login-google
                            btnw
                            w-100
                            float-left
                          ">
                          <i className="fa fa-google" aria-hidden="true"></i>
                          <span>Đăng nhập bằng Google</span>
                        </button>
                      </div>
                    </div>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
        );
    }
}
export default Login