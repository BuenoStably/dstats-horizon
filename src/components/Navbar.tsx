import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon, OpenInNew } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem } from '@mui/material';
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Key Metrics", "dUSD", "dLEND", "Liquidity"];
  const location = useLocation();

  const getPath = (item: string) => {
    if (item === "Key Metrics") return "/";
    return `/${item.toLowerCase().replace(" ", "-")}`;
  };

  const isActive = (item: string) => {
    const path = getPath(item);
    return location.pathname === path;
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        bgcolor: 'rgb(18, 17, 28)', 
        boxShadow: 'none',
        borderBottom: '1px solid transparent',
        width: '100%',
        margin: 0,
        padding: 0,
        position: 'relative',
        left: 'auto',
        right: 'auto'
      }}
    >
      <Toolbar sx={{ px: { xs: 2, sm: 3 }, py: 2, maxWidth: '1400px', width: '100%', mx: 'auto' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <img 
            src="https://app.testnet.dtrinity.org/dlend/trinity.svg" 
            alt="Trinity Logo" 
            style={{ height: '24px', width: 'auto' }}
          />
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
            dSTATS
          </Typography>
        </Box>
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 3 }}>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={getPath(item)}
              style={{
                color: isActive(item) ? '#8702ff' : 'white',
                textDecoration: 'none',
                transition: 'color 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#8702ff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive(item) ? '#8702ff' : 'white';
              }}
            >
              {item}
            </Link>
          ))}
          <a
            href="https://app.testnet.dtrinity.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#8702ff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'white';
            }}
          >
            dTRINITY App
            <OpenInNew sx={{ fontSize: 16 }} />
          </a>
        </Box>

        <IconButton
          sx={{ 
            ml: 'auto', 
            display: { md: 'none' },
            color: 'white'
          }}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Toolbar>

      <Drawer
        anchor="right"
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        sx={{
          display: { md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            bgcolor: 'rgb(18, 17, 28)',
            color: 'white'
          }
        }}
      >
        <List>
          {menuItems.map((item) => (
            <ListItem 
              key={item}
              onClick={() => setIsMenuOpen(false)}
              component={Link}
              to={getPath(item)}
              sx={{
                color: isActive(item) ? '#8702ff' : 'white',
                textDecoration: 'none',
                transition: 'color 0.2s',
                '&:hover': {
                  color: '#8702ff'
                }
              }}
            >
              {item}
            </ListItem>
          ))}
          <ListItem 
            component="a"
            href="https://app.testnet.dtrinity.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            sx={{
              color: 'white',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.2s',
              '&:hover': {
                color: '#8702ff'
              }
            }}
          >
            dTRINITY App
            <OpenInNew sx={{ fontSize: 16 }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;