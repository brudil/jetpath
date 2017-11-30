import React from 'react';

interface IState {
  pastDelay: boolean;
}

interface IProps {
  render: any;
  delay: number;
}

export class DelayedRender extends React.Component<IProps, IState> {
  private delay: number | null;
  constructor(props: IProps) {
    super(props);

    this.state = {
      pastDelay: false,
    }
  }

  componentDidMount() {
    this.delay = window.setTimeout(() => {
      this.setState({ pastDelay: true });
      this.delay = null;
    }, this.props.delay);
  }

  componentWillUnmount() {
    if (this.delay) {
      clearTimeout(this.delay);
    }
  }

  render() {
    if (this.state.pastDelay) {
      return this.props.render();
    }

    return null;
  }
}
