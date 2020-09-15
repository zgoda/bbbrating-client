import { useLang, useMeta, useTitle } from 'hooked-head/preact';
import { useState } from 'preact/hooks';
import { Login } from './components/login';

const App = (() => {
  const appTitle = 'Piwny ranking Browar.biz';
  useLang('pl');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });
  const [token, setToken] = useState('');
  return (
    <div id="app" class="container">
      <Login token={token} setToken={setToken} />
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
