
import React, {Component} from 'react';
import {Link} from "react-router-dom";
 import { ToastContainer,toast } from 'react-toastify';  
 import 'react-toastify/dist/ReactToastify.css';  
 import Listconst from './../Const/Listconst';
 import axios from 'axios';
const APIstr = Listconst.API;
 toast.configure();

class Changepassword extends Component{ 

    constructor(props)
    {
        super(props);
        this.state={
            Email:"",
            Username:"",
            Password:"",
            Newpassword:"",
            Newpasswordconfirm:""
        }
    }
    render()
    {
        let{Email,Username,Password,Newpasswordconfirm,Newpassword} = this.state
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
                    <h3>Đổi mật khẩu</h3>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Nhập tài khoàn" type="text" className="input form-control-lgin"    name="Username" value={Username}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Nhập email lúc tạo tài khoản" type="text" className="input form-control-lgin"    name="Email" value={Email}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Mật khẩu cũ" type="text" className="input form-control-lgin"    name="Password" value={Password}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Mật khẩu mới" type="text" className="input form-control-lgin"    name="Newpassword" value={Newpassword}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="nhập lại khẩu mới" type="text" className="input form-control-lgin"    name="Newpasswordconfirm" value={Newpasswordconfirm}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary float-right btn-login d-block w-100" onClick={()=>this.Regist()}>
                    Đổi mật khẩu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default Changepassword;
