import { useLang, useMeta, useTitle } from 'hooked-head/preact';

const App = (() => {
  const appTitle = 'Piwny ranking Browar.biz';
  useLang('pl');
  useTitle(appTitle);
  useMeta({ name: 'author', content: 'Jarek Zgoda' });
  return (
    <div id="app">
      <h1>{appTitle}</h1>
    </div>
  )
});

export default App;
