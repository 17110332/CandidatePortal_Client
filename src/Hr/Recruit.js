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
import Loading from "./../Body/Loading"
import './Recruit.css';
import CKEditor from "./../Libs/CKEditor";
import Pagination from "react-js-pagination";
import swal from 'sweetalert2';
import Notfound from '../Body/Notfound';

const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;
const avata = DefaultAVT.base64str;
const sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
const role = base64_decode(sessionlogin).split("!@#$#@!").length >1 ?base64_decode(sessionlogin).split("!@#$#@!")[1] : 1; //1: ứng viên, 2: hr

const swalWithBootstrapButtons = swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })
  
 

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
            dataDetail:{
                photo:avata
            },
            isfirstload:true,
            loadingmaster:false,
            TypeJobWSelected:"",
            ListTypeJobW:[],
            DepartmentSelected:"",
            ListDepartment:[],
            IsAddNew:false,
            //model dùng chung
            quantity:0,
            fomDate:"",
            tDate:"",
            isActive:0,
            isAgree:false,
            photo:"",
            jobdescription:"",
            benefits:"",
            required:"",
            language:"",
            exp:"",
            fromSalary:"",
            toSalary:"",
            fromDate:"",
            toDate:""
        }
    }
    componentDidMount(){
        this.GetListTypeJobWoking();
        this.GetListJobWorking();
        this.GetListDepartment();
        this.onLoadDataMaster();
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
        },()=>{ 
            axios.get(APIstr +`api/Recruit/GetSalary/${e.target.value}`)
            .then(res=>{
                console.log("GetSalary",res);
                let object = JSON.parse(JSON.stringify(this.state.dataDetail))
                object["fromSalary"] = res.data ? res.data.fromSalary :""
                object["toSalary"] = res.data ? res.data.toSalary :""
                object["isAgree"] = res.data ? res.data.isAgree :false
                this.setState({
                    dataDetail:object
                });
            })
            .catch(err=>{
                console.log(err)
            })
        });
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
                       console.log("Top5ListJobNew",res)
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
        axios.get(APIstr +`api/Recruit/GetRecruitDetail/${recruitID}`)
        .then(res=>{
            if(res && res.data.length > 0 && (!res.data[0].photo || res.data[0].photo==""))
            {
                res.data[0].photo=avata;
            }
            this.setState({
                  dataDetail: res && res.data.length >0 ? res.data[0] :[],
                  JobWSelected: res && res.data.length >0 ? res.data[0].jobWCode:"",
                  TypeJobWSelected:res && res.data.length >0 ? res.data[0].typeJobWCode:"",
                  DepartmentSelected: res && res.data.length >0 ? res.data[0].departmentCode:"",
            });
        })
        .finally(() => {
            this.setState({
                loadingmaster:false,
                IsAddNew:false
            })
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
    onChange = event=>{
        var target = event.target;
        var name= target.name;
        var value = target.type=="checkbox" ? (target.checked ? true : false) : target.value;
        let object = JSON.parse(JSON.stringify(this.state.dataDetail))
        object[name] = value
        this.setState({
            dataDetail:object
            // dataDetail:{
            //     [name] : value
            // }
        });
    }
    onChangebenefits= (evt)=>{
        let object = JSON.parse(JSON.stringify(this.state.dataDetail))
        object["benefits"] =  evt.editor.getData()
        this.setState({
            dataDetail:object
        });
    }
    onChangerequired =(evt)=>{
        let object = JSON.parse(JSON.stringify(this.state.dataDetail))
        object["required"] =  evt.editor.getData()
        this.setState({
            dataDetail:object
        });
    }
    onChangedescription =(evt)=>{
        let object = JSON.parse(JSON.stringify(this.state.dataDetail))
        object["jobdescription"] =  evt.editor.getData()
        this.setState({
            dataDetail:object
        });
    }
    onImageChange = e => {
        e.preventDefault();
        let file = e.target.files[0];  
        if(file && (file.type !="image/png") && (file.type !="image/jpg") && (file.type !="image/jpeg"))
        {
            toast.error('Avatar không đúng định dạng!')
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if(reader.result)
            {
                let object = JSON.parse(JSON.stringify(this.state.dataDetail))
                object["photo"] = reader.result.replace("data:image/png;base64,","").replace("data:image/jpg;base64,","").replace("data:image/jpeg;base64,","");
                this.setState({
                    dataDetail:object
                });
            }
        };
    }
    doBeforeSave = (callback)=>{
        //ktra coi có bỏ trống field nào ko
        let {dataDetail,TypeJobWSelected,DepartmentSelected,JobWSelected} = this.state;
        dataDetail.modifiedBy=applicantcode;
        dataDetail.typeJobWCode=TypeJobWSelected;
        dataDetail.departmentCode=DepartmentSelected;
        dataDetail.jobWCode=JobWSelected
        let keys = Object.keys(dataDetail);

        for (var i = 0; i < keys.length; i++) {
            if(!dataDetail[keys[i]] || dataDetail[keys[i]]=="")
            {
                if(keys[i] != "isActive" && keys[i] != "createdBy" && keys[i] != "createdOn" && keys[i] != "modifiedBy" && keys[i] != "modifiedOn" && keys[i] != "isAgree")
                {   
                    toast.error('Dữ liệu nhập thiếu trường '+keys[i] +' bắt buộc');
                    return;
                }
            }
        }
        if(callback)
            callback(dataDetail);
    }
    doSave =(dataDetail)=>{
        let datasave =  new FormData();
        //datasave.set('RecruitRequest',JSON.stringify(dataDetail));
        datasave.set('RecruitID',dataDetail.recruitID);
        datasave.set('TypeJobWCode',dataDetail.typeJobWCode);
        datasave.set('DepartmentCode',dataDetail.departmentCode);
        datasave.set('JobWCode',dataDetail.jobWCode);
        datasave.set('Quantity',dataDetail.quantity);
        datasave.set('FromDate',dataDetail.fromDate);
        datasave.set('ToDate',dataDetail.toDate);
        datasave.set('IsActive',dataDetail.isActive);
        datasave.set('Photo',dataDetail.photo);
        datasave.set('CreatedBy',applicantcode);
        datasave.set('Jobdescription',dataDetail.jobdescription);
        datasave.set('Benefits',dataDetail.benefits);
        datasave.set('Language',dataDetail.language);
        datasave.set('Exp',dataDetail.exp);
        datasave.set('Required',dataDetail.required);
        // for (var pair of datasave.entries()) {
        //     console.log("datasave",pair[0]+ ', ' + pair[1]); 
        // }
        axios.post(APIstr +`api/Recruit/SaveRecruit`,datasave)
        .then(res=>{
            if(dataDetail.recruitID != -1)
            {
                toast.success('Cập nhật xong!');
            }
            else
            {
                toast.success('Đã thêm xong!');
            }
            this.setState({
                IsAddNew:false
            });
        })
        .catch(err=>{
            console.log("eee",err)
        })
    }
    doSaveAfterValidate = ()=>{
        this.doBeforeSave(this.doSave);
    }
    onClickAdd =()=>{
        this.setState({
            IsAddNew:true,
            dataDetail:{
                recruitID:-1,
                typeJobWCode:"",
                departmentCode:"",
                jobWCode:"",
                quantity:"",
                fromDate:"",
                toDate:"",
                isActive:false,
                isAgree:false,
                photo:avata,
                createdBy:"",
                jobdescription:"",
                benefits:"",
                exp:"",
                language:"",
                toSalary:"",
                fromSalary:"",
                required:""
            }
        });
    }
    onDeleteRecruit = (recruitID)=>{
        swalWithBootstrapButtons.fire({
            title: 'Chắc chắn xóa?',
            text: "Dữ liệu xóa hoàn toàn khỏi hệ thống!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Chắc chắn!',
            cancelButtonText: 'Đóng!',
            reverseButtons: true
          }).then((result) => {
            if ( result.dismiss === swal.DismissReason.cancel) 
            {
              swalWithBootstrapButtons.fire(
                'Đã hủy',
                'Kiểm tra kỹ trước khi xóa',
                'error'
              )
            }
            else
            {
                axios.get(APIstr +`api/Recruit/DeleteRecruit/${recruitID}`)
                .then(res=>{
                    swalWithBootstrapButtons.fire(
                        'Đã xóa!',
                        'Dữ liệu không còn trên hệ thống.',
                        'success'
                      )
                })
                .catch(err=> {
                    swalWithBootstrapButtons.fire(
                        'Xóa lỗi',
                        'Kiểm tra lại API',
                        'error'
                      )
                })
                .finally(() => {
                    this.onLoadDataMaster(()=>{});
                });
            }
          })
    }
    render()
    {  
        if(role != 2)
        {
            return <Notfound />
        }
        else{
        let {Top5ListJobNew,PageIndex,PageSize,TotalPage,loading,ListJobW, dataDetail,ListTypeJobW,ListDepartment} = this.state;
        console.log("Top5ListJobNew",Top5ListJobNew)
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
                        <Link to={`/HrProfile`}  className="nav-link">Danh sách đăng tuyển</Link>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="#">Danh mục chức danh</a>
                        </li> */}
                        <li className="nav-item">
                        <Link to={`/HrCandidate`}  className="nav-link">Hồ sơ ứng viên</Link>
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
                                
                                    <button type="button" id="btnadd" className="btn-submit-recuitment" name="" onClick={()=>this.onClickAdd()}>
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

                                {/* loader */}
                                {/* <div class="overlay">
                                    <div class="overlay__inner">
                                        <div class="overlay__content"><span class="spinner"></span></div>
                                    </div>
                                </div> */}



                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body">
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Chức danh<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="JobWSelected" onChange={this.GetSelectJobW}>
                                                    <option  value="" selected={dataDetail.jobWCode == null || dataDetail.jobWCode == ""} ></option>
                                                    {/* selected={infperson.provinceCode == null} */}
                                                      {this.ShowJobWorking(ListJobW)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Số lượng cần tuyển</label>
                                        <div className="col-sm-9">
                                               <input type="number" className="form-control SearchCustom"value={dataDetail.quantity} name='quantity'  onChange={this.onChange} />

                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Ngôn ngữ lập trình<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.language} name='language' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Phòng ban</label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="DepartmentSelected" onChange={this.GetSelectDep}>
                                                    <option  value="" selected={dataDetail.departmentCode == null || dataDetail.departmentCode == ""}></option>
                                                      {this.ShowListDep(ListDepartment)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Loại chức danh</label>
                                        <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="TypeJobWSelected" onChange={this.GetSelectTypeJobW}>
                                                     <option  value="" selected={dataDetail.typeJobWCode == null || dataDetail.typeJobWCode == ""}></option>
                                                      {this.ShowListTypeJobW(ListTypeJobW)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Lương từ<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.fromSalary} name='fromSalary' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Lương đến<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <input type="text" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.toSalary} name='toSalary' />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Là lương thỏa thuận<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <label class="switch">
                                                <input type="checkbox"  checked={dataDetail.isAgree} name="isAgree" onChange={this.onChange}/>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Từ ngày<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                               <input type="date" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.fromDate} name='fromDate' />    
                                         </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Đến ngày<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                               <input type="date" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.toDate} name='toDate' />    
                                         </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Kinh nghiệm<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                             <input type="number" className="form-control SearchCustom" onChange={this.onChange} value={dataDetail.exp} name='exp'  />
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Đang hiệu lực<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9">
                                            <label class="switch">
                                                <input type="checkbox"  checked={dataDetail.isActive} name="isActive" onChange={this.onChange}/>
                                                <span class="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="form-group row">
                                        <label className="col-sm-3 col-form-label text-right label">Logo<span style={{color:"red"}} className="pl-2">*</span></label>
                                        <div className="col-sm-9 ">
                                            <div className="avatar-upload">
                                                    <div className="avatar-edit">
                                                        <input type="file" id="imageUpload"  onChange={this.onImageChange}/>   {/*accept=".png, .jpg, .jpeg" */}
                                                        <label htmlFor="imageUpload"></label>
                                                    </div>
                                                    <div className="avatar-preview">
                                                        <div id="imagePreview" style={{backgroundImage: 'url("data:image/jpeg;base64,' + dataDetail.photo + '")'}} >  {/*style={{backgroundImage:Avatar }} */}
                                                        </div>
                                                    </div>
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
                                                                    content={dataDetail.benefits}
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
                                                                    content={dataDetail.required}
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
                                                                     content={dataDetail.jobdescription}
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
                                     <button  type="button" id="btnxoa" className="btn-submit-recuitment" name="" onClick={()=>this.onDeleteRecruit(dataDetail.recruitID)}>
                                         <i className="fa fa-trash-o pr-2"></i>Xóa
                                    </button>
                                    <button type="button" id="btnluu" className="btn-submit-recuitment" name="" onClick={()=>this.doSaveAfterValidate()}>
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
}
export default Recruit;