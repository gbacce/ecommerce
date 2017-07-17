import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {connect} from 'react-redux'

class NavBar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      productlines: []
    }
  }

  componentDidMount() {
    $.getJSON(window.hostAddress+'/productlines/get',(productlinesData)=>{
      this.setState({
        productlines: productlinesData
      })
    })
  }

  render(){
    const shopMenu = [];
    this.state.productlines.map((productline,index)=>{
      shopMenu.push(
        <Link key={index} to={`/shop/${productline.link}`}>{productline.productLine}</Link>
      )
    })
  
    if(this.props.registerInfo.name == undefined){
      var rightBar = [
        <li key="1" className="text-right"><Link to="/login">Login</Link></li>,
        <li key="2" className="text-right"><Link to="/register">Register</Link></li>,
        <li key="3" className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>    
      ]
    }

    else{
      var rightBar = [
        <li key="1" className="text-right">Welcome, {this.props.registerInfo.name}</li>,
        <li key="2" className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>, 
        <li key="3" className="text-right"><Link to="/logout">Logout</Link></li>  
      ]   
    }

    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid navbar-white" >
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
              <li className="dropdown">
                <Link to="/shop"><i className="arrow down" /> Shop</Link>
                <ul>
                  <li className="dropdown-links">
                    {shopMenu}
                  </li>
                </ul>
              </li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">ClassicModels</Link>
            </div>
            <ul className="nav navbar-nav float-right">
              {rightBar}
            </ul>
          </div>
        </nav>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    registerInfo: state.registerReducer
  }
}

export default connect(mapStateToProps)(NavBar);