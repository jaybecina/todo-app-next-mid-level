import * as yup from "yup";

export const todoSchema = yup.object().shape({
  todo: yup.string().required("Todo is required"),
});
