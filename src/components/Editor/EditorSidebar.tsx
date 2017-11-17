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
  contentTone,
} from '../../libs/constants';
import * as contentLang from '../../lang/content_attrs';

import { SidebarInput } from '../Sidebar';

const SidebarSlugInput: any = SidebarInput.withComponent(SlugInput);
const SidebarDebouncedAutosizeTextarea: any = SidebarInput.withComponent(DebouncedAutosizeTextarea);
const SidebarDebouncedInput: any = SidebarInput.withComponent(DebouncedInput);

interface IProps {
  workingRevision: any; // todo
  editorialMetadata: any; // todo
  vertical: any; // todo
  isLocal: any; // todo
  revisionChangeHandler: any; // todo
}

function EditorSidebar(props: IProps) {
  const {
    workingRevision,
    editorialMetadata,
    vertical,
    isLocal,
    revisionChangeHandler,
  } = props;
  const revision = workingRevision;

  if (!isLocal && !editorialMetadata) {
    return null;
  }

  return (
    <Sidebar>
      <SidebarControl
        title="Slug"
        charLimit={60}
        charCount={revision.get('slug').length}
        buttonTreats={[
          {
            children: 'Auto from headline',
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
          {intersection(
            vertical.content_forms,
            values(contentForm)
          ).map(key => (
            <option value={key} key={key}>
              {contentLang.contentForm[key]}
            </option>
          ))}
        </select>
      </SidebarControl>
      <SidebarControl title="Tone">
        <select
          value={revision.get('tone')}
          onChange={revisionChangeHandler('tone', formly.event, formly.int)}
        >
          {intersection(
            vertical.content_tones,
            values(contentTone)
          ).map(key => (
            <option value={key} key={key}>
              {contentLang.contentTone[key]}
            </option>
          ))}
        </select>
      </SidebarControl>
      <SidebarControl
        title="Short Headline"
        charLimit={60}
        charCount={revision.get('short_headline').length}
        buttonTreats={[
          {
            children: 'Auto from headline',
            onClick: () => {
              revisionChangeHandler('short_headline')(revision.get('headline'));
            },
          },
        ]}
      >
        <SidebarDebouncedInput
          type="text"
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
        <SidebarDebouncedInput
          type="text"
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
  );
}

export default EditorSidebar;
