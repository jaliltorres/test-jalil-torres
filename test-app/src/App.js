import React, {Component} from 'react';
import './App.css';
// import Product from './components/Product';

class App extends Component {
  constructor(props) {
    super(props); 
    this.state = {
      viewOrder: false,
      products: [],
      order: [],
      total: 0,
      counters: {'PANTS': 0, 'TSHIRT': 0, 'HAT': 0}
    }
  }

  componentDidMount() {
    fetch('http://localhost:3001/api/getList')
    .then(response => response.json())
    .then(data => {
      this.setState({products: data})
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  }

  increment = (name, e) => {
    // this.setState({count: this.state.count + 1})
    var count = this.state.counters[name] + 1;
    this.setState(prevState => ({
      counters: {
          ...prevState.counters,
          [name]: count,
      },
    }));
  }

  decrement = (name, e) => {
    var count = this.state.counters[name];
    if(count >= 1) {
      count = this.state.counters[name] - 1;
      this.setState(prevState => ({
        counters: {
            ...prevState.counters,
            [name]: count,
        },
      }));
    }
  }

  generateOrder = () => {
    var senddata = {data: this.state.counters}
    fetch('http://localhost:3001/api/order/create', {
      method: 'POST',
      body: JSON.stringify(senddata),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      this.setState({order: data})
      this.setState({viewOrder: true})

      let t = data.map(product => {
        return product.total
      }).reduce((a,b) => a+b)

      this.setState({total: t})
    })
    .catch(error => {
      console.log(error)
    })
  }

  renderOrder = () => {
    if(this.state.viewOrder) {
      return (
        <div className="col-md-4">
        <div className="row order">
          <h2>Orden</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Description</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              { 
                this.state.order.map((product, i) => {
                  return (<tr key={i}>
                    <td>{product.unit}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>{product.total}</td>
                  </tr>)
                })
              }
              <tr>
                <td colSpan={3}>Total:</td>
                <td>{this.state.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      )
    }
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="row margin-div">
            <div className="col-md-8">
              <div className="row">
              {
                this.state.products.map((product, i) => {
                  return <div className="col-md-4" key={i}>
                  <div className="card card-opt">
                      <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.discount}</p>
                      <div align="center">
                          <p>{this.state.counters[product.name]}</p>
                          <button className="btn btn-danger btn-add" onClick={this.decrement.bind(this, product.name)}> - </button>
                          <button className="btn btn-primary btn-add" onClick={this.increment.bind(this, product.name)}> + </button>
                      </div>
                      </div>
                  </div>
                  </div>
                })
              }
              </div>
              <div className="row margin-div">
                <div className="offset-md-9 col-md-3">
                  <button className="btn btn-success btn-block" onClick={this.generateOrder}>Generar Orden</button>
                </div>
              </div>
            </div>
            {this.renderOrder()}
          </div>
        </div>
      </div>
    ); 
  }
}

export default App;
