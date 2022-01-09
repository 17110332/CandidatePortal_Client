
import React, {Component} from 'react';
import {Link} from "react-router-dom";
 import { ToastContainer,toast } from 'react-toastify';  
 import 'react-toastify/dist/ReactToastify.css';  
 import Listconst from './../Const/Listconst';
 import axios from 'axios';
const APIstr = Listconst.API;
 toast.configure();

class Forgotpassword extends Component{ 

    constructor(props)
    {
        super(props);
        this.state={
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
    SendPassword = ()=>{
      let{Username,Email} = this.state;
      if(Username =="" || Email=="")
      {
        toast.warning("Các thông tin không được để trống!");
        return;
      }
      let formdata = new FormData();
      formdata.set("Username",Username);
      formdata.set("Email",Email);
      axios.post(APIstr +`api/AccountAction/ForgotPassword`,formdata)
      .then(res=>{
              if(res && res.data==-1)
              {
                  toast.error('Không gửi được mail do chính sách bảo mật! Liên hệ trực tiếp quản trị viên để lấy lại mật khẩu')
                  return;
              }
              else
              {
                  toast.success("Đã gửi mật khẩu qua mail, vui lòng kiểm tra mail!");
                  this.setState({
                    Username:"",
                    Email:""
                  })
              }
      })
      .catch(err=>{
          toast.error('Call API unsucess')
          return;
      })
    }
    render()
    {
        let{Email,Username} = this.state
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
                    <h3>Khôi phục mật khẩu</h3>
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
                  <button type="button" className="btn btn-primary float-right btn-login d-block w-100" onClick={()=>this.SendPassword()}>
                    Gửi mật khẩu mới tới email
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        )
    }
}

export default Forgotpassword;
