import React, {Component} from 'react';
import axios from 'axios';
import Listconst from './../Const/Listconst';
import {Link} from "react-router-dom";
import Loading from "./Loading"
import {toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import swal from 'sweetalert2';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode= tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
const sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""

class Jobdetail extends Component{

    constructor(props)
    {
        super(props)
        this.state={
            JobDetail:[],
            Languages:[],
            Top5ListJobNew:[],
            loading:false
        }
    }
    componentDidMount()
    {
        this.setState({
            loading:true
        },()=>{
            var {match} = this.props;
            if(match)
            {
                var RecruitID =match.params.id;
               axios.get(APIstr +`api/Home/GetRecruitDetail/${RecruitID}`)
               .then(res=>{
                   this.setState({
                        JobDetail: res && res.data.length >0 ? res.data[0] :[],
                        loading:false
                   });
               })
               .catch(err=> {
                   console.log(err);
               });
    
               axios.get(APIstr +`api/Home/GetLanguage/${RecruitID}`)
               .then(res=>{
                    this.setState({
                        Languages: res && res.data.length >0 ? res.data :[]
                    });
               })
               .catch(err=> {
                   console.log(err);
               });
    
               axios.get(APIstr +`api/Home/GetTop5JobRecruit`)
               .then(res=>{
                    this.setState({
                        Top5ListJobNew: res && res.data.length >0 ? res.data :[],
                    });
               })
               .catch(err=> {
                   console.log(err);
               })
            }
            else
            {
                this.setState({
                    loading:false
               });
            }
        })
        
    }
    ShowLanguage = languages=>
    {
        var result = null;
        if(languages.length > 0)
        {
          result=languages.map((item, index)=>{
            return (          
                    <li key={index}><a>{item.languageItem}</a> </li>
            )
          });
        }
        return result;
    }
    componentDidUpdate(preProp)
    {
        let {match} = this.props;
        if(match && preProp && match.params.id != preProp.match.params.id)
        {
            this.setState({
                loading:true
            },()=>{
                let RecruitID =match.params.id;
                axios.get(APIstr +`api/Home/GetRecruitDetail/${RecruitID}`)
                .then(res=>{
                    this.setState({
                         JobDetail: res && res.data.length >0 ? res.data[0] :[],
                         loading:false
                    });
                })
                .catch(err=> {
                    console.log(err);
                });
     
                axios.get(APIstr +`api/Home/GetLanguage/${RecruitID}`)
                .then(res=>{
                     this.setState({
                         Languages: res && res.data.length >0 ? res.data :[]
                     });
                })
                .catch(err=> {
                    console.log(err);
                })
            })
           
        }
    }
    ShowTop5ListJob = lst=>
    {
        var result = null;
        if(lst.length > 0)
        {
          result=lst.map((item, index)=>{
            return (          
                <div className="job-tt-item" key={index}>
                                
                <Link to={`/Jobdetail/${item.recruitID}`} className="thumb">
                     <div style={{backgroundImage: 'url("data:image/jpeg;base64,' + item.photo + '")'}}></div>  
                </Link>
            
                <div className="info">
                <Link to={`/Jobdetail/${item.recruitID}`}  className="jobname">{item.jobWName}</Link>
                <Link to={`/Jobdetail/${item.recruitID}`} className="company">{item.departmentName}</Link>
                </div>
            </div>
            )
          });
        }
        return result;
    }
    onApply = (recruitID)=>{
        axios.get(APIstr + `api/Applicant/GetApplicantByUserName/${sessionlogin}`)
        .then(r=>{
            let info = r && r.data.length >0 ? r.data[0] : {};
            console.log("info",info)
            swal.fire({
                title: 'Chọn phương thức ứng tuyển',
                input: 'radio',
                inputOptions: {
                  '1': 'Ứng tuyển với hồ sơ trực tuyến',
                  '2': 'Đính kèm tệp CV'
                },
              
                // validator is optional
                inputValidator: function(res) {
                  if (!res) {
                    return 'Vui lòng chọn 1 phương thức ứng tuyển!';
                  }
                }
              }).then(function(res) {
                    if(res.value ==1) // hồ sơ trực tuyến
                    {
                        if(!info.birthDay || !info.districtCode || !info.email || !info.exp || !info.firstName || !info.gender
                            || !info.graduated || !info.introduceYourself || !info.lastName || !info.level || !info.married || !info.mobile
                            || !info.provinceCode || !info.school || !info.skill || !info.skillOther || !info.streetName || !info.titleDoc || !info.wardCode || !info.workProgress)
                        {
                            toast.warning("Vui lòng điền đủ thông tin cá nhân tại trang cá nhân!");
                            return;
                        }
                    }
                    else // file đính kèm
                    {
                        if(!info.cvApplicant)
                        {
                            toast.warning("Vui lòng đính kèm tệp CV tại trang cá nhân!");
                            return
                        }
                    }
                    //gọi api insert db => thông báo nếu ko lỗi hoặc vướng validate
                    let Params = new FormData();
                    Params.set('ApplicantCode',applicantcode);
                    Params.set('RecruitID',recruitID);
                    axios.post(APIstr +"api/Home/onApply",Params)
                    .then(res=>{
                        console.log("resss",res);
                        if(res && res.data && res.data.error)
                        {
                            toast.error(res.data.error);
                            return;
                        }
                        swal.fire('Ứng tuyển thành công!','Vui lòng đợi nhân sự liên hệ!', 'success')
                    })
                    .catch(err=>{
                        toast.error("API unsuccess");
                        return
                    })
                   
              })
        })
        .catch(err=>{

        })
      
    }
    render()
    {
        let {JobDetail,Languages,Top5ListJobNew,loading} = this.state;
        if(loading==true)
        {
            return <Loading />
        }
        return(
           <div>
                <div className="container-fluid job-detail-wrap">
                    <div className="container job-detail">
                        <div className="job-detail-header">
                        <div className="row">
                            <div className="col-md-2 col-sm-12 col-12">
                            <div className="job-detail-header-logo">
                                <a> 
                                <img src={"data:image/jpeg;base64," + JobDetail.photo}
                                                 className="job-logo-ima" alt="job-logo"/>
                                                 
                                </a>
                            </div>
                            </div>
                            <div className="col-md-7 col-sm-12 col-12">
                            <div className="job-detail-header-desc">
                                <div className="job-detail-header-title">
                                    <a>{JobDetail.jobWName}</a>
                                </div>
                                <div className="job-detail-header-company">
                                    <a>{JobDetail.departmentName}</a>
                                </div>
                                <div className="job-detail-header-de">
                                    <ul>
                                    <li><i className="fa fa-map-marker icn-jd"></i><span>{JobDetail.provinceName}</span></li>
                                    <li><i className="fa fa-usd icn-jd"></i><span>{JobDetail.fromSalary} VND - {JobDetail.toSalary} VND</span></li>
                                    <li><i className="fa fa-calendar icn-jd"></i><span>{JobDetail.toDate}</span></li>
                                    </ul>
                                </div>
                                <div className="job-detail-header-tag">
                                    <ul>
                                          {this.ShowLanguage(Languages)}
                                    </ul>
                                </div>
                            </div>
                            </div>
                            <div className="col-md-3 col-sm-12 col-12">
                            <div className="jd-header-wrap-right">
                                <div className="jd-center">
                                <button onClick={()=>this.onApply(JobDetail.recruitID)} className="btn btn-primary btn-apply">Nộp đơn</button>
                                <p className="jd-view">Lượt xem: <span>{JobDetail.view}</span></p>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="clearfix"></div>

                    <div className="wrapper">
                <div className="container">
                    <div className="row">
                    <div className="col-md-8 col-sm-12 col-12 clear-left">
                        <div className="main-wrapper">
                        <h2 className="widget-title">
                            <span>Phúc lợi</span>
                        </h2>
                        <div className="welfare-wrap">
                            <div className="row">
                            <div className="welfare-list" dangerouslySetInnerHTML={{ __html: (JobDetail.benefits) }}>
                            </div>
                            </div>
                        </div>
                        <h2 className="widget-title">
                            <span>Mô tả công việc</span>
                        </h2>
                        <div className="jd-content" dangerouslySetInnerHTML={{ __html: JobDetail.jobdescription }}>
          
                        </div>
                        <h2 className="widget-title">
                            <span>Yêu cầu công việc</span>
                        </h2>
                        <div className="jd-content" dangerouslySetInnerHTML={{ __html: JobDetail.required }}>
             
                        </div>

                        </div>




                    </div>
                    <div className="col-md-4 col-sm-12 col-12 clear-right">
                        <div className="side-bar mb-3">
                        <h2 className="widget-title">
                            <span>Thông tin</span>
                        </h2>
                        
                        <div className="job-info-wrap">
                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Nơi làm việc:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.provinceName}</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Cấp bậc:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">Nhân viên</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Lương:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.fromSalary}-{JobDetail.toSalary} VND</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Hạn nộp:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.toDate}</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Ngành nghề:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.jobWName}</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Kỹ năng:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.language}</span>
                                </div>
                            </div>
                            </div>

                            <div className="job-info-list">
                            <div className="row">
                                <div className="col-sm-4">
                                <span className="ji-title">Kinh nghiệm:</span>
                                </div>
                                <div className="col-sm-8">
                                <span className="ji-main">{JobDetail.exp} năm</span>
                                </div>
                            </div>
                            </div>
                        </div>


                        </div>

                        <div className="side-bar mb-3">
                        <h2 className="widget-title">
                            <span>Giới thiệu công ty</span>
                        </h2>
                        <div className="company-intro">
                            <a>
                            <img src="../img/hcmutelogo2.jpg" className="job-logo-ima" alt="job-logo" />
                            </a>
                        </div>
                            <h2 className="company-intro-name">Đại học sư phạm kỹ thuật TPHCM</h2>
                            <ul className="job-add">
                            <li>
                                <i className="fa fa-map-marker ja-icn"></i>
                                <span>Trụ sở: 1 Võ Văn Ngân- Phường Linh Chiểu - TP Thủ Đức</span>
                            </li>
                            <li>
                                <i className="fa fa-bar-chart ja-icn"></i>
                                <span>Quy mô công ty: 100-500 người</span>
                            </li>
                            </ul>

                            <div className="wrap-comp-info mb-2">
                            <a href="#" className="btn btn-primary btn-company">Xem thêm</a>
                            </div>
                        </div>

                        <div className="side-bar mb-3">
                            <h2 className="widget-title">
                                <span>Việc làm tương tự</span>
                            </h2>
                            
                            <div className="job-tt-contain">
                               {this.ShowTop5ListJob(Top5ListJobNew)}

                            </div>
                        </div>

                       {/*  <div className="side-bar mb-3">

                            <div className="container">
                                <div className="row">
                                <div className="col-md-12">
                                    <div className="home-ads">
                                    <a href="#">
                                        <img src="img/ads1.jpg" />
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div> 

                        </div>*/}
                    </div>
                    </div>
                </div>
                </div>
           </div>
        )
    }
}

export default Jobdetail;