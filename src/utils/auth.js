import Cookies from 'universal-cookie';

async function tokenRefresh() {
  const url = '/api/token/refresh';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
  });
  if (resp.ok) {
    const data = await resp.json();
    return data.accessToken;
  }
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
  const data = await resp.json();
  if (resp.ok) {
    return data.accessToken;
  }
  console.log(resp.status, data.error);
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
  if (resp.ok) {
    const data = await resp.json();
    return data.accessToken;
  }
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
    if (resp.ok) {
      return true;
    }
  }
  return false;
}

export { tokenRefresh, login, register, logout };
