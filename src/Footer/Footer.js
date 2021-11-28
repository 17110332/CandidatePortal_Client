import React, {Component} from 'react';
class Footer extends Component{ 
    render()
    {
        return (
            <div className="container-fluid job-support-wrapper">
                    <div className="container-fluid job-support-wrap">
                    <div className="container job-support">
                        <div className="row">
                        <div className="col-md-6 col-sm-12 col-12">
                            <ul className="spp-list">
                            <li>
                                <span><i className="fa fa-question-circle pr-2 icsp"></i>Thông tin liên hệ:</span>
                            </li>
                            <li>
                                <span><i className="fa fa-phone pr-2 icsp"></i>0123.456.789</span>
                            </li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12">
                            <div className="newsletter">
                                <span className="txt6">Đăng ký nhận bản tin việc làm</span>
                                <div className="input-group frm1">
                                <input type="text" placeholder="Nhập email của bạn" className="newsletter-email form-control" />
                                <a href="#" className="input-group-addon"><i className="fa fa-lg fa-envelope-o colorb"></i></a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
}

export default Footer;