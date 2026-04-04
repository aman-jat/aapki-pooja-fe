import { PRODUCTS } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetailClient from "./ProductDetailClient";

export async function generateStaticParams() {
  return PRODUCTS.map(p => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  return { title: product ? `${product.name} – Aapki Pooja` : "Product – Aapki Pooja" };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) notFound();
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  return <ProductDetailClient product={product} related={related} />;
}
