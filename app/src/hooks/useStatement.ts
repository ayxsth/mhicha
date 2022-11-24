import { useEffect, useState } from 'react';

import * as statementServices from '$/services/statement.service';

import { handleError } from '$/utils/handle-error.util';
import { Statement } from '$/interfaces/statement.interface';

const useStatement = () => {
  const [statement, setStatement] = useState<Statement[]>();
  const [isLoading, setIsLoading] = useState(true);

  const getStatement = async () => {
    try {
      setIsLoading(true);

      const { data } = await statementServices.fetch();

      setStatement(data);
    } catch (e) {
      handleError(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getStatement();
  }, []);

  return { statement, isLoading };
};

export default useStatement;
