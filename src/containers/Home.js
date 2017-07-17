import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';

class Home extends Component {
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

  render() {
    const productlineImages = []
    this.state.productlines.map((row, index)=>{
      productlineImages.push(
        <div key={index} className='col-sm-4 col-md-3 productline-images'>
          <Link to={`/shop/${row.link}`}><img src={row.image} /></Link>
          <div className='text'>{row.productLine}</div>
        </div>
      )
    })

    return(
      <div>
        {productlineImages}
      </div>
    )
  }
}

export default Home;