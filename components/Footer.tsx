'use client';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  Divider,
  IconButton,
} from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Link from 'next/link';

const cols = [
  {
    title: 'Shop',
    links: [
      { label: 'Ethnic Wear', href: '/?cat=ethnic' },
      { label: 'Western Wear', href: '/?cat=western' },
      { label: 'Footwear', href: '/?cat=footwear' },
      { label: 'New Arrivals', href: '/?cat=new' },
      { label: 'Sale', href: '/?cat=sale' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Size Guide', href: '#' },
      { label: 'Track Order', href: '#' },
      { label: 'Returns & Exchanges', href: '#' },
      { label: 'Shipping Policy', href: '#' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
];

export default function Footer() {
  return (
    <Box
      sx={{
        bgcolor: '#FCE4EC',
        color: 'rgba(0,0,0,0.85)',
        pt: 8,
        pb: 3,
        mt: 8,
      }}>
      <Container maxWidth='lg'>
        <Grid container spacing={5} sx={{ mb: 6 }}>
          {/* Brand */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant='h5'
              sx={{
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                color: 'black',
                mb: 2,
              }}>
              Aapki{' '}
              <Box component='span' sx={{ color: '#E91E63' }}>
                Pooja
              </Box>
            </Typography>
            <Typography
              variant='body2'
              sx={{ opacity: 0.7, lineHeight: 1.8, mb: 3 }}>
              Your one-stop destination for ethnic, western wear & footwear.
              Celebrating the modern Indian woman with style, quality, and joy.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1.5 }}>
              {[
                { icon: <InstagramIcon />, color: '#E91E63' },
                { icon: <FacebookIcon />, color: '#1877F2' },
                { icon: <WhatsAppIcon />, color: '#25D366' },
                { icon: <YouTubeIcon />, color: '#FF0000' },
              ].map((s, i) => (
                <IconButton
                  key={i}
                  sx={{
                    bgcolor: 'rgba(0,0,0,0.08)',
                    color: 'black',
                    width: 38,
                    height: 38,
                    transition: 'all 0.2s',
                    '& .MuiSvgIcon-root': {
                      color: 'black',
                    },
                    '&:hover': {
                      bgcolor: s.color,
                      transform: 'translateY(-2px)',
                    },
                  }}>
                  {s.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>

          {/* Link columns */}
          {cols.map(col => (
            <Grid key={col.title} size={{ xs: 6, md: 2 }}>
              <Typography
                variant='body2'
                sx={{
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: 'black',
                  mb: 2.5,
                }}>
                {col.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {col.links.map(l => (
                  <Link
                    key={l.label}
                    href={l.href}
                    style={{ textDecoration: 'none' }}>
                    <Typography
                      variant='body2'
                      sx={{
                        opacity: 0.7,
                        transition: 'opacity 0.2s, color 0.2s',
                        '&:hover': { opacity: 1, color: '#F48FB1' },
                      }}>
                      {l.label}
                    </Typography>
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}

          {/* Newsletter */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography
              variant='body2'
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'black',
                mb: 2.5,
              }}>
              Stay in the Loop
            </Typography>
            <Typography variant='body2' sx={{ opacity: 0.7, mb: 2 }}>
              Get exclusive deals, new arrivals & style tips in your inbox.
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <TextField
                placeholder='Your email address'
                size='small'
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'rgba(255,255,255,0.08)',
                    borderRadius: 2,
                    color: 'black',
                    '& fieldset': { borderColor: 'rgba(0,0,0,0.2)' },
                    '&:hover fieldset': {
                      borderColor: 'rgba(0,0,0,0.4)',
                    },
                    '&.Mui-focused fieldset': { borderColor: '#E91E63' },
                  },
                  '& input::placeholder': { color: 'rgba(0,0,0,0.4)' },
                }}
              />
              <Button
                variant='contained'
                color='primary'
                sx={{ borderRadius: 2, fontWeight: 700 }}>
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(0,0,0,0.1)', mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}>
          <Typography variant='caption' sx={{ opacity: 0.6 }}>
            © {new Date().getFullYear()} Aapki Pooja. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {['Visa', 'MasterCard', 'UPI', 'Razorpay'].map(p => (
              <Box
                key={p}
                sx={{
                  bgcolor: 'rgba(255,255,255,0.12)',
                  px: 1.5,
                  py: 0.3,
                  borderRadius: 1,
                }}>
                <Typography
                  variant='caption'
                  sx={{ color: 'black', fontWeight: 700, fontSize: '0.65rem' }}>
                  {p}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
