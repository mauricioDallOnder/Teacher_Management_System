import { onValue, ref, set } from "firebase/database";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { db } from "./config";
import { handleFirebaseError } from "../utils/constants";
import { InputsProps } from "../interfaces/interfaces";
type FormContextProviderProps = {
  children: ReactNode;
};

export type Field = {
  label: string;
  id: string;
};

type FormContextType = {
  formdata: InputsProps[];
  dynamicFieldGroups: Array<Field[]>;
  setDynamicFieldGroups: (fieldGroups: Array<Field[]>) => void;
  onSubmit: (data: InputsProps) => void;
};

export const FormDataContext = createContext({} as FormContextType);

export const useFormDataContext = () => {
  return useContext(FormDataContext);
};

export const FormContextProvider = ({ children }: FormContextProviderProps) => {
  const [formdata, setFormdata] = useState<InputsProps[]>([]);
  const [dynamicFieldGroups, setDynamicFieldGroups] = useState<Array<Field[]>>(
    []
  );

  const { reset } = useForm<InputsProps>({});

  const onSubmit: SubmitHandler<InputsProps> = async (data) => {
    const records = dynamicFieldGroups.map((_, groupIndex) => {
      const dataAny = data as any;
      return {
        periodo: dataAny[`periodo_${groupIndex}_0`],
        funcao: dataAny[`funcao_${groupIndex}_1`],
        turmas: dataAny[`turmas_${groupIndex}_2`],
        ata: dataAny[`ata_${groupIndex}_3`],
      };
    });

    const finalData = {
      id: uuidv4(),
      nome_professor: data.nome_professor,
      matricula: data.matricula,
      inicio: data.inicio,
      fim: data.fim,
      records,
    };

    set(ref(db, "professors/" + finalData.id), finalData)
      .then(() => {
        console.log("Data saved successfully.");
        reset()
      })
      .catch((error) => {
        console.error("Data could not be saved.", error);
        handleFirebaseError(error);
      });
  };

  useEffect(() => {
    const professorsRef = ref(db, "professors");
    // Attach an asynchronous callback to read the data
    const unsubscribe = onValue(
      professorsRef,
      (snapshot) => {
        const rawData = snapshot.val();
        if (rawData) {
          const professorsArray: InputsProps[] = Object.keys(rawData).map(
            (key) => rawData[key]
          );
          // Here we are using a function as the first argument of setFormdata.
          // This ensures we are using the most recent value of formdata.
          setFormdata((currentFormdata) => [
            ...currentFormdata,
            ...professorsArray,
          ]);
        }
      },
      (error) => {
        console.log("Failed to read data:", error);
      }
    );

    // Clean up
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <FormDataContext.Provider
      value={{
        formdata,
        dynamicFieldGroups,
        setDynamicFieldGroups,
        onSubmit,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
