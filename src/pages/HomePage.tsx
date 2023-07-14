import { Box, Typography,CardMedia, CardContent, ButtonBase } from "@mui/material";
import { useNavigate } from "react-router-dom";
import livro1 from "../assets/livro1.png";
import livro2 from "../assets/livro2.png";
import livro3 from "../assets/livro3.png";


export const HomePage = () => {
  const navigate = useNavigate();

  const handleLivroClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box 
      display="flex" 
      justifyContent="space-around" 
      mt={10}
    >
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="baseline"
        gap={10}
      >
        {[ 
          { src: livro1, text: 'Cadastrar Professores', path: '/RegisterProfs' },
          { src: livro2, text: 'Atualizar Professores', path: '/UpdateProfessorData' },
          { src: livro3, text: 'Gerar Atestado de Regência', path: '/ProfsListWithPDF' },
        ].map((item, index) => (
          <ButtonBase 
            key={index} 
            onClick={() => handleLivroClick(item.path)}
          >
            <Box sx={{maxWidth:200,backgroundColor:'linear-gradient(45deg,#4158d0,#c850c0);'}}>
              <CardMedia 
                component="img"
                image={item.src}
                alt={item.text}
              />
              <CardContent>
                <Typography variant="h6">
                  {item.text}
                </Typography>
              </CardContent>
            </Box>
          </ButtonBase>
        ))}
      </Box>
    </Box>
  );
};
