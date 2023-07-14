import { useState, ChangeEvent, useEffect } from "react";
import { useFormDataContext } from "../../api/context";
import {
  Container,
  TextField,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  Table,
} from "@mui/material";
import { CreateDocx } from "./generatePdf";
import { StyledTableCell, StyledTableRow } from "./ProfsDataStyle";
import { InputsProps } from "../../interfaces/interfaces";
export const GetProfsData = () => {
  const { allProfsData } = useFormDataContext();
  const [inputValue, setInputValue] = useState("");
  const [filteredData, setFilteredData] = useState<InputsProps[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    const filtered = allProfsData.filter(
      (prof) =>
        prof.nome_professor &&
        prof.nome_professor.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, []);

  return (
    <Container>
      <TextField
        label="Digite aqui o nome do professor que deseja pesquisar"
        value={inputValue}
        onChange={handleChange}
        variant="outlined"
        fullWidth
        margin="normal"
      />

      {inputValue ? (
        filteredData.length > 0 ? (
          <TableContainer style={{ marginTop: "16px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">Nome</StyledTableCell>
                  <StyledTableCell align="center">Matricula</StyledTableCell>
                  <StyledTableCell align="center">
                    Data de Inicio
                  </StyledTableCell>
                  <StyledTableCell align="center">Data de Fim</StyledTableCell>
                  <StyledTableCell align="center">Documento</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((prof, index) => (
                  <StyledTableRow key={index}>
                    <StyledTableCell align="center">
                      {prof.nome_professor}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {prof.matricula}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {String(prof.inicio)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {String(prof.fim)}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => CreateDocx(prof)}
                      >
                        Gerar atestado
                      </Button>
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography
            variant="body1"
            color="textSecondary"
            style={{ marginTop: "16px", color: "#000000" }}
          >
            Nenhum professor encontrado.
          </Typography>
        )
      ) : (
        <Typography
          variant="body1"
          color="textSecondary"
          style={{ marginTop: "16px", color: "#000000", textAlign: "center" }}
        >
          Nenhum registro pesquisado.
        </Typography>
      )}
    </Container>
  );
};
