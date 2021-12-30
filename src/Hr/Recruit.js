import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import  '../Body/Search.css'
import axios from 'axios';

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
        this.onChangebenefits = this.onChangebenefits.bind(this);
        this.onChangerequired = this.onChangerequired.bind(this);
        this.onChangedescription=this.onChangedescription.bind(this);
        this.state={
            Top5ListJobNew:[],
            preEle:"",
            activePage:1,
            PageIndex:1,
            PageSize:0,
            TotalPage:0,
            loading:false,
            ListJobW:[],
            JobWSelected:"",
            dataDetail:{},
            isfirstload:true,
            loadingmaster:false,
            TypeJobWSelected:"",
            ListTypeJobW:[],
            DepartmentSelected:"",
            ListDepartment:[],

            //model dùng chung
            quantity:0,
            fomDate:"",
            tDate:"",
            isActive:0,
            photo:"",
            jobdescription:"",
            benefits:"",
            required:"",
            language:"",
            exp:"",
            fromSalary:"",
            toSalary:""
        }
    }
    componentDidMount(){
        this.GetListTypeJobWoking();
        this.GetListJobWorking();
        this.GetListDepartment();
        this.onLoadDataMaster();
    }
    onChange = event=>{
        var target = event.target;
        var name= target.name;
        var value = target.value;
        this.setState({
            dataDetail:{
                [name] : value
            }
        });
    }
    //==================
    GetListDepartment = ()=>{
        axios.get(APIstr +"api/Home/GetDepartment")
        .then(res=>{
            this.setState({
                ListDepartment:res && res.data.length >0 ? res.data :[]
            });
        })
        .catch(err=>{
            console.log(err)
        })
    }
    GetSelectDep=e=>{
        this.setState({
            DepartmentSelected: e.target.value
        });
    }
    ShowListDep = (ListDepartment)=>{
        let {DepartmentSelected}= this.state;
        var result = null;
        if(ListDepartment.length > 0)
        {
          result=ListDepartment.map((item, index)=>{
            return (          
                    <option className='textformat' key={index} value={item.departmentCode}
                    selected={DepartmentSelected == item.departmentCode}>{item.departmentName}</option>
            )
          });
        }
        return result;
    }
    //======================================================
    GetListTypeJobWoking = ()=>{
        axios.get(APIstr +"api/Home/GetTypeJobW")
        .then(res=>{
            this.setState({
                ListTypeJobW:res && res.data.length >0 ? res.data :[]
            });
        })
        .catch(err=>{
            console.log(err)
        })
    }
    GetSelectTypeJobW=e=>{
        this.setState({
            TypeJobWSelected: e.target.value
        });
    }
    ShowListTypeJobW = (ListTypeJobW)=>{
        let {TypeJobWSelected}= this.state;
        var result = null;
        if(ListTypeJobW.length > 0)
        {
          result=ListTypeJobW.map((item, index)=>{
            return (          
                    <option className='textformat' key={index} value={item.typeJobWCode}
                    selected={TypeJobWSelected == item.typeJobWCode}>{item.typeJobWName}</option>
            )
          });
        }
        return result;
    }

    //=================================================================
    GetListJobWorking =(callback)=>{
         //chuyên ngành
         axios.get(APIstr +"api/Home/GetJobW")
         .then(res=>{
             this.setState({
                 ListJobW:res && res.data.length >0 ? res.data :[]
             },()=>{
                 if(callback)
                    callback();
             });
         })
         .catch(err=>{
             console.log(err)
         })
    }
    GetSelectJobW=e=>{
        this.setState({
            JobWSelected: e.target.value
        },()=>{ console.log("e.target.value",e.target.value)});
    }
    ShowJobWorking = (ListJobW)=>{
        var result = null; 
        let {JobWSelected} = this.state;
        if(ListJobW.length > 0)
        {
         
          result=ListJobW.map((item, index)=>{
            return (          
                 <option key={index} value={item.jobWCode} 
                    selected={JobWSelected == item.jobWCode}>{item.jobWName}</option>
                 )
          });
        }
        return result;
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
                            this.onClickMaster(this.state.Top5ListJobNew[0].recruitID,'itemdatamaster_0')
                        }

                    })
                });
        })
        
    }
    onLoadDetail = (recruitID)=>{
        axios.get(APIstr +`api/Home/GetRecruitDetail/${recruitID}`)
        .then(res=>{
            this.setState({
                  dataDetail: res && res.data.length >0 ? res.data[0] :[],
                  JobWSelected: res && res.data.length >0 ? res.data[0].jobWCode:"",
                  TypeJobWSelected:res && res.data.length >0 ? res.data[0].typeJobWCode:"",
                  DepartmentSelected: res && res.data.length >0 ? res.data[0].departmentCode:"",
            });
        })
        .finally(() => {
            this.setState({loadingmaster:false})
        });
    }
    onClickMaster = (recruitID,iditem)=>{
        this.setState({
            loadingmaster:true
        },()=>{
            let {preEle,isfirstload} = this.state;
            if(iditem != preEle || isfirstload)
            {
                //add active
                let ele = document.getElementById(iditem);
                if(ele)
                {
                    ele.style.backgroundColor= "#ADD8E6";
                }
                //xóa active cũ
                let preele = document.getElementById(preEle);
                if(preele && !isfirstload)
                {
                    preele.style.backgroundColor= "inherit";
                }
                this.setState({
                    preEle:iditem,
                    isfirstload:false
                },()=>{
                    //load detail nè
                    this.onLoadDetail(recruitID);
                })
            }
        })
        
    }
    ShowListJob = lst=>
    {
        var result = null;
        if(lst.length > 0)
        {
          result=lst.map((item, index)=>{
            let iditem ="itemdatamaster_"+index;
            return (          
                <div className="job-tt-item itemdatamaster" id={iditem} key={index} onClick={()=>this.onClickMaster(item.recruitID,iditem)}>
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
    onChangebenefits= ()=>{

    }
    onChangerequired =()=>{
        
    }
    onChangedescription =()=>{

    }
    render()
    {  
        let {Top5ListJobNew,PageIndex,PageSize,TotalPage,loading,ListJobW,
            dataDetail,JobWSelected,loadingmaster,ListTypeJobW,ListDepartment,
            quantity,fromDate,toDate,isActive,photo,jobdescription,benefits,required,language,
            rxp,toSalary,fromSalary} = this.state;
            console.log("dataDetail",dataDetail)
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
                                        <label className="col-sm-3 col-form-label text-right label">Chức danh<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="JobWSelected" onChange={this.GetSelectJobW}>
                                                    <option  value="" ></option>
                                                    {/* selected={infperson.provinceCode == null} */}
                                                      {this.ShowJobWorking(ListJobW)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Số lượng cần tuyển</label>
                                        <div className="col-sm-9">
                                               <input type="number" className="form-control inputtext" onchange={this.onChange} value={dataDetail.quantity} name='quantity'/>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Ngôn ngữ lập trình<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control inputtext" onchange={this.onChange} value={dataDetail.language} name='language' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Phòng ban</label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="DepartmentSelected" onChange={this.GetSelectDep}>
                                                    <option  value="" ></option>
                                                      {this.ShowListDep(ListDepartment)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Loại chức danh</label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="TypeJobWSelected" onChange={this.GetSelectTypeJobW}>
                                                     <option  value="" ></option>
                                                    {/* selected={infperson.provinceCode == null} */}
                                                      {this.ShowListTypeJobW(ListTypeJobW)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Lương từ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control inputtext" onchange={this.onChange} value={dataDetail.fromSalary} name='fromSalary' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Lương đến<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control inputtext" onchange={this.onChange} value={dataDetail.toSalary} name='toSalary' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Từ ngày<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                               <input type="date" className="form-control inputtext" onchange={this.onChange} value={dataDetail.fromDate} name='fromDate' />    
                                         </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Đến ngày<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                               <input type="date" className="form-control inputtext" onchange={this.onChange} value={dataDetail.toDate} name='toDate' />    
                                         </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Kinh nghiệm<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                             <input type="number" className="form-control inputtext" onchange={this.onChange} value={dataDetail.exp} name='exp'  />
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Logo<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9 ">
                                        <div id="drop-area">
                                    
                                            <input type="file" id="fileElem" multiple="" accept="image/*" onchange="handleFiles(this.files)" />
                                            <label style={{cursor: "pointer;"}} for="fileElem">Tải ảnh lên hoặc kéo thả vào đây</label>
                                            <progress id="progress-bar" max="100" value="0" class="d-none"></progress>
                                            <div id="gallery"></div>
                                        
                                        </div>
                                        
                                        </div>
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
                                             <CKEditor
                                                                    content={123}
                                                                    events={{
                                                                        blur: this.onBlurbenefits,
                                                                        afterPaste: this.afterbenefits,
                                                                        change: this.onChangebenefits
                                                                    }}
                                            /> 
                                    </div>
                                </div>
                                </div>

                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Yêu cầu chuyên môn
                                        <span id="clickc1_advance3" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                             <CKEditor
                                                                    content={123}
                                                                    events={{
                                                                        blur: this.onBlurrequired,
                                                                        afterPaste: this.afterrequired,
                                                                        change: this.onChangerequired
                                                                    }}
                                            /> 
                                    </div>
                                </div>
                                </div>


                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="headingTwo">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Mô tả công việc
                                        <span id="clickc1_advance3" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a>
                                    </h2>
                                </div>
                                <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                             <CKEditor
                                                                    content={123}
                                                                    events={{
                                                                        blur: this.onBlurdescription,
                                                                        afterPaste: this.afterdescription,
                                                                        change: this.onChangedescription
                                                                    }}
                                            /> 
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