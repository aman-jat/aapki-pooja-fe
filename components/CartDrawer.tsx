"use client";
import {
  Drawer, Box, Typography, IconButton, Divider, Button,
  Stack, Avatar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useStore } from "@/lib/store";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateQty, removeFromCart, cartTotal } = useStore();

  return (
    <Drawer
      anchor="right"
      open={cartOpen}
      onClose={() => setCartOpen(false)}
      PaperProps={{ sx: { width: { xs: "100%", sm: 420 }, borderRadius: { sm: "24px 0 0 24px" } } }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* Header */}
        <Box sx={{ p: 3, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid", borderColor: "primary.light" }}>
          <Typography variant="h6" fontWeight={700} sx={{ fontFamily: "Playfair Display" }}>
            My Cart ({cart.reduce((s,c) => s+c.quantity, 0)})
          </Typography>
          <IconButton onClick={() => setCartOpen(false)} sx={{ bgcolor: "#FFF0F5", "&:hover": { bgcolor: "primary.light" } }}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Items */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {cart.length === 0 ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <ShoppingBagIcon sx={{ fontSize: 64, color: "primary.light", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" fontWeight={600}>Your cart is empty</Typography>
              <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>
                Add some gorgeous pieces!
              </Typography>
              <Button variant="contained" color="primary" onClick={() => setCartOpen(false)}>
                Shop Now
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              <AnimatePresence>
                {cart.map(item => (
                  <motion.div
                    key={`${item.productId}-${item.selectedSize}-${item.selectedColor}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Box sx={{ display: "flex", gap: 2, p: 2, bgcolor: "#FFFBFD", borderRadius: 3, border: "1px solid", borderColor: "primary.light" }}>
                      <Avatar
                        src={item.image}
                        variant="rounded"
                        sx={{ width: 72, height: 80, borderRadius: 2, flexShrink: 0 }}
                      />
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography variant="body2" fontWeight={700} noWrap>{item.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.selectedColorName} · {item.selectedSize}
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                          <Typography variant="body2" fontWeight={700} color="primary.dark">
                            ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <IconButton
                              size="small"
                              onClick={() => updateQty(item.productId, item.selectedSize, item.selectedColor, item.quantity - 1)}
                              sx={{ bgcolor: "primary.light", width: 24, height: 24 }}
                            >
                              <RemoveIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                            <Typography variant="body2" fontWeight={700} sx={{ minWidth: 20, textAlign: "center" }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQty(item.productId, item.selectedSize, item.selectedColor, item.quantity + 1)}
                              sx={{ bgcolor: "primary.light", width: 24, height: 24 }}
                            >
                              <AddIcon sx={{ fontSize: 12 }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                      <IconButton
                        size="small"
                        onClick={() => removeFromCart(item.productId, item.selectedSize, item.selectedColor)}
                        sx={{ alignSelf: "flex-start", color: "text.disabled", "&:hover": { color: "error.main" } }}
                      >
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </motion.div>
                ))}
              </AnimatePresence>
            </Stack>
          )}
        </Box>

        {/* Footer */}
        {cart.length > 0 && (
          <Box sx={{ p: 3, borderTop: "1px solid", borderColor: "primary.light", bgcolor: "white" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Subtotal</Typography>
              <Typography variant="body2" fontWeight={600}>₹{cartTotal().toLocaleString("en-IN")}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Delivery</Typography>
              <Typography variant="body2" fontWeight={600} color="success.main">
                {cartTotal() >= 1999 ? "FREE" : "₹99"}
              </Typography>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography variant="body1" fontWeight={700}>Total</Typography>
              <Typography variant="body1" fontWeight={700} color="primary.dark">
                ₹{(cartTotal() + (cartTotal() >= 1999 ? 0 : 99)).toLocaleString("en-IN")}
              </Typography>
            </Box>
            {cartTotal() < 1999 && (
              <Typography variant="caption" color="primary.main" sx={{ display: "block", mb: 1.5, textAlign: "center" }}>
                Add ₹{(1999 - cartTotal()).toLocaleString("en-IN")} more for free shipping!
              </Typography>
            )}
            <Button
              component={Link}
              href="/checkout"
              variant="contained"
              fullWidth
              size="large"
              onClick={() => setCartOpen(false)}
              sx={{ borderRadius: 99, py: 1.5, fontSize: "0.95rem" }}
            >
              Proceed to Checkout
            </Button>
            <Button
              variant="text"
              fullWidth
              onClick={() => setCartOpen(false)}
              sx={{ mt: 1, color: "text.secondary" }}
            >
              Continue Shopping
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
}
