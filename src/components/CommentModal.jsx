import { useState, useEffect } from 'react'
import {
  SwipeableDrawer, Box, Typography, Divider, Avatar, TextField,
  IconButton, Stack, CircularProgress
} from '@mui/material'
import SendRoundedIcon from '@mui/icons-material/SendRounded'
import { supabase } from '../lib/supabase'

const CommentModal = ({ open, onClose, postId, currentUser }) => {
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (open && postId) fetchComments()
  }, [open, postId])

  const fetchComments = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('comments')
      .select('*, users(username, display_name, profile_pic)')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })
    setComments(data || [])
    setLoading(false)
  }

  const handleSubmit = async () => {
    if (!newComment.trim() || !currentUser) return
    setSubmitting(true)
    await supabase.from('comments').insert({
      post_id: postId,
      user_id: currentUser.id,
      content: newComment.trim(),
    })
    setNewComment('')
    await fetchComments()
    setSubmitting(false)
  }

  const formatTime = (dateStr) => {
    const d = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - d) / 1000)
    if (diff < 60) return '방금 전'
    if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
    if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
    return `${Math.floor(diff / 86400)}일 전`
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={onClose}
      onOpen={() => {}}
      disableSwipeToOpen
      PaperProps={{
        sx: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          maxHeight: '75vh',
          maxWidth: 480,
          mx: 'auto',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Box sx={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#ddd' }} />
      </Box>
      <Typography variant="h6" sx={{ px: 2, pb: 1, fontWeight: 700, color: '#3D2314' }}>
        댓글 {comments.length}개
      </Typography>
      <Divider />

      <Box sx={{ overflowY: 'auto', flex: 1, px: 2, py: 1, minHeight: 200, maxHeight: 'calc(75vh - 140px)' }}>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress size={24} sx={{ color: '#8B5A3C' }} />
          </Box>
        ) : comments.length === 0 ? (
          <Typography variant="body2" sx={{ color: '#7A5C4A', textAlign: 'center', py: 4 }}>
            첫 댓글을 남겨보세요! 🍴
          </Typography>
        ) : (
          <Stack spacing={2}>
            {comments.map((c) => (
              <Box key={c.id} sx={{ display: 'flex', gap: 1.5 }}>
                <Avatar
                  src={c.users?.profile_pic}
                  sx={{ width: 36, height: 36, flexShrink: 0 }}
                />
                <Box>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'baseline' }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>
                      {c.users?.display_name || c.users?.username}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#7A5C4A' }}>
                      {formatTime(c.created_at)}
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: '#3D2314', mt: 0.3 }}>
                    {c.content}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>
        )}
      </Box>

      <Divider />
      <Box sx={{ px: 2, py: 1.5, display: 'flex', gap: 1, alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="댓글 달기..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSubmit()}
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 24,
              backgroundColor: '#f5f5f5',
              '& fieldset': { border: 'none' },
            },
          }}
        />
        <IconButton
          onClick={handleSubmit}
          disabled={!newComment.trim() || submitting}
          sx={{ color: '#FF6B35' }}
        >
          <SendRoundedIcon />
        </IconButton>
      </Box>
    </SwipeableDrawer>
  )
}

export default CommentModal
