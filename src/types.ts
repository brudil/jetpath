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

interface Notification {
  id: number;
}

interface EntityState {
  sections: EntityMap<Object>; // todo
  media: EntityMap<Object>; // todo
  interactives: EntityMap<Interactive>;
  topics: EntityMap<Topic>; // todo
  notifications: EntityMap<Notification>; // todo
  contentList: EntityMap<Object>; // todo
  authors: EntityMap<Author>;
}

export interface Vertical {
  identifier: string;
  name: string;
  audience: string;
}

export interface RootState {
  auth: AuthState;
  editor: any; // todo
  verticals: any;
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


export interface MediaObject {
  id: string;
  mediaId: number;
  object: { width: number; height: number };
  fileType: string;
  file_type: string;
  mime: string;
  resourceName: string;
  directUrl: string;
  deleted: boolean;
}
