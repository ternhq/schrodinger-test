import React from 'react';
import ReactDOM from 'react-dom';

class DynamicList extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const items = node.querySelectorAll('li');
      items.forEach((item, i) => {
        item.setAttribute('data-index', i);
      });
    }
  }

  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  }
}

export default DynamicList;
