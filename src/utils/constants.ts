//novo arquivo
import { z } from "zod";
export const fieldsSessao1 = [
   
    { label: "Nome do Professor", id: "nome_professor" },
    { label: "Matricula", id: "matricula" },
    { label: "Data de Inicio", id: "inicio",type:'date' },
    { label: "Data de Fim", id: "fim",type:'date' },
  ];
  export const fieldsSessao2 = [
    { label: "Periodo", id: "periodo" },
    { label: "Função", id: "funcao" },
    { label: "Series/Anos atendidos", id: "turmas" },
    { label: "Documento que originou a informação", id: "ata" },

  ];
  
 export default function getMonthName(monthNumber: number) {
    const months = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ];
    return months[monthNumber];
}
  
export const schema = z.object({
  inicio: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, {
      message: "Insira a data no formato DD/MM/YYYY",
    }),
  fim: z
    .string()
    .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, {
      message: "Insira a data no formato DD/MM/YYYY",
    }),
    nome_professor:z.string(),
    matricula:z.string(),
    periodo:z.string(),
    funcao:z.string(),
    turmas:z.string(),
    ata:z.string()
});

export function handleFirebaseError(error:any) {
  switch (error.code) {
    case "PERMISSION_DENIED":
      // O usuário não tem permissões para acessar os dados.
      console.error("Você não tem permissões para acessar esses dados.");
      break;
    case "NETWORK_ERROR":
      // Ocorreu um erro de rede.
      console.error("Ocorreu um erro de rede. Verifique sua conexão com a Internet.");
      break;
    // Adicione mais casos conforme necessário.
    default:
      // Um erro desconhecido ocorreu.
      console.error("Ocorreu um erro desconhecido.", error);
      break;
  }
}