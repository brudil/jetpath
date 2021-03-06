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
        <path d="M81.668 56.668H15c-5.512 0-10 4.488-10 10s4.488 10 10 10h66.668a6.674 6.674 0 0 1 6.668 6.668 6.674 6.674 0 0 1-6.668 6.668L23.332 90v3.332h58.332c5.512 0 10-4.488 10-10s-4.488-10-10-10H14.996a6.674 6.674 0 0 1-6.668-6.668 6.674 6.674 0 0 1 6.668-6.668h66.668c5.512 0 10-4.488 10-10s-4.488-10-10-10H14.996a6.674 6.674 0 0 1-6.668-6.668 6.674 6.674 0 0 1 6.668-6.668h66.668c5.512 0 10-4.488 10-10s-4.488-10-10-10l-58.332.008V10h58.332a6.674 6.674 0 0 1 6.668 6.668 6.674 6.674 0 0 1-6.668 6.668H14.996c-5.512 0-10 4.488-10 10s4.488 10 10 10h66.668a6.674 6.674 0 0 1 6.668 6.668 6.673 6.673 0 0 1-6.664 6.664z" />
      </svg>
    );
  }
}
