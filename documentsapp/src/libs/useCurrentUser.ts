import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";

export interface Token {
  realm_access: RealmAccess;
}

export interface RealmAccess {
  roles: string[];
}

export const useCurrentUser = () => {
  const auth = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isManager, setIsManager] = useState(false);

  useEffect(() => {
    if (auth.user && auth.user.access_token) {
      const token = jwtDecode<Token>(auth.user.access_token);
      setIsAdmin(hasRole(token, "admin"));
      setIsUser(hasRole(token, "user"));
      setIsManager(hasRole(token, "manager"));
    } else {
      setIsAdmin(false);
      setIsUser(false);
      setIsManager(false);
    }
  }, [auth]);

  const hasRole = (token: Token, role: string): boolean => {
    return token?.realm_access?.roles.includes(role) ?? false;
  };

  return { isAdmin, isUser, isManager, auth };
};
