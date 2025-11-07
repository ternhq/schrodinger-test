import React from 'react';
import ReactDOM from 'react-dom';

class FormInput extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const allInputs = node.querySelectorAll('input');
      allInputs.forEach(input => {
        input.addEventListener('focus', this.handleFocus);
      });
    }
  }

  handleFocus = (e) => {
    console.log('Input focused:', e.target);
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="First Name" />
        <input type="text" placeholder="Last Name" />
        <input type="email" placeholder="Email" />
      </div>
    );
  }
}

export default FormInput;
