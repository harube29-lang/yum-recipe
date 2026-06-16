import { Paper, BottomNavigation, BottomNavigationAction, Fab } from '@mui/material'
import { useNavigate, useLocation } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { label: '홈', icon: <HomeRoundedIcon />, path: '/' },
    { label: '모임', icon: <GroupsRoundedIcon />, path: '/class' },
    { label: null, icon: null, path: null },
    { label: '채팅', icon: <ChatBubbleRoundedIcon />, path: '/chat' },
    { label: '마이', icon: <PersonRoundedIcon />, path: '/mypage' },
  ]

  const currentValue = navItems.findIndex(
    (item) => item.path === location.pathname
  )

  return (
    <Paper
      elevation={0}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        borderTop: '1px solid rgba(139, 90, 60, 0.1)',
        backgroundColor: '#ffffff',
        zIndex: 1100,
      }}
    >
      <BottomNavigation
        value={currentValue < 0 ? false : currentValue}
        sx={{ height: 64, backgroundColor: 'transparent', position: 'relative' }}
      >
        {navItems.map((item, index) => {
          if (index === 2) {
            return (
              <BottomNavigationAction
                key="fab"
                icon={
                  <Fab
                    size="medium"
                    onClick={() => navigate('/create')}
                    sx={{
                      backgroundColor: '#FF6B35',
                      color: '#fff',
                      boxShadow: '0 4px 16px rgba(255, 107, 53, 0.4)',
                      '&:hover': { backgroundColor: '#e55a25' },
                      position: 'relative',
                      top: -20,
                    }}
                  >
                    <AddRoundedIcon />
                  </Fab>
                }
                sx={{ minWidth: 0 }}
              />
            )
          }
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              icon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: '#7A5C4A',
                '&.Mui-selected': { color: '#8B5A3C' },
                minWidth: 0,
                fontSize: '0.65rem',
              }}
            />
          )
        })}
      </BottomNavigation>
    </Paper>
  )
}

export default BottomNav
