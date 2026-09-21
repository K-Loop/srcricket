import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { products as defaultProducts, categories as defaultCategories } from '../data/products';

const ProductContext = createContext(null);

const STORAGE_KEY_PRODUCTS = 'sr_products_catalog';
const STORAGE_KEY_ORDERS = 'sr_orders_list';
const STORAGE_KEY_CUSTOM_BATS = 'sr_custom_bat_requests';
const STORAGE_KEY_SETTINGS = 'sr_store_settings';

const INITIAL_SAMPLE_ORDERS = [
  {
    orderId: 'SR-98421034',
    date: new Date(Date.now() - 3600000 * 4).toISOString(),
    customer: {
      name: 'Rohit Sharma',
      email: 'rohit.cricketer@gmail.com',
      phone: '+91 98201 44521',
      address: 'B-402, Sea Crest Towers, Worli',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
    },
    items: [
      {
        id: 'bat-001',
        name: 'SR Power Series — English Willow Bat',
        price: 8999,
        qty: 1,
        image: '/images/featured-bat.jpg',
      },
      {
        id: 'gloves-001',
        name: 'SR Pro Batting Gloves',
        price: 2499,
        qty: 1,
        image: '/images/gloves.svg',
      },
    ],
    total: 11498,
    paymentMethod: 'UPI (PhonePe)',
    paymentStatus: 'Paid',
    status: 'In Factory Production',
    trackingNotes: 'Willow cleft selected & pressed. Undergoing master handle binding.',
  },
  {
    orderId: 'SR-98399120',
    date: new Date(Date.now() - 3600000 * 26).toISOString(),
    customer: {
      name: 'Aditya Verma',
      email: 'aditya.v@outlook.com',
      phone: '+91 94140 88231',
      address: 'Flat 12, Golf View Apartments, Sector 43',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
    },
    items: [
      {
        id: 'kit-001',
        name: 'SR All-In-One Pro Cricket Kit',
        price: 19999,
        qty: 1,
        image: '/images/kit.jpg',
      },
    ],
    total: 19999,
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid',
    status: 'Dispatched',
    trackingNotes: 'Dispatched via BlueDart Express (Air AWB #88492019).',
  },
  {
    orderId: 'SR-98276412',
    date: new Date(Date.now() - 3600000 * 72).toISOString(),
    customer: {
      name: 'Karan Patel',
      email: 'karan.patel.cricket@yahoo.com',
      phone: '+91 99099 12345',
      address: '24, Royal Enclave, Satellite Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      pincode: '380015',
    },
    items: [
      {
        id: 'bat-003',
        name: 'SR Century Edition Bat',
        price: 12999,
        qty: 1,
        image: '/images/featured-bat.jpg',
      },
      {
        id: 'pads-001',
        name: 'SR Classic Pro Batting Pads',
        price: 3299,
        qty: 1,
        image: '/images/pads.jpg',
      },
      {
        id: 'helmet-001',
        name: 'SR Titanium Pro Cricket Helmet',
        price: 3799,
        qty: 1,
        image: '/images/helmet.svg',
      },
    ],
    total: 20097,
    paymentMethod: 'Net Banking (HDFC)',
    paymentStatus: 'Paid',
    status: 'Delivered',
    trackingNotes: 'Delivered and player verified ping quality.',
  },
];

