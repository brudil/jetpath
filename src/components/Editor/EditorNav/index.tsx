import React from 'react';
import styles from './EditorNav.css';

interface IProps {
  headline: string;
  onHeadlineUpdate(headline: string): void;
  stats: any; // todo
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
    const { headline, stats } = this.props;

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
        <div className={styles.secondary}>
          <div className={styles.info}>
            {stats.get('wordCount')} words.{' '}
            {Math.round(stats.get('wordCount') / 250)} minute read.
          </div>
        </div>
      </div>
    );
  }

  render() {
    return this.renderDefault();
  }
}

export default EditorNav;
