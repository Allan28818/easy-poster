import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";

interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function Login() {
  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    firstName: yup
      .string()
      .min(3, "Your first name must contain at least 3 characters")
      .required("First name is a required field!"),
    lastName: yup
      .string()
      .min(3, "Your last name must contain at least 3 characters")
      .required("Last name is a required field!"),
    email: yup
      .string()
      .email("Type a valid e-mail!")
      .required("E-mail is a required field!"),
    password: yup
      .string()
      .min(8, "Your passwrod must contain at least 8 characters!")
      .required("Password is a required field!"),
  });

  const handleSignUp = (
    values: SignUpFormValues,
    action: FormikHelpers<SignUpFormValues>
  ) => {
    console.log("The sign up was successfully maden!", values);

    return action.resetForm();
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Sign Up</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleSignUp}
          validationSchema={schema}
        >
          <Form>
            <div className="input-wrapper">
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="Type your first name..."
              />
              <ErrorMessage
                className="error-message"
                name="firstName"
                component="span"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                name="lastName"
                placeholder="Type your last name..."
              />
              <ErrorMessage
                className="error-message"
                name="lastName"
                component="span"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="email">E-mail</label>
              <Field
                type="email"
                name="email"
                placeholder="Type your e-mail..."
              />
              <ErrorMessage
                className="error-message"
                name="email"
                component="span"
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Type your password..."
              />
              <ErrorMessage
                className="error-message"
                name="password"
                component="span"
              />
            </div>
            <button className="submit-button" type="submit">
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
