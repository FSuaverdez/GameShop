import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Frannz',
      email: 'admin@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: true,
    },
    {
      //customer
      name: 'John',
      email: 'user@example.com',
      password: bcrypt.hashSync('1234', 8),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Noob Tshirt',
      category: 'Shirts',
      image: '/images/product1.jpg',
      price: 30,
      countInStock: 0,
      brand: 'Nike',
      rating: 2.5,
      numReview: 10,
      description: 'High Quality Shirt',
    },
    {
      name: 'Orange Tshirt',
      category: 'Shirts',
      image: '/images/product2.jpg',
      price: 32,
      countInStock: 21,
      brand: 'Kahel',
      rating: 4.5,
      numReview: 15,
      description: 'High Quality Shirt',
    },
    {
      name: 'Camo Tshirt',
      category: 'Shirts',
      image: '/images/product3.jpg',
      price: 40,
      countInStock: 14,
      brand: 'Camo',
      rating: 4,
      numReview: 12,
      description: 'High Quality Shirt',
    },
    {
      name: 'V Long Sleeve Shirt',
      category: 'Shirts',
      image: '/images/product4.jpg',
      price: 55,
      countInStock: 12,
      brand: 'V',
      rating: 2,
      numReview: 12,
      description: 'High Quality Shirt',
    },
    {
      name: 'Red Long Sleeve Shirt',
      category: 'Shirts',
      image: '/images/product5.jpg',
      price: 50,
      countInStock: 16,
      brand: 'V',
      rating: 4.5,
      numReview: 12,
      description: 'High Quality Shirt',
    },
    {
      name: 'Nat Geo Tshirt',
      category: 'Shirts',
      image: '/images/product6.jpg',
      price: 30,
      countInStock: 17,
      brand: 'NatGeo',
      rating: 4.5,
      numReview: 25,
      description: 'High Quality Shirt',
    },
  ],
};

export default data;
