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
                                        1 V?? V??n Ng??n, TP.Th??? ?????c
                                        </span>
                                    </li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-4 col-12">
                                    <h2 class="footer-heading">
                                    <span>Ng??n ng??? n???i b???t</span>
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
                                    <span>T???t c??? ng??nh ngh???</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>L???p tr??nh vi??n</span></li>
                                    <li><span>Ki???m th??? ph???n m???m</span></li>
                                    <li><span>K??? s?? c???u n???i</span></li>
                                    <li><span>Qu???n l?? d??? ??n</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-6 col-12">
                                    <h2 class="footer-heading">
                                    <span>T???t c??? h??nh th???c</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>Nh??n vi??n ch??nh th???c</span></li>
                                    <li><span>Nh??n vi??n b??n th???i gian</span></li>
                                    <li><span>Freelancer</span></li>
                                    </ul>
                                </div>
                                <div class="col-md-2 col-sm-12 col-12">
                                    <h2 class="footer-heading">
                                    <span>T???t c??? t???nh th??nh</span>
                                    </h2>
                                    <ul class="footer-list">
                                    <li><span>H??? Ch??nh Minh</span></li>
                                    <li><span>H?? N???i</span></li>
                                    <li><span>???? N???ng</span></li>
                                    <li><span>Bu??n Ma Thu???t</span></li>
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
