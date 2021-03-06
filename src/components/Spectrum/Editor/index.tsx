import React from 'react';
import { connect } from 'react-redux';
import Element from '../Element';
import DocumentPanel from '../DocumentPanel';
import * as EditorActions from '../../../ducks/Editor';
import { css, cx } from 'emotion';

const rootStyles = css`
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  padding-bottom: 5rem;
  transition: padding-right 300ms ease;
  padding-right: 60px;
`;

const rootPanelOpenStyles = css`
  padding-right: 260px;
`;

interface IProps {
  updateSpectrumDocument: any;
  changeDocumentSubtype: any;
  document: any;
  focus: any;
}

class SpectrumEditor extends React.Component<IProps, any> {
  private boundUpdate: (changeset: any) => void;

  constructor(props: IProps) {
    super(props);

    this.boundUpdate = changeset => {
      this.props.updateSpectrumDocument(changeset);
    };
  }

  componentDidMount() {}

  render() {
    const { document, focus } = this.props;
    const hasContent = document.getIn(['content']) !== null;

    return (
      <div
        className={cx(rootStyles, {
          [rootPanelOpenStyles]: focus.get('hasPanelOpen'),
        })}
      >
        <DocumentPanel
          data={document}
          applyChangeset={this.props.updateSpectrumDocument}
        />
        {hasContent ? (
          <Element
            data={document}
            index="content"
            path={[]}
            update={this.boundUpdate}
            isInStream={false}
            focus={focus}
          />
        ) : null}
      </div>
    );
  }
}

export default connect(null, {
  changeDocumentSubtype: EditorActions.changeDocumentSubtype,
  updateSpectrumDocument: EditorActions.updateSpectrumDocument,
})(SpectrumEditor);
