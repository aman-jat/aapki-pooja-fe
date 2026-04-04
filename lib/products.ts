export type Product = {
  id: string;
  name: string;
  category: 'ethnic' | 'western' | 'footwear';
  subcategory: string;
  price: number;
  originalPrice: number;
  discount: number;
  colors: string[];
  colorNames: string[];
  sizes: string[];
  isNew: boolean;
  isBestseller: boolean;
  isSale: boolean;
  rating: number;
  reviewCount: number;
  tags: string[];
  images: string[];
  description: string;
  material: string;
  care: string;
};

const raw = [
  // ── ETHNIC ──
  {
    id: 'ETH001',
    name: 'Floral Anarkali Kurta Set',
    category: 'ethnic',
    subcategory: 'anarkali',
    price: 1299,
    originalPrice: 1999,
    colors: ['#E91E63', '#FF9800', '#2196F3'],
    colorNames: ['Rose Pink', 'Mustard', 'Sky Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.3,
    reviewCount: 127,
    tags: ['floral', 'festive', 'cotton', 'summer'],
    images: [
      'https://images.unsplash.com/photo-1669195987863-f935f728e41b?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Elegant floral anarkali kurta set with matching palazzo pants. Perfect for festivals and family gatherings.',
    material: 'Pure Cotton',
    care: 'Gentle machine wash',
  },

  {
    id: 'ETH002',
    name: 'Embroidered Straight Kurta',
    category: 'ethnic',
    subcategory: 'kurta',
    price: 999,
    originalPrice: 999,
    colors: ['#FFFFFF', '#F8BBD0', '#4CAF50'],
    colorNames: ['White', 'Baby Pink', 'Sage Green'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isBestseller: true,
    isSale: false,
    rating: 4.6,
    reviewCount: 284,
    tags: ['embroidered', 'office', 'casual', 'daily-wear'],
    images: [
      'https://images.unsplash.com/photo-1773439878514-65d4aeb43046?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Graceful straight kurta with delicate thread embroidery. Great for office and casual outings.',
    material: 'Rayon',
    care: 'Hand wash recommended',
  },

  {
    id: 'ETH003',
    name: 'Chanderi Palazzo Set',
    category: 'ethnic',
    subcategory: 'palazzo',
    price: 1799,
    originalPrice: 2499,
    colors: ['#9C27B0', '#FF6F00', '#00BCD4'],
    colorNames: ['Purple', 'Deep Orange', 'Teal'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 98,
    tags: ['chanderi', 'festive', 'palazzo'],
    images: [
      'https://images.unsplash.com/photo-1588516903720-8ceb67f9ef84?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596993100471-c3905dafa78e?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Breathtaking chanderi silk palazzo set with golden thread work. Ideal for festive occasions.',
    material: 'Chanderi Silk',
    care: 'Dry clean only',
  },

  {
    id: 'ETH004',
    name: 'Phulkari Dupatta Suit',
    category: 'ethnic',
    subcategory: 'suit',
    price: 2199,
    originalPrice: 3299,
    colors: ['#E91E63', '#FF5722', '#8BC34A'],
    colorNames: ['Pink', 'Rust', 'Lime'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 196,
    tags: ['phulkari', 'dupatta', 'suit', 'festive'],
    images: [
      'https://images.unsplash.com/photo-1694243382333-9e3244d9ba04?q=80&w=733&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Stunning Phulkari embroidered suit with matching dupatta. A celebration of Indian craftsmanship.',
    material: 'Cotton Silk',
    care: 'Gentle hand wash',
  },

  {
    id: 'ETH005',
    name: 'Indo-Western Fusion Tunic',
    category: 'ethnic',
    subcategory: 'indo-western',
    price: 1199,
    originalPrice: 1599,
    colors: ['#3F51B5', '#F44336', '#FFFFFF'],
    colorNames: ['Indigo', 'Red', 'White'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.2,
    reviewCount: 73,
    tags: ['indo-western', 'casual', 'modern', 'work'],
    images: [
      'https://i.pinimg.com/474x/09/45/b9/0945b9d2f480e21940db1b047ca1ac32.jpg',
    ],
    description:
      'Perfect fusion of Indian and western styles. This tunic can be styled multiple ways.',
    material: 'Viscose Blend',
    care: 'Machine washable',
  },

  {
    id: 'ETH006',
    name: 'Lehenga Choli Set',
    category: 'ethnic',
    subcategory: 'lehenga',
    price: 3999,
    originalPrice: 5999,
    colors: ['#E91E63', '#9C27B0', '#FF6F00'],
    colorNames: ['Rani Pink', 'Violet', 'Amber'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.8,
    reviewCount: 342,
    tags: ['lehenga', 'bridal', 'festive', 'wedding'],
    images: [
      'https://images.unsplash.com/photo-1678805408704-eb55b9d6e395?q=80&w=686&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Gorgeous embroidered lehenga choli perfect for weddings and celebrations. Comes with dupatta.',
    material: 'Net & Silk',
    care: 'Dry clean only',
  },

  {
    id: 'ETH007',
    name: 'Printed Kurta with Pants',
    category: 'ethnic',
    subcategory: 'kurta',
    price: 849,
    originalPrice: 1199,
    colors: ['#FF8A65', '#26A69A', '#EF5350'],
    colorNames: ['Peach', 'Teal', 'Tomato'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isBestseller: false,
    isSale: true,
    rating: 4.1,
    reviewCount: 155,
    tags: ['printed', 'kurta', 'casual', 'cotton'],
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611744977236-1fe9cf93e500?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Vibrant digital print kurta paired with matching straight pants. Everyday ethnic comfort.',
    material: 'Cotton',
    care: 'Machine wash cold',
  },

  {
    id: 'ETH008',
    name: 'Mirror Work Kurti',
    category: 'ethnic',
    subcategory: 'kurti',
    price: 1499,
    originalPrice: 1499,
    colors: ['#E91E63', '#FFC107', '#673AB7'],
    colorNames: ['Pink', 'Yellow', 'Purple'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: true,
    isSale: false,
    rating: 4.4,
    reviewCount: 87,
    tags: ['mirror-work', 'kurti', 'festive', 'boho'],
    images: [
      'https://images.unsplash.com/photo-1705921266762-55203fe27d31?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ],
    description:
      'Exquisite mirror work kurti that catches every eye. Pair with jeans or palazzo for a boho look.',
    material: 'Rayon',
    care: 'Hand wash only',
  },

  // ── WESTERN ──
  {
    id: 'WES001',
    name: 'Floral Wrap Midi Dress',
    category: 'western',
    subcategory: 'dress',
    price: 1599,
    originalPrice: 2199,
    colors: ['#E91E63', '#673AB7', '#FF5722'],
    colorNames: ['Hot Pink', 'Purple', 'Rust'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.4,
    reviewCount: 89,
    tags: ['dress', 'midi', 'floral', 'summer'],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Flowy wrap-style midi dress with beautiful floral print. Perfect for brunches and casual outings.',
    material: 'Georgette',
    care: 'Dry clean preferred',
  },

  {
    id: 'WES002',
    name: 'High-Waist Wide Leg Jeans',
    category: 'western',
    subcategory: 'jeans',
    price: 1899,
    originalPrice: 2699,
    colors: ['#1565C0', '#37474F', '#FFFFFF'],
    colorNames: ['Classic Blue', 'Charcoal', 'White'],
    sizes: ['26', '28', '30', '32', '34', '36'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.6,
    reviewCount: 367,
    tags: ['jeans', 'wide-leg', 'high-waist', 'trendy'],
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Flattering high-waist wide leg jeans that elongate the silhouette. A wardrobe essential.',
    material: 'Denim Blend',
    care: 'Machine wash cold, inside out',
  },

  {
    id: 'WES003',
    name: 'Puff Sleeve Crop Top',
    category: 'western',
    subcategory: 'top',
    price: 699,
    originalPrice: 999,
    colors: ['#FFFFFF', '#FCE4EC', '#000000'],
    colorNames: ['White', 'Blush', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.3,
    reviewCount: 213,
    tags: ['crop-top', 'puff-sleeve', 'trendy', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Adorable puff sleeve crop top that pairs perfectly with high-waist jeans or skirts.',
    material: 'Cotton Poplin',
    care: 'Machine wash',
  },

  {
    id: 'WES004',
    name: 'Linen Co-ord Set',
    category: 'western',
    subcategory: 'co-ord',
    price: 2299,
    originalPrice: 2999,
    colors: ['#EFEBE9', '#FFF9C4', '#E8F5E9'],
    colorNames: ['Beige', 'Cream Yellow', 'Mint'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 148,
    tags: ['co-ord', 'linen', 'summer', 'elegant'],
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Breathable linen co-ord set, perfect for summer days. Mix and match top and trousers.',
    material: '100% Linen',
    care: 'Machine wash gentle',
  },

  {
    id: 'WES005',
    name: 'Satin Slip Dress',
    category: 'western',
    subcategory: 'dress',
    price: 1499,
    originalPrice: 2199,
    colors: ['#C2185B', '#1A237E', '#2E7D32'],
    colorNames: ['Wine', 'Navy', 'Forest Green'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.6,
    reviewCount: 128,
    tags: ['satin', 'slip-dress', 'elegant', 'dinner'],
    images: [
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Luxurious satin slip dress that drapes beautifully. Style with sneakers or heels.',
    material: 'Satin',
    care: 'Hand wash or dry clean',
  },

  {
    id: 'WES006',
    name: 'Striped Wide Leg Jumpsuit',
    category: 'western',
    subcategory: 'jumpsuit',
    price: 1799,
    originalPrice: 2399,
    colors: ['#1A237E', '#E8F5E9', '#FFF9C4'],
    colorNames: ['Navy Stripe', 'Green Stripe', 'Yellow Stripe'],
    sizes: ['S', 'M', 'L', 'XL'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.5,
    reviewCount: 176,
    tags: ['jumpsuit', 'striped', 'casual', 'chic'],
    images: [
      'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Effortlessly chic striped jumpsuit. One piece, complete look. Cinched waist with belt.',
    material: 'Viscose Crepe',
    care: 'Dry clean',
  },

  {
    id: 'WES007',
    name: 'Ruched Bodycon Dress',
    category: 'western',
    subcategory: 'dress',
    price: 1299,
    originalPrice: 1799,
    colors: ['#E91E63', '#000000', '#3F51B5'],
    colorNames: ['Pink', 'Black', 'Navy'],
    sizes: ['XS', 'S', 'M', 'L'],
    isNew: false,
    isBestseller: false,
    isSale: true,
    rating: 4.2,
    reviewCount: 112,
    tags: ['bodycon', 'dress', 'party', 'night-out'],
    images: [
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Figure-hugging ruched bodycon dress that makes a statement at every party.',
    material: 'Stretch Fabric',
    care: 'Hand wash cold',
  },

  {
    id: 'WES008',
    name: 'Denim Jacket',
    category: 'western',
    subcategory: 'jacket',
    price: 1999,
    originalPrice: 2799,
    colors: ['#1565C0', '#37474F', '#FAFAFA'],
    colorNames: ['Classic Blue', 'Dark Wash', 'Light Wash'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.5,
    reviewCount: 289,
    tags: ['denim', 'jacket', 'layering', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1475178626620-a4d074967452?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Classic denim jacket that layers over anything. A timeless wardrobe staple.',
    material: 'Denim',
    care: 'Machine wash cold',
  },

  {
    id: 'WES009',
    name: 'Ribbed Tank Top Set',
    category: 'western',
    subcategory: 'co-ord',
    price: 1199,
    originalPrice: 1199,
    colors: ['#BDBDBD', '#E91E63', '#000000'],
    colorNames: ['Grey', 'Pink', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: false,
    isBestseller: true,
    isSale: false,
    rating: 4.4,
    reviewCount: 203,
    tags: ['ribbed', 'tank', 'co-ord', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Comfortable ribbed tank top and shorts set. Goes from gym to brunch effortlessly.',
    material: 'Rib Knit Cotton',
    care: 'Machine wash',
  },

  {
    id: 'WES010',
    name: 'Broderie Anglaise Mini Skirt',
    category: 'western',
    subcategory: 'skirt',
    price: 899,
    originalPrice: 1299,
    colors: ['#FFFFFF', '#FCE4EC', '#E3F2FD'],
    colorNames: ['White', 'Blush', 'Light Blue'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.3,
    reviewCount: 94,
    tags: ['skirt', 'mini', 'summer', 'cute'],
    images: [
      'https://images.unsplash.com/photo-1551048632-24e444b48a3e?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Delicate broderie anglaise mini skirt with eyelet detailing. Perfect for summer days.',
    material: 'Cotton',
    care: 'Machine wash',
  },

  // ── FOOTWEAR ──
  {
    id: 'FOOT001',
    name: 'Block Heel Sandals',
    category: 'footwear',
    subcategory: 'heels',
    price: 899,
    originalPrice: 1299,
    colors: ['#C2185B', '#000000', '#F5F5DC'],
    colorNames: ['Deep Pink', 'Black', 'Beige'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: false,
    isBestseller: true,
    isSale: true,
    rating: 4.2,
    reviewCount: 156,
    tags: ['heels', 'block-heel', 'party', 'comfortable'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Comfortable block heel sandals with cushioned footbed. Walk in style all day long.',
    material: 'Faux Leather',
    care: 'Wipe clean',
  },

  {
    id: 'FOOT002',
    name: 'Embellished Kolhapuri Flats',
    category: 'footwear',
    subcategory: 'kolhapuri',
    price: 699,
    originalPrice: 999,
    colors: ['#8D6E63', '#E91E63', '#1A1A1A'],
    colorNames: ['Tan', 'Pink', 'Black'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: true,
    isBestseller: false,
    isSale: true,
    rating: 4.5,
    reviewCount: 201,
    tags: ['kolhapuri', 'flats', 'ethnic', 'handcrafted'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Handcrafted Kolhapuri flats with intricate beadwork. Perfect with ethnic and fusion wear.',
    material: 'Genuine Leather',
    care: 'Polish with leather conditioner',
  },

  {
    id: 'FOOT003',
    name: 'Platform Sneakers',
    category: 'footwear',
    subcategory: 'sneakers',
    price: 1499,
    originalPrice: 1999,
    colors: ['#FFFFFF', '#000000', '#E91E63'],
    colorNames: ['White', 'Black', 'Pink'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: true,
    isBestseller: true,
    isSale: true,
    rating: 4.7,
    reviewCount: 315,
    tags: ['sneakers', 'platform', 'trendy', 'casual'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Height-boosting platform sneakers that go with everything. Cloud-cushion insoles.',
    material: 'Canvas & Rubber',
    care: 'Wipe with damp cloth',
  },

  {
    id: 'FOOT004',
    name: 'Strappy Stiletto Heels',
    category: 'footwear',
    subcategory: 'heels',
    price: 1199,
    originalPrice: 1799,
    colors: ['#C2185B', '#1A1A1A', '#F5F5DC'],
    colorNames: ['Rose', 'Black', 'Nude'],
    sizes: ['36', '37', '38', '39', '40'],
    isNew: false,
    isBestseller: false,
    isSale: true,
    rating: 4.0,
    reviewCount: 87,
    tags: ['stiletto', 'heels', 'party', 'bridal'],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Chic strappy stiletto heels perfect for weddings, parties, and formal events.',
    material: 'Faux Suede',
    care: 'Brush gently when dry',
  },

  {
    id: 'FOOT005',
    name: 'Embroidered Juttis',
    category: 'footwear',
    subcategory: 'juttis',
    price: 849,
    originalPrice: 1199,
    colors: ['#E91E63', '#FFC107', '#00BCD4'],
    colorNames: ['Pink', 'Golden', 'Turquoise'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: true,
    isBestseller: true,
    isSale: true,
    rating: 4.6,
    reviewCount: 243,
    tags: ['juttis', 'ethnic', 'embroidery', 'festive', 'handmade'],
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Exquisitely embroidered juttis from the heart of Rajasthan. A beautiful art form you can wear.',
    material: 'Leather & Silk Thread',
    care: 'Store in cloth bag',
  },

  {
    id: 'FOOT006',
    name: 'Wedge Espadrilles',
    category: 'footwear',
    subcategory: 'wedges',
    price: 1099,
    originalPrice: 1499,
    colors: ['#8D6E63', '#E91E63', '#000000'],
    colorNames: ['Natural', 'Pink', 'Black'],
    sizes: ['36', '37', '38', '39', '40', '41'],
    isNew: false,
    isBestseller: false,
    isSale: true,
    rating: 4.3,
    reviewCount: 119,
    tags: ['wedge', 'espadrilles', 'summer', 'comfortable'],
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=800&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&h=800&fit=crop&q=80',
    ],
    description:
      'Breezy wedge espadrilles with jute platform sole. Your summer vacation must-have.',
    material: 'Canvas & Jute',
    care: 'Spot clean only',
  },
];

export const PRODUCTS: Product[] = raw.map(p => ({
  ...p,
  colors: [...p.colors],
  colorNames: [...p.colorNames],
  sizes: [...p.sizes],
  tags: [...p.tags],
  images: [...p.images],
  category: p.category as Product['category'],
  discount:
    p.originalPrice > p.price
      ? Math.round((1 - p.price / p.originalPrice) * 100)
      : 0,
}));

export function getProduct(id: string) {
  return PRODUCTS.find(p => p.id === id) ?? null;
}
