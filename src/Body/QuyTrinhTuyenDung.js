import React, {Component} from 'react';
import './QuyTrinhTuyenDung.css';
class QuyTrinhTuyenDung extends Component{ 
    render()
    {
        return(
            <div className="container-fluid">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="home-ads">
                                <a href="#">
                                    <img src="img/hna.jpg" />
                                </a>
                            </div>
                            <p className='content'>
                                <img alt="" height="500" src="img/QuyTrinhTuyenDung.png" width="800" />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}
export default QuyTrinhTuyenDung;