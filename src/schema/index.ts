import { schema } from 'normalizr';

const nestingOptions = {
  processStrategy(input: any, _parent: any, _key: any) {
    const keys = Object.keys(input);

    if (!keys.every(key => !key.endsWith('_nest'))) {
      const inputObject = { ...input };
      keys.forEach(key => {
        if (!key.endsWith('_nest')) {
          return;
        }

        inputObject[key.slice(0, -5)] = inputObject[key];
        delete inputObject[key];
      })
    }

    return {...input};
  },
};

export const user = new schema.Entity('users', {}, nestingOptions);
export const author = new schema.Entity('authors', {}, nestingOptions);
export const media = new schema.Entity('media', {}, nestingOptions);
export const interactive = new schema.Entity(
  'interactives',
  {},
  nestingOptions
);
export const vertical = new schema.Entity('vertical', {}, nestingOptions);
export const topic = new schema.Entity('topics', {}, nestingOptions);
export const section = new schema.Entity('sections', {}, nestingOptions);
export const content = new schema.Entity('content', {}, nestingOptions);
export const notification = new schema.Entity(
  'notifications',
  {},
  nestingOptions
);
export const contentRevision = new schema.Entity(
  'contentRevision',
  {},
  nestingOptions
);
export const contentListItem = new schema.Entity(
  'contentList',
  {},
  nestingOptions
);
export const editorialMetadata = new schema.Entity(
  'editorialMetadata',
  {},
  {
    idAttribute: 'contentId',
    ...nestingOptions,
  }
);

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
