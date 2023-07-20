import { Box, Container, List, Typography } from "@mui/material";
import {
  BoxStyleCadastro,
  TituloDaPagina,
  SubtituloDaPagina,
  ListStyle,
} from "../styles/GlobalFormStyles";
import { GetProfsData } from "../components/pdf/GetProfsData";

export const ProfsListWithPDF = () => {
  return (
    <Container>
      <Box sx={BoxStyleCadastro}>
        <Box sx={{ display: "table", width: "100%" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "0 -38px",
              padding: "0.5em 52px",
            }}
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/app-santa-corona.appspot.com/o/logo%20da%20escola.png?alt=media&token=cc9c0f41-c59e-45b6-8fb4-a45559013b69"
              alt=""
              width={90}
              height={90}
            />
            <Typography sx={TituloDaPagina}>Pesquisa de Professores</Typography>
            <Typography sx={SubtituloDaPagina}>EMEF SANTA CORONA</Typography>
          </Box>
          <List sx={ListStyle}>
            <GetProfsData />
          </List>
        </Box>
      </Box>
    </Container>
  );
};
