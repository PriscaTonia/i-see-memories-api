import { SHIPPING_CONFIG } from "../../modules/shipping/shipping.data";
import shippingService from "../../modules/shipping/shipping.service";

const createShippingConfig = async () => {
  for (let i = 0; i < SHIPPING_CONFIG.length; i++) {
    await shippingService.createOrUpdateService(SHIPPING_CONFIG[i]);
  }
};

export const runMigrations = () => {
  (async () => {
    await createShippingConfig();
  })();
};
