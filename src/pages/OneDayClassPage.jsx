import { Box, Typography, Card, CardContent, Stack, Avatar, AvatarGroup, Button, Chip } from '@mui/material'
import Layout from '../components/layout/Layout'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined'
import PeopleOutlineRoundedIcon from '@mui/icons-material/PeopleOutlineRounded'

const MOCK_CLASSES = [
  {
    id: 1,
    title: '김치볶음밥 원데이 클래스',
    host: '요리왕홍길동',
    location: '서울 마포구 요리학원',
    time: '2026-06-20 14:00',
    current: 5,
    max: 10,
    category: '한식',
    avatars: ['hong', 'chef', 'cook', 'kim'],
    color: '#FF6B35',
  },
  {
    id: 2,
    title: '수제 파스타 만들기',
    host: '이탈리안셰프',
    location: '경기 성남 푸드스튜디오',
    time: '2026-06-21 11:00',
    current: 3,
    max: 8,
    category: '양식',
    avatars: ['pasta', 'italy', 'food'],
    color: '#7A9E7E',
  },
  {
    id: 3,
    title: '마카롱 베이킹 클래스',
    host: '파티시에김',
    location: '부산 해운대 베이킹룸',
    time: '2026-06-22 13:00',
    current: 7,
    max: 8,
    category: '디저트',
    avatars: ['baker', 'sweet', 'cake', 'dessert'],
    color: '#C4956A',
  },
  {
    id: 4,
    title: '초밥 만들기 체험',
    host: '스시마스터',
    location: '서울 강남 일식클래스',
    time: '2026-06-25 18:00',
    current: 2,
    max: 6,
    category: '일식',
    avatars: ['sushi', 'japan'],
    color: '#8B5A3C',
  },
]

const OneDayClassPage = () => {
  const formatDate = (dateStr) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}월 ${d.getDate()}일 ${d.getHours()}:${String(d.getMinutes()).padStart(2, '0')}`
  }

  return (
    <Layout>
      <Box sx={{ px: 2, pt: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, color: '#3D2314', mb: 0.5 }}>
          원데이 클래스 모임
        </Typography>
        <Typography variant="body2" sx={{ color: '#7A5C4A', mb: 2 }}>
          📍 내 주변 요리 클래스를 찾아보세요
        </Typography>

        <Stack spacing={2}>
          {MOCK_CLASSES.map((cls) => (
            <Card
              key={cls.id}
              sx={{
                borderRadius: 3,
                boxShadow: '0 2px 12px rgba(61, 35, 20, 0.08)',
                border: '1px solid rgba(139, 90, 60, 0.08)',
                overflow: 'hidden',
              }}
            >
              <Box sx={{ height: 4, backgroundColor: cls.color }} />
              <CardContent sx={{ p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                  <Chip
                    label={cls.category}
                    size="small"
                    sx={{ backgroundColor: `${cls.color}20`, color: cls.color, fontWeight: 700, fontSize: '0.7rem' }}
                  />
                  <Typography variant="caption" sx={{ color: '#7A5C4A' }}>
                    주최: {cls.host}
                  </Typography>
                </Box>

                <Typography variant="body1" sx={{ fontWeight: 700, color: '#3D2314', mb: 1.5 }}>
                  {cls.title}
                </Typography>

                <Stack spacing={0.7} sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeRoundedIcon sx={{ fontSize: 16, color: '#7A5C4A' }} />
                    <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
                      {formatDate(cls.time)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LocationOnOutlinedIcon sx={{ fontSize: 16, color: '#7A5C4A' }} />
                    <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
                      {cls.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PeopleOutlineRoundedIcon sx={{ fontSize: 16, color: '#7A5C4A' }} />
                    <Typography variant="body2" sx={{ color: '#7A5C4A' }}>
                      {cls.current}/{cls.max}명 모집 중
                    </Typography>
                  </Box>
                </Stack>

                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <AvatarGroup max={4} sx={{ '& .MuiAvatar-root': { width: 28, height: 28, fontSize: '0.7rem' } }}>
                    {cls.avatars.map((seed) => (
                      <Avatar
                        key={seed}
                        src={`https://api.dicebear.com/7.x/personas/svg?seed=${seed}`}
                      />
                    ))}
                  </AvatarGroup>
                  <Button
                    variant="contained"
                    size="small"
                    disabled={cls.current >= cls.max}
                    sx={{
                      backgroundColor: cls.current >= cls.max ? '#ddd' : cls.color,
                      color: cls.current >= cls.max ? '#999' : '#fff',
                      borderRadius: 20,
                      fontWeight: 600,
                      px: 2,
                      '&:hover': { backgroundColor: cls.color, opacity: 0.9 },
                    }}
                  >
                    {cls.current >= cls.max ? '모집 완료' : '참가하기'}
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>
    </Layout>
  )
}

export default OneDayClassPage
