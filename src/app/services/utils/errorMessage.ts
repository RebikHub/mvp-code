export const errorMessage = (message?: string): string => {
  switch (message) {
    case 'User is not confirmed.': {
      return 'error.message.user.confirmed';
    }
    case 'Password did not conform with policy: Password not long enough': {
      return 'error.message.password.long';
    }
    case 'Password did not conform with policy: Password must have symbol characters': {
      return 'error.message.password.symbol';
    }
    case 'Invalid verification code provided, please try again.': {
      return 'error.message.code';
    }
    case 'Incorrect username or password.': {
      return 'error.message.user.incorrect';
    }
    case 'Password did not conform with policy: Password must have uppercase characters': {
      return 'error.message.password.uppercase';
    }
    case 'It is required to sign the text of the offerta!': {
      return 'error.message.oferta';
    }
    case 'An account with the given email already exists.': {
      return 'error.message.email.exists';
    }
    case 'Password did not conform with policy: Password must have lowercase characters': {
      return 'error.message.password.lowercase';
    }
    case 'A requested file or directory could not be found at the time an operation was processed.': {
      return 'error.message.zip';
    }
    default:
      return 'error.message.default';
  }
};
