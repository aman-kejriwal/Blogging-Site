import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { SignIn } from './Pages/SignIn'
import { SignUp } from './Pages/SignUp'
import { Blog } from './Pages/Blog'
import { Blogs } from './Pages/Blogs'
import { Layout } from './Pages/Layout'
import { Publish } from './Pages/Publish'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path='/publish' element={<Publish />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App