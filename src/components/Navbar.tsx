import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon, OpenInNew } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuItems = ["Key Metrics", "dUSD", "dLEND", "Liquidity"];
  const location = useLocation();

  const isActive = (item: string) => {
    const path = `/${item.toLowerCase().replace(" ", "-")}`;
    return location.pathname === path || (location.pathname === "/" && item === "Key Metrics");
  };

  return (
    <AppBar position="static" sx={{ bgcolor: 'rgb(18, 17, 28)', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
      <Toolbar sx={{ px: 3, py: 2 }}>
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
        
        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 3 }}>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              style={{ 
                textDecoration: 'none',
                color: isActive(item) ? '#8702ff' : '#fff',
                fontWeight: isActive(item) ? 600 : 400,
                transition: 'all 0.2s ease-in-out'
              }}
              className="hover:text-primary"
            >
              {item}
            </Link>
          ))}
          <a
            href="https://app.testnet.dtrinity.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              textDecoration: 'none',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease-in-out'
            }}
            className="hover:text-primary"
          >
            dTRINITY App
            <OpenInNew sx={{ fontSize: 16 }} />
          </a>
        </Box>

        {/* Mobile Menu Button */}
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

      {/* Mobile Menu Drawer */}
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
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              sx={{
                color: isActive(item) ? '#8702ff' : '#fff',
                fontWeight: isActive(item) ? 600 : 400,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                  color: '#8702ff'
                }
              }}
            >
              <ListItemText primary={item} />
            </ListItem>
          ))}
          <ListItem 
            component="a"
            href="https://app.testnet.dtrinity.org"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsMenuOpen(false)}
            sx={{
              color: '#fff',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                color: '#8702ff'
              }
            }}
          >
            <ListItemText primary="dTRINITY App" />
            <OpenInNew sx={{ fontSize: 16, ml: 1 }} />
          </ListItem>
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;