import { schema } from 'normalizr';

const nestingOptions = {
  assignEntity(obj, key, value) {
    if (key.endsWith('_nest')) {
      // eslint-disable-next-line no-param-reassign
      delete obj[key];
      // eslint-disable-next-line no-param-reassign
      obj[key.slice(0, -5)] = value;
    }
  },
};

export const user = new schema.Entity('users', nestingOptions);
export const author = new schema.Entity('authors', nestingOptions);
export const media = new schema.Entity('media', nestingOptions);
export const interactive = new schema.Entity('interactives', nestingOptions);
export const vertical = new schema.Entity('vertical', nestingOptions);
export const topic = new schema.Entity('topics', nestingOptions);
export const section = new schema.Entity('sections', nestingOptions);
export const content = new schema.Entity('content', nestingOptions);
export const notification = new schema.Entity('notifications', nestingOptions);
export const contentRevision = new schema.Entity(
  'contentRevision',
  nestingOptions
);
export const contentListItem = new schema.Entity('contentList', nestingOptions);
export const editorialMetadata = new schema.Entity('editorialMetadata', {
  idAttribute: 'contentId',
  ...nestingOptions,
});

media.define({
  uploader: user,
});

topic.define({
  section,
});

contentRevision.define({
  authors_nest: new schema.Array(user),
  posterImage: media,
});

contentListItem.define({});
