import { useState } from 'react'
import {
  Box, Typography, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, AvatarGroup, Divider, Badge, IconButton
} from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'

const MOCK_ROOMS = [
  {
    id: 'room1',
    name: '요리왕홍길동',
    type: '1:1',
    lastMessage: '레시피 공유해줘서 고마워요!',
    time: '오후 3:20',
    unread: 2,
    avatars: ['hong'],
  },
  {
    id: 'room2',
    name: '김치볶음밥 원데이 클래스',
    type: '단체',
    lastMessage: '내일 준비물 챙겨오세요 😊',
    time: '오후 1:45',
    unread: 5,
    avatars: ['hong', 'chef', 'cook', 'kim'],
  },
  {
    id: 'room3',
    name: '건강한식탁',
    type: '1:1',
    lastMessage: '다이어트 레시피 더 있어요?',
    time: '오전 11:10',
    unread: 0,
    avatars: ['healthy'],
  },
  {
    id: 'room4',
    name: '마카롱 베이킹 클래스',
    type: '단체',
    lastMessage: '오늘 정말 즐거웠어요 🍬',
    time: '어제',
    unread: 0,
    avatars: ['baker', 'sweet', 'cake'],
  },
]

const ChatPage = () => {
  const navigate = useNavigate()
  const [selectedRoom, setSelectedRoom] = useState(null)

  if (selectedRoom) {
    return <ChatRoom room={selectedRoom} onBack={() => setSelectedRoom(null)} />
  }

  return (
    <Layout>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#3D2314', mb: 2 }}>
          채팅
        </Typography>
        <List disablePadding>
          {MOCK_ROOMS.map((room, idx) => (
            <Box key={room.id}>
              <ListItem
                onClick={() => setSelectedRoom(room)}
                sx={{ px: 0, py: 1.5, cursor: 'pointer', '&:hover': { backgroundColor: 'rgba(139,90,60,0.04)', borderRadius: 2 } }}
              >
                <ListItemAvatar>
                  {room.type === '단체' ? (
                    <AvatarGroup max={2} sx={{ '& .MuiAvatar-root': { width: 44, height: 44, fontSize: '0.75rem' } }}>
                      {room.avatars.map((seed) => (
                        <Avatar key={seed} src={`https://api.dicebear.com/7.x/personas/svg?seed=${seed}`} />
                      ))}
                    </AvatarGroup>
                  ) : (
                    <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=${room.avatars[0]}`} sx={{ width: 44, height: 44 }} />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: '#3D2314' }}>
                        {room.name}
                        {room.type === '단체' && (
                          <Typography component="span" variant="caption" sx={{ color: '#7A5C4A', ml: 0.5 }}>
                            {room.avatars.length}
                          </Typography>
                        )}
                      </Typography>
                      <Typography variant="caption" sx={{ color: '#7A5C4A' }}>{room.time}</Typography>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 0.3 }}>
                      <Typography variant="caption" sx={{ color: '#7A5C4A', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 200 }}>
                        {room.lastMessage}
                      </Typography>
                      {room.unread > 0 && (
                        <Box sx={{ backgroundColor: '#FF6B35', color: '#fff', borderRadius: 10, px: 0.8, py: 0.1, fontSize: '0.7rem', fontWeight: 700, minWidth: 18, textAlign: 'center' }}>
                          {room.unread}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
              {idx < MOCK_ROOMS.length - 1 && <Divider sx={{ opacity: 0.5 }} />}
            </Box>
          ))}
        </List>
      </Box>
    </Layout>
  )
}

const MOCK_MESSAGES = [
  { id: 1, text: '안녕하세요! 레시피 보고 왔어요 🍳', mine: false, time: '오후 1:20' },
  { id: 2, text: '안녕하세요~ 어떤 레시피 궁금하세요?', mine: true, time: '오후 1:21' },
  { id: 3, text: '된장찌개 레시피 자세히 알고 싶어요!', mine: false, time: '오후 1:22' },
  { id: 4, text: '물론이죠! 재료는 된장 3큰술, 두부 반모, 애호박 반개...', mine: true, time: '오후 1:25' },
  { id: 5, text: '레시피 공유해줘서 고마워요!', mine: false, time: '오후 3:20' },
]

const ChatRoom = ({ room, onBack }) => {
  const [messages] = useState(MOCK_MESSAGES)

  return (
    <Box sx={{ maxWidth: 480, mx: 'auto', minHeight: '100vh', backgroundColor: '#FFF8F0', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', px: 1, py: 1, borderBottom: '1px solid rgba(139,90,60,0.1)', backgroundColor: '#fff', position: 'sticky', top: 0 }}>
        <IconButton onClick={onBack} sx={{ color: '#8B5A3C' }}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Typography variant="body1" sx={{ fontWeight: 700, color: '#3D2314', flex: 1, textAlign: 'center' }}>
          {room.name}
        </Typography>
        <Box sx={{ width: 40 }} />
      </Box>

      <Box sx={{ flex: 1, overflowY: 'auto', px: 2, py: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        {messages.map((msg) => (
          <Box key={msg.id} sx={{ display: 'flex', justifyContent: msg.mine ? 'flex-end' : 'flex-start', gap: 1, alignItems: 'flex-end' }}>
            {!msg.mine && (
              <Avatar src={`https://api.dicebear.com/7.x/personas/svg?seed=${room.avatars[0]}`} sx={{ width: 32, height: 32, flexShrink: 0 }} />
            )}
            <Box>
              <Box
                sx={{
                  backgroundColor: msg.mine ? '#8B5A3C' : '#fff',
                  color: msg.mine ? '#fff' : '#3D2314',
                  px: 2, py: 1,
                  borderRadius: msg.mine ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  maxWidth: 240,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                }}
              >
                <Typography variant="body2">{msg.text}</Typography>
              </Box>
              <Typography variant="caption" sx={{ color: '#7A5C4A', mt: 0.3, display: 'block', textAlign: msg.mine ? 'right' : 'left' }}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid rgba(139,90,60,0.1)', backgroundColor: '#fff', display: 'flex', gap: 1, alignItems: 'center' }}>
        <Box
          component="input"
          placeholder="메시지 입력..."
          sx={{
            flex: 1, border: 'none', backgroundColor: '#f5f5f5',
            borderRadius: 24, px: 2, py: 1.2,
            fontSize: '0.9rem', outline: 'none', color: '#3D2314',
          }}
        />
        <Box
          component="button"
          sx={{
            backgroundColor: '#FF6B35', color: '#fff', border: 'none',
            borderRadius: '50%', width: 40, height: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', fontSize: '1.1rem',
          }}
        >
          ↑
        </Box>
      </Box>
    </Box>
  )
}

export default ChatPage
