import React from 'react';

const types = {
  email: {
    regex: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    errorMessage: 'Preencha um email válido'
  }
}

const useForm = (type) => {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(null);

  function validate() {
    if (type === false) return true;

    if (value.length === 0) {
      setError('Preencha um valor.');
      return false;
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].errorMessage);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange({ target }) {
    setValue(target.value);
    if (error) validate();
  }

  return {
    value,
    setValue,
    onChange,
    error,
    validate: () => validate(),
    onBlur: () => validate(),
  }
}

export default useForm;
