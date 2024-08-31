const base = `CognitoIdentityServiceProvider.${import.meta.env.VITE_USER_ID_DEV}`;
const userId = () => localStorage.getItem(`${base}.LastAuthUser`);
const accessToken = () =>
  localStorage.getItem(`${base}.${userId()}.accessToken`);
const refreshToken = () =>
  localStorage.getItem(`${base}.${userId()}.refreshToken`);
const idToken = () => localStorage.getItem(`${base}.${userId()}.idToken`);

const selectedInstallPWA = () => localStorage.setItem('isSelected', 'selected');

const unselectedInstallPWA = () =>
  localStorage.setItem('isSelected', 'unselected');

const statusSelectedInstallPWA = () => localStorage.getItem('isSelected');

export default {
  accessToken,
  userId,
  refreshToken,
  idToken,
  selectedInstallPWA,
  unselectedInstallPWA,
  statusSelectedInstallPWA,
};
