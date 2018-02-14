import { normalize, schema } from 'normalizr';
import { api, clientAuth } from './client';
import * as appSchema from './schema/index';
import {
  BasicPayload,
  ContentId,
  Filter,
  RevisionId,
  SectionId,
  TopicId,
} from './types';

export class NoTokenError extends Error {}
export class AuthClient {
  static restore() {
    const jwt = localStorage.getItem('auth-token');

    if (jwt === null) {
      return null;
    }

    clientAuth.setToken(jwt);

    return api
      .get('/users/me')
      .then((data: any) => data)
      .catch((err: Error) => {
        clientAuth.removeToken();
        return err;
      });
  }

  static login(username: string, password: string) {
    return api
      .post('/auth/login', { username, password })
      .then((payload: BasicPayload) => {
        clientAuth.setToken(payload.data.token);
        return api.get('/users/me');
      });
  }

  static logout() {
    clientAuth.removeToken();
  }
}

function limitOffsetPagination(obj: Filter, limit = 30) {
  const filter = obj;
  if (filter.hasOwnProperty('page') && filter.page !== undefined) {
    const page = filter.page;
    delete filter.page;
    filter.limit = limit;
    filter.offset = (page - 1) * limit;
  }

  return filter;
}

function standardPaginatedTreats(payload: BasicPayload) {
  return {
    count: payload.data.count,
    hasNext: payload.data.next !== null,
    hasPrevious: payload.data.previous !== null,
  };
}

export class WorksClient {
  static getByFilterForVertical(vertical: string, filter: Filter, limit = 20) {
    const filterWithPagination = limitOffsetPagination(filter, limit);
    return api
      .get(`/verticals/${vertical}/content`, filterWithPagination)
      .then((payload: BasicPayload) => ({
        payload: {
          ...normalize(
            payload.data.results,
            new schema.Array(appSchema.contentListItem)
          ),
          ...standardPaginatedTreats(payload),
        },
      }));
  }

  static getRevision(id: ContentId) {
    return api
      .get(`/content/${id}/revision/current`)
      .then((payload: BasicPayload) => ({
        payload: normalize(payload.data, appSchema.contentRevision),
      }));
  }

  static getEditorialMetadata(id: ContentId) {
    return api.get(`/content/${id}/metadata`).then((payload: BasicPayload) => ({
      payload: { ...normalize(payload.data, appSchema.editorialMetadata) },
    }));
  }

  static updateEditorialMetadata(contentId: ContentId, data: any) {
    return api.put(`/content/${contentId}`, { data });
  }

  static publishRevision(revisionId: RevisionId) {
    return api
      .post(`/content/revisions/${revisionId}/publish`)
      .then((payload: BasicPayload) => ({
        payload: normalize(payload.data, appSchema.editorialMetadata),
      }));
  }

  static revisionStatusChange(revisionId: RevisionId, status: any) {
    // todo status type
    return api.post(`/content/revisions/${revisionId}/status`, {
      status,
      name: 'james',
    });
  }

  static saveRevision(revision: any) {
    // todo
    return api
      .post(`/content/${revision.content}/revision`, revision)
      .then((payload: BasicPayload) => ({
        payload: normalize(payload.data, appSchema.contentRevision),
      }));
  }

  static saveNewContent(vertical: string, localRevision: any) {
    // todo
    return api
      .post(`/verticals/${vertical}/content`, localRevision)
      .then((payload: BasicPayload) => ({
        payload: normalize(payload.data, appSchema.contentRevision),
      }));
  }
}

export class UserClient {
  static search(term: string) {
    return api
      .get('/users', { search: term, limit: 10 })
      .then((payload: BasicPayload) => ({
        payload: normalize(
          payload.data.results,
          new schema.Array(appSchema.user)
        ),
      }));
  }
}

export class AuthorClient {
  static search(vertical: string, term: string) {
    return api
      .get(`/verticals/${vertical}/authors`, { search: term, limit: 100 })
      .then((payload: BasicPayload) => ({
        payload: normalize(
          payload.data.results,
          new schema.Array(appSchema.author)
        ),
      }));
  }
}

export class NotificationClient {
  static getUnreadCount() {
    return api.get('/notifications/unread/count');
  }

  static getUnread() {
    return api
      .get('/notifications/unread')
      .then((payload: BasicPayload) =>
        normalize(payload.data, new schema.Array(appSchema.notification))
      );
  }
}

