import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import './../Profile/Myprofile.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Loading from "./../Body/Loading"
import './Recruit.css';
import CKEditor from "./../Libs/CKEditor";
import Pagination from "react-js-pagination";

const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
class Recruit extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            Top5ListJobNew:[],
            preEle:"",
            activePage:1,
            PageIndex:1,
            PageSize:0,
            TotalPage:0,
            loading:false
        }
    }
    componentDidMount(){
        this.onLoadDataMaster();
    }
    onLoadDataMaster = (callback)=>{
        this.setState({
            loading:true
        },()=>{
            let {PageIndex} = this.state;
            let Params = new FormData();
            Params.set('pageindex',PageIndex);
            Params.set('ApplicantCode',applicantcode);
            axios.post(APIstr +`api/Recruit/GetRecruitsByUserID`,Params)
                   .then(res=>{
                        this.setState({
                            Top5ListJobNew: res && res.data && res.data.lstJob.length >0 ? res.data.lstJob :[],
                            PageSize:res && res.data ? res.data.pageSize:0,
                            TotalPage:res && res.data ? res.data.totalPage:0
                           
                        });
                        if(callback)
                        {
                            callback();
                        }
                   })
                   .catch(err=> {
                       console.log(err);
                   })
                   .finally(() => {
                    this.setState({
                        loading:false,
                        preEle:"itemdatamaster_0"
                    },()=>{
                        let ele = document.getElementById("itemdatamaster_0");
                        if(ele)
                        {
                            ele.style.backgroundColor="#ADD8E6";
                        }
                    })
                });
        })
        
    }
    onClickMaster = (iditem)=>{
        let {preEle} = this.state;
        if(iditem != preEle)
        {
            //add active
            let ele = document.getElementById(iditem);
            if(ele)
            {
                ele.style.backgroundColor= "#ADD8E6";
            }
            //xóa active cũ
            let preele = document.getElementById(preEle);
            if(preele)
            {
                preele.style.backgroundColor= "inherit";
            }
            this.setState({
                preEle:iditem
            },()=>{
                //load detail nè
            })
        }
    }
    ShowListJob = lst=>
    {
        var result = null;
        if(lst.length > 0)
        {
          result=lst.map((item, index)=>{
            let iditem ="itemdatamaster_"+index;
            return (          
                <div className="job-tt-item itemdatamaster" id={iditem} key={index} onClick={()=>this.onClickMaster(iditem)}>
                    <a className="thumb">
                        <div style={{backgroundImage: 'url("data:image/jpeg;base64,' + item.photo + '")'}} ></div>  
                    </a>
                    <div className="info">
                        <a  className="jobname">{item.jobWName}</a>
                        <a className="company">{item.departmentName}</a>
                    </div>
                </div>
            )
          });
        }
        return result;
    }
    handlePageChange =(pageNumber)=>{
        this.setState({
            PageIndex:pageNumber
        },()=>{
            this.onLoadDataMaster();
        });
    }
    render()
    {
        let {Top5ListJobNew,PageIndex,PageSize,TotalPage,loading} = this.state;
        return(
            <div>
                <div className="clearfix"></div>
                <nav className="navbar navbar-expand-lg navbar-light nav-recuitment">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNava" aria-controls="navbarNava" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container" id="navbarNava">
                        <ul className="navbar-nav nav-recuitment-li">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">Danh sách đăng tuyển</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Danh mục chức danh</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Đăng tuyển đã lưu</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Hồ sơ ứng viên</a>
                        </li>
                        </ul>
                        <ul className="rec-nav-right">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Đăng tuyển</a>
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
                            <div className="col-md-4 col-sm-12 col-12 lstmaster">
                                <input type="input" placeholder="Tìm kiếm" id="timkiem"/>
                                <div className="job-tt-contain">
                                    {
                                        loading ? <Loading />
                                        :
                                        this.ShowListJob(Top5ListJobNew)
                                    }
                                  
                                   
                                </div>
                                <Pagination
                                        activePage={parseInt(PageIndex)}
                                        itemsCountPerPage={5} // số ptu trang hien tai
                                        totalItemsCount={parseInt(PageSize)} // tổng số ptu
                                        pageRangeDisplayed={parseInt(TotalPage)} // hiển thị các nút phân trang
                                        onChange={this.handlePageChange}
                                        itemClass="page-item"
                                        linkClass="page-link"
                                        />
                                <div id="divmaster">
                                
                                    <button type="button" id="btnadd" className="btn-submit-recuitment" name="">
                                         <i className="fa fa-floppy-o pr-2"></i>Thêm
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
                                        Đăng tin tuyển dụng
                                        <span id="clickc1_advance2" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>

                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Tiêu đề<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Nhập tiêu đề" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Số lượng cần tuyển</label>
                                        <div className="col-sm-9">
                                        <input type="number" className="form-control" placeholder="1" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Giới tính<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobGender" data-select2-id="jobGender" tabindex="-1" aria-hidden="true">
                                    
                                            <option value="" data-select2-id="66">Nam</option>
                                            <option value="" data-select2-id="67">Nữ</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Mô tả công việc<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                             <textarea type="text" className="form-control" placeholder="Nhập mô tả công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Yêu cầu công việc<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                             <textarea type="text" className="form-control" placeholder="Nhập yêu cầu công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Tính chất công việc<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="natureWork" data-select2-id="natureWork" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="2">Chọn tính chất công việc</option>
                                            <option value="18" data-select2-id="3">Giờ hành chính</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Trình độ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobLevel" data-select2-id="jobLevel" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="15">Chọn trình độ</option>
                                            <option value="6" data-select2-id="16">Đại học</option>
                                            <option value="5" data-select2-id="17">Cao đẳng</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Kinh nghiệm<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobExperience" data-select2-id="jobExperience" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="25">Chọn kinh nghiệm</option>
                                            <option value="0" data-select2-id="26">Chưa có kinh nghiệm</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Mức lương<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobSalary" data-select2-id="jobSalary" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="36">Chọn mức lương</option>
                                            <option value="2" data-select2-id="37">Dưới 3 triệu</option>
                                            <option value="4" data-select2-id="38">3-5 triệu</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Hình thức làm việc<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobWorkTime" data-select2-id="jobWorkTime" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="50">Chọn hình thức làm việc</option>
                                            <option value="1" data-select2-id="51">Nhân viên chính thức</option>
                                            <option value="2" data-select2-id="52">Nhân viên thời vụ</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Thời gian thử việc<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobProbation" data-select2-id="jobProbation" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="57">Chọn thời gian thử việc</option>
                                            <option value="0" data-select2-id="58">Nhận việc ngay</option>
                                            <option value="1" data-select2-id="59">1 tháng</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Quyền lợi<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <textarea type="text" className="form-control" placeholder="Quyền lợi công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Ngành nghề</label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobType" data-select2-id="jobType" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="69">Chọn ngành nghề</option>
                                            <option value="32" data-select2-id="70">Kinh doanh</option>
                                            <option value="10" data-select2-id="71">Bán hàng</option>
                                         
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Nơi làm việc</label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobProvince" data-select2-id="jobProvince" tabindex="-1" aria-hidden="true">
                                            <option value="1" data-select2-id="127">Hồ Chí Minh</option>
                                            <option value="2" data-select2-id="128">Hà Nội</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Hạn nộp hồ sơ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="date" className="form-control" placeholder="Nhập nơi làm việc" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Phúc lợi
                                        <span id="clickc1_advance3" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                        bỏ ck editor vào
                                    </div>
                                </div>
                                </div>
                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="headingThree">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Thông tin liên hệ
                                        <span id="clickc1_advance1" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Tên người liên hệ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Tên người liên hệ" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Email<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="mail" className="form-control" placeholder="Địa chỉ email" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Địa chỉ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Điện thoại<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="number" className="form-control" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="heading4">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        Thông tin công ty
                                        <span id="clickc1_advance4" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapse4" className="collapse show" aria-labelledby="heading4" data-parent="#collapse4">
                                    <div className="card-body recuitment-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Tên công ty<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Tên công ty" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Địa chỉ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Điện thoại<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <input type="number" className="form-control" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Tỉnh/ Thành phô<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobProvince2" data-select2-id="jobProvince2" tabindex="-1" aria-hidden="true">
                                            <option value="1" data-select2-id="193">Hồ Chí Minh</option>
                                            <option value="2" data-select2-id="194">Hà Nội</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Quy mô nhân sự<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobEmployerScale" data-select2-id="jobEmployerScale" tabindex="-1" aria-hidden="true">
                                            <option value="" data-select2-id="259">Chọn quy mô</option>
                                            <option selected="selected" value="1" data-select2-id="260">Dưới 20 người</option>
                                            <option value="2" data-select2-id="261">20 - 150 người</option>
                                        </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Quy mô nhân sự</label>
                                        <div className="col-sm-9">
                                        <select type="text" className="form-control select2-hidden-accessible" id="jobFieldsActivity" data-select2-id="jobFieldsActivity" tabindex="-1" aria-hidden="true">
                                            <optgroup label="NÔNG NGHIỆP, LÂM NGHIỆP VÀ THUỶ SẢN">
                                            <option value="22" data-select2-id="265">Nông nghiệp và hoạt động dịch vụ có liên quan</option>
                                            <option value="23" data-select2-id="266">Lâm nghiệp và hoạt động dịch vụ có liên quan</option>
                                            </optgroup>
                                            <optgroup label="KHAI KHOÁNG">
                                            <option value="25" data-select2-id="268">Khai thác than cứng và than non</option>
                                            <option value="26" data-select2-id="269">Khai thác dầu thô và khí đốt tự nhiên</option>
                                            </optgroup>
                                            <optgroup label="CÔNG NGHIỆP CHẾ BIẾN, CHẾ TẠO">
                                            <option value="30" data-select2-id="273">Sản xuất, chế biến thực phẩm</option>
                                            <option value="31" data-select2-id="274">Sản xuất đồ uống</option>
                                          
                                            </optgroup>
                                            <optgroup label="SẢN XUẤT VÀ PHÂN PHỐI ĐIỆN, KHÍ ĐỐT, NƯỚC NÓNG, HƠI NƯỚC VÀ ĐIỀU HOÀ KHÔNG KHÍ">
                                            <option value="54" data-select2-id="297">Sản xuất và phân phối điện, khí đốt, nước nóng, hơi nước và điều hoà không khí</option>
                                            </optgroup>
                                            <optgroup label="CUNG CẤP NƯỚC; HOẠT ĐỘNG QUẢN LÝ VÀ XỬ LÝ RÁC THẢI, NƯỚC THẢI">
                                            <option value="55" data-select2-id="298">Khai thác, xử lý và cung cấp nước</option>
                                            <option value="56" data-select2-id="299">Thoát nước và xử lý nước thải</option>
                                            </optgroup>
                                            <optgroup label="XÂY DỰNG">
                                            <option value="59" data-select2-id="302">Xây dựng nhà các loại</option>
                                            <option value="60" data-select2-id="303">Xây dựng công trình kỹ thuật dân dụng</option>
                                            </optgroup>
                                            <optgroup label="BÁN BUÔN VÀ BÁN LẺ; SỬA CHỮA Ô TÔ, MÔ TÔ, XE MÁY VÀ XE CÓ ĐỘNG CƠ KHÁC">
                                            <option value="62" data-select2-id="305">Bán, sửa chữa ô tô, mô tô, xe máy và xe có động cơ khác</option>
                                            <option value="63" data-select2-id="306">Bán buôn (trừ ô tô, mô tô, xe máy và xe có động cơ khác)</option>
                                            </optgroup>
                                            <optgroup label="VẬN TẢI KHO BÃI">
                                            <option value="65" data-select2-id="308">Vận tải đường sắt, đường bộ và vận tải đường ống</option>
                                            <option value="66" data-select2-id="309">Vận tải đường thủy</option>
                                            </optgroup>
                                            <optgroup label="DỊCH VỤ LƯU TRÚ VÀ ĂN UỐNG">
                                            <option value="70" data-select2-id="313">Dịch vụ lưu trú</option>
                                            <option value="71" data-select2-id="314">Dịch vụ ăn uống</option>
                                            </optgroup>
                                            <optgroup label="THÔNG TIN VÀ TRUYỀN THÔNG">
                                            <option value="72" data-select2-id="315">Hoạt động xuất bản</option>
                                            <option value="73" data-select2-id="316">Hoạt động điện ảnh, sản xuất chương trình truyền hình, ghi âm và xuất bản âm nhạc</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG TÀI CHÍNH, NGÂN HÀNG VÀ BẢO HIỂM">
                                            <option value="82" data-select2-id="320">Hoạt động dịch vụ tài chính (trừ bảo hiểm và bảo hiểm xã hội)</option>
                                            <option value="83" data-select2-id="321">Bảo hiểm, tái bảo hiểm và bảo hiểm xã hội (trừ bảo đảm xã hội bắt buộc)</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG KINH DOANH BẤT ĐỘNG SẢN">
                                            <option value="85" data-select2-id="323">Hoạt động kinh doanh bất động sản</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG CHUYÊN MÔN, KHOA HỌC VÀ CÔNG NGHỆ">
                                            <option value="86" data-select2-id="324">Hoạt động pháp luật, kế toán và kiểm toán</option>
                                            <option value="87" data-select2-id="325">Hoạt động của trụ sở văn phòng; hoạt động tư vấn quản lý</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG HÀNH CHÍNH VÀ DỊCH VỤ HỖ TRỢ">
                                            <option value="93" data-select2-id="331">Cho thuê máy móc, thiết bị (không kèm người điều khiển); cho thuê đồ dùng cá nhân và gia đình; cho thuê tài sản vô hình phi tài chính</option>
                                            <option value="94" data-select2-id="332">Hoạt động dịch vụ lao động và việc làm</option>
                                            </optgroup>
                                            <optgroup label="GIÁO DỤC VÀ ĐÀO TẠO">
                                            <option value="99" data-select2-id="337">Giáo dục và đào tạo</option>
                                            </optgroup>
                                            <optgroup label="Y TẾ VÀ HOẠT ĐỘNG TRỢ GIÚP XÃ HỘI">
                                            <option value="100" data-select2-id="338">Hoạt động y tế</option>
                                            <option value="101" data-select2-id="339">Hoạt động chăm sóc, điều dưỡng tập trung</option>
                                            <option value="102" data-select2-id="340">Hoạt động trợ giúp xã hội không tập trung</option>
                                            </optgroup>
                                            <optgroup label="NGHỆ THUẬT, VUI CHƠI VÀ GIẢI TRÍ">
                                            <option value="103" data-select2-id="341">Hoạt động sáng tác, nghệ thuật và giải trí</option>
                                            <option value="104" data-select2-id="342">Hoạt động của thư viện, lưu trữ, bảo tàng và các hoạt động văn hóa khác</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG DỊCH VỤ KHÁC">
                                            <option value="107" data-select2-id="345">Hoạt động của các hiệp hội, tổ chức khác</option>
                                            <option value="108" data-select2-id="346">Sửa chữa máy vi tính, đồ dùng cá nhân và gia đình</option>
                                            <option value="109" data-select2-id="347">Hoạt động dịch vụ phục vụ cá nhân khác</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG LÀM THUÊ CÁC CÔNG VIỆC TRONG CÁC HỘ GIA ĐÌNH, SẢN XUẤT SẢN PHẨM VẬT CHẤT VÀ DỊCH VỤ TỰ TIÊU DÙNG CỦA HỘ GIA ĐÌNH">
                                            <option value="110" data-select2-id="348">Hoạt động làm thuê công việc gia đình trong các hộ gia đình</option>
                                            <option value="111" data-select2-id="349">Hoạt động sản xuất sản phẩm vật chất và dịch vụ tự tiêu dùng của hộ gia đình</option>
                                            </optgroup>
                                            <optgroup label="HOẠT ĐỘNG CỦA CÁC TỔ CHỨC VÀ CƠ QUAN QUỐC TẾ">
                                            <option value="112" data-select2-id="350">Hoạt động của các tổ chức và cơ quan quốc tế</option>
                                            </optgroup>
                                            <optgroup label="">
                                        </optgroup></select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Sơ lược về công ty<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                        <textarea type="text" className="form-control" placeholder="Sơ lược về công ty" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Logo</label>
                                        <div className="col-sm-9 ">
                                        <div id="drop-area">
                                    
                                            <input type="file" id="fileElem" multiple="" accept="image/*" onchange="handleFiles(this.files)" />
                                            <label style={{cursor: "pointer;"}} for="fileElem">Tải ảnh lên hoặc kéo thả vào đây</label>
                                            <progress id="progress-bar" max="100" value="0" className="d-none"></progress>
                                            <div id="gallery"></div>
                                        
                                        </div>
                                        
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Website</label>
                                        <div className="col-sm-9">
                                        <input type="text" className="form-control" placeholder="Website" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                                <div className="rec-submit" id="divsubmit">
                                     <button  id="btnxoa" className="btn-submit-recuitment" name="">
                                         <i className="fa fa-trash-o pr-2"></i>Xóa
                                    </button>
                                    <button type="submit" id="btnluu" className="btn-submit-recuitment" name="">
                                         <i className="fa fa-floppy-o pr-2"></i>Lưu
                                    </button>
                                </div>
                            </form>
                        </div>
                       
                </div>
            </div>
        </div>
    </div>
        );
    }
}
export default Recruit;