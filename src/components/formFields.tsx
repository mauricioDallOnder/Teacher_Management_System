import { Button, Grid, InputLabel, TextField } from "@mui/material";
import { FormFieldProps, DynamicFieldProps, DynamicFieldGroupProps, InputsProps } from "../interfaces/interfaces";
export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  type,
  register,
}) => (
  <Grid item xs={12} sm={6}>
    {type === "date" ? (
      <>
        <InputLabel>{label}</InputLabel>
        <TextField
          fullWidth
          id={id}
          type="string"
          placeholder="DD/MM/YYYY"
          variant="standard"
          sx={{ borderRadius: "4px" }}
          required
          {...register(id as keyof InputsProps)} // assert type here
        />
      </>
    ) : (
      <TextField
        fullWidth
        id={id}
        type="string"
        label={label}
        variant="standard"
        sx={{ borderRadius: "4px" }}
        required
        {...register(id as keyof InputsProps)} // assert type here
      />
    )}
  </Grid>
);

export const DynamicField: React.FC<DynamicFieldProps> = ({
  field,
  groupId,
  fieldId,
  register,
}) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      id={`${field.id}_${groupId}_${fieldId}`}
      label={field.label}
      variant="standard"
      sx={{ borderRadius: "4px" }}
      {...register(`${field.id}_${groupId}_${fieldId}` as keyof InputsProps)}
    />
  </Grid>
);

// Alteração no componente DynamicFieldGroup
export const DynamicFieldGroup: React.FC<DynamicFieldGroupProps> = ({
  fieldsGroup,
  groupIndex,
  register,
  onRemoveFieldGroup,
}) => (
  <Grid container spacing={2}>
    {fieldsGroup.map((field, index) => (
      <DynamicField
        field={field}
        groupId={groupIndex}
        fieldId={index}
        register={register}
      />
    ))}
    <Grid item xs={12}>
      <Button
        sx={{ marginBottom: "10px", marginTop: "10px" }}
        variant="contained"
        color="error"
        onClick={onRemoveFieldGroup}
      >
        Remover ano de trabalho
      </Button>
    </Grid>
  </Grid>
);
