async function tokenRefresh() {
  const url = '/api/token/refresh';
  const resp = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
  });
  if (resp.ok) {
    const data = await resp.json();
    return data.accessToken;
  };
};

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
};

export { tokenRefresh, login };
