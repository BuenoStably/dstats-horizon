import { Link, useLocation } from "react-router-dom";
import { Menu as MenuIcon, Close as CloseIcon, OpenInNew } from '@mui/icons-material';
import { AppBar, Toolbar, Typography, IconButton, Box, Drawer, List, ListItem } from '@mui/material';
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
        
        <Box sx={{ display: { xs: 'none', md: 'flex' }, ml: 4, gap: 3 }}>
          {menuItems.map((item) => (
            <Link
              key={item}
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className={`transition-colors duration-200 ${
                isActive(item) ? 'text-primary' : 'text-white hover:text-primary'
              }`}
            >
              {item}
            </Link>
          ))}
          <a
            href="https://app.testnet.dtrinity.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-primary transition-colors duration-200 flex items-center gap-1"
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
              to={`/${item.toLowerCase().replace(" ", "-")}`}
              className={`transition-colors duration-200 ${
                isActive(item) ? 'text-primary' : 'text-white hover:text-primary'
              }`}
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
            className="text-white hover:text-primary transition-colors duration-200 flex items-center gap-1"
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