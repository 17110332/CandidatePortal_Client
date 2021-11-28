
import React, {Component} from 'react';
import {Link} from "react-router-dom";
 import { ToastContainer,toast } from 'react-toastify';  
 import 'react-toastify/dist/ReactToastify.css';  
 import Listconst from './../Const/Listconst';
 import axios from 'axios';
const APIstr = Listconst.API;
 toast.configure();

class Register extends Component{ 

    constructor(props)
    {
        super(props);
        this.state={
            PasswordConfirm:"",
            Password:"",
            FirstName:"",
            LastName:"",
            Mobile:"",
            Email:"",
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
    Regist =()=>{
        let{PasswordConfirm,Password,FirstName,LastName,Mobile,Email,Username} = this.state
        if(FirstName=="")
        {
            toast.warning('Chưa nhập họ + tên lót',{autoClose:2000})
            return;
        }
        else if(LastName=="")
        {
            toast.warning('Chưa nhập tên',{autoClose:2000})
            return;
        }
        else if(Mobile=="")
        {
            toast.warning('Chưa nhập số điện thoại',{autoClose:2000})
            return;
        }
        else if(Email=="")
        {
            toast.warning('Chưa nhập Email',{autoClose:2000})
            return;
        }
        else if(Username=="")
        {
            toast.warning('Chưa nhập tên tài khoản',{autoClose:2000})
            return;
        }
        else if(Password=="")
        {
            toast.warning('Chưa nhập mật khẩu',{autoClose:2000})
            return;
        }
        else if(PasswordConfirm=="")
        {
            toast.warning('Chưa nhập nhập lại mật khẩu',{autoClose:2000})
            return;
        }
        else if(PasswordConfirm != Password)
        {
            toast.warning('Mật khẩu nhập lại không khớp',{autoClose:2000})
            return;
        }
        console.log("this.state",this.state);
        var account = new FormData();
        account.set('FirstName',FirstName);
        account.set('LastName',LastName);
        account.set('Mobile',Mobile);
        account.set('Username',Username);
        account.set('Email',Email);
        account.set('Password',Password);
        axios.post(APIstr +`api/AccountAction/RegistAccount`,account)
        .then(res=>{
            console.log("ress",res)
            this.setState({
                PasswordConfirm:"",
                Password:"",
                FirstName:"",
                LastName:"",
                Mobile:"",
                Email:"",
                Username:""
            },()=>{
                if(res && res.data==1)
                {
                    toast.success('Đăng ký tài khoản thành công!')
                }
                else
                {
                    toast.error('Đăng ký tài khoản lỗi!')
                }
            });
        })
        .catch(err=>{
            toast.error('Đăng ký tài khoản lỗi!')
            return;
        })
      //  toast.success('successful!!!')
       // toast.error('error!!!',{autoClose:false})
      //  toast.warning('warning!!!',{autoClose:2000})
    }
    render()
    {
        let{PasswordConfirm,Password,FirstName,LastName,Mobile,Email,Username} = this.state
        return(
            <div className="login-main">
          <div className="w-login m-auto">
            <div className="row">
              <div className="col-md-6 col-sm-12 col-12 login-main-left">
                <img src="img/banner-login.png" />
              </div>
              <div className="col-md-6 col-sm-12 col-12 login-main-right">
                <form className="login-form reg-form">
                  <div className="login-main-header">
                    <h3>Đăng Ký</h3>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Họ Và Tên Lót (*)" type="text" className="input form-control-lgin"    name="FirstName" value={FirstName}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Tên (*)" type="text" className="input form-control-lgin" name="LastName" value={LastName}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Email (*)" type="text" className="input form-control-lgin" name="Email" value={Email}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Tên tài khoản (*)" type="text" className="input form-control-lgin" name="Username" value={Username}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Số điện thoại (*)" type="text" className="input form-control-lgin" name="Mobile" value={Mobile}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Mật khẩu (*)" type="password" className="input form-control-lgin" name="Password" value={Password}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one"> 
                    <div className="div lg-lable">
                      <input placeholder="Nhập lại mật khẩu (*)" type="password" className="input form-control-lgin" name="PasswordConfirm" value={PasswordConfirm}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="form-group d-block frm-text">
                    <a href="#" className="fg-login d-inline-block"></a>
                    <Link className="fg-login float-right d-inline-block" to="/Login">Bạn đã có tài khoản? Đăng Nhập</Link>
                  </div>
                  <button type="button" className="btn btn-primary float-right btn-login d-block w-100" onClick={()=>this.Regist()}>
                    Đăng Ký
                  </button>
                 
                  <div className="form-group d-block w-100 mt-5">
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default Register;
