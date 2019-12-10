import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { loadUnreadCount, NotificationState } from '../../ducks/Notification';
import BellIcon from 'icons/bell.svg';
import { RootState } from '../../types';

const Container = styled.div`
  display: inline-block;
  margin-right: 0.5em;
`;

const BellIconStyled = styled(BellIcon)`
  width: 25px;
  display: inline-block;
  float: left;
`;

const Badge = styled.span`
  display: inline-block;
  background-color: ${(props: any) => props.theme.colors.danger};
  border-radius: 50%;
  text-align: center;
  line-height: 10px;
  margin-left: -10px;
  margin-top: -10px;
  vertical-align: middle;
  padding: 4px;
  width: 10px;
  height: 10px;
  color: #ffffff;
  font-size: 0.8em;
`;

interface DispatchProps {
  loadUnreadCount: any;
}

interface ComponentProps {
  notification: NotificationState;
}

type IProps = ComponentProps & DispatchProps;

export class NotificationBell extends React.Component<IProps> {
  componentDidMount() {
    this.props.loadUnreadCount();
  }

  render() {
    return (
      <Link to="/notifications">
        <Container>
          <BellIconStyled />
          <Badge>{this.props.notification.unreadCount}</Badge>
        </Container>
      </Link>
    );
  }
}

export default connect(
  (state: RootState) => ({
    notification: state.notification,
  }),
  {
    loadUnreadCount,
  }
)(NotificationBell);
