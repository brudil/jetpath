import React from 'react';
import { connect } from 'react-redux';
import * as EditorActions from '../../ducks/Editor';
import { createChangeHandler } from '../../libs/form';
import { RootState } from '../../types';
import { Vertical } from '../../ducks/Vertical';
import { bindActionCreators, Dispatch } from 'redux';
import values from 'lodash/values';
import intersection from 'lodash/intersection';
import DebouncedAutosizeTextarea from '../DebouncedAutosizeTextarea';
import MediaInput from '../MediaInput';
import SlugInput from '../SlugInput';
import AuthorsSelector from '../AuthorsSelector';
import Sidebar, { SidebarControl } from '../Sidebar';
import SectionSelector from '../SectionSelector';
import TopicsSelector from '../TopicsSelector';
import { formly } from '../../libs/form';
import { contentForm, contentTone } from '../../libs/constants';
import * as contentLang from '../../lang/content_attrs';
import { SidebarInput } from '../Sidebar';
import WandComponent from './wand.svgc';

const SidebarSlugInput: any = SidebarInput.withComponent(SlugInput as any); // todo
const SidebarDebouncedAutosizeTextarea: any = SidebarInput.withComponent(
  DebouncedAutosizeTextarea
);

const wand = <WandComponent height={16} width={16} />;

interface ComponentProps {}

interface InternalProps {
  vertical: Vertical;
  editorialMetadata: any; // todo
  savedRevision: any; // todo
  workingRevision: any; // todo
  isLocal: boolean;
  isSaving: boolean;
  hasChangesFromSaved: boolean;
  dispatch: Dispatch<RootState>;

  addAuthor: typeof EditorActions.addAuthor;
  removeAuthor: typeof EditorActions.removeAuthor;
  publish: typeof EditorActions.publish;
  changeRevisionStatus: typeof EditorActions.changeRevisionStatus;
}

type IProps = ComponentProps & InternalProps;

class EditorSectionMetadata extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);

    this.handleAddAuthor = this.handleAddAuthor.bind(this);
    this.handleRemoveAuthor = this.handleRemoveAuthor.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
  }

  handleAddAuthor(id: number) {
    this.props.addAuthor(id);
  }

  handleRemoveAuthor(id: number) {
    this.props.removeAuthor(id);
  }

  handlePublish() {
    this.props.publish();
  }

  handleChangeStatus(status: number) {
    this.props.changeRevisionStatus(status);
  }

  render() {
    const {
      vertical,
      workingRevision,
      isLocal,
      editorialMetadata,
    } = this.props;
    const revisionChangeHandler = createChangeHandler(
      this.props.dispatch,
      EditorActions.updateRevision
    );

    const revision = workingRevision;

    if (!isLocal && !editorialMetadata) {
      return null;
    }

    return (
      <div>
        <Sidebar>
          <SidebarControl
            title="Slug"
            charLimit={60}
            charCount={revision.get('slug').length}
            buttonTreats={[
              {
                children: wand,
                onClick: () => {
                  import(/* webpackChunkName: 'slugify' */ '../../libs/slugify').then(
                    slugify => {
                      revisionChangeHandler('slug')(
                        slugify.default(revision.get('headline'))
                      );
                    }
                  );
                },
              },
            ]}
          >
            <SidebarSlugInput
              value={revision.get('slug')}
              autoValue={revision.headline}
              removeStopWords
              whenChange={revisionChangeHandler('slug')}
              maxLength={60}
            />
          </SidebarControl>
          <SidebarControl title="Poster Image">
            <MediaInput
              value={revision.get('poster_image')}
              onChange={revisionChangeHandler('poster_image')}
            />
          </SidebarControl>
          <SidebarControl title="Form">
            <select
              value={revision.get('form')}
              onChange={revisionChangeHandler('form', formly.event, formly.int)}
            >
              {intersection(vertical.content_forms, values(contentForm)).map(
                key => (
                  <option value={key} key={key}>
                    {contentLang.contentForm[key]}
                  </option>
                )
              )}
            </select>
          </SidebarControl>
          <SidebarControl title="Tone">
            <select
              value={revision.get('tone')}
              onChange={revisionChangeHandler('tone', formly.event, formly.int)}
            >
              {intersection(vertical.content_tones, values(contentTone)).map(
                key => (
                  <option value={key} key={key}>
                    {contentLang.contentTone[key]}
                  </option>
                )
              )}
            </select>
          </SidebarControl>
          <SidebarControl
            title="Short Headline"
            charLimit={60}
            charCount={revision.get('short_headline').length}
            buttonTreats={[
              {
                children: wand,
                onClick: () => {
                  revisionChangeHandler('short_headline')(
                    revision.get('headline')
                  );
                },
              },
            ]}
          >
            <SidebarDebouncedAutosizeTextarea
              value={revision.get('short_headline')}
              onChange={revisionChangeHandler('short_headline', formly.event)}
              maxLength={60}
            />
          </SidebarControl>
          <SidebarControl
            title="Kicker"
            charLimit={60}
            charCount={revision.get('kicker').length}
          >
            <SidebarDebouncedAutosizeTextarea
              value={revision.get('kicker')}
              onChange={revisionChangeHandler('kicker', formly.event)}
              maxLength={60}
            />
          </SidebarControl>
          <SidebarControl
            title="Standfirst"
            charLimit={140}
            charCount={revision.get('standfirst').length}
          >
            <SidebarDebouncedAutosizeTextarea
              value={revision.get('standfirst')}
              onChange={revisionChangeHandler('standfirst', formly.event)}
              maxLength={140}
            />
          </SidebarControl>
          <SidebarControl title="Authors">
            <AuthorsSelector
              value={revision.get('authors').toJS()}
              onChange={revisionChangeHandler('authors', formly.toImmutable)}
            />
          </SidebarControl>
          <SidebarControl title="Section">
            <SectionSelector
              value={revision.get('section')}
              onChange={revisionChangeHandler('section', formly.select)}
            />
          </SidebarControl>
          <SidebarControl title="Topics">
            <TopicsSelector
              value={revision.get('topics')}
              onChange={revisionChangeHandler('topics')}
            />
          </SidebarControl>
        </Sidebar>
      </div>
    );
  }
}

export default connect(
  (state: RootState) => ({
    vertical: state.verticals.selectedVertical,
    workingRevision: state.editor.get('workingRevision'),
    savedRevision: state.editor.get('savedRevision'),
    isLocal: state.editor.get('isLocal'),
    isSaving: state.editor.get('isSaving'),
    hasChangesFromSaved: state.editor.get('hasChangesFromSaved'),
    editorialMetadata: state.editor.get('editorialMetadata'),
  }),
  dispatch => ({
    dispatch,
    ...bindActionCreators(
      {
        addAuthor: EditorActions.addAuthor,
        removeAuthor: EditorActions.removeAuthor,
        changeRevisionStatus: EditorActions.changeRevisionStatus,
        publish: EditorActions.publish,
      },
      dispatch
    ),
  })
)(EditorSectionMetadata);
