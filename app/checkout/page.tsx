'use client';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { useToast } from '@/components/ToastProvider';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Script from 'next/script';

declare global {
  interface Window {
    Razorpay: any;
  }
}

const steps = ['Delivery', 'Payment', 'Confirmation'];

type FormData = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
};

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, setCartOpen } = useStore();
  const toast = useToast();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const subtotal = cartTotal();
  const delivery = subtotal >= 1999 ? 0 : 99;
  const total = subtotal + delivery - couponDiscount;

  const COUPONS: Record<string, number> = {
    AAPKI20: Math.round(subtotal * 0.2),
    FIRST15: Math.round(subtotal * 0.15),
    ETHNIC30: Math.round(subtotal * 0.3),
  };

  function applyCoupon() {
    const discount = COUPONS[coupon.toUpperCase()];
    if (discount) {
      setCouponDiscount(discount);
      toast(`Coupon applied! You saved ₹${discount} 🎉`);
    } else {
      toast('Invalid coupon code', 'error');
    }
  }

  function validateForm() {
    return (
      form.name &&
      form.email &&
      form.phone &&
      form.address &&
      form.city &&
      form.state &&
      form.pincode
    );
  }

  function handlePay() {
    if (!validateForm()) {
      toast('Please fill all required fields', 'error');
      return;
    }
    setLoading(true);

    const options = {
      key: 'rzp_test_XXXXXXXXXXXXXXXX', // Replace with actual Razorpay test key
      amount: total * 100,
      currency: 'INR',
      name: 'Aapki Pooja',
      description: "Women's Fashion",
      image: '',
      prefill: { name: form.name, contact: form.phone, email: form.email },
      theme: { color: '#E91E63' },
      modal: {
        ondismiss: () => {
          setLoading(false);
          toast('Payment cancelled', 'info');
        },
      },
      handler: () => {
        clearCart();
        setStep(2);
        setLoading(false);
      },
    };

    if (typeof window !== 'undefined' && window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      // Simulate success in demo mode
      setTimeout(() => {
        clearCart();
        setStep(2);
        setLoading(false);
        toast('Demo payment successful! 🎉');
      }, 1500);
    }
  }

  if (cart.length === 0 && step !== 2) {
    return (
      <Container maxWidth='sm' sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant='h5' fontWeight={600} gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant='contained'
          onClick={() => router.push('/')}
          sx={{ mt: 2, borderRadius: 99 }}>
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <>
      <Script
        src='https://checkout.razorpay.com/v1/checkout.js'
        strategy='lazyOnload'
      />
      <Container maxWidth='lg' sx={{ py: 5 }}>
        <Typography
          variant='h4'
          fontWeight={700}
          sx={{ fontFamily: 'Playfair Display, serif', mb: 4 }}>
          Checkout
        </Typography>

        <Stepper activeStep={step} sx={{ mb: 5 }}>
          {steps.map(s => (
            <Step key={s}>
              <StepLabel
                sx={{
                  '& .MuiStepLabel-label': {
                    fontWeight: 600,
                    fontFamily: 'Poppins',
                  },
                }}>
                {s}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <AnimatePresence mode='wait'>
          {step === 2 ? (
            <motion.div
              key='success'
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}>
              <Box sx={{ textAlign: 'center', py: 8 }}>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}>
                  <CheckCircleIcon
                    sx={{ fontSize: 100, color: 'success.main', mb: 3 }}
                  />
                </motion.div>
                <Typography
                  variant='h4'
                  fontWeight={700}
                  sx={{ fontFamily: 'Playfair Display, serif', mb: 2 }}>
                  Order Placed! 🎉
                </Typography>
                <Typography
                  variant='body1'
                  color='text.secondary'
                  sx={{ mb: 4 }}>
                  Thank you for shopping with Aapki Pooja. Your order will be
                  delivered in 3–5 business days.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant='contained'
                    onClick={() => router.push('/')}
                    sx={{ borderRadius: 99, px: 4 }}>
                    Continue Shopping
                  </Button>
                </Box>
              </Box>
            </motion.div>
          ) : (
            <motion.div
              key='form'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}>
              <Grid container spacing={4}>
                {/* Form */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      borderColor: 'primary.light',
                    }}>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 3,
                      }}>
                      <LocalShippingIcon color='primary' />
                      <Typography variant='h6' fontWeight={700}>
                        Delivery Details
                      </Typography>
                    </Box>

                    <Grid container spacing={2}>
                      {[
                        { key: 'name', label: 'Full Name', xs: 12 },
                        { key: 'email', label: 'Email Address', xs: 12, sm: 6 },
                        { key: 'phone', label: 'Phone Number', xs: 12, sm: 6 },
                        { key: 'address', label: 'Street Address', xs: 12 },
                        { key: 'city', label: 'City', xs: 12, sm: 4 },
                        { key: 'state', label: 'State', xs: 12, sm: 4 },
                        { key: 'pincode', label: 'Pincode', xs: 12, sm: 4 },
                      ].map(field => (
                        <Grid
                          key={field.key}
                          size={{ xs: field.xs, sm: (field as any).sm }}>
                          <TextField
                            fullWidth
                            label={field.label}
                            required
                            value={form[field.key as keyof FormData]}
                            onChange={e =>
                              setForm(f => ({
                                ...f,
                                [field.key]: e.target.value,
                              }))
                            }
                            size='small'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                                '&.Mui-focused .MuiOutlinedInput-notchedOutline':
                                  { borderColor: 'primary.main' },
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>

                    <Button
                      variant='contained'
                      fullWidth
                      size='large'
                      onClick={handlePay}
                      disabled={loading}
                      sx={{
                        mt: 4,
                        py: 1.5,
                        borderRadius: 99,
                        fontWeight: 700,
                        fontSize: '1rem',
                      }}>
                      {loading ? (
                        <CircularProgress size={24} color='inherit' />
                      ) : (
                        `Pay ₹${total.toLocaleString('en-IN')}`
                      )}
                    </Button>

                    <Alert severity='info' sx={{ mt: 2, borderRadius: 2 }}>
                      <Typography variant='caption'>
                        This is a demo. Use Razorpay test card:{' '}
                        <strong>4111 1111 1111 1111</strong>
                      </Typography>
                    </Alert>
                  </Paper>
                </Grid>

                {/* Order summary */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Paper
                    variant='outlined'
                    sx={{
                      p: 3,
                      borderRadius: 4,
                      borderColor: 'primary.light',
                      position: 'sticky',
                      top: 130,
                    }}>
                    <Typography variant='h6' fontWeight={700} sx={{ mb: 2 }}>
                      Order Summary
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        mb: 3,
                      }}>
                      {cart.map(item => (
                        <Box
                          key={`${item.productId}-${item.selectedSize}`}
                          sx={{ display: 'flex', gap: 2 }}>
                          <Box
                            component='img'
                            src={item.image}
                            sx={{
                              width: 56,
                              height: 64,
                              objectFit: 'cover',
                              borderRadius: 2,
                              flexShrink: 0,
                            }}
                          />
                          <Box sx={{ flex: 1 }}>
                            <Typography
                              variant='caption'
                              fontWeight={700}
                              sx={{ display: 'block' }}>
                              {item.name}
                            </Typography>
                            <Typography variant='caption' color='text.disabled'>
                              {item.selectedColorName} · {item.selectedSize} ·
                              Qty: {item.quantity}
                            </Typography>
                          </Box>
                          <Typography
                            variant='body2'
                            fontWeight={700}
                            color='primary.dark'>
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              'en-IN',
                            )}
                          </Typography>
                        </Box>
                      ))}
                    </Box>

                    <Divider sx={{ mb: 2, borderColor: 'primary.light' }} />

                    {/* Coupon */}
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      <TextField
                        size='small'
                        placeholder='Coupon code'
                        value={coupon}
                        onChange={e => setCoupon(e.target.value)}
                        sx={{
                          flex: 1,
                          '& .MuiOutlinedInput-root': { borderRadius: 99 },
                        }}
                      />
                      <Button
                        variant='outlined'
                        onClick={applyCoupon}
                        sx={{ borderRadius: 99, fontWeight: 700, px: 2 }}>
                        Apply
                      </Button>
                    </Box>

                    <Box
                      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography variant='body2' color='text.secondary'>
                          Subtotal
                        </Typography>
                        <Typography variant='body2' fontWeight={600}>
                          ₹{subtotal.toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography variant='body2' color='text.secondary'>
                          Delivery
                        </Typography>
                        <Typography
                          variant='body2'
                          fontWeight={600}
                          color={delivery === 0 ? 'success.main' : 'inherit'}>
                          {delivery === 0 ? 'FREE' : `₹${delivery}`}
                        </Typography>
                      </Box>
                      {couponDiscount > 0 && (
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}>
                          <Typography
                            variant='body2'
                            color='success.main'
                            fontWeight={600}>
                            Coupon Discount
                          </Typography>
                          <Typography
                            variant='body2'
                            fontWeight={600}
                            color='success.main'>
                            –₹{couponDiscount.toLocaleString('en-IN')}
                          </Typography>
                        </Box>
                      )}
                      <Divider sx={{ my: 1, borderColor: 'primary.light' }} />
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}>
                        <Typography variant='body1' fontWeight={800}>
                          Total
                        </Typography>
                        <Typography
                          variant='body1'
                          fontWeight={800}
                          color='primary.dark'>
                          ₹{total.toLocaleString('en-IN')}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </>
  );
}
