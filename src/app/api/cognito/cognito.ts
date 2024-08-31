import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { Mutex } from 'async-mutex';

import { POOL_DATA } from '../constants/constants';

const sessionUpdateMutex = new Mutex();

const getCognito = () => {
  const pool = new CognitoUserPool(POOL_DATA);
  return {
    pool,
    user: pool.getCurrentUser(),
  };
};

const checkAuthTokens = async (): Promise<{ token: string; auth: boolean }> => {
  let tokenInfo = { token: '', auth: false };
  const release = await sessionUpdateMutex.acquire();

  try {
    const { user } = getCognito();
    if (user) {
      const session = await new Promise<CognitoUserSession | null>(
        (resolve) => {
          user.getSession(
            (_: Error | null, session: CognitoUserSession | null) => {
              resolve(session);
            },
          );
        },
      );

      if (session && user) {
        if (session.isValid()) {
          tokenInfo = { token: session.getIdToken().getJwtToken(), auth: true };
        } else {
          const refreshSession = await new Promise<CognitoUserSession | null>(
            (resolve) => {
              user.refreshSession(
                session.getRefreshToken(),
                (_, refreshSession) => {
                  resolve(refreshSession);
                },
              );
            },
          );

          if (refreshSession && refreshSession.isValid()) {
            tokenInfo = {
              token: refreshSession.getIdToken().getJwtToken(),
              auth: true,
            };
          }
        }
      }
    }
  } catch (error) {
    console.error('Error refreshing session:', error);
  } finally {
    release();
  }

  return tokenInfo;
};

const login = async ({
  username,
  password,
}: {
  username: string;
  password: string;
}): Promise<string> => {
  const { pool } = getCognito();
  return new Promise((resolve, reject) => {
    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
    });

    const cognitoUser = new CognitoUser({
      Username: username,
      Pool: pool,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: () => {
        resolve('Successfully authenticated');
      },
      onFailure: (err) => reject(err),
    });
  });
};

const signIn = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}): Promise<string> => {
  const { pool } = getCognito();
  return new Promise<string>((resolve, reject) => {
    const attributeList = [
      new CognitoUserAttribute({
        Name: 'name',
        Value: username,
      }),
    ];

    pool.signUp(email, password, attributeList, attributeList, (err) => {
      if (err) {
        reject(err);
      }
      resolve('Successfully signed up');
    });
  });
};

const signOut = () => {
  const { user } = getCognito();
  if (user !== null) {
    user.signOut();
  }
};

const confirmPassword = ({
  email,
  code,
  password,
}: {
  email: string;
  code: string;
  password: string;
}): Promise<string> => {
  const { pool } = getCognito();
  const userData = {
    Username: email,
    Pool: pool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(code, password, {
      onFailure(err) {
        reject(err);
      },
      onSuccess(result) {
        resolve(result);
      },
    });
  });
};

const changePassword = async ({
  username,
  password,
  newPassword,
}: {
  username: string;
  password: string;
  newPassword: string;
}): Promise<string> => {
  const { pool } = getCognito();
  const userData = {
    Username: username,
    Pool: pool,
  };
  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function () {
        cognitoUser.changePassword(password, newPassword, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve('SUCCESS');
          }
        });
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

const forgotPassword = (login: string): Promise<string> => {
  const { pool } = getCognito();
  const userData = {
    Username: login,
    Pool: pool,
  };
  const cognitoUser = new CognitoUser(userData);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export default {
  getCognito,
  login,
  signIn,
  signOut,
  confirmPassword,
  changePassword,
  forgotPassword,
  checkAuthTokens,
};
