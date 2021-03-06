import React, { Component } from 'react';
import ProductTableRow from '../components/ProductTableRow'
import $ from 'jquery';

class ProductLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productList: [],
      whichWay: true
    }

    this.sortTable = this.sortTable.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.getProducts(nextProps);
  }

  componentDidMount() {
    this.getProducts(this.props)
  }

  getProducts(props){
    const productline = props.match.params.productLine
    const url = window.hostAddress + `/productlines/${productline}/get`
    $.getJSON(url, (data) => {
      this.setState({
        productList: data
      })
    })
  }


  sortTable(columnName){
    var productList = this.state.productList.slice();
    
    productList.sort((a, b) => {
      var textA = a[columnName];
      var textB = b[columnName];
      if(this.state.whichWay){
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      } else {
        return (textA < textB) ? 1 : (textA > textB) ? -1 : 0;
      }
    })

    this.setState({
      productList: productList,
      whichWay: !this.state.whichWay
    })
  }

  render() {

    var productTableArray = [];
    this.state.productList.map((product, index)=>{
      productTableArray.push(<ProductTableRow key={index} product={product} />)
    })

    if(this.state.productList.length == 0){
      var textHeader = ''
    } else {
      var textHeader = this.state.productList[0].productLine;
    }

    return(
      <div>
        <h1>{this.props.match.params.productLine}</h1>
        <table className='table table-striped'>
          <thead>
            <tr>
              <th className='table-head' onClick={()=>{this.sortTable('productName')}}>Product Name</th>
              <th className='table-head' onClick={()=>{this.sortTable('productScale')}}>Model Scale</th>
              <th className='table-head' onClick={()=>{this.sortTable('productVendor')}}>Made By</th>
              <th className='table-head' onClick={()=>{this.sortTable('productDescription')}}>Description</th>
              <th className='table-head' onClick={()=>{this.sortTable('quantityInStock')}}>In Stock</th>
              <th className='table-head' onClick={()=>{this.sortTable('buyPrice')}}>Price</th>
              <th className='table-head' onClick={()=>{this.sortTable('MSRP')}}>MSRP</th>
            </tr>
          </thead>
          <tbody>
            {productTableArray}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ProductLine;