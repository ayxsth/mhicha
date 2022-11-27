import { useEffect, useState } from 'react';

import * as serviceService from '$/services/service.service';

import { handleError } from '$/utils/handle-error.util';

import { Service } from '$/interfaces/service.interface';

const useService = () => {
  const [services, setServices] = useState<Service[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getServices = async () => {
    try {
      setIsLoading(true);

      const { data } = await serviceService.fetch();

      setServices(data);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return { services, isLoading };
};

export default useService;
