import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../api/config";
import getMonthName from "../../utils/constants";
import { InputsProps } from "../../interfaces/interfaces";
let url =
  "https://firebasestorage.googleapis.com/v0/b/profs-database.appspot.com/o/template.docx?alt=media&token=0da6f5c9-f9a2-4864-826a-1aaab1634b61";
export const CreateDocx = async (professor: InputsProps) => {
  const pathReference = ref(storage, url);

  getDownloadURL(pathReference)
    .then(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(
          "Failed to download document template:",
          response.status,
          response.statusText
        );
        return;
      }

      const arrayBuffer = await response.arrayBuffer();

      var zip = new PizZip(arrayBuffer);
      var doc = new Docxtemplater().loadZip(zip);

      const endDate =String(professor.fim)
      const today = new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('/')
      const todayDate = new Date();
      let paragraph;
      
      if (endDate === today) {
        paragraph = `Atestamos, para os devidos fins, que o(a) professor(a) ${professor.nome_professor}, matrícula ${professor.matricula}, atua neste estabelecimento de ensino desde ${professor.inicio} até a presente data.   De acordo com registros existentes nos documentos da escola, desempenhou a(s) função(ões):`;
      } else {
        paragraph = `Atestamos, para os devidos fins, que o(a) professor(a) ${professor.nome_professor}, matrícula ${professor.matricula}, atuou neste estabelecimento de ensino, no período compreendido entre ${professor.inicio} até ${professor.fim}. De acordo com registros existentes nos documentos da escola, desempenhou a(s) função(ões):`;
      }

      const formattedDate = `Caxias do Sul, ${todayDate.getDate()} de ${getMonthName(
        todayDate.getMonth()
      )} de ${todayDate.getFullYear()}.`;

      doc.setData({
        professor_name: professor.nome_professor,
        matricula: professor.matricula,
        inicio: professor.inicio,
        fim: professor.fim,
        paragraph: paragraph,
       date: formattedDate,
        records: professor.records,
      });

      try {
        doc.render();
      } catch (error) {
        console.error("Error rendering document:", error);
        return;
      }

      var buf = doc.getZip().generate({ type: "blob" });
      saveAs(buf, `atestado-de-regencia-${professor.nome_professor}.docx`);
    })
    .catch((error) => {
      console.error("Error getting download URL:", error);
    });
};
