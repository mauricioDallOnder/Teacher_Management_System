import {
  Box,
  Button,
  Container,
  Grid,
  InputLabel,
  List,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useFormDataContext } from "../api/context";
import {
  BoxStyleCadastro,
  ListStyle,
  TituloSecaoStyle,
} from "../utils/PagesStyles";
import { fieldsSessao1, fieldsSessao2 } from "../utils/constants";
import { ref, update } from "firebase/database";
import { db } from "../api/config";
import { FormHeader } from "../components/formHeader";

export const UpdateProfessorData = () => {
  const { formdata } = useFormDataContext();
  const { register, setValue, handleSubmit } = useForm();
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (formdata.length > 0 && selectedProfessor) {
      const professor = formdata.find(
        (prof) => prof.nome_professor === selectedProfessor
      );
      setValue("nome_professor", professor?.nome_professor);
      setValue("fim", professor?.fim);
      setValue("inicio", professor?.inicio);
      setValue("matricula", professor?.matricula);

      if (professor) {
        for (let i = 0; i < professor.records.length; i++) {
          setValue(`periodo${i + 1}`, professor.records[i].periodo);
          setValue(`funcao${i + 1}`, professor.records[i].funcao);
          setValue(`turmas${i + 1}`, professor.records[i].turmas);
          setValue(`ata${i + 1}`, professor.records[i].ata);
        }
      }
    }
  }, [setValue, formdata, selectedProfessor]);

  const onSubmit = async (formData: any) => {
    try {
      const professor = formdata.find(
        (prof) => prof.nome_professor === selectedProfessor
      );

      // Reestruture os dados antes de atualizá-los
      const records = professor?.records.map((_record, index) => {
        return {
          ata: formData[`ata${index + 1}`],
          funcao: formData[`funcao${index + 1}`],
          periodo: formData[`periodo${index + 1}`],
          turmas: formData[`turmas${index + 1}`],
        };
      });

      const updatedData = {
        ...formData,
        records,
      };

      // Remove os campos desnecessários do objeto do professor
      if (records) {
        records.forEach((_record, index) => {
          delete updatedData[`ata${index + 1}`];
          delete updatedData[`funcao${index + 1}`];
          delete updatedData[`periodo${index + 1}`];
          delete updatedData[`turmas${index + 1}`];
        });
      }

      update(ref(db, "professors/" + professor?.id), updatedData)
        .then(() => {
          console.log("Data saved successfully.");
        })
        .catch((error) => {
          console.error("Data could not be saved.", error);
        });
      console.log("Dados atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar dados", error);
    }
  };

  return (
    <Container>
      <Box sx={BoxStyleCadastro}>
        <FormHeader
          title={"Formulário de Cadastro"}
          subtitle={"EMEF SANTA CORONA"}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            value={selectedProfessor}
            onChange={(event) => setSelectedProfessor(event.target.value)}
          >
            {formdata.map((professor, index) => (
              <MenuItem key={index} value={professor.nome_professor}>
                {professor.nome_professor}
              </MenuItem>
            ))}
          </Select>
          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 1 - Identificação do Professor:
            </Typography>
            <Grid container spacing={2}>
              {fieldsSessao1.map(({ label, id }) => (
                <Grid item xs={12} sm={6} key={id}>
                  <InputLabel>{label}</InputLabel>
                  <TextField
                    fullWidth
                    id={id}
                    variant="standard"
                    sx={{
                      borderRadius: "4px",
                    }}
                    required
                    {...register(id)} // asserção de tipo aqui
                  />
                </Grid>
              ))}
            </Grid>
          </List>
          <List sx={ListStyle}>
            <Typography sx={TituloSecaoStyle}>
              Seção 2 - Informações Documentais:
            </Typography>
            {selectedProfessor &&
              formdata
                .find((prof) => prof.nome_professor === selectedProfessor)
                ?.records.map((_record, professorIndex) => (
                  <Grid container spacing={2} key={professorIndex}>
                    {fieldsSessao2.map(({ id, label }) => (
                      <Grid item xs={12} sm={3} key={id}>
                        <TextField
                          fullWidth
                          id={`${id}${professorIndex + 1}`}
                          variant="standard"
                          label={label}
                          {...register(`${id}${professorIndex + 1}`)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ))}
          </List>
          <Button
            variant="contained"
            sx={{ marginTop: "6px" }}
            type="submit"
            color="primary"
          >
            Atualizar Dados
          </Button>
        </form>
      </Box>
    </Container>
  );
};
