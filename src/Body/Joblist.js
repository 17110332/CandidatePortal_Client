import React , {Component }from 'react';
import axios from 'axios';
import Search from './Search';
import Listconst from './../Const/Listconst';
import Jobitem from './Jobitem';
import Loading from "./Loading"
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
        this.setState({loading:true},()=>{
            axios.post(APIstr +`api/Home/GetJobRecruits/${condition}`,Params)
            .then(res=>{
                console.log("xxx",res)
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
        console.log("adddd",lstJob)
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
                            />
                            </div>
                        </div>
                    :
                    <Loading />
                }
                
            </div>
        )
    }
    
}
export default Joblist