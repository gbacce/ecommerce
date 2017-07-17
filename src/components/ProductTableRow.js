import React from 'react';



function ProductTableRow(props) {
  const product = props.product

  if(product.quantityInStock > 100) {
    var inStock = 'In Stock!'
    var inStockClass = '';
  } else if (product.quantityInStock > 0) {
    var inStock = 'Order Soon!'
    var inStockClass = 'text-caution'
  } else {
    var inStock = 'Out of stock!'
    var inStockClass = 'text-danger'
  }


  return(
    <tr key={props.index}>
      <td>{product.productName}</td>
      <td>{product.productScale}</td>
      <td>{product.productVendor}</td>
      <td>{product.productDescription}</td>
      <td className={inStockClass}>{inStock}</td>
      <td>{product.buyPrice}</td>
      <td>{product.MSRP}</td>
    </tr>
  )
}

export default ProductTableRow;