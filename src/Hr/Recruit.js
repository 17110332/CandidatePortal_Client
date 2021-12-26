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
import CKEditor from "./../Libs/CKEditor";
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
class Recruit extends Component{
    render()
    {
        return(
            <div>
                <div class="clearfix"></div>
                <nav class="navbar navbar-expand-lg navbar-light nav-recuitment">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNava" aria-controls="navbarNava" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse container" id="navbarNava">
                        <ul class="navbar-nav nav-recuitment-li">
                        <li class="nav-item active">
                            <a class="nav-link" href="#">Quản lý đăng tuyển</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Quản lý ứng viên</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Quản lý đăng tin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Quản lý hồ sơ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Tài khoản</a>
                        </li>
                        </ul>
                        <ul class="rec-nav-right">
                        <li class="nav-item">
                            <a class="nav-link" href="#">Tìm hồ sơ</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="#">Đăng tuyển</a>
                        </li>
                        </ul>
                    </div>
                </nav>
                <div class="container-fluid">
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="home-ads">
                                <a href="#">
                                    <img src="img/hna2.jpg" />
                                </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="container-fluid published-recuitment-wrapper">
                    <div class="container published-recuitment-content">
                        <div class="row">
                        <div class="col-md-8 col-sm-12 col-12 recuitment-inner">
                            <form class="recuitment-form">

                            <div class="accordion" id="accordionExample">
                                <div class="card recuitment-card">
                                <div class="card-header recuitment-card-header" id="headingOne">
                                    <h2 class="mb-0">
                                    <a class="btn btn-link btn-block text-left recuitment-header" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Đăng tin tuyển dụng
                                        <span id="clickc1_advance2" class="clicksd">
                                        <i class="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>

                                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body recuitment-body">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Tiêu đề<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Nhập tiêu đề" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Số lượng cần tuyển</label>
                                        <div class="col-sm-9">
                                        <input type="number" class="form-control" placeholder="1" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Giới tính<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobGender" data-select2-id="jobGender" tabindex="-1" aria-hidden="true">
                                    
                                            <option value="" data-select2-id="66">Nam</option>
                                            <option value="" data-select2-id="67">Nữ</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="63" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobGender-container"><span class="select2-selection__rendered" id="select2-jobGender-container" role="textbox" aria-readonly="true" title="Chọn giới tính">Chọn giới tính</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Mô tả công việc<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea type="text" class="form-control" placeholder="Nhập mô tả công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Yêu cầu công việc<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea type="text" class="form-control" placeholder="Nhập yêu cầu công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Tính chất công việc<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="natureWork" data-select2-id="natureWork" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="2">Chọn tính chất công việc</option>
                                            <option value="18" data-select2-id="3">Giờ hành chính</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-natureWork-container"><span class="select2-selection__rendered" id="select2-natureWork-container" role="textbox" aria-readonly="true" title="Chọn tính chất công việc">Chọn tính chất công việc</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Trình độ<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobLevel" data-select2-id="jobLevel" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="15">Chọn trình độ</option>
                                            <option value="6" data-select2-id="16">Đại học</option>
                                            <option value="5" data-select2-id="17">Cao đẳng</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="14" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobLevel-container"><span class="select2-selection__rendered" id="select2-jobLevel-container" role="textbox" aria-readonly="true" title="Chọn trình độ">Chọn trình độ</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Kinh nghiệm<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobExperience" data-select2-id="jobExperience" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="25">Chọn kinh nghiệm</option>
                                            <option value="0" data-select2-id="26">Chưa có kinh nghiệm</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="24" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobExperience-container"><span class="select2-selection__rendered" id="select2-jobExperience-container" role="textbox" aria-readonly="true" title="Chọn kinh nghiệm">Chọn kinh nghiệm</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Mức lương<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobSalary" data-select2-id="jobSalary" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="36">Chọn mức lương</option>
                                            <option value="2" data-select2-id="37">Dưới 3 triệu</option>
                                            <option value="4" data-select2-id="38">3-5 triệu</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="35" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobSalary-container"><span class="select2-selection__rendered" id="select2-jobSalary-container" role="textbox" aria-readonly="true" title="Chọn mức lương">Chọn mức lương</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Hình thức làm việc<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobWorkTime" data-select2-id="jobWorkTime" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="50">Chọn hình thức làm việc</option>
                                            <option value="1" data-select2-id="51">Nhân viên chính thức</option>
                                            <option value="2" data-select2-id="52">Nhân viên thời vụ</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="49" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobWorkTime-container"><span class="select2-selection__rendered" id="select2-jobWorkTime-container" role="textbox" aria-readonly="true" title="Chọn hình thức làm việc">Chọn hình thức làm việc</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Thời gian thử việc<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobProbation" data-select2-id="jobProbation" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="57">Chọn thời gian thử việc</option>
                                            <option value="0" data-select2-id="58">Nhận việc ngay</option>
                                            <option value="1" data-select2-id="59">1 tháng</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="56" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobProbation-container"><span class="select2-selection__rendered" id="select2-jobProbation-container" role="textbox" aria-readonly="true" title="Chọn thời gian thử việc">Chọn thời gian thử việc</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Quyền lợi<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea type="text" class="form-control" placeholder="Quyền lợi công việc" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Ngành nghề</label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobType" data-select2-id="jobType" tabindex="-1" aria-hidden="true">
                                            <option selected="selected" value="" data-select2-id="69">Chọn ngành nghề</option>
                                            <option value="32" data-select2-id="70">Kinh doanh</option>
                                            <option value="10" data-select2-id="71">Bán hàng</option>
                                         
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="68" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobType-container"><span class="select2-selection__rendered" id="select2-jobType-container" role="textbox" aria-readonly="true" title="Chọn ngành nghề">Chọn ngành nghề</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Nơi làm việc</label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobProvince" data-select2-id="jobProvince" tabindex="-1" aria-hidden="true">
                                            <option value="1" data-select2-id="127">Hồ Chí Minh</option>
                                            <option value="2" data-select2-id="128">Hà Nội</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="126" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobProvince-container"><span class="select2-selection__rendered" id="select2-jobProvince-container" role="textbox" aria-readonly="true" title="Hồ Chí Minh">Hồ Chí Minh</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Hạn nộp hồ sơ<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="date" class="form-control" placeholder="Nhập nơi làm việc" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="card recuitment-card">
                                <div class="card-header recuitment-card-header" id="headingTwo">
                                    <h2 class="mb-0">
                                    <a class="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Phúc lợi
                                        <span id="clickc1_advance3" class="clicksd">
                                        <i class="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div class="card-body recuitment-body">
                                    <div class="checkboxsec" id="checkboxSection">
                                    <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chăm sóc sức khỏe</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Laptop</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Du lịch nước ngoài</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>phụ cấp thâm niên</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Du lịch</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Đào tạo</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Phụ cấp</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Đồng phục</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Nghỉ phép năm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ thưởng</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Tăng lương</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Xe đưa đón</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Công tác phí</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>

                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>CLB thể thao</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>

                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>
                                        <div class="filter-topic">
                                        <label class="label-container">
                                            <span>Chế độ bảo hiểm</span>
                                                <input type="checkbox" name="" value="1" />
                                            <span class="checkmark"></span>
                                        </label>
                                        </div>

                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="card recuitment-card">
                                <div class="card-header recuitment-card-header" id="headingThree">
                                    <h2 class="mb-0">
                                    <a class="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        Thông tin liên hệ
                                        <span id="clickc1_advance1" class="clicksd">
                                        <i class="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                    <div class="card-body recuitment-body">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Tên người liên hệ<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Tên người liên hệ" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Email<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="mail" class="form-control" placeholder="Địa chỉ email" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Địa chỉ<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Điện thoại<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="number" class="form-control" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                                <div class="card recuitment-card">
                                <div class="card-header recuitment-card-header" id="heading4">
                                    <h2 class="mb-0">
                                    <a class="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                        Thông tin công ty
                                        <span id="clickc1_advance4" class="clicksd">
                                        <i class="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapse4" class="collapse show" aria-labelledby="heading4" data-parent="#collapse4">
                                    <div class="card-body recuitment-body">
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Tên công ty<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Tên công ty" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Địa chỉ<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Nhập địa chỉ" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Điện thoại<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <input type="number" class="form-control" placeholder="Nhập số điện thoại" />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Tỉnh/ Thành phô<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobProvince2" data-select2-id="jobProvince2" tabindex="-1" aria-hidden="true">
                                            <option value="1" data-select2-id="193">Hồ Chí Minh</option>
                                            <option value="2" data-select2-id="194">Hà Nội</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="192" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobProvince2-container"><span class="select2-selection__rendered" id="select2-jobProvince2-container" role="textbox" aria-readonly="true" title="Hồ Chí Minh">Hồ Chí Minh</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Quy mô nhân sự<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobEmployerScale" data-select2-id="jobEmployerScale" tabindex="-1" aria-hidden="true">
                                            <option value="" data-select2-id="259">Chọn quy mô</option>
                                            <option selected="selected" value="1" data-select2-id="260">Dưới 20 người</option>
                                            <option value="2" data-select2-id="261">20 - 150 người</option>
                                        </select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="258" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobEmployerScale-container"><span class="select2-selection__rendered" id="select2-jobEmployerScale-container" role="textbox" aria-readonly="true" title="Dưới 20 người">Dưới 20 người</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Quy mô nhân sự</label>
                                        <div class="col-sm-9">
                                        <select type="text" class="form-control select2-hidden-accessible" id="jobFieldsActivity" data-select2-id="jobFieldsActivity" tabindex="-1" aria-hidden="true">
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
                                        </optgroup></select><span class="select2 select2-container select2-container--default" dir="ltr" data-select2-id="264" style={{width:"487.5px"}}><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-jobFieldsActivity-container"><span class="select2-selection__rendered" id="select2-jobFieldsActivity-container" role="textbox" aria-readonly="true" title="Nông nghiệp và hoạt động dịch vụ có liên quan">Nông nghiệp và hoạt động dịch vụ có liên quan</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Sơ lược về công ty<span style={{color:"red"}} class="pl-2">*</span></label>
                                        <div class="col-sm-9">
                                        <textarea type="text" class="form-control" placeholder="Sơ lược về công ty" rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Logo</label>
                                        <div class="col-sm-9 ">
                                        <div id="drop-area">
                                    
                                            <input type="file" id="fileElem" multiple="" accept="image/*" onchange="handleFiles(this.files)" />
                                            <label style={{cursor: "pointer;"}} for="fileElem">Tải ảnh lên hoặc kéo thả vào đây</label>
                                            <progress id="progress-bar" max="100" value="0" class="d-none"></progress>
                                            <div id="gallery"></div>
                                        
                                        </div>
                                        
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label class="col-sm-3 col-form-label text-right label">Website</label>
                                        <div class="col-sm-9">
                                        <input type="text" class="form-control" placeholder="Website" />
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div class="rec-submit">
                                <button type="submit" class="btn-submit-recuitment" name="">
                                <i class="fa fa-floppy-o pr-2"></i>Lưu Tin
                                </button>
                            </div>
                            </form>
                            
                        </div>
                        <div class="col-md-4 col-sm-12 col-12">
                            <div class="recuiter-info">
                            <div class="recuiter-info-avt">
                                <img src="img/icon_avatar.jpg" />
                            </div>
                            <div class="clearfix list-rec">
                                <h4>NESTLE Inc.</h4>
                                <ul>
                                <li><a href="#">Việc làm đang đăng <strong>(0)</strong></a></li>
                                <li><a href="#">Follower <strong>(450)</strong></a></li>
                                </ul>
                            </div>
                            </div>


                            <div class="block-sidebar" style={{marginBottom: "20px;"}}>
                    <header>
                        <h3 class="title-sidebar font-roboto bg-primary">
                            Trung tâm quản lý
                        </h3>
                    </header>
                    <div class="content-sidebar menu-trung-tam-ql menu-ql-employer">
                        <h3 class="menu-ql-ntv">
                            Quản lý tài khoản
                        </h3>
                        <ul>
                            <li>
                                <a href="#">
                                Tài khoản
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Giấy phép kinh doanh
                                </a>
                            </li>
                        </ul>
                        <h3 class="menu-ql-ntv">
                            Quản lý dịch vụ
                        </h3>
                        <ul>
                            <li>
                                <a href="#">
                                Lịch sử dịch vụ
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                Báo giá
                                </a>
                            </li>
                        </ul>
                        <h3 class="menu-ql-ntv">
                            Quản lý tin tuyển dụng
                        </h3>
                        <ul>
                            <li>
                                <a href="#">
                                Đăng tin tuyển dụng
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Danh sách tin tuyển dụng
                                </a>
                            </li>
                        </ul>
                        <h3 class="menu-ql-ntv">
                            Quản lý ứng viên
                        </h3>
                        <ul>
                            <li>
                                <a href="#">
                                Tìm kiếm hồ sơ
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Hồ sơ đã lưu
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                Hồ sơ đã ứng tuyển
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Thông báo hồ sơ phù hợp">
                                Thông báo hồ sơ phù hợp
                                </a>
                            </li>
                        </ul>
                        <h3 class="menu-ql-ntv">
                            Hỗ trợ và thông báo
                        </h3>
                        <ul>
                            <li>
                                <a href="#" title="Gửi yêu cầu đến ban quản trị">
                                Gửi yêu cầu đến ban quản trị
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Ban quản trị thông báo">
                                Ban quản trị thông báo
                                </a>
                            </li>
                            <li>
                                <a href="#" title="Hướng dẫn thao tác">
                                Hướng dẫn thao tác
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                <span>Thông tin thanh toán</span>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="#">
                                <span>Cổng tra cứu lương</span>
                                </a>
                            </li>
                            <li>
                                <a target="_blank" href="#">
                                <span> Cẩm nang tuyển dụng</span>
                                </a>
                            </li>
                        </ul>
                        <ul>
                            <li class="logout">
                                <a href="#" title="Đăng xuất">
                                Đăng xuất
                                </a>
                            </li>
                        </ul>
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
export default Recruit;