import React, { Component } from 'react';
import callAPI from "./../../utils/apiCaller";
import { Link } from 'react-router-dom';

class ProductActionPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      txtName: "",
      txtPrice: "",
      chkbStatus: ""
    }
  }

  componentDidMount(){ // dung componentDidMount de lay data cho chuc nang update 
    var {match} = this.props; // nhan match tu routes de kiem tra xe co lay dc id ma ta click vao de sua
    if(match){
      var id = match.params.id;
      // console.log(id); // log ra id duoc click chon update
      callAPI(`products/${id}`, "GET", null).then(res => {
        // console.log(res.data); // log ra lay duoc data cua id tu server chua
        var data = res.data;
        this.setState({ // hien thi data update trong form
          id: data.id,
          txtName: data.name,
          txtPrice: data.price,
          chkbStatus: data.status
        })
      });
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === "checkbox" ? target.checked : target.value;
    this.setState({
      [name]: value
    })
  }

  onSave = (e) => {
    e.preventDefault();
    // console.log(this.state); // kiem tra nhap da lay dc data trong form chua
    var {id, txtName, txtPrice, chkbStatus} = this.state;
    var {history} = this.props // nhan props tu routes de chuyen trang sau khi nhan nut Save trong Add New

    if(id){ // update, update vs add new phan biet thong qua id
      // console.log("update")
      callAPI(`products/${id}`, "PUT", {
        name: txtName,
        price: txtPrice,
        status: chkbStatus
      }).then(res => {
        history.goBack();
      });
    }else{
      callAPI("products", "POST", { // add new
        name: txtName,
        price: txtPrice,
        status: chkbStatus
      }).then(res =>{
        // console.log(res); ra duoc phan tu moi them
        //history.push("/") // tuy theo duong link router minh muon no tra ve
        history.goBack(); // chuyen ve trang truoc do
      });
    }

    
  }

  render() {
    var {txtName, txtPrice, chkbStatus} = this.state;
    return (
      <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <form onSubmit={this.onSave}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="txtName"
              value={txtName}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              name="txtPrice"
              value={txtPrice}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <label>Status</label>
          </div>
          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                name="chkbStatus"
                value={chkbStatus}
                onChange={this.onChange}
                checked={chkbStatus}
              />
              Còn Hàng
            </label>
          </div>
          <Link to="/product-list" className="btn btn-danger mr-10">Back</Link>
          <button type="submit" className="btn btn-primary">Save</button>
        </form>
      </div>
    );
  }
}

export default ProductActionPage;
