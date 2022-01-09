
import React, {Component} from 'react';
import {Link} from "react-router-dom";
 import { ToastContainer,toast } from 'react-toastify';  
 import 'react-toastify/dist/ReactToastify.css';  
 import Listconst from './../Const/Listconst';
 import axios from 'axios';
 import {decode as base64_decode, encode as base64_encode} from 'base-64';
const APIstr = Listconst.API;
 toast.configure();

class Changepassword extends Component{ 

    constructor(props)
    {
        super(props);
        this.state={
            Username:"",
            Password:"",
            Newpassword:"",
            Newpasswordconfirm:""
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
    ChangePassword=()=>{
        let{Username,Password,Newpasswordconfirm,Newpassword} = this.state;
        if(Newpasswordconfirm != Newpassword)
        {
          toast.warning("Mật khậu nhập không khớp");
          return;
        }
        else if(Username =="" || Password=="" || Newpassword=="" || Newpasswordconfirm=="")
        {
          toast.warning("Các thông tin không được để trống!");
          return;
        }
        let formdata = new FormData();
        formdata.set("Username",Username);
        formdata.set("Password",base64_encode(Password));
        formdata.set("NewPassword",base64_encode(Newpassword));
        axios.post(APIstr +`api/AccountAction/ChangePassword`,formdata)
        .then(res=>{
                if(res && res.data==0)
                {
                  toast.error('Sai tài khoản hoặc mật khẩu!')
                  return;
                }
                if(res && res.data==-1)
                {
                  toast.error('Call API unsuccess!')
                  return;
                }
                else
                {
                  toast.success("Đổi mật khẩu thành công!");
                  this.setState({
                    Username:"",
                    Password:"",
                    Newpassword:"",
                    Newpasswordconfirm:""
                  })
                }
        })
        .catch(err=>{
            toast.error('Call API unsuccess!')
            return;
        })

    }
    render()
    {
        let{Username,Password,Newpasswordconfirm,Newpassword} = this.state
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
                      <input placeholder="Mật khẩu cũ" type="password" className="input form-control-lgin"    name="Password" value={Password}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="Mật khẩu mới" type="password" className="input form-control-lgin"    name="Newpassword" value={Newpassword}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <div className="input-div one">
                    <div className="div lg-lable">
                      <input placeholder="nhập lại khẩu mới" type="password" className="input form-control-lgin"    name="Newpasswordconfirm" value={Newpasswordconfirm}  onChange={this.onChange}/>
                    </div>
                  </div>
                  <button type="button" className="btn btn-primary float-right btn-login d-block w-100" onClick={()=>this.ChangePassword()}>
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
