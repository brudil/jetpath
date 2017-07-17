import React from 'react';
import DocumentTitle from '../components/DocumentTitle';

// eslint-disable-next-line react/prefer-stateless-function
class DashboardPage extends React.Component {
  render() {
    return (
      <DocumentTitle title="Dashboard">
        <div>
          <h1>Dashboard</h1>
        </div>
      </DocumentTitle>
    );
  }
}

export default DashboardPage;
