import React, {Component} from 'react';
import {Link, Route} from 'react-router-dom';
import Slick from './Slick';
import $ from 'jquery';

class NavBar extends Component{

  constructor(props) {
    super(props);
    this.state = {
      productlines: []
    } 
  }

  componentDidMount() {
      $.getJSON(window.hostAddress + '/productlines/get',(productlinesData)=>{
        console.log(productlinesData);
        this.setState({
          productlines: productlinesData
        })
      })
    }

  render(){

    const shopMenu = [];
    this.state.productlines.map((productline, index)=>{
      shopMenu.push(
        <Link key={index} to={`/shop/${productline.link}`}>{productline.productLine}</Link>
      )
    })

    return(
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid navbar-white">
            <ul className="nav navbar-nav">
              <li><Link to="/">Home</Link></li>
                <li className="dropdown"s>
                  <Link to="/shop"><i className="arrow down" /> Shop</Link>
                  <li className="dropdown-links">
                    {shopMenu}
                  </li>
                </li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">ClassicModels</Link>
            </div>
             <ul className="nav navbar-nav float-right">
                <li className="text-right"><Link to="/login">Login</Link></li>
                <li className="text-right"><Link to="/register">Register</Link></li>
                <li className="text-right"><Link to="/cart">(0) items in your cart | ($0.00)</Link></li>
             </ul>
          </div>
        </nav>
        <Route exact path="/" component={Slick} />
      </div>
    )
  }
}

export default NavBar