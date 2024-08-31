export const validateDefaultRequired = () => {
  return {
    required: {
      value: true,
      message: 'validate.default.required',
    },
  };
};

export const validateText = () => {
  return {
    maxLength: {
      value: 1000,
      message: 'validate.numbers.maxLength.500',
    },
  };
};

export const validateTextRequired = (required: boolean) => {
  return {
    required: {
      value: required,
      message: 'validate.default.required',
    },
    maxLength: {
      value: 1000,
      message: 'validate.numbers.maxLength.500',
    },
  };
};

export const validateOnlyNumbers = () => {
  return {
    minLength: {
      value: 1,
      message: 'validate.numbers.minLength',
    },
    maxLength: {
      value: 18,
      message: 'validate.numbers.maxLength',
    },
  };
};

export const validateLogin = () => {
  const pattern = /^[a-zA-Z0-9_-]+$/i;

  return {
    required: {
      value: true,
      message: 'validate.login.required',
    },
    minLength: {
      value: 3,
      message: 'validate.login.minLength',
    },
    maxLength: {
      value: 20,
      message: 'validate.login.maxLength',
    },
    pattern: {
      value: pattern,
      message: 'validate.login.pattern',
    },
  };
};

export const validatePassword = () => {
  const validate = (password: string) => {
    if (password.length === 0) {
      return 'validate.default.required';
    }

    if (password.length > 50) {
      return 'validate.password.maxLength';
    }

    return true;
  };

  return {
    validate: (data: string) => validate(data),
  };
};

export const validateComparisonPass = (comparisonPass: string) => {
  const validate = (password: string) => {
    if (password !== comparisonPass) {
      return 'validate.password.comparison';
    }

    return true;
  };

  return {
    validate: (data: string) => validate(data),
  };
};

export const validateEmail = () => {
  const pattern =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return {
    required: {
      value: true,
      message: 'validate.email.required',
    },
    minLength: {
      value: 6,
      message: 'validate.email.minLength',
    },
    maxLength: {
      value: 50,
      message: 'validate.email.maxLength',
    },
    pattern: {
      value: pattern,
      message: 'validate.email.pattern',
    },
  };
};

export const validateEmailWithoutRequired = () => {
  const pattern =
    // eslint-disable-next-line no-control-regex
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  return {
    minLength: {
      value: 6,
      message: 'validate.email.minLength',
    },
    maxLength: {
      value: 50,
      message: 'validate.email.maxLength',
    },
    pattern: {
      value: pattern,
      message: 'validate.email.pattern',
    },
  };
};

export const validatePhone = () => {
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  return {
    required: {
      value: true,
      message: 'validate.phone.required',
    },
    minLength: {
      value: 3,
      message: 'validate.phone.minLength',
    },
    maxLength: {
      value: 20,
      message: 'validate.phone.maxLength',
    },
    pattern: {
      value: phoneRegExp,
      message: 'validate.phone.pattern',
    },
  };
};

export const validatePhoneWithoutRequired = () => {
  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  return {
    minLength: {
      value: 3,
      message: 'validate.phone.minLength',
    },
    maxLength: {
      value: 20,
      message: 'validate.phone.maxLength',
    },
    pattern: {
      value: phoneRegExp,
      message: 'validate.phone.pattern',
    },
  };
};
