import React , {Component }from 'react';
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";
import axios from 'axios';
import Listconst from './../Const/Listconst';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import './Jobitem.css';
import {toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import swal from 'sweetalert2';
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
const sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""

class Jobitem extends Component{ 

    constructor(props)
    {
        super(props)
        this.state={
            activePage:1,
            PageIndex:0,
            PageSize:0,
            TotalPage:5
        }
    }
    handlePageChange=(pageNumber)=>
    {
        this.props._onLoadDataPaging(pageNumber)
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
    Seemore=()=>{
        debugger
        let moreText = document.getElementsByClassName("readmorecontent")[0];
        let btnText = document.getElementById("myBtn");

        if (moreText.style.display == "none" || moreText.style.display == "") {
            moreText.style.display = "inline";
            btnText.innerHTML = "Thu gọn"; 
        } else {
            moreText.style.display = "none";
            btnText.innerHTML = "Xem thêm"; 
        }
    }
    onLike =(idheart,recruitID)=>{
        console.log(idheart,recruitID)
        let Params = new FormData();
        Params.set('ApplicantCode',applicantcode);
        Params.set('RecruitID',recruitID);
        let element  = document.getElementById(idheart);
        let hasClassUnLike = element.classList.contains("fa-heart-o");
        axios.post(APIstr +"api/Home/onLike",Params)
        .then(res=>{
            if(res && res.data)
            {
                if(res.data.type=="insert")
                {
                    if(hasClassUnLike)
                    {
                        element.classList.remove("fa-heart-o");
                        element.classList.add("fa-heart");
                        element.classList.add("heartCustomLike");
                    }
                    toast.success("Đã thích!");
                }
                else
                {   if(!hasClassUnLike)
                    {
                        element.classList.remove("fa-heart");
                        element.classList.remove("heartCustomLike");
                        element.classList.add("fa-heart-o");
                    }
                    toast.warn("Đã bỏ thích!");
                }
            }
            else
            {
                toast.warn("API unsuccess!");
            }
        })
        .catch(err=>{
            toast.warn("API Error!");
        })
    }
    ShowJobs = (lstJob)=>{
        var result = null;
        if(lstJob.length > 0)
        {
            console.log("lstJob",lstJob)
             result=lstJob.map((item, index)=>{
                    let idheart = "heart_"+index;
                    return (
                             <div className="job pagi" key={index}>
                                <div className="job-content">
                                    <div className="job-logo">
                                         <Link to={`/Jobdetail/${item.recruitID}`}> 
                                            <img src={"data:image/jpeg;base64," + item.photo}
                                                 className="job-logo-ima" alt="job-logo"/>
                                        </Link>
                                    </div>

                                    <div className="job-desc" style={{float:"none"}}>
                                        <div className="job-title">
                                         <Link to={`/Jobdetail/${item.recruitID}`}>{item.jobWName}</Link>
                                            {/* <a href="facebook.com">{item.jobWName}</a> */}
                                        </div>
                                        <div className="job-company">
                                            <a href="#">{item.departmentName}</a> | <a href="#" className="job-address"><i className="fa fa-map-marker" aria-hidden="true"></i>
                                                {item.provinceName}</a>
                                        </div>

                                        <div className="job-inf">
                                            <div className="job-main-skill">
                                                <i className="fa fa-code" aria-hidden="true"></i>  <a href="#"> .NET</a>
                                            </div>
                                            {
                                                item.isAgree ?
                                                <div className="job-salary">
                                                     <i className="fa fa-money" aria-hidden="true"></i>
                                                     <span className="salary-min">Thỏa thuận<em className="salary-unit"></em></span>
                                                </div>
                                                :
                                                <div className="job-salary">
                                                    <i className="fa fa-money" aria-hidden="true"></i>
                                                    <span className="salary-min">{item.fromSalary}<em className="salary-unit"> VND</em></span>
                                                    <span className="salary-max">{item.toSalary}<em className="salary-unit"> VND</em></span>
                                                </div>
                                            }
                                            
                                            <div className="job-deadline">
                                                <span><i className="fa fa-clock-o" aria-hidden="true"></i>  Hạn nộp: <strong>{item.toDate}</strong></span>
                                            </div>
                                            {
                                                item.liked==1 ?  <span><i id={idheart} className="fa fa-heart heartCustom heartCustomLike"  onClick={()=>this.onLike(idheart,item.recruitID)}></i></span>
                                                :
                                                <span><i id={idheart} className="fa fa-heart-o heartCustom" onClick={()=>this.onLike(idheart,item.recruitID)}></i></span>
                                            }
                                           
                                        </div>
                                    </div>
                                    <div className="wrap-btn-appl" style={{marginTop:"-80px"}}>
                                        <button id="btnapply" className="btn btn-appl" onClick={()=>this.onApply(item.recruitID)}>Ứng tuyển</button>
                                    </div>
                                </div>
                            </div>
                    )
           
          });
        }
        return result;
      }
    render()
    {
        let {lstJob} =  this.props
      
        return(
            <div className="row">
                <div className="col-md-8 col-sm-12 col-12">
                    <div className="job-board-wrap">
                        <h2 className="widget-title">
                        <span>Việc làm công ty</span>
                        </h2>

                        <div className="job-group">
                            {this.ShowJobs(lstJob)}
                            {lstJob.length > 0 && 
                                <Pagination
                                        
                                activePage={parseInt(this.props.PageIndex)}
                                itemsCountPerPage={10} // số ptu trang hien tai
                                totalItemsCount={parseInt(this.props.PageSize)} // tổng số ptu
                                pageRangeDisplayed={parseInt(this.props.TotalPage)} // hiển thị các nút phân trang
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                />
                            }
                          
                            {/* <div className="readmorestyle-wrap">
                               <a href="#" className="readallstyle reads1">Xem tất cả</a>
                              

                            </div> */}
                         </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-12 clear-left">
                    <div className="job-sidebar">
                            <div className="sb-banner">
                            <img src="img/img1.png" className="advertisement" alt="" />
                            </div>
                    </div>
                    <div className="job-sidebar">
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
                            <ul className='job-add readmorecontent'>
                            <li >
                                    <i className="fa fa-map-marker ja-icn"></i>
                                    <span>Điện thoại: 028 3722 1223</span>
                                </li>
                                <li>
                                    <i className="fa fa-bar-chart ja-icn"></i>
                                    <span>Ngày thành lập: 5 tháng 10, 1962</span>
                                </li>
                                <li>
                                    <i className="fa fa-map-marker ja-icn"></i>
                                    <span>Đại học công lập, tự chủ về tài chính</span>
                                </li>
                                <li>
                                    <i className="fa fa-bar-chart ja-icn"></i>
                                    <span>Khẩu hiệu: Nhân bản - Sáng tạo - Hội nhập</span>
                                </li>
                                <li>
                                    <i className="fa fa-bar-chart ja-icn"></i>
                                    <span>Tên khác: SPK (mã trường)</span>
                                </li>
                            </ul>

                            <div className="wrap-comp-info mb-2">
                            <button className="btn btn-primary btn-company" onClick={()=>this.Seemore()} id="myBtn">Xem thêm</button>
                            </div>
                        </div>
                    </div>
                </div>
                    {/* <div className="col-md-4 col-sm-12 col-12 clear-left">
                     <div className="job-sidebar">
                        <h2 className="widget-title">
                        <span>Ngành Nghề</span>
                        </h2>
                        <div className="catelog-list" style={{height: '150px;', overflow: 'hidden;'}}>
                        <ul>
                            <li>
                            <a href="#">
                                <span className="cate-img">
                                <em>Lập trình viên</em>
                                </span>
                                <span className="cate-count">(1100)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Nhân viên kiểm thử</em>
                                </span>
                                <span className="cate-count">(230)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Kỹ sư cầu nối</em>
                                </span>
                                <span className="cate-count">(110)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Designer</em>
                                </span>
                                <span className="cate-count">(2300)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Product Manager</em>
                                </span>
                                <span className="cate-count">(99)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>HR</em>
                                </span>
                                <span className="cate-count">(300)</span>
                            </a>
                            </li>
                
                        </ul>
                        </div>
                    </div>
                
                    <div className="job-sidebar">
                        <div className="sb-banner">
                        <img src="img/ads1.jpg" className="advertisement" alt="" />
                        </div>
                    </div>
                </div> */}
            </div>
            
        )
    }
}
export default Jobitem;