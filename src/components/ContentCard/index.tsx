import React from 'react';
import { Link } from 'react-router-dom';
import styled from "react-emotion";
import FauxRouterLink from '../FauxLink/FauxRouterLink';
import SmartDate from '../SmartDate';

const Container = styled.div`
  padding: 0.4rem;
  box-shadow: 0 1px 3px rgba(40, 40, 40, 0.15);
  background-color: #ffffff;
  width: 210px;
  position: relative;
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const Headline = styled.h1`
  font-size: 1.3rem;
  font-family: 'pragmatica-web-condensed', sans-serif;
  font-weight: normal;
`;

const Meta = styled.div`
  margin-top: auto;
  padding-top: 1rem;
  font-size: 0.8rem;
  color: ${(props: any) => props.theme.colors.grey_autumn};
`;


interface IProps {
  headline: string;
  link: string;
  currentRevision: {
    created: string;
    createdBy: {
      username: string;
    } | null;
  };
}

export function ContentCard(props: IProps) {
  return (
    <Container>
      <FauxRouterLink to={props.link} />
      <Headline>
        <Link to={props.link}>{props.headline}</Link>
      </Headline>
      <Meta>
        last edited <SmartDate value={props.currentRevision.created} /> ago by{' '}
        {props.currentRevision.createdBy &&
          props.currentRevision.createdBy.username}
      </Meta>
    </Container>
  );
}

export default ContentCard;
