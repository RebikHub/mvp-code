declare let self: ServiceWorkerGlobalScope;

export const showNotification = async (hours?: number) => {
  await self.registration.showNotification('Открытие ордера', {
    body: hours
      ? `До открытия осталось ${hours} часов.`
      : 'Один из ордеров готов к открытию.',
  });
};
