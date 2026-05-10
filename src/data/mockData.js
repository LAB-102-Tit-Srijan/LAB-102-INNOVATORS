export const MOCK_LISTINGS = [
  {
    id: 1,
    title: 'Engineering Mathematics Vol 1 (Latest Edition)',
    description: 'Selling my engineering math book. Pages are crisp and clean. No highlights. Required for 1st-year students.',
    price: 350,
    originalPrice: 650,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=600', // darker, raw look
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 8,
    category: 'Books & Notes',
    forFirstYear: true,
    location: 'Main Library',
    seller: { id: 'user_1', name: 'Rahul S.', avatar: 'https://i.pravatar.cc/150?img=11', rating: 4.8, verified: true, trustScore: 98 },
    type: 'sell',
    reviews: [
      { id: 'r1', user: 'Vikram', rating: 5, text: 'Great condition, just like he described. Fast reply too!', date: '2 days ago' },
      { id: 'r2', user: 'Priya', rating: 4, text: 'Book is good but the meetup was delayed by 15 mins.', date: '1 week ago' }
    ]
  },
  {
    id: 2,
    title: 'Casio fx-991EX Scientific Calculator',
    description: 'Fully functional scientific calculator. Minor scratches on the back cover but screen is perfect.',
    price: 15,
    originalPrice: 1200,
    images: [
      '/casio_calculator.png'
    ],
    condition: 'Good',
    ageInMonths: 14,
    category: 'Electronics',
    location: 'Hostel Block B',
    seller: { id: 'user_2', name: 'Priya M.', avatar: 'https://i.pravatar.cc/150?img=5', rating: 4.9, verified: true, trustScore: 99 },
    type: 'rent',
    reviews: [
      { id: 'r3', user: 'Ananya', rating: 5, text: 'Rented this for my midterms. Worked perfectly.', date: '3 weeks ago' }
    ]
  },
  {
    id: 3,
    title: 'Data Structures and Algorithms Notes',
    description: 'Comprehensive handwritten notes for DSA. Covers trees, graphs, and dynamic programming.',
    price: 0,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'New',
    ageInMonths: 0,
    category: 'Books & Notes',
    location: 'CS Department',
    seller: { id: 'user_3', name: 'Amit K.', avatar: 'https://i.pravatar.cc/150?img=8', rating: 4.5, verified: true, trustScore: 92 },
    type: 'exchange',
    reviews: []
  },
  {
    id: 4,
    title: 'Drafting Board & Mini Drafter Set',
    description: 'Complete set for engineering graphics. Includes drafting board, mini drafter, and clips. Excellent condition.',
    price: 400,
    originalPrice: 850,
    images: [
      'https://images.unsplash.com/photo-1503694978374-8a2fa686963a?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 6,
    category: 'Stationery',
    forFirstYear: true,
    location: 'Hostel Block A',
    seller: { id: 'user_4', name: 'Sneha R.', avatar: 'https://i.pravatar.cc/150?img=9', rating: 5.0, verified: true, trustScore: 100 },
    type: 'sell',
    reviews: []
  },
  {
    id: 5,
    title: 'Electric Kettle (1.5L)',
    description: 'Perfect for late-night Maggi and coffee. Boils water very fast. Selling because I am graduating.',
    price: 450,
    originalPrice: 900,
    images: [
      '/electric_kettle.png'
    ],
    condition: 'Good',
    ageInMonths: 20,
    category: 'Hostel Essentials',
    location: 'Hostel Block C',
    seller: { id: 'user_5', name: 'Vikram D.', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4.2, verified: true, trustScore: 85 },
    type: 'sell',
    reviews: []
  },
  {
    id: 6,
    title: 'MacBook Pro 13" (M1, 8GB, 256GB)',
    description: 'Upgrading to a newer model. Works perfectly for coding and light editing. Battery health 89%.',
    price: 45000,
    originalPrice: 99000,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600' // slightly glitchy/amateur screen glare
    ],
    condition: 'Good',
    ageInMonths: 36,
    category: 'Electronics',
    location: 'Cafeteria',
    seller: { id: 'user_6', name: 'Arjun P.', avatar: 'https://i.pravatar.cc/150?img=14', rating: 4.7, verified: true, trustScore: 94 },
    type: 'sell',
    reviews: [
      { id: 'r4', user: 'Neha', rating: 5, text: 'Awesome seller! Laptop was in pristine condition as promised.', date: '1 month ago' }
    ]
  },
  {
    id: 7,
    title: 'Lab Coat (Size M)',
    description: 'Standard white lab coat required for chemistry labs. Washed and ironed.',
    price: 100,
    originalPrice: 350,
    images: [
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 10,
    category: 'Stationery',
    forFirstYear: true,
    location: 'Chemistry Block',
    seller: { id: 'user_7', name: 'Neha S.', avatar: 'https://i.pravatar.cc/150?img=16', rating: 4.9, verified: true, trustScore: 96 },
    type: 'sell',
    reviews: []
  },
  {
    id: 8,
    title: 'Study Table Lamp',
    description: 'LED desk lamp with adjustable brightness. USB rechargeable.',
    price: 300,
    originalPrice: 700,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 5,
    category: 'Hostel Essentials',
    location: 'Hostel Block D',
    seller: { id: 'user_8', name: 'Rohan B.', avatar: 'https://i.pravatar.cc/150?img=18', rating: 4.6, verified: true, trustScore: 91 },
    type: 'sell',
    reviews: []
  },
  {
    id: 9,
    title: 'Hero Sprint Pro Bicycle',
    description: 'Perfect for navigating around campus. Geared cycle with mudguards. Lock included.',
    price: 50,
    originalPrice: 7500,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?auto=format&fit=crop&q=80&w=600', // rough outdoor lighting
      'https://images.unsplash.com/photo-1511994298241-608e28f14fde?auto=format&fit=crop&q=80&w=600' // slightly blurry/glitchy look
    ],
    condition: 'Good',
    ageInMonths: 24,
    category: 'Bikes & Cycles',
    location: 'Hostel Block B Cycle Stand',
    seller: { id: 'user_9', name: 'Karan V.', avatar: 'https://i.pravatar.cc/150?img=20', rating: 4.8, verified: true, trustScore: 95 },
    type: 'rent',
    reviews: [
      { id: 'r5', user: 'Rohan', rating: 5, text: 'Rented for a weekend trip. Cycle is smooth.', date: '2 days ago' },
      { id: 'r6', user: 'Aditi', rating: 3, text: 'Gears were a little stiff but got the job done.', date: '1 month ago' }
    ]
  },
  {
    id: 10,
    title: 'Firefox Mountain Bike',
    description: 'Great mountain bike. Leaving campus next week so selling it cheap. Needs a slight brake alignment.',
    price: 2500,
    originalPrice: 9000,
    images: [
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 30,
    category: 'Bikes & Cycles',
    location: 'Main Gate',
    seller: { id: 'user_10', name: 'Ajay M.', avatar: 'https://i.pravatar.cc/150?img=21', rating: 4.4, verified: true, trustScore: 88 },
    type: 'sell',
    reviews: []
  },
  {
    id: 11,
    title: 'Party JBL Bluetooth Speaker',
    description: 'Renting out my high-quality speaker for college fests and room parties. Has amazing bass and party lights.',
    price: 300,
    originalPrice: null,
    images: [
      '/fest_speaker.png'
    ],
    condition: 'Good',
    ageInMonths: 12,
    category: 'Occasional',
    location: 'Hostel Block C',
    seller: { id: 'user_11', name: 'Ravi S.', avatar: 'https://i.pravatar.cc/150?img=33', rating: 4.8, verified: true, trustScore: 94 },
    type: 'rent',
    reviews: [
      { id: 'r7', user: 'Sunil', rating: 5, text: 'Amazing sound quality, made our party!', date: '2 weeks ago' }
    ]
  },
  {
    id: 12,
    title: 'Designer Pink Lehenga',
    description: 'Beautiful elegant pink lehenga perfect for farewell or ethnic day. Worn only once. Renting it out for 2 days maximum.',
    price: 800,
    originalPrice: 5000,
    images: [
      '/pink_lehenga.png'
    ],
    condition: 'Good',
    ageInMonths: 6,
    category: 'Girls Fashion',
    location: 'Girls Hostel A',
    seller: { id: 'user_12', name: 'Shreya M.', avatar: 'https://i.pravatar.cc/150?img=42', rating: 4.9, verified: true, trustScore: 99 },
    type: 'rent',
    reviews: [
      { id: 'r8', user: 'Tanya', rating: 5, text: 'Looked gorgeous! Fitting was perfect.', date: '1 month ago' }
    ]
  },
  {
    id: 13,
    title: 'Silver Sparkly Party Heels (Size 38)',
    description: 'Elegant stiletto party heels, silver and sparkly. Selling these as they are a bit tight for me.',
    price: 600,
    originalPrice: 2000,
    images: [
      '/party_heels.png'
    ],
    condition: 'Used',
    ageInMonths: 2,
    category: 'Girls Fashion',
    location: 'Girls Hostel B',
    seller: { id: 'user_13', name: 'Ankita P.', avatar: 'https://i.pravatar.cc/150?img=45', rating: 4.5, verified: true, trustScore: 90 },
    type: 'sell',
    reviews: []
  },
  {
    id: 14,
    title: 'Sony WH-1000XM4 Noise Cancelling Headphones',
    description: 'Perfect for focusing during exams. Renting them out for the weekend.',
    price: 150,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 14,
    category: 'Electronics',
    location: 'Hostel Block A',
    seller: { id: 'user_14', name: 'Kabir R.', avatar: 'https://i.pravatar.cc/150?img=50', rating: 4.9, verified: true, trustScore: 98 },
    type: 'rent',
    reviews: []
  },
  {
    id: 15,
    title: 'Apple 20W USB-C Power Adapter',
    description: 'Spare charger, works perfectly. Renting it out for those who lost theirs and need one urgently.',
    price: 30,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 10,
    category: 'Electronics',
    location: 'Main Library',
    seller: { id: 'user_15', name: 'Simran K.', avatar: 'https://i.pravatar.cc/150?img=51', rating: 4.6, verified: true, trustScore: 91 },
    type: 'rent',
    reviews: []
  },
  {
    id: 16,
    title: 'Formal White T-Shirt / Shirt',
    description: 'Crisp white shirt required for formal presentations and viva. Renting out for single day use.',
    price: 50,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 5,
    category: 'Occasional',
    forFirstYear: true,
    location: 'Hostel Block C',
    seller: { id: 'user_16', name: 'Aarav M.', avatar: 'https://i.pravatar.cc/150?img=52', rating: 4.7, verified: true, trustScore: 95 },
    type: 'rent',
    reviews: []
  },
  {
    id: 17,
    title: 'Formal Black Shoes (Size 9)',
    description: 'Black formal shoes for placements and formal events. Cleaned and polished. Renting per day.',
    price: 80,
    originalPrice: null,
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 8,
    category: 'Occasional',
    location: 'Hostel Block B',
    seller: { id: 'user_17', name: 'Dev P.', avatar: 'https://i.pravatar.cc/150?img=53', rating: 4.4, verified: true, trustScore: 89 },
    type: 'rent',
    reviews: []
  }
];
