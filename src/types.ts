import { OrganisationState } from './ducks/Organisation';
import { Topic, TopicsStore } from './ducks/Topic';
import { NotificationState } from './ducks/Notification';
import { AuthState } from './ducks/Auth';
import { Interactive, InteractivesState } from './ducks/Interactives';
import { Author, AuthorsState } from './ducks/Authors';
import {ContentListState} from "./ducks/ContentList";

export interface EntityMap<T> {
  [key: number]: T;
}

interface EntityState {
  sections: EntityMap<Object>; // todo
  media: EntityMap<Object>; // todo
  interactives: EntityMap<Interactive>;
  topics: EntityMap<Topic>; // todo
  notifications: EntityMap<Object>; // todo
  contentList: EntityMap<Object>; // todo
  authors: EntityMap<Author>;
}

export interface RootState {
  auth: AuthState;
  editor: any; // todo
  verticals: any; // todo
  organisation: OrganisationState;
  entities: EntityState;
  notification: NotificationState;
  uploadProgress: any; // todo
  toasts: any; // todo
  contentList: ContentListState; // todo
  topics: TopicsStore;
  interactives: InteractivesState;
  authors: AuthorsState;
}

export type TopicId = number;
export type ContentId = number;
export type SectionId = number;
export type RevisionId = number;

export interface BasicPayload {
  data: any;
}

export interface Filter {
  page?: number;
  limit: number;
  offset: number;
}
