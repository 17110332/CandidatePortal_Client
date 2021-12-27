import './App.css';
import Login from './Header/Login';
import Joblist from './Body/Joblist'
import Footer from './Footer/Footer';
import React, {Component} from 'react';
// import { ToastContainer,toast } from 'react-toastify';  
// import 'react-toastify/dist/ReactToastify.css';   
import routes from "./routes";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
class App extends Component{ 

  ShowContent = (routes)=>{
    var result =null;
    if(routes.length >0)
    {
      result = routes.map((route, index) => {
        return(
        <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        );
      });
    }
    return <Switch>{result}</Switch>
  }
  render()
  {
    return (
        <Router>
          <Login />
          {this.ShowContent(routes)}
          <div className="clearfix"></div>
          <Footer />
          <div class="container-fluid footer-wrap  clear-left clear-right footeinfo">
                    <div class="container footer">
                        <div class="row">
                            <div class="col-md-4 col-sm-8 col-12">
                                <h2 class="footer-heading">
                                    <span>About</span>
                                </h2>
                                    <p class="footer-content">
                                    Discover the best way to find houses, condominiums, apartments and HDBs for sale and rent in Singapore with JobsOnline, Singapore's Fastest Growing Jobs Portal.
                                    </p>
                                    <ul class="footer-contact">
                                    <li>
                                        <span>
                                        <i class="fa fa-phone fticn"></i> +123 456 7890
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                        <i class="fa fa-envelope fticn"></i> 
                                        hello@123.com
                                        </span>
                                    </li>
                                    <li>
                                        <span>
                                        <i class="fa fa-map-marker fticn"></i>
                                        1 Võ Văn Ngân, TP.Thủ Đức
                                        </span>
                                    </li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-4 col-12">
                                    <h2 class="footer-heading">
                                    <span>Ngôn ngữ nổi bật</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>Javascript</span></li>
                                    <li><span>Java</span></li>
                                    <li><span>Frontend</span></li>
                                    <li><span>SQL Server</span></li>
                                    <li><span>.NET</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-6 col-12">
                                    <h2 class="footer-heading">
                                    <span>Tất cả ngành nghề</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>Lập trình viên</span></li>
                                    <li><span>Kiểm thử phần mềm</span></li>
                                    <li><span>Kỹ sư cầu nối</span></li>
                                    <li><span>Quản lý dự án</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-6 col-12">
                                    <h2 class="footer-heading">
                                    <span>Tất cả hình thức</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>Nhân viên chính thức</span></li>
                                    <li><span>Nhân viên bán thời gian</span></li>
                                    <li><span>Freelancer</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-12 col-12">
                                    <h2 class="footer-heading">
                                    <span>Tất cả tỉnh thành</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>Hồ Chính Minh</span></li>
                                    <li><span>Hà Nội</span></li>
                                    <li><span>Đà Nẵng</span></li>
                                    <li><span>Buôn Ma Thuột</span></li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
        </Router>
    );
  }
  
}

export default App;
