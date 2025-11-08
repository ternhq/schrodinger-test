import React from 'react';
import { createRoot } from 'react-dom/client';
import './closure-shim.js';
import UserProfile from './components/UserProfile.jsx';
import Modal from './components/Modal.jsx';
import FormInput from './components/FormInput.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import DynamicList from './components/DynamicList.jsx';
import Counter from './components/Counter.jsx';
import NavLink from './components/NavLink.jsx';
import ScrollContainer from './components/ScrollContainer.jsx';

class App extends React.Component {
  state = {
    modalHidden: false,
    items: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ]
  };

  toggleModal = () => {
    this.setState({ modalHidden: !this.state.modalHidden });
  }

  render() {
    return (
      <div>
        <div className="component-section">
          <h3>User Profile Component</h3>
          <UserProfile name="John Doe" email="john@example.com" />
        </div>

        <div className="component-section">
          <h3>Modal Component</h3>
          <button onClick={this.toggleModal}>Toggle Modal</button>
          <Modal hidden={this.state.modalHidden} />
        </div>

        <div className="component-section">
          <h3>Form Input Component</h3>
          <FormInput />
        </div>

        <div className="component-section">
          <h3>Image Gallery Component</h3>
          <ImageGallery />
        </div>

        <div className="component-section">
          <h3>Dynamic List Component</h3>
          <DynamicList items={this.state.items} />
        </div>

        <div className="component-section">
          <h3>Counter Component</h3>
          <Counter />
        </div>

        <div className="component-section">
          <h3>Nav Link Component</h3>
          <NavLink type="button" />
        </div>

        <div className="component-section">
          <h3>Scroll Container Component</h3>
          <ScrollContainer />
        </div>
      </div>
    );
  }
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);
