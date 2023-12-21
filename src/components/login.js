import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import axios from "axios";
import { Snackbar } from "@mui/material";
import { baseURL } from "../utils";

export default function Login({ setIsLoggedIn }) {
  const [isLoginPage, setIsLoginPage] = React.useState(true);
  const [err, setErr] = React.useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (isLoginPage) {
      handleLogin(data);
    } else {
      handleRegister(data);
    }
  };
  const handleLogin = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/users/login`, {
        email: data.get("email"),
        password: data.get("password"),
      });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
    } catch (err) {
      err?.response?.data?.message && setErr(err.response.data.message);
    }
  };

  const handleRegister = async (data) => {
    try {
      const res = await axios.post(`${baseURL}/users/register`, {
        username: data.get("username"),
        email: data.get("email"),
        password: data.get("password"),
      });
      setErr(res?.data.message);
      setIsLoginPage(true);
    } catch (err) {
      err?.response?.data?.message && setErr(err.response.data.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          padding: "3em 2em",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: "20px",
        }}
      >
        <Typography component="h1" sx={{ color: "#1976d2" }} variant="h5">
          {isLoginPage ? "LOGIN" : "REGISTER"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          {!isLoginPage && (
            <TextField
              name="username"
              required
              fullWidth
              id="username"
              label="Name"
              autoFocus
              autoComplete="username"
            />
          )}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLoginPage ? "Login" : "Register"}
          </Button>
          <Link
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => setIsLoginPage(!isLoginPage)}
          >
            {isLoginPage
              ? "Don't have an account? register"
              : "Already have an account? Login"}
          </Link>
          <Snackbar
            open={Boolean(err)}
            onClose={() => setErr("")}
            autoHideDuration={4000}
            message={err}
            sx={{ position: "relative", top: "1em", ml: -2 }}
          />
        </Box>
      </Box>
    </Container>
  );
}
