import React from 'react';
import styles from './EditorNav.css';

interface IProps {
  headline: string;
  onHeadlineUpdate(headline: string): void;
}

class EditorNav extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleHeadlineChange = this.handleHeadlineChange.bind(this);
  }

  handleHeadlineChange({
    currentTarget: { value },
  }: React.ChangeEvent<HTMLInputElement>) {
    this.props.onHeadlineUpdate(value);
  }

  renderDefault() {
    const { headline } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.main}>
          <input
            className={styles.headlineInput}
            value={headline}
            type="text"
            onChange={this.handleHeadlineChange}
            placeholder="Headline of content"
          />
        </div>
      </div>
    );
  }

  render() {
    return this.renderDefault();
  }
}

export default EditorNav;
