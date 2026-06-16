import { Box } from '@mui/material'
import TopBar from './TopBar'
import BottomNav from './BottomNav'

const Layout = ({ children }) => {
  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        minHeight: '100vh',
        backgroundColor: '#FFF8F0',
        position: 'relative',
      }}
    >
      <TopBar />
      <Box sx={{ pt: '56px', pb: '64px', minHeight: '100vh' }}>
        {children}
      </Box>
      <BottomNav />
    </Box>
  )
}

export default Layout
