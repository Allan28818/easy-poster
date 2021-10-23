import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Type a valid e-mail")
      .required("E-mail is a required field!"),
    password: yup
      .string()
      .min(8, "Your password must contain at least 8 characters!")
      .required("Password is a required field!"),
  });

  const handleLogin = (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    console.log("Login has been successfuly maden", values);

    return actions.resetForm();
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Login</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={schema}
        >
          <Form>
            <div className="input-wrapper">
              <label htmlFor="email">Email</label>
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
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
