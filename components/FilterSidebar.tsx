"use client";
import {
  Box, Typography, Slider, FormGroup, FormControlLabel,
  Checkbox, Tooltip, Divider, Button, Collapse,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";

export type FilterState = {
  colors: string[];
  sizes: string[];
  priceRange: [number, number];
  onlyNew: boolean;
  onlySale: boolean;
};

type Props = {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  onClear: () => void;
};

const COLOR_OPTIONS = [
  { hex: "#E91E63", name: "Pink" },
  { hex: "#FF5722", name: "Orange" },
  { hex: "#9C27B0", name: "Purple" },
  { hex: "#2196F3", name: "Blue" },
  { hex: "#4CAF50", name: "Green" },
  { hex: "#FF9800", name: "Yellow" },
  { hex: "#FFFFFF", name: "White" },
  { hex: "#1A1A1A", name: "Black" },
  { hex: "#8D6E63", name: "Brown" },
  { hex: "#00BCD4", name: "Teal" },
];

const CLOTHING_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const SHOE_SIZES = ["36", "37", "38", "39", "40", "41"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <Box>
      <Box
        onClick={() => setOpen(o => !o)}
        sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", py: 1.5 }}
      >
        <Typography variant="body2" fontWeight={700}>{title}</Typography>
        <ExpandMoreIcon
          sx={{ fontSize: 18, color: "text.disabled", transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </Box>
      <Collapse in={open}>{children}</Collapse>
      <Divider sx={{ mt: 2, mb: 1, borderColor: "primary.light" }} />
    </Box>
  );
}

export default function FilterSidebar({ filters, onChange, onClear }: Props) {
  function toggleColor(hex: string) {
    onChange({
      ...filters,
      colors: filters.colors.includes(hex) ? filters.colors.filter(c => c !== hex) : [...filters.colors, hex],
    });
  }

  function toggleSize(size: string) {
    onChange({
      ...filters,
      sizes: filters.sizes.includes(size) ? filters.sizes.filter(s => s !== size) : [...filters.sizes, size],
    });
  }

  const hasFilters = filters.colors.length > 0 || filters.sizes.length > 0 ||
    filters.priceRange[0] > 0 || filters.priceRange[1] < 6000 || filters.onlyNew || filters.onlySale;

  return (
    <Box sx={{ bgcolor: "white", borderRadius: 4, p: 3, border: "1px solid", borderColor: "primary.light", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="body1" fontWeight={700}>Filters</Typography>
        {hasFilters && (
          <Button size="small" onClick={onClear} sx={{ color: "primary.main", fontWeight: 600, fontSize: "0.75rem", p: 0, minWidth: 0 }}>
            Clear All
          </Button>
        )}
      </Box>

      {/* Price Range */}
      <Section title="Price Range">
        <Box sx={{ px: 1, pb: 1 }}>
          <Slider
            value={filters.priceRange}
            onChange={(_, v) => onChange({ ...filters, priceRange: v as [number, number] })}
            min={0} max={6000} step={100}
            color="primary"
            valueLabelDisplay="auto"
            valueLabelFormat={v => `₹${v}`}
            sx={{
              "& .MuiSlider-thumb": { width: 18, height: 18, border: "2px solid white", boxShadow: "0 1px 6px rgba(233,30,99,0.3)" },
              "& .MuiSlider-rail": { bgcolor: "primary.light" },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="caption" color="primary.dark" fontWeight={700}>₹{filters.priceRange[0]}</Typography>
            <Typography variant="caption" color="primary.dark" fontWeight={700}>₹{filters.priceRange[1]}</Typography>
          </Box>
        </Box>
      </Section>

      {/* Colors */}
      <Section title="Color">
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 1, pb: 1 }}>
          {COLOR_OPTIONS.map(c => (
            <Tooltip key={c.hex} title={c.name} arrow>
              <Box
                onClick={() => toggleColor(c.hex)}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 0.3,
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    width: 28, height: 28,
                    borderRadius: "50%",
                    bgcolor: c.hex,
                    border: "2px solid white",
                    boxShadow: filters.colors.includes(c.hex)
                      ? "0 0 0 2.5px #E91E63"
                      : "0 0 0 1.5px rgba(0,0,0,0.12)",
                    transform: filters.colors.includes(c.hex) ? "scale(1.15)" : "scale(1)",
                    transition: "all 0.15s",
                  }}
                />
                <Typography sx={{ fontSize: "0.6rem", color: "text.disabled", lineHeight: 1.2, textAlign: "center" }}>
                  {c.name}
                </Typography>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Section>

      {/* Clothing Sizes */}
      <Section title="Clothing Size">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pb: 1 }}>
          {CLOTHING_SIZES.map(s => (
            <Box
              key={s}
              onClick={() => toggleSize(s)}
              sx={{
                width: 38, height: 38,
                borderRadius: 2,
                border: "1.5px solid",
                borderColor: filters.sizes.includes(s) ? "primary.main" : "primary.light",
                bgcolor: filters.sizes.includes(s) ? "primary.light" : "white",
                color: filters.sizes.includes(s) ? "primary.dark" : "text.secondary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
      </Section>

      {/* Shoe Sizes */}
      <Section title="Shoe Size">
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, pb: 1 }}>
          {SHOE_SIZES.map(s => (
            <Box
              key={s}
              onClick={() => toggleSize(s)}
              sx={{
                px: 1.5, height: 34,
                borderRadius: 2,
                border: "1.5px solid",
                borderColor: filters.sizes.includes(s) ? "primary.main" : "primary.light",
                bgcolor: filters.sizes.includes(s) ? "primary.light" : "white",
                color: filters.sizes.includes(s) ? "primary.dark" : "text.secondary",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                fontWeight: 700,
                cursor: "pointer",
                transition: "all 0.15s",
                "&:hover": { borderColor: "primary.main", color: "primary.main" },
              }}
            >
              {s}
            </Box>
          ))}
        </Box>
      </Section>

      {/* Toggles */}
      <Section title="More Filters">
        <FormGroup sx={{ pb: 1 }}>
          {[
            { label: "New Arrivals", key: "onlyNew" as const },
            { label: "On Sale", key: "onlySale" as const },
          ].map(({ label, key }) => (
            <FormControlLabel
              key={key}
              control={
                <Checkbox
                  checked={filters[key]}
                  onChange={e => onChange({ ...filters, [key]: e.target.checked })}
                  size="small"
                  sx={{ "&.Mui-checked": { color: "primary.main" } }}
                />
              }
              label={<Typography variant="body2" fontWeight={500}>{label}</Typography>}
            />
          ))}
        </FormGroup>
      </Section>
    </Box>
  );
}
