import React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import backgroundImg from "../../assets/images/norsys.png";
import Img from "../../assets/images/logosys.png";
import ImgLogo from "../../assets/images/logonorsys.png";
import ImgTest from "../../assets/images/NorsysAfriqueTest.png";
const defaultTheme = createTheme();

export function LoginPage() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          component={Paper}
          elevation={6}
          square
          sx={{
            paddingTop: "",
            width: "60%",
            backgroundColor: "FFFFF",
            opacity: 0.93,
            alignItems: "center",
            borderRadius: "20px",
          }}
        >
          <Grid
            container
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
            sx={{
              paddingTop: "none",
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box sx={{ color: "red" }}>
                <img src={ImgLogo} alt="logo" />
              </Box>

              <Typography sx={{ marginTop: 1 }} component="h1" variant="h5">
                S'identifier
              </Typography>
              <Typography
                sx={{ fontSize: "0.8rem", opacity: 0.5 }}
                color="#1D1B1E"
              >
                Connectez-vous pour accéder à votre espace
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Restez connecté"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Se connecter
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Mot de passe oublié?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      S'inscrire
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>

          <Grid
            container
            item
            xs={6}
            justifyContent="center"
            alignItems="center"
          >
            <Box
              sx={{ display: "flex", flexDirection: "column", width: "90%" }}
            >
              <img src={Img} alt="logo" />
            </Box>
            <Box sx={{ marginbottom: 4 }}>
              <img src={ImgTest} alt="logo" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}
