import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import { useAuth } from "../../hooks/useAuth";

interface RestorePasswordValues {
  email: string;
}

export default function RestorePassword() {
  const { resetPassword } = useAuth();

  const initialValues: RestorePasswordValues = {
    email: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Type a valid e-mail address!")
      .required("E-mail is a required field!"),
  });

  const handleRestorePassword = async (
    { email }: RestorePasswordValues,
    actions: FormikHelpers<RestorePasswordValues>
  ) => {
    const response = await resetPassword(email);

    console.log("response [resetPassoword.tsx]", response);
    return actions.resetForm();
  };

  return (
    <>
      <div className="form-wrapper">
        <h1>Reset Password</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={handleRestorePassword}
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

            <button className="submit-button" type="submit" tabIndex={3}>
              Reset
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
