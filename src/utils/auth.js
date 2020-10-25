import Cookies from 'universal-cookie';

async function tokenRefresh() {
  const url = '/api/token/refresh';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
  });
  const ret = { accessToken: '', error: '' };
  const data = await resp.json();
  if (resp.ok) {
    ret.accessToken = data.accessToken;
  } else {
    ret.error = data.error;
  }
  return ret;
}

async function login(email, password) {
  const url = '/api/login';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });
  const ret = { accessToken: '', error: '' };
  const data = await resp.json();
  if (resp.ok) {
    ret.accessToken = data.accessToken;
  } else {
    ret.error = data.error;
  }
  return ret
}

async function register(email, password, name) {
  const url = '/api/users';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    body: JSON.stringify({ email, name, password }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const ret = { accessToken: '', error: '' };
  const data = await resp.json();
  if (resp.ok) {
    ret.accessToken = data.accessToken;
  } else {
    ret.error = data.error;
  }
  return ret
}

async function logout() {
  const cookies = new Cookies();
  const csrfCookie = cookies.get('csrf_refresh_token');
  if (csrfCookie) {
    const url = '/api/logout';
    const resp = await fetch(url, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'X-CSRF-Token': csrfCookie
      }
    });
    if (!resp.ok) {
      return false;
    }
  }
  return true;
}

export { tokenRefresh, login, register, logout };
