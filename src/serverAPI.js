import { normalize, arrayOf } from 'normalizr';
import { api, clientAuth } from './client';
import * as schema from './schema/index';

export class NoTokenError extends Error {}
export class AuthClient {
  static restore() {
    const jwt = localStorage.getItem('auth-token');

    if (jwt === null) {
      return null;
    }

    clientAuth.setToken(jwt);

    return api.get('/users/me').then(data => data).catch(err => {
      clientAuth.removeToken();
      return err;
    });
  }

  static login(username, password) {
    return api.post('/auth/login', { username, password }).then(payload => {
      clientAuth.setToken(payload.data.token);
      return api.get('/users/me');
    });
  }

  static logout() {
    clientAuth.removeToken();
  }
}

function limitOffsetPagination(obj, limit = 30) {
  const filter = obj;
  if ({}.hasOwnProperty.call(filter, 'page')) {
    const page = filter.page;
    delete filter.page;
    filter.limit = limit;
    filter.offset = (page - 1) * limit;
  }

  return filter;
}

function standardPaginatedTreats(payload) {
  return {
    count: payload.data.count,
    hasNext: payload.data.next !== null,
    hasPrevious: payload.data.previous !== null,
  };
}

export class WorksClient {
  static getByFilterForVertical(vertical, filter, limit = 5) {
    const filterWithPagination = limitOffsetPagination(filter, limit);
    return api
      .get(`/verticals/${vertical}/content`, filterWithPagination)
      .then(payload => ({
        payload: {
          ...normalize(payload.data.results, arrayOf(schema.contentListItem)),
          ...standardPaginatedTreats(payload),
        },
      }));
  }

  static getRevision(id) {
    return api.get(`/content/${id}/revision/current`).then(payload => ({
      payload: normalize(payload.data, schema.contentRevision),
    }));
  }

  static getEditorialMetadata(id) {
    return api.get(`/content/${id}/metadata`).then(payload => ({
      payload: { ...normalize(payload.data, schema.editorialMetadata) },
    }));
  }

  static updateEditorialMetadata(contentId, data) {
    return api.put(`/content/${contentId}`, { data });
  }

  static publishRevision(revisionId) {
    return api
      .post(`/content/revisions/${revisionId}/publish`)
      .then(payload => ({
        payload: normalize(payload.data, schema.editorialMetadata),
      }));
  }

  static revisionStatusChange(revisionId, status) {
    console.log(status);
    return api.post(`/content/revisions/${revisionId}/status`, {
      status,
      name: 'james',
    });
  }

  static saveRevision(revision) {
    return api
      .post(`/content/${revision.content}/revision`, revision)
      .then(payload => ({
        payload: normalize(payload.data, schema.contentRevision),
      }));
  }

  static saveNewContent(vertical, localRevision) {
    return api
      .post(`/verticals/${vertical}/content`, localRevision)
      .then(payload => ({
        payload: normalize(payload.data, schema.contentRevision),
      }));
  }
}

export class UserClient {
  static search(term) {
    return api.get('/users', { search: term, limit: 10 }).then(payload => ({
      payload: normalize(payload.data.results, arrayOf(schema.user)),
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
      .then(payload => normalize(payload.data, arrayOf(schema.notification)));
  }
}

export class SectionsClient {
  static getAll(vertical) {
    return api
      .get(`/verticals/${vertical}/sections`, { limit: 100, offset: 0 })
      .then(payload =>
        normalize(payload.data.results, arrayOf(schema.section))
      );
  }

  static getTopicsFor(sectionId) {
    return api
      .get(`/sections/${sectionId}/topics`, { limit: 100, offset: 0 })
      .then(payload => normalize(payload.data.results, arrayOf(schema.topic)));
  }

  static update(sectionId, data) {
    return api
      .put(`/sections/${sectionId}`, data)
      .then(payload => normalize(payload.data, schema.section));
  }

  static create(vertical, data) {
    return api
      .post(`/verticals/${vertical}/sections`, data)
      .then(payload => normalize(payload.data, schema.section));
  }
}

export class TopicsClient {
  static update(topicId, data) {
    return api
      .put(`/topics/${topicId}`, data)
      .then(payload => normalize(payload.data, schema.topic));
  }

  static create(sectionId, data) {
    return api
      .post('/topics', { ...data, section: sectionId })
      .then(payload => normalize(payload.data, schema.topic));
  }

  static forKeyword(vertical, keyword) {
    return api
      .get(`/verticals/${vertical}/topics`, { search: keyword })
      .then(payload => normalize(payload.data, arrayOf(schema.topic)));
  }
}
export class VerticalClient {
  static getAll() {
    return api.get('/verticals').then(payload => payload.data);
  }
}

export class MediaClient {
  static getByFilter(vertical, filter, limit) {
    const filterWithPagination = limitOffsetPagination(filter, limit);
    return api
      .get(`/verticals/${vertical}/media`, filterWithPagination)
      .then(payload => ({
        payload: {
          ...normalize(payload.data.results, arrayOf(schema.media)),
          ...standardPaginatedTreats(payload),
        },
      }));
  }

  static get(id) {
    return api.get(`/media/${id}`);
  }

  static getMultiple(ids) {
    return api.get('/media', { ids }).then(payload => ({
      ...normalize(payload.data, arrayOf(schema.media)),
      count: payload.data.count,
    }));
  }

  static update(id, data) {
    return api.put(`/media/${id}`, { data });
  }

  static upload(vertical, file) {
    const form = new FormData();
    form.append('file', file);

    return api.post(`/verticals/${vertical}/media`, form).then(payload => ({
      payload: normalize(payload.data, schema.media),
    }));
  }
}
