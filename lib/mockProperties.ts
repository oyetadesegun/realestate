import { Property } from '@/components/PropertyCard';

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Luxurious 4-Bedroom Penthouse',
    location: 'Victoria Island',
    price: 350_000_000,
    type: 'house',
    status: 'sale',
    beds: 4,
    baths: 3,
    sqft: 8500,
    image: 'https://images.unsplash.com/photo-1512917774080-9b274b3cbf47?w=800&h=600&fit=crop',
    featured: true,
  },
  {
    id: '2',
    title: 'Modern 3-Bedroom Apartment',
    location: 'Lekki',
    price: 180_000_000,
    type: 'house',
    status: 'sale',
    beds: 3,
    baths: 2,
    sqft: 5500,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
    featured: true,
  },
  {
    id: '3',
    title: 'Prime Commercial Land',
    location: 'Ikoyi',
    price: 250_000_000,
    type: 'land',
    status: 'sale',
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1500382017468-7049fad83d55?w=800&h=600&fit=crop',
    featured: true,
  },
  {
    id: '4',
    title: 'Cozy 2-Bedroom Apartment',
    location: 'Gbagada',
    price: 95_000_000,
    type: 'house',
    status: 'rent',
    beds: 2,
    baths: 1,
    sqft: 3200,
    image: 'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=800&h=600&fit=crop',
  },
  {
    id: '5',
    title: 'Spacious 5-Bedroom Mansion',
    location: 'Ikoyi',
    price: 450_000_000,
    type: 'house',
    status: 'sale',
    beds: 5,
    baths: 4,
    sqft: 12000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    featured: true,
  },
  {
    id: '6',
    title: 'Residential Plot, Ajah',
    location: 'Ajah',
    price: 45_000_000,
    type: 'land',
    status: 'sale',
    sqft: 5000,
    image: 'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop',
  },
  {
    id: '7',
    title: 'Ultra-Modern Studio',
    location: 'Victoria Island',
    price: 75_000_000,
    type: 'house',
    status: 'rent',
    beds: 1,
    baths: 1,
    sqft: 2000,
    image: 'https://images.unsplash.com/photo-1546884291-bb4baf4d50e1?w=800&h=600&fit=crop',
  },
  {
    id: '8',
    title: 'Garden Townhouse',
    location: 'Lekki',
    price: 220_000_000,
    type: 'house',
    status: 'sale',
    beds: 3,
    baths: 3,
    sqft: 6800,
    image: 'https://images.unsplash.com/photo-1502301103665-73e0c811e36d?w=800&h=600&fit=crop',
  },
  {
    id: '9',
    title: 'Commercial Space, Ikeja',
    location: 'Ikeja',
    price: 120_000_000,
    type: 'land',
    status: 'rent',
    sqft: 8000,
    image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&h=600&fit=crop',
  },
  {
    id: '10',
    title: 'Luxury Duplex with Pool',
    location: 'Surulere',
    price: 320_000_000,
    type: 'house',
    status: 'sale',
    beds: 4,
    baths: 3,
    sqft: 10000,
    image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop',
  },
];

export const propertyDetails: Record<
  string,
  {
    images: string[];
    yearBuilt?: number;
    amenities: string[];
    description: string;
  }
> = {
  '1': {
    images: [
      'https://images.unsplash.com/photo-1512917774080-9b274b3cbf47?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2022,
    amenities: ['Swimming Pool', 'Security', 'Garden', 'Power Backup', 'WiFi', 'Air Conditioning'],
    description:
      'Stunning luxury penthouse with panoramic views of Victoria Island. This exquisite property features premium finishes, state-of-the-art technology, and exclusive amenities. Perfect for those seeking the finest in urban living with unparalleled comfort and style.',
  },
  '2': {
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551632786-de41ecbe7178?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2021,
    amenities: ['WiFi', 'Parking', 'Security', 'Power Backup'],
    description:
      'Beautiful modern apartment located in the heart of Lekki, a vibrant and thriving community. This property combines contemporary design with functional living spaces, ideal for young professionals and families alike.',
  },
  '3': {
    images: [
      'https://images.unsplash.com/photo-1500382017468-7049fad83d55?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2020,
    amenities: ['Security', 'Power Backup'],
    description:
      'Prime commercial land in the exclusive Ikoyi district. With excellent accessibility and proximity to major business centers, this land is ideal for commercial development or investment opportunities.',
  },
  '4': {
    images: [
      'https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1502670473441-8df91489944a?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2023,
    amenities: ['Parking', 'WiFi'],
    description:
      'Comfortable and well-maintained 2-bedroom apartment perfect for couples or small families. Located in peaceful Gbagada with easy access to shopping centers and transport hubs.',
  },
  '5': {
    images: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1601714174585-841bb90e8e81?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2019,
    amenities: ['Swimming Pool', 'Garden', 'Security', 'Power Backup', 'Air Conditioning', 'Balcony'],
    description:
      'Magnificent 5-bedroom mansion in prestigious Ikoyi with sprawling grounds and premium features. This executive residence offers luxury living with world-class amenities and stunning architecture.',
  },
  '6': {
    images: [
      'https://images.unsplash.com/photo-1464207687429-7505649dae38?w=1000&h=800&fit=crop',
    ],
    amenities: ['Security'],
    description:
      'Well-located residential plot in Ajah, an emerging neighborhood with strong growth potential. Ideal for building your dream home or as an investment opportunity.',
  },
  '7': {
    images: [
      'https://images.unsplash.com/photo-1546884291-bb4baf4d50e1?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2023,
    amenities: ['WiFi', 'Parking', 'Air Conditioning'],
    description:
      'Stylish modern studio apartment perfect for young professionals. Sleek design, excellent location in Victoria Island, and proximity to entertainment venues and dining options.',
  },
  '8': {
    images: [
      'https://images.unsplash.com/photo-1502301103665-73e0c811e36d?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1512917774080-9b274b3cbf47?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2021,
    amenities: ['Garden', 'Parking', 'Security', 'WiFi'],
    description:
      'Charming townhouse in upscale Lekki with beautiful garden space. Perfect for families seeking suburban comfort with urban convenience.',
  },
  '9': {
    images: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1000&h=800&fit=crop',
    ],
    amenities: ['Parking', 'Power Backup'],
    description:
      'Strategic commercial space in Ikeja, Lagos\'s business hub. Ideal location for retail, office, or warehouse operations with excellent visibility and foot traffic.',
  },
  '10': {
    images: [
      'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1000&h=800&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&h=800&fit=crop',
    ],
    yearBuilt: 2020,
    amenities: ['Swimming Pool', 'Security', 'Power Backup', 'Garden', 'Air Conditioning'],
    description:
      'Spectacular luxury duplex featuring a private swimming pool and manicured gardens. Located in Surulere with easy access to major roads and amenities.',
  },
};
