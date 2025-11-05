import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Legacy component using ReactDOM.findDOMNode
 * NEEDS MIGRATION: Should use refs instead for React 19 compatibility
 */
class LegacyComponent extends React.Component {
  componentDidMount() {
    // LEGACY PATTERN: Using findDOMNode (deprecated)
    const domNode = ReactDOM.findDOMNode(this);
    if (domNode) {
      domNode.style.backgroundColor = 'lightblue';
      console.log('DOM node height:', domNode.offsetHeight);
    }
  }

  handleClick = () => {
    // LEGACY PATTERN: Using findDOMNode to access DOM
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth' });
    }
  }

  measureElement = () => {
    // LEGACY PATTERN: Using findDOMNode for measurements
    const element = ReactDOM.findDOMNode(this);
    return element ? element.getBoundingClientRect() : null;
  }

  render() {
    return (
      <div className="legacy-component">
        <h1>Legacy Component</h1>
        <button onClick={this.handleClick}>Scroll to me</button>
        <p>This component uses the deprecated ReactDOM.findDOMNode API</p>
      </div>
    );
  }
}

export default LegacyComponent;
