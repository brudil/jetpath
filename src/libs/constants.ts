export enum Form {
  Article = 1,
  Video = 2,
  Interactive = 3,
  Gallery = 4,
}


export enum State {
  Draft = 1,
  Live = 9
}

export enum Status {
  Stub = 1,
  Writing = 5,
  Review = 7,
  Finished = 9
}

export enum Tone {
  Content = 1,
  Review = 2,
  Viewpoint = 3,
  Storytelling = 4,
  Interactive = 5,
  Guide = 6
}

export const contentForm = {
  FORM_ARTICLE: 1,
  FORM_VIDEO: 2,
  FORM_INTERACTIVE: 3,
  FORM_GALLERY: 4
};


export const contentTone = {
  TONE_CONTENT: 1,
  TONE_REVIEW: 2,
  TONE_VIEWPOINT: 3,
  TONE_STORYTELLING: 4,
  TONE_INTERACTIVE: 5,
  TONE_GUIDE: 6
};
