import { useEffect, useState, useRef, useContext } from 'preact/hooks';
import { UserPlus, LogIn } from 'preact-feather';
import { tokenRefresh, login, register, logout } from '../utils/auth';

const SignInForm = (({ token, setToken, loggedIn, setLoggedIn, emit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const msg = 'To pole jest wymagane';
    let validationErrors = { email: '', password: '' };
    if (!email) {
      validationErrors.email = msg;
    }
    if (!password) {
      validationErrors.password = msg;
    }
    setErrors(validationErrors);
  }, [email, password]);

  useEffect(() => {
    const refresh = (async () => {
      if (token) {
        const { accessToken, error } = await tokenRefresh();
        if (accessToken) {
          setToken(accessToken);
          setLoggedIn(true);
          emit('signin', { category: 'success', message: 'Zostałeś pomyślnie zalogowany' });
        } else {
          emit('signin', { category: 'error', message: error });
        }
      }
    });
    refresh();
  }, [setLoggedIn, setToken, token, loggedIn, emit]);

  const handleSubmit = ((e) => {
    e.preventDefault();

    const doLogin = (async () => {
      const { accessToken, error } = await login(email, password);
      if (accessToken) {
        setToken(accessToken);
        setLoggedIn(true);
        emit('signin', { category: 'success', message: 'Zostałeś pomyślnie zalogowany' });
      } else {
        emit('signin', { category: 'error', message: error });
      }
    });
  
    doLogin();
    setFormVisible(false);
  });

  if (loggedIn) {
    return <p>Zalogowany</p>
  }
  return (
    <>
      <a class="btn btn-link" onClick={() => setFormVisible(!formVisible)}>logowanie</a>
      {formVisible && <div class="modal active">
        <a class="modal-overlay" aria-label="Zamknij" onClick={() => setFormVisible(false)} />
        <div class="modal-container">
          <div class="modal-header">
            <a class="btn btn-clear float-right" aria-label="Zamknij" onClick={() => setFormVisible(false)} />
          </div>
          <div class="modal-body">
            <form class="form-horizontal" onSubmit={handleSubmit}>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label for="email" class="form-label">email</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="email" value={email} onInput={(e) => setEmail(e.target.value)} name="email" required={true} />
                  {errors.email && <p class="field-error-label">{errors.email}</p>}
                </div>
              </div>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label for="password" class="form-label">hasło</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="password" value={password} onInput={(e) => setPassword(e.target.value)} name="password" required={true} autocomplete="current-password" />
                  {errors.password && <p class="field-error-label">{errors.password}</p>}
                </div>
              </div>
              <div class="form-group">
                <div class="col-mx-auto">
                  <button class="btn btn-primary" type="submit"><LogIn size={16} /> zaloguj</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </>
  );
});

const RegisterForm = (({ setToken, setLoggedIn, emit }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [formVisible, setFormVisible] = useState(false);
  const [errors, setErrors] = useState({email: '', password: '', form: ''});

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    let validationErrors = {email: '', password: ''};
    if (!email) {
      validationErrors.email = 'To pole jest wymagane';
    }
    if (password2 !== password) {
      validationErrors.password = 'Wpisane hasła nie są identyczne';
    }
    setErrors(validationErrors);
  }, [email, password, password2]);

  const doRegister = (() => {
    register(email, password, name).then((resp) => {
      return resp;
    })
  });

  const handleSubmit = ((e) => {
    e.preventDefault();
    const { accessToken, error } = doRegister();
    if (accessToken) {
      setToken(accessToken);
      setLoggedIn(true);
      emit('register', { category: 'success', message: 'Konto zostało zarejestrowane' });
    } else {
      emit('register', { category: 'error', message: error });
    }
  })

  return (
    <>
      <a class="btn btn-link" onClick={() => setFormVisible(!formVisible)}>rejestracja</a>
      {formVisible && <div class="modal active">
        <a class="modal-overlay" aria-label="Zamknij" onClick={() => setFormVisible(false)} />
        <div class="modal-container">
          <div class="modal-header">
            <a class="btn btn-clear float-right" aria-label="Zamknij" onClick={() => setFormVisible(false)} />
          </div>
          <div class="modal-body">
            <form class="form-horizontal" onSubmit={handleSubmit}>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label class="form-label" for="email">email</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="email" name="email" value={email} onInput={(e) => setEmail(e.target.value)} required={true} />
                  {errors.email && <p class="field-error-label">{errors.email}</p>}
                </div>
              </div>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label class="form-label" for="name">nazwa użytkownika</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="text" name="name" value={name} onInput={(e) => setName(e.target.value)} />
                </div>
              </div>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label class="form-label" for="password">hasło</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="password" name="password" value={password} onInput={(e) => setPassword(e.target.value)} required={true} autocomplete="new-password" />
                  {errors.password && <p class="field-error-label">{errors.password}</p>}
                </div>
              </div>
              <div class="form-group">
                <div class="col-3 col-sm-12">
                  <label class="form-label" for="password2">hasło (powtórz)</label>
                </div>
                <div class="col-9 col-sm-12">
                  <input class="form-input" type="password" name="password2" value={password2} onInput={(e) => setPassword2(e.target.value)} required={true} />
                </div>
              </div>
              <div class="form-group">
                <div class="col-mx-auto">
                  <button class="btn btn-primary" type="submit"><UserPlus size={16} /> zarejestruj</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>}
    </>
  )
});

const SignOut = (({ setToken, setLoggedIn, emit }) => {
  const doLogout = (async () => {
    const rv = await logout();
    return rv;
  });

  const handleClick = (() => {
    doLogout().then((val) => {
      if (val) {
        setToken('');
        setLoggedIn(false);
        emit('signout', { category: 'success', message: 'Zostałeś wylogowany' })
      }
    })
  });

  return (
    <a class="btn btn-link" onClick={handleClick}>wylogowanie</a>
  )
});

const AuthBox = (({ token, setToken, loggedIn, setLoggedIn, pubsub }) => {
  const events = useContext(pubsub);
  if (loggedIn) {
    return <SignOut setToken={setToken} setLoggedIn={setLoggedIn} emit={events.emit} />
  }
  return (
    <>
      <SignInForm token={token} setToken={setToken} loggedIn={loggedIn} setLoggedIn={setLoggedIn} emit={events.emit} />
      <RegisterForm setToken={setToken} setLoggedIn={setLoggedIn} emit={events.emit} />
    </>
  )
});

export { AuthBox };
