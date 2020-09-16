import { useEffect, useState } from 'preact/hooks';
import { tokenRefresh, login } from '../utils/auth';
import Cookies from 'universal-cookie';

const Login = (({ token, setToken, loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const refresh = (async () => {
    if (token) {
      const newToken = await tokenRefresh();
      setToken(newToken);
      setLoggedIn(true);
    }
  });

  useEffect(() => {
    refresh();
  }, []);

  const doLogin = (async () => {
    const newToken = await login(email, password);
    if (newToken) {
      setToken(newToken);
      setLoggedIn(true);
    }
  });

  const handleSubmit = ((e) => {
    e.preventDefault();
    doLogin();
  });

  if (loggedIn) {
    return <p>Zalogowany</p>
  }
  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="row">
            <div class="column">
              <label for="email">email</label>
              <input type="text" value={email} onInput={(e) => setEmail(e.target.value)} name="email" />
            </div>
            <div class="column">
              <label for="password">hasło</label>
              <input type="password" value={password} onInput={(e) => setPassword(e.target.value)} name="password" />
            </div>
          </div>
          <button class="button-primary" type="submit">zaloguj</button>
        </fieldset>
      </form>
    </div>
  );
});

const Register = (({ setToken, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const doRegister = (async () => {
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
  });

  const handleSubmit = ((e) => {
    e.preventDefault();
    const newToken = doRegister();
    if (newToken) {
      setToken(newToken);
      setLoggedIn(true);
    }
  })

  return (
    <div class="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <label for="email">email</label>
          <input type="text" name="email" value={email} onInput={(e) => setEmail(e.target.value)} />
          <label for="name">nazwa użytkownika</label>
          <input type="text" name="name" value={name} onInput={(e) => setName(e.target.value)} />
          <label for="password">hasło</label>
          <input type="password" name="password" value={password} onInput={(e) => setPassword(e.target.value)} />
          <button class="button-primary">zarejestruj</button>
        </fieldset>
      </form>
    </div>
  )
});

const LogOut = (({ setToken, setLoggedIn }) => {
  const doLogout = (async () => {
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
  });

  const handleClick = ((e) => {
    e.preventDefault();
    if (doLogout()) {
      setToken('');
      setLoggedIn(false)
    }
  });

  return (
    <div>
      <button class="button-primary" onClick={handleClick}>wyloguj</button>
    </div>
  )
});

const AuthBox = (({ token, setToken, loggedIn, setLoggedIn }) => {
  if (loggedIn) {
    return <LogOut setToken={setToken} setLoggedIn={setLoggedIn} />
  }
  return (
    <>
      <Login token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Register setToken={setToken} setLoggedIn={setLoggedIn} />
    </>
  )
});

export { AuthBox };
