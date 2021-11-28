import React, {Component} from 'react';
import {Link} from "react-router-dom";
class Login extends Component{
    render()
    {
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
                      <h5>Username</h5>
                      <input type="text" className="input form-control-lgin" />
                    </div>
                  </div>
                  <div className="input-div pass">
                    <div className="div lg-lable">
                      <h5>Password</h5>
                      <input type="password" className="input form-control-lgin" />
                    </div>
                  </div>
                  <div className="form-group d-block frm-text">
                    <a href="#" className="fg-login d-inline-block">Quên mật khẩu</a>
                    <Link className="fg-login float-right d-inline-block" to="/Register">Bạn chưa có tài khoản? Đăng ký</Link>

                  </div>
                  <button type="submit" className="btn btn-primary float-right btn-login d-block w-100">
                    Đăng Nhập
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
        );
    }
}
export default Login