import React from 'react';
import Helmet from "react-helmet";

function NotFoundPage() {
  return (
    <div>
      <Helmet>
        <title>Not found!</title>
      </Helmet>

      <h1>Not found!</h1>
    </div>
  );
}

export default NotFoundPage;