export class SectionsClient {
  static getAll(vertical: string) {
    return api
      .get(`/verticals/${vertical}/sections`, { limit: 100, offset: 0 })
      .then((payload: BasicPayload) =>
        normalize(payload.data.results, new schema.Array(appSchema.section))
      );
  }

  static getTopicsFor(sectionId: SectionId) {
    return api
      .get(`/sections/${sectionId}/topics`, { limit: 100, offset: 0 })
      .then((payload: BasicPayload) =>
        normalize(payload.data.results, new schema.Array(appSchema.topic))
      );
  }

  static update(sectionId: SectionId, data: any) {
    // todo
    return api
      .put(`/sections/${sectionId}`, data)
      .then((payload: BasicPayload) =>
        normalize(payload.data, appSchema.section)
      );
  }

  static create(vertical: string, data: any) {
    // todo
    return api
      .post(`/verticals/${vertical}/sections`, data)
      .then((payload: BasicPayload) =>
        normalize(payload.data, appSchema.section)
      );
  }
}

export class TopicsClient {
  static update(topicId: TopicId, data: any) {
    return api
      .put(`/topics/${topicId}`, data)
      .then((payload: BasicPayload) =>
        normalize(payload.data, appSchema.topic)
      );
  }

  static create(sectionId: SectionId, data: any) {
    return api
      .post('/topics', { ...data, section: sectionId })
      .then((payload: BasicPayload) =>
        normalize(payload.data, appSchema.topic)
      );
  }

  static forKeyword(vertical: string, keyword: string) {
    return api
      .get(`/verticals/${vertical}/topics`, { search: keyword })
      .then((payload: BasicPayload) =>
        normalize(payload.data, new schema.Array(appSchema.topic))
      );
  }
}
export class VerticalClient {
  static getAll() {
    return api.get('/verticals').then((payload: BasicPayload) => payload.data);
  }
}

export class MediaClient {
  static getByFilter(vertical: string, filter: Filter, limit: number) {
    const filterWithPagination = limitOffsetPagination(filter, limit);
    return api
      .get(`/verticals/${vertical}/media`, filterWithPagination)
      .then((payload: BasicPayload) => ({
        payload: {
          ...normalize(payload.data.results, new schema.Array(appSchema.media)),
          ...standardPaginatedTreats(payload),
        },
      }));
  }

  static get(id: number) {
    return api.get(`/media/${id}`);
  }

  static convertForGraphQL(obj: any) {
    // todo
    /* eslint-disable */
    obj.object = obj.type_data;
    obj.resourceName = obj.resource_name;

    /* eslint-enable */
    return obj;
  }

  static getMultiple(ids: number[]) {
    return api.get('/media', { ids }).then((payload: BasicPayload) => ({
      ...normalize(
        payload.data.map(MediaClient.convertForGraphQL),
        new schema.Array(appSchema.media)
      ),
      count: payload.data.count,
    }));
  }

  static update(id: number, data: any) {
    // todo
    return api.put(`/media/${id}`, data);
  }

  static delete(id: number) {
    return api.delete(`/media/${id}`);
  }

  static upload(vertical: string, file: File) {
    // todo; check file is the right type here
    const form = new FormData();
    form.append('file', file);

    return api
      .post(`/verticals/${vertical}/media`, form)
      .then((payload: BasicPayload) => ({
        payload: normalize(payload.data, appSchema.media),
      }));
  }
}

export class InteractivesClient {
  static getByFilter(filter: Filter, limit: number) {
    const filterWithPagination = limitOffsetPagination(filter, limit);
    return api
      .get(`/interactives`, filterWithPagination)
      .then((payload: BasicPayload) => ({
        payload: {
          ...normalize(payload.data, new schema.Array(appSchema.interactive)),
          ...standardPaginatedTreats(payload),
        },
      }));
  }

  static get(slug: string) {
    return api.get(`/interactives/${slug}`);
  }

  static getMultiple(slugs: string[]) {
    return api
      .get('/interactives', { slugs })
      .then((payload: BasicPayload) => ({
        ...normalize(payload.data, new schema.Array(appSchema.interactive)),
        count: payload.data.count,
      }));
  }

  static update(slug: string, data: any) {
    return api.put(`/interactives/${slug}`, data);
  }

  static delete(slug: string) {
    return api.delete(`/interactives/${slug}`);
  }
}
