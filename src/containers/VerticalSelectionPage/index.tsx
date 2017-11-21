import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import DocumentTitle from '../../components/DocumentTitle';
import * as VerticalActions from '../../ducks/Vertical';
import verticalConfig from '../../verticals';
import styled from 'react-emotion';
import { RootState } from '../../types';

const Title = styled.div`
  text-align: center;
  padding: 1rem 0;
`;

const VerticalList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & li {
    padding: 1rem;
    flex: 1 1 auto;
    max-width: 300px;
    display: block;
  }
`;

const VerticalLogo = styled.img`
  width: 100%;
  margin-bottom: 1rem;
`;

const VerticalLink = styled(Link)`
  width: 100%;
  display: block;
  margin: 0 auto;
  text-align: center;
  color: darkgray;
  font-style: italic;
  padding: 1rem;
  background-color: #ffffff;
  box-shadow: 0 1px 4px rgba(30, 30, 30, 0.1);
  box-sizing: border-box;
`;

const AudienceTag = styled.span`
  font-style: italic;
`;

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

class VerticalSelectionPage extends React.Component<IProps> {
  componentDidMount() {
    this.props.getVerticals();
  }

  render() {
    const verticals = this.props.verticals;
    return (
      <DocumentTitle title="Select a vertical">
        <div>
          <Title>Select a vertical</Title>
          <VerticalList>
            {verticals.map(vertical => (
              <li key={vertical.identifier}>
                <VerticalLink to={`/@${vertical.identifier}/dashboard`}>
                  <VerticalLogo
                    src={verticalConfig[vertical.identifier].logoHeader}
                    alt={vertical.name}
                  />
                  <AudienceTag>{vertical.audience}</AudienceTag>
                </VerticalLink>
              </li>
            ))}
          </VerticalList>
        </div>
      </DocumentTitle>
    );
  }
}

export default connect(
  (state: RootState) => ({
    verticals: state.verticals.list,
  }),
  {
    getVerticals: VerticalActions.getVerticals,
  }
)(VerticalSelectionPage);
