import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";

import { useRouter } from "next/router";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";

import Link from "next/link";

import { FcGoogle } from "react-icons/fc";
import { GrFacebook } from "react-icons/gr";

import styles from "../../../styles/authentication/sign-up.module.scss";

interface SignUpFormValues {
  email: string;
  password: string;
}

export default function SignUp2() {
  const {
    signUpWithEmailAndPassword,
    signInWithGoogle,
    signInWithFacebook,
    user,
  } = useAuth();
  const history = useRouter();
  const queryParams = history.query;
  const [failedOperationMessage, setFailedOperationMessage] = useState<
    string | undefined
  >("");

  const initialValues: SignUpFormValues = {
    email: "",
    password: "",
  };

  const schema = yup.object().shape({
    email: yup
      .string()
      .min(3, "Your first name must contain at least 3 characters")
      .required("First name is a required field!"),
    password: yup
      .string()
      .min(3, "Your last name must contain at least 3 characters")
      .required("Last name is a required field!"),
  });

  const handleSignUp = async (
    values: SignUpFormValues,
    action: FormikHelpers<SignUpFormValues>
  ) => {
    const response = await signUpWithEmailAndPassword({
      firstName: queryParams.firstName,
      lastName: queryParams.lastName,
      email: values.email,
      password: values.password,
    });

    if (!response.error) {
      history.push("/");
    } else {
      setFailedOperationMessage(response?.message);
    }

    return action.resetForm();
  };

  const handleSignInWithGoogle = async () => {
    const response = await signInWithGoogle();

    if (response.result?.user.emailVerified) {
      history.push("/");
      setFailedOperationMessage(response?.message);
    }
  };

  const handleSignInWithFacebook = async () => {
    const response = await signInWithFacebook();
    console.log(response);
    if (response.result?.user) {
      history.push("/");
    } else {
      setFailedOperationMessage(response?.message);
    }
  };

  return (
    <>
      <div className={styles.formWrapper}>
        <h1>Sign Up</h1>
        <p className={styles.description}>
          Hi {queryParams.firstName ? queryParams.firstName : ""}, let's finish
          your sign up!
        </p>
        {failedOperationMessage && (
          <div className={styles.operationFailedWrapper}>
            <span>{failedOperationMessage}</span>
          </div>
        )}
        <Formik
          initialValues={initialValues}
          onSubmit={handleSignUp}
          validationSchema={schema}
        >
          <Form>
            <div className={styles.inputWrapper}>
              <label htmlFor="firstName">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="youremail@yourdomain.com"
                spellCheck={false}
                tabIndex={1}
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
              <label htmlFor="lastName">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="Type your password..."
                spellCheck={false}
                tabIndex={2}
                required
                autoComplete="off"
                aria-required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="password"
                component="span"
              />
            </div>

            <div className={styles.signUpOptions}>
              <button
                className={styles.googleButton}
                onClick={handleSignInWithGoogle}
              >
                <div className={styles.googleIcon}>
                  <FcGoogle />
                </div>
                <span>Sign Up with Google</span>
              </button>
              <button
                className={styles.facebookButton}
                onClick={handleSignInWithFacebook}
              >
                <div className={styles.facebookIcon}>
                  <GrFacebook />
                </div>
                <span>Sign Up with Facebook</span>
              </button>
            </div>

            <Link href={"/authentication/login"}>
              <span className={styles.link}>
                Do you already have an account?{" "}
              </span>
            </Link>

            <button className={styles.submitButton} type="submit" tabIndex={5}>
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
