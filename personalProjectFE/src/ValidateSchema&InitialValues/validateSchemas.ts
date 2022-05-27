import * as yup from "yup";
export const validateSignUpSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("This is required, this is your FIRST NAME, you know!"),
  lastName: yup
    .string()
    .required("This is also required, don't you have a lastName?"),
  userName: yup
    .string()
    .required(
      "This is required for you identification, developer (I) needs to idetify you."
    ),
  email: yup
    .string()
    .email()
    .required()
    .required("Hey..., don't you have an EMAIL?? This is so bad!"),
  password: yup
    .string()
    .required("This is for your security. what are you doing??"),
  gender: yup
    .string()
    .oneOf(["Male", "Female", "Others"])
    .required("This is extremely required field!"),
});

export const validateLoginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const validateCommentSchema = yup.object().shape({
  comment: yup.string().required(),
});

export const validatePostSchema = yup.object().shape({
  title: yup.string().min(5).max(50),
  body: yup.string().max(500),
});
