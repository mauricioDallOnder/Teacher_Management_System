import { AppBar, Toolbar} from '@mui/material';
import { NavLink } from 'react-router-dom';

function MyAppBar() {
  const toolbarStyles = {
    display: 'flex',
    justifyContent: 'space-between',
  };
  
  const linkStyles = {
    textDecoration: 'none',
    color: '#FFFFFF',
    margin: '0 16px',
    fontWeight: "700"
  };
  return (
    <AppBar position="fixed"  style={{ top: 0, height: '64px', zIndex: 1,background: "#202932" }}>
    <Toolbar sx={toolbarStyles}>
      <NavLink style={linkStyles} to="/registerProfs">
        Cadastrar Professor
      </NavLink>
      <NavLink style={linkStyles} to="/profsListWithPDF">
        Pesquisar Professor e gerar atestado
      </NavLink>
      <NavLink style={linkStyles} to="/UpdateProfessorData">
        Update Professores
      </NavLink>
     
    </Toolbar>
  </AppBar>
  );
}

export default MyAppBar;