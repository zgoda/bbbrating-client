import { useLang, useMeta, useTitle } from 'hooked-head/preact';
import { useState, useEffect } from 'preact/hooks';
import { createContext } from 'preact';
import mitt from 'mitt';
import { AuthBox } from './components/auth';
import { tokenRefresh } from './utils/auth';
import { Flash } from './components/ui';

const App = (() => {
  const appTitle = 'Piwny ranking Browar.biz';
  useLang('pl');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const PubSub = createContext(mitt());

  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const refresh = (async () => {
      const newToken = await tokenRefresh();
      setToken(newToken);
      setLoggedIn(true);
    });
    refresh();
  }, []);

  return (
    <div id="app" class="container">
      <header class="navbar">
        <section class="navbar-section">
          <a href="/" class="btn btn-link">Browar.biz</a>
        </section>
        <section class="navbar-section">
          <AuthBox token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} pubsub={PubSub} />
        </section>
      </header>
      <Flash pubsub={PubSub} />
      <h1>{appTitle}</h1>
      <div class="container">
        <div class="columns">
          <div class="col-6 col-sm-12">
            <h2>Najnowsze oceny</h2>
          </div>
          <div class="col-6 col-sm-12">
            <h2>Najpopularniejsze piwa</h2>
          </div>
        </div>
      </div>
    </div>
  )
});

export default App;
