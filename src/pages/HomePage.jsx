import { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress, Stack } from '@mui/material'
import Layout from '../components/layout/Layout'
import PostCard from '../components/PostCard'
import { supabase } from '../lib/supabase'

const MOCK_POSTS = [
  {
    id: 1,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&auto=format',
    caption: '오늘 저녁은 나폴리탄 피자 🍕 직접 도우 반죽부터 만들었어요!',
    location: '서울 마포구',
    hashtags: ['홈베이킹', '피자', '주말요리'],
    likes_count: 42,
    created_at: new Date(Date.now() - 3600000).toISOString(),
    users: { display_name: '요리왕홍길동', username: 'chef_hong', profile_pic: 'https://api.dicebear.com/7.x/personas/svg?seed=hong' },
    recentComments: [
      { id: 1, content: '너무 맛있겠다! 레시피 공유해줘요~', users: { display_name: '냠냠이' } },
      { id: 2, content: '와 도우 직접 만드신 거예요? 대단해요!', users: { display_name: '베이킹좋아' } },
    ],
  },
  {
    id: 2,
    image_url: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format',
    caption: '집밥 된장찌개 🍲 엄마 레시피 그대로 따라해봤어요',
    location: '부산 해운대구',
    hashtags: ['된장찌개', '집밥', '한식'],
    likes_count: 87,
    created_at: new Date(Date.now() - 7200000).toISOString(),
    users: { display_name: '집밥러버', username: 'homecooked', profile_pic: 'https://api.dicebear.com/7.x/personas/svg?seed=home' },
    recentComments: [
      { id: 3, content: '진짜 맛있어 보여요 ㅠㅠ', users: { display_name: '배고픈사자' } },
    ],
  },
  {
    id: 3,
    image_url: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&auto=format',
    caption: '컬러풀 샐러드 🥗 다이어트 중이라 건강하게 먹기',
    location: '경기 성남시',
    hashtags: ['샐러드', '다이어트', '건강식'],
    likes_count: 31,
    created_at: new Date(Date.now() - 18000000).toISOString(),
    users: { display_name: '건강한식탁', username: 'healthy_table', profile_pic: 'https://api.dicebear.com/7.x/personas/svg?seed=healthy' },
    recentComments: [],
  },
]

const HomePage = ({ currentUser }) => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('posts')
      .select(`
        *,
        users(username, display_name, profile_pic),
        recentComments:comments(id, content, users(display_name))
      `)
      .order('created_at', { ascending: false })
      .limit(30)

    if (error || !data || data.length === 0) {
      setPosts(MOCK_POSTS)
    } else {
      setPosts(data)
    }
    setLoading(false)
  }

  const handleLikeUpdate = (postId, newCount) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, likes_count: newCount } : p))
    )
  }

  return (
    <Layout>
      <Box sx={{ backgroundColor: '#FFF8F0', minHeight: '100%' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
            <Stack spacing={2} alignItems="center">
              <CircularProgress sx={{ color: '#FF6B35' }} />
              <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
                레시피 불러오는 중...
              </Typography>
            </Stack>
          </Box>
        ) : (
          <Box>
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLikeUpdate={handleLikeUpdate}
              />
            ))}
          </Box>
        )}
      </Box>
    </Layout>
  )
}

export default HomePage
