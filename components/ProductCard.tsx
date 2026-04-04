'use client';
import {
  Card,
  CardMedia,
  CardContent,
  Box,
  Typography,
  IconButton,
  Chip,
  Tooltip,
  Skeleton,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ToastProvider';
import type { Product } from '@/lib/products';
import Link from 'next/link';

type Props = { product: Product; index?: number };

export default function ProductCard({ product: p, index = 0 }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { toggleWishlist, isWishlisted, addToCart, setCartOpen } = useStore();
  const toast = useToast();
  const wishlisted = isWishlisted(p.id);

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    toggleWishlist(p.id);
    toast(
      wishlisted ? 'Removed from wishlist' : 'Added to wishlist 💖',
      wishlisted ? 'info' : 'success',
    );
  }

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    addToCart({
      productId: p.id,
      name: p.name,
      image: p.images[0],
      price: p.price,
      selectedColor: p.colors[0],
      selectedColorName: p.colorNames[0],
      selectedSize: p.sizes[Math.floor(p.sizes.length / 2)],
      quantity: 1,
    });
    setCartOpen(true);
    toast('Added to cart! 🛍️');
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 8) * 0.06 }}>
      <Link href={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
        <Card
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          sx={{
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
            border: '1px solid',
            borderColor: 'primary.100',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            '&:hover': { transform: 'translateY(-8px)' },
            cursor: 'pointer',
            bgcolor: 'white',
          }}>
          {/* Image */}
          <Box
            sx={{
              position: 'relative',
              aspectRatio: '3/4',
              overflow: 'hidden',
              bgcolor: '#FCE4EC',
            }}>
            {!imgLoaded && (
              <Skeleton
                variant='rectangular'
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              />
            )}
            <CardMedia
              component='img'
              image={p.images[0]}
              alt={p.name}
              onLoad={() => setImgLoaded(true)}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.06)' : 'scale(1)',
                opacity: imgLoaded ? 1 : 0,
              }}
            />

            {/* Badges */}
            <Box
              sx={{
                position: 'absolute',
                top: 10,
                left: 10,
                display: 'flex',
                flexDirection: 'column',
                gap: 0.5,
              }}>
              {p.discount > 0 && (
                <Chip
                  label={`${p.discount}% OFF`}
                  size='small'
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    height: 22,
                  }}
                />
              )}
              {p.isNew && (
                <Chip
                  label='NEW'
                  size='small'
                  sx={{
                    bgcolor: 'secondary.main',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    height: 22,
                  }}
                />
              )}
              {p.isBestseller && (
                <Chip
                  label='BESTSELLER'
                  size='small'
                  sx={{
                    bgcolor: '#FF9800',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: '0.65rem',
                    height: 22,
                  }}
                />
              )}
            </Box>

            {/* Wishlist */}
            <IconButton
              onClick={handleWishlist}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'white',
                width: 36,
                height: 36,
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#FCE4EC', transform: 'scale(1.1)' },
              }}>
              {wishlisted ? (
                <FavoriteIcon sx={{ fontSize: 18, color: 'primary.main' }} />
              ) : (
                <FavoriteBorderIcon
                  sx={{ fontSize: 18, color: 'text.disabled' }}
                />
              )}
            </IconButton>

            {/* Add to Cart overlay */}
            <Box
              onClick={handleQuickAdd}
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                bgcolor: 'rgba(233,30,99,0.95)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
                py: 1.5,
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transform: 'translateY(0)',
                transition: 'none',
                cursor: 'pointer',
              }}>
              <ShoppingBagIcon sx={{ fontSize: 16 }} />
              Add to Cart
            </Box>
          </Box>

          {/* Info */}
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Typography
              variant='body2'
              fontWeight={700}
              sx={{
                mb: 0.5,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                lineHeight: 1.4,
                fontSize: '0.82rem',
              }}>
              {p.name}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                flexWrap: 'wrap',
              }}>
              <Typography
                variant='body2'
                fontWeight={800}
                color='primary.dark'
                fontSize='0.95rem'>
                ₹{p.price.toLocaleString('en-IN')}
              </Typography>
              {p.originalPrice > p.price && (
                <Typography
                  variant='caption'
                  color='text.disabled'
                  sx={{ textDecoration: 'line-through' }}>
                  ₹{p.originalPrice.toLocaleString('en-IN')}
                </Typography>
              )}
              {p.discount > 0 && (
                <Typography
                  variant='caption'
                  color='success.main'
                  fontWeight={700}>
                  {p.discount}% off
                </Typography>
              )}
            </Box>

            {/* Rating */}
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
              <StarIcon sx={{ fontSize: 13, color: '#FF9800' }} />
              <Typography variant='caption' fontWeight={700}>
                {p.rating}
              </Typography>
              <Typography variant='caption' color='text.disabled'>
                ({p.reviewCount})
              </Typography>
            </Box>

            {/* Color dots */}
            <Box sx={{ display: 'flex', gap: 0.5, mt: 1 }}>
              {p.colors.slice(0, 4).map((c, i) => (
                <Tooltip key={i} title={p.colorNames[i]} arrow>
                  <Box
                    sx={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      bgcolor: c,
                      border: '2px solid white',
                      boxShadow: '0 0 0 1px rgba(0,0,0,0.15)',
                      transition: 'transform 0.15s',
                      '&:hover': { transform: 'scale(1.3)' },
                    }}
                  />
                </Tooltip>
              ))}
              {p.colors.length > 4 && (
                <Typography
                  variant='caption'
                  color='text.disabled'
                  sx={{ ml: 0.5 }}>
                  +{p.colors.length - 4}
                </Typography>
              )}
            </Box>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
