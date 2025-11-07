import React from 'react';
import ReactDOM from 'react-dom';

class NavLink extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.focus && node.focus();
    }
  }

  render() {
    const { type, href } = this.props;

    if (type === 'link' && href) {
      return <a href={href}>Link</a>;
    } else if (type === 'button') {
      return <button>Button</button>;
    } else if (type === 'input') {
      return <input type="text" />;
    } else {
      return <div tabIndex={0}>Div</div>;
    }
  }
}

export default NavLink;
