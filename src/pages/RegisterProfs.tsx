import {
  Container,
  Box,
  Typography,
  List,
  Grid,
  Button,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import {useFormDataContext } from "../api/context";
import { fieldsSessao2, fieldsSessao1, handleFirebaseError } from "../utils/constants";
import {
  BoxStyleCadastro,
  ListStyle,
  TituloSecaoStyle,
} from "../utils/PagesStyles";
import { v4 as uuidv4 } from "uuid";
import { FormHeader } from "../components/formHeader";
import { FormField, DynamicFieldGroup } from "../components/formFields";
import { InputsProps } from "../interfaces/interfaces";
import { ref, set } from "firebase/database";
import { db } from "../api/config";

export const RegisterProfs = () => {
  const { register, handleSubmit, getValues, reset } = useForm<InputsProps>({});
  const { dynamicFieldGroups, setDynamicFieldGroups } = useFormDataContext();

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
        // Then, reset form fields
        reset();
        // Finally, clear dynamic field groups
        setDynamicFieldGroups([]);
      })
      .catch((error: any) => {
        console.error("Data could not be saved.", error);
        handleFirebaseError(error);
      });
     
  };

  const addDynamicFieldGroup = () => {
    const fieldsWithUniqueId = fieldsSessao2.map((field) => ({
      ...field,
      uniqueId: uuidv4(),
    }));
    setDynamicFieldGroups([...dynamicFieldGroups, fieldsWithUniqueId]);
  };

  const removeDynamicFieldGroup = (groupIndex: number) => {
    const allValues = getValues();
    const newValues = Object.fromEntries(
      Object.entries(allValues).filter(([key]) => {
        return (
          !key.startsWith(`periodo_${groupIndex}_0`) &&
          !key.startsWith(`funcao_${groupIndex}_1`) &&
          !key.startsWith(`turmas_${groupIndex}_2`) &&
          !key.startsWith(`ata_${groupIndex}_3`)
        );
      })
    );
  
    reset(newValues);
  
    setDynamicFieldGroups(
      dynamicFieldGroups.filter((_, index) => index !== groupIndex)
    );
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={BoxStyleCadastro}>
         <FormHeader title={"Formulário de Cadastro"} subtitle={"EMEF SANTA CORONA"}/>
         <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 1 - Identificação do Professor:
            </Typography>
            <Grid container spacing={2}>
              {fieldsSessao1.map(({ label, id,type }) => 
                <FormField label={label} id={id} type={type!} register={register} />
              )}
            </Grid>
          </List>
          <Box>
            <List sx={ListStyle}>
              <Typography sx={TituloSecaoStyle}>
                Seção 2 - Informações Documentais:
              </Typography>
              {dynamicFieldGroups.map((fieldsGroup, groupIndex) => (
                <DynamicFieldGroup
                  fieldsGroup={fieldsGroup}
                  groupIndex={groupIndex}
                  register={register}
                  onRemoveFieldGroup={() => removeDynamicFieldGroup(groupIndex)}
                />
              ))}

              <Button
                sx={{ marginBottom: "10px", marginTop: "10px" }}
                variant="contained"
                color="success"
                onClick={addDynamicFieldGroup}
              >
                Adicionar ano de trabalho
              </Button>
            </List>
          </Box>
          <Button variant="contained" type="submit" color="primary">
            Cadastrar Professor
          </Button>   
        </Box>
      </form>
    </Container>
  );
};
