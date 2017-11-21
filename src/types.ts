import { OrganisationState } from './ducks/Organisation';
import { TopicsStore } from './ducks/Topic';

interface EntityMap {
  [key: number]: Object;
}

interface EntityState {
  sections: EntityMap;
  media: EntityMap;
  interactives: EntityMap;
  topics: EntityMap;
}

export interface RootState {
  auth: any; // todo
  editor: any; // todo
  verticals: any; // todo
  organisation: OrganisationState;
  entities: EntityState;
  notification: any; // todo
  uploadProgress: any; // todo
  toasts: any; // todo
  topics: TopicsStore;
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
