import LibraryRoutes from "./Routes"
import { useSignInWithEmail } from "../src/lib/signin/signInEmail"
import { useEffect } from "react"

function App() {
  const { keepUserLogIn } = useSignInWithEmail()
  useEffect(() => {
    keepUserLogIn()
  }, [])

  return (
    <>
      <LibraryRoutes />

      <Container>
        <CssBaseline />
      </Container>
    </>
  )
}

export default App
