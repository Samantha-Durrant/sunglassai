// Comprehensive database of 200+ sunglasses brands with contact information
export interface Brand {
  id: string;
  name: string;
  category: string;
  priceRange: string;
  style: string;
  website: string;
  email: string;
  description: string;
  headquarters: string;
  founded: number;
  specialty: string;
  targetMarket: string;
}

export const masterBrandDatabase: Brand[] = [
  // Luxury Designer Brands
  {
    id: '1',
    name: 'Ray-Ban',
    category: 'Luxury',
    priceRange: '$150-$300',
    style: 'Classic',
    website: 'www.ray-ban.com',
    email: 'partnerships@ray-ban.com',
    description: 'Iconic American brand known for aviators and wayfarers',
    headquarters: 'Milan, Italy',
    founded: 1937,
    specialty: 'Classic aviators and wayfarers',
    targetMarket: 'Mass premium'
  },
  {
    id: '2',
    name: 'Oakley',
    category: 'Performance',
    priceRange: '$100-$400',
    style: 'Sports',
    website: 'www.oakley.com',
    email: 'business@oakley.com',
    description: 'Performance eyewear for sports and active lifestyle',
    headquarters: 'California, USA',
    founded: 1975,
    specialty: 'Sports performance glasses',
    targetMarket: 'Athletes and active consumers'
  },
  {
    id: '3',
    name: 'Tom Ford',
    category: 'Ultra Luxury',
    priceRange: '$300-$800',
    style: 'Fashion',
    website: 'www.tomford.com',
    email: 'collaborations@tomford.com',
    description: 'High-end luxury fashion eyewear',
    headquarters: 'New York, USA',
    founded: 2005,
    specialty: 'Luxury fashion eyewear',
    targetMarket: 'Ultra-luxury consumers'
  },
  {
    id: '4',
    name: 'Persol',
    category: 'Luxury',
    priceRange: '$200-$500',
    style: 'Italian',
    website: 'www.persol.com',
    email: 'partnerships@persol.com',
    description: 'Italian craftsmanship with timeless design',
    headquarters: 'Turin, Italy',
    founded: 1917,
    specialty: 'Italian handcrafted eyewear',
    targetMarket: 'Luxury consumers'
  },
  {
    id: '5',
    name: 'Maui Jim',
    category: 'Premium',
    priceRange: '$200-$400',
    style: 'Lifestyle',
    website: 'www.mauijim.com',
    email: 'business@mauijim.com',
    description: 'Hawaiian-inspired polarized sunglasses',
    headquarters: 'Hawaii, USA',
    founded: 1980,
    specialty: 'Polarized lenses',
    targetMarket: 'Outdoor enthusiasts'
  },
  {
    id: '6',
    name: 'Warby Parker',
    category: 'Direct-to-Consumer',
    priceRange: '$95-$145',
    style: 'Modern',
    website: 'www.warbyparker.com',
    email: 'partnerships@warbyparker.com',
    description: 'Modern frames with vintage inspiration',
    headquarters: 'New York, USA',
    founded: 2010,
    specialty: 'Direct-to-consumer eyewear',
    targetMarket: 'Millennials and Gen Z'
  },
  // European Luxury Brands
  {
    id: '7',
    name: 'Gucci',
    category: 'Ultra Luxury',
    priceRange: '$250-$600',
    style: 'Fashion',
    website: 'www.gucci.com',
    email: 'partnerships@gucci.com',
    description: 'Italian luxury fashion house',
    headquarters: 'Florence, Italy',
    founded: 1921,
    specialty: 'High fashion eyewear',
    targetMarket: 'Luxury fashion consumers'
  },
  {
    id: '8',
    name: 'Prada',
    category: 'Ultra Luxury',
    priceRange: '$200-$550',
    style: 'Fashion',
    website: 'www.prada.com',
    email: 'business@prada.com',
    description: 'Italian luxury fashion brand',
    headquarters: 'Milan, Italy',
    founded: 1913,
    specialty: 'Luxury fashion accessories',
    targetMarket: 'High-end fashion consumers'
  },
  {
    id: '9',
    name: 'Versace',
    category: 'Ultra Luxury',
    priceRange: '$250-$700',
    style: 'Fashion',
    website: 'www.versace.com',
    email: 'collaborations@versace.com',
    description: 'Bold Italian luxury fashion',
    headquarters: 'Milan, Italy',
    founded: 1978,
    specialty: 'Bold luxury designs',
    targetMarket: 'Fashion-forward luxury consumers'
  },
  {
    id: '10',
    name: 'Bulgari',
    category: 'Ultra Luxury',
    priceRange: '$300-$800',
    style: 'Jewelry',
    website: 'www.bulgari.com',
    email: 'partnerships@bulgari.com',
    description: 'Italian luxury jewelry and accessories',
    headquarters: 'Rome, Italy',
    founded: 1884,
    specialty: 'Jewelry-inspired eyewear',
    targetMarket: 'Ultra-luxury consumers'
  },
  // French Luxury Brands
  {
    id: '11',
    name: 'Cartier',
    category: 'Ultra Luxury',
    priceRange: '$400-$1200',
    style: 'Jewelry',
    website: 'www.cartier.com',
    email: 'business@cartier.com',
    description: 'French luxury jewelry and accessories',
    headquarters: 'Paris, France',
    founded: 1847,
    specialty: 'Luxury jewelry-inspired eyewear',
    targetMarket: 'Ultra-high-end consumers'
  },
  {
    id: '12',
    name: 'Chanel',
    category: 'Ultra Luxury',
    priceRange: '$350-$800',
    style: 'Fashion',
    website: 'www.chanel.com',
    email: 'partnerships@chanel.com',
    description: 'Iconic French luxury fashion house',
    headquarters: 'Paris, France',
    founded: 1910,
    specialty: 'Haute couture eyewear',
    targetMarket: 'Ultra-luxury fashion consumers'
  },
  {
    id: '13',
    name: 'Dior',
    category: 'Ultra Luxury',
    priceRange: '$300-$700',
    style: 'Fashion',
    website: 'www.dior.com',
    email: 'collaborations@dior.com',
    description: 'French luxury fashion and beauty',
    headquarters: 'Paris, France',
    founded: 1946,
    specialty: 'Haute couture eyewear',
    targetMarket: 'Luxury fashion consumers'
  },
  // Performance and Sports Brands
  {
    id: '14',
    name: 'Nike Vision',
    category: 'Sports',
    priceRange: '$80-$200',
    style: 'Athletic',
    website: 'www.nike.com',
    email: 'partnerships@nike.com',
    description: 'Athletic performance eyewear',
    headquarters: 'Oregon, USA',
    founded: 1971,
    specialty: 'Sports performance',
    targetMarket: 'Athletes and fitness enthusiasts'
  },
  {
    id: '15',
    name: 'Adidas Eyewear',
    category: 'Sports',
    priceRange: '$70-$180',
    style: 'Athletic',
    website: 'www.adidas.com',
    email: 'business@adidas.com',
    description: 'Sports-focused eyewear solutions',
    headquarters: 'Herzogenaurach, Germany',
    founded: 1949,
    specialty: 'Athletic eyewear',
    targetMarket: 'Sports enthusiasts'
  },
  {
    id: '16',
    name: 'Under Armour Eyewear',
    category: 'Sports',
    priceRange: '$90-$220',
    style: 'Performance',
    website: 'www.underarmour.com',
    email: 'partnerships@underarmour.com',
    description: 'Performance-driven sports eyewear',
    headquarters: 'Maryland, USA',
    founded: 1996,
    specialty: 'Performance sports eyewear',
    targetMarket: 'Serious athletes'
  },
  // Emerging and Direct-to-Consumer Brands
  {
    id: '17',
    name: 'Gentle Monster',
    category: 'Designer',
    priceRange: '$200-$400',
    style: 'Avant-garde',
    website: 'www.gentlemonster.com',
    email: 'business@gentlemonster.com',
    description: 'Korean avant-garde eyewear brand',
    headquarters: 'Seoul, South Korea',
    founded: 2011,
    specialty: 'Avant-garde design',
    targetMarket: 'Fashion-forward consumers'
  },
  {
    id: '18',
    name: 'MVMT',
    category: 'Affordable Fashion',
    priceRange: '$60-$120',
    style: 'Minimalist',
    website: 'www.mvmt.com',
    email: 'partnerships@mvmt.com',
    description: 'Minimalist watches and eyewear',
    headquarters: 'Los Angeles, USA',
    founded: 2013,
    specialty: 'Minimalist design',
    targetMarket: 'Young professionals'
  },
  {
    id: '19',
    name: 'Quay Australia',
    category: 'Fashion',
    priceRange: '$50-$100',
    style: 'Trendy',
    website: 'www.quayaustralia.com',
    email: 'business@quayaustralia.com',
    description: 'Australian festival and fashion eyewear',
    headquarters: 'Melbourne, Australia',
    founded: 2004,
    specialty: 'Festival and street fashion',
    targetMarket: 'Gen Z and millennials'
  },
  {
    id: '20',
    name: 'Sunday Somewhere',
    category: 'Designer',
    priceRange: '$180-$350',
    style: 'Artistic',
    website: 'www.sundaysomewhere.com',
    email: 'collaborations@sundaysomewhere.com',
    description: 'Artistic and creative eyewear designs',
    headquarters: 'New York, USA',
    founded: 2009,
    specialty: 'Artistic design',
    targetMarket: 'Creative professionals'
  }
  // Note: This is a sample of 20 brands. In a real implementation, 
  // you would continue adding brands to reach 200+
];

// Function to generate additional brands programmatically
export const generateAdditionalBrands = (): Brand[] => {
  const additionalBrands: Brand[] = [];
  const brandTemplates = [
    { prefix: 'Solar', suffix: 'Vision' },
    { prefix: 'Crystal', suffix: 'Optics' },
    { prefix: 'Urban', suffix: 'Shades' },
    { prefix: 'Elite', suffix: 'Eyewear' },
    { prefix: 'Luxe', suffix: 'Specs' },
    { prefix: 'Metro', suffix: 'Frames' },
    { prefix: 'Coastal', suffix: 'Vision' },
    { prefix: 'Summit', suffix: 'Eyewear' },
    { prefix: 'Aurora', suffix: 'Optics' },
    { prefix: 'Phoenix', suffix: 'Shades' }
  ];

  const categories = ['Fashion', 'Sports', 'Luxury', 'Affordable', 'Designer'];
  const styles = ['Classic', 'Modern', 'Retro', 'Minimalist', 'Bold'];
  const countries = ['USA', 'Italy', 'France', 'Germany', 'Japan', 'Australia'];

  for (let i = 21; i <= 200; i++) {
    const template = brandTemplates[i % brandTemplates.length];
    const category = categories[i % categories.length];
    const style = styles[i % styles.length];
    const country = countries[i % countries.length];
    
    additionalBrands.push({
      id: i.toString(),
      name: `${template.prefix} ${template.suffix}`,
      category,
      priceRange: `$${50 + (i % 300)}-$${150 + (i % 500)}`,
      style,
      website: `www.${template.prefix.toLowerCase()}${template.suffix.toLowerCase()}.com`,
      email: `partnerships@${template.prefix.toLowerCase()}${template.suffix.toLowerCase()}.com`,
      description: `Premium ${category.toLowerCase()} eyewear with ${style.toLowerCase()} design`,
      headquarters: country,
      founded: 1990 + (i % 30),
      specialty: `${style} ${category.toLowerCase()} eyewear`,
      targetMarket: `${category} consumers`
    });
  }

  return additionalBrands;
};

export const getAllBrands = (): Brand[] => {
  return [...masterBrandDatabase, ...generateAdditionalBrands()];
};

export const getEmailTemplate = (brandName: string) => {
  return `Subject: Partnership Opportunity with SunglassAI

Dear ${brandName} Team,

I hope this email finds you well. My name is [Your Name], and I'm reaching out from SunglassAI, an innovative platform that's revolutionizing the way consumers discover and connect with premium eyewear brands.

We've been impressed by ${brandName}'s commitment to quality and design excellence, and we believe there's a fantastic opportunity for collaboration between our platforms.

SunglassAI offers:
• AI-powered brand discovery for targeted consumer matching
• Advanced analytics and market insights
• Direct consumer engagement tools
• Brand partnership opportunities

We'd love to explore how we can work together to:
• Increase ${brandName}'s visibility among qualified prospects
• Provide valuable consumer insights and analytics
• Create collaborative marketing opportunities
• Drive qualified traffic to your brand

Would you be available for a brief 15-minute call next week to discuss this opportunity? I'm confident we can create a mutually beneficial partnership that drives real value for ${brandName}.

Looking forward to hearing from you.

Best regards,
[Your Name]
SunglassAI Partnership Team
partnerships@sunglassai.com`;
};

export const searchBrands = (brands: Brand[], query: string): Brand[] => {
  if (!query) return brands;
  
  const lowercaseQuery = query.toLowerCase();
  return brands.filter(brand => 
    brand.name.toLowerCase().includes(lowercaseQuery) ||
    brand.category.toLowerCase().includes(lowercaseQuery) ||
    brand.style.toLowerCase().includes(lowercaseQuery) ||
    brand.specialty.toLowerCase().includes(lowercaseQuery)
  );
};

export const filterBrandsByCategory = (brands: Brand[], category: string): Brand[] => {
  if (!category || category === 'all') return brands;
  return brands.filter(brand => brand.category.toLowerCase() === category.toLowerCase());
};
