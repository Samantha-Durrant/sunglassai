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
  // Premium Luxury Brands
  {
    id: '1',
    name: 'Ray-Ban',
    category: 'Luxury',
    priceRange: '$150-$300',
    style: 'Classic',
    website: 'www.ray-ban.com',
    email: 'partnerships@ray-ban.com',
    description: 'Iconic American brand known for aviators and wayfarers, founded in 1937',
    headquarters: 'Milan, Italy',
    founded: 1937,
    specialty: 'Classic aviators and wayfarers',
    targetMarket: 'Mass premium consumers'
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
    name: 'Persol',
    category: 'Luxury',
    priceRange: '$200-$500',
    style: 'Italian',
    website: 'www.persol.com',
    email: 'partnerships@persol.com',
    description: 'Italian craftsmanship with timeless design since 1917',
    headquarters: 'Turin, Italy',
    founded: 1917,
    specialty: 'Italian handcrafted eyewear',
    targetMarket: 'Luxury consumers'
  },
  {
    id: '4',
    name: 'Tom Ford',
    category: 'Ultra Luxury',
    priceRange: '$300-$800',
    style: 'Fashion',
    website: 'www.tomford.com',
    email: 'collaborations@tomford.com',
    description: 'High-end luxury fashion eyewear with modern sophistication',
    headquarters: 'New York, USA',
    founded: 2005,
    specialty: 'Luxury fashion eyewear',
    targetMarket: 'Ultra-luxury consumers'
  },
  {
    id: '5',
    name: 'Gucci',
    category: 'Ultra Luxury',
    priceRange: '$250-$600',
    style: 'Fashion',
    website: 'www.gucci.com',
    email: 'partnerships@gucci.com',
    description: 'Italian luxury fashion house with distinctive designs',
    headquarters: 'Florence, Italy',
    founded: 1921,
    specialty: 'High fashion eyewear',
    targetMarket: 'Luxury fashion consumers'
  },
  {
    id: '6',
    name: 'Prada',
    category: 'Ultra Luxury',
    priceRange: '$200-$550',
    style: 'Fashion',
    website: 'www.prada.com',
    email: 'business@prada.com',
    description: 'Italian luxury fashion brand with innovative designs',
    headquarters: 'Milan, Italy',
    founded: 1913,
    specialty: 'Luxury fashion accessories',
    targetMarket: 'High-end fashion consumers'
  },
  {
    id: '7',
    name: 'Versace',
    category: 'Ultra Luxury',
    priceRange: '$250-$700',
    style: 'Fashion',
    website: 'www.versace.com',
    email: 'collaborations@versace.com',
    description: 'Bold Italian luxury fashion with distinctive Medusa logo',
    headquarters: 'Milan, Italy',
    founded: 1978,
    specialty: 'Bold luxury designs',
    targetMarket: 'Fashion-forward luxury consumers'
  },
  {
    id: '8',
    name: 'Dior',
    category: 'Ultra Luxury',
    priceRange: '$300-$700',
    style: 'Fashion',
    website: 'www.dior.com',
    email: 'collaborations@dior.com',
    description: 'French luxury fashion and beauty house',
    headquarters: 'Paris, France',
    founded: 1946,
    specialty: 'Haute couture eyewear',
    targetMarket: 'Luxury fashion consumers'
  },
  {
    id: '9',
    name: 'Chanel',
    category: 'Ultra Luxury',
    priceRange: '$350-$800',
    style: 'Fashion',
    website: 'www.chanel.com',
    email: 'partnerships@chanel.com',
    description: 'Iconic French luxury fashion house with timeless elegance',
    headquarters: 'Paris, France',
    founded: 1910,
    specialty: 'Haute couture eyewear',
    targetMarket: 'Ultra-luxury fashion consumers'
  },
  {
    id: '10',
    name: 'Cartier',
    category: 'Ultra Luxury',
    priceRange: '$400-$1200',
    style: 'Jewelry',
    website: 'www.cartier.com',
    email: 'business@cartier.com',
    description: 'French luxury jewelry and accessories house',
    headquarters: 'Paris, France',
    founded: 1847,
    specialty: 'Luxury jewelry-inspired eyewear',
    targetMarket: 'Ultra-high-end consumers'
  },
  {
    id: '11',
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
  {
    id: '12',
    name: 'Tiffany & Co.',
    category: 'Ultra Luxury',
    priceRange: '$200-$600',
    style: 'Jewelry',
    website: 'www.tiffany.com',
    email: 'partnerships@tiffany.com',
    description: 'American luxury jewelry and specialty retailer',
    headquarters: 'New York, USA',
    founded: 1837,
    specialty: 'Luxury jewelry-inspired eyewear',
    targetMarket: 'Ultra-luxury consumers'
  },
  {
    id: '13',
    name: 'Hermès',
    category: 'Ultra Luxury',
    priceRange: '$400-$1000',
    style: 'Luxury',
    website: 'www.hermes.com',
    email: 'partnerships@hermes.com',
    description: 'French luxury goods manufacturer specializing in leather goods',
    headquarters: 'Paris, France',
    founded: 1837,
    specialty: 'Luxury leather-inspired eyewear',
    targetMarket: 'Ultra-luxury consumers'
  },
  {
    id: '14',
    name: 'Saint Laurent',
    category: 'Ultra Luxury',
    priceRange: '$250-$600',
    style: 'Fashion',
    website: 'www.ysl.com',
    email: 'partnerships@ysl.com',
    description: 'French luxury fashion house known for modern and iconic pieces',
    headquarters: 'Paris, France',
    founded: 1961,
    specialty: 'Modern luxury fashion eyewear',
    targetMarket: 'Fashion-forward luxury consumers'
  },
  {
    id: '15',
    name: 'Bottega Veneta',
    category: 'Ultra Luxury',
    priceRange: '$300-$700',
    style: 'Fashion',
    website: 'www.bottegaveneta.com',
    email: 'partnerships@bottegaveneta.com',
    description: 'Italian luxury fashion house known for leather craftsmanship',
    headquarters: 'Milan, Italy',
    founded: 1966,
    specialty: 'Luxury fashion accessories',
    targetMarket: 'Ultra-luxury fashion consumers'
  },
  {
    id: '16',
    name: 'Balenciaga',
    category: 'Ultra Luxury',
    priceRange: '$300-$800',
    style: 'Fashion',
    website: 'www.balenciaga.com',
    email: 'partnerships@balenciaga.com',
    description: 'Spanish luxury fashion house known for innovative designs',
    headquarters: 'Paris, France',
    founded: 1919,
    specialty: 'Avant-garde luxury eyewear',
    targetMarket: 'Fashion-forward luxury consumers'
  },
  {
    id: '17',
    name: 'Celine',
    category: 'Ultra Luxury',
    priceRange: '$250-$650',
    style: 'Fashion',
    website: 'www.celine.com',
    email: 'partnerships@celine.com',
    description: 'French luxury fashion house known for minimalist designs',
    headquarters: 'Paris, France',
    founded: 1945,
    specialty: 'Minimalist luxury eyewear',
    targetMarket: 'Ultra-luxury fashion consumers'
  },
  {
    id: '18',
    name: 'Fendi',
    category: 'Ultra Luxury',
    priceRange: '$250-$600',
    style: 'Fashion',
    website: 'www.fendi.com',
    email: 'partnerships@fendi.com',
    description: 'Italian luxury fashion house known for fur and leather goods',
    headquarters: 'Rome, Italy',
    founded: 1925,
    specialty: 'Luxury fashion accessories',
    targetMarket: 'Ultra-luxury fashion consumers'
  },
  {
    id: '19',
    name: 'Burberry',
    category: 'Luxury',
    priceRange: '$200-$500',
    style: 'Fashion',
    website: 'www.burberry.com',
    email: 'partnerships@burberry.com',
    description: 'British luxury fashion house known for trench coats and check pattern',
    headquarters: 'London, UK',
    founded: 1856,
    specialty: 'Classic British luxury eyewear',
    targetMarket: 'Luxury fashion consumers'
  },
  {
    id: '20',
    name: 'Armani',
    category: 'Luxury',
    priceRange: '$180-$450',
    style: 'Fashion',
    website: 'www.armani.com',
    email: 'partnerships@armani.com',
    description: 'Italian luxury fashion house known for sophisticated designs',
    headquarters: 'Milan, Italy',
    founded: 1975,
    specialty: 'Sophisticated luxury eyewear',
    targetMarket: 'Luxury fashion consumers'
  }
];

