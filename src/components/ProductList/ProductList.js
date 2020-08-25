import React, { Component } from 'react'

class ProductList extends Component {
  render() {
    return (
      <div className="panel panel-primary">
        <div className="panel-heading">
          <h3 className="panel-title">Danh Sach San Pham</h3>
        </div>
        <div className="panel-body">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>No.</th>
                <th>ID</th>
                <th>NEM</th>
                <th>PRICE</th>
                <th>STATUS</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              { this.props.children}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

export default ProductList;
