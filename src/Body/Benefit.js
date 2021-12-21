import React, {Component} from 'react';
import './Review.css'
class Benefit extends Component{
    render()
    {
        return(
            <div className="container-fluid">
                <div className="container news-wrapper">
                    <div className="row">
                        <div className="col-md-12 news-wrapper-head">
                            Quyền lợi tại công ty
                        </div>
                        <div className="col-md-6 col-sm-12 col-12 news-item">
                            <div className="news-item-inner">
                            <img className='imgbenefit' src="https://tuyendung.fptshop.com.vn/upload/slider/1.jpg" alt="" /> 
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-12 col-12 news-item">
                            <div className="news-item-inner">
                             <span className='daingo'>(*)Đãi Ngộ</span> <br />
                            – Làm việc tại công ty hàng đầu Việt Nam, luôn không ngừng phát triển với nhiều cơ hội thăng tiến bản thân.<br />
                            – Được đào tạo chuyên nghiệp, hoàn toàn miễn phí trước khi làm việc.<br />
                            – Môi trường làm việc trẻ, năng động và thân thiện.<br />
                            – Tham gia đầy đủ các chế độ BHYT, BHXH, BHTN.<br />
                            – Thu nhập hấp dẫn, phù hợp năng lực bản thân.<br />
                            – Lương tháng 13 và thưởng theo hiệu quả kinh doanh.<br />
                            – Khám sức khỏe định kỳ.<br />
                            – Thường xuyên tổ chức các chương trình hội thao, hội diễn văn nghệ, tân niên, tất niên…<br />
                            </div>
                        </div>
                       
                    </div>
                </div>
            </div>
        );
    }
}
export default Benefit;