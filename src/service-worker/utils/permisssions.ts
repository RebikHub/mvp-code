const permissions = [
  'accelerometer',
  'accessibility-events',
  'ambient-light-sensor',
  'background-sync',
  'camera',
  'clipboard-read',
  'clipboard-write',
  'geolocation',
  'gyroscope',
  'local-fonts',
  'magnetometer',
  'microphone',
  'midi',
  'notifications',
  'payment-handler',
  'persistent-storage',
  'push',
  'screen-wake-lock',
  'storage-access',
  'top-level-storage-access',
  'window-management',
  'background-fetch',
  'nfc',
  'display-capture',
  'idle-detection',
  'periodic-background-sync',
  'window-placement',
  'captured-surface-control',
  'speaker-selection',
];

const getPermission = async (permission: string | PermissionName) => {
  try {
    const result = await navigator.permissions.query({
      // @ts-expect-error permission is not included in the default SW interface.
      name: permission,
    });
    return `${permission}: ${result.state}`;
  } catch (error) {
    return `${permission} (not supported)`;
  }
};

export const processPermissions = async () => {
  for (const permission of permissions) {
    const result = await getPermission(permission);
    console.log(result);
  }
};
