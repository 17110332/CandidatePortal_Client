import React, {Component} from 'react';
import Listconst from './../Const/Listconst';
import axios from 'axios';
import  './Search.css'
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
                    <option key={index} value={item.provinceCode}>{item.provinceName}</option>
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
                    <option key={index} value={item.typeJobWCode}>{item.typeJobWName}</option>
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
                    <option key={index} value={item.jobWCode}>{item.jobWName}</option>
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
                        {/* <h3>1000+ việc đang tuyển</h3>
                        <div className="banner-tags">
                            <ul>
                                <li><a href="index.html">Java</a></li>
                                <li><a href="index.html">Python</a></li>
                                <li><a href="index.html">Tester</a></li>
                                <li><a href="index.html">QA QC</a></li>
                                <li><a href="index.html">.NET</a></li>
                                <li><a href="index.html">Javascript</a></li>
                                <li><a href="index.html">Business Analyst</a></li>
                                <li><a href="index.html">Designer</a></li>
                            </ul>
                        </div> */}
                    </div>
                </div>
    
    
                <div className="container-fluid search-fluid">
                    <div className="container">
                        <div className="search-wrapper"  style={{marginTop:'-11rem;'}}>
    
                        {/* <ul className="nav nav-tabs search-nav-tabs" id="myTab" role="tablist">
                        <li className="nav-item search-nav-item">
                            <a className="nav-link snav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Tìm việc làm</a>
                        </li>
                        <li className="nav-item search-nav-item">
                            <a className="nav-link snav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Tìm công ty</a>
                        </li>
                        </ul> */}
                        <div className="tab-content search-tab-content" id="myTabContent">
               
                        <div className="tab-pane stab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <form className="bn-search-form">
                            <div className="row">
                                <div className="col-md-10 col-sm-12">
                                <div className="row">

                                <div className="col-md-4">
                                        <select name="TypeJobWSelected"  className="SearchCustom" 
                                        required onChange={this.GetSelectLocation}>
                                            <option value="all">Tất cả địa điểm</option>
                                            {this.ShowListLocation(ListLocation)}
                                        </select>
                                    </div>
                                    
                                    <div className="col-md-4">
                                        <select name="TypeJobWSelected"  className="SearchCustom" 
                                        required onChange={this.GetSelectTypeJobW}>
                                            <option value="all">Tất cả chuyên ngành</option>
                                            {this.ShowListTypeJobW(ListTypeJobW)}
                                        </select>
                                    </div>
                                    <div className="col-md-4">
                                        <select className="SearchCustom" required onChange={this.GetSelectJobW}>
                                            <option value="all">Tất cả chuyên môn</option>
                                           {this.ShowListJobW(ListJobW)}
                                        </select>
                                    </div>
                                </div>
                                </div>
                                <div className="col-md-2 col-sm-12">
                                   <button  type="button" className="btn btn-primary btn-search col-sm-12"
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
            </div>
        )
    }
    
}
export default Search;