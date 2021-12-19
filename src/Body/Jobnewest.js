import React, { Component } from 'react';
import axios from 'axios';
import Listconst from './../Const/Listconst';
import { Link } from "react-router-dom";
const APIstr = Listconst.API;
class Jobnewest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lstJobNewest: [],
        }
    }
    componentDidMount() {
        axios.get(APIstr + "api/Home/GetTop18JobRecruit")
            .then(res => {
                console.log("top 18", res)
                this.setState({
                    lstJobNewest: res && res.data.length > 0 ? res.data : []
                })
            })
            .catch(err => {
                console.log(err)
            })
    }
    ShowJobsTopp18 = (lstJob) => {
        var result = null;
        if (lstJob.length > 0) {
            result = lstJob.map((item, index) => {
                return (
                    <div className="owl-item css2" key={index} >
                        <div className="item job-latest-item">
                            <Link to={`/Jobdetail/${item.recruitID}`}  className="job-latest-group">
                                <div className="job-lt-logo">
                                    <img src="img/fpt-logo.png" />
                                </div>
                            </Link>
                            <div className="job-lt-info">
                                <Link to={`/Jobdetail/${item.recruitID}`} className="job-latest-group">
                                    <h3>[HCM] 02 Solution Architects–Up to $2000 #1</h3>
                                </Link>
                                <Link className="company" to={`/Jobdetail/${item.recruitID}`}>
                                    FPT Software
                                </Link>
                                <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return result;
    }
    render() {
        let { lstJobNewest } = this.state;
        return (
            <div className="container-fluid">
                <div className="container job-board2">
                    <div className="row">
                        <div className="col-md-12 job-board2-wrap-header">
                            <h3>Tin tuyển dụng, việc làm mới nhất</h3>
                        </div>
                        <div className="col-md-12 job-board2-wrap">
                            <div className="owl-carousel owl-theme job-board2-contain owl-loaded owl-drag">
                                <div className="owl-stage-outer">
                                    <div className="owl-stage css1">
                                        {this.ShowJobsTopp18(lstJobNewest)}
                                        {/* <div className="owl-item css2" >
                                            <div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/alipay-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>Fullstack .NET Developer (Angular/React) #2</h3>
                                                </a><a className="company" href="#">Orient Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div>
                                        </div>
                                          <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/nvg-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>Frontend Developer (JavaScript, ReactJS)</h3>
                                                </a><a className="company" href="#">mgm technology</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                              <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/luxoft-vietnam-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>IVI System Test Engineer</h3>
                                                </a><a className="company" href="#">LUXOFT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                           <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                           <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                              <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                             <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>
                                            <div className="owl-item active css2" ><div className="item job-latest-item">
                                                <a href="#" className="job-latest-group">
                                                    <div className="job-lt-logo">
                                                        <img src="img/fpt-logo.png" />
                                                    </div>
                                                </a><div className="job-lt-info"><a href="#" className="job-latest-group">
                                                    <h3>[HCM] 02 Solution Architects–Up to $2000</h3>
                                                </a><a className="company" href="#">FPT Software</a>
                                                    <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i> Đà Nẵng</p>
                                                </div>

                                            </div></div>  */}


                                     </div></div>
                            </div></div>
                        {/* <div className="owl-nav">
                            <button type="button" role="presentation" className="owl-prev">
                                <span aria-label="Previous">‹</span></button>
                            <button type="button" role="presentation" className="owl-next disabled">
                                <span aria-label="Next">›</span></button>
                        </div> */}
                        {/* <div className="owl-dots">
                        <button role="button" className="owl-dot"><span></span></button>
                        <button role="button" className="owl-dot"><span></span></button>
                        <button role="button" className="owl-dot active"><span></span></button>
                    </div> */}
                    </div>

                </div>
            </div>
        );
    }
}

export default Jobnewest;