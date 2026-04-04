import { Suspense } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import DiscountBanner from "@/components/DiscountBanner";
import MidBanner from "@/components/MidBanner";
import ProductSection from "@/components/ProductSection";
import { Box, Skeleton } from "@mui/material";

function ProductSectionFallback() {
  return (
    <Box sx={{ p: 4, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 3 }}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} variant="rectangular" height={380} sx={{ borderRadius: 4 }} />
      ))}
    </Box>
  );
}

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <DiscountBanner />
      <MidBanner />
      <Suspense fallback={<ProductSectionFallback />}>
        <ProductSection />
      </Suspense>
    </main>
  );
}