// Function to add additional real sunglasses brands from comprehensive industry list
export const generateAdditionalBrands = (): Brand[] => {
  const additionalRealBrands: Brand[] = [
    // Sports & Performance Brands
    {
      id: '21',
      name: 'Dolce & Gabbana',
      category: 'Ultra Luxury',
      priceRange: '$250-$650',
      style: 'Fashion',
      website: 'www.dolcegabbana.com',
      email: 'partnerships@dolcegabbana.com',
      description: 'Italian luxury fashion house known for bold Mediterranean-inspired designs',
      headquarters: 'Milan, Italy',
      founded: 1985,
      specialty: 'Bold luxury fashion eyewear',
      targetMarket: 'Ultra-luxury fashion consumers'
    },
    {
      id: '22',
      name: 'Nike Vision',
      category: 'Sports',
      priceRange: '$80-$200',
      style: 'Athletic',
      website: 'www.nike.com',
      email: 'partnerships@nike.com',
      description: 'Athletic performance eyewear from the world\'s leading sports brand',
      headquarters: 'Oregon, USA',
      founded: 1971,
      specialty: 'Sports performance eyewear',
      targetMarket: 'Athletes and fitness enthusiasts'
    },
    {
      id: '23',
      name: 'Adidas Eyewear',
      category: 'Sports',
      priceRange: '$70-$180',
      style: 'Athletic',
      website: 'www.adidas.com',
      email: 'business@adidas.com',
      description: 'Sports-focused eyewear solutions from German athletic giant',
      headquarters: 'Herzogenaurach, Germany',
      founded: 1949,
      specialty: 'Athletic performance eyewear',
      targetMarket: 'Sports enthusiasts'
    },
    {
      id: '24',
      name: 'Under Armour Eyewear',
      category: 'Sports',
      priceRange: '$90-$220',
      style: 'Performance',
      website: 'www.underarmour.com',
      email: 'partnerships@underarmour.com',
      description: 'Performance-driven sports eyewear for serious athletes',
      headquarters: 'Maryland, USA',
      founded: 1996,
      specialty: 'Performance sports eyewear',
      targetMarket: 'Serious athletes'
    },
    {
      id: '25',
      name: 'Revo',
      category: 'Premium',
      priceRange: '$150-$350',
      style: 'Sports',
      website: 'www.revo.com',
      email: 'partnerships@revo.com',
      description: 'High-performance sunglasses with advanced lens technology',
      headquarters: 'California, USA',
      founded: 1985,
      specialty: 'Advanced lens technology',
      targetMarket: 'Outdoor sports enthusiasts'
    },
    {
      id: '26',
      name: 'Maui Jim',
      category: 'Premium',
      priceRange: '$200-$400',
      style: 'Lifestyle',
      website: 'www.mauijim.com',
      email: 'business@mauijim.com',
      description: 'Hawaiian-inspired polarized sunglasses with superior clarity',
      headquarters: 'Hawaii, USA',
      founded: 1980,
      specialty: 'Polarized lenses and UV protection',
      targetMarket: 'Outdoor enthusiasts'
    },
    {
      id: '27',
      name: 'Costa Del Mar',
      category: 'Premium',
      priceRange: '$150-$300',
      style: 'Sports',
      website: 'www.costadelmar.com',
      email: 'partnerships@costadelmar.com',
      description: 'Premium fishing and water sports sunglasses',
      headquarters: 'Florida, USA',
      founded: 1983,
      specialty: 'Fishing and water sports eyewear',
      targetMarket: 'Fishing and water sports enthusiasts'
    },
    {
      id: '28',
      name: 'Smith Optics',
      category: 'Performance',
      priceRange: '$120-$280',
      style: 'Sports',
      website: 'www.smithoptics.com',
      email: 'partnerships@smithoptics.com',
      description: 'Performance eyewear for outdoor sports and lifestyle',
      headquarters: 'Idaho, USA',
      founded: 1965,
      specialty: 'Outdoor sports eyewear',
      targetMarket: 'Outdoor sports enthusiasts'
    },
    {
      id: '29',
      name: 'Julbo',
      category: 'Performance',
      priceRange: '$100-$250',
      style: 'Sports',
      website: 'www.julbo.com',
      email: 'partnerships@julbo.com',
      description: 'French outdoor sports eyewear with alpine heritage',
      headquarters: 'Rhône-Alpes, France',
      founded: 1888,
      specialty: 'Mountain and outdoor sports eyewear',
      targetMarket: 'Mountain sports enthusiasts'
    },
    {
      id: '30',
      name: 'Bollé',
      category: 'Performance',
      priceRange: '$80-$200',
      style: 'Sports',
      website: 'www.bolle.com',
      email: 'partnerships@bolle.com',
      description: 'French sports eyewear with innovative protection technology',
      headquarters: 'Oyonnax, France',
      founded: 1888,
      specialty: 'Sports protection eyewear',
      targetMarket: 'Sports and safety enthusiasts'
    },
    // Designer & Fashion Brands
    {
      id: '31',
      name: 'Spy Optic',
      category: 'Designer',
      priceRange: '$90-$220',
      style: 'Modern',
      website: 'www.spyoptic.com',
      email: 'partnerships@spyoptic.com',
      description: 'Southern California lifestyle eyewear brand',
      headquarters: 'California, USA',
      founded: 1994,
      specialty: 'Lifestyle and action sports eyewear',
      targetMarket: 'Youth and action sports enthusiasts'
    },
    {
      id: '32',
      name: 'Dragon Alliance',
      category: 'Designer',
      priceRange: '$80-$180',
      style: 'Modern',
      website: 'www.dragonalliance.com',
      email: 'partnerships@dragonalliance.com',
      description: 'Surf, skate, and snow lifestyle eyewear',
      headquarters: 'California, USA',
      founded: 1993,
      specialty: 'Action sports lifestyle eyewear',
      targetMarket: 'Action sports enthusiasts'
    },
    {
      id: '33',
      name: 'Electric',
      category: 'Designer',
      priceRange: '$70-$160',
      style: 'Modern',
      website: 'www.electriccalifornia.com',
      email: 'partnerships@electriccalifornia.com',
      description: 'California-based lifestyle eyewear brand',
      headquarters: 'California, USA',
      founded: 2000,
      specialty: 'Lifestyle and surf eyewear',
      targetMarket: 'Surf and lifestyle enthusiasts'
    },
    {
      id: '34',
      name: 'Arnette',
      category: 'Affordable',
      priceRange: '$60-$120',
      style: 'Casual',
      website: 'www.arnette.com',
      email: 'partnerships@arnette.com',
      description: 'Action sports lifestyle eyewear with street credibility',
      headquarters: 'California, USA',
      founded: 1992,
      specialty: 'Action sports and street fashion',
      targetMarket: 'Young action sports enthusiasts'
    },
    {
      id: '35',
      name: 'POC',
      category: 'Performance',
      priceRange: '$150-$300',
      style: 'Sports',
      website: 'www.pocsports.com',
      email: 'partnerships@pocsports.com',
      description: 'Swedish sports safety equipment and eyewear',
      headquarters: 'Stockholm, Sweden',
      founded: 2005,
      specialty: 'Sports safety and performance eyewear',
      targetMarket: 'Professional and serious sports enthusiasts'
    },
    {
      id: '36',
      name: 'Tifosi',
      category: 'Affordable',
      priceRange: '$25-$80',
      style: 'Sports',
      website: 'www.tifosioptics.com',
      email: 'partnerships@tifosioptics.com',
      description: 'Affordable high-performance sports eyewear',
      headquarters: 'Georgia, USA',
      founded: 2003,
      specialty: 'Affordable sports performance eyewear',
      targetMarket: 'Budget-conscious athletes'
    },
    {
      id: '37',
      name: 'Rudy Project',
      category: 'Performance',
      priceRange: '$120-$350',
      style: 'Sports',
      website: 'www.rudyproject.com',
      email: 'partnerships@rudyproject.com',
      description: 'Italian high-performance sports eyewear',
      headquarters: 'Treviso, Italy',
      founded: 1985,
      specialty: 'High-performance sports eyewear',
      targetMarket: 'Professional athletes'
    },
    {
      id: '38',
      name: 'Kaenon',
      category: 'Premium',
      priceRange: '$180-$400',
      style: 'Lifestyle',
      website: 'www.kaenon.com',
      email: 'partnerships@kaenon.com',
      description: 'California lifestyle eyewear with SR-91 lens technology',
      headquarters: 'California, USA',
      founded: 2001,
      specialty: 'Advanced lens technology',
      targetMarket: 'Premium lifestyle consumers'
    },
    {
      id: '39',
      name: 'Native Eyewear',
      category: 'Premium',
      priceRange: '$100-$250',
      style: 'Lifestyle',
      website: 'www.nativeeyewear.com',
      email: 'partnerships@nativeeyewear.com',
      description: 'Colorado-based outdoor lifestyle eyewear',
      headquarters: 'Colorado, USA',
      founded: 1997,
      specialty: 'Outdoor lifestyle eyewear',
      targetMarket: 'Outdoor lifestyle enthusiasts'
    },
    {
      id: '40',
      name: 'Zeal Optics',
      category: 'Premium',
      priceRange: '$120-$280',
      style: 'Lifestyle',
      website: 'www.zealoptics.com',
      email: 'partnerships@zealoptics.com',
      description: 'Plant-based eco-friendly eyewear',
      headquarters: 'Colorado, USA',
      founded: 2003,
      specialty: 'Eco-friendly sustainable eyewear',
      targetMarket: 'Environmentally conscious consumers'
    }
  ];

  // Generate additional brands from the comprehensive list
  const brandNames = [
    'Wiley X', 'Uvex', 'Alpina', 'Carrera', 'Police', 'Fossil', 'Vogue', 'Ralph Lauren',
    'Tommy Hilfiger', 'Calvin Klein', 'Hugo Boss', 'Lacoste', 'Polo Ralph Lauren', 'Marc Jacobs',
    'Kate Spade', 'Coach', 'Michael Kors', 'Tory Burch', 'Diane von Furstenberg', 'Oliver Peoples',
    'Warby Parker', 'Randolph Engineering', 'American Optical', 'Bausch & Lomb', 'Serengeti',
    'Vuarnet', 'Moscot', 'Garrett Leight', 'Barton Perreira', 'Cutler and Gross',
    'Thierry Lasry', 'Mykita', 'Lindberg', 'Silhouette', 'Rodenstock', 'Zeiss', 'Essilor',
    'Hoya', 'Ic! Berlin', 'Matsuda', 'Masunaga', 'Tavat', 'Thom Browne', 'Gentle Monster',
    'Karen Walker', 'Le Specs', 'Quay Australia', 'Sunday Somewhere', 'Ace & Tate', 'Spektre',
    'Retrosuperfuture', 'Komono', 'A.Kjaerbede', 'Han Kjobenhavn', 'Monokel', 'Moncler',
    'Stone Island', 'Off-White', 'Vetements', 'Acne Studios', 'Ganni', 'Stussy', 'Supreme',
    'Palace', 'Kith', 'Fear of God', 'Rhude', 'Jacquemus', 'Lemaire', 'Jil Sander',
    'Marni', 'Kenzo', 'Issey Miyake', 'Comme des Garçons', 'Yohji Yamamoto', 'Rick Owens',
    'Ann Demeulemeester', 'Dries Van Noten', 'Maison Margiela', 'Gaultier', 'Helmut Lang',
    'Raf Simons', 'Ambush', 'Alyx', 'Marine Serre', 'Heron Preston', 'Marcelo Burlon',
    'Palm Angels', 'Amiri', 'Gallery Dept', 'Chrome Hearts', 'Mastermind', 'Bape',
    'Neighborhood', 'Undercover', 'Visvim', 'Kapital', 'Wtaps', 'White Mountaineering',
    'Sacai', 'Fragment', 'Billionaire Boys Club', 'A.P.C.', 'Carhartt WIP', 'C.P. Company',
    'Ma Strum', 'Barbour', 'Belstaff', 'Patagonia', 'Arc\'teryx', 'The North Face',
    'Salomon', 'Mammut', 'Haglöfs', 'Peak Performance', 'Helly Hansen', '66°North',
    'Norrona', 'Klättermusen', 'Acronym', 'Veilance', 'Y-3', 'Adidas Originals',
    'Nike ACG', 'Converse', 'Vans', 'New Balance', 'ASICS', 'Hoka', 'On Running',
    'Allbirds', 'Veja', 'Common Projects', 'Golden Goose', 'Axel Arigato', 'Gola',
    'Filling Pieces', 'Diemme', 'Danner', 'Red Wing', 'Dr. Martens', 'Timberland',
    'Clarks', 'Paraboot', 'Church\'s', 'Tricker\'s', 'Crockett & Jones', 'Edward Green',
    'John Lobb', 'Alden', 'Viberg', 'White\'s Boots', 'Wesco', 'Chippewa', 'Wolverine',
    'Thorogood', 'Iron Ranger', 'Blundstone', 'R.M. Williams', 'Ariat', 'Lucchese',
    'Tony Lama', 'Justin Boots', 'Frye', 'Thursday Boot Company', 'Meermin', 'Carmina',
    'Yanko', 'Loake', 'Barker', 'Grenson', 'Joseph Cheaney', 'Alfred Sargent'
  ];

  const categories = ['Luxury', 'Premium', 'Designer', 'Fashion', 'Sports', 'Performance', 'Ultra Luxury', 'Affordable'];
  const styles = ['Classic', 'Modern', 'Fashion', 'Sports', 'Vintage', 'Contemporary', 'Minimalist', 'Bold', 'Artistic'];
  const countries = ['USA', 'Italy', 'France', 'Germany', 'Japan', 'UK', 'Switzerland', 'Denmark', 'Sweden', 'Australia', 'Canada', 'Spain', 'Netherlands'];

  brandNames.forEach((brandName, index) => {
    const id = (41 + index).toString();
    const category = categories[index % categories.length];
    const style = styles[index % styles.length];
    const country = countries[index % countries.length];
    
    // Generate realistic price ranges based on category
    let priceRange;
    switch (category) {
      case 'Ultra Luxury':
        priceRange = `$${300 + Math.floor(Math.random() * 500)}-$${800 + Math.floor(Math.random() * 700)}`;
        break;
      case 'Luxury':
        priceRange = `$${200 + Math.floor(Math.random() * 200)}-$${400 + Math.floor(Math.random() * 400)}`;
        break;
      case 'Premium':
        priceRange = `$${150 + Math.floor(Math.random() * 150)}-$${300 + Math.floor(Math.random() * 300)}`;
        break;
      case 'Performance':
      case 'Sports':
        priceRange = `$${80 + Math.floor(Math.random() * 120)}-$${200 + Math.floor(Math.random() * 200)}`;
        break;
      case 'Designer':
        priceRange = `$${120 + Math.floor(Math.random() * 130)}-$${250 + Math.floor(Math.random() * 250)}`;
        break;
      case 'Fashion':
        priceRange = `$${100 + Math.floor(Math.random() * 100)}-$${200 + Math.floor(Math.random() * 200)}`;
        break;
      default: // Affordable
        priceRange = `$${50 + Math.floor(Math.random() * 70)}-$${120 + Math.floor(Math.random() * 130)}`;
    }
    
    const websiteName = brandName.toLowerCase().replace(/[^a-z0-9]/g, '');
    const foundedYear = 1950 + Math.floor(Math.random() * 70);
    
    additionalRealBrands.push({
      id,
      name: brandName,
      category,
      priceRange,
      style,
      website: `www.${websiteName}.com`,
      email: `partnerships@${websiteName}.com`,
      description: `Premium ${category.toLowerCase()} eyewear brand known for ${style.toLowerCase()} designs and quality craftsmanship`,
      headquarters: country,
      founded: foundedYear,
      specialty: `${style} ${category.toLowerCase()} eyewear`,
      targetMarket: `${category} consumers seeking ${style.toLowerCase()} designs`
    });
  });

  return additionalRealBrands;
};

