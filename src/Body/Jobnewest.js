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
        //nhúng js vào
        const script = document.createElement("script");
        script.src = "./js/owlcarousel/owl.carouselrun.js";
        script.async = true;
        document.body.appendChild(script);

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
                                     <img src={"data:image/jpeg;base64," + item.photo}
                                                 className="job-logo-ima" alt="job-logo"/>
                                </div>
                            </Link>
                            <div className="job-lt-info">
                                <Link to={`/Jobdetail/${item.recruitID}`} className="job-latest-group">
                                    <h3>{item.jobWName}</h3>
                                </Link>
                                <Link className="company" to={`/Jobdetail/${item.recruitID}`}>
                                     {item.departmentName}
                                </Link>
                                <p className="address"><i className="fa fa-map-marker pr-1" aria-hidden="true"></i>{item.provinceName}</p>
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
                                    
                                     </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Jobnewest;