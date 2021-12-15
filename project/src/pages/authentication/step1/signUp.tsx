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
  firstName: string;
  lastName: string;
}

export default function SignUp() {
  const { signInWithGoogle, signInWithFacebook, user } = useAuth();
  const history = useRouter();
  const [failedOperationMessage, setFailedOperationMessage] = useState<
    string | undefined
  >("");

  const initialValues: SignUpFormValues = {
    firstName: "",
    lastName: "",
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
  });

  const handleSignUp = async (
    values: SignUpFormValues,
    action: FormikHelpers<SignUpFormValues>
  ) => {
    if (values) {
      history.push({
        pathname: "/authentication/step2/signUp",
        query: { firstName: values.firstName, lastName: values.lastName },
      });
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
              <label htmlFor="firstName">First Name</label>
              <Field
                type="text"
                name="firstName"
                placeholder="Type your first name..."
                spellCheck={false}
                tabIndex={1}
                required
                autoComplete="off"
                aria-required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="firstName"
                component="span"
              />
            </div>
            <div className={styles.inputWrapper}>
              <label htmlFor="lastName">Last Name</label>
              <Field
                type="text"
                name="lastName"
                placeholder="Type your last name..."
                spellCheck={false}
                tabIndex={2}
                required
                autoComplete="off"
                aria-required
              />
              <ErrorMessage
                className={styles.errorMessage}
                name="lastName"
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
              Next
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
