import { useState, useCallback, useEffect } from 'preact/hooks';

function useForm(stateSchema, validationSchema = {}, callback) {
  const [state, setState] = useState(stateSchema);
  const [disabled, setDisabled] = useState(true);
  const [isDirty, setDirty] = useState(false);

  useEffect(() => {
    setDisabled(true);
  }, []);

  useEffect(() => {
    if (isDirty) {
      setDisabled(validateState());
    }
  }, [state, isDirty, validateState]);

  const validateState = useCallback(() => {
    const hasErrorInState = Object.keys(validationSchema).some((key) => {
      const isInputFieldRequired = validationSchema[key].required;
      const stateValue = state[key].value;
      const stateError = state[key].error;
      return (isInputFieldRequired && !stateValue) || stateError;
    });
    return hasErrorInState;
  }, [state, validationSchema]);

  const handleOnChange = useCallback((event) => {
    setDirty(true);
    const name = event.target.name;
    const value = event.target.value;

    let error;
    if (validationSchema[name].required) {
      if (!value) {
        error = 'To pole jest wymagane';
      }
    }
    if (validationSchema[name].validator !== null && typeof validationSchema[name].validator === 'object') {
      if (value && !validationSchema[name].validator.regEx.test(value)) {
        error = validationSchema[name].validator.error;
      }
    }
    setState((prevState) => ({
      ...prevState,
      [name]: { value, error },
    }));
  }, [validationSchema]);
}
