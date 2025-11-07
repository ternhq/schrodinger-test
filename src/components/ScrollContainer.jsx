import React from 'react';
import ReactDOM from 'react-dom';

class ScrollContainer extends React.Component {
  constructor(props) {
    super(props);
    this.domNode = null;
  }

  componentDidMount() {
    this.domNode = ReactDOM.findDOMNode(this);
  }

  handleClick = () => {
    if (this.domNode) {
      this.domNode.scrollIntoView();
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Scroll to container</button>
        <div style={{ marginTop: '1000px' }}>Content</div>
      </div>
    );
  }
}

export default ScrollContainer;
