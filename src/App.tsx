import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PostsPage from './pages/PostsPage'
import BottomNav from './components/BottomNav'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostsPage />} />
      </Routes>
      <BottomNav />
    </BrowserRouter>
  )
}

export default App
