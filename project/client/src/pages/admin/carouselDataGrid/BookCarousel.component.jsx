import { CardMedia } from "@mui/material"
import Carousel from "react-material-ui-carousel"

const BookCarousel = ({ bookPictures }) => {
  return (
    <Carousel indicators={false} autoPlay={false} animation="fade">
      {bookPictures?.map((picture, index) => (
        <CardMedia
          key={index}
          component="img"
          alt="Book Picture"
          height="auto"
          width={60}
          image={picture.book_picture}
        />
      ))}
    </Carousel>
  )
}

export default BookCarousel
