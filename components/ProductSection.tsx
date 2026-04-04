"use client";
import {
  Box, Container, Typography, Grid, Select, MenuItem, Chip,
  useMediaQuery, useTheme, Drawer, Button, Fab,
  FormControl, InputLabel,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import TuneIcon from "@mui/icons-material/Tune";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import FilterSidebar, { FilterState } from "@/components/FilterSidebar";
import { motion, AnimatePresence } from "framer-motion";

const DEFAULT_FILTERS: FilterState = {
  colors: [],
  sizes: [],
  priceRange: [0, 6000],
  onlyNew: false,
  onlySale: false,
};

const CATEGORIES = [
  { key: "all", label: "All Products", emoji: "🛍️" },
  { key: "ethnic", label: "Ethnic Wear", emoji: "🌸" },
  { key: "western", label: "Western Wear", emoji: "👗" },
  { key: "footwear", label: "Footwear", emoji: "👡" },
  { key: "new", label: "New Arrivals", emoji: "✨" },
  { key: "sale", label: "On Sale", emoji: "🏷️" },
];

export default function ProductSection() {
  const params = useSearchParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const sectionRef = useRef<HTMLDivElement>(null);

  const [category, setCategory] = useState("all");
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [sort, setSort] = useState("popular");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Sync category from URL params
  useEffect(() => {
    const cat = params.get("cat");
    const isNew = params.get("new");
    if (cat) setCategory(cat === "new" ? "new" : cat);
    else if (isNew) setCategory("new");
  }, [params]);

  const filtered = useMemo(() => {
    let list = [...PRODUCTS];

    // Category filter
    if (category === "ethnic") list = list.filter(p => p.category === "ethnic");
    else if (category === "western") list = list.filter(p => p.category === "western");
    else if (category === "footwear") list = list.filter(p => p.category === "footwear");
    else if (category === "new") list = list.filter(p => p.isNew);
    else if (category === "sale") list = list.filter(p => p.isSale);

    // Color filter
    if (filters.colors.length > 0) {
      list = list.filter(p => p.colors.some(c => filters.colors.includes(c)));
    }

    // Size filter
    if (filters.sizes.length > 0) {
      list = list.filter(p => p.sizes.some(s => filters.sizes.includes(s)));
    }

    // Price range
    list = list.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);

    // Toggles
    if (filters.onlyNew) list = list.filter(p => p.isNew);
    if (filters.onlySale) list = list.filter(p => p.isSale);

    // Sort
    switch (sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "newest":     list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      case "rating":     list.sort((a, b) => b.rating - a.rating); break;
      case "popular":    list.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return list;
  }, [category, filters, sort]);

  const activeFiltersCount = filters.colors.length + filters.sizes.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 6000 ? 1 : 0) +
    (filters.onlyNew ? 1 : 0) + (filters.onlySale ? 1 : 0);

  const sidebar = (
    <FilterSidebar
      filters={filters}
      onChange={setFilters}
      onClear={() => setFilters(DEFAULT_FILTERS)}
    />
  );

  return (
    <Box ref={sectionRef} sx={{ bgcolor: "#FFFBFD", py: { xs: 3, md: 5 } }}>
      <Container maxWidth="xl">
        {/* Category Pills */}
        <Box
          sx={{
            display: "flex",
            gap: 1.5,
            overflowX: "auto",
            pb: 1, mb: 4,
            scrollbarWidth: "none",
            "&::-webkit-scrollbar": { display: "none" },
          }}
        >
          {CATEGORIES.map(cat => (
            <Chip
              key={cat.key}
              icon={<span style={{ fontSize: "1rem" }}>{cat.emoji}</span>}
              label={cat.label}
              onClick={() => setCategory(cat.key)}
              sx={{
                flexShrink: 0,
                fontWeight: 700,
                fontSize: "0.8rem",
                height: 40,
                borderRadius: 99,
                border: "2px solid",
                transition: "all 0.25s",
                ...(category === cat.key
                  ? { bgcolor: "primary.main", color: "white", borderColor: "primary.main", boxShadow: "0 4px 14px rgba(233,30,99,0.3)" }
                  : { bgcolor: "#FFF0F5", color: "text.secondary", borderColor: "#FCE4EC", "&:hover": { borderColor: "primary.main", color: "primary.main", bgcolor: "#FCE4EC" } }
                ),
              }}
            />
          ))}
        </Box>

        {/* Section header */}
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3, flexWrap: "wrap", gap: 2 }}>
          <Box>
            <Typography variant="h4" fontWeight={700} sx={{ fontFamily: "Playfair Display, serif" }}>
              {CATEGORIES.find(c => c.key === category)?.label ?? "All Products"}
              {" "}<Box component="span" sx={{ color: "primary.main" }}>Collection</Box>
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Showing {filtered.length} of {PRODUCTS.length} products
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <Button
                startIcon={<TuneIcon />}
                onClick={() => setDrawerOpen(true)}
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 99, fontWeight: 600, position: "relative" }}
              >
                Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
              </Button>
            )}
            <FormControl size="small" sx={{ minWidth: 160 }}>
              <Select
                value={sort}
                onChange={e => setSort(e.target.value)}
                sx={{ borderRadius: 99, fontWeight: 600, fontSize: "0.85rem", "& .MuiOutlinedInput-notchedOutline": { borderColor: "primary.light" } }}
              >
                <MenuItem value="popular">Most Popular</MenuItem>
                <MenuItem value="newest">Newest First</MenuItem>
                <MenuItem value="rating">Top Rated</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Active filter tags */}
        {activeFiltersCount > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 3 }}>
            {filters.colors.map(c => (
              <Chip key={c} size="small"
                avatar={<Box sx={{ width: 14, height: 14, borderRadius: "50%", bgcolor: c, border: "1px solid white" }} />}
                label="Color"
                onDelete={() => setFilters(f => ({ ...f, colors: f.colors.filter(x => x !== c) }))}
                sx={{ bgcolor: "primary.light", color: "primary.dark", fontWeight: 600 }}
              />
            ))}
            {filters.sizes.map(s => (
              <Chip key={s} size="small" label={s}
                onDelete={() => setFilters(f => ({ ...f, sizes: f.sizes.filter(x => x !== s) }))}
                sx={{ bgcolor: "primary.light", color: "primary.dark", fontWeight: 600 }}
              />
            ))}
            {(filters.priceRange[0] > 0 || filters.priceRange[1] < 6000) && (
              <Chip size="small" label={`₹${filters.priceRange[0]} – ₹${filters.priceRange[1]}`}
                onDelete={() => setFilters(f => ({ ...f, priceRange: [0, 6000] }))}
                sx={{ bgcolor: "primary.light", color: "primary.dark", fontWeight: 600 }}
              />
            )}
            {filters.onlyNew && (
              <Chip size="small" label="New Arrivals"
                onDelete={() => setFilters(f => ({ ...f, onlyNew: false }))}
                sx={{ bgcolor: "primary.light", color: "primary.dark", fontWeight: 600 }}
              />
            )}
            {filters.onlySale && (
              <Chip size="small" label="On Sale"
                onDelete={() => setFilters(f => ({ ...f, onlySale: false }))}
                sx={{ bgcolor: "primary.light", color: "primary.dark", fontWeight: 600 }}
              />
            )}
          </Box>
        )}

        {/* Grid + Sidebar */}
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "280px 1fr" }, gap: { xs: 0, md: 4 }, alignItems: "start" }}>
          {/* Desktop Sidebar */}
          {!isMobile && (
            <Box sx={{ position: "sticky", top: 120 }}>
              {sidebar}
            </Box>
          )}

          {/* Product Grid */}
          <Box>
            {filtered.length === 0 ? (
              <Box sx={{ textAlign: "center", py: 10 }}>
                <Typography variant="h2" sx={{ fontSize: "4rem", mb: 2 }}>🔍</Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={600}>No products found</Typography>
                <Typography variant="body2" color="text.disabled" sx={{ mb: 3 }}>Try adjusting your filters</Typography>
                <Button variant="contained" onClick={() => setFilters(DEFAULT_FILTERS)}>Clear Filters</Button>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", xl: "repeat(4, 1fr)" },
                  gap: { xs: 1.5, md: 3 },
                }}
              >
                <AnimatePresence>
                  {filtered.map((product, i) => (
                    <ProductCard key={product.id} product={product} index={i} />
                  ))}
                </AnimatePresence>
              </Box>
            )}
          </Box>
        </Box>
      </Container>

      {/* Mobile Filter Drawer */}
      <Drawer
        anchor="bottom"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{ sx: { borderRadius: "24px 24px 0 0", maxHeight: "85vh", overflow: "auto" } }}
      >
        <Box sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>Filters</Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => setDrawerOpen(false)}
              sx={{ borderRadius: 99 }}
            >
              Show {filtered.length} Results
            </Button>
          </Box>
          {sidebar}
        </Box>
      </Drawer>
    </Box>
  );
}
