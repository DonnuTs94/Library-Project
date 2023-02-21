import { Box, Typography, styled, StepLabel, Container } from "@mui/material"
import { textAlign } from "@mui/system"
import React from "react"
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart"
import LocalAtmIcon from "@mui/icons-material/LocalAtm"

const HowItWorks = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "50%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }))

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      flexDirection: "column",
    },
  }))

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }))
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "#E6F0FF",
      }}
      maxWidth="xl"
    >
      <Typography
        variant="h3"
        sx={{
          fontSize: "35px",
          fontWeight: "bold",
          color: "#000339",
          my: 3,
        }}
      >
        How it works ?
      </Typography>
      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#5A6473",
            textAlign: "center",
          }}
        >
          Everything you have to know when you want to rent a book
        </Typography>
      </CustomBox>
      <GuidesBox>
        <GuideBox>
          <ContentPasteSearchIcon
            sx={{
              fontSize: "80px",
              color: "#1e81b0",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Search the product
          </Typography>
        </GuideBox>
        <GuideBox>
          <FormatListNumberedIcon
            sx={{
              fontSize: "80px",
              color: "#1e81b0",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Read the detail
          </Typography>
        </GuideBox>
        <GuideBox>
          <AddShoppingCartIcon
            sx={{
              fontSize: "80px",
              color: "#1e81b0",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Add product
          </Typography>
        </GuideBox>
        <GuideBox>
          <LocalAtmIcon
            sx={{
              fontSize: "80px",
              color: "#1e81b0",
            }}
          />
          <Typography
            variant="body2"
            sx={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#3B3c45",
              my: 1,
            }}
          >
            Check Out
          </Typography>
        </GuideBox>
      </GuidesBox>
    </Container>
  )
}

export default HowItWorks
