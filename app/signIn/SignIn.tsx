"use client"
import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Box, Button, Container, CssBaseline, Grid, TextField, Typography } from "@mui/material";

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { signIn } from "next-auth/react";
import Link from "next/link";

function SignIn() {
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const mail = data.get("userId");
    const password = data.get("password");

    await signIn("credentials", {
      redirect: false,
      email: mail,
      password,
    }).then(res => {
      if (res?.error) {
        console.log(res.error)
      }
      router.push("/")
    }).catch(err =>{
      console.log(err)
    })

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main"}}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userId"
            label="ユーザID"
            name="userId"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            label="password"
            name="password"
            autoComplete="current-password"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Typography variant="body2">
                <Link href="#">
                  Forgot password?
                </Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body2">
                <Link href="/signUp">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default SignIn;