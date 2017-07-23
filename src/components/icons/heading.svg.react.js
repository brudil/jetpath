import React from 'react';
export default class SVG extends React.Component {
  render() {
    return (
      <svg
        width="100pt"
        height="100pt"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        {...this.props}
      >
        <path d="M78.125 79.688h-4.688V20.313h4.688a1.562 1.562 0 1 0 0-3.125h-12.5a1.562 1.562 0 1 0 0 3.125h4.688v28.125H29.687V20.313h4.688a1.562 1.562 0 1 0 0-3.125h-12.5a1.562 1.562 0 1 0 0 3.125h4.688v59.375h-4.688a1.562 1.562 0 1 0 0 3.125h12.5a1.562 1.562 0 1 0 0-3.125h-4.688V51.563h40.626v28.125h-4.688a1.562 1.562 0 1 0 0 3.125h12.5a1.562 1.562 0 1 0 0-3.125z" />
      </svg>
    );
  }
}
