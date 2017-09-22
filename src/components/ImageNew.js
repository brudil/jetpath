import React from 'react';
import Imgix from 'react-imgix';

const DRAFTY_ENDPOINT = 'https://drafty.imgix.net/';

function Image(props) {
  if (process.env.NODE_ENV === 'test') {
    /*
      TODO: hacky and probally makes tests a bit useless
      all due to findDOMNode in the Imgix component
    */
    return (
      <div className="TEST_IMAGE" data-props={props.src}>
        {props.children ? props.children : null}
      </div>
    );
  }

  const img = (
    <Imgix
      precision={20}
      {...props}
      src={`${DRAFTY_ENDPOINT}/${props.src}`}
    />
  );

  return img;
}

Image.defaultProps = {
  lazy: false,
};

export default Image;
