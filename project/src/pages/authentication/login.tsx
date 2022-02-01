import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";

import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";

import styles from "../../styles/authentication/login.module.scss";
import { GetStaticProps } from "next";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const {
    loginWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
    user,
  } = useAuth();
  const history = useRouter();
  const [failedOperationMessage, setFailedOperationMessage] = useState<
    string | undefined
  >("");

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
    const response = await loginWithEmailAndPassword(values);

    if (!response.error && user) {
      history.push("/");
    } else {
      console.error(response);
      setFailedOperationMessage(response?.message);
    }

    return actions.resetForm();
  };

  const handleSignInWithGoogle = async () => {
    const response = await signInWithGoogle();

    if (response.result?.user.emailVerified) {
      history.replace("/");
    } else {
      setFailedOperationMessage(response?.message);
    }
  };

  const handleSignInWithFacebook = async () => {
    const response = await signInWithFacebook();
    console.log(response);
    if (response.result?.user.email) {
      history.push("/");
    } else {
      setFailedOperationMessage(response?.message);
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <h1>Login</h1>
        {failedOperationMessage && (
          <div className={styles.operationFailedWrapper}>
            <span>{failedOperationMessage}</span>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleLogin}
          validationSchema={schema}
        >
          <Form>
            <div className={styles.inputWrapper}>
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
                className={styles.errorMessage}
                name="email"
                component="span"
              />
            </div>
            <div className={styles.inputWrapper}>
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
                className={styles.errorMessage}
                name="password"
                component="span"
              />
            </div>

            <div className={styles.loginOptions}>
              <button
                className={styles.googleButton}
                onClick={handleSignInWithGoogle}
              >
                <div className={styles.googleIcon}>
                  <FcGoogle />
                </div>
                <span>Login with Google</span>
              </button>
              <button
                className={styles.facebookButton}
                onClick={handleSignInWithFacebook}
              >
                <div className={styles.facebookIcon}>
                  <GrFacebook />
                </div>
                <span>Login with Facebook</span>
              </button>
            </div>

            <Link href={"/authentication/step1/signUp"}>
              <span className={styles.link}>Do you haven't an account?</span>
            </Link>

            <button className={styles.submitButton} type="submit" tabIndex={3}>
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = (context) => {
  return {
    props: {},
    revalidate: 60 * 60 * 24,
  };
};
