export const HERO_CONTENT = {
  food: {
    label: 'Food',
    image: '/assets/image/hero.jpg',
    title: ['Food, Grocery & Gift', 'Delivered at Your Door in Time'],
  },
  grocery: {
    label: 'Grocery',
    image: '/assets/image/hero-3.jpg',
    title: ['Fresh Groceries', 'Delivered Fast'],
  },
  gift: {
    label: 'Gift Shop',
    image: '/assets/image/hero-4.png',
    title: ['Thoughtful Gifts', 'For Every Moment'],
  },
  care: {
    label: 'Care',
    image: '/assets/image/hero-2.png',
    title: ['Care Services', 'When You Need Them'],
  },
} as const;

export type HeroKey = keyof typeof HERO_CONTENT;

export const TABS_CONTENT = {
  Onboarding: {
    image: '/assets/image/hero-3.jpg',
    list: [
      'Access to 150+ premium restaurants across Lagos',
      'Temperature-controlled delivery preserves food quality',
      'Real-time order tracking from kitchen to doorstep',
      'Dedicated concierge for special requests and reservations',
      'Priority delivery during peak hours for members',
      'Contactless delivery with premium presentation',
    ],
  },
  'How it Works': {
    image: '/assets/image/hero-2.png',
    list: [
      'A clean, impeccably maintained personal car (Sedan, SUV, or Hatchback)',
      'Valid driver’s license.',
      'A minimum age of 21 years A modern smartphone with reliable internet access.',
      'A demonstrable commitment to excellent communication and premium customer service.',
    ],
  },
  'How to Earn': {
    image: '/assets/image/hero-3.jpg',
    list: [
      'Sign up as a delivery partner with flexible hours',
      'Earn competitive rates with each delivery',
      'Get access to exclusive bonuses and incentives',
      'Join a community of dedicated fulfillment partners',
    ],
  },
} as const;

export type TabKey = keyof typeof TABS_CONTENT;

export const FAQs = [
  {
    question: 'What is C-ride?',
    answer:
      'C-ride is a food delivery platform that connects you with local restaurants and home chefs, making it easy to order everyday meals, home-cooked dishes, and popular fast foods delivered straight to your doorstep.',
  },
  {
    question: 'Do I need to download an app?',
    answer:
      'No, you don’t need to download an app. You can place orders directly through the C-ride website using any device with an internet connection.',
  },
  {
    question: 'How do I place an order?',
    answer:
      'Simply browse available restaurants or home chefs, select your meals, add them to your cart, and proceed to checkout. Once your order is confirmed, it will be prepared and delivered to you.',
  },
  {
    question: 'How do I pay for my order?',
    answer:
      'C-ride supports secure online payments, including debit cards, credit cards, and other available digital payment options. Payment methods may vary by location.',
  },
  {
    question: 'What areas does C-ride serve?',
    answer:
      'C-ride currently serves selected locations and is continuously expanding. Availability depends on your area and nearby restaurants or home chefs.',
  },
  {
    question: 'How fast is delivery?',
    answer:
      'Delivery times depend on your location, the chef or restaurant, and order volume, but most orders are delivered within 30–60 minutes.',
  },
  {
    question: 'Can I order from multiple chefs/restaurants at once?',
    answer:
      'At the moment, orders can only be placed from one chef or restaurant at a time to ensure faster and more accurate delivery.',
  },
  {
    question: 'What is the main goal of C-ride?',
    answer:
      'The main goal of C-ride is to make quality food easily accessible while supporting local restaurants and home chefs by connecting them directly with customers.',
  },
];
