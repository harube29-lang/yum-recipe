import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Typography, TextField, Button, Stack, IconButton,
  CircularProgress, Chip, Alert
} from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import TagRoundedIcon from '@mui/icons-material/TagRounded'
import { supabase } from '../lib/supabase'

const UNSPLASH_QUERIES = ['food', 'korean food', 'cooking', 'recipe', 'meal', 'dessert', 'breakfast']

const CreatePostPage = ({ currentUser }) => {
  const navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState('')
  const [imageLoading, setImageLoading] = useState(false)
  const [caption, setCaption] = useState('')
  const [location, setLocation] = useState('')
  const [hashtagInput, setHashtagInput] = useState('')
  const [hashtags, setHashtags] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchRandomImage()
  }, [])

  const fetchRandomImage = async () => {
    setImageLoading(true)
    const query = UNSPLASH_QUERIES[Math.floor(Math.random() * UNSPLASH_QUERIES.length)]
    const seed = Math.floor(Math.random() * 1000)
    const url = `https://source.unsplash.com/600x600/?${query}&sig=${seed}`
    setImageUrl(url)
    setImageLoading(false)
  }

  const handleAddHashtag = () => {
    const tag = hashtagInput.replace('#', '').trim()
    if (tag && !hashtags.includes(tag)) {
      setHashtags((prev) => [...prev, tag])
    }
    setHashtagInput('')
  }

  const handleRemoveTag = (tag) => {
    setHashtags((prev) => prev.filter((t) => t !== tag))
  }

  const handleSubmit = async () => {
    if (!caption.trim()) {
      setError('게시물 내용을 입력해주세요.')
      return
    }
    if (!currentUser) {
      setError('로그인이 필요합니다.')
      return
    }
    setSubmitting(true)
    setError('')
    const { error: postError } = await supabase.from('posts').insert({
      user_id: currentUser.id,
      caption: caption.trim(),
      image_url: imageUrl,
      location: location.trim() || null,
      hashtags: hashtags.length > 0 ? hashtags : null,
      likes_count: 0,
    })
    if (postError) {
      setError('게시물 등록에 실패했습니다.')
      setSubmitting(false)
      return
    }
    navigate('/')
  }

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        backgroundColor: '#FFF8F0',
        pb: 4,
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1,
          py: 1,
          borderBottom: '1px solid rgba(139, 90, 60, 0.1)',
          backgroundColor: '#FFF8F0',
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <IconButton onClick={() => navigate(-1)} sx={{ color: '#8B5A3C' }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#3D2314', flex: 1, textAlign: 'center' }}>
          새 게시물
        </Typography>
        <Button
          onClick={handleSubmit}
          disabled={submitting}
          sx={{ color: '#FF6B35', fontWeight: 700, fontSize: '1rem' }}
        >
          {submitting ? '등록 중...' : '공유'}
        </Button>
      </Box>

      <Box sx={{ px: 2, pt: 2 }}>
        {error && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{error}</Alert>}

        {/* 이미지 미리보기 */}
        <Box sx={{ position: 'relative', mb: 2 }}>
          {imageLoading ? (
            <Box
              sx={{
                width: '100%', aspectRatio: '1/1', backgroundColor: '#f0e6d8',
                display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3,
              }}
            >
              <CircularProgress sx={{ color: '#FF6B35' }} />
            </Box>
          ) : (
            <Box
              component="img"
              src={imageUrl}
              alt="preview"
              sx={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover', borderRadius: 3 }}
            />
          )}
          <IconButton
            onClick={fetchRandomImage}
            sx={{
              position: 'absolute', bottom: 8, right: 8,
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <RefreshRoundedIcon />
          </IconButton>
          <Typography
            variant="caption"
            sx={{
              position: 'absolute', bottom: 8, left: 8,
              color: '#fff', backgroundColor: 'rgba(0,0,0,0.4)',
              px: 1, py: 0.3, borderRadius: 2,
            }}
          >
            이미지 변경 →
          </Typography>
        </Box>

        <Stack spacing={2}>
          <TextField
            label="캡션 (내용)"
            placeholder="오늘의 레시피를 공유해보세요 🍳"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            multiline
            rows={3}
            fullWidth
            sx={inputStyle}
          />

          <TextField
            label="위치"
            placeholder="예: 서울 마포구"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            fullWidth
            sx={inputStyle}
            InputProps={{
              startAdornment: <LocationOnOutlinedIcon sx={{ color: '#7A5C4A', mr: 0.5, fontSize: 20 }} />,
            }}
          />

          <Box>
            <TextField
              label="해시태그"
              placeholder="예: 홈베이킹 (엔터로 추가)"
              value={hashtagInput}
              onChange={(e) => setHashtagInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddHashtag()}
              fullWidth
              sx={inputStyle}
              InputProps={{
                startAdornment: <TagRoundedIcon sx={{ color: '#7A9E7E', mr: 0.5, fontSize: 20 }} />,
              }}
            />
            {hashtags.length > 0 && (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                {hashtags.map((tag) => (
                  <Chip
                    key={tag}
                    label={`#${tag}`}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                    sx={{ backgroundColor: '#f0e6d8', color: '#8B5A3C', fontWeight: 600 }}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={submitting}
            sx={{
              backgroundColor: '#FF6B35',
              py: 1.5,
              fontWeight: 700,
              '&:hover': { backgroundColor: '#e55a25' },
            }}
          >
            게시물 등록
          </Button>
        </Stack>
      </Box>
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

export default CreatePostPage
