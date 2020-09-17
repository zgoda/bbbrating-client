import { useEffect, useState } from 'preact/hooks';
import { UserPlus, LogIn } from 'preact-feather';
import { tokenRefresh, login, register, logout } from '../utils/auth';

const SignIn = (({ token, setToken, loggedIn, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    const refresh = (async () => {
      if (token) {
        const newToken = await tokenRefresh();
        setToken(newToken);
        setLoggedIn(true);
      }
    });
    refresh();
  }, [setLoggedIn, setToken, token, loggedIn]);

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
      <button class="button button-outline" onClick={() => setFormVisible(!formVisible)}>logowanie</button>
      {formVisible && <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="row">
            <div class="column">
              <label for="email">email</label>
              <input type="email" value={email} onInput={(e) => setEmail(e.target.value)} name="email" required={true} />
            </div>
            <div class="column">
              <label for="password">hasło</label>
              <input type="password" value={password} onInput={(e) => setPassword(e.target.value)} name="password" required={true} autocomplete="current-password" />
            </div>
          </div>
          <button class="button" type="submit"><LogIn size={16} /> zaloguj</button>
        </fieldset>
      </form>}
    </div>
  );
});

const Register = (({ setToken, setLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [formVisible, setFormVisible] = useState(false);

  const doRegister = (async () => {
    const token = await register(email, password, name);
    return token;
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
      <button class="button button-outline" onClick={() => setFormVisible(!formVisible)}>rejestracja</button>
      {formVisible && <form onSubmit={handleSubmit}>
        <fieldset>
          <div class="row">
            <div class="column">
              <label for="email">email</label>
              <input type="email" name="email" value={email} onInput={(e) => setEmail(e.target.value)} required={true} />
            </div>
            <div class="column">
              <label for="name">nazwa użytkownika</label>
              <input type="text" name="name" value={name} onInput={(e) => setName(e.target.value)} />
            </div>
            <div class="column">
              <label for="password">hasło</label>
              <input type="password" name="password" value={password} onInput={(e) => setPassword(e.target.value)} required={true} autocomplete="new-password" />
            </div>
            <div class="column">
              <label for="password2">hasło (powtórz)</label>
              <input type="password" name="password2" value={password2} onInput={(e) => setPassword2(e.target.value)} required={true} />
            </div>
          </div>
          <button class="button"><UserPlus size={16} /> zarejestruj</button>
        </fieldset>
      </form>}
    </div>
  )
});

const SignOut = (({ setToken, setLoggedIn }) => {
  const doLogout = (async () => {
    const rv = await logout();
    return rv;
  });

  const handleClick = (() => {
    if (doLogout()) {
      setToken('');
      setLoggedIn(false)
    }
  });

  return (
    <div>
      <button class="button button-outline" onClick={handleClick}>wylogowanie</button>
    </div>
  )
});

const AuthBox = (({ token, setToken, loggedIn, setLoggedIn }) => {
  if (loggedIn) {
    return <SignOut setToken={setToken} setLoggedIn={setLoggedIn} />
  }
  return (
    <>
      <SignIn token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Register setToken={setToken} setLoggedIn={setLoggedIn} />
    </>
  )
});

export { AuthBox };
