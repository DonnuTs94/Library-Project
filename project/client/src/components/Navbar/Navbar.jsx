import React from "react"
import { AutoStories } from "@mui/icons-material"
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  MenuList,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import SearchBar from "./SearchBar"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useSignInWithEmail } from "../../lib/signin/signInEmail"

const pages = ["Products", "Pricing", "Blog"]
const settings = ["Profile", "Account", "Dashboard", "Logout"]
const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElNav2, setAnchorElNav2] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleOpenNavMenu2 = (event) => {
    setAnchorElNav2(event.currentTarget)
  }

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseNavMenu2 = () => {
    setAnchorElNav2(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  //===========
  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector, "tryyyy")

  const { logoutBtnHandler } = useSignInWithEmail()

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        paddingBottom: "10px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AutoStories
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: "black" }}
          />
          <Typography
            variant="h6"
            noWrap
            component={"a"}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "sans-serif",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
              textDecoration: "none",
            }}
          >
            E-library
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "flex" },
              color: "black",
              colorScheme: "black",
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon
                sx={{
                  display: { md: "none" },
                  color: "black",
                  colorScheme: "black",
                }}
              />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                color: "black",
              }}
              onClick={handleCloseNavMenu}
            >
              <MenuItem>Cart</MenuItem>
              <MenuItem>Price</MenuItem>
              <MenuItem>Collection</MenuItem>
            </Menu>
            <SearchBar />
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Tabs>
              <Tab label="collection" sx={{ color: "black" }} />
              <Tab label="price" sx={{ color: "black" }} />
              <Tab label="cart" sx={{ color: "black" }} />
            </Tabs>
          </Box>

          {authSelector.id === 0 ? null : (
            <Typography
              sx={{
                color: "black",
              }}
            >
              Hi {authSelector.username}
            </Typography>
          )}
          <Box
            sx={{ flexGrow: 0, paddingLeft: "10px", margin: "2px solid red" }}
          >
            <IconButton
              sx={{ p: 0, position: "right" }}
              onClick={handleOpenNavMenu2}
            >
              <Avatar alt="" />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav2}
              open={Boolean(anchorElNav2)}
              onClose={handleCloseNavMenu2}
              sx={{
                display: { xs: "block", md: "block" },
                fontFamily: "sans-serif",
                textDecoration: "none",
              }}
              onClick={handleCloseNavMenu2}
            >
              <MenuItem>Edit Profile</MenuItem>
              {authSelector.id === 0 ? (
                <Link to={"/sign"}>
                  <MenuItem
                    sx={{
                      fontFamily: "sans-serif",
                      textDecoration: "none",
                    }}
                  >
                    Sign In / Up
                  </MenuItem>
                </Link>
              ) : (
                <MenuItem
                  sx={{
                    fontFamily: "sans-serif",
                    textDecoration: "none",
                  }}
                  onClick={logoutBtnHandler}
                >
                  Logout
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar
