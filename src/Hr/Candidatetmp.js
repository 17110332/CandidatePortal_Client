import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import DefaultAVT from '../Const/AVT';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import './../Profile/Myprofile.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import './Candidate.css';
import swal from 'sweetalert2';
import Notfound from '../Body/Notfound';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
const avata = DefaultAVT.base64str;
const sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
const role = base64_decode(sessionlogin).split("!@#$#@!").length >1 ?base64_decode(sessionlogin).split("!@#$#@!")[1] : 1; //1: ứng viên, 2: hr

const step1Content = <h1>Step 1 Content</h1>;
const step2Content = <h1>Step 2 Content</h1>;
const step3Content = <h1>Step 3 Content</h1>;


const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
 

class Candidatetmp extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            dataCandidate:{},
            lstCandidate:[],
            candidateEle:"itemcandidate_0",
            isfirstload:true
        }
    }
    componentDidMount(){
        this.onLoadDataMaster();
    }

    onLoadDataMaster = (callback)=>{
        axios.get(APIstr +`api/Recruit/GetCandidateTMP/${applicantcode}`)
        .then(res=>{
            console.log("resss",res)
           this.setState({
                lstCandidate : res && res.data.length > 0 ? res.data :[]
           })
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(() => {
            let ele = document.getElementById("itemcandidate_0");
            if(ele)
            {
                this.onClickMaster(this.state.lstCandidate[0].applicantCode,this.state.lstCandidate[0].recruitID,'itemcandidate_0')
            }
        });
    }
    onLoadDetail = (applicantCode,recruitID)=>{
        let {lstCandidate} = this.state;
        if(applicantCode && recruitID)
        {
            let item =  lstCandidate.filter(function(i){
                return i.applicantCode == applicantCode && i.recruitID==recruitID;
            });
            console.log("item",item)
            this.setState({
                dataCandidate:item && item.length > 0 ? item[0] : {}
            }) 
        }
    }
    onClickMaster = (applicantcode, recruitID,iditem)=>{
        let {candidateEle,isfirstload} = this.state;
        if(iditem != candidateEle || isfirstload)
        {
            //add active
            let ele = document.getElementById(iditem);
            if(ele)
            {
                ele.style.backgroundColor= "#ADD8E6";
            }
            //xóa active cũ
            let preele = document.getElementById(candidateEle);
            if(preele && !isfirstload)
            {
                preele.style.backgroundColor= "inherit";
            }
            this.setState({
                candidateEle:iditem,
                isfirstload:false
            },()=>{
                //load detail nè
                this.onLoadDetail(applicantcode,recruitID);
            })
        }
    }
    
    ShowListCandidate = lst=>
    {
        var result = null;
        if(lst.length > 0)
        {
          result=lst.map((item, index)=>{
            let iditem ="itemcandidate_"+index;
            if(item.avatar=="" || !item.avatar)
            {
                item.avatar=avata
            }
            return (          
                <div className="job-tt-item itemdatamaster "  id={iditem} key={index} onClick={()=>this.onClickMaster(item.applicantCode,item.recruitID,iditem)}>  
                     <a className="thumb">
                        <div style={{backgroundImage: 'url("data:image/jpeg;base64,' + item.avatar + '")'}} ></div>  
                    </a>
                    <div className="info">
                        <a  className="jobname">Ứng viên: {item.firstName} {item.lastName}</a>
                        <a  className="jobname">Vị trí: {item.jobWName}</a>
                        <a className="jobname">Phòng ban: {item.departmentName}</a>
                        <a className="jobname">Địa điểm: {item.provinceName}</a>
                    </div>
                </div>
            )
          });
        }
        return result;
    }
    // setup step validators, will be called before proceeding to the next step
    step2Validator  = ()=> {
        // return a boolean
    }
    
    step3Validator = ()=> {
        // return a boolean
    }
    
    onFormSubmit = ()=> {
        // handle the submit logic here
        // This function will be executed at the last step
        // when the submit button (next button in the previous steps) is pressed
    }
    UpdateStatus=(applicantCode,recruitid,status)=>{
        let request = new FormData();
        request.set("ApplicantCode",applicantCode);
        request.set("RecruitID",recruitid);
        request.set("Status",status);
        axios.post(APIstr +`api/Recruit/UpdateStatus/${applicantcode}`,request)
        .then(res=>{
            console.log("resss",res)
            if(res && res.data && res.data.respond && res.data.respond.length > 0)
            {
                this.setState({
                    lstCandidate: res.data.respond
                },()=>{
                    this.onLoadDetail(applicantCode.split("_")[0],recruitid)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    DeleteApplicantTMP=(applicantCode,recruitid,)=>{
        let request = new FormData();
        request.set("ApplicantCode",applicantCode);
        axios.post(APIstr +`api/Recruit/DeleteApplicantTMP/${applicantcode}`,request)
        .then(res=>{
            console.log("deleteeeeeee",res)
            toast.success('Đã xóa xong!');
            if(res && res.data && res.data.respond && res.data.respond.length > 0)
            {
                this.setState({
                    lstCandidate: res.data.respond
                },()=>{
                    this.onLoadDetail(applicantCode,recruitid)
                })
            }
        })
        .catch(err=>{
            console.log(err)
        })
    }
    SaveDoc=(applicantCode)=>{
        let request = new FormData();
        request.set("ApplicantCode",applicantCode);
        axios.post(APIstr +`api/Recruit/SaveApplicantTMP/${applicantcode}`,request)
        .then(res=>{
            console.log("tthungaaaaaaaaaa",res)
            toast.success('Đã lưu xong!');
        })
        .catch(err=>{
            console.log(err)
        })
    }
    render()
    {  
        if(role != 2)
        {
            return <Notfound />
        }
        else{
            let {dataCandidate,lstCandidate} = this.state
            console.log("hihihihi", dataCandidate)
            // 0: like job, 1: chờ duyệt,2: chờ phỏng vấn, 3: đậu pv, 4: xác nhận làm việc, 5: từ chối nhận việc, 6 rớt pv
            //status =5 => đổi sang màu xanh
            //status =6 => đổi sang màu xám
            let fillterbackground="linear-gradient(to right, #fefb72, #f0bb31)"
            let percent =0;
            let title="";
            if(dataCandidate.status==1)
            {
                percent=0;
                title="Duyệt";
            }
            else if(dataCandidate.status==2)
            {
                percent=33.33;
                title="Đạt phỏng vấn";
            }
            else if(dataCandidate.status==3) 
            {
                percent=66.66;
                title="Nhận việc";
            }
            else if(dataCandidate.status==4) 
            {
                percent=100;
                title="Đã nhận việc";
            }
            else if(dataCandidate.status==5) 
            {
                percent=95;
                fillterbackground="linear-gradient(to right, magenta, magenta)"
            }
            else if(dataCandidate.status==6) 
            {
                percent=50;
                fillterbackground="linear-gradient(to right, red, red)"
            }
            return (
                <div>
                <div className="clearfix"></div>
                <nav className="navbar navbar-expand-lg navbar-light nav-recuitment">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNava" aria-controls="navbarNava" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container" id="navbarNava">
                        <ul className="navbar-nav nav-recuitment-li">
                        <li className="nav-item active">
                            <Link to={`/HrProfile`}  className="nav-link">Danh sách đăng tuyển</Link>
                            </li>
                            {/* <li className="nav-item">
                                <a className="nav-link" href="#">Danh mục chức danh</a>
                            </li> */}
                            <li className="nav-item">
                                <Link to={`/HrCandidate`}  className="nav-link">Hồ sơ ứng viên</Link>
                            </li>
                            <li className="nav-item">
                                <Link to={`/HrCandidateTMP`}  className="nav-link">Ứng viên đã lưu</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
                <div className="container-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="home-ads">
                                <a href="#">
                                    <img src="img/hna2.jpg" />
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid published-recuitment-wrapper">
                    <div className="container published-recuitment-content">
                        <div className="row">
                            <div className="col-md-4 col-sm-12 col-12 col-lg-4 lstmaster">
                                <input type="input" placeholder="Tìm kiếm" id="timkiem"/>
                                <div className="job-tt-contain">
                                    { this.ShowListCandidate(lstCandidate)}
                                </div>
                                <div id="divmaster">
                                    <button type="button" id="btnadd" className="btn-submit-recuitment" onClick={()=>this.DeleteApplicantTMP(dataCandidate.applicantCode,dataCandidate.recruitID)}>
                                         <i className="fa fa-floppy-o pr-2"></i>Xóa
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12 col-12 recuitment-inner">
                            
                                <form className="recuitment-form">
                                    <div className="accordion" id="accordionExample">
                                            <div className="card recuitment-card">
                                                <div className="card-header recuitment-card-header" id="headingOne">
                                                    <h2 className="mb-0">
                                                    <a className="btn btn-link btn-block text-left recuitment-header" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Thông tin ứng viên
                                                        <span id="clickc1_advance2" className="clicksd">
                                                        <i className="fa fa fa-angle-up"></i>
                                                        </span>
                                                    </a>
                                                    </h2>
                                                </div>
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body recuitment-body">
                                                    <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Mã ứng viên:</label>
                                                            <div className="col-sm-9">
                                                                <span  className="form-control SearchCustom indam">{dataCandidate.applicantCode}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Họ tên:</label>
                                                            <div className="col-sm-9">
                                                                <span  className="form-control SearchCustom indam">{dataCandidate.firstName} {dataCandidate.lastName}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Chức danh dự tuyển:</label>
                                                            <div className="col-sm-9">
                                                                <span  className="form-control SearchCustom indam">{dataCandidate.jobWName}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Thuộc phòng:</label>
                                                            <div className="col-sm-9">
                                                                <span  className="form-control SearchCustom indam">{dataCandidate.departmentName}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Nơi làm việc:</label>
                                                            <div className="col-sm-9">
                                                                <span  className="form-control SearchCustom indam">{dataCandidate.provinceName}</span>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label indam">Thông tin chi tiết</label>
                                                            <div className="col-sm-9">
                                                                <Link to={`/Profilecandidate/${dataCandidate.applicantCode}`} target={"_blank"} className="btnExport"><i className="fa fa-user-circle-o"></i> Xem thông tin chi tiết </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* quy trình tuyển dụng */}
                                            <div className="card recuitment-card">
                                                <div className="card-header recuitment-card-header" id="headingOne">
                                                    <h2 className="mb-0">
                                                    <a className="btn btn-link btn-block text-left recuitment-header" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                        Trạng thái ứng tuyển
                                                        <span id="clickc1_advance2" className="clicksd">
                                                        <i className="fa fa fa-angle-up"></i>
                                                        </span>
                                                    </a>
                                                    </h2>
                                                </div>
                                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                                    <div className="card-body recuitment-body">
                                                        <div className="form-group row">
                                                            <div className="col-sm-12">
                                                                <ProgressBar
                                                                    percent={percent}
                                                                    filledBackground={fillterbackground}
                                                                >
                                                                    <Step transition="scale" children="bước 1">
                                                                    {({ accomplished }) => (
                                                                        <div>
                                                                            <img
                                                                                style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                                                                width="30"
                                                                                src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                                                                                />
                                                                            <h6>Duyệt</h6>
                                                                        </div>
                                                                    )}
                                                                    </Step>
                                                                    <Step transition="scale">
                                                                    {({ accomplished }) => (
                                                                         <div>
                                                                            <img
                                                                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                                                            width="30"
                                                                            src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                                                                            />
                                                                              <h6>Phỏng vấn</h6>
                                                                         </div>
                                                                       
                                                                    )}
                                                                    </Step>
                                                                    <Step transition="scale">
                                                                    {({ accomplished }) => (
                                                                        <div>
                                                                            <img
                                                                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                                                            width="30"
                                                                            src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                                                                            />
                                                                             <h6>Đạt</h6>
                                                                        </div>
                                                                        
                                                                    )}
                                                                    </Step>
                                                                    <Step transition="scale">
                                                                    {({ accomplished }) => (
                                                                        <div>
                                                                            <img
                                                                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                                                                            width="30"
                                                                            src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                                                                            />
                                                                             <h6>Nhận việc</h6>
                                                                        </div>
                                                                        
                                                                    )}
                                                                    </Step>
                                                                </ProgressBar>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                     </div>
                                </form>
                            </div>
                </div>
            </div>
        </div>
    </div>
            )
        }
    }   
}
export default Candidatetmp;