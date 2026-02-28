import { useContext } from "react";
import { AuthContext } from "./AuthContext";

// Separated into its own file to fix Vite Fast Refresh:
// "Fast refresh only works when a file only exports components"
export const useAuth = () => useContext(AuthContext);
