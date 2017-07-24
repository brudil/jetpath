import PropTypes from 'prop-types';
import React from 'react';
import values from 'lodash/values';
import intersection from 'lodash/intersection';
import DebouncedInput from '../DebouncedInput';
import DebouncedAutosizeTextarea from '../DebouncedAutosizeTextarea';
import MediaInput from '../MediaInput';
import SlugInput from '../SlugInput';
import AuthorsSelector from '../AuthorsSelector';
import Sidebar, { SidebarControl } from '../Sidebar';
import SectionSelector from '../SectionSelector';
import TopicsSelector from '../TopicsSelector';
import { formly } from '../../libs/form';
import {
  contentForm,
  contentStatus,
  contentState,
  contentTone,
} from '@brudil/drafty-constants';
import * as contentLang from '../../lang/content_attrs';

import stylesSidebar from '../Sidebar/Sidebar.css';

function EditorSidebar(props) {
  const {
    workingRevision,
    editorialMetadata,
    vertical,
    isLocal,
    revisionChangeHandler,
  } = props;
  const { onAddAuthor, onRemoveAuthor } = props;
  const revision = workingRevision;

  if (!isLocal && !editorialMetadata) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarControl title="Slug">
        <SlugInput
          className={stylesSidebar.input}
          value={revision.get('slug')}
          autoValue={revision.headline}
          removeStopWords
          onChange={revisionChangeHandler('slug')}
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
          {intersection(vertical.content_forms, values(contentForm)).map(key =>
            <option value={key} key={key}>
              {contentLang.contentForm[key]}
            </option>
          )}
        </select>
      </SidebarControl>
      <SidebarControl title="Tone">
        <select
          value={revision.get('tone')}
          onChange={revisionChangeHandler('tone', formly.event, formly.int)}
        >
          {intersection(vertical.content_tones, values(contentTone)).map(key =>
            <option value={key} key={key}>
              {contentLang.contentTone[key]}
            </option>
          )}
        </select>
      </SidebarControl>
      <SidebarControl title="Short Headline">
        <DebouncedInput
          className={stylesSidebar.input}
          type="text"
          value={revision.get('short_headline')}
          onChange={revisionChangeHandler('short_headline', formly.event)}
        />
      </SidebarControl>
      <SidebarControl title="Kicker">
        <DebouncedInput
          className={stylesSidebar.input}
          type="text"
          value={revision.get('kicker')}
          onChange={revisionChangeHandler('kicker', formly.event)}
        />
      </SidebarControl>
      <SidebarControl title="Standfirst">
        <DebouncedAutosizeTextarea
          className={stylesSidebar.input}
          value={revision.get('standfirst')}
          onChange={revisionChangeHandler('standfirst', formly.event)}
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
  );
}

EditorSidebar.propTypes = {
  workingRevision: PropTypes.object,
  savedRevision: PropTypes.object,
  vertical: PropTypes.object.isRequired,
  editorialMetadata: PropTypes.object,
  isLocal: PropTypes.bool.isRequired,
  hasChangesFromSaved: PropTypes.bool.isRequired,
  revisionChangeHandler: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onChangeStatus: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  onAddAuthor: PropTypes.func.isRequired,
  onRemoveAuthor: PropTypes.func.isRequired,
};

export default EditorSidebar;
