import qs from 'query-string';
import settings from './settings';

function mk() {
  let token = localStorage.getItem('auth-token');
  return {
    getToken: () => token,
    removeToken: () => localStorage.removeItem('auth-token'),
    setToken: (aToken: string) => {
      localStorage.setItem('auth-token', aToken);
      token = aToken;
    },
  };
}

export const clientAuth = mk();

export function fetchWrapper(
  method: string,
  resource: string,
  dataOrParams: Object | FormData | null = null
) {
  const isFile = dataOrParams !== null && dataOrParams instanceof FormData;

  const headers = new Headers();
  if (clientAuth.getToken()) {
    headers.append('Authorization', `Bearer ${clientAuth.getToken()}`);
  }
  headers.append('Accept', 'application/json');
  if (!isFile) {
    headers.append('Content-Type', 'application/json');
  }

  const urlPath = `${resource}/`;

  const additional: { method: string; body?: Object; headers: Headers } = {
    method,
    headers,
  };
  let qss = '';
  if (['GET', 'HEAD'].indexOf(method) === -1 && dataOrParams) {
    if (isFile) {
      additional.body = dataOrParams;
    } else {
      additional.body = JSON.stringify(dataOrParams);
    }
  } else if (dataOrParams) {
    qss = `?${qs.stringify(dataOrParams, { arrayFormat: 'bracket' })}`;
  }

  return fetch(
    `${settings.lowdownHost}/manage${urlPath}${qss}`,
    additional
  ).then(response => {
    const contentType = response.headers.get('content-type');
    if (
      contentType &&
      contentType.indexOf('application/json') !== -1 &&
      response.status !== 204
    ) {
      return response.json().then(
        json =>
          response.ok
            ? json
            : Promise.reject({
                json,
              })
      );
    }

    return response
      .text()
      .then((text: any) => (response.ok ? text : Promise.reject({ text })));
  });
}

export const api = {
  get: fetchWrapper.bind({}, 'GET'),
  post: fetchWrapper.bind({}, 'POST'),
  put: fetchWrapper.bind({}, 'PUT'),
  delete: fetchWrapper.bind({}, 'DELETE'),
};
