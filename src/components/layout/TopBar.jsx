import { AppBar, Toolbar, Box, IconButton, Typography, Badge } from '@mui/material'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'

const TopBar = () => {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#FFF8F0',
        borderBottom: '1px solid rgba(139, 90, 60, 0.1)',
        top: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: 2, minHeight: '56px !important' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <RestaurantMenuIcon sx={{ color: '#FF6B35', fontSize: 28 }} />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 800,
              color: '#8B5A3C',
              fontSize: '1.3rem',
              letterSpacing: '-0.5px',
            }}
          >
            레공유
          </Typography>
        </Box>
        <IconButton>
          <Badge badgeContent={3} color="error">
            <NotificationsNoneIcon sx={{ color: '#8B5A3C', fontSize: 26 }} />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
