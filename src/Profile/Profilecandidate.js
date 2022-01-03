import React, {Component} from 'react';
import Listconst from '../Const/Listconst';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import  './Myprofile.css'
import Loading from "./../Body/Loading"
const APIstr = Listconst.API;

class Profilecandidate extends Component{
    constructor(props)
    {
        super(props);

        this.state={
            idjobapplying:'',
            isUIProfile:true,
            isUIJobLike:false,
            isUIJobApply:false,
            lstjoblike:[],
            lstjobapply:[],
            isedit:false,
            loading:false,
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
            filename:"",
            role:"",
            totallike:0,
            totalapply:0
        }
    }
    componentDidMount()
    {
        if(this.props.match && this.props.match.params.applicantcode)
        {
            //nhúng js vào
            const script = document.createElement("script");
            script.src = "./js/owlcarousel/owl.carouselrun.js";
            script.async = true;
            document.body.appendChild(script);
            this.setState({
                loading:true
            },()=>{
                //load thọng tin ứng viên
                axios.get(APIstr + `api/Applicant/GetApplicantByApplicantCode/${this.props.match.params.applicantcode}`)
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
                .finally(() => {
                    this.setState({loading:false})
                });
                //load thông danh sách tỉnh thành trước tiên
                axios.get(APIstr +"api/Country/GetProvinces")
                .then(res=>{
                    this.setState({
                        lstprovince:res.data.length >0 ? res.data:[]
                    })
                })
                .catch(err=>{
                    console.log(err)
                })
            })
        }
       
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
        downloadLink.target = '_self';//target="_blank" rel="noopener noreferrer"
        downloadLink.download = filename;
        downloadLink.click(); 
    }

    render(){
        let  {lstprovince, lstdictrict,lstward,Avatar,filename,loading,isUIProfile} = this.state;
        let {infperson, birthDay,cvApplicant, email, exp, firstName, gender,graduated,introduceYourself,lastName,level, married,mobile,school,skill,skillOther,streetName, titleDoc, workProgress}= this.state;
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
                                <a className="nav-link menu" id="btnquanlyhoso" onClick={()=>this.GetInfoProfile()}>Quản lý hồ sơ</a>
                            </li>
                        </ul>
                    </div>
                </nav>
                    <div className="container-fluid published-recuitment-wrapper">
                        <div className="container published-recuitment-content">
                            <div className="row">
                            <div className="col-md-8 col-sm-12 col-12 recuitment-inner">
                            {
                                    loading==true ? <Loading /> :
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
                                                    <input type="file" id="imageUpload"  disabled={true}/>   {/*accept=".png, .jpg, .jpeg" */}
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
                                                        <input disabled={true} type="text" className="form-control SearchCustom" placeholder="Nhập họ" value={firstName} name="firstName" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Tên<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <input disabled={true} type="text" className="form-control SearchCustom" placeholder="Nhập tên lót + tên" value={lastName} name="lastName" />
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Số điện thoại</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={true} type="number" className="form-control SearchCustom" value={mobile} name="mobile" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Email</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={true} type="email" className="form-control SearchCustom" value={email} name="email" />
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Giới tính
                                                    <span style={{color: "red"}} className="pl-2">*</span>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select type="text" className="form-control SearchCustom" name="gender"  disabled={true}>
                                                            <option value="0" selected={gender == 0}>Chưa xác định</option>
                                                            <option value="1" selected={gender == 1}>Nam</option>
                                                            <option value="2" selected={gender == 2}>Nữ</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Ngày sinh</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={true} type="text" className="form-control SearchCustom" placeholder="dd/mm/yyyy" value={birthDay} name="birthDay" />
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Hôn nhân<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={true} type="text" className="form-control SearchCustom" name="married" >
                                                        <option value="0" selected={married == 0}>Độc thân</option>
                                                        <option value="1" selected={married == 1}>Đã kết hôn</option>
                                                    </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Tỉnh/ Thành phố<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={true} type="text" className="form-control SearchCustom" name="province" onChange={this.getProvince} >
                                                        <option  value="" selected={infperson.provinceCode == null}></option>
        
                                                        {this.ShowListProvince(lstprovince,infperson)}
                                                    </select>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Quận/huyện<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={true} type="text" className="form-control SearchCustom" name="district" onChange={this.getDistrict} >
                                                    <option  value="" selected={infperson.districtCode == null}></option>
        
                                                        {this.ShowListDistrict(lstdictrict,infperson)}
                                                    </select>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Xã/phường<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={true} type="text" className="form-control SearchCustom" name="ward" onChange={this.getWard}>
                                                    <option  value="" selected={infperson.wardCode == null}></option>
        
                                                    {this.ShowListWard(lstward,infperson)}
                                                    
                                                    </select>
                                                    </div>
                                                </div>
        
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Chỗ ở hiện tại<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <textarea disabled={true} type="text"  className="form-control SearchCustom" placeholder="Số nhà, tên đường" value={streetName} name="streetName" > 
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
                                                            <input disabled={true} type="text" className="form-control SearchCustom" placeholder="Nhập tiêu đề" value={titleDoc} name="titleDoc" />
                                                        </div>
                                                    </div>
                                            
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Giới thiệu bản thân
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                             <span dangerouslySetInnerHTML={{ __html: (introduceYourself) }}></span>
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Trình độ<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <select disabled={true} type="text" className="form-control SearchCustom" name="level" >
                                                                <option selected="selected" value="" data-select2-id="2">Chọn trình độ</option>
                                                                <option value="7" selected={level == 7}>Cao học</option>
                                                                <option value="6" selected={level == 6}>Đại học</option>
                                                                <option value="5" selected={level == 5}>Cao đẳng</option>
                                                                <option value="4" selected={level == 4}>Trung cấp</option>
                                                                <option value="3" selected={level == 3}>Trung học</option>
                                                                <option value="2" selected={level == 2}>Chứng chỉ</option>
                                                                <option value="1" selected={level == 1}>Lao động phổ thông</option>
                                                            </select>
                                                        </div>
                                                    </div>
        
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Nơi đào tạo<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <input disabled={true} type="text" className="form-control SearchCustom" placeholder="Nhập tên trường/nơi đào tạo" value={school} name="school" />
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Đã tốt nghiệp<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <input disabled={true} type="checkbox" className="SearchCustom CheckboxCustom" placeholder="Đã tốt nghiệp" checked={checked} name="graduated" />
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Số năm kinh nghiệm
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                        <select disabled={true} type="text"  className="form-control SearchCustom" name="exp" >
                                                            <option value="0"  selected={exp == 0}>Chưa có kinh nghiệm</option>
                                                            <option value="1"  selected={exp == 1}>Dưới 1 năm</option>
                                                            <option value="2"  selected={exp == 2}>1-2 năm</option>
                                                            <option value="3"  selected={exp == 3}>2-3 năm</option>
                                                            <option value="4"  selected={exp == 4}>Trên 3 năm</option>
                                                        </select>
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Quá trình làm việc trước đó
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                             <span dangerouslySetInnerHTML={{ __html: (workProgress) }}></span>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Kỹ năng chuyên môn<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                              <span dangerouslySetInnerHTML={{ __html: (skill) }}></span>
                                                        </div>
                                                    </div>
                                                    <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label">Kỹ năng khác<span style={{color: "red"}} className="pl-2">*</span></label>
                                                            <div className="col-sm-9">
                                                                    <span dangerouslySetInnerHTML={{ __html: (skillOther) }}></span>
                                                            </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                    </form>
                            }
                            
                            </div>
                            
                            </div>
                        </div>
                    </div>
             
            </div>
        );
    }
}
export default Profilecandidate;