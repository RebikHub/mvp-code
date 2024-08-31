import { default as cognito } from './endpoints/cognito';
import { default as conditions } from './endpoints/conditions';
import { default as containers } from './endpoints/containers';
import { default as feedback } from './endpoints/feedback';
import { default as orders } from './endpoints/orders';
import { default as recipients } from './endpoints/recipients';
import { default as users } from './endpoints/users';

export default {
  cognito,
  users,
  conditions,
  containers,
  orders,
  recipients,
  feedback,
};
