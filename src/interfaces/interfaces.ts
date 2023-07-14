export type InputsProps = {
    id: string;
    nome_professor: string;
    matricula: string;
    inicio: Date;
    fim: Date;
    records: Array<{
      periodo: string;
      funcao: string;
      turmas: string;
      ata: string;
    }>;
  };
  
export interface FormFieldProps {
    label: string;
    id: string;
    type: string;
    register: any;
  }
  
 export interface DynamicFieldProps {
    field: { label: string; id: string };
    groupId: number;
    fieldId: number;
    register: any;
  }
  
  export interface DynamicFieldGroupProps {
    fieldsGroup: { label: string; id: string }[];
    groupIndex: number;
    register: any;
    onRemoveFieldGroup: () => void;
  }