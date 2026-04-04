"use client";
import { Box, Typography } from "@mui/material";

const messages = [
  "🎉 SALE – UP TO 40% OFF ON ETHNIC WEAR",
  "✨ FREE SHIPPING ON ORDERS OVER ₹1999",
  "💝 FLAT 20% OFF NEW ARRIVALS – USE CODE: AAPKI20",
  "🌸 HANDCRAFTED STYLES FOR EVERY OCCASION",
  "🎀 NEW COLLECTION LIVE NOW – SHOP THE LOOK",
];

const track = [...messages, ...messages].join("   •   ");

export default function AnnouncementBar() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: 40,
        bgcolor: "secondary.main",
        overflow: "hidden",
        zIndex: 1300,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          whiteSpace: "nowrap",
          animation: "marquee 30s linear infinite",
          "&:hover": { animationPlayState: "paused" },
          "@keyframes marquee": {
            from: { transform: "translateX(0)" },
            to: { transform: "translateX(-50%)" },
          },
        }}
      >
        {[0, 1].map(i => (
          <Typography
            key={i}
            variant="caption"
            sx={{
              color: "white",
              fontSize: "0.7rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              px: 8,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {messages.map((m, j) => (
              <span key={j}>
                <span style={{ color: "#F48FB1", marginRight: 12 }}>•</span>
                {m}
              </span>
            ))}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
