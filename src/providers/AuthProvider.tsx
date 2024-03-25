import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { IAuthContext } from "@/types/providers";
import { TypeUserState } from "@/types/user";
import useAsyncStorage from "@/hooks/useAsyncStorage";

const AuthContext = createContext({} as IAuthContext);

const AuthProvider: FC<PropsWithChildren<unknown>> = ({ children }) => {
  const { storedValue: user, setValue: setUser } =
    useAsyncStorage<TypeUserState>("user");

  useEffect(() => {
    (async () => {
      setUser({} as TypeUserState);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export default AuthProvider;
