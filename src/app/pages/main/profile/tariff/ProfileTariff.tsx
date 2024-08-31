import { TariffCard } from '../components/tariff-card/TariffCard';

import { useText } from '@/app/services/hooks/useLocalization';

import css from './ProfileTariff.module.scss';

export const ProfileTariff = () => {
  return (
    <div className={css.container}>
      <TariffCard title={useText('tariff.title.free')} price={0} />
      <TariffCard
        className={css.card}
        title={useText('tariff.title.standard')}
        price={1000}
        color="green"
      />
      <TariffCard title={useText('tariff.title.standard')} price={1000} />
    </div>
  );
};
