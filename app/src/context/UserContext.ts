import { createContext, Dispatch, SetStateAction } from 'react';

import { User } from '$/interfaces/user.interface';

const UserContext = createContext<{ user: User | null; setUser: Dispatch<SetStateAction<User | null>> }>({
  user: null,
  setUser: () => {
    return;
  }
});

export default UserContext;
