import {
  Box,
  Container,
  Grid,
  Typography,
  Paper,
  Button,
  Stack,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import DirectionsIcon from '@mui/icons-material/Directions';

const contactActions = [
  {
    label: 'Get Directions',
    icon: <DirectionsIcon />,
    href: 'https://www.google.com/maps?gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MgYIAhBFGDwyBggDEEUYPNIBBzEyN2owajSoAgCwAgE&um=1&ie=UTF-8&fb=1&gl=in&sa=X&geocode=KU8GMJAO_WI5MRaOzFOI9Z7c&daddr=11/5A,+near+Gurukripa+Hotel,+South+Tukoganj,+Indore,+Madhya+Pradesh+452002',
    variant: 'contained',
  },
  {
    label: 'Instagram',
    icon: <InstagramIcon />,
    href: 'https://www.instagram.com/aapkipooja.in',
    variant: 'outlined',
  },
];

export default function ContactPage() {
  return (
    <Box sx={{ bgcolor: '#FFF0F5', minHeight: '100vh', py: { xs: 8, md: 12 } }}>
      <Container maxWidth='lg'>
        <Typography
          variant='h2'
          sx={{
            fontWeight: 800,
            mb: 1.5,
            color: 'primary.dark',
            textAlign: { xs: 'center', md: 'left' },
          }}>
          Contact Us
        </Typography>
        <Typography
          variant='body1'
          sx={{
            color: 'text.secondary',
            mb: 5,
            maxWidth: 680,
            mx: { xs: 'auto', md: 0 },
            textAlign: { xs: 'center', md: 'left' },
          }}>
          Have a question about your order, need styling help, or want to
          collaborate? Reach out through any of the options below and we’ll get
          back to you right away.
        </Typography>

        <Stack spacing={2} flex={1} direction={'row'}>
          <Stack flex={1}>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'primary.50',
                boxShadow: '0 12px 40px rgba(233,30,99,0.08)',
                height: '100%',
              }}>
              <Box
                component='iframe'
                src='https://www.google.com/maps?q=11/5A,+near+Gurukripa+Hotel,+South+Tukoganj,+Indore,+Madhya+Pradesh+452002&output=embed'
                width='100%'
                height='100%'
                sx={{ minHeight: 520, border: 0 }}
                loading='lazy'
                allowFullScreen
              />
            </Paper>
          </Stack>

          <Stack>
            <Paper
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '1px solid',
                borderColor: '100',
                bgcolor: 'white',
                p: { xs: 3, md: 4 },
                boxShadow: '0 16px 48px rgba(233,30,99,0.08)',
                height: '100%',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
              <Box>
                <Typography variant='h5' sx={{ fontWeight: 700, mb: 1.5 }}>
                  Let’s get in touch
                </Typography>
                {/* <Typography
                  variant='body2'
                  flexWrap={'wrap'}
                  sx={{ color: 'text.secondary', mb: 4 }}>
                  Choose the best way to connect and we’ll make sure your
                  request is handled quickly.
                </Typography> */}

                <Stack spacing={2}>
                  <Box
                    sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ mt: 0.25, color: 'primary.main' }}>
                      <LocationOnIcon />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                        Store Address
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', mt: 0.5 }}>
                        11/5A, near Gurukripa Hotel, South Tukoganj, Indore,
                        Madhya Pradesh 452002
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ mt: 0.25, color: 'primary.main' }}>
                      <EmailIcon />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                        Support Email
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', mt: 0.5 }}>
                        hello@aapkipooja.com
                      </Typography>
                    </Box>
                  </Box>

                  <Box
                    sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                    <Box sx={{ mt: 0.25, color: 'primary.main' }}>
                      <PhoneIcon />
                    </Box>
                    <Box>
                      <Typography variant='subtitle2' sx={{ fontWeight: 700 }}>
                        Phone
                      </Typography>
                      <Typography
                        variant='body2'
                        sx={{ color: 'text.secondary', mt: 0.5 }}>
                        +91 12345 67890
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              </Box>

              <Stack spacing={2} sx={{ mt: 4 }} direction={'row'}>
                {contactActions.map(action => (
                  <Button
                    fullWidth
                    key={action.label}
                    component='a'
                    href={action.href}
                    target={
                      action.href.startsWith('http') ? '_blank' : undefined
                    }
                    rel={
                      action.href.startsWith('http') ? 'noreferrer' : undefined
                    }
                    variant={action.variant as 'contained' | 'outlined'}
                    startIcon={action.icon}
                    sx={{
                      borderRadius: 99,
                      py: 1.5,
                      textTransform: 'none',
                      fontWeight: 700,
                    }}>
                    <Typography variant='button' sx={{ display: 'block' }}>
                      {action.label}
                    </Typography>
                  </Button>
                ))}
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
