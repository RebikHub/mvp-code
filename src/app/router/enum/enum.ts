export enum RootPath {
  root = '/',
  auth = 'auth',
  main = 'main',
  error = 'error',
}

export enum AuthPath {
  login = 'login',
  signUp = 'signup',
  resetPassword = 'reset-password',
  updatePassword = 'update-password',
  registered = 'registered',
}

export enum MainPath {
  base = '/',
  profile = 'profile',
  orderCreate = 'order-create',
  orderEdit = 'order-edit',
}

export enum ProfilePath {
  base = '/',
  account = 'account',
  receivedOrders = 'received-orders',
  recipients = 'recipients',
  containers = 'containers',
  orders = 'orders',
  tariff = 'tariff',
}

export enum OrderPath {
  base = '/',
  title = 'title',
  recipients = 'recipients',
  notification = 'notification',
  containers = 'containers',
  condition = 'condition',
  confirm = 'confirm',
}
