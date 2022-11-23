import { useEffect, useState } from 'react';

import * as chargeService from '$/services/charge.service';

import { User } from '$/interfaces/user.interface';

import { handleError } from '$/utils/handle-error.util';

const useCharge = (amount: number) => {
  const [charge, setCharge] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const getCharge = async () => {
    try {
      setIsLoading(true);

      const { data } = await chargeService.fetch(amount);

      setCharge(data.charge);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCharge();
  }, [amount]);

  return { charge, isLoading };
};

export default useCharge;
