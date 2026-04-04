"use client";
import { Box, Typography, Button, Container } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const slides = [
  {
    tag: "New Collection 2024",
    title: "Celebrate Every Moment",
    titleHighlight: "in Style",
    subtitle: "Ethnic, Western & Footwear for the Modern Woman",
    cta: "Shop Ethnic Wear",
    ctaLink: "/?cat=ethnic",
    cta2: "New Arrivals",
    cta2Link: "/?cat=new",
    bg: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1400&h=700&fit=crop&q=80",
    overlay: "linear-gradient(135deg, rgba(255,240,245,0.85) 0%, rgba(252,228,236,0.6) 40%, transparent 100%)",
  },
  {
    tag: "Festive Season",
    title: "Dress Up For",
    titleHighlight: "Every Occasion",
    subtitle: "Handcrafted lehengas, suits & more – from ₹849",
    cta: "Shop Festive",
    ctaLink: "/?cat=ethnic",
    cta2: "View Offers",
    cta2Link: "/?new=true",
    bg: "https://images.unsplash.com/photo-1617627143233-22f3a3f7e66e?w=1400&h=700&fit=crop&q=80",
    overlay: "linear-gradient(135deg, rgba(255,240,245,0.9) 0%, rgba(252,228,236,0.55) 35%, transparent 100%)",
  },
  {
    tag: "Western Edit",
    title: "Walk Into Summer",
    titleHighlight: "With Confidence",
    subtitle: "Co-ords, dresses & footwear – all under one roof",
    cta: "Shop Western",
    ctaLink: "/?cat=western",
    cta2: "Shop Footwear",
    cta2Link: "/?cat=footwear",
    bg: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1400&h=700&fit=crop&q=80",
    overlay: "linear-gradient(135deg, rgba(255,240,245,0.88) 0%, rgba(252,228,236,0.5) 35%, transparent 100%)",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), []);
  const prev = () => setCurrent(c => (c - 1 + slides.length) % slides.length);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const slide = slides[current];

  return (
    <Box sx={{ position: "relative", height: { xs: 400, sm: 500, md: 600 }, overflow: "hidden", bgcolor: "#FCE4EC" }}>
      {/* Slide image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.7 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <Box
            component="img"
            src={slide.bg}
            alt=""
            sx={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <Box sx={{ position: "absolute", inset: 0, background: slide.overlay }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.55, delay: 0.15 }}
          >
            <Box sx={{ maxWidth: 580 }}>
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: "primary.main",
                    color: "white",
                    px: 2, py: 0.5,
                    borderRadius: 99,
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    mb: 2,
                  }}
                >
                  ✨ {slide.tag}
                </Box>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: "2rem", sm: "2.8rem", md: "3.5rem" },
                    fontWeight: 700,
                    lineHeight: 1.1,
                    mb: 1.5,
                    color: "secondary.main",
                  }}
                >
                  {slide.title}{" "}
                  <Box component="span" sx={{ color: "primary.main" }}>{slide.titleHighlight}</Box>
                </Typography>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                <Typography
                  variant="body1"
                  sx={{ color: "text.secondary", mb: 3.5, fontSize: { xs: "0.9rem", md: "1rem" } }}
                >
                  {slide.subtitle}
                </Typography>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    component={Link}
                    href={slide.ctaLink}
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 99, px: 4, py: 1.5, fontWeight: 700 }}
                  >
                    {slide.cta}
                  </Button>
                  <Button
                    component={Link}
                    href={slide.cta2Link}
                    variant="outlined"
                    color="primary"
                    size="large"
                    sx={{ borderRadius: 99, px: 4, py: 1.5, fontWeight: 700, bgcolor: "rgba(255,255,255,0.7)" }}
                  >
                    {slide.cta2}
                  </Button>
                </Box>
              </motion.div>
            </Box>
          </motion.div>
        </AnimatePresence>
      </Container>

      {/* Arrows */}
      {[
        { dir: "prev", icon: <ArrowBackIosNewIcon sx={{ fontSize: 16 }} />, action: prev, style: { left: 16 } },
        { dir: "next", icon: <ArrowForwardIosIcon sx={{ fontSize: 16 }} />, action: next, style: { right: 16 } },
      ].map(a => (
        <Box
          key={a.dir}
          onClick={a.action}
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            ...a.style,
            zIndex: 3,
            width: 44, height: 44,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "primary.dark",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            cursor: "pointer",
            backdropFilter: "blur(4px)",
            transition: "all 0.2s",
            "&:hover": { bgcolor: "white", boxShadow: "0 6px 24px rgba(233,30,99,0.2)" },
          }}
        >
          {a.icon}
        </Box>
      ))}

      {/* Dots */}
      <Box sx={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 1, zIndex: 3 }}>
        {slides.map((_, i) => (
          <Box
            key={i}
            onClick={() => setCurrent(i)}
            sx={{
              height: 8,
              width: i === current ? 28 : 8,
              borderRadius: 99,
              bgcolor: i === current ? "primary.main" : "rgba(233,30,99,0.3)",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
