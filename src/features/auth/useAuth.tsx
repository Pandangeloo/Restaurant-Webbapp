import { useContext } from "../../index";
import { AuthContext } from "./AuthContext";

export function useAuth() {
  return useContext(AuthContext);
}
