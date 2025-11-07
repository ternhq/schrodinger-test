import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    node.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    node.removeEventListener('click', this.handleClick);
  }

  handleClick = () => {
    console.log('clicked');
  }

  render() {
    return this.props.hidden ? null : <div>Click me</div>;
  }
}

export default Modal;
