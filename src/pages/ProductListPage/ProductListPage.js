import React, { Component } from 'react';
import ProductList from "./../../components/ProductList/ProductList";
import ProductItem from "./../../components/ProductItem/ProductItem";
import { connect } from "react-redux";
import callAPI from "./../../utils/apiCaller";
import { Link } from 'react-router-dom';

class ProductListPage extends Component {
  // constructor de chua data sau khi render
  constructor(props){
    super(props);
    this.state = {
      products: []
    };
  }
  
  // goi len data truoc khi render
  componentDidMount(){
    callAPI("products","GET", null).then(res => {
      // console.log("hovanco",res)// kiem tra data cua cau truc mang
      this.setState({
        products: res.data
      });
    });
  }

  // xoa mot phan tu va khong can phai refesh lai
  onDelete = (id) => { // truyen den ProductItem noi se thuc hien chuc nang xoa
    console.log(id);// kiem tra id
    var {products} = this.state;
    callAPI(`products/${id}`,"DELETE", null).then(res => {
      //console.log(res); kiem tra res sau khi hien thi
      if(res.status === 200){ // xoa phan tu da xoa ra khoi mang products
        var index = this.findIndex(products, id);
        if(index !== -1){
          products.splice(index, 1);
          this.setState({
            products: products
          });
        }
      }
    });
  }
  
  // xoa mot phan tu va khong can phai refesh lai
  //tim id phan tu da bi xoa
  findIndex = (products, id) => {
    var result = -1;
    products.forEach((product, index) => {
      if(product.id === id){
        result = index;
      }
    });
    return result;
  }


  render() {
    var {products} = this.state;
    // console.log("data",products)
    return (
      <>
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
            <Link to="/product/add" className="btn btn-info mb-10">Add New</Link>
            <ProductList>
              { this.showProducts(products)}
            </ProductList>
          </div>
        </div>
      </>
    );
  }

  showProducts(products){
    var result = null;
    if(products.length > 0) {
      result = products.map((product, index) => {
        return ( 
          // truyen den ProductItem noi se thuc hien cac chuc nang sau
          <ProductItem
            key={index}
            product={product}
            index = {index}
            onDelete = {this.onDelete}
          />
        );
      });
    }
    return result;
  }

}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps, null)(ProductListPage);
