import livro1 from "../assets/livro1.png";
import livro2 from "../assets/livro2.png";
import livro3 from "../assets/livro3.png";
import { useNavigate } from 'react-router-dom';
import "../styles/homepage.css";

export const HomePage = () => {
  const history = useNavigate();

  const handleLivro1Click = () => {
    history("/RegisterProfs");
  };

  const handleLivro2Click = () => {
    history("/ProfsListWithPDF");
  };

  const handleLivro3Click = () => {
    history("/");
  };

  return (
    <div className="container">
      <div className="item">
        <div onClick={handleLivro1Click}>
          <img src={livro1} alt="" />
          <h1>Cadastro de Professores</h1>
        </div>

        <div onClick={handleLivro2Click}>
          <img src={livro2} alt="" />
          <h1>Lista de Profs e atestados</h1>
        </div>

        <div onClick={handleLivro3Click}>
          <img src={livro3} alt="" />
          <h1>Home Page</h1>
        </div>
      </div>
    </div>
  );
};