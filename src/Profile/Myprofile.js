import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import  './Myprofile.css'
const APIstr = Listconst.API;

class Myprofile extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            province:"",
            district:"",
            ward:"",
            street:"",
            lstprovince:[],
            lstdictrict:[],
            lstward:[],
            //info personal
            infperson:{},
            applicantCode: "",
            avatar: "",
            birthDay: "",
            cvApplicant: "",
            districtCode: "",
            email: "",
            exp: "",
            firstName: "",
            gender: "",
            graduated: "",
            introduceYourself: "",
            lastName: "",
            level: "",
            married: "",
            mobile: "",
            provinceCode: "",
            school: "",
            skill: "",
            skillOther: "",
            streetName: "",
            titleDoc: "",
            username: "",
            wardCode: "",
            workProgress: "",
            Avatar:"url(https://i.pravatar.cc/500?img=7)",
            FileAttach:"",
            filename:""
        }
    }
    componentDidMount()
    {
        let sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
                   //load thọng tin ứng viên
        axios.get(APIstr + `api/Applicant/GetApplicantByUserName/${sessionlogin}`)
        .then(res=>{
            console.log("GetApplicantByUserName",res)
            let personal=res.data.length >0 ? res.data[0] : {}
            
            if(personal.provinceCode)
            {
                axios.get(APIstr +`api/Country/GetDistrict/${personal.provinceCode}`)
                .then(res=>{
                    this.setState({
                        lstdictrict:res.data.length >0 ? res.data:[]
                    },()=>{
                        if(personal.districtCode)
                        {
                            // load xã/phường theo quận huyện
                            axios.get(APIstr +`api/Country/GetWards/${personal.districtCode}`)
                            .then(res=>{
                                this.setState({
                                    lstward:res.data.length >0 ? res.data:[]
                                })
                            })
                            .catch(err=>{
                                console.log(err)
                            })
                        }
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            }
            console.log("personal.provinceCode",personal.provinceCode)
            this.setState({
                infperson:res.data.length >0 ? res.data[0] : {},
                applicantCode: personal.applicantCode ? personal.applicantCode : "",
                avatar: personal.avatar ? personal.avatar : "",
                birthDay: personal.birthDay ? personal.birthDay : "01/01/1900",
                cvApplicant: personal.cvApplicant ? personal.cvApplicant : "",
                districtCode:personal.districtCode ? personal.districtCode :  "",
                email: personal.email ? personal.email : "",
                exp: personal.exp ? personal.exp : 0,
                firstName: personal.firstName ? personal.firstName : "",
                gender: personal.gender ? personal.gender : 0,
                graduated: personal.graduated ? 1 : 0,
                introduceYourself: personal.introduceYourself ? personal.introduceYourself : "",
                lastName:personal.lastName ? personal.lastName :  "",
                level: personal.level ? personal.level : 0,
                married: personal.married ? personal.married : 0,
                mobile: personal.mobile ? personal.mobile : "",
                provinceCode:personal.provinceCode ? personal.provinceCode :  "",
                school: personal.school ? personal.school : "",
                skill: personal.skill ? personal.skill : "",
                skillOther: personal.skillOther ? personal.skillOther : "",
                streetName:personal.streetName ? personal.streetName :  "",
                titleDoc:personal.titleDoc ? personal.titleDoc :  "",
                username: personal.username ? personal.username : "",
                wardCode: personal.wardCode ? personal.wardCode : "",
                workProgress:personal.workProgress ? personal.workProgress :  "",
                province:personal.provinceCode ? personal.provinceCode :  "",
                district:personal.districtCode ? personal.districtCode :  "",
                ward:personal.wardCode ? personal.wardCode :  "",
                street:personal.streetName ? personal.streetName :  "",
                Avatar:personal.avatar ?"url('data:image/jpeg;base64," + personal.avatar +"')":"url(https://i.pravatar.cc/500?img=7)",
                filename:personal.fileName ? personal.fileName :  "",
            })
        })
        .catch(err=>{
            console.log(err)
        })
        //load thông danh sách tỉnh thành trước tiên
        axios.get(APIstr +"api/Country/GetProvinces")
        .then(res=>{
            this.setState({
                lstprovince:res.data.length >0 ? res.data:[],
             //   province:res.data.length >0 ?res.data[0].provinceCode :"",
             //   provinceCode:res.data.length >0 ?res.data[0].provinceCode :""
                //provinceCode:res.data.length > 0 && res.data.filter(item=> item.provinceCode == infperson.provinceCode).length > 0 ? infperson.provinceCode : (res.data.length > 0 ? res.data[0].provinceCode : "")
            })
        })
        .catch(err=>{
            console.log(err)
        })
    }
    //chọn tỉnh thành
    getProvince=e=>{
        let {infperson}=this.state;
        this.setState({
            province: e.target.value,
            provinceCode:e.target.value
        },()=>{
            // load quận huyện theo tỉnh thànhprovince
            axios.get(APIstr +`api/Country/GetDistrict/${e.target.value}`)
            .then(res=>{
                this.setState({
                    lstdictrict:res.data.length >0 ? res.data:[],
                    district:res.data.length > 0 && res.data.filter(item=> item.districtCode == infperson.districtCode).length > 0 ? infperson.districtCode :  ""
                },()=>{
                  
                    if(this.state.district && this.state.district !="")
                    {
                         // load xã/phường theo quận huyện
                        axios.get(APIstr +`api/Country/GetWards/${this.state.district}`)
                        .then(ress=>{
                            this.setState({
                                lstward:ress.data.length >0 ? ress.data:[],
                                ward:ress.data.length > 0 && ress.data.filter(item=> item.wardCode == infperson.wardCode).length > 0  ? infperson.wardCode :""
                            })
                        })
                        .catch(err=>{
                            console.log(err)
                        })
                    }
                })
            })
            .catch(err=>{
                console.log(err)
            })
        });
    }

    //chọn quận huyện
    getDistrict=e=>{
        this.setState({
            district: e.target.value
        },()=>{
            // load xã/phường theo quận huyện
            axios.get(APIstr +`api/Country/GetWards/${e.target.value}`)
            .then(res=>{
                this.setState({
                    lstward:res.data.length >0 ? res.data:[]
                })
            })
            .catch(err=>{
                console.log(err)
            })
        });
    }
    //chọn phường xã
    getWard=e=>{
        this.setState({
            ward: e.target.value
        })
    }
    //load tình thành
    ShowListProvince = (ListProvince,infperson)=>{
        var result = null;
        if(ListProvince.length > 0)
        {
          result=ListProvince.map((item, index)=>{
            return (          
                    <option key={index} value={item.provinceCode} selected={infperson.provinceCode == item.provinceCode} >{item.provinceName}</option>
            )
          });
        }
        return result;
    }
    //load quận huyện
    ShowListDistrict = (ListDistrict,infperson)=>{
        var result = null;
        if(ListDistrict.length > 0)
        {
          result=ListDistrict.map((item, index)=>{
            return (          
                    <option key={index} value={item.districtCode} selected={infperson.districtCode == item.districtCode}>{item.districtName}</option>
            )
          });
        }
        return result;
    }

    //load xã/phường
    ShowListWard = (ListWard,infperson) =>{
        var result = null;
        if(ListWard .length > 0)
        {
          result=ListWard .map((item, index)=>{
            return (          
                    <option key={index} value={item.wardCode} selected={infperson.wardCode == item.wardCode}>{item.wardName}</option>
            )
          });
        }
        return result;
    }
    
    onChange=e=>{
        var target = e.target;
        var name = target.name;
        var value = target.type=="checkbox" ? (target.checked ? 1 : 0) : target.value;
        this.setState({
          [name]: value
        });
    }
    onSave =()=>{
        let {province,district,ward,street,infperson,applicantCode, avatar, birthDay,cvApplicant,districtCode, email, exp, firstName, gender,graduated,introduceYourself,lastName,level, married,mobile,provinceCode,school,skill,skillOther,streetName, titleDoc,username, wardCode, workProgress}= this.state;
        var infopersonAdd =  new FormData();
        debugger
        if(!birthDay)
        {
            toast.error('Nhập ngày sinh!');
            return;
        }
        else if(!province || province=="")
        {
            toast.error('Nhập tỉnh đang ở!');
            return;
        }
        else if(!district || district=="")
        {
            toast.error('Nhập huyện đang ở!');
            return;
        }
       
        else if(!email)
        {
            toast.error('Nhập email liên lạc!');
            return;
        }
       
        else if(!firstName)
        {
            toast.error('Nhập họ!');
            return;
        }
        else if(!lastName)
        {
            toast.error('Nhập tên lót + tên!');
            return;
        }
        else if(!introduceYourself)
        {
            toast.error('Nhập mcu5 giới thiệu bản thân!');
            return;
        }
        else if(!school)
        {
            toast.error('Nhập tên nơi đào tạo!');
            return;
        }
        else if(!skill)
        {
            toast.error('Nhập kỹ năng chuyên môn!');
            return;
        }
        else if(!skillOther)
        {
            toast.error('Nhập các kỹ năng khác(quản lý, thuyết trình,...)!');
            return;
        }
        else if(!streetName)
        {
            toast.error('Nhập đại chỉ, số nhà!');
            return;
        }

        else if(!titleDoc)
        {
            toast.error('Nhập tiêu đề thông tin!');
            return;
        }

        else if(!ward || ward=="")
        {
            toast.error('Nhập thị trấn/phường/xã!');
            return;
        }
        else if(!workProgress)
        {
            toast.error('Nhập quá trình làm việc!');
            return;
        }

        console.log("provinceCode",provinceCode,province)
        infopersonAdd.set('ApplicantCode',infperson.applicantCode);
        infopersonAdd.set('Avatar',avatar);
        infopersonAdd.set('BirthDay',birthDay);
        infopersonAdd.set('CVApplicant',cvApplicant);
        infopersonAdd.set('DistrictCode',district);
        infopersonAdd.set('Email',email);

        infopersonAdd.set('Exp',exp);
        infopersonAdd.set('FirstName',firstName);
        infopersonAdd.set('Graduated',graduated ? 1 : 0);
        infopersonAdd.set('Gender',gender);
        infopersonAdd.set('IntroduceYourself',introduceYourself);
        infopersonAdd.set('LastName',lastName);

        infopersonAdd.set('Level',level);
        infopersonAdd.set('Married',married);
        infopersonAdd.set('Mobile',mobile);
        infopersonAdd.set('ProvinceCode',province);
        infopersonAdd.set('IntroduceYourself',introduceYourself);
        infopersonAdd.set('School',school);

        infopersonAdd.set('Skill',skill);
        infopersonAdd.set('SkillOther',skillOther);
        infopersonAdd.set('StreetName',streetName);
        infopersonAdd.set('TitleDoc',titleDoc);
        infopersonAdd.set('WardCode',ward);
        infopersonAdd.set('WorkProgress',workProgress);
        //axios.post(APIstr +`api/AccountAction/SaveInfoPersonal`,infopersonAdd)
         axios.post(APIstr +`api/Applicant/SaveInfoPersonal`,infopersonAdd)
        .then(res=>{
            toast.success('Đã lưu xong!')
        })
        .catch(err=>{
            console.log("eee",err)
            // toast.error('Lưu lỗi !')
            // return;
        })
    }
    onImageChange = e => {
        e.preventDefault();
        let file = e.target.files[0];  
        console.log("hahaha",file);
        debugger
        if(file && (file.type !="image/png") && (file.type !="image/jpg") && (file.type !="image/jpeg"))
        {
            toast.error('Avatar không đúng định dạng!')
            return;
        }
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
              //      console.log("reader.result",reader.result)
                    // // Make a fileInfo Object
                    // let fileInfo = {
                    //     name: file.name,
                    //     type: file.type,
                    //     size: Math.round(file.size / 1000) + ' kB',
                    //     base64: reader.result,
                    //     file: file,
                    // };
            this.setState({
                Avatar:reader.result ?"url('" + reader.result +"')":"url(https://i.pravatar.cc/500?img=7)",
                avatar:reader.result.replace("data:image/png;base64,","").replace("data:image/jpg;base64,","").replace("data:image/jpeg;base64,","")
            });
        };
        reader.onloadend = function(progressEvent) {
            let me= this;
            //gọi api lưu base64str vào db
            if(reader.result)
            {
                 let base64str = reader.result.replace("data:image/png;base64,","").replace("data:image/jpg;base64,","").replace("data:image/jpeg;base64,","");         
                 console.log("base64str",base64str)
                 let tokenlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin") : "";
                 var request =  new FormData();
                 request.set('FileBase64',base64str);
                 request.set('TokenLogin',tokenlogin);
                 request.set('Options',1);
                 request.set('FileName',file.name);
              // axios.post(APIstr +`api/Applicant/UploadFile/${base64str}`)
              axios.post(APIstr +`api/Applicant/UploadFile`,request)
                 .then(res=>{
                     console.log("upload IMAGE", res);
                 })
            }
        }
    }
    onFileChange=(e)=>{
        e.preventDefault();
        let previewFileName = document.getElementById("previewFileName");

        let file = e.target.files[0];  
        console.log("file cv",file);
         if(file && file.type !="application/pdf" 
         && file.type !="application/vnd.openxmlformats-officedocument.wordprocessingml.document")
        {
            toast.error('File đính kèm phải là file word hoặc pdf');
            previewFileName.innerHTML=this.state.filename;
            return;
        }
        previewFileName.innerHTML=file.name;

         let reader = new FileReader();
         reader.readAsDataURL(file);
         reader.onload = () => {
            if(reader.result)
            {
                 let base64str = reader.result.split("base64,").length > 1 ? reader.result.split("base64,")[1] : "";     
                 console.log("base64str",base64str)
                 let tokenlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin") : "";
                 var request =  new FormData();
                 request.set('FileBase64',base64str);
                 request.set('TokenLogin',tokenlogin);
                 request.set('Options',2);
                 request.set('FileName',file.name);
                 axios.post(APIstr +`api/Applicant/UploadFile`,request)
                 .then(res=>{
                     console.log("upload file CV", res);
                     this.setState({
                        cvApplicant:base64str,
                        filename:file.name
                    });
                 })
            }
          
        };
    }
    DownloadCV=()=>{
        let {filename,cvApplicant} = this.state;
        let linkSource='';
        if(filename.includes('.doc'))
        {
             linkSource = `data:application/pdf;base64,${cvApplicant}`;
        }
        else if(filename.includes('.pdf'))
        {
             linkSource = `data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,${cvApplicant}`;
        }
        else
        {
            toast.error('File tải không được hỗ trợ!');
            return;
        }
        const downloadLink = document.createElement('a');//target="_blank"
     //   downloadLink.setAttribute('target', '_blank');
        document.body.appendChild(downloadLink);
    
        downloadLink.href = linkSource;
        downloadLink.target = '_self';
        downloadLink.download = filename;
        downloadLink.click(); 
    }
    render(){
        let  {lstprovince, lstdictrict,lstward,Avatar,filename} = this.state;
        let {infperson,applicantCode, avatar, birthDay,cvApplicant,districtCode, email, exp, firstName, gender,graduated,introduceYourself,lastName,level, married,mobile,provinceCode,school,skill,skillOther,streetName, titleDoc,username, wardCode, workProgress}= this.state;
        let checked=graduated==1 ? true: false;
        let fullname=firstName+' '+lastName;
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light nav-recuitment">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNava" aria-controls="navbarNava" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse container" id="navbarNava">
                        <ul className="navbar-nav nav-recuitment-li">
                            <li className="nav-item active">
                                <a className="nav-link" href="#">Quản lý hồ sơ</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Việc làm đã nộp</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Việc làm yêu thích</a>
                            </li>
                        </ul>
                        <ul className="rec-nav-right">
                            <li className="nav-item">
                                <a className="nav-link" href="#">Chỉnh sửa hồ sơ</a>
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
                        <div className="col-md-8 col-sm-12 col-12 recuitment-inner">
                            <form className="employee-form" >
                            <div className="accordion" id="accordionExample">
                                <div className="card recuitment-card">
                                <div className="card-header recuitment-card-header" id="headingOne">
                                    <h2 className="mb-0">
                                    <a className="btn btn-link btn-block text-left recuitment-header" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Thông tin tài khoản
                                        <span id="clickc1_advance2" className="clicksd">
                                             <i className="fa fa fa-angle-up"></i>
                                        </span>
                                    </a> 
                                    </h2>
                                </div>

                                <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div className="card-body recuitment-body row">
                                    <div className="col-md-3">
                                        <div className="avatar-upload">
                                        <div className="avatar-edit">
                                           <input type="file" id="imageUpload"  onChange={this.onImageChange} />   {/*accept=".png, .jpg, .jpeg" */}
                                            <label htmlFor="imageUpload"></label>
                                        </div>
                                        <div className="avatar-preview">
                                            <div id="imagePreview" style={{backgroundImage:Avatar }}>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-md-9">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Họ<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control SearchCustom" placeholder="Nhập họ" value={firstName} name="firstName" onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Tên<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control SearchCustom" placeholder="Nhập tên lót + tên" value={lastName} name="lastName" onChange={this.onChange}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Số điện thoại</label>
                                            <div className="col-sm-9">
                                                <input type="number" className="form-control SearchCustom" value={mobile} name="mobile" onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Email</label>
                                            <div className="col-sm-9">
                                                <input type="email" className="form-control SearchCustom" value={email} name="email" onChange={this.onChange}/>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Giới tính
                                            <span style={{color: "red"}} className="pl-2">*</span>
                                            </label>
                                            <div className="col-sm-9">
                                                <select type="text" className="form-control SearchCustom" name="gender" onChange={this.onChange}>
                                                    <option value="0" selected={gender == 0}>Chưa xác định</option>
                                                    <option value="1" selected={gender == 1}>Nam</option>
                                                    <option value="2" selected={gender == 2}>Nữ</option>
                                                </select>
                                                {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="20" style={{width: "375px;"}}>
                                                    <span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" 
                                                    tabIndex="0" aria-disabled="false" aria-labelledby="select2-jobGender-container"><span className="select2-selection__rendered" id="select2-jobGender-container" 
                                                    role="textbox" aria-readonly="true" title="Chọn giới tính">Chọn giới tính</span><span className="select2-selection__arrow" role="presentation">
                                                        <b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span>
                                                </span> */}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Ngày sinh</label>
                                            <div className="col-sm-9">
                                                <input type="text" className="form-control SearchCustom" placeholder="dd/mm/yyyy" value={birthDay} name="birthDay" onChange={this.onChange}/>
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Hôn nhân<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="married" onChange={this.onChange}>
                                                <option value="0" selected={married == 0}>Độc thân</option>
                                                <option value="1" selected={married == 1}>Đã kết hôn</option>
                                            </select>
                                            {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="205" style={{width: "375px;"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-empStatus-container"><span className="select2-selection__rendered" id="select2-empStatus-container" role="textbox" aria-readonly="true" title="Chọn tình trạng hôn nhân">Chọn tình trạng hôn nhân</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span> */}
                                            </div>
                                        </div>
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Tỉnh/ Thành phố<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="province" onChange={this.getProvince} >
                                                <option  value="" selected={infperson.provinceCode == null}></option>

                                                {this.ShowListProvince(lstprovince,infperson)}
                                            </select>
                                            {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="24" style={{width: "375px;"}}>
                                                <span className="selection">
                                                    <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-jobProvince2-container">
                                                        <span className="select2-selection__rendered" id="select2-jobProvince2-container" role="textbox" aria-readonly="true" title="Hồ Chí Minh">Hồ Chí Minh</span>
                                                        <span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span>
                                                        </span> */}
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Quận/huyện<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="district" onChange={this.getDistrict} >
                                            <option  value="" selected={infperson.districtCode == null}></option>

                                                {this.ShowListDistrict(lstdictrict,infperson)}
                                            </select>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Xã/phường<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                            <select type="text" className="form-control SearchCustom" name="ward" onChange={this.getWard}>
                                            <option  value="" selected={infperson.wardCode == null}></option>

                                            {this.ShowListWard(lstward,infperson)}
                                            
                                            </select>
                                            </div>
                                        </div>


                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Chỗ ở hiện tại<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                                <textarea type="text"  className="form-control SearchCustom" placeholder="Số nhà, tên đường" value={streetName} name="streetName" onChange={this.onChange}> 
                                                </textarea>
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
                                        File đính kèm
                                        <span id="clickc1_advance3" className="clicksd">
                                        <i className="fa fa fa-angle-up"></i>
                                        </span>

                                    </a>
                                    </h2>
                                </div>
                                     <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                        <div className="card-body recuitment-body">
                                        <div className="form-group row">
                                            <label className="col-sm-3 col-form-label text-right label">Chọn hồ sơ đính kèm<span style={{color: "red"}} className="pl-2">*</span></label>
                                            <div className="col-sm-9">
                                            <input type="file" id="file" className="recuitment-card-acttachment" onChange={this.onFileChange}/>
                                            <label htmlFor="file" className="btn-1"><i className="fa fa-paperclip pr-2"></i>Chọn file</label>
                                           
                                            <p className="output-file">
                                                <span id="previewFileName">{filename}</span>
                                                {
                                                    cvApplicant!="" &&                                    
                                                    <button className="btnExport" onClick={()=>this.DownloadCV()}><i className="fa fa-download"></i> Download </button>

                                                }

                                            </p>
                                            </div>
                                        </div>
                                        </div>
                                    </div> 
                                </div>
                               {/* sai ngay đây */}
                                <div className="card recuitment-card">
                                    <div className="card-header recuitment-card-header" id="headingThree">
                                        <h2 className="mb-0">
                                        <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                            Thông tin chung
                                            <span id="clickc1_advance1" className="clicksd">
                                            <i className="fa fa fa-angle-up"></i>
                                            </span>
                                        </a>
                                        </h2>
                                    </div>
                                    <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                        <div className="card-body recuitment-body">
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Tiêu đề hồ sơ<span style={{color: "red"}} className="pl-2">*</span></label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control SearchCustom" placeholder="Nhập tiêu đề" value={titleDoc} name="titleDoc" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                    
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Giới thiệu bản thân
                                                     <span style={{color: "red"}} className="pl-2">*</span>
                                                </label>
                                                <div className="col-sm-9">
                                                    <textarea type="text"  className="form-control SearchCustom" placeholder="Giới thiệu bản thân" value={introduceYourself} name="introduceYourself" onChange={this.onChange}>
                                                    </textarea>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Trình độ<span style={{color: "red"}} className="pl-2">*</span></label>
                                                <div className="col-sm-9">
                                                    <select type="text" className="form-control SearchCustom" name="level" onChange={this.onChange}>
                                                        <option selected="selected" value="" data-select2-id="2">Chọn trình độ</option>
                                                        <option value="7" selected={level == 7}>Cao học</option>
                                                        <option value="6" selected={level == 6}>Đại học</option>
                                                        <option value="5" selected={level == 5}>Cao đẳng</option>
                                                        <option value="4" selected={level == 4}>Trung cấp</option>
                                                        <option value="3" selected={level == 3}>Trung học</option>
                                                        <option value="2" selected={level == 2}>Chứng chỉ</option>
                                                        <option value="1" selected={level == 1}>Lao động phổ thông</option>
                                                    </select>
                                                    {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="1" style={{width: "510px;"}}>
                                                        <span className="selection">
                                                            <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" 
                                                                     aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-jobLevel-container">
                                                                <span className="select2-selection__rendered" id="select2-jobLevel-container" role="textbox" aria-readonly="true" 
                                                                      title="Chọn trình độ">Chọn trình độ</span><span className="select2-selection__arrow" role="presentation">
                                                                    <b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true">
                                                                </span>
                                                        </span> */}
                                                </div>
                                            </div>

                                            
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Nơi đào tạo<span style={{color: "red"}} className="pl-2">*</span></label>
                                                <div className="col-sm-9">
                                                    <input type="text" className="form-control SearchCustom" placeholder="Nhập tên trường/nơi đào tạo" value={school} name="school" onChange={this.onChange}/>
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Đã tốt nghiệp<span style={{color: "red"}} className="pl-2">*</span></label>
                                                <div className="col-sm-9">
                                                    <input type="checkbox" className="SearchCustom CheckboxCustom" placeholder="Đã tốt nghiệp" checked={checked} name="graduated" onChange={this.onChange}/>
                                                </div>
                                            </div>
                                            
                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Số năm kinh nghiệm
                                                     <span style={{color: "red"}} className="pl-2">*</span>
                                                </label>
                                                <div className="col-sm-9">
                                                <select type="text"  className="form-control SearchCustom" name="exp" onChange={this.onChange}>
                                                    <option value="0"  selected={exp == 0}>Chưa có kinh nghiệm</option>
                                                    <option value="1"  selected={exp == 1}>Dưới 1 năm</option>
                                                    <option value="2"  selected={exp == 2}>1-2 năm</option>
                                                    <option value="3"  selected={exp == 3}>2-3 năm</option>
                                                    <option value="4"  selected={exp == 4}>Trên 3 năm</option>
                                                </select>
                                                    {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="10" style={{width: "510px;"}}>
                                                        <span className="selection">
                                                            <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" 
                                                                aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-jobExperience-container">
                                                                <span className="select2-selection__rendered" id="select2-jobExperience-container" role="textbox" aria-readonly="true" 
                                                                        title="Chọn kinh nghiệm">Chọn kinh nghiệm
                                                                </span>
                                                                <span className="select2-selection__arrow" role="presentation">
                                                                    <b role="presentation"></b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true"></span>
                                                    </span> */}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Quá trình làm việc trước đó
                                                     <span style={{color: "red"}} className="pl-2">*</span>
                                                </label>
                                                <div className="col-sm-9">
                                                <textarea type="text"  className="form-control SearchCustom" placeholder="Mô tả quá trình làm việc" value={workProgress} name="workProgress" onChange={this.onChange}>
                                                </textarea>
                                                    {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="10" style={{width: "510px;"}}>
                                                        <span className="selection">
                                                            <span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" 
                                                                aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-jobExperience-container">
                                                                <span className="select2-selection__rendered" id="select2-jobExperience-container" role="textbox" aria-readonly="true" 
                                                                        title="Chọn kinh nghiệm">Chọn kinh nghiệm
                                                                </span>
                                                                <span className="select2-selection__arrow" role="presentation">
                                                                    <b role="presentation"></b>
                                                                </span>
                                                            </span>
                                                        </span>
                                                        <span className="dropdown-wrapper" aria-hidden="true"></span>
                                                    </span> */}
                                                </div>
                                            </div>

                                            <div className="form-group row">
                                                <label className="col-sm-3 col-form-label text-right label">Kỹ năng chuyên môn<span style={{color: "red"}} className="pl-2">*</span></label>
                                                <div className="col-sm-9">
                                                     <textarea type="text"  className="form-control SearchCustom" placeholder="Kỹ năng làm việc" value={skill} name="skill" onChange={this.onChange}>
                                                    </textarea>
                                                   {/* <span className="select2 select2-container select2-container--default" dir="ltr" data-select2-id="209" style={{width: "510px;"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabIndex="0" aria-disabled="false" aria-labelledby="select2-empLevel-container"><span className="select2-selection__rendered" id="select2-empLevel-container" role="textbox" aria-readonly="true" title="Chọn cấp bậc">Chọn cấp bậc</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span> */}
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Ky năng khác<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <textarea type="text"  className="form-control SearchCustom" placeholder="Kỹ năng làm việc khác" value={skillOther} name="skillOther" onChange={this.onChange}>
                                                        </textarea>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* sai ngay đây */}
                        

                                <div className="rec-submit">
                                    <button type="button" className="btn-submit-recuitment mb-3 ml-3" name="" onClick={()=>this.onSave()}>
                                         <i className="fa fa-floppy-o pr-2"></i>Lưu Hồ Sơ
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="col-md-4 col-sm-12 col-12">
                            <div className="recuiter-info">
                            <div className="recuiter-info-avt">
                                <img src={`data:image/png;base64,${avatar}`} />
                            </div>
                            <div className="clearfix list-rec">
                                <h4>{fullname}</h4>
                                <ul>
                                <li><a href="#">Việc làm yêu thích<strong>(0)</strong></a></li>
                                <li><a href="#">Việc làm đã nộp <strong>(0)</strong></a></li>
                                </ul>
                            </div>
                            </div>


                        <div className="block-sidebar" style={{marginBottom: "20px;"}}>
                            <header>
                                <h3 className="title-sidebar font-roboto bg-primary">
                                    Trung tâm quản lý
                                </h3>
                            </header>
                            <div className="job-sidebar">
                                <div className="sb-banner">
                                       <img src="img/img1.png" className="advertisement" alt="" />
                                </div>
                             </div>
                            {/* <div className="content-sidebar menu-trung-tam-ql menu-ql-employer">
                                <h3 className="menu-ql-ntv">
                                    Hồ sơ của bạn
                                </h3>
                                <ul>
                                    <li>
                                        <a href="#">
                                        Quản lý Tài khoản
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#">
                                        Quản lý hồ sơ
                                        </a>
                                    </li>
                                </ul>
                                <h3 className="menu-ql-ntv">
                                    Việc làm của bạn
                                </h3>
                                <ul>
                                    <li>
                                        <a href="#">
                                        Việc làm đã lưu
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" target="_blank">
                                        Việc làm dã ứng tuyển
                                        </a>
                                    </li>
                                </ul>
                                <h3 className="menu-ql-ntv">
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
                                    <li className="logout">
                                        <a href="#" title="Đăng xuất">
                                        Đăng xuất
                                        </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                    </div>
                    </div>
                </div>



            </div>
        );
    }
}
export default Myprofile;