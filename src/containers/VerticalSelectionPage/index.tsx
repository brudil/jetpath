import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import * as VerticalActions from '../../ducks/Vertical';
import verticalConfig from '../../verticals';

import style from './style.css';

interface Vertical {
  identifier: string;
  name: string;
  audience: string;
}

interface IProps {
  getVerticals: any; // TODO: i think this is technically () => void as it's being bound to dispatch
  verticals: Array<Vertical>;
  children?: Element;
  context?: any;
}

class VerticalSelectionPage extends React.Component<IProps, any> {
  componentDidMount() {
    this.props.getVerticals();
  }

  render() {
    const verticals = this.props.verticals;
    return (
      <DocumentTitle title="Select a vertical">
        <div>
          <h1 className={style.title}>Select a vertical</h1>
          <ul className={style.list}>
            {verticals.map(vertical => (
              <li key={vertical.identifier}>
                <Link
                  className={style.item}
                  to={`/@${vertical.identifier}/dashboard`}
                >
                  <img
                    className={style.logo}
                    src={verticalConfig[vertical.identifier].logoHeader}
                    alt={vertical.name}
                  />
                  <span className={style.audience}>{vertical.audience}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(
  state => ({
    verticals: state.verticals.list,
  }),
  {
    getVerticals: VerticalActions.getVerticals,
  }
)(VerticalSelectionPage);
