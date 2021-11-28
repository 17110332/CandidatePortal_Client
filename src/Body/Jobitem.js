import React , {Component }from 'react';
import {Link} from "react-router-dom";
import Pagination from "react-js-pagination";

class Jobitem extends Component{ 

    constructor(props)
    {
        super(props)
        this.state={
            activePage:1,
            PageIndex:0,
            PageSize:0,
            TotalPage:5
        }
    }
    handlePageChange=(pageNumber)=>
    {
        this.props._onLoadDataPaging(pageNumber)
    }
    ShowJobs = (lstJob)=>{
        var result = null;
        if(lstJob.length > 0)
        {
            console.log("lstJob",lstJob)
             result=lstJob.map((item, index)=>{
                    return (
                             <div className="job pagi" key={index}>
                                <div className="job-content">
                                    <div className="job-logo">
                                         <Link to={`/Jobdetail/${item.recruitID}`}> 
                                            <img src={"data:image/jpeg;base64," + item.photo}
                                                 className="job-logo-ima" alt="job-logo"/>
                                        </Link>
                                    </div>

                                    <div className="job-desc" style={{float:"none"}}>
                                        <div className="job-title">
                                         <Link to={`/Jobdetail/${item.recruitID}`}>{item.jobWName}</Link>
                                            {/* <a href="facebook.com">{item.jobWName}</a> */}
                                        </div>
                                        <div className="job-company">
                                            <a href="facebook.com">{item.departmentName}</a> | <a href="facebook.com" className="job-address"><i className="fa fa-map-marker" aria-hidden="true"></i>
                                                {item.provinceName}</a>
                                        </div>

                                        <div className="job-inf">
                                            <div className="job-main-skill">
                                                <i className="fa fa-code" aria-hidden="true"></i>  <a href="#"> .NET</a>
                                            </div>
                                            <div className="job-salary">
                                                <i className="fa fa-money" aria-hidden="true"></i>
                                                <span className="salary-min">{item.fromSalary}<em className="salary-unit"> VND</em></span>
                                                <span className="salary-max">{item.toSalary}<em className="salary-unit"> VND</em></span>
                                            </div>
                                            <div className="job-deadline">
                                                <span><i className="fa fa-clock-o" aria-hidden="true"></i>  Hạn nộp: <strong>{item.toDate}</strong></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wrap-btn-appl" style={{marginTop:"-80px"}}>
                                        <a href="#" className="btn btn-appl">Ứng tuyển</a>
                                    </div>
                                </div>
                            </div>
                    )
           
          });
        }
        return result;
      }
    render()
    {
        let {lstJob} =  this.props
      
        return(
            <div className="row">
                <div className="col-md-8 col-sm-12 col-12">
                    <div className="job-board-wrap">
                        <h2 className="widget-title">
                        <span>Việc làm công ty</span>
                        </h2>

                        <div className="job-group">
                            {this.ShowJobs(lstJob)}
                            {lstJob.length > 0 && 
                                <Pagination
                                        
                                activePage={parseInt(this.props.PageIndex)}
                                itemsCountPerPage={10} // số ptu trang hien tai
                                totalItemsCount={parseInt(this.props.PageSize)} // tổng số ptu
                                pageRangeDisplayed={parseInt(this.props.TotalPage)} // hiển thị các nút phân trang
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                />
                            }
                          
                            {/* <div className="readmorestyle-wrap">
                               <a href="#" className="readallstyle reads1">Xem tất cả</a>
                              

                            </div> */}
                         </div>
                    </div>
                </div>
                <div className="col-md-4 col-sm-12 col-12 clear-left">
                    <div className="job-sidebar">
                            <div className="sb-banner">
                            <img src="img/img1.png" className="advertisement" alt="" />
                            </div>
                    </div>
                </div>
                    {/* <div className="col-md-4 col-sm-12 col-12 clear-left">
                     <div className="job-sidebar">
                        <h2 className="widget-title">
                        <span>Ngành Nghề</span>
                        </h2>
                        <div className="catelog-list" style={{height: '150px;', overflow: 'hidden;'}}>
                        <ul>
                            <li>
                            <a href="#">
                                <span className="cate-img">
                                <em>Lập trình viên</em>
                                </span>
                                <span className="cate-count">(1100)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Nhân viên kiểm thử</em>
                                </span>
                                <span className="cate-count">(230)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Kỹ sư cầu nối</em>
                                </span>
                                <span className="cate-count">(110)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Designer</em>
                                </span>
                                <span className="cate-count">(2300)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>Product Manager</em>
                                </span>
                                <span className="cate-count">(99)</span>
                            </a>
                            </li>
                            <li>
                                <a href="#">
                                <span className="cate-img">
                                <em>HR</em>
                                </span>
                                <span className="cate-count">(300)</span>
                            </a>
                            </li>
                
                        </ul>
                        </div>
                    </div>
                
                    <div className="job-sidebar">
                        <div className="sb-banner">
                        <img src="img/ads1.jpg" className="advertisement" alt="" />
                        </div>
                    </div>
                </div> */}
            </div>
            
        )
    }
}
export default Jobitem;