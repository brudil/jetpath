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
        <path d="M21.629 19.75H78.57v3.559H21.629zM21.43 76.691h37.941v3.559H21.43zM21.629 57.711H78.57v3.559H21.629zM21.824 38.73h37.148v3.559H21.824z" />
      </svg>
    );
  }
}
