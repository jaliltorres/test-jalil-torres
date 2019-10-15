import React, {Component} from 'react';

class Product extends Component {
    constructor(props) {
        super(props);
        this.state = { counter: 0 };
        // this.addCount = this.addCount.bind(this);
        // this.subCount = this.subCount.bind(this);
    }
    
    // addCount = () => {
    //     this.setState(prevState => ({ counter: prevState.counter + 1 }));
    // }

    // subCount = () => {
    //     if(this.state.counter >= 1) {
    //         this.setState(prevState => ({ counter: prevState.counter - 1 }));
    //     }
    // }

    render() {
        return (
          <div className="App">
            <div className="card card-opt">
                <div className="card-body">
                <h5 className="card-title">{this.props.data.name}</h5>
                <p className="card-text">{this.props.data.discount}</p>
                <div align="center">
                    <p>{this.state.counter}</p>
                    <button className="btn btn-danger btn-add" onClick={this.increment}> - </button>
                    <button className="btn btn-primary btn-add" onClick={this.decrement}> + </button>
                </div>
                </div>
            </div>
          </div>
        ); 
      }
}

export default Product;