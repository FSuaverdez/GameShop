import bcrypt from 'bcryptjs'

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
      name: '[PC] Cyberpunk 2077',
      category: 'Action, RPG, Open World',
      image: '/images/product1.jpg',
      price: 59.99,
      countInStock: 0,
      brand: 'CD Projekt Red',
      rating: 3.5,
      numReview: 20,
      description:
        'Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality. You can customize your character’s cyberware, skillset and playstyle, and explore a vast city where the choices you make shape the story and the world around you.',
    },
    {
      name: "[PS4] Assassin's Creed Valhalla",
      category: 'Action, RPG, Open World',
      image: '/images/product2.jpg',
      price: 42.99,
      countInStock: 21,
      brand: 'Ubisoft',
      rating: 4.9,
      numReview: 15,
      description:
        'Become a legendary Viking on a quest for glory. Raid your enemies, grow your settlement, and build your political power.',
    },
    {
      name: '[PC] Hades',
      category: 'Action, RPG, Rogue-Lite',
      image: '/images/product3.jpg',
      price: 11.99,
      countInStock: 33,
      brand: 'Supergiant Games',
      rating: 4.7,
      numReview: 12,
      description:
        'Defy the god of the dead as you hack and slash your way out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion and Transistor.',
    },
    {
      name: '[PC] Back 4 Blood',
      category: 'Co-op, Multiplayer, FPS',
      image: '/images/product4.jpg',
      price: 59.99,
      countInStock: 22,
      brand: 'Turtle Rock Studios',
      rating: 4.2,
      numReview: 22,
      description:
        'Back 4 Blood is a thrilling cooperative first-person shooter with an intense 4 player co-op narrative campaign, competitive multiplayer as human or Ridden, and frenetic gameplay that keeps you in the action.',
    },
    {
      name: '[PC] Grand Theft Auto V: Premium Edition',
      category: 'Action, Adventure',
      image: '/images/product5.jpg',
      price: 25.99,
      countInStock: 16,
      brand: 'Rockstar Games',
      rating: 4.8,
      numReview: 52,
      description:
        'The Grand Theft Auto V: Premium Edition includes the complete GTAV story, Grand Theft Auto Online and all existing gameplay upgrades and content. You’ll also get the Criminal Enterprise Starter Pack, the fastest way to jumpstart your criminal empire in GTA Online.',
    },
    {
      name: "[PS5] Marvel's Spider-Man: Miles Morales",
      category: 'Action, Adventure',
      image: '/images/product6.jpg',
      price: 65.99,
      countInStock: 45,
      brand: 'Insomniac Games',
      rating: 4.5,
      numReview: 25,
      description:
        'In the latest adventure in the Marvel’s Spider-Man universe, teenager Miles Morales is adjusting to his new home while following in the footsteps of his mentor, Peter Parker, as a new Spider-Man. But when a fierce power struggle threatens to destroy his new home, the aspiring hero realizes that with great power, there must also come great responsibility. To save all of Marvel’s New York, Miles must take up the mantle of Spider-Man and own it.',
    },
  ],
}

export default data
