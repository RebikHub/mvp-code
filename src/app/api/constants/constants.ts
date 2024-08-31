import { ICognitoUserPoolData } from 'amazon-cognito-identity-js';

export const POOL_DATA: ICognitoUserPoolData = {
  UserPoolId: import.meta.env.VITE_POOL_ID_DEV,
  ClientId: import.meta.env.VITE_USER_ID_DEV,
};
