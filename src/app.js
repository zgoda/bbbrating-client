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
      <AuthBox token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <hr />
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
