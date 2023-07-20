import { Box, Typography } from "@mui/material";
import { TituloDaPagina, SubtituloDaPagina } from "../styles/GlobalFormStyles";

interface formheader {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: formheader) => {
  return (
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
          width={70}
          height={70}
        />
        <Typography sx={TituloDaPagina}>{title}</Typography>
        <Typography sx={SubtituloDaPagina}>{subtitle}</Typography>
      </Box>
    </Box>
  );
};
