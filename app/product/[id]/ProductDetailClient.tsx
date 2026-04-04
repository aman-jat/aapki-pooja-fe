"use client";
import {
  Box, Container, Typography, Button, Chip, Grid,
  Breadcrumbs, Rating, Divider, IconButton, Tooltip,
  Tab, Tabs, Paper,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedIcon from "@mui/icons-material/Verified";
import CachedIcon from "@mui/icons-material/Cached";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ToastProvider";
import type { Product } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

type Props = { product: Product; related: Product[] };

export default function ProductDetailClient({ product: p, related }: Props) {
  const [activeImg, setActiveImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tab, setTab] = useState(0);
  const { addToCart, setCartOpen, toggleWishlist, isWishlisted } = useStore();
  const toast = useToast();
  const wishlisted = isWishlisted(p.id);

  function handleAddToCart() {
    if (!selectedSize) { toast("Please select a size", "warning"); return; }
    addToCart({
      productId: p.id,
      name: p.name,
      image: p.images[0],
      price: p.price,
      selectedColor: p.colors[selectedColor],
      selectedColorName: p.colorNames[selectedColor],
      selectedSize,
      quantity: 1,
    });
    setCartOpen(true);
    toast("Added to cart! 🛍️");
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumb */}
      <Breadcrumbs sx={{ mb: 3, fontSize: "0.8rem" }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>Home</Link>
        <Link href={`/?cat=${p.category}`} style={{ textDecoration: "none", color: "inherit" }}>
          {p.category.charAt(0).toUpperCase() + p.category.slice(1)}
        </Link>
        <Typography variant="caption" color="primary.main" fontWeight={600}>{p.name}</Typography>
      </Breadcrumbs>

      <Grid container spacing={5}>
        {/* Image Gallery */}
        <Grid size={{ xs: 12, md: 6 }}>
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Thumbnails */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {p.images.map((img, i) => (
                <Box
                  key={i}
                  onClick={() => setActiveImg(i)}
                  sx={{
                    width: 72, height: 80,
                    borderRadius: 2,
                    overflow: "hidden",
                    border: "2px solid",
                    borderColor: activeImg === i ? "primary.main" : "primary.light",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                >
                  <Box component="img" src={img} alt="" sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              ))}
            </Box>

            {/* Main image */}
            <motion.div
              key={activeImg}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
              style={{ flex: 1 }}
            >
              <Box
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  aspectRatio: "3/4",
                  position: "relative",
                  bgcolor: "#FCE4EC",
                }}
              >
                <Box
                  component="img"
                  src={p.images[activeImg]}
                  alt={p.name}
                  sx={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s", "&:hover": { transform: "scale(1.04)" } }}
                />
                {/* Badges */}
                <Box sx={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 0.5 }}>
                  {p.discount > 0 && <Chip label={`${p.discount}% OFF`} size="small" sx={{ bgcolor: "primary.main", color: "white", fontWeight: 800 }} />}
                  {p.isNew && <Chip label="NEW" size="small" sx={{ bgcolor: "secondary.main", color: "white", fontWeight: 800 }} />}
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Grid>

        {/* Product Info */}
        <Grid size={{ xs: 12, md: 6 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Box sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}>
              {p.isBestseller && <Chip label="BESTSELLER" size="small" sx={{ bgcolor: "#FF9800", color: "white", fontWeight: 700, fontSize: "0.65rem" }} />}
              <Chip label={p.subcategory} size="small" variant="outlined" sx={{ borderColor: "primary.light", color: "primary.dark", fontWeight: 600, fontSize: "0.65rem" }} />
            </Box>

            <Typography variant="h4" fontWeight={700} sx={{ fontFamily: "Playfair Display, serif", mb: 1.5, lineHeight: 1.25 }}>
              {p.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <Rating value={p.rating} precision={0.5} readOnly size="small" sx={{ color: "#FF9800" }} />
              <Typography variant="body2" fontWeight={700}>{p.rating}</Typography>
              <Typography variant="body2" color="text.disabled">({p.reviewCount} reviews)</Typography>
            </Box>

            {/* Pricing */}
            <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 3 }}>
              <Typography variant="h4" fontWeight={800} color="primary.dark" sx={{ fontFamily: "Poppins" }}>
                ₹{p.price.toLocaleString("en-IN")}
              </Typography>
              {p.originalPrice > p.price && (
                <>
                  <Typography variant="h6" color="text.disabled" sx={{ textDecoration: "line-through" }}>
                    ₹{p.originalPrice.toLocaleString("en-IN")}
                  </Typography>
                  <Chip label={`${p.discount}% off`} size="small" sx={{ bgcolor: "#E8F5E9", color: "#2E7D32", fontWeight: 700 }} />
                </>
              )}
            </Box>

            <Divider sx={{ mb: 3, borderColor: "primary.light" }} />

            {/* Color */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="body2" fontWeight={700} sx={{ mb: 1.5 }}>
                Color: <Box component="span" color="primary.main">{p.colorNames[selectedColor]}</Box>
              </Typography>
              <Box sx={{ display: "flex", gap: 1.5 }}>
                {p.colors.map((c, i) => (
                  <Tooltip key={i} title={p.colorNames[i]} arrow>
                    <Box
                      onClick={() => setSelectedColor(i)}
                      sx={{
                        width: 32, height: 32,
                        borderRadius: "50%",
                        bgcolor: c,
                        border: "2px solid white",
                        boxShadow: selectedColor === i ? "0 0 0 2.5px #E91E63" : "0 0 0 1.5px rgba(0,0,0,0.12)",
                        transform: selectedColor === i ? "scale(1.15)" : "scale(1)",
                        transition: "all 0.15s",
                        cursor: "pointer",
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Box>

            {/* Size */}
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                <Typography variant="body2" fontWeight={700}>Size</Typography>
                <Typography variant="caption" color="primary.main" sx={{ cursor: "pointer", fontWeight: 600 }}>Size Guide</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {p.sizes.map(size => (
                  <Box
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    sx={{
                      minWidth: 44, height: 44,
                      px: 1,
                      borderRadius: 2,
                      border: "1.5px solid",
                      borderColor: selectedSize === size ? "primary.main" : "primary.light",
                      bgcolor: selectedSize === size ? "primary.light" : "white",
                      color: selectedSize === size ? "primary.dark" : "text.secondary",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "0.8rem", fontWeight: 700,
                      cursor: "pointer",
                      transition: "all 0.15s",
                      "&:hover": { borderColor: "primary.main", color: "primary.main" },
                    }}
                  >
                    {size}
                  </Box>
                ))}
              </Box>
            </Box>

            {/* CTAs */}
            <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ flex: 1, py: 1.5, fontWeight: 700, fontSize: "0.95rem" }}
              >
                Add to Cart
              </Button>
              <IconButton
                onClick={() => { toggleWishlist(p.id); toast(wishlisted ? "Removed from wishlist" : "Added to wishlist 💖", wishlisted ? "info" : "success"); }}
                sx={{
                  width: 56, height: 56,
                  border: "1.5px solid", borderColor: "primary.light",
                  color: wishlisted ? "primary.main" : "text.disabled",
                  bgcolor: wishlisted ? "primary.light" : "white",
                  "&:hover": { bgcolor: "primary.light" },
                }}
              >
                {wishlisted ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
            </Box>

            {/* Trust badges */}
            <Paper variant="outlined" sx={{ p: 2, borderRadius: 3, borderColor: "primary.light" }}>
              <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                {[
                  { icon: <LocalShippingIcon sx={{ fontSize: 18, color: "success.main" }} />, text: "Free delivery above ₹1999" },
                  { icon: <CachedIcon sx={{ fontSize: 18, color: "primary.main" }} />, text: "7-day easy returns" },
                  { icon: <VerifiedIcon sx={{ fontSize: 18, color: "#FF9800" }} />, text: "100% authentic" },
                ].map((b, i) => (
                  <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {b.icon}
                    <Typography variant="caption" fontWeight={600}>{b.text}</Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Box sx={{ mt: 6 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ "& .MuiTab-root": { fontWeight: 700, fontFamily: "Poppins" }, "& .Mui-selected": { color: "primary.main" }, "& .MuiTabs-indicator": { bgcolor: "primary.main" } }}>
          <Tab label="Description" />
          <Tab label="Material & Care" />
        </Tabs>
        <Box sx={{ p: 3, bgcolor: "#FFFBFD", borderRadius: "0 0 16px 16px", border: "1px solid", borderColor: "primary.light", borderTop: "none" }}>
          {tab === 0 && <Typography variant="body1" color="text.secondary" lineHeight={1.8}>{p.description}</Typography>}
          {tab === 1 && (
            <Box>
              <Typography variant="body2" sx={{ mb: 1 }}><strong>Material:</strong> {p.material}</Typography>
              <Typography variant="body2"><strong>Care Instructions:</strong> {p.care}</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Related products */}
      {related.length > 0 && (
        <Box sx={{ mt: 8 }}>
          <Typography variant="h5" fontWeight={700} sx={{ fontFamily: "Playfair Display, serif", mb: 3 }}>
            You May Also <Box component="span" color="primary.main">Like</Box>
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 3 }}>
            {related.map((rp, i) => <ProductCard key={rp.id} product={rp} index={i} />)}
          </Box>
        </Box>
      )}
    </Container>
  );
}
