import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useRouter } from "next/router";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { login, user } = useAuth();
  const history = useRouter();

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

  const handleLogin = async (
    values: LoginFormValues,
    actions: FormikHelpers<LoginFormValues>
  ) => {
    const response = await login(values);

    if (!response.error && user) {
      history.push("/");
    }

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
                tabIndex={1}
                spellCheck={false}
                required
                aria-required
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
                tabIndex={2}
                required
                aria-required
              />
              <ErrorMessage
                className="error-message"
                name="password"
                component="span"
              />
            </div>

            <button className="submit-button" type="submit" tabIndex={3}>
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
