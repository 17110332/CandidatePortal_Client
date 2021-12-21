import React, {Component} from 'react';
import  './Review.css'
class Review extends Component{
    render()
    {
        return(
            <div className="container-fluid">
                <div className="container news-wrapper">
                    <div className="row">
                    <div className="col-md-12 news-wrapper-head">
                        Tư vấn nghề nghiệp từ HR Insider
                    </div>
                    <div className="col-md-4 col-sm-12 col-12 news-item">
                        <div className="news-item-inner">
                        <a href="#wrap">
                            <div className="img1 news-thumb"></div>
                        </a>
                            <div className="news-details">
                            <div className="tags">
                                <a target="_blank" href="https://luatvietnam.vn/lao-dong-tien-luong/khong-buoc-thoi-viec-562-25629-article.html">Quyền lợi nhân viên</a>
                            </div>
                            <div className="title">
                                <a target="_blank" href="https://luatvietnam.vn/lao-dong-tien-luong/khong-buoc-thoi-viec-562-25629-article.html"> 
                                5 thời điểm doanh nghiệp không được buộc người lao động thôi việc
                                </a>
                                </div>
                            <div className="meta">
                                Khi nào thì người sử dụng lao động được quyền đơn phương chấm dứt hợp đồng khi nào thì không? Cùng tham khảo bài viết sau đây để hiểu thêm về quyền lợi của người lao động Việt Nam nhé!
                            </div>
                            </div>
                        
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-12 news-item">
                        <div className="news-item-inner">
                        <a href="#wrap">
                            <div className="news-thumb img2" ></div>
                        </a>
                            <div className="news-details">
                            <div className="tags">
                                <a target="_blank" href="https://jobsin.asia/nhay-viec-va-nhung-con-so-ban-can-phai-luu-tam">Trước khi nhảy việc</a>
                            </div>
                            <div className="title">
                                <a target="_blank" href="https://jobsin.asia/nhay-viec-va-nhung-con-so-ban-can-phai-luu-tam"> 
                                Nhảy việc và những con số bạn cần phải lưu tâm
                                </a>
                                </div>
                            <div className="meta">
                                Dù bạn nhảy việc vì lý do gì cũng hãy cân nhắc đến những “con số” sau đây nhé!
                            </div>
                            </div>
                        
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-12 col-12 news-item">
                        <div className="news-item-inner">
                        <a href="#wrap">
                            <div className="news-thumb img3"></div>
                        </a>
                            <div className="news-details">
                            <div className="tags">
                                <a target="_blank" href="https://www.vietnamworks.com/hrinsider/danh-gia-buoc-dem-can-thiet-trong-viec-dao-tao-huan-luyen-nhan-vien.html">Huấn luyện nhân sự</a>
                            </div>
                            <div className="title">
                                <a target="_blank"  href="https://www.vietnamworks.com/hrinsider/danh-gia-buoc-dem-can-thiet-trong-viec-dao-tao-huan-luyen-nhan-vien.html"> 
                                Đánh giá: bước đệm cần thiết trong việc đào tạo huấn luyện nhân viên
                                </a>
                                </div>
                            <div className="meta">
                                Cú sốc về kinh tế do Covid-19 gây ra đã khiến cho nhiều doanh nghiệp lớn và nhỏ phải nhanh chóng tìm ra các phương án ứng phó tốc độ và hiệu quả để giải quyết bài toán về tìn...
                            </div>
                            </div>
                        
                        </div>
                    </div>
                    </div>
                </div>
                </div>
        );
    }
}
export default Review;