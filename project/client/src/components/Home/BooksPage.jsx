import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material"
import React from "react"
import { styled } from "@mui/system"
import OpeningPage from "./OpeningPage"

const BooksPage = () => {
  const material = [
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/7/7a/Twilight_Saga_covers.png",
      title: "The Twilight",
      year: "2005",
      author: "Stephenie Meyer",
      description:
        "Bella Swan moves from Phoenix, Arizona to live with her father in Forks, Washington to allow her mother to travel with her new husband, a minor league baseball player. After moving to Forks, Bella finds herself involuntarily drawn to a mysterious, handsome boy, Edward Cullen and eventually learns that he is a member of a vampire family which drinks animal blood rather than human blood.",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/3/31/Divergent_series_set.jpg",
      title: "Divergent Trilogy",
      year: "2011",
      author: "Veronica Roth",
      description:
        "Divergent is a series of young adult science fiction adventure novels by American novelist Veronica Roth set in a post-apocalyptic dystopian Chicago.[1] The trilogy consists of Divergent (2011), Insurgent (2012) and Allegiant (2013).",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/6/6b/Harry_Potter_and_the_Philosopher%27s_Stone_Book_Cover.jpg",
      title: "Harry Potter",
      year: "1997",
      author: "J.K Rowling",
      description:
        "Harry Potter and the Philosopher's Stone is a 1997 fantasy novel written by British author J. K. Rowling. The first novel in the Harry Potter series and Rowling's debut novel, it follows Harry Potter, a young wizard who discovers his magical heritage on his eleventh birthday, when he receives a letter of acceptance to Hogwarts School of Witchcraft and Wizardry.",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Alice%27s_Adventures_in_Wonderland_cover_%281865%29.jpg/800px-Alice%27s_Adventures_in_Wonderland_cover_%281865%29.jpg",
      title: "Alice in Wonderland",
      year: "1865",
      author: "Lewis Carroll",
      description:
        "The journey began at Folly Bridge, Oxford, and ended 5 miles (8.0 km) away in Godstow, Oxfordshire. During the trip Carroll told the girls a story that he described in his diary as Alice's Adventures Under Ground and which his journal says he undertook to write out for Alice.",
    },
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/en/4/4a/TheHobbit_FirstEdition.jpg",
      title: "The hobbit",
      year: "1937",
      author: "J.R.R Tolkien",
      description:
        "The Hobbit, or There and Back Again is a children's fantasy novel by English author J. R. R. Tolkien. It was published in 1937 to wide critical acclaim, being nominated for the Carnegie Medal and awarded a prize from the New York Herald Tribune for best juvenile fiction. The book remains popular and is recognized as a classic in children's literature.",
    },
  ]
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      paddingTop="20px"
      justifyContent={"center"}
    >
      {material.map((val) => (
        <Grid item>
          <Card
            sx={{
              width: 260,
              borderRadius: "10px",
            }}
          >
            <CardActionArea>
              <CardMedia
                component={"img"}
                height="330"
                image={val.imageUrl}
                sx={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h6"
                  component={"div"}
                  fontWeight="bold"
                >
                  {val.title}
                </Typography>
                <Typography gutterBottom varian="h7">
                  {val.author}
                </Typography>
                <Typography
                  gutterBottom
                  varian="h7"
                  fontStyle={"italic"}
                  marginTop="-0.5rem"
                >
                  {val.year}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Read more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}

export default BooksPage
