import { useState } from 'react'
import {
  Box, Card, Avatar, Typography, IconButton, Stack, Chip
} from '@mui/material'
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded'
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded'
import ChatBubbleOutlineRoundedIcon from '@mui/icons-material/ChatBubbleOutlineRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import CommentModal from './CommentModal'
import { supabase } from '../lib/supabase'

const PostCard = ({ post, currentUser, onLikeUpdate }) => {
  const [liked, setLiked] = useState(false)
  const [commentOpen, setCommentOpen] = useState(false)

  const formatTime = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  const handleLike = async () => {
    const newLiked = !liked
    setLiked(newLiked)
    const delta = newLiked ? 1 : -1
    await supabase
      .from('posts')
      .update({ likes_count: post.likes_count + delta })
      .eq('id', post.id)
    onLikeUpdate?.(post.id, post.likes_count + delta)
  }

  const hashtags = post.hashtags || []

  return (
    <>
      <Card
        sx={{
          mb: 1.5,
          borderRadius: 0,
          boxShadow: 'none',
          borderBottom: '1px solid rgba(139, 90, 60, 0.08)',
          backgroundColor: '#fff',
        }}
      >
        {/* 상단: 프로필 */}
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, py: 1.5, gap: 1.5 }}>
          <Avatar
            src={post.users?.profile_pic}
            sx={{ width: 40, height: 40, border: '2px solid #FF6B35' }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>
              {post.users?.display_name || post.users?.username}
            </Typography>
            {post.location && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.3 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: 12, color: '#7A5C4A' }} />
                <Typography variant="caption" sx={{ color: '#7A5C4A' }}>
                  {post.location}
                </Typography>
              </Box>
            )}
          </Box>
          <Typography variant="caption" sx={{ color: '#7A5C4A' }}>
            {formatTime(post.created_at)}
          </Typography>
        </Box>

        {/* 중단: 이미지 */}
        <Box
          component="img"
          src={post.image_url}
          alt="post"
          sx={{
            width: '100%',
            aspectRatio: '1 / 1',
            objectFit: 'cover',
            display: 'block',
          }}
        />

        {/* 하단: 반응 + 내용 */}
        <Box sx={{ px: 2, pt: 1, pb: 1.5 }}>
          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 1 }}>
            <IconButton onClick={handleLike} size="small" sx={{ p: 0.5 }}>
              {liked ? (
                <FavoriteRoundedIcon sx={{ color: '#e53935', fontSize: 22 }} />
              ) : (
                <FavoriteBorderRoundedIcon sx={{ color: '#3D2314', fontSize: 22 }} />
              )}
            </IconButton>
            <Typography variant="body2" sx={{ fontWeight: 600, color: '#3D2314', mr: 1 }}>
              {post.likes_count + (liked ? 1 : 0)}
            </Typography>
            <IconButton onClick={() => setCommentOpen(true)} size="small" sx={{ p: 0.5 }}>
              <ChatBubbleOutlineRoundedIcon sx={{ color: '#3D2314', fontSize: 20 }} />
            </IconButton>
            <Typography variant="body2" sx={{ color: '#3D2314' }}>
              {post.comments?.[0]?.count || 0}
            </Typography>
          </Stack>

          {post.caption && (
            <Typography variant="body2" sx={{ color: '#3D2314', mb: 0.5 }}>
              <strong>{post.users?.display_name}</strong> {post.caption}
            </Typography>
          )}

          {hashtags.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 0.5 }}>
              {hashtags.map((tag, i) => (
                <Typography key={i} variant="caption" sx={{ color: '#7A9E7E', fontWeight: 600 }}>
                  #{tag}
                </Typography>
              ))}
            </Box>
          )}

          {post.recentComments?.length > 0 && (
            <Stack spacing={0.3} sx={{ mt: 0.5 }}>
              {post.recentComments.slice(0, 2).map((c) => (
                <Typography key={c.id} variant="caption" sx={{ color: '#3D2314' }}>
                  <strong>{c.users?.display_name}</strong> {c.content}
                </Typography>
              ))}
            </Stack>
          )}

          <Typography
            variant="caption"
            sx={{ color: '#7A5C4A', cursor: 'pointer', display: 'block', mt: 0.5 }}
            onClick={() => setCommentOpen(true)}
          >
            댓글 모두 보기
          </Typography>
        </Box>
      </Card>

      <CommentModal
        open={commentOpen}
        onClose={() => setCommentOpen(false)}
        postId={post.id}
        currentUser={currentUser}
      />
    </>
  )
}

export default PostCard
