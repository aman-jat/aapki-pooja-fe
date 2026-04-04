"use client";
import {
  AppBar, Toolbar, Box, Typography, InputBase, IconButton,
  Badge, Drawer, List, ListItem, ListItemText, useScrollTrigger,
  useMediaQuery, useTheme, Slide,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Ethnic", href: "/?cat=ethnic" },
  { label: "Western", href: "/?cat=western" },
  { label: "Footwear", href: "/?cat=footwear" },
  { label: "New Arrivals", href: "/?cat=new" },
];

export default function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const cartCount = useStore(s => s.cartCount());
  const wishlistCount = useStore(s => s.wishlist.length);
  const setCartOpen = useStore(s => s.setCartOpen);
  const scrolled = useScrollTrigger({ disableHysteresis: true, threshold: 20 });

  return (
    <>
      <AppBar
        position="fixed"
        elevation={scrolled ? 4 : 0}
        sx={{
          top: 40,
          bgcolor: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid",
          borderColor: "primary.light",
          transition: "all 0.3s ease",
          boxShadow: scrolled ? "0 4px 24px rgba(233,30,99,0.1)" : "none",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 4 }, minHeight: { xs: 60, md: 70 } }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
            <Typography
              variant="h5"
              sx={{
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                color: "primary.dark",
                letterSpacing: "-0.01em",
                fontSize: { xs: "1.25rem", md: "1.5rem" },
              }}
            >
              Aapki <span style={{ color: "#E91E63" }}>Pooja</span>
            </Typography>
          </Link>

          {/* Desktop nav links */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4, ml: 5 }}>
              {navLinks.map(link => (
                <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "text.secondary",
                      position: "relative",
                      transition: "color 0.2s",
                      "&:hover": { color: "primary.main" },
                      "&:hover::after": { transform: "scaleX(1)" },
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: -4, left: 0, right: 0,
                        height: 2,
                        bgcolor: "primary.main",
                        borderRadius: 99,
                        transform: "scaleX(0)",
                        transition: "transform 0.2s",
                      },
                    }}
                  >
                    {link.label}
                  </Typography>
                </Link>
              ))}
            </Box>
          )}

          <Box sx={{ flex: 1 }} />

          {/* Search */}
          {!isMobile && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#FFF0F5",
                border: "1.5px solid",
                borderColor: "primary.light",
                borderRadius: 99,
                px: 2, py: 0.5,
                mr: 2,
                transition: "all 0.2s",
                "&:focus-within": {
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 3px rgba(233,30,99,0.08)",
                  bgcolor: "white",
                },
              }}
            >
              <SearchIcon sx={{ color: "text.disabled", fontSize: 18, mr: 1 }} />
              <InputBase
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                sx={{ fontSize: "0.85rem", width: 200 }}
              />
            </Box>
          )}

          {/* Icons */}
          <Link href="/wishlist">
            <IconButton sx={{ color: "text.secondary", "&:hover": { color: "primary.main", bgcolor: "primary.light" } }}>
              <Badge badgeContent={wishlistCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16 } }}>
                <FavoriteIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Link>

          <IconButton
            onClick={() => setCartOpen(true)}
            sx={{ color: "text.secondary", "&:hover": { color: "primary.main", bgcolor: "primary.light" } }}
          >
            <Badge badgeContent={cartCount} color="primary" sx={{ "& .MuiBadge-badge": { fontSize: 10, minWidth: 16, height: 16 } }}>
              <ShoppingCartIcon fontSize="small" />
            </Badge>
          </IconButton>

          {isMobile && (
            <IconButton onClick={() => setMobileOpen(true)} sx={{ color: "text.primary" }}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <Box sx={{ width: 280, pt: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-end", px: 2, mb: 2 }}>
            <IconButton onClick={() => setMobileOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ px: 2, mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                bgcolor: "#FFF0F5",
                border: "1.5px solid #FCE4EC",
                borderRadius: 99,
                px: 2, py: 0.75,
              }}
            >
              <SearchIcon sx={{ color: "text.disabled", fontSize: 18, mr: 1 }} />
              <InputBase placeholder="Search..." sx={{ fontSize: "0.85rem", flex: 1 }} />
            </Box>
          </Box>
          <List>
            {navLinks.map(link => (
              <ListItem key={link.label} component={Link} href={link.href} onClick={() => setMobileOpen(false)}
                sx={{ "&:hover": { bgcolor: "primary.light" }, borderRadius: 2, mx: 1 }}>
                <ListItemText
                  primary={link.label}
                  primaryTypographyProps={{ fontWeight: 600, fontSize: "1rem" }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      {/* Spacer */}
      <Box sx={{ height: { xs: 100, md: 110 } }} />
    </>
  );
}
