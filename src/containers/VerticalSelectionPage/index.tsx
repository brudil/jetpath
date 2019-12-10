import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import * as VerticalActions from '../../ducks/Vertical';
import verticalConfig from '../../verticals';
import styled from '@emotion/styled';
import { RootState, Vertical } from '../../types';
import Helmet from 'react-helmet';
import {css} from "emotion";
import { useMappedState } from 'redux-react-hook';

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

const VerticalLogoContainer = styled.div`
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

const verticalLogoStyles = css`
  width: 100%;
  height: auto;
`;

const VerticalSelectionPage: React.FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(VerticalActions.getVerticals());
    }, [dispatch]);

    const mappedState = useCallback((state: RootState) => ({
      verticals: state.verticals.list,
    }), []);

    const {verticals} = useMappedState(mappedState) as any;
    
    if (!verticals) {
      return <h1>loading</h1>
    }
    
    return (
      <div>
        <Helmet>
          <title>Select a vertical</title>
        </Helmet>

        <Title>Select a vertical</Title>
        <VerticalList>
          {verticals.map((vertical: Vertical) => {
            const VerticalLogo = verticalConfig[vertical.identifier].logoHeader as any;
            return (
            <li key={vertical.identifier}>
              <VerticalLink to={`/@${vertical.identifier}/dashboard`}>
                <VerticalLogoContainer
                >
                  <VerticalLogo
                    className={verticalLogoStyles}
                    alt={vertical.name}
                  />
                </VerticalLogoContainer>
                <AudienceTag>{vertical.audience}</AudienceTag>
              </VerticalLink>
            </li>
          )})}
        </VerticalList>
      </div>
    );
  }

  export default VerticalSelectionPage;
