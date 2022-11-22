import { useEffect, useState } from 'react';

import * as userServices from '$/services/user.service';

import { User } from '$/interfaces/user.interface';

import { handleError } from '$/utils/handle-error.util';

const useUser = (email: string) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      setIsLoading(true);

      const { data } = await userServices.findByEmail(email);

      setUser(data);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, [email]);

  return { user, isLoading };
};

export default useUser;
