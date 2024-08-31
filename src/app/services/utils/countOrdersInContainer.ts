import { IContainer, IOrder } from '@/app/api/types';

export const countOrdersInContainer = ({
  containers,
  orders,
  id,
}: {
  containers?: IContainer[];
  orders?: IOrder[];
  id: string;
}) => {
  if (containers && orders) {
    const ordersMap = new Map();
    containers.forEach((container) => {
      ordersMap.set(container.id, []);
      orders.forEach((order) => {
        if (order.container_id === container.id) {
          ordersMap.set(container.id, [
            order.name,
            ...ordersMap.get(container.id),
          ]);
        }
      });
    });
    return Object.fromEntries(ordersMap)[id].length;
  }
  return 0;
};
