import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import HomePage from './pages/HomePage'
import CreatePostPage from './pages/CreatePostPage'
import OneDayClassPage from './pages/OneDayClassPage'
import ChatPage from './pages/ChatPage'
import MyPage from './pages/MyPage'

const App = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return null

  return (
    <BrowserRouter basename="/yum-recipe">
      <Routes>
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<HomePage currentUser={user} />} />
        <Route path="/create" element={<CreatePostPage currentUser={user} />} />
        <Route path="/class" element={<OneDayClassPage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/mypage" element={<MyPage currentUser={user} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
