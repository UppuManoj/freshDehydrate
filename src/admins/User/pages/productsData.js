import dehydrated from '../../../assets/logo/dehydrated.jpg';
import bananaChips from '../../../assets/products/banana-chips.jpeg';
import mixedVegetables from '../../../assets/products/mixed vegetables.jpeg';
import bananaPowder from '../../../assets/products/banana powder.jpg';
import lemonSlices from '../../../assets/products/lemon slices.jpg';
import lemonSlices2 from '../../../assets/products/lemon-Slices(2).jpg';
import lemonSlices3 from '../../../assets/products/Lemon-Slices(3).jpeg';
import mangoSlices from '../../../assets/products/Mango-slices.jpeg';

const productsData = [
    {
        id: 11,
        name: 'Lemon Slices',
        image: lemonSlices,
        images: [
            lemonSlices,
            lemonSlices2,
            lemonSlices3
               ],
        price: 189.00,
        originalPrice: 259.00,
        rating: 4.8,
        category: 'Fruits',
        description: 'Premium quality dehydrated lemon slices, perfect for teas, cocktails, and culinary uses. Rich in vitamin C and adds a refreshing citrus flavor to your dishes.'
    },
    // {
    //     id: 1,
    //     name: 'Antioxidant Berry Mix',
    //     image: mixedFruits,
    //     price: 189.00,
    //     originalPrice: 259.00,
    //     rating: 4.8,
    //     category: 'Fruits',
    //     description: 'A powerful blend of dehydrated blueberries, cranberries, and goji berries.'
    // },
    {
        id: 2,
        name: 'Crispy Kale Chips',
        image: dehydrated,
        price: 109.00,
        originalPrice: 159.00,
        rating: 4.4,
        category: 'Vegetables',
        description: 'Lightly seasoned kale chips, a perfect guilt-free snack.'
    },
    {
        id: 3,
        name: 'Crunchy Banana Chips',
        image: bananaChips,
        price: 99.00,
        originalPrice: 119.00,
        rating: 4.6,
        category: 'Fruits',
        description: 'Naturally sweet banana chips that make the perfect healthy snack for any time.'
    },
    {
        id: 4,
        name: 'Garden Vegetable Mix',
        image: mixedVegetables,
        price: 129.00,
        originalPrice: 159.00,
        rating: 4.9,
        category: 'Vegetables',
        description: 'A colorful blend of bell peppers, carrots, and tomatoes packed with nutrients.'
    },
    {
        id: 5,
        name: 'Tropical Fruit Medley',
        image: mangoSlices,
        price: 199.00,
        originalPrice: 259.00,
        rating: 4.7,
        category: 'Fruits',
        description: 'A delicious mix of dehydrated mango, pineapple, and papaya.'
    },
    {
        id: 6,
        name: 'Banana Powder',
        image: bananaPowder,
        price: 109.00,
        originalPrice: 159.00,
        rating: 4.4,
        category: 'Powder',
        description: 'Lightly seasoned banana powder, a perfect guilt-free snack.'
    }
];

export default productsData;
