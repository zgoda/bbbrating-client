import { useLang, useMeta, useTitle } from 'hooked-head/preact';
import { useState } from 'preact/hooks';
import { AuthBox } from './components/auth';

const App = (() => {
  const appTitle = 'Piwny ranking Browar.biz';
  useLang('pl');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });

  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div id="app" class="container">
      <header class="navbar">
        <section class="navbar-section">
          <a href="/" class="btn btn-link">Browar.biz</a>
        </section>
        <section class="navbar-section">
          <AuthBox token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
        </section>
      </header>
      <h1>{appTitle}</h1>
      <div class="row">
        <div class="column">
          <h2>Najnowsze recenzje</h2>
        </div>
        <div class="column">
          <h2>Najpopularniejsze piwa</h2>
        </div>
      </div>
    </div>
  )
});

export default App;
