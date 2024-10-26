import { useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";

const emailSchema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
});

const loginSchema = yup.object({
  password: yup.string().required("Required"),
});

const registerSchema = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  password: yup.string().required("Required"),
});

const initialRegisterValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  buget: "",
};

const initialEmailValues = {
  email: "",
};

const initialLoginValues = {
  password: "",
};

const Form = () => {
  const [formStage, setFormStage] = useState("email");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEmailSubmit = async (values, { setSubmitting }) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email }),
    });

    if (response.ok) {
      setUserEmail(values.email);
      setFormStage("login");
    } else {
      setUserEmail(values.email);
      setFormStage("register");
    }

    setSubmitting(false);
  };

  const handleLoginSubmit = async (values, { setSubmitting }) => {
    const response = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: userEmail,
        password: values.password,
      }),
    });
    const data = await response.json();
    if (response.ok && data.token) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/select");
    } else {
      console.error("Login failed");
    }

    setSubmitting(false);
  };

  const handleRegisterSubmit = async (values, { setSubmitting }) => {
    const response = await fetch("http://localhost:3001/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        email: userEmail,
      }),
    });
    const data = await response.json();

    if (response.ok && data.token) {
      dispatch(setLogin({ user: data.user, token: data.token }));
      navigate("/select");
    } else {
      console.error("Registration failed");
    }

    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={
        formStage === "email"
          ? initialEmailValues
          : formStage === "login"
          ? initialLoginValues
          : initialRegisterValues
      }
      validationSchema={
        formStage === "email"
          ? emailSchema
          : formStage === "login"
          ? loginSchema
          : registerSchema
      }
      onSubmit={
        formStage === "email"
          ? handleEmailSubmit
          : formStage === "login"
          ? handleLoginSubmit
          : handleRegisterSubmit
      }
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap="20px">
            {formStage === "email" && (
              <TextField
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
            )}
            {formStage === "login" && (
              <TextField
                label="Password"
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
              />
            )}
            {formStage === "register" && (
              <>
                <TextField
                  label="First Name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
                <TextField
                  label="Last Name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
                <TextField
                  label="Password"
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                />
                <TextField
                  label="Buget"
                  name="buget"
                  value={values.buget}
                  onChange={handleChange}
                  error={touched.buget && Boolean(errors.buget)}
                  helperText={touched.buget && errors.buget}
                />
              </>
            )}
            <Button
              size="large"
              type="submit"
              disabled={isSubmitting}
              sx={{
                background: "linear-gradient(45deg, #673ab7, #03a9f4)",
                borderRadius: "1.5rem",
                color: "white",
                padding: "1rem 2rem",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "background 0.3s ease",
                "&:hover": {
                  background: "#03a9f4",
                },
              }}
            >
              {formStage === "email"
                ? "Continue"
                : formStage === "login"
                ? "Login"
                : "Register"}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default Form;
