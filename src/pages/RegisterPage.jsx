import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Stack, Alert, IconButton
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { supabase } from '../lib/supabase'

const RegisterPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', username: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleRegister = async () => {
    const { email, password, username } = form
    if (!email || !password || !username) {
      setError('모든 항목을 입력해주세요.')
      return
    }
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.')
      return
    }
    setLoading(true)
    setError('')

    const { data, error: authError } = await supabase.auth.signUp({ email, password })
    if (authError) {
      setError(authError.message)
      setLoading(false)
      return
    }

    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: data.user.id,
        username,
        display_name: username,
        profile_pic: `https://api.dicebear.com/7.x/personas/svg?seed=${username}`,
      })
      if (profileError) {
        setError('프로필 생성에 실패했습니다. 다시 시도해주세요.')
        setLoading(false)
        return
      }
    }

    setSuccess('회원가입이 완료됐어요! 이메일 인증 후 로그인해주세요.')
    setLoading(false)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFF8F0',
        px: 3,
        py: 4,
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <IconButton onClick={() => navigate('/login')} sx={{ mb: 2, color: '#8B5A3C' }}>
        <ArrowBackRoundedIcon />
      </IconButton>

      <Typography variant="h5" sx={{ fontWeight: 700, color: '#3D2314', mb: 1 }}>
        회원가입
      </Typography>
      <Typography variant="body2" sx={{ color: '#7A5C4A', mb: 4 }}>
        레공유 가족이 되어보세요 🍽️
      </Typography>

      <Stack spacing={2.5}>
        {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ borderRadius: 3 }}>{success}</Alert>}

        <TextField
          label="닉네임"
          name="username"
          value={form.username}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
          placeholder="예: 요리왕홍길동"
        />
        <TextField
          label="이메일"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
        />
        <TextField
          label="비밀번호 (6자 이상)"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          fullWidth
          sx={inputStyle}
        />

        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleRegister}
          disabled={loading || !!success}
          sx={{
            backgroundColor: '#FF6B35',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 700,
            mt: 1,
            '&:hover': { backgroundColor: '#e55a25' },
          }}
        >
          {loading ? '가입 중...' : '회원가입'}
        </Button>

        {success && (
          <Button
            variant="outlined"
            fullWidth
            size="large"
            onClick={() => navigate('/login')}
            sx={{ borderColor: '#8B5A3C', color: '#8B5A3C', py: 1.5 }}
          >
            로그인 하러 가기
          </Button>
        )}
      </Stack>
    </Box>
  )
}

const inputStyle = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    backgroundColor: '#fff',
    '&.Mui-focused fieldset': { borderColor: '#8B5A3C' },
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#8B5A3C' },
}

export default RegisterPage
