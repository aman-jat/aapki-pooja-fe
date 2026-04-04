"use client";
import { Box, Container, Typography, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { motion } from "framer-motion";
import { useToast } from "@/components/ToastProvider";

export default function DiscountBanner() {
  const toast = useToast();

  function copyCode(code: string) {
    navigator.clipboard.writeText(code).catch(() => {});
    toast(`Code "${code}" copied! 🎉`);
  }

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #C2185B 0%, #E91E63 50%, #FF4081 100%)",
        backgroundSize: "200% 200%",
        animation: "shimmer-bg 4s ease infinite",
        "@keyframes shimmer-bg": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        position: "relative",
        overflow: "hidden",
        py: { xs: 4, md: 5 },
      }}
    >
      {/* Shimmer overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2.5s infinite",
          "@keyframes shimmer": {
            "0%": { backgroundPosition: "-200% center" },
            "100%": { backgroundPosition: "200% center" },
          },
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1, textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontFamily: "Playfair Display, serif",
              fontWeight: 700,
              fontSize: { xs: "1.5rem", md: "2rem" },
              mb: 1,
              textShadow: "0 2px 12px rgba(0,0,0,0.2)",
            }}
          >
            Limited Time Offer! 🎉
          </Typography>
          <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.9)", mb: 2, fontSize: { xs: "0.9rem", md: "1rem" } }}>
            Flat 20% off on all New Arrivals — use code at checkout
          </Typography>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { code: "AAPKI20", desc: "20% off New Arrivals" },
              { code: "FIRST15", desc: "15% off first order" },
              { code: "ETHNIC30", desc: "30% off ethnic wear" },
            ].map(offer => (
              <Box
                key={offer.code}
                onClick={() => copyCode(offer.code)}
                sx={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.5,
                  bgcolor: "rgba(255,255,255,0.15)",
                  border: "1.5px dashed rgba(255,255,255,0.6)",
                  px: 3, py: 1.5,
                  borderRadius: 3,
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography sx={{ color: "white", fontWeight: 800, letterSpacing: "0.12em", fontSize: "1rem" }}>
                    {offer.code}
                  </Typography>
                  <ContentCopyIcon sx={{ fontSize: 14, color: "rgba(255,255,255,0.7)" }} />
                </Box>
                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.8)" }}>{offer.desc}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}
