import React from 'react';
import ReactDOM from 'react-dom';

class Counter extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });

    const node = ReactDOM.findDOMNode(this);
    if (node) {
      console.log('DOM says count is:', node.textContent);
      console.log('State says count is:', this.state.count + 1);
    }
  }

  render() {
    return <div onClick={this.handleClick}>Count: {this.state.count}</div>;
  }
}

export default Counter;
