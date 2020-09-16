import { useEffect, useState } from 'preact/hooks';
import { tokenRefresh, login } from '../utils/auth';

const Login = (({ token, setToken }) => {
  const [loggedIn, setLoggedIn] = useState(false);
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
    setToken(newToken);
    setLoggedIn(true);
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

export { Login };