const INITIAL_CUSTOM_BATS = [
  {
    id: 'cb-101',
    customerName: 'Vikramaditya Rao',
    contact: '+91 98450 77123 | v.rao@clubcricket.in',
    playerRole: 'Top Order Batsman (Aggressive)',
    willowType: 'Grade 1+ English Willow (Narrow Grain)',
    weightRequirement: '2.85 lbs (Balanced Pick-up)',
    sweetSpot: 'Mid-to-Low for punchy drives',
    handle: 'Round 12-Piece Sarawak Cane Handle',
    edgeThickness: '41mm power edges',
    customEngraving: 'V. RAO #18',
    specialNotes: 'Duckbill toe profile for feather-light pickup balance.',
    stage: 'pressed', // 'selected' | 'pressed' | 'shaped' | 'handled' | 'tested' | 'dispatched'
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'cb-102',
    customerName: 'Samir Joshi',
    contact: '+91 97230 45678 | samir@punecricket.org',
    playerRole: 'Middle Order Finisher',
    willowType: 'Grade 1 English Willow',
    weightRequirement: '2.95 lbs (Heavy Power Blade)',
    sweetSpot: 'Low Sweet Spot for hard hitting',
    handle: 'Oval Handle (Extra Rubber Insert)',
    edgeThickness: '43mm Monster Edges',
    customEngraving: 'SJ-BOMBER',
    specialNotes: 'Full back profile with minimal concaving.',
    stage: 'shaped',
    date: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'cb-103',
    customerName: 'Devansh Kulkarni',
    contact: '+91 98221 00987',
    playerRole: 'All-Rounder',
    willowType: 'Grade A Kashmir Willow',
    weightRequirement: '2.80 lbs',
    sweetSpot: 'Mid Blade',
    handle: 'Standard Cane',
    edgeThickness: '38mm',
    customEngraving: 'DEVA 07',
    specialNotes: 'Need durable toe guard pre-installed.',
    stage: 'tested',
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
];

const INITIAL_SETTINGS = {
  storeName: 'SR Sports Cricket',
  tagline: 'Direct Workshop Bat Manufacturing & Pro Gear',
  announcementText: '🏏 Factory Direct Dispatch: Free Knocking-in & Oiling on all English Willow Bats!',
  announcementActive: true,
  contactPhone: '+91 98765 43210',
  whatsappNumber: '919876543210',
  factoryAddress: 'SR Sports Manufacturing Unit, Industrial Area Phase II, Meerut / Jalandhar Highway, India',
  currency: 'INR',
  lowStockThreshold: 5,
};

export function ProductProvider({ children }) {
  // Products Catalog
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load products from localStorage', e);
    }
    return defaultProducts;
  });

  // Orders
  const [orders, setOrders] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_ORDERS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load orders from localStorage', e);
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  // Custom Bats
  const [customBats, setCustomBats] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_CUSTOM_BATS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load custom bats from localStorage', e);
    }
    return INITIAL_CUSTOM_BATS;
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.error('Failed to load settings from localStorage', e);
    }
    return INITIAL_SETTINGS;
  });

  // Save to localStorage on state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_CUSTOM_BATS, JSON.stringify(customBats));
  }, [customBats]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Product CRUD
  const addProduct = (newProduct) => {
    const id = newProduct.id || `sr-${Date.now().toString(36)}`;
    const productToAdd = {
      ...newProduct,
      id,
      rating: newProduct.rating || 4.8,
      reviewCount: newProduct.reviewCount || 1,
      images: newProduct.images?.length ? newProduct.images : [newProduct.image || '/images/featured-bat.jpg'],
      specifications: newProduct.specifications || {},
    };
    setProducts((prev) => [productToAdd, ...prev]);
    return productToAdd;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleStock = (id, stockValue) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: typeof stockValue === 'number' ? stockValue : (p.stock > 0 ? 0 : 25) } : p))
    );
  };

  const resetProducts = () => {
    setProducts(defaultProducts);
    localStorage.removeItem(STORAGE_KEY_PRODUCTS);
  };

  // Orders CRUD
  const addOrder = (orderData) => {
    const newOrder = {
      orderId: orderData.orderId || `SR-${Date.now().toString().slice(-8)}`,
      date: new Date().toISOString(),
      status: 'Confirmed',
      paymentStatus: 'Paid',
      trackingNotes: 'Order received at SR Sports factory. Pre-dispatch inspection queued.',
      ...orderData,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus, newNotes) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.orderId === orderId
          ? {
              ...o,
              status: newStatus,
              trackingNotes: newNotes !== undefined ? newNotes : o.trackingNotes,
            }
          : o
      )
    );
  };

  const deleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
  };

  // Custom Bat Pipeline
  const addCustomBatRequest = (request) => {
    const newRequest = {
      id: `cb-${Date.now().toString().slice(-6)}`,
      date: new Date().toISOString(),
      stage: 'selected',
      ...request,
    };
    setCustomBats((prev) => [newRequest, ...prev]);
    return newRequest;
  };

  const updateCustomBatStage = (id, stage) => {
    setCustomBats((prev) =>
      prev.map((cb) => (cb.id === id ? { ...cb, stage } : cb))
    );
  };

  const deleteCustomBat = (id) => {
    setCustomBats((prev) => prev.filter((cb) => cb.id !== id));
  };

  // Store Settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Query Getters
  const getProductById = (id) => {
    return products.find((p) => p.id === id);
  };

  const getProductsByCategory = (category) => {
    if (!category || category.toLowerCase() === 'all') return products;
    return products.filter((p) => p.category.toLowerCase() === category.toLowerCase());
  };

  const getRelatedProducts = (product, count = 4) => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, count);
  };

  const bestsellers = useMemo(() => {
    const explicitlyTagged = products.filter((p) => p.badge === 'BESTSELLER');
    if (explicitlyTagged.length >= 4) return explicitlyTagged;
    return products.slice(0, 8);
  }, [products]);

  const value = {
    products,
    categories: defaultCategories,
    orders,
    customBats,
    settings,
    addProduct,
    updateProduct,
    deleteProduct,
    toggleStock,
    resetProducts,
    addOrder,
    updateOrderStatus,
    deleteOrder,
    addCustomBatRequest,
    updateCustomBatStage,
    deleteCustomBat,
    updateSettings,
    getProductById,
    getProductsByCategory,
    getRelatedProducts,
    bestsellers,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
}

export function useProducts() {
  const ctx = useContext(ProductContext);
  if (!ctx) {
    throw new Error('useProducts must be used inside a ProductProvider');
  }
  return ctx;
}
