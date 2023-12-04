import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useForm } from "react-hook-form";
import { SignJWT } from "jose";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/AuthContext";
import { LOCAL_STORAGE_KEYS, SECRET_KEY } from "../../components/Constants";
import { styles } from "./styles";

const defaultTheme = createTheme();

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const { getUserDetails } = useAppContext();
  const secret = new TextEncoder().encode(SECRET_KEY);
  const onSubmit = async (data) => {
    setLoading(true);

    const token = await generateJWT(data, secret);

    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, token);
    getUserDetails();
    setLoading(false);
    navigate("/");
  };

  const generateJWT = async (payload) => {
    const alg = "HS256";

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg })
      .sign(secret);

    return token;
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box sx={styles.mainContainer}>
          <Avatar sx={styles.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Full Name"
              name="email"
              autoFocus
              {...register("fullname", { required: true })}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              {...register("email", { required: true })}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register("password", { required: true })}
            />
            <FormControl fullWidth margin="normal">
              <InputLabel>Role*</InputLabel>
              <Select label="Role" {...register("role", { required: true })}>
                <MenuItem value={1}>Admin</MenuItem>
                <MenuItem value={0}>User</MenuItem>
              </Select>
              {errors.role && <span>{errors.role.message}</span>}
            </FormControl>
            <LoadingButton
              loading={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={styles.submitBtn}
            >
              Sign In
            </LoadingButton>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
