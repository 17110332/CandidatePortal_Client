import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import  './Myprofile.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Loading from "./../Body/Loading"
import CKEditor from "./../Libs/CKEditor";
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;

class Myprofile extends Component{
    constructor(props)
    {
        super(props);
        this.onChangeskillOther = this.onChangeskillOther.bind(this);
        // this.onBlurskillOther = this.onBlurskillOther.bind(this);
        // this.afterPasteskillOther = this.afterPasteskillOther.bind(this);
        
        this.onChangeintroduceYourself = this.onChangeintroduceYourself.bind(this);
        // this.onBlurintroduceYourself = this.onBlurintroduceYourself.bind(this);
        // this.afterPasteintroduceYourself = this.afterPasteintroduceYourself.bind(this);

        this.onChangeskill = this.onChangeskill.bind(this);
        // this.onBlurskill = this.onBlurskill.bind(this);
        // this.afterPasteskill = this.afterPasteskill.bind(this);

        this.onChangeworkProgress = this.onChangeworkProgress.bind(this);
        // this.onBlurworkProgress= this.onBlurworkProgress.bind(this);
        // this.afterPasteworkProgress = this.afterPasteworkProgress.bind(this);

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
        //nh??ng js v??o
        const script = document.createElement("script");
        script.src = "./js/owlcarousel/owl.carouselrun.js";
        script.async = true;
        document.body.appendChild(script);
        this.setState({
            loading:true,
            isedit:false
        },()=>{
            let sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
            let role = base64_decode(sessionlogin).split("!@#$#@!").length >1 ?base64_decode(sessionlogin).split("!@#$#@!")[1] : 1; //1: ???ng vi??n, 2: hr
            console.log("role= ", role);
            this.setState({
                role:role
            },()=>{
                console.log("adddd",role,this.state.isedit)
            })
            //load th???ng tin ???ng vi??n
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
                                // load x??/ph?????ng theo qu???n huy???n
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
            .finally(() => {
                this.setState({loading:false})
            });
            //load th??ng danh s??ch t???nh th??nh tr?????c ti??n
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
    
            axios.get(APIstr +`api/Home/Count/${applicantcode}`)
            .then(res=>{
              
               if(res && res.data.length >0)
               {
                    let like = res.data.filter(function(e) {
                        return e.islike;
                    })
                    let apply = res.data.filter(function(e) {
                        return !e.islike;
                    })
                    this.setState({
                        totalapply:apply && apply.length > 0 && apply[0].sl? apply[0].sl : 0,
                        totallike:like && like.length > 0 && like[0].sl ? like[0].sl:0
                    });
               }
            })
            .catch(err=> {
                console.log(err);
            });
        })
    }
    //ch???n t???nh th??nh
    getProvince=e=>{
        let {infperson}=this.state;
        this.setState({
            province: e.target.value,
            provinceCode:e.target.value
        },()=>{
            // load qu???n huy???n theo t???nh th??nhprovince
            axios.get(APIstr +`api/Country/GetDistrict/${e.target.value}`)
            .then(res=>{
                this.setState({
                    lstdictrict:res.data.length >0 ? res.data:[],
                    district:res.data.length > 0 && res.data.filter(item=> item.districtCode == infperson.districtCode).length > 0 ? infperson.districtCode :  ""
                },()=>{
                  
                    if(this.state.district && this.state.district !="")
                    {
                         // load x??/ph?????ng theo qu???n huy???n
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

    //ch???n qu???n huy???n
    getDistrict=e=>{
        this.setState({
            district: e.target.value
        },()=>{
            // load x??/ph?????ng theo qu???n huy???n
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
    //ch???n ph?????ng x??
    getWard=e=>{
        this.setState({
            ward: e.target.value
        })
    }
    //load t??nh th??nh
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
    //load qu???n huy???n
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

    //load x??/ph?????ng
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
        if(!birthDay)
        {
            toast.error('Nh???p ng??y sinh!');
            return;
        }
        else if(!province || province=="")
        {
            toast.error('Nh???p t???nh ??ang ???!');
            return;
        }
        else if(!district || district=="")
        {
            toast.error('Nh???p huy???n ??ang ???!');
            return;
        }
       
        else if(!email)
        {
            toast.error('Nh???p email li??n l???c!');
            return;
        }
       
        else if(!firstName)
        {
            toast.error('Nh???p h???!');
            return;
        }
        else if(!lastName)
        {
            toast.error('Nh???p t??n l??t + t??n!');
            return;
        }
        else if(!introduceYourself)
        {
            toast.error('Nh???p mcu5 gi???i thi???u b???n th??n!');
            return;
        }
        else if(!school)
        {
            toast.error('Nh???p t??n n??i ????o t???o!');
            return;
        }
        else if(!skill)
        {
            toast.error('Nh???p k??? n??ng chuy??n m??n!');
            return;
        }
        else if(!skillOther)
        {
            toast.error('Nh???p c??c k??? n??ng kh??c(qu???n l??, thuy???t tr??nh,...)!');
            return;
        }
        else if(!streetName)
        {
            toast.error('Nh???p ?????i ch???, s??? nh??!');
            return;
        }

        else if(!titleDoc)
        {
            toast.error('Nh???p ti??u ????? th??ng tin!');
            return;
        }

        else if(!ward || ward=="")
        {
            toast.error('Nh???p th??? tr???n/ph?????ng/x??!');
            return;
        }
        else if(!workProgress)
        {
            toast.error('Nh???p qu?? tr??nh l??m vi???c!');
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
            toast.success('???? l??u xong!');
            this.setState({
                isedit:false,
            })
        })
        .catch(err=>{
            console.log("eee",err)
            // toast.error('L??u l???i !')
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
            toast.error('Avatar kh??ng ????ng ?????nh d???ng!')
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
            //g???i api l??u base64str v??o db
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
            toast.error('File ????nh k??m ph???i l?? file word ho???c pdf');
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
            toast.error('File t???i kh??ng ???????c h??? tr???!');
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
    EditProfile = function()
    {
        console.log("adasdasdas")
        this.setState({
            isedit:true,
        })
    }
    CancelEdit = ()=>{
        this.setState({
            isedit:false,
        })
    }
    GetJobApply= ()=>{
         //nh??ng js v??o
         const script = document.createElement("script");
         script.src = "./js/owlcarousel/owl.carouselrun.js";
         script.async = true;
         document.body.appendChild(script);
        this.setState({
            loading:true,
            isUIProfile:false,
            isUIJobApply:true,
            isUIJobLike:false
        },()=>{
            axios.get(APIstr +`api/Applicant/GetJobApplyingForApplicant/${applicantcode}`)
            .then(res=>{
               this.setState({
                    idjobapplying : res && res.data.length > 0 ? res.data[0].recruitID : ''
               },()=>{
                    axios.get(APIstr +`api/Applicant/GetJobLikeOrApply/${applicantcode}/${false}`)
                    .then(res=>{
                        console.log("res apply",res)
                        this.setState({
                            lstjobapply:res && res.data.length > 0 ? res.data : []
                        })
                    })
                    .catch(err=>{
                        console.log("eeeerrr",err)
                    })
                    .finally(() => {
                        this.setState({loading:false})
                    });
               });
            })
            .catch(err=>{
                console.log("aaaaaaa",err)
            })
           
        });
    }
    GetJobLike= ()=>{
         //nh??ng js v??o
         const script = document.createElement("script");
         script.src = "./js/owlcarousel/owl.carouselrun.js";
         script.async = true;
         document.body.appendChild(script);
        this.setState({
            loading:true,
            isUIProfile:false,
            isUIJobApply:false,
            isUIJobLike:true
        },()=>{
            axios.get(APIstr +`api/Applicant/GetJobLikeOrApply/${applicantcode}/${true}`)
            .then(res=>{
                console.log("res like",res)
                this.setState({
                    lstjoblike:res && res.data.length > 0 ? res.data : []
                })
            })
            .catch(err=>{
                console.log("eeeerrr",err)
            })
            .finally(() => {
                this.setState({loading:false})
            });
        });
       
    }
    GetInfoProfile = ()=>{
        this.setState({
            loading:true,
            isedit:false,
            isUIProfile:true,
            isUIJobApply:false,
            isUIJobLike:false
        },()=>{
            let sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
            let role = base64_decode(sessionlogin).split("!@#$#@!").length >1 ?base64_decode(sessionlogin).split("!@#$#@!")[1] : 1; //1: ???ng vi??n, 2: hr
            console.log("role= ", role);
            this.setState({
                role:role
            },()=>{
                console.log("adddd",role,this.state.isedit)
            })
            //load th???ng tin ???ng vi??n
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
                                // load x??/ph?????ng theo qu???n huy???n
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
            .finally(() => {
                this.setState({loading:false})
            });
            //load th??ng danh s??ch t???nh th??nh tr?????c ti??n
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
    
            axios.get(APIstr +`api/Home/Count/${applicantcode}`)
            .then(res=>{
              
               if(res && res.data.length >0)
               {
                    let like = res.data.filter(function(e) {
                        return e.islike;
                    })
                    let apply = res.data.filter(function(e) {
                        return !e.islike;
                    })
                    this.setState({
                        totalapply:apply && apply.length > 0 && apply[0].sl? apply[0].sl : 0,
                        totallike:like && like.length > 0 && like[0].sl ? like[0].sl:0
                    });
               }
            })
            .catch(err=> {
                console.log(err);
            });
        })
    }
    ShowJobApplyORLike = (lstJob) => {
        let {isUIJobApply,idjobapplying}= this.state;
        var result = null;
        if (lstJob.length > 0) {
            result = lstJob.map((item, index) => {
                return (
                    <div className="owl-item css2" key={index} >
                        {
                            isUIJobApply && idjobapplying==item.recruitID ?
                            <div className="item job-latest-item applying">
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
                                    <p className='dangungtuyen'>??ang ???ng tuy???n</p>
                                </div>
                            </div>
                            :
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
                        }
                       
                    </div>
                );
            });
        }
        return result;
    }
    onChangeskillOther(evt){
        this.setState({
            skillOther:evt.editor.getData()
        })
        // console.log("onChange fired with event info: ",evt, "and data: ",evt.editor.getData());
      }
    onChangeskill(evt){
        this.setState({
            skill:evt.editor.getData()
        })
      
    }
    onChangeintroduceYourself(evt){
        this.setState({
            introduceYourself:evt.editor.getData()
        })
      
    }
    onChangeworkProgress(evt){
        this.setState({
            workProgress:evt.editor.getData()
        })
      
    }
    
    // //   onBlurskillOther(evt){
    // //     console.log("onBlur fired with event info: ",evt);
    // //   }
    
    // //   afterPasteskillOther(evt){
    // //     console.log("afterPaste fired with event info: ",evt);
    // //   }
    render(){
        let  {lstprovince, lstdictrict,lstward,Avatar,filename,role,totalapply,totallike,loading,isedit,isUIJobApply,isUIJobLike,isUIProfile,lstjoblike,lstjobapply} = this.state;
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
                                <a className="nav-link menu" id="btnquanlyhoso" onClick={()=>this.GetInfoProfile()}>Qu???n l?? h??? s??</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link menu" id="btnvieclamdanop" onClick={()=>this.GetJobApply()}>Vi???c l??m ???? n???p</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link menu" id="btnviecyeuthich" onClick={()=>this.GetJobLike()} >Vi???c l??m y??u th??ch</a>
                            </li>
                        </ul>
                        {
                            role ==1 && isUIProfile &&
                            <ul className="rec-nav-right">
                                <li className="nav-item">
                                    {
                                        !isedit ?  <a className="nav-link menu" onClick={()=>this.EditProfile()} >Ch???nh s???a h??? s??</a>
                                        :
                                        <a className="nav-link menu" onClick={()=>this.CancelEdit()} >Quay l???i</a>
                                    }
                                    
                                        
                                    </li>
                            </ul>
                        }
                        
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
                {
                    isUIProfile &&
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
                                                Th??ng tin t??i kho???n
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
                                                    <input type="file" id="imageUpload"  onChange={this.onImageChange} disabled={role==1 && isedit?false:true}/>   {/*accept=".png, .jpg, .jpeg" */}
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
                                                    <label className="col-sm-3 col-form-label text-right label">H???<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <input disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" placeholder="Nh???p h???" value={firstName} name="firstName" onChange={this.onChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">T??n<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <input disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" placeholder="Nh???p t??n l??t + t??n" value={lastName} name="lastName" onChange={this.onChange}/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">S??? ??i???n tho???i</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={role==1 && isedit?false:true} type="number" className="form-control SearchCustom" value={mobile} name="mobile" onChange={this.onChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Email</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={role==1 && isedit?false:true} type="email" className="form-control SearchCustom" value={email} name="email" onChange={this.onChange}/>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Gi???i t??nh
                                                    <span style={{color: "red"}} className="pl-2">*</span>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <select type="text" className="form-control SearchCustom" name="gender" onChange={this.onChange} disabled={role==1 && isedit?false:true}>
                                                            <option value="0" selected={gender == 0}>Ch??a x??c ?????nh</option>
                                                            <option value="1" selected={gender == 1}>Nam</option>
                                                            <option value="2" selected={gender == 2}>N???</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Ng??y sinh</label>
                                                    <div className="col-sm-9">
                                                        <input disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" placeholder="dd/mm/yyyy" value={birthDay} name="birthDay" onChange={this.onChange}/>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">H??n nh??n<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" name="married" onChange={this.onChange}>
                                                        <option value="0" selected={married == 0}>?????c th??n</option>
                                                        <option value="1" selected={married == 1}>???? k???t h??n</option>
                                                    </select>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">T???nh/ Th??nh ph???<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" name="province" onChange={this.getProvince} >
                                                        <option  value="" selected={infperson.provinceCode == null}></option>
        
                                                        {this.ShowListProvince(lstprovince,infperson)}
                                                    </select>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Qu???n/huy???n<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" name="district" onChange={this.getDistrict} >
                                                    <option  value="" selected={infperson.districtCode == null}></option>
        
                                                        {this.ShowListDistrict(lstdictrict,infperson)}
                                                    </select>
                                                    </div>
                                                </div>
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">X??/ph?????ng<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                    <select disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" name="ward" onChange={this.getWard}>
                                                    <option  value="" selected={infperson.wardCode == null}></option>
        
                                                    {this.ShowListWard(lstward,infperson)}
                                                    
                                                    </select>
                                                    </div>
                                                </div>
        
        
                                                <div className="form-group row">
                                                    <label className="col-sm-3 col-form-label text-right label">Ch??? ??? hi???n t???i<span style={{color: "red"}} className="pl-2">*</span></label>
                                                    <div className="col-sm-9">
                                                        <textarea disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" placeholder="S??? nh??, t??n ???????ng" value={streetName} name="streetName" onChange={this.onChange}> 
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
                                                File ????nh k??m
                                                <span id="clickc1_advance3" className="clicksd">
                                                <i className="fa fa fa-angle-up"></i>
                                                </span>
        
                                            </a>
                                            </h2>
                                        </div>
                                            <div id="collapseTwo" className="collapse show" aria-labelledby="headingTwo" data-parent="#accordionExample">
                                                <div className="card-body recuitment-body">
                                                <div className="form-group row">
                                                    {
                                                        role==1 && isedit &&  <label className="col-sm-3 col-form-label text-right label">Ch???n h??? s?? ????nh k??m<span style={{color: "red"}} className="pl-2">*</span></label>
        
                                                    }
                                                    <div className="col-sm-9">
                                                    {
                                                        role ==1 &&
                                                        <input type="file" id="file" className="recuitment-card-acttachment" onChange={this.onFileChange}/>                                               
                                                    }
                                                    {
                                                        role ==1 && 
                                                        <label htmlFor="file" className="btn-1"><i className="fa fa-paperclip pr-2"></i>Ch???n file</label>
        
                                                    }
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
                                        {/* sai ngay ????y */}
                                        <div className="card recuitment-card">
                                            <div className="card-header recuitment-card-header" id="headingThree">
                                                <h2 className="mb-0">
                                                <a className="btn btn-link btn-block text-left collapsed recuitment-header" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                                    Th??ng tin chung
                                                    <span id="clickc1_advance1" className="clicksd">
                                                    <i className="fa fa fa-angle-up"></i>
                                                    </span>
                                                </a>
                                                </h2>
                                            </div>
                                            <div id="collapseThree" className="collapse show" aria-labelledby="headingThree" data-parent="#accordionExample">
                                                <div className="card-body recuitment-body">
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Ti??u ????? h??? s??<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <input disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" placeholder="Nh???p ti??u ?????" value={titleDoc} name="titleDoc" onChange={this.onChange}/>
                                                        </div>
                                                    </div>
                                            
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Gi???i thi???u b???n th??n
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                            {
                                                                  ((role ==1 && !isedit) || role !=1) &&
                                                                  <span dangerouslySetInnerHTML={{ __html: (introduceYourself) }}></span>
                                                            }
                                                            {
                                                                role==1 && isedit &&
                                                                <CKEditor
                                                                    content={introduceYourself}
                                                                    events={{
                                                                        blur: this.onBlurintroduceYourself,
                                                                        afterPaste: this.afterPasteintroduceYourself,
                                                                        change: this.onChangeintroduceYourself
                                                                    }}
                                                                /> 
                                                            }
                                                            {/* <textarea disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" placeholder="Gi???i thi???u b???n th??n" value={introduceYourself} name="introduceYourself" onChange={this.onChange}>
                                                            </textarea> */}
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Tr??nh ?????<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <select disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" name="level" onChange={this.onChange}>
                                                                <option selected="selected" value="" data-select2-id="2">Ch???n tr??nh ?????</option>
                                                                <option value="7" selected={level == 7}>Cao h???c</option>
                                                                <option value="6" selected={level == 6}>?????i h???c</option>
                                                                <option value="5" selected={level == 5}>Cao ?????ng</option>
                                                                <option value="4" selected={level == 4}>Trung c???p</option>
                                                                <option value="3" selected={level == 3}>Trung h???c</option>
                                                                <option value="2" selected={level == 2}>Ch???ng ch???</option>
                                                                <option value="1" selected={level == 1}>Lao ?????ng ph??? th??ng</option>
                                                            </select>
                                                        </div>
                                                    </div>
        
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">N??i ????o t???o<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <input disabled={role==1 && isedit?false:true} type="text" className="form-control SearchCustom" placeholder="Nh???p t??n tr?????ng/n??i ????o t???o" value={school} name="school" onChange={this.onChange}/>
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">???? t???t nghi???p<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            <input disabled={role==1 && isedit?false:true} type="checkbox" className="SearchCustom CheckboxCustom" placeholder="???? t???t nghi???p" checked={checked} name="graduated" onChange={this.onChange}/>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">S??? n??m kinh nghi???m
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                        <select disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" name="exp" onChange={this.onChange}>
                                                            <option value="0"  selected={exp == 0}>Ch??a c?? kinh nghi???m</option>
                                                            <option value="1"  selected={exp == 1}>D?????i 1 n??m</option>
                                                            <option value="2"  selected={exp == 2}>1-2 n??m</option>
                                                            <option value="3"  selected={exp == 3}>2-3 n??m</option>
                                                            <option value="4"  selected={exp == 4}>Tr??n 3 n??m</option>
                                                        </select>
                                                        </div>
                                                    </div>
        
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">Qu?? tr??nh l??m vi???c tr?????c ????
                                                            <span style={{color: "red"}} className="pl-2">*</span>
                                                        </label>
                                                        <div className="col-sm-9">
                                                            {
                                                                ((role ==1 && !isedit) || role !=1) &&
                                                                <span dangerouslySetInnerHTML={{ __html: (workProgress) }}></span>
                                                            }
                                                             {
                                                                role==1 && isedit &&
                                                                <CKEditor
                                                                    content={workProgress}
                                                                    events={{
                                                                        blur: this.onBlurworkProgress,
                                                                        afterPaste: this.afterPasteworkProgress,
                                                                        change: this.onChangeworkProgress
                                                                    }}
                                                                /> 
                                                            }
                                                            {/* <textarea disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" placeholder="M?? t??? qu?? tr??nh l??m vi???c" value={workProgress} name="workProgress" onChange={this.onChange}>
                                                            </textarea> */}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="form-group row">
                                                        <label className="col-sm-3 col-form-label text-right label">K??? n??ng chuy??n m??n<span style={{color: "red"}} className="pl-2">*</span></label>
                                                        <div className="col-sm-9">
                                                            {
                                                                 ((role ==1 && !isedit) || role !=1) &&
                                                                 <span dangerouslySetInnerHTML={{ __html: (skill) }}></span>

                                                            }
                                                            {
                                                                role==1 && isedit &&
                                                                <CKEditor
                                                                    content={skill}
                                                                    events={{
                                                                        blur: this.onBlurskill,
                                                                        afterPaste: this.afterPasteskill,
                                                                        change: this.onChangeskill
                                                                    }}
                                                                /> 
                                                            }
                                                            {/* <textarea  disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" placeholder="K??? n??ng l??m vi???c" value={skill} name="skill" onChange={this.onChange}>
                                                            </textarea> */}
                                                        </div>
                                                    </div>
                                                    {
                                                        ((role ==1 && !isedit) || role !=1) &&
                                                        <div className="form-group row">
                                                            <label className="col-sm-3 col-form-label text-right label">K??? n??ng kh??c<span style={{color: "red"}} className="pl-2">*</span></label>
                                                            <div className="col-sm-9">
                                                                {/* <textarea disabled={role==1 && isedit?false:true} type="text"  className="form-control SearchCustom" placeholder="K??? n??ng l??m vi???c kh??c" value={skillOther} name="skillOther" onChange={this.onChange}>
                                                                </textarea> */}
                                                                <span dangerouslySetInnerHTML={{ __html: (skillOther) }}></span>
                                                            </div>
                                                         </div>

                                                    }
                                                   
                                                        {
                                                            role==1 && isedit &&
                                                            <div className="form-group row">
                                                                <label className="col-sm-3 col-form-label text-right label">K??? n??ng kh??c<span style={{color: "red"}} className="pl-2">*</span></label>
                                                                <div className="col-sm-9">
                                                                    <CKEditor
                                                                            content={skillOther}
                                                                            events={{
                                                                                blur: this.onBlurskillOther,
                                                                                afterPaste: this.afterPasteskillOther,
                                                                                change: this.onChangeskillOther
                                                                            }}
                                                                     />
                                                                </div>
                                                             </div>
                                                        }
                                                      

                                                    </div>

                                                  
                                                </div>
                                            </div>
                                        </div>
                                        {/* sai ngay ????y */}
                                
                                        {role ==1 && 
                                        <div className="rec-submit">
                                            <button  type="button" className="btn-submit-recuitment mb-3 ml-3" name="" onClick={()=>this.onSave()}>
                                                <i className="fa fa-floppy-o pr-2"></i>L??u H??? S??
                                            </button>
                                        </div>
                                        }
                                        
                                    </form>
                            }
                            
                            </div>
                        
                                {role ==1 &&
                                    <div className="col-md-4 col-sm-12 col-12">
                                    <div className="recuiter-info">
                                        <div className="recuiter-info-avt">
                                            <img src={`data:image/png;base64,${avatar}`} />
                                        </div>
                                        <div className="clearfix list-rec">
                                            <h4>{fullname}</h4>
                                            <ul>
                                            <li><a href="#">Vi???c l??m y??u th??ch<strong>({totallike})</strong></a></li>
                                            <li><a href="#">Vi???c l??m ???? n???p <strong>({totalapply})</strong></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="block-sidebar" style={{marginBottom: "20px;"}}>
                                        <header>
                                            <h3 className="title-sidebar font-roboto bg-primary">
                                                Trung t??m qu???n l??
                                            </h3>
                                        </header>
                                        <div className="job-sidebar">
                                            <div className="sb-banner">
                                                <img src="img/img1.png" className="advertisement" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }
                            
                            </div>
                        </div>
                    </div>
                }
                {
                    isUIJobApply && loading==false &&
                    <div className="container-fluid">
                        <div className="container job-board2">
                            <div className="row">
                                <div className="col-md-12 job-board2-wrap-header">
                                    <h3>Vi???c l??m ???? n???p c???a {fullname}</h3>
                                </div>
                                <div className="col-md-12 job-board2-wrap">
                                    <div className="owl-carousel owl-theme job-board2-contain owl-loaded owl-drag">
                                        <div className="owl-stage-outer">
                                            <div className="owl-stage css1">
                                                {this.ShowJobApplyORLike(lstjobapply)}
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    isUIJobLike && loading==false &&
                    <div className="container-fluid">
                        <div className="container job-board2">
                            <div className="row">
                                <div className="col-md-12 job-board2-wrap-header">
                                    <h3>Vi???c l??m ???? th??ch c???a {fullname}</h3>
                                </div>
                                <div className="col-md-12 job-board2-wrap">
                                    <div className="owl-carousel owl-theme job-board2-contain owl-loaded owl-drag">
                                        <div className="owl-stage-outer">
                                            <div className="owl-stage css1">
                                                {this.ShowJobApplyORLike(lstjoblike)}
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {
                    (isUIJobLike || isUIJobLike) && loading==true &&
                    <Loading />
                }
            </div>
        );
    }
}
export default Myprofile;