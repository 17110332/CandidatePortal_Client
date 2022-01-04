import React, {Component} from 'react';
import {Link} from "react-router-dom";
import Listconst from '../Const/Listconst';
import DefaultAVT from '../Const/AVT';
import  '../Body/Search.css'
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import './Myprofile.css'
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import "./ResultCandidate.css"
import swal from 'sweetalert2';
import Notfound from '../Body/Notfound';
import "react-step-progress-bar/styles.css";
import { ProgressBar, Step } from "react-step-progress-bar";


const tokenlogin = localStorage.getItem("TokenLogin") ? base64_decode(localStorage.getItem("TokenLogin")) : "";
const applicantcode=tokenlogin !="" && tokenlogin.split("___+=()*").length > 0 ? tokenlogin.split("___+=()*")[0] :'';
const APIstr = Listconst.API;

const sessionlogin = localStorage.getItem("TokenLogin") ? localStorage.getItem("TokenLogin"):""
const role = base64_decode(sessionlogin).split("!@#$#@!").length >1 ?base64_decode(sessionlogin).split("!@#$#@!")[1] : 1; //1: ứng viên, 2: hr


class ResultCandidate extends Component{
    constructor(props)
    {
        super(props);
        this.state={
            dataCandidate:{}
        }
    }
    componentDidMount(){
        axios.get(APIstr +`api/Applicant/ResearchApply/${applicantcode}`)
        .then(res=>{
            this.setState({
                dataCandidate:res && res.data.length > 0 ? res.data[0] : {}
            },()=>{
                if(this.state.dataCandidate.status==3)
                {
                    swal.fire({
                        title: 'Bạn đã đậu phỏng vấn',
                        width: 600,
                        padding: '3em',
                        color: '#716add',
                        background: '#fff url(/images/trees.png)',
                        backdrop: `
                          rgba(0,0,123,0.4)
                          url("/img/cattthung.jfif")
                          left top
                          no-repeat
                        `
                      })
                }
            })
        })
        .catch(err=>{
            console.log("err",err)
        })
    }

   
    render()
    {  
        let {dataCandidate} = this.state
            console.log("hihihihi", dataCandidate)
            // 0: like job, 1: chờ duyệt,2: chờ phỏng vấn, 3: đậu pv, 4: xác nhận làm việc, 5: từ chối nhận việc, 6 rớt pv
            //status =5 => đổi sang màu xanh
            //status =6 => đổi sang màu xám
            let fillterbackground="linear-gradient(to right, #fefb72, #f0bb31)"
            let percent =0;
            let title="";
            if(dataCandidate.status==1)
            {
                percent=0;
                title="Duyệt";
            }
            else if(dataCandidate.status==2)
            {
                percent=33.33;
                title="Đạt phỏng vấn";
            }
            else if(dataCandidate.status==3) 
            {
                percent=66.66;
                title="Nhận việc";
            }
            else if(dataCandidate.status==4) 
            {
                percent=100;
                title="Đã nhận việc";
            }
            else if(dataCandidate.status==5) 
            {
                percent=95;
                fillterbackground="linear-gradient(to right, magenta, magenta)"
            }
            else if(dataCandidate.status==6) 
            {
                percent=50;
                fillterbackground="linear-gradient(to right, red, red)"
            }
            return (
                <div className="col-md-8 col-sm-12 col-12 recuitment-inner">
                <ProgressBar
                percent={percent}
                filledBackground={fillterbackground}
            >
                <Step transition="scale" children="bước 1">
                {({ accomplished }) => (
                    <div>
                        <img
                            style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                            width="30"
                            src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/9d/Pichu.png/revision/latest?cb=20170407222851"
                            />
                        <h6>Duyệt</h6>
                    </div>
                )}
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                     <div>
                        <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src="https://vignette.wikia.nocookie.net/pkmnshuffle/images/9/97/Pikachu_%28Smiling%29.png/revision/latest?cb=20170410234508"
                        />
                          <h6>Phỏng vấn</h6>
                     </div>
                   
                )}
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div>
                        <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                        />
                         <h6>Đạt</h6>
                    </div>
                    
                )}
                </Step>
                <Step transition="scale">
                {({ accomplished }) => (
                    <div>
                        <img
                        style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
                        width="30"
                        src="https://orig00.deviantart.net/493a/f/2017/095/5/4/raichu_icon_by_pokemonshuffle_icons-db4ryym.png"
                        />
                         <h6>Nhận việc</h6>
                    </div>
                    
                )}
                </Step>
            </ProgressBar>
            </div>
            )
    }   
}
export default ResultCandidate;