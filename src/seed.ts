import config from '@payload-config'
import { getPayload } from 'payload'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  // Seed Product Categories
  console.log('📦 Creating product categories...')
  const categories = await payload.create({
    collection: 'product-categories',
    overrideAccess: true,
    data: [
      {
        name: 'Spices',
        description: 'Premium spices sourced from West Africa',
        icon: '🌶️',
        order: 1,
      },
      {
        name: 'Cereals',
        description: 'High-quality grains and cereals',
        icon: '🌾',
        order: 2,
      },
      {
        name: 'Fruits',
        description: 'Fresh and dried fruits',
        icon: '🍎',
        order: 3,
      },
      {
        name: 'Vegetables',
        description: 'Nutritious vegetables and greens',
        icon: '🥬',
        order: 4,
      },
      {
        name: 'Seeds & Nuts',
        description: 'Edible seeds and nuts',
        icon: '🥜',
        order: 5,
      },
      {
        name: 'Herbs',
        description: 'Dried herbs and medicinal plants',
        icon: '🌿',
        order: 6,
      },
      {
        name: 'Others',
        description: 'Other agricultural products',
        icon: '🪵',
        order: 7,
      },
    ],
    overrideAccess: true,
  })

  console.log(`✅ Created ${categories.docs.length} categories`)

  // Get category IDs
  const categoryMap = new Map(
    categories.docs.map((cat: any) => [cat.name, cat.id])
  )

  // Seed Products
  console.log('📦 Creating products...')
  const products = await payload.create({
    collection: 'products',
    overrideAccess: true,
    data: [
      // Spices
      {
        name: 'Chili',
        slug: 'chili',
        category: categoryMap.get('Spices'),
        description: 'Premium dried chili peppers with vibrant color and heat',
        fullDescription: 'Our chili peppers are carefully selected and dried to preserve their natural color, aroma, and heat. Available in various grades for different culinary applications.',
        specifications: [
          { label: 'Moisture', value: '≤ 12%' },
          { label: 'Color', value: 'Deep Red' },
          { label: 'Heat Level', value: 'Medium-Hot' },
        ],
        price: 1200,
        priceUnit: 'metric-ton',
        moq: 10,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'October - February',
        origin: 'Ghana, Nigeria',
        grade: 'Grade A',
        status: 'published',
        featured: true,
      },
      {
        name: 'Black Pepper',
        slug: 'black-pepper',
        category: categoryMap.get('Spices'),
        description: 'Aromatic black pepper with bold flavor profile',
        fullDescription: 'Premium black pepper sourced from trusted growers. Excellent quality with consistent size and high essential oil content.',
        specifications: [
          { label: 'Moisture', value: '≤ 11%' },
          { label: 'Purity', value: '99%' },
          { label: 'Admixture', value: '≤ 1%' },
        ],
        price: 2500,
        priceUnit: 'metric-ton',
        moq: 5,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'Year-round',
        origin: 'Ghana',
        grade: 'Premium',
        status: 'published',
        featured: true,
      },
      {
        name: 'Hibiscus Flower',
        slug: 'hibiscus-flower',
        category: categoryMap.get('Spices'),
        description: 'Deep crimson hibiscus flowers for tea and culinary use',
        fullDescription: 'Dried hibiscus flowers with rich color and tart flavor. Perfect for hibiscus tea, natural food coloring, and herbal blends.',
        specifications: [
          { label: 'Moisture', value: '≤ 12%' },
          { label: 'Color', value: 'Deep Crimson' },
          { label: 'Impurities', value: '≤ 2%' },
        ],
        price: 1800,
        priceUnit: 'metric-ton',
        moq: 10,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'November - March',
        origin: 'Nigeria, Sudan',
        grade: 'Grade A',
        status: 'published',
        featured: true,
      },
      // Seeds & Nuts
      {
        name: 'Sesame Seeds',
        slug: 'sesame-seeds',
        category: categoryMap.get('Seeds & Nuts'),
        description: 'Natural and hulled sesame seeds, 99.5% purity',
        fullDescription: 'Premium sesame seeds available in natural and hulled varieties. High oil content, excellent for oil extraction and food processing.',
        specifications: [
          { label: 'Purity', value: '99.5%' },
          { label: 'Moisture', value: '≤ 6%' },
          { label: 'Oil Content', value: '≥ 48%' },
        ],
        price: 1400,
        priceUnit: 'metric-ton',
        moq: 20,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'October - January',
        origin: 'Nigeria, Niger',
        grade: 'Export Grade',
        status: 'published',
        featured: true,
      },
      {
        name: 'Cashew Nuts',
        slug: 'cashew-nuts',
        category: categoryMap.get('Seeds & Nuts'),
        description: 'Premium whole cashew nuts with excellent kernel output',
        fullDescription: 'High-quality cashew nuts with minimal defects. Ideal for snacking, confectionery, and cashew nut oil production.',
        specifications: [
          { label: 'Kernel Output', value: '48-50 lbs/bag' },
          { label: 'Defects', value: '≤ 5%' },
          { label: 'Moisture', value: '≤ 5%' },
        ],
        price: 3500,
        priceUnit: 'metric-ton',
        moq: 15,
        moqUnit: 'metric-tons',
        availability: 'seasonal',
        season: 'February - May',
        origin: 'Nigeria, Ivory Coast',
        grade: 'W240, W320',
        status: 'published',
        featured: true,
      },
      {
        name: 'Peanut',
        slug: 'peanut',
        category: categoryMap.get('Seeds & Nuts'),
        description: 'High-quality peanuts for oil and food processing',
        fullDescription: 'Premium peanuts suitable for oil extraction, peanut butter production, and snack applications.',
        specifications: [
          { label: 'Oil Content', value: '≥ 45%' },
          { label: 'Moisture', value: '≤ 7%' },
          { label: 'Aflatoxin', value: '≤ 4 ppb' },
        ],
        price: 1100,
        priceUnit: 'metric-ton',
        moq: 25,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'August - December',
        origin: 'Nigeria, Senegal',
        grade: 'Grade 1',
        status: 'published',
      },
      // Fruits
      {
        name: 'Mango',
        slug: 'mango',
        category: categoryMap.get('Fruits'),
        description: 'Tree-ripened mangoes, export-packed for freshness',
        fullDescription: 'Premium mangoes harvested at peak ripeness. Available as fresh fruit, dried, or puree for various applications.',
        specifications: [
          { label: 'Variety', value: 'Kent, Tommy Atkins' },
          { label: 'Size', value: '300-500g' },
          { label: 'Brix', value: '≥ 14°' },
        ],
        price: 800,
        priceUnit: 'metric-ton',
        moq: 10,
        moqUnit: 'metric-tons',
        availability: 'seasonal',
        season: 'April - July',
        origin: 'Ghana, Nigeria',
        grade: 'Export Grade',
        status: 'published',
        featured: true,
      },
      {
        name: 'Kola Nuts',
        slug: 'kola-nuts',
        category: categoryMap.get('Fruits'),
        description: 'Traditional kola nuts for cultural and beverage use',
        fullDescription: 'Authentic kola nuts with high caffeine content. Used in traditional ceremonies and as a flavoring agent.',
        specifications: [
          { label: 'Caffeine', value: '≥ 2%' },
          { label: 'Moisture', value: '≤ 10%' },
          { label: 'Size', value: 'Large' },
        ],
        price: 2200,
        priceUnit: 'metric-ton',
        moq: 5,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'Year-round',
        origin: 'Nigeria, Ghana',
        grade: 'Premium',
        status: 'published',
      },
      // Cereals
      {
        name: 'Sorghum',
        slug: 'sorghum',
        category: categoryMap.get('Cereals'),
        description: 'High-quality sorghum for food and brewing',
        fullDescription: 'Premium sorghum suitable for food processing, animal feed, and traditional alcoholic beverage production.',
        specifications: [
          { label: 'Moisture', value: '≤ 13%' },
          { label: 'Foreign Matter', value: '≤ 2%' },
          { label: 'Protein', value: '≥ 9%' },
        ],
        price: 350,
        priceUnit: 'metric-ton',
        moq: 50,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'September - December',
        origin: 'Nigeria, Burkina Faso',
        grade: 'Grade 1',
        status: 'published',
      },
      {
        name: 'Millet',
        slug: 'millet',
        category: categoryMap.get('Cereals'),
        description: 'Nutritious millet grains for food and feed',
        fullDescription: 'High-quality pearl millet with excellent nutritional profile. Ideal for human consumption and animal feed.',
        specifications: [
          { label: 'Moisture', value: '≤ 12%' },
          { label: 'Foreign Matter', value: '≤ 1.5%' },
          { label: 'Protein', value: '≥ 10%' },
        ],
        price: 400,
        priceUnit: 'metric-ton',
        moq: 50,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'October - January',
        origin: 'Nigeria, Niger',
        grade: 'Grade 1',
        status: 'published',
      },
      // Herbs
      {
        name: 'Moringa Powder',
        slug: 'moringa-powder',
        category: categoryMap.get('Herbs'),
        description: 'Organic moringa leaf powder, nutrient-dense superfood',
        fullDescription: 'Premium moringa leaf powder processed from fresh leaves. Rich in vitamins, minerals, and antioxidants.',
        specifications: [
          { label: 'Moisture', value: '≤ 8%' },
          { label: 'Ash', value: '≤ 10%' },
          { label: 'Particle Size', value: '80-100 mesh' },
        ],
        price: 5000,
        priceUnit: 'metric-ton',
        moq: 1,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'Year-round',
        origin: 'Ghana',
        grade: 'Organic',
        status: 'published',
      },
      // Others
      {
        name: 'Wood Chips',
        slug: 'wood-chips',
        category: categoryMap.get('Others'),
        description: 'Hardwood chips for biomass and industrial use',
        fullDescription: 'Premium hardwood chips suitable for biomass energy, pulp and paper, and industrial applications.',
        specifications: [
          { label: 'Moisture', value: '≤ 15%' },
          { label: 'Size', value: '20-50mm' },
          { label: 'Bark', value: '≤ 3%' },
        ],
        price: 80,
        priceUnit: 'metric-ton',
        moq: 100,
        moqUnit: 'metric-tons',
        availability: 'available',
        season: 'Year-round',
        origin: 'Ghana, Ivory Coast',
        grade: 'Industrial',
        status: 'published',
      },
    ],
    overrideAccess: true,
  })

  console.log(`✅ Created ${products.length} products`)
  console.log('🎉 Seed completed successfully!')
}

seed().catch(console.error)
