import { ReactNode, createContext, useContext, useState } from 'react';
import { IUser } from '../types';

const LocalStorageContext = createContext<{
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}>({
  currentUser: null,
  setCurrentUser: () => {},
});

export const LocalStorageProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUserState] = useState<IUser | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setCurrentUser = (user: IUser | null) => {
    setCurrentUserState(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <LocalStorageContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </LocalStorageContext.Provider>
  );
};

export const useMyLocalStorage = () => {
  const { currentUser, setCurrentUser } = useContext(LocalStorageContext);
  if (currentUser === undefined) {
    throw new Error(
      "useMyLocalStorage doit être utilisé à l'intérieur du fournisseur LocalStorageProvider"
    );
  }
  return { currentUser, setCurrentUser };
};
