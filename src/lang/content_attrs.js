import constants from '@brudil/drafty-constants';

export const contentForm = {
  [constants.contentForm.FORM_ARTICLE]: 'Article',
  [constants.contentForm.FORM_VIDEO]: 'Video',
  [constants.contentForm.FORM_INTERACTIVE]: 'Interactive',
  [constants.contentForm.FORM_GALLERY]: 'Gallery',
};

export const contentState = {
  [constants.contentState.STATE_DRAFT]: 'Draft',
  [constants.contentState.STATE_LIVE]: 'Live',
};

export const contentStatus = {
  [constants.contentStatus.STATUS_STUB]: 'Stub',
  [constants.contentStatus.STATUS_WRITING]: 'Drafting',
  [constants.contentStatus.STATUS_REVIEW]: 'Review',
  [constants.contentStatus.STATUS_FINISHED]: 'Finished',
};

export const contentTone = {
  [constants.contentTone.TONE_CONTENT]: 'Content',
  [constants.contentTone.TONE_REVIEW]: 'Review',
  [constants.contentTone.TONE_VIEWPOINT]: 'Viewpoint',
  [constants.contentTone.TONE_STORYTELLING]: 'Storytelling',
  [constants.contentTone.TONE_INTERACTIVE]: 'Interactive',
  [constants.contentTone.TONE_GUIDE]: 'Guide',
};
