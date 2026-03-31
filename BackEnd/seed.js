const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Service = require('./models/Service');
const User = require('./models/User');

dotenv.config();

// Sample services data
const sampleServices = [
  {
    title: "🔧 Professional Plumbing Services",
    description: "Expert plumber for all your household plumbing needs. 24/7 emergency service available with quick response time.",
    location: "Downtown, City Center",
    phone: "+1 234 567 8900",
    category: "plumbing",
    rating: 4.8,
    price: "$50-80/hr",
    priceMin: 50,
    priceMax: 80,
    isAvailable: true
  },
  {
    title: "⚡ Electrical Repairs & Installation",
    description: "Licensed electrician for repairs, installations, and maintenance. Fast and reliable service with warranty.",
    location: "Westside, Main Street",
    phone: "+1 234 567 8901",
    category: "electrical",
    rating: 4.9,
    price: "$60-90/hr",
    priceMin: 60,
    priceMax: 90,
    isAvailable: true
  },
  {
    title: "🧹 Home Cleaning Services",
    description: "Professional home cleaning with eco-friendly products. Weekly, bi-weekly, or monthly plans available.",
    location: "North District",
    phone: "+1 234 567 8902",
    category: "cleaning",
    rating: 4.7,
    price: "$40-60/hr",
    priceMin: 40,
    priceMax: 60,
    isAvailable: true
  },
  {
    title: "❄️ AC Repair & Maintenance",
    description: "Expert HVAC services for all AC brands. Free inspection and competitive pricing with 24/7 support.",
    location: "Southside",
    phone: "+1 234 567 8903",
    category: "hvac",
    rating: 4.9,
    price: "$70-100/hr",
    priceMin: 70,
    priceMax: 100,
    isAvailable: true
  },
  {
    title: "🪚 Carpentry & Woodworking",
    description: "Custom furniture, repairs, and home renovation. Quality craftsmanship guaranteed with free estimates.",
    location: "East End",
    phone: "+1 234 567 8904",
    category: "carpentry",
    rating: 4.8,
    price: "$55-85/hr",
    priceMin: 55,
    priceMax: 85,
    isAvailable: true
  },
  {
    title: "🎨 Painting Services",
    description: "Interior and exterior painting. Free color consultation and competitive rates with premium paints.",
    location: "Central Business District",
    phone: "+1 234 567 8905",
    category: "painting",
    rating: 4.6,
    price: "$45-70/hr",
    priceMin: 45,
    priceMax: 70,
    isAvailable: true
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('Cleared existing services');

    // Get a default user ID (create one if doesn't exist)
    let user = await User.findOne();
    if (!user) {
      user = await User.create({
        name: "Admin User",
        email: "admin@localease.com",
        password: "admin123"
      });
      console.log('Created default admin user');
    }

    // Add provider ID to services
    const servicesWithProvider = sampleServices.map(service => ({
      ...service,
      provider: user._id
    }));

    // Insert sample services
    await Service.insertMany(servicesWithProvider);
    console.log(`✅ Added ${servicesWithProvider.length} sample services`);

    console.log('\n📊 Sample Services Added:');
    servicesWithProvider.forEach(service => {
      console.log(`   - ${service.title}`);
    });

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();