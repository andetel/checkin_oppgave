import {createContext, useContext} from "react";
import {RootStore} from "../store/root.store";

const StoresContext = createContext(new RootStore())

export const useStores = () => useContext(StoresContext)