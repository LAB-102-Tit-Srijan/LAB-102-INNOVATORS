export const MOCK_LISTINGS = [
  {
    id: 1,
    title: 'Raspberry Pi 4 Model B (4GB)',
    description: 'Perfect for mini-projects and IoT. Comes with the official power supply and a protective case. Used only for one semester project.',
    price: 3500,
    originalPrice: 4500,
    images: [
      'https://images.unsplash.com/photo-1628859739433-289b531121d5?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1591115765373-5207764f72e7?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 6,
    category: 'Electronics',
    location: 'Hostel Block C',
    seller: { id: 'user_1', name: 'Rahul S.', avatar: 'https://i.pravatar.cc/150?img=11', rating: 4.8, verified: true, trustScore: 98 },
    type: 'sell',
    reviews: []
  },
  {
    id: 2,
    title: 'Arduino Uno R3 Starter Kit',
    description: 'Complete kit including breadboard, jumper wires, LEDs, resistors, and sensors. Great for hardware beginners!',
    price: 1200,
    originalPrice: 2000,
    images: [
      'https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'New',
    ageInMonths: 1,
    category: 'Electronics',
    location: 'Electronics Dept.',
    seller: { id: 'user_2', name: 'Priya M.', avatar: 'https://i.pravatar.cc/150?img=5', rating: 4.9, verified: true, trustScore: 95 },
    type: 'sell',
    reviews: []
  },
  {
    id: 3,
    title: 'Casio FX-991EX Scientific Calculator',
    description: 'Must-have for engineering mathematics. Fully functional, solar battery working perfectly.',
    price: 850,
    originalPrice: 1250,
    images: [
      'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 12,
    category: 'Stationery',
    forFirstYear: true,
    location: 'Main Library',
    seller: { id: 'user_3', name: 'Arjun K.', avatar: 'https://i.pravatar.cc/150?img=15', rating: 4.5, verified: true, trustScore: 88 },
    type: 'sell',
    reviews: []
  },
  {
    id: 4,
    title: 'Complete Engineering Drawing Kit',
    description: 'Includes A3 Drawing Board, Roller Scale, set squares, and compass. Perfect for 1st year ED practicals.',
    price: 600,
    originalPrice: 1100,
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
    title: 'Concepts of Physics (HC Verma Vol 1 & 2)',
    description: 'Essential physics books. Pages are clean, no highlighting.',
    price: 450,
    originalPrice: 850,
    images: [
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 18,
    category: 'Books & Notes',
    forFirstYear: true,
    location: 'Hostel Block B',
    seller: { id: 'user_5', name: 'Vikram D.', avatar: 'https://i.pravatar.cc/150?img=12', rating: 4.2, verified: true, trustScore: 85 },
    type: 'sell',
    reviews: []
  },
  {
    id: 6,
    title: 'Professional White Lab Coat (Size L)',
    description: 'Cotton blend lab coat, washed and ironed. Used for Chemistry lab.',
    price: 300,
    originalPrice: 550,
    images: [
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 6,
    category: 'Hostel Essentials',
    forFirstYear: true,
    location: 'Chemistry Lab',
    seller: { id: 'user_6', name: 'Neha G.', avatar: 'https://i.pravatar.cc/150?img=20', rating: 4.6, verified: true, trustScore: 92 },
    type: 'sell',
    reviews: []
  },
  {
    id: 7,
    title: 'Adjustable Aluminum Laptop Stand',
    description: 'Save your neck from pain! Ergonomic, foldable laptop stand. Available for rent.',
    price: 150,
    originalPrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1621259182978-fbf93132e53d?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 4,
    category: 'Accessories',
    location: 'Hostel Block C',
    seller: { id: 'user_7', name: 'Aditya P.', avatar: 'https://i.pravatar.cc/150?img=33', rating: 4.9, verified: true, trustScore: 97 },
    type: 'rent',
    reviews: []
  },
  {
    id: 8,
    title: '100-Piece Mechanical Tool Set',
    description: 'Wrench, spanners, screwdrivers, pliers. Great for Mechanical/Automobile project teams.',
    price: 300,
    originalPrice: 4000,
    images: [
      'https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 24,
    category: 'Tools',
    location: 'Mechanical Dept Workshop',
    seller: { id: 'user_8', name: 'Karan V.', avatar: 'https://i.pravatar.cc/150?img=59', rating: 4.4, verified: true, trustScore: 89 },
    type: 'rent',
    reviews: []
  },
  {
    id: 9,
    title: 'Ergonomic Hostel Chair',
    description: 'High-back mesh chair with lumbar support. Upgrading my room, so selling this.',
    price: 1200,
    originalPrice: 3500,
    images: [
      'https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 10,
    category: 'Hostel Essentials',
    location: 'Off-campus PG',
    seller: { id: 'user_9', name: 'Siddharth R.', avatar: 'https://i.pravatar.cc/150?img=60', rating: 4.7, verified: true, trustScore: 94 },
    type: 'sell',
    reviews: []
  },
  {
    id: 10,
    title: 'First Year CS Notes Bundle (Printed)',
    description: 'Complete printed notes for C Programming, Data Structures, and Discrete Math. Topper notes!',
    price: 200,
    originalPrice: 500,
    images: [
      'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 4,
    category: 'Books & Notes',
    forFirstYear: true,
    location: 'CS Dept Cafe',
    seller: { id: 'user_10', name: 'Anjali T.', avatar: 'https://i.pravatar.cc/150?img=47', rating: 5.0, verified: true, trustScore: 99 },
    type: 'sell',
    reviews: []
  },
  {
    id: 11,
    title: 'Mini Drafter for Engineering Drawing',
    description: 'Omega mini drafter in perfect condition. Includes the cover bag.',
    price: 350,
    originalPrice: 550,
    images: [
      'https://images.unsplash.com/photo-1622340579979-d102e3b97063?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 12,
    category: 'Stationery',
    forFirstYear: true,
    location: 'Hostel Block A',
    seller: { id: 'user_11', name: 'Rohit K.', avatar: 'https://i.pravatar.cc/150?img=13', rating: 4.1, verified: false, trustScore: 75 },
    type: 'sell',
    reviews: []
  },
  {
    id: 12,
    title: 'Digital Multimeter',
    description: 'Renting out my Fluke digital multimeter. Very accurate, good battery.',
    price: 50,
    originalPrice: 1500,
    images: [
      'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 8,
    category: 'Electronics',
    location: 'Electronics Lab',
    seller: { id: 'user_12', name: 'Pooja S.', avatar: 'https://i.pravatar.cc/150?img=32', rating: 4.8, verified: true, trustScore: 96 },
    type: 'rent',
    reviews: []
  },
  {
    id: 13,
    title: 'Fastrack College Backpack (30L)',
    description: 'Water-resistant, multiple compartments. Laptop sleeve fits up to 15.6 inch.',
    price: 800,
    originalPrice: 1800,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 15,
    category: 'Accessories',
    location: 'Main Gate',
    seller: { id: 'user_13', name: 'Manoj B.', avatar: 'https://i.pravatar.cc/150?img=18', rating: 4.3, verified: true, trustScore: 82 },
    type: 'sell',
    reviews: []
  },
  {
    id: 14,
    title: 'Mini Refrigerator 45L',
    description: 'Perfect for hostel rooms. Cools beverages and food efficiently. Low power consumption.',
    price: 600,
    originalPrice: 8500,
    images: [
      'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    ageInMonths: 36,
    category: 'Hostel Essentials',
    location: 'Hostel Block D',
    seller: { id: 'user_14', name: 'Tanvi M.', avatar: 'https://i.pravatar.cc/150?img=43', rating: 4.6, verified: true, trustScore: 90 },
    type: 'rent',
    reviews: []
  },
  {
    id: 15,
    title: 'Firefox Mountain Bicycle',
    description: 'Great for getting around campus. 21 gears, disc brakes. Renting on a monthly basis.',
    price: 400,
    originalPrice: 12000,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Used',
    ageInMonths: 24,
    category: 'Vehicles',
    location: 'Campus Cycle Stand',
    seller: { id: 'user_15', name: 'Ravi T.', avatar: 'https://i.pravatar.cc/150?img=52', rating: 4.9, verified: true, trustScore: 99 },
    type: 'rent',
    reviews: []
  }
];

// Helper to get trending products
export const getTrendingProducts = () => MOCK_LISTINGS.slice(0, 4);

// Helper to get products for first-year students
export const getFirstYearEssentials = () => MOCK_LISTINGS.filter(item => item.forFirstYear).slice(0, 4);

// Current User Profile Mock
export const CURRENT_USER = {
  id: 'user_123',
  name: 'Alex Johnson',
  email: 'alex.j@college.edu',
  branch: 'Computer Science',
  year: '2nd Year',
  avatar: 'https://i.pravatar.cc/150?img=33',
  trustScore: 92,
  verified: true,
  joinDate: 'Aug 2023'
};
