import {
  Container,
  Box,
  Typography,
  List,
  Grid,
  Button,
} from "@mui/material";
import { useForm } from "react-hook-form";
import {useFormDataContext } from "../api/context";
import { fieldsSessao2, fieldsSessao1 } from "../utils/constants";
import {
  BoxStyleCadastro,
  ListStyle,
  TituloSecaoStyle,
} from "../utils/PagesStyles";
import { v4 as uuidv4 } from "uuid";
import { FormHeader } from "../components/formHeader";
import { FormField, DynamicFieldGroup } from "../components/formFields";
import { InputsProps } from "../interfaces/interfaces";

export const RegisterProfs = () => {
  const { register, handleSubmit} = useForm<InputsProps>({});
  const { dynamicFieldGroups, setDynamicFieldGroups, onSubmit } =
    useFormDataContext();

  const addDynamicFieldGroup = () => {
    const fieldsWithUniqueId = fieldsSessao2.map((field) => ({
      ...field,
      uniqueId: uuidv4(),
    }));
    setDynamicFieldGroups([...dynamicFieldGroups, fieldsWithUniqueId]);
  };

  const removeDynamicFieldGroup = (indexToRemove: number) => {
    setDynamicFieldGroups(
      dynamicFieldGroups.filter((_, index) => index !== indexToRemove)
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