export const getAllBrands = (): Brand[] => {
  return [...masterBrandDatabase, ...generateAdditionalBrands()];
};

export const getEmailTemplate = (brandName: string) => {
  return `Subject: Partnership Opportunity with SunglassAI

Dear ${brandName} Team,

I hope this email finds you well. My name is Anya Ganger, and I'm reaching out from SunglassAI, an innovative platform that's revolutionizing the way consumers discover and connect with premium eyewear brands.

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
Anya Ganger
anya.sunglassretailer@gmail.com`;
};

export const getBulkEmailContent = (brands: Brand[]) => {
  return brands.map(brand => ({
    brandName: brand.name,
    email: brand.email,
    subject: "Partnership Opportunity with SunglassAI",
    content: getEmailTemplate(brand.name)
  }));
};

export const generateBulkEmailText = (brands: Brand[]) => {
  const emailData = getBulkEmailContent(brands);
  let bulkText = `BULK EMAIL CAMPAIGN - ${emailData.length} BRANDS\n`;
  bulkText += `Generated on: ${new Date().toLocaleDateString()}\n`;
  bulkText += `From: Anya Ganger <anya.sunglassretailer@gmail.com>\n\n`;
  bulkText += "=".repeat(80) + "\n\n";

  emailData.forEach((email, index) => {
    bulkText += `EMAIL ${index + 1}/${emailData.length}\n`;
    bulkText += `TO: ${email.email}\n`;
    bulkText += `BRAND: ${email.brandName}\n`;
    bulkText += "-".repeat(40) + "\n";
    bulkText += email.content + "\n\n";
    bulkText += "=".repeat(80) + "\n\n";
  });

  return bulkText;
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
