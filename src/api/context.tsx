/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext, ReactNode, useEffect } from "react";
import { InputsProps } from "../interfaces/interfaces";
import { ref, onValue } from "firebase/database";
import { db } from "./config";
export type Field = {
  label: string;
  id: string;
};


type FormContextProviderProps = {
  children: ReactNode;
};

type FormContextType = {
  dynamicFieldGroups: Array<Field[]>;
  setDynamicFieldGroups: (fieldGroups: Array<Field[]>) => void;
  allProfsData: InputsProps[];
  fetchAllProfsData: () => void;

};

export const FormDataContext = createContext({} as FormContextType);

export const useFormDataContext = () => {
  return useContext(FormDataContext);
};

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [dynamicFieldGroups, setDynamicFieldGroups] = useState<Array<Field[]>>(
    []
  );
  const [allProfsData, setAllProfsData] = useState<InputsProps[]>([]);

  const fetchAllProfsData = () => {
    const profsRef = ref(db, 'professors');
    onValue(profsRef, (snapshot) => {
      const data = snapshot.val();
      const arr = Object.keys(data).map((id) => data[id]);
      setAllProfsData(arr);
    });
  }

  useEffect(() => {
    fetchAllProfsData();
  }, []);

  return (
    <FormDataContext.Provider
      value={{
        dynamicFieldGroups,
        setDynamicFieldGroups,
        allProfsData,
        fetchAllProfsData,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
