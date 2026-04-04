'use client';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MidBanner() {
  return (
    <Box
      sx={{
        my: 6,
        mx: { xs: 2, md: 4 },
        borderRadius: 5,
        overflow: 'hidden',
        position: 'relative',
        minHeight: { xs: 200, md: 260 },
        display: 'flex',
        alignItems: 'center',
      }}>
      <Box
        component='img'
        src='https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=1200&h=400&fit=crop&q=80'
        alt=''
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(26,26,46,0.88) 0%, rgba(26,26,46,0.4) 60%, transparent 100%)',
        }}
      />
      <Container maxWidth='lg' sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <Typography
            variant='caption'
            sx={{
              color: '#F48FB1',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}>
            Festive Special
          </Typography>
          <Typography
            variant='h3'
            sx={{
              color: 'white',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '2.2rem' },
              my: 1.5,
              maxWidth: 500,
            }}>
            Suit Starting at{' '}
            <Box component='span' sx={{ color: '#F48FB1' }}>
              ₹1,999
            </Box>
          </Typography>
          <Button
            component={Link}
            href='/?cat=ethnic'
            variant='contained'
            color='primary'
            sx={{ borderRadius: 99, fontWeight: 700 }}>
            Shop Festive Wear
          </Button>
        </motion.div>
      </Container>
    </Box>
  );
}
