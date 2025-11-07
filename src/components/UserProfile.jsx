import React from 'react';
import ReactDOM from 'react-dom';

class UserProfile extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.style.backgroundColor = 'lightblue';
      console.log('DOM node height:', node.offsetHeight);
    }
  }

  handleClick = () => {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  measureElement = () => {
    const element = ReactDOM.findDOMNode(this);
    return element ? element.getBoundingClientRect() : null;
  }

  render() {
    return (
      <div className="user-profile">
        <h2>{this.props.name}</h2>
        <p>Email: {this.props.email}</p>
        <button onClick={this.handleClick}>Scroll to me</button>
      </div>
    );
  }
}

export default UserProfile;
