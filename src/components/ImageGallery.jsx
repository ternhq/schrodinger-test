import React from 'react';
import ReactDOM from 'react-dom';

class ImageGallery extends React.Component {
  measureAllImages() {
    const node = ReactDOM.findDOMNode(this);
    if (node) {
      const images = node.querySelectorAll('img');
      const heights = Array.from(images).map(img => img.offsetHeight);
      return heights;
    }
    return [];
  }

  render() {
    return (
      <div className="gallery">
        <img src="photo1.jpg" alt="Photo 1" />
        <img src="photo2.jpg" alt="Photo 2" />
        <img src="photo3.jpg" alt="Photo 3" />
      </div>
    );
  }
}

export default ImageGallery;
