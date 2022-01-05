import React, {Component} from 'react';
import Listconst from './../Const/Listconst';
import axios from 'axios';
import  './Search.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" &&  tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;

class Search extends Component{ 
    constructor(props)
    {
        super(props);
        this.state={
            TypeJobWSelected:"",
            JobWSelected:"",
            LocationSelected:"",
            TextSearch:"",
            ListTypeJobW:[],
            ListJobW:[],
            ListLocation:[]
        }
    }
    componentDidMount()
    {
        //chuyên môn
        axios.get(APIstr +"api/Home/GetTypeJobW")
        .then(res=>{
            this.setState({
                ListTypeJobW:res && res.data.length >0 ? res.data :[]
            });
        })
        .catch(err=>{
            console.log(err)
        })
        //chuyên ngành
        axios.get(APIstr +"api/Home/GetJobW")
        .then(res=>{
            this.setState({
                ListJobW:res && res.data.length >0 ? res.data :[]
            });
        })
        .catch(err=>{
            console.log(err)
        })
        //địa điểm làm việc
        axios.get(APIstr +"api/Home/GetProvince")
        .then(res=>{
            this.setState({
                ListLocation:res && res.data.length >0 ? res.data :[]
            });
        })
        .catch(err=>{
            console.log(err)
        })
    }

    ShowListLocation = ListLocation=>{
        var result = null;
        if(ListLocation.length > 0)
        {
          result=ListLocation.map((item, index)=>{
            return (          
                    <option className='textformat' key={index} value={item.provinceCode}>{item.provinceName}</option>
            )
          });
        }
        return result;
    }

    ShowListTypeJobW = (ListTypeJobW)=>{
        var result = null;
        if(ListTypeJobW.length > 0)
        {
          result=ListTypeJobW.map((item, index)=>{
            return (          
                    <option className='textformat' key={index} value={item.typeJobWCode}>{item.typeJobWName}</option>
            )
          });
        }
        return result;
    }
    ShowListJobW = (ListJobW)=>{
        var result = null;
        if(ListJobW.length > 0)
        {
          result=ListJobW.map((item, index)=>{
            return (          
                    <option className='textformat' key={index} value={item.jobWCode}>{item.jobWName}</option>
            )
          });
        }
        return result;
    }
    GetSelectTypeJobW=e=>{
        this.setState({
            TypeJobWSelected: e.target.value
        });
    }
    GetSelectJobW=e=>{
        this.setState({
            JobWSelected: e.target.value
        });
    }
    GetSelectLocation=e=>{
        this.setState({
            LocationSelected: e.target.value
        });
    }
    GetSearchText=e=>{
        this.setState({
            TextSearch:e.target.value
        })
    }

    OnSearch = () =>{
        this.props._onloadingSearch(true)
      //  e.preventDefault();
     
        let {LocationSelected,TypeJobWSelected,JobWSelected}= this.state;
        let condition = "";
        if(LocationSelected !=="" && LocationSelected !== "all" )
        {
            if(condition !=="")
            {
                condition +=" AND D.LocationCode ='"+LocationSelected+"'";
            }
            else
            {
                condition +="D.LocationCode ='"+LocationSelected+"'";
            }
            
        }
        if(TypeJobWSelected !=="" && TypeJobWSelected !== "all" )
        {
            if(condition !=="")
            {
                condition +=" AND A.TypeJobWCode ='"+TypeJobWSelected+"'";
            }
            else
            {
                condition +="A.TypeJobWCode ='"+TypeJobWSelected+"'";
            }
            
        }
        if(JobWSelected !=="" && JobWSelected !=="all")
        {
            if(condition !== "")
            {
                condition +=" AND A.JobWCode = '"+JobWSelected+"'";
            }
            else
            {
                condition +="  A.JobWCode = '"+JobWSelected+"'";
            }
        }
        if(condition==="")
        {
            condition="NULL";
        }
        let Params = new FormData();
        Params.set('pageindex',1);
        Params.set('ApplicantCode',applicantcode);
         axios.post(APIstr +`api/Home/GetJobRecruits/${condition}`,Params)
        .then(res=>{
            let lstjob = res && res.data && res.data.lstJob.length >0 ? res.data.lstJob :[]
            let PageSize =res && res.data ? res.data.pageSize:0
            let TotalPage =res && res.data ? res.data.totalPage:0
            this.props._OnSearch(lstjob,PageSize,TotalPage);
             
        })
        .catch(err=>{
            console.log(err)
        })
        .finally(() => {
            this.props._onloadingSearch(false)
        });
    }
    render()
    {
        let {ListTypeJobW,ListJobW,ListLocation} = this.state;
        return(
            <div>
                <div className="clearfix"></div>
                <div className="container-fluid clear-left clear-right">
                    <div className="main-banner">
                        <div className="banner-image">
                        <img src="img/banner2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="banner-content">
                    </div>
                </div>
                <div className="container-fluid search-fluid">
                    <div className="container">
                        <div className="search-wrapper"  style={{marginTop:'-11rem;'}}>
                        <div className="tab-content search-tab-content" id="myTabContent">
               
                        <div className="tab-pane stab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <form className="bn-search-form">
                            <div className="row">
                                <div className="col-md-10 col-sm-12">
                                <div className="row">

                                <div className="col-md-4">
                                        <select name="TypeJobWSelected"  className="SearchCustom textformat" 
                                        required onChange={this.GetSelectLocation}>
                                            <option value="all" className='textformat'>Tất cả địa điểm</option>
                                            {this.ShowListLocation(ListLocation)}
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <select name="TypeJobWSelected"  className="SearchCustom textformat" 
                                        required onChange={this.GetSelectTypeJobW}>
                                            <option value="all" className='textformat'>Tất cả chuyên ngành</option>
                                            {this.ShowListTypeJobW(ListTypeJobW)}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select className="SearchCustom textformat" required onChange={this.GetSelectJobW}>
                                            <option value="all" className='textformat'>Tất cả chuyên môn</option>
                                           {this.ShowListJobW(ListJobW)}
                                        </select>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-2 col-sm-12">
                                   <button  type="button" className="btn btn-primary btn-search col-sm-12 textformat"
                                        onClick={this.OnSearch}>Tìm kiếm</button>
                                </div>
                            </div>
                            </form>  
                        </div>
                        <div className="tab-pane stab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            <form className="bn-search-form">
                            <div className="row">
                                <div className="col-md-10 col-sm-12">
                                    <div className="input-group s-input-group w-100">
                                        <input type="text" className="form-control sinput" placeholder="Nhập kỹ năng, công việc,..." />
                                        <span><i className="fa fa-search"></i></span>
                                    </div>
                                </div>
                                <div className="col-md-2 col-sm-12">
                                <button type="submit" className="btn btn-primary btn-search col-sm-12">Tìm kiếm</button>
                                </div>
                            </div>
                            </form> 
                        </div>
                        </div>
    
                        </div>
                    </div>
                    </div>
                    <div class="container-fluid">
                        <div class="container">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="home-ads">
                                        <a href="#">
                                            <img src="img/hna2.jpg"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        )
    }
    
}
export default Search;