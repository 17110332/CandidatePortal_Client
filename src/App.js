import './App.css';
import Login from './Header/Login';
import Joblist from './Body/Joblist'
import Footer from './Footer/Footer';
import React, {Component} from 'react';
// import { ToastContainer,toast } from 'react-toastify';  
// import 'react-toastify/dist/ReactToastify.css';   
import routes from "./routes";
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
class App extends Component{ 

  ShowContent = (routes)=>{
    var result =null;
    if(routes.length >0)
    {
      result = routes.map((route, index) => {
        return(
        <Route key={index} path={route.path} exact={route.exact} component={route.main} />
        );
      });
    }
    return <Switch>{result}</Switch>
  }
  render()
  {
    return (
        <Router>
          <Login />
          {this.ShowContent(routes)}
          <div className="clearfix"></div>
          <Footer />
        </Router>
    );
  }
  
}

export default App;
