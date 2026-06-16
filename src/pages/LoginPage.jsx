import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Stack, Divider, Alert
} from '@mui/material'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { supabase } from '../lib/supabase'

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) {
      setError('이메일과 비밀번호를 입력해주세요.')
      return
    }
    setLoading(true)
    setError('')
    const { data, error: authError } = await supabase.auth.signInWithPassword({ email, password })
    if (authError) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.')
      setLoading(false)
      return
    }
    setUser(data.user)
    navigate('/')
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFF8F0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        px: 3,
        maxWidth: 480,
        mx: 'auto',
      }}
    >
      <Stack spacing={1} alignItems="center" sx={{ mb: 5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RestaurantMenuIcon sx={{ color: '#FF6B35', fontSize: 48 }} />
        </Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 800, color: '#8B5A3C', letterSpacing: '-1px' }}
        >
          레공유
        </Typography>
        <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
          맛있는 레시피를 함께 나눠요 🍳
        </Typography>
      </Stack>

      <Stack spacing={2} sx={{ width: '100%' }}>
        {error && <Alert severity="error" sx={{ borderRadius: 3 }}>{error}</Alert>}
        <TextField
          label="이메일"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          variant="outlined"
          sx={inputStyle}
        />
        <TextField
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          variant="outlined"
          sx={inputStyle}
          onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
        />
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={handleLogin}
          disabled={loading}
          sx={{
            backgroundColor: '#8B5A3C',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 700,
            '&:hover': { backgroundColor: '#5C3220' },
          }}
        >
          {loading ? '로그인 중...' : '로그인'}
        </Button>

        <Divider sx={{ color: '#7A5C4A', fontSize: '0.8rem' }}>또는</Divider>

        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={() => navigate('/register')}
          sx={{
            borderColor: '#C4956A',
            color: '#8B5A3C',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': { borderColor: '#8B5A3C', backgroundColor: 'rgba(139, 90, 60, 0.04)' },
          }}
        >
          회원가입
        </Button>
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

export default LoginPage
