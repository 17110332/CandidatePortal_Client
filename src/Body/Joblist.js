import React , {Component }from 'react';
import axios from 'axios';
import Search from './Search';
import Listconst from './../Const/Listconst';
import Jobitem from './Jobitem';
import Loading from "./Loading"
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import Jobnewest from './Jobnewest';
import Review from './Review';
import Benefit from './Benefit';
const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode= tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
class Joblist extends Component{ 
    constructor(props)
    {
        super(props);
        this.state={
            lstJob:[],
            activePage:1,
            PageIndex:1,
            PageSize:0,
            TotalPage:0,
            loading:false
            
        }
    }
    
    componentDidMount()
    {
        const APIstr = Listconst.API;
        let condition="NULL";
        let {activePage,PageIndex,PageSize,TotalPage,loading} = this.state;
        let Params = new FormData();
        Params.set('pageindex',PageIndex);
        Params.set('activePage',activePage);
        Params.set('PageSize',PageSize);
        Params.set('TotalPage',TotalPage);
        Params.set('ApplicantCode',applicantcode);
        this.setState({loading:true},()=>{
            axios.post(APIstr +`api/Home/GetJobRecruits/${condition}`,Params)
            .then(res=>{
                this.setState({
                    lstJob:res && res.data && res.data.lstJob.length >0 ? res.data.lstJob :[],
                    PageSize:res && res.data ? res.data.pageSize:0,
                    PageIndex:this.state.pageIndex,
                    TotalPage:res && res.data ? res.data.totalPage:0,
                });
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(() => {
                this.setState({loading:false})
            });
        })
        
    }
    OnSearch = (_lstJob,PageSize,TotalPage) => {
        this.setState({
            lstJob:_lstJob,
            PageSize:PageSize,
            PageIndex:1,
            TotalPage:TotalPage
        })
    }
    onloadingSearch  =loading=>{
        this.setState({
            loading:loading
        })
    }
    onLoadDataPaging =(pageIndex)=>{
        let Params = new FormData();
        Params.set('pageindex',pageIndex);
        Params.set('ApplicantCode',applicantcode);
        const APIstr = Listconst.API;
        let condition="NULL";
        this.setState({loading:true},()=>{
            axios.post(APIstr +`api/Home/GetJobRecruits/${condition}`,Params)
            .then(res=>{
                this.setState({
                    lstJob:res && res.data && res.data.lstJob.length >0 ? res.data.lstJob :[],
                    PageSize:res && res.data ? res.data.pageSize:0,
                    PageIndex:pageIndex,
                    TotalPage:res && res.data ? res.data.totalPage:0,
                });
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(() => {
                this.setState({loading:false})
            });
      })
    }
    render()
    {
        let {lstJob,PageSize,PageIndex,TotalPage,loading} = this.state;
        return(
            <div>
                <Search _OnSearch={this.OnSearch} _onloadingSearch={this.onloadingSearch}/>
                {/* <Loading /> */}
                {
                     loading==false ? 
                        <div className="container-fluid jb-wrapper">
                            <div className="container">
                            <Jobitem lstJob={lstJob} 
                            _onLoadDataPaging ={this.onLoadDataPaging}
                            PageSize={PageSize}
                            TotalPage={TotalPage}
                            PageIndex={PageIndex}
                            ApplicantCode={applicantcode}
                            />
                            </div>
                        </div>
                    :
                    <Loading />
                }
                <div className="clearfix"></div>
                <Jobnewest />
                <div className="clearfix"></div>
                <Review/>
                <div className="clearfix"></div>
                <Benefit/>
            </div>
        )
    }
    
}
export default Joblist