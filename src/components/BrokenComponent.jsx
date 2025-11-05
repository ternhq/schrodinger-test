import React from 'react';
import ReactDOM from 'react-dom';

/**
 * BROKEN EXAMPLES - These have bugs that should be flagged
 * Testing Tern's ability to detect already-broken code
 */

/**
 * BROKEN: Syntax error - missing closing brace
 */
class BrokenSyntax extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      node.style.color = 'red';
    // Missing closing brace

  render() {
    return <div>Broken</div>;
  }
}

/**
 * BROKEN: Logic error - accessing DOM in constructor
 */
class BrokenLogic1 extends React.Component {
  constructor(props) {
    super(props);
    // BUG: Can't use findDOMNode before component mounts!
    const node = ReactDOM.findDOMNode(this);
    this.height = node ? node.offsetHeight : 0;
  }

  render() {
    return <div>Height: {this.height}</div>;
  }
}

/**
 * BROKEN: Logic error - findDOMNode might return null but not checked
 */
class BrokenLogic2 extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    // BUG: No null check, will crash if node is null
    node.addEventListener('click', this.handleClick);
  }

  handleClick = () => {
    console.log('clicked');
  }

  render() {
    return null; // Deliberately returns null, so findDOMNode will return null
  }
}

/**
 * BROKEN: findDOMNode on component that renders multiple elements conditionally
 * This is ambiguous - which element should get the ref?
 */
class BrokenAmbiguous extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Which element is this? The div or the span?
      node.scrollIntoView();
    }
  }

  render() {
    if (this.props.mode === 'a') {
      return <div>Mode A</div>;
    } else if (this.props.mode === 'b') {
      return <span>Mode B</span>;
    } else {
      return <p>Mode C</p>;
    }
  }
}

/**
 * BROKEN: Using findDOMNode to access child component internals
 * This can't be easily converted to refs without ref forwarding
 */
class ParentComponent extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.childRef);
    // BUG: This reaches into the child component's DOM
    // Simple ref replacement won't work without forwardRef
    if (node) {
      const input = node.querySelector('input');
      input.focus();
    }
  }

  render() {
    return <ChildComponent ref={ref => this.childRef = ref} />;
  }
}

class ChildComponent extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}

/**
 * BROKEN: Incorrect prop type usage
 */
class BrokenProps extends React.Component {
  componentDidMount() {
    // BUG: Expects this.props.onMount to be a function, but doesn't check
    this.props.onMount();

    const node = ReactDOM.findDOMNode(this);
    // Also using deprecated findDOMNode
    console.log(node);
  }

  render() {
    return <div>{this.props.title.toUpperCase()}</div>; // BUG: What if title is undefined?
  }
}

export {
  BrokenSyntax,
  BrokenLogic1,
  BrokenLogic2,
  BrokenAmbiguous,
  ParentComponent,
  BrokenProps
};
