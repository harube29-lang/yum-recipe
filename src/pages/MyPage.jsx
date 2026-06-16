import { useState, useEffect } from 'react'
import {
  Box, Typography, Avatar, Stack, Grid, Modal, IconButton,
  Divider, CircularProgress
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { supabase } from '../lib/supabase'
import PostCard from '../components/PostCard'

const MOCK_POSTS = [
  { id: 1, image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&auto=format' },
  { id: 2, image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=300&auto=format' },
  { id: 3, image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&auto=format' },
  { id: 4, image_url: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=300&auto=format' },
  { id: 5, image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&auto=format' },
  { id: 6, image_url: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=300&auto=format' },
]

const MyPage = ({ currentUser }) => {
  const navigate = useNavigate()
  const [profile, setProfile] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (currentUser) {
      fetchProfile()
      fetchMyPosts()
    } else {
      setLoading(false)
    }
  }, [currentUser])

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', currentUser.id)
      .single()
    setProfile(data)
  }

  const fetchMyPosts = async () => {
    const { data } = await supabase
      .from('posts')
      .select('*, users(username, display_name, profile_pic), recentComments:comments(id, content, users(display_name))')
      .eq('user_id', currentUser.id)
      .order('created_at', { ascending: false })
    setPosts(data && data.length > 0 ? data : MOCK_POSTS)
    setLoading(false)
  }

  const profileSeed = profile?.username || currentUser?.email || 'default'
  const displayName = profile?.display_name || profile?.username || '나'
  const profilePic = profile?.profile_pic || `https://api.dicebear.com/7.x/personas/svg?seed=${profileSeed}`

  if (!currentUser) {
    return (
      <Layout>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '60vh', gap: 2 }}>
          <Typography variant="body1" sx={{ color: '#7A5C4A' }}>로그인이 필요한 페이지입니다.</Typography>
          <Box
            onClick={() => navigate('/login')}
            sx={{ color: '#FF6B35', fontWeight: 700, cursor: 'pointer' }}
          >
            로그인 하러 가기 →
          </Box>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Box>
        {/* 프로필 섹션 */}
        <Box sx={{ px: 2, pt: 2, pb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 2 }}>
            <Avatar
              src={profilePic}
              sx={{ width: 80, height: 80, border: '3px solid #FF6B35' }}
            />
            <Stack spacing={0.5} sx={{ flex: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#3D2314' }}>
                {displayName}
              </Typography>
              <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
                @{profile?.username || 'user'}
              </Typography>
              <Stack direction="row" spacing={3} sx={{ mt: 1 }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>{posts.length}</Typography>
                  <Typography variant="caption" sx={{ color: '#7A5C4A' }}>게시물</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>128</Typography>
                  <Typography variant="caption" sx={{ color: '#7A5C4A' }}>팔로워</Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>64</Typography>
                  <Typography variant="caption" sx={{ color: '#7A5C4A' }}>팔로잉</Typography>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Divider />

        {/* 게시물 3열 그리드 */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress sx={{ color: '#FF6B35' }} />
          </Box>
        ) : (
          <Grid container spacing={0.3} sx={{ mt: 0.3 }}>
            {posts.map((post) => (
              <Grid item xs={4} key={post.id}>
                <Box
                  onClick={() => setSelectedPost(post)}
                  sx={{ cursor: 'pointer', aspectRatio: '1/1', overflow: 'hidden' }}
                >
                  <Box
                    component="img"
                    src={post.image_url}
                    alt="post"
                    sx={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.2s',
                      '&:hover': { transform: 'scale(1.05)' },
                    }}
                  />
                </Box>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* 게시물 상세 모달 */}
      <Modal
        open={!!selectedPost}
        onClose={() => setSelectedPost(null)}
        sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', backdropFilter: 'blur(4px)', backgroundColor: 'rgba(0,0,0,0.6)' }}
      >
        <Box
          sx={{
            width: '100%', maxWidth: 480, maxHeight: 'calc(100vh - 64px)',
            overflowY: 'auto', mt: 0,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={() => setSelectedPost(null)}
            sx={{
              position: 'fixed', top: 8, right: 8, zIndex: 10,
              backgroundColor: 'rgba(0,0,0,0.5)', color: '#fff',
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
          {selectedPost && (
            <PostCard post={selectedPost} currentUser={currentUser} />
          )}
        </Box>
      </Modal>
    </Layout>
  )
}

export default MyPage
