"use client";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const wishlist = useStore(s => s.wishlist);
  const products = PRODUCTS.filter(p => wishlist.includes(p.id));

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} sx={{ fontFamily: "Playfair Display, serif" }}>
          My <Box component="span" color="primary.main">Wishlist</Box>
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {products.length} {products.length === 1 ? "item" : "items"} saved
        </Typography>
      </Box>

      {products.length === 0 ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Box sx={{ textAlign: "center", py: 12 }}>
            <FavoriteIcon sx={{ fontSize: 80, color: "primary.light", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" fontWeight={600} gutterBottom>
              Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.disabled" sx={{ mb: 4 }}>
              Save the pieces you love by tapping the heart icon
            </Typography>
            <Button component={Link} href="/" variant="contained" color="primary" size="large" sx={{ borderRadius: 99, px: 5 }}>
              Start Shopping
            </Button>
          </Box>
        </motion.div>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(4, 1fr)" },
            gap: { xs: 2, md: 3 },
          }}
        >
          {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </Box>
      )}
    </Container>
  );
}
