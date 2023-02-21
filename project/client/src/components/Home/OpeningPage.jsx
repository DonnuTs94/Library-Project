import { Box, Container, Typography, styled, Button } from "@mui/material"
import React from "react"
import landingpage from "../../assets/landingpage.png"

const OpeningPage = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
  }))

  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }))
  return (
    <Container maxWidth="xl">
      <CustomBox>
        <Box sx={{ flex: "1" }}>
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              color: "#black",
              mt: 10,
              mb: 4,
              fontWeight: "bold",
            }}
          >
            Welcome to Kirei Library
          </Typography>
          <Title variant="h1">Find your books and get new knowledge</Title>
          <Typography
            variant="body2"
            sx={{
              fontSize: "18px",
              color: "#5A6473",
              my: 4,
            }}
          >
            Be the person who care with your knowledge, let's give your brain a
            food.
          </Typography>
          <Button
            variant="contained"
            sx={{
              marginBottom: "5vh",
            }}
          >
            Explore More
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: { xs: "none", md: "10vh" },
          }}
        >
          <img
            src={landingpage}
            alt="landingpageimage"
            style={{
              maxWidth: "100%",

              marginBottom: "5rem",
              borderRadius: "20px",
              backgroundBlendMode: "luminosity",
            }}
          />
        </Box>
      </CustomBox>
    </Container>
  )
}

export default OpeningPage
