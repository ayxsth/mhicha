import { createContext } from 'react';

import { User } from '$/interfaces/user.interface';

const UserContext = createContext<{ user: User | null; setUser: (user: User | null) => void }>({
  user: null,
  setUser: () => {
    return;
  }
});

export default UserContext;
