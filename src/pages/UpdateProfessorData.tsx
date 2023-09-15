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
} from "../styles/GlobalFormStyles";
import { fieldsSessao1, fieldsSessao2 } from "../utils/constants";
import { ref, remove, update } from "firebase/database";
import { db } from "../api/config";
import { FormHeader } from "../components/formHeader";
interface Record {
  ata: string;
  funcao: string;
  periodo: string;
  turmas: string;
}

export const UpdateProfessorData = () => {
  const { allProfsData } = useFormDataContext();
  const { register, setValue, handleSubmit, reset } = useForm();
  const [selectedProfessor, setSelectedProfessor] = useState<string | null>(
    null
  );
  const [currentRecords, setCurrentRecords] = useState<Record[]>([]);

  useEffect(() => {
    if (!selectedProfessor) {
      return;
    }
    if (allProfsData.length > 0 && selectedProfessor) {
      const professor = allProfsData.find(
        (prof) => prof.nome_professor === selectedProfessor
      );
      setValue("nome_professor", professor?.nome_professor);
      setValue("fim", professor?.fim);
      setValue("inicio", professor?.inicio);
      setValue("matricula", professor?.matricula);

      if (professor && professor.records) {
        for (let i = 0; i < professor.records.length; i++) {
          setValue(`periodo${i + 1}`, professor.records[i].periodo);
          setValue(`funcao${i + 1}`, professor.records[i].funcao);
          setValue(`turmas${i + 1}`, professor.records[i].turmas);
          setValue(`ata${i + 1}`, professor.records[i].ata);
        }
      }
      setCurrentRecords(professor?.records || []);
    }
  }, [setValue, allProfsData, selectedProfessor]);

  const onSubmit = async (formData: any) => {
    if (!selectedProfessor) {
      return;
    }
    try {
      const professor = allProfsData.find(
        (prof) => prof.nome_professor === selectedProfessor
      );

      // Reestruture os dados antes de atualizá-los
      const records = currentRecords.map((_record, index) => {
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
          reset(); // resetando o formulário aqui
          setCurrentRecords([]); // Também resetando os registros atuais
          alert("Dados atualizados com sucesso!");
        })
        .catch((error) => {
          console.error("Data could not be saved.", error);
        });
      console.log("Dados atualizados com sucesso");
    } catch (error) {
      console.error("Erro ao atualizar dados", error);
    }
  };

  const onDeleteProfessor = async () => {
    if (!selectedProfessor) {
      return;
    }
    try {
      const professor = allProfsData.find(
        (prof) => prof.nome_professor === selectedProfessor
      );
      await remove(ref(db, "professors/" + professor?.id));
      console.log("Professor deletado com sucesso");
      setSelectedProfessor(null); // Resetando o professor selecionado
      reset(); // Resetando o form
    } catch (error) {
      console.error("Erro ao deletar professor", error);
    }
  };

  const onAddYear = () => {
    setCurrentRecords((prevRecords) => [
      ...prevRecords,
      {
        periodo: "",
        funcao: "",
        turmas: "",
        ata: "",
      },
    ]);
  };

  const onRemoveYear = (index: number) => {
    setCurrentRecords((prevRecords) => {
      const newRecords = [...prevRecords];
      newRecords.splice(index, 1);
      return newRecords;
    });

    // Aqui, há o reajuste dos valores dos campos no formulário.
    for (let i = index; i < currentRecords.length - 1; i++) {
      setValue(`ata${i + 1}`, currentRecords[i + 1].ata);
      setValue(`funcao${i + 1}`, currentRecords[i + 1].funcao);
      setValue(`periodo${i + 1}`, currentRecords[i + 1].periodo);
      setValue(`turmas${i + 1}`, currentRecords[i + 1].turmas);
    }
    // E finalmente,  há a removação o último conjunto de campos, pois ele não é mais necessário.
    setValue(`ata${currentRecords.length}`, "");
    setValue(`funcao${currentRecords.length}`, "");
    setValue(`periodo${currentRecords.length}`, "");
    setValue(`turmas${currentRecords.length}`, "");
  };



  useEffect(() => {
    console.log(currentRecords);
  }, [currentRecords]);


  return (
    <Container>
      <Box sx={BoxStyleCadastro}>
        <FormHeader
          title={"Formulário de Atualização"}
          subtitle={"EMEF SANTA CORONA"}
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Select
            value={selectedProfessor ? selectedProfessor : ""}
            onChange={(event) => setSelectedProfessor(event.target.value as string)}
          >
            <MenuItem value="">
              <em>-</em>
            </MenuItem>
            {allProfsData.sort((a, b) => a.nome_professor.localeCompare(b.nome_professor)).map((professor, index) => (
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
            {currentRecords.map((record, professorIndex) => (
              <div key={record.ata + record.periodo}>
                {" "}

                <Grid container spacing={2}>
                  {fieldsSessao2.map(({ id, label }) => (
                    <Grid item xs={12} sm={6} key={id}>
                      <TextField
                        fullWidth
                        id={`${id}${professorIndex + 1}`}
                        variant="standard"
                        label={label}
                        {...register(`${id}${professorIndex + 1}`)}
                        sx={{ fontSize: '6px' }}
                      />
                    </Grid>
                  ))}
                </Grid>
                {/* Aqui, adicionamos o botão de remover */}
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "5px", marginBottom: "15px" }}>
                  {currentRecords.length === 1 ? (
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        sx={{ marginTop: "5px", marginBottom: "5px" }}
                        variant="contained"
                        color="error"
                        onClick={() => onRemoveYear(professorIndex)}
                        disabled
                      >
                        Remover Ano
                      </Button>
                      <Typography>
                        Esse campo não pode ser removido pois é necessario ter
                        no mínimo 1 registro de trabalho
                      </Typography>
                    </Box>
                  ) : (
                    <Button
                      sx={{ marginTop: "5px", marginBottom: "5px" }}
                      variant="contained"
                      color="error"
                      onClick={() => onRemoveYear(professorIndex)}
                    >
                      Remover Ano
                    </Button>
                  )}
                </Box>
              </div>
            ))}
          </List>
          <Box sx={{ display: "flex", gap: "10px", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ marginTop: "6px" }}
              type="submit"
              color="primary"
              disabled={!selectedProfessor}
            >
              {!selectedProfessor
                ? "selecione um professor."
                : "Atualizar dados"}
            </Button>
            <Button
              variant="contained"
              sx={{ marginTop: "6px", marginRight: "10px" }}
              color="error"
              disabled={!selectedProfessor}
              onClick={onDeleteProfessor}
            >
              Deletar Professor
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: "6px", marginRight: "10px" }}
              onClick={onAddYear}
              disabled={!selectedProfessor}
            >
              Adicionar Ano
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};
