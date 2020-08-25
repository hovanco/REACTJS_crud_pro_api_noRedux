import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class ProductItem extends Component {
  onDelete = (id) => {
    if(confirm("Do you want delete ?")){ //eslint-disable-line
      this.props.onDelete(id); // nhan function onDelete tu ProductListPage
      console.log(id);// kiem tra chon duoc id chua
    }
  }
  render() {
    var { product, index } = this.props;
    var statusName = product.status ? "Còn Hàng" : "Hết Hàng";
    var statusClass = product.status ? "warning" : "default";
    return (
      <>
        <tr>
          <td>{index + 1}</td>
          <td>{product.id}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>
            <span className={`label label-${statusClass}`}>{statusName}</span>
          </td>
          <td>
            <Link
              to={`/product/${product.id}/edit`}
              className="btn btn-success mr-10"
            >Update</Link>

            <button
              type="button"
              className="btn btn-danger"
              onClick={ () => this.onDelete(product.id) }
            >Delete</button>
          </td>
        </tr>
      </>
    );
  }
}

export default ProductItem;