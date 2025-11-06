import React from 'react';
import ReactDOM from 'react-dom';

/**
 * REALISTIC BROKEN EXAMPLES
 * These are logic/runtime errors that exist in production codebases
 * All valid JavaScript that runs, but has bugs
 */

/**
 * BROKEN: Logic error - trying to use DOM node before mount
 * This compiles and runs, but doesn't work as intended
 */
class BrokenLogicEarlyAccess extends React.Component {
  constructor(props) {
    super(props);
    // BUG: Can't use findDOMNode before component mounts!
    // Returns null, height is always 0
    this.initialHeight = 0;
  }

  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    // This works, but constructor access didn't
    this.initialHeight = node ? node.offsetHeight : 0;
  }

  render() {
    return <div>Height: {this.initialHeight}</div>;
  }
}

/**
 * BROKEN: Missing null check - runtime error in edge case
 * Works 99% of the time, crashes when component returns null
 */
class BrokenNullCheck extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    // BUG: No null check - crashes if render() returns null
    node.addEventListener('click', this.handleClick);
  }

  componentWillUnmount() {
    const node = ReactDOM.findDOMNode(this);
    // Same bug here
    node.removeEventListener('click', this.handleClick);
  }

  handleClick = () => {
    console.log('clicked');
  }

  render() {
    // When hidden=true, this returns null and findDOMNode returns null
    return this.props.hidden ? null : <div>Click me</div>;
  }
}

/**
 * BROKEN: Ambiguous transformation - which element gets the ref?
 * Simple transformation to refs is ambiguous
 */
class BrokenAmbiguous extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Which element is this? The div, span, or p?
      // Transformation to refs is ambiguous
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
 * BROKEN: Complex DOM query - not easily transformable
 * Uses findDOMNode as entry point for querySelector
 */
class BrokenComplexQuery extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Uses findDOMNode to query multiple elements
      // Can't easily transform to single ref
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
        <input type="text" placeholder="First" />
        <input type="text" placeholder="Second" />
        <input type="text" placeholder="Third" />
      </div>
    );
  }
}

/**
 * BROKEN: Accessing child component DOM - needs forwardRef
 * Can't easily transform without refactoring child component
 */
class BrokenChildAccess extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this.childRef);
    if (node) {
      // BUG: Reaches into child component's DOM
      // Simple ref replacement won't work without forwardRef in child
      const input = node.querySelector('input');
      if (input) {
        input.focus();
      }
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
 * BROKEN: Missing prop validation - runtime error
 * Works when props are provided, crashes when they're not
 */
class BrokenPropTypes extends React.Component {
  componentDidMount() {
    // BUG: this.props.onMount might not be a function
    // Works when provided, crashes when omitted
    this.props.onMount();

    const node = ReactDOM.findDOMNode(this);
    console.log(node);
  }

  render() {
    // BUG: this.props.title might be undefined
    // Works when provided, crashes with "Cannot read property 'toUpperCase' of undefined"
    return <div>{this.props.title.toUpperCase()}</div>;
  }
}

/**
 * BROKEN: Incorrect assumption about DOM structure
 * Assumes specific DOM structure that might change
 */
class BrokenDOMAssumption extends React.Component {
  measureContent() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Assumes first child is always the content div
      // Breaks if render structure changes
      const contentDiv = node.firstChild;
      return contentDiv ? contentDiv.offsetHeight : 0;
    }
    return 0;
  }

  render() {
    return (
      <div>
        {this.props.showHeader && <div>Header</div>}
        <div>Content</div>
      </div>
    );
  }
}

/**
 * BROKEN: Race condition with async updates
 * DOM might not reflect latest state yet
 */
class BrokenRaceCondition extends React.Component {
  state = { count: 0 };

  handleClick = () => {
    this.setState({ count: this.state.count + 1 });

    // BUG: DOM hasn't updated yet when this runs
    // findDOMNode returns stale content
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      console.log('DOM says count is:', node.textContent);
      console.log('State says count is:', this.state.count + 1);
      // These won't match!
    }
  }

  render() {
    return <div onClick={this.handleClick}>Count: {this.state.count}</div>;
  }
}

/**
 * HARD CASE: Third-party component without forwardRef
 * Can't add ref to third-party components that don't use forwardRef
 */
// Simulate a third-party component (e.g., from a UI library)
class ThirdPartyButton extends React.Component {
  render() {
    return <button onClick={this.props.onClick}>{this.props.children}</button>;
  }
}

class BrokenThirdPartyAccess extends React.Component {
  componentDidMount() {
    // BUG: findDOMNode on third-party component
    // Can't easily transform this to ref without modifying ThirdPartyButton
    const node = ReactDOM.findDOMNode(this.buttonRef);
    if (node) {
      node.style.fontWeight = 'bold';
    }
  }

  render() {
    return (
      <div>
        <ThirdPartyButton ref={ref => this.buttonRef = ref}>
          Click Me
        </ThirdPartyButton>
      </div>
    );
  }
}

/**
 * HARD CASE: Component returns Fragment (multiple root elements)
 * Which element should get the ref?
 */
class BrokenFragmentReturn extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Fragment returns multiple elements, findDOMNode returns first
      // Transformation is ambiguous - which element needs the ref?
      console.log('Found element:', node.tagName);
    }
  }

  render() {
    return (
      <>
        <div>First Element</div>
        <div>Second Element</div>
        <div>Third Element</div>
      </>
    );
  }
}

/**
 * HARD CASE: Using Portal
 * DOM node is outside component tree
 */
class BrokenPortalAccess extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    // BUG: Portal renders content outside the parent hierarchy
    // findDOMNode behavior is weird here, transformation is complex
    console.log('Portal node:', node);
  }

  render() {
    return ReactDOM.createPortal(
      <div>I'm in a portal!</div>,
      document.body
    );
  }
}

/**
 * HARD CASE: Dynamic list requiring multiple refs
 * Need to track refs for dynamically generated elements
 */
class BrokenDynamicList extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Uses findDOMNode to query all list items
      // Transformation requires creating ref array or callback refs
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

/**
 * HARD CASE: HOC (Higher-Order Component) wrapped
 * findDOMNode on wrapped component
 */
function withLogger(Component) {
  return class extends React.Component {
    componentDidMount() {
      const node = ReactDOM.findDOMNode(this);
      // BUG: findDOMNode on HOC-wrapped component
      // Transformation needs to thread ref through HOC
      console.log('Wrapped component mounted:', node);
    }

    render() {
      return <Component {...this.props} />;
    }
  };
}

class InnerComponent extends React.Component {
  render() {
    return <div>Inner Content</div>;
  }
}

const BrokenHOCWrapped = withLogger(InnerComponent);

/**
 * HARD CASE: Conditional element types AND attributes
 * Not just conditional rendering, but different element types with different attributes
 */
class BrokenConditionalTypes extends React.Component {
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Tries to focus, but element might not be focusable
      // Transformation needs to handle different element capabilities
      node.focus && node.focus();
    }
  }

  render() {
    const { type, href, to } = this.props;

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

/**
 * HARD CASE: Measuring multiple children with specific selectors
 * Can't transform to single ref
 */
class BrokenMeasureChildren extends React.Component {
  measureAllImages() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      // BUG: Needs to measure ALL images, not just one
      // Transformation requires ref callback on each image or ref array
      const images = node.querySelectorAll('img');
      const heights = Array.from(images).map(img => img.offsetHeight);
      return heights;
    }
    return [];
  }

  render() {
    return (
      <div>
        <img src="photo1.jpg" alt="Photo 1" />
        <img src="photo2.jpg" alt="Photo 2" />
        <img src="photo3.jpg" alt="Photo 3" />
      </div>
    );
  }
}

/**
 * HARD CASE: Using findDOMNode result in event handlers
 * Reference stored and used later
 */
class BrokenStoredReference extends React.Component {
  constructor(props) {
    super(props);
    this.domNode = null;
  }

  componentDidMount() {
    // BUG: Stores DOM node reference
    this.domNode = ReactDOM.findDOMNode(this);
  }

  handleClick = () => {
    // BUG: Uses stored reference instead of current ref
    // Transformation needs to update all usages
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

export {
  BrokenLogicEarlyAccess,
  BrokenNullCheck,
  BrokenAmbiguous,
  BrokenComplexQuery,
  BrokenChildAccess,
  BrokenPropTypes,
  BrokenDOMAssumption,
  BrokenRaceCondition,
  BrokenThirdPartyAccess,
  BrokenFragmentReturn,
  BrokenPortalAccess,
  BrokenDynamicList,
  BrokenHOCWrapped,
  BrokenConditionalTypes,
  BrokenMeasureChildren,
  BrokenStoredReference
};
