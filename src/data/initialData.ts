import { Medicine, Cosmetic, Supplier, Customer, Sale, User, SystemSettings, AuditLog, Order, Brand, EmployeeShiftAssignment } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'u-1',
    name: 'Dr. Rimsha Tariq (Lead Administrator)',
    email: 'superadmin@pharmaglow.com',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1594824813511-3837e23118ef?w=150&auto=format&fit=crop&q=80',
    phone: '+92 300 1234567'
  },
  {
    id: 'u-2',
    name: 'Zainab Ahmed (Admin)',
    email: 'admin@pharmaglow.com',
    role: 'ADMIN',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-3',
    name: 'Hamza Malik, Pharm.D',
    email: 'pharmacist@pharmaglow.com',
    role: 'PHARMACIST',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-4',
    name: 'Bilal Khan (Warehouse)',
    email: 'inventory@pharmaglow.com',
    role: 'INVENTORY_MANAGER',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-5',
    name: 'Ayesha Noor (POS Cashier)',
    email: 'cashier@pharmaglow.com',
    role: 'CASHIER',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'u-6',
    name: 'Saad Farooq (Support Staff)',
    email: 'staff@pharmaglow.com',
    role: 'STAFF',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'sup-1',
    name: 'GSK Healthcare Distribution',
    contactPerson: 'Tariq Mehmood',
    email: 'orders@gsk-dist.com',
    phone: '+92 21 34567890',
    address: 'Plot 45, Korangi Industrial Area, Karachi',
    balanceDue: 45000,
    rating: 4.9
  },
  {
    id: 'sup-2',
    name: 'Pfizer & BioPharma Logistics',
    contactPerson: 'Farhan Sheikh',
    email: 'supply@pfizerpk.com',
    phone: '+92 51 2289012',
    address: 'I-9 Industrial Zone, Islamabad',
    balanceDue: 28000,
    rating: 4.8
  },
  {
    id: 'sup-3',
    name: "L'Oréal Luxe & Beauty Direct",
    contactPerson: 'Maria Siddiqui',
    email: 'loreal.supply@beautycorp.com',
    phone: '+92 42 35789012',
    address: 'Gulberg III, Main Boulevard, Lahore',
    balanceDue: 15400,
    rating: 5.0
  },
  {
    id: 'sup-4',
    name: 'Abbott Laboratories Ltd',
    contactPerson: 'Kamran Ali',
    email: 'dist@abbottpharma.com',
    phone: '+92 21 35061234',
    address: 'Landhi Industrial Estate, Karachi',
    balanceDue: 0,
    rating: 4.7
  },
  {
    id: 'sup-5',
    name: 'CeraVe & Dermatics Alliance',
    contactPerson: 'Sana Rehman',
    email: 'dermasupply@ceravecare.com',
    phone: '+92 42 37123456',
    address: 'DHA Phase 5, Commercial Area, Lahore',
    balanceDue: 8900,
    rating: 4.9
  }
];

// Helper to generate dynamic dates based on current date
const now = new Date();
const formatDate = (d: Date) => d.toISOString().split('T')[0];

const addDays = (days: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() + days);
  return formatDate(d);
};

export const INITIAL_MEDICINES: Medicine[] = [
  {
    id: 'med-1',
    name: 'Augmentin 625mg',
    genericName: 'Amoxicillin + Clavulanic Acid',
    brand: 'GSK',
    category: 'Antibiotics',
    strength: '625mg',
    dosageForm: 'Tablet',
    barcode: '896400010101',
    sku: 'MED-AUG-625',
    batchNumber: 'AUG-24B01',
    supplierId: 'sup-1',
    supplierName: 'GSK Healthcare Distribution',
    purchasePrice: 420,
    sellingPrice: 560,
    quantity: 85,
    reorderLevel: 25,
    mfgDate: addDays(-180),
    expiryDate: addDays(420), // Healthy: ~14 months
    storageCondition: 'Room Temperature (15-25°C)',
    prescriptionRequired: true,
    isQuarantined: false,
    notes: 'Keep in blister pack until consumed.'
  },
  {
    id: 'med-2',
    name: 'Panadol Extra 500mg/65mg',
    genericName: 'Paracetamol + Caffeine',
    brand: 'GSK',
    category: 'Analgesics',
    strength: '500mg/65mg',
    dosageForm: 'Tablet',
    barcode: '896400010102',
    sku: 'MED-PAN-EXT',
    batchNumber: 'PAN-24E09',
    supplierId: 'sup-1',
    supplierName: 'GSK Healthcare Distribution',
    purchasePrice: 15,
    sellingPrice: 25,
    quantity: 420,
    reorderLevel: 100,
    mfgDate: addDays(-120),
    expiryDate: addDays(580), // Healthy
    storageCondition: 'Room Temperature (15-25°C)',
    prescriptionRequired: false,
    isQuarantined: false,
    notes: 'Fast relief from headache and body pain.'
  },
  {
    id: 'med-3',
    name: 'Ventolin Inhaler 100mcg',
    genericName: 'Salbutamol',
    brand: 'GSK',
    category: 'Respiratory',
    strength: '100mcg / 200 doses',
    dosageForm: 'Inhaler',
    barcode: '896400010103',
    sku: 'MED-VEN-INH',
    batchNumber: 'VEN-23X12',
    supplierId: 'sup-1',
    supplierName: 'GSK Healthcare Distribution',
    purchasePrice: 380,
    sellingPrice: 510,
    quantity: 12, // LOW STOCK alert
    reorderLevel: 20,
    mfgDate: addDays(-340),
    expiryDate: addDays(18), // CRITICAL: Expirying in 18 days!
    storageCondition: 'Protect from Light',
    prescriptionRequired: true,
    isQuarantined: false,
    notes: 'Bronchodilator for asthma relief.'
  },
  {
    id: 'med-4',
    name: 'Lipitor 20mg',
    genericName: 'Atorvastatin Calcium',
    brand: 'Pfizer',
    category: 'Cardiovascular',
    strength: '20mg',
    dosageForm: 'Tablet',
    barcode: '896400010104',
    sku: 'MED-LIP-20M',
    batchNumber: 'LIP-24A04',
    supplierId: 'sup-2',
    supplierName: 'Pfizer & BioPharma Logistics',
    purchasePrice: 850,
    sellingPrice: 1100,
    quantity: 40,
    reorderLevel: 15,
    mfgDate: addDays(-200),
    expiryDate: addDays(310),
    storageCondition: 'Room Temperature (15-25°C)',
    prescriptionRequired: true,
    isQuarantined: false,
    notes: 'Cholesterol lowering medication.'
  },
  {
    id: 'med-5',
    name: 'Losec Mups 20mg',
    genericName: 'Omeprazole Magnesium',
    brand: 'AstraZeneca',
    category: 'Gastrointestinal',
    strength: '20mg',
    dosageForm: 'Capsule',
    barcode: '896400010105',
    sku: 'MED-LOS-20M',
    batchNumber: 'LOS-23Z88',
    supplierId: 'sup-4',
    supplierName: 'Abbott Laboratories Ltd',
    purchasePrice: 280,
    sellingPrice: 380,
    quantity: 8, // Low Stock & Near Expiry
    reorderLevel: 15,
    mfgDate: addDays(-360),
    expiryDate: addDays(45), // Warning: 45 days remaining
    storageCondition: 'Cool & Dry Place',
    prescriptionRequired: false,
    isQuarantined: false,
    notes: 'Proton pump inhibitor for acid reflux.'
  },
  {
    id: 'med-6',
    name: 'Brufen DS Suspension 200mg/5ml',
    genericName: 'Ibuprofen',
    brand: 'Abbott',
    category: 'Analgesics',
    strength: '200mg/5ml',
    dosageForm: 'Suspension',
    barcode: '896400010106',
    sku: 'MED-BRU-SUS',
    batchNumber: 'BRU-22M15',
    supplierId: 'sup-4',
    supplierName: 'Abbott Laboratories Ltd',
    purchasePrice: 120,
    sellingPrice: 175,
    quantity: 14,
    reorderLevel: 10,
    mfgDate: addDays(-500),
    expiryDate: addDays(-5), // EXPIRED! 5 days ago!
    storageCondition: 'Room Temperature (15-25°C)',
    prescriptionRequired: false,
    isQuarantined: true, // Marked Quarantined
    notes: 'EXPIRED BATCH: Quarantined to prevent accidental dispensing.'
  },
  {
    id: 'med-7',
    name: 'Lantus SoloStar Insulin',
    genericName: 'Insulin Glargine 100 U/ml',
    brand: 'Sanofi',
    category: 'Endocrinology',
    strength: '100 units/ml (3ml pen)',
    dosageForm: 'Injection',
    barcode: '896400010107',
    sku: 'MED-LAN-INS',
    batchNumber: 'LAN-24K09',
    supplierId: 'sup-2',
    supplierName: 'Pfizer & BioPharma Logistics',
    purchasePrice: 1600,
    sellingPrice: 2150,
    quantity: 35,
    reorderLevel: 10,
    mfgDate: addDays(-90),
    expiryDate: addDays(270),
    storageCondition: 'Cold Storage (2-8°C)',
    prescriptionRequired: true,
    isQuarantined: false,
    notes: 'Refrigerate immediately. Do not freeze.'
  },
  {
    id: 'med-8',
    name: 'Azomax 500mg',
    genericName: 'Azithromycin',
    brand: 'Getz Pharma',
    category: 'Antibiotics',
    strength: '500mg',
    dosageForm: 'Tablet',
    barcode: '896400010108',
    sku: 'MED-AZO-500',
    batchNumber: 'AZO-24F11',
    supplierId: 'sup-1',
    supplierName: 'GSK Healthcare Distribution',
    purchasePrice: 340,
    sellingPrice: 480,
    quantity: 60,
    reorderLevel: 20,
    mfgDate: addDays(-140),
    expiryDate: addDays(460),
    storageCondition: 'Room Temperature (15-25°C)',
    prescriptionRequired: true,
    isQuarantined: false,
    notes: 'Broad spectrum macrolide antibiotic.'
  }
];

export const INITIAL_COSMETICS: Cosmetic[] = [
  {
    id: 'cos-1',
    name: 'CeraVe Hydrating Facial Cleanser',
    brand: 'CeraVe',
    category: 'Skincare',
    size: '236ml (8 fl oz)',
    barcode: '333787559718',
    batchNumber: 'CRV-24B89',
    supplierId: 'sup-5',
    supplierName: 'CeraVe & Dermatics Alliance',
    purchasePrice: 2200,
    sellingPrice: 2950,
    quantity: 28,
    reorderLevel: 8,
    pao: '12M',
    expiryDate: addDays(650),
    discountPercent: 5,
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'cos-2',
    name: 'Maybelline Fit Me Matte + Poreless Foundation',
    brand: 'Maybelline New York',
    category: 'Makeup',
    shade: 'Classic Ivory #120',
    size: '30ml',
    barcode: '41554433418',
    batchNumber: 'MAY-24C44',
    supplierId: 'sup-3',
    supplierName: "L'Oréal Luxe & Beauty Direct",
    purchasePrice: 1400,
    sellingPrice: 1950,
    quantity: 19,
    reorderLevel: 6,
    pao: '12M',
    expiryDate: addDays(500),
    discountPercent: 10,
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'cos-3',
    name: 'The Ordinary Niacinamide 10% + Zinc 1%',
    brand: 'The Ordinary',
    category: 'Skincare',
    size: '30ml',
    barcode: '769915190602',
    batchNumber: 'ORD-24D12',
    supplierId: 'sup-5',
    supplierName: 'CeraVe & Dermatics Alliance',
    purchasePrice: 1750,
    sellingPrice: 2450,
    quantity: 42,
    reorderLevel: 10,
    pao: '6M',
    expiryDate: addDays(400),
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'cos-4',
    name: 'Dior Sauvage Eau de Parfum',
    brand: 'Christian Dior',
    category: 'Fragrances',
    size: '100ml',
    barcode: '334890136824',
    batchNumber: 'DIO-23S99',
    supplierId: 'sup-3',
    supplierName: "L'Oréal Luxe & Beauty Direct",
    purchasePrice: 28000,
    sellingPrice: 36500,
    quantity: 5, // Low stock
    reorderLevel: 4,
    pao: '36M',
    expiryDate: addDays(720),
    discountPercent: 0,
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'cos-5',
    name: 'MAC Retro Matte Lipstick',
    brand: 'MAC Cosmetics',
    category: 'Makeup',
    shade: 'Ruby Woo (Vivid Blue-Red)',
    size: '3g',
    barcode: '773602058457',
    batchNumber: 'MAC-24M01',
    supplierId: 'sup-3',
    supplierName: "L'Oréal Luxe & Beauty Direct",
    purchasePrice: 3200,
    sellingPrice: 4500,
    quantity: 15,
    reorderLevel: 5,
    pao: '24M',
    expiryDate: addDays(480),
    discountPercent: 5,
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'cos-6',
    name: "L'Oréal Elvive Hyaluron Plump Moisture Serum",
    brand: "L'Oréal Paris",
    category: 'Haircare',
    size: '150ml',
    barcode: '360052403120',
    batchNumber: 'LOR-23H88',
    supplierId: 'sup-3',
    supplierName: "L'Oréal Luxe & Beauty Direct",
    purchasePrice: 1100,
    sellingPrice: 1650,
    quantity: 3, // Low stock
    reorderLevel: 8,
    pao: '12M',
    expiryDate: addDays(25), // Critical near expiry: 25 days!
    isQuarantined: false,
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1',
    name: 'Dr. Shahbaz Chaudhry',
    phone: '+92 300 8472910',
    email: 'shahbaz@hospitalcare.org',
    totalVisits: 14,
    totalSpent: 48900,
    loyaltyPoints: 489,
    lastVisit: addDays(-2)
  },
  {
    id: 'cust-2',
    name: 'Fatima Zahra',
    phone: '+92 321 4455667',
    email: 'fatima.zahra@gmail.com',
    totalVisits: 9,
    totalSpent: 32400,
    loyaltyPoints: 324,
    lastVisit: addDays(-5)
  },
  {
    id: 'cust-3',
    name: 'Usman Ghani',
    phone: '+92 333 9988776',
    email: 'usman.ghani@yahoo.com',
    totalVisits: 4,
    totalSpent: 12200,
    loyaltyPoints: 122,
    lastVisit: addDays(-10)
  }
];

export const INITIAL_SALES: Sale[] = [
  {
    id: 'sale-101',
    invoiceNumber: 'PG-INV-2026-001',
    date: new Date(Date.now() - 3600000 * 3).toISOString(),
    cashierId: 'u-5',
    cashierName: 'Ayesha Noor',
    customerName: 'Dr. Shahbaz Chaudhry',
    customerPhone: '+92 300 8472910',
    items: [
      {
        itemId: 'med-1',
        itemName: 'Augmentin 625mg',
        itemType: 'MEDICINE',
        batchNumber: 'AUG-24B01',
        quantity: 2,
        unitPrice: 560,
        discount: 0,
        total: 1120
      },
      {
        itemId: 'med-2',
        itemName: 'Panadol Extra 500mg/65mg',
        itemType: 'MEDICINE',
        batchNumber: 'PAN-24E09',
        quantity: 3,
        unitPrice: 25,
        discount: 0,
        total: 75
      }
    ],
    subtotal: 1195,
    tax: 59.75,
    discount: 50,
    total: 1204.75,
    paymentMethod: 'CASH',
    doctorName: 'Dr. Asad Rauf, MBBS FCPS',
    prescriptionNumber: 'RX-99214'
  },
  {
    id: 'sale-102',
    invoiceNumber: 'PG-INV-2026-002',
    date: new Date(Date.now() - 3600000 * 6).toISOString(),
    cashierId: 'u-5',
    cashierName: 'Ayesha Noor',
    customerName: 'Fatima Zahra',
    customerPhone: '+92 321 4455667',
    items: [
      {
        itemId: 'cos-1',
        itemName: 'CeraVe Hydrating Facial Cleanser',
        itemType: 'COSMETIC',
        batchNumber: 'CRV-24B89',
        quantity: 1,
        unitPrice: 2950,
        discount: 147.5,
        total: 2802.5
      },
      {
        itemId: 'cos-3',
        itemName: 'The Ordinary Niacinamide 10% + Zinc 1%',
        itemType: 'COSMETIC',
        batchNumber: 'ORD-24D12',
        quantity: 1,
        unitPrice: 2450,
        discount: 0,
        total: 2450
      }
    ],
    subtotal: 5252.5,
    tax: 262.63,
    discount: 0,
    total: 5515.13,
    paymentMethod: 'CARD'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    userId: 'u-1',
    userName: 'Dr. Rimsha Tariq',
    role: 'SUPER_ADMIN',
    action: 'SYSTEM_INITIALIZATION',
    module: 'System',
    details: 'PharmaGlow Pharmacy & Cosmetics enterprise database initialized with FEFO and Expiry Radar.'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString(),
    userId: 'u-3',
    userName: 'Hamza Malik, Pharm.D',
    role: 'PHARMACIST',
    action: 'BATCH_QUARANTINE',
    module: 'Pharmacy',
    details: 'Quarantined expired batch BRU-22M15 (Brufen DS Suspension) to prohibit sales.'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
    userId: 'u-5',
    userName: 'Ayesha Noor',
    role: 'CASHIER',
    action: 'SALE_COMPLETED',
    module: 'POS',
    details: 'Generated Invoice PG-INV-2026-001 for customer Dr. Shahbaz Chaudhry with Rx verification.'
  }
];

export const INITIAL_SETTINGS: SystemSettings = {
  pharmacyName: 'PharmaGlow',
  tagline: 'Healthcare & Beauty Sanctuary',
  address: 'Suite 104, Blue Area, Jinnah Avenue, Islamabad',
  phone: '+92 51 2890451 / +92 300 1234567',
  email: 'support@pharmaglow.com',
  licenseNumber: 'DRAP-LIC-PK-2026-8819',
  currencySymbol: 'PKR',
  taxRatePercent: 5.0,
  expiryWarningDays: 60,
  geminiApiKey: 'AQ.Ab8RN6JJhEFP9N9x6WWdNOPT2K3MfNhhtv0AaSS8oiTpNYLBJg',
  autoFefoEnabled: true
};

// Initial Orders matching Screenshot 2 (List of Orders) and Screenshot 1 (Sales Report)
export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1',
    orderNumber: 'ORD-2024-001',
    date: '2024-10-17 15:32',
    clientName: 'Nur E Ebrahim',
    clientEmail: 'ebrahim@gmail.com',
    clientPhone: '+92 300 5544332',
    totalAmount: 500,
    isPaid: true,
    status: 'Delivered',
    paymentMethod: 'COD',
    items: [
      {
        id: 'item-1',
        productId: 'cos-avon-1',
        productName: 'Nur E Ebrahim - Variant 3',
        variant: 'Variant 3',
        brand: 'AVON',
        category: 'Body Care',
        unitPrice: 250,
        quantity: 2,
        total: 500
      }
    ],
    notes: 'Delivered via express courier.'
  },
  {
    id: 'ord-2',
    orderNumber: 'ORD-2024-002',
    date: '2024-10-17 15:26',
    clientName: 'Nur E Ebrahim',
    clientEmail: 'ebrahim@gmail.com',
    clientPhone: '+92 300 5544332',
    totalAmount: 1800,
    isPaid: true,
    status: 'Delivered',
    paymentMethod: 'ONLINE PAYMENT',
    items: [
      {
        id: 'item-2',
        productId: 'cos-avon-2',
        productName: 'Nur E Ebrahim - Variant 3',
        variant: 'Variant 3',
        brand: 'AVON',
        category: 'Body Care',
        unitPrice: 300,
        quantity: 4,
        total: 1200
      },
      {
        id: 'item-3',
        productId: 'cos-avon-3',
        productName: 'Nur E Ebrahim - Variant 1',
        variant: 'Variant 1',
        brand: 'AVON',
        category: 'Body Care',
        unitPrice: 200,
        quantity: 3,
        total: 600
      }
    ],
    notes: 'Paid via direct online payment gateway.'
  },
  {
    id: 'ord-3',
    orderNumber: 'ORD-2024-003',
    date: '2024-10-17 14:51',
    clientName: 'Nur E Ebrahim',
    clientEmail: 'ebrahim@gmail.com',
    clientPhone: '+92 300 5544332',
    totalAmount: 900,
    isPaid: false,
    status: 'Cancelled',
    paymentMethod: 'COD',
    items: [
      {
        id: 'item-4',
        productId: 'cos-avon-4',
        productName: 'Nur E Ebrahim - Variant 3',
        variant: 'Variant 3',
        brand: 'AVON',
        category: 'Body Care',
        unitPrice: 300,
        quantity: 3,
        total: 900
      }
    ],
    notes: 'Customer requested cancellation prior to dispatch.'
  },
  {
    id: 'ord-4',
    orderNumber: 'ORD-2024-004',
    date: '2024-10-18 11:20',
    clientName: 'Fatima Zahra',
    clientEmail: 'fatima.zahra@gmail.com',
    clientPhone: '+92 321 4455667',
    totalAmount: 3500,
    isPaid: true,
    status: 'Delivered',
    paymentMethod: 'CARD',
    items: [
      {
        id: 'item-5',
        productId: 'cos-1',
        productName: 'CeraVe Hydrating Facial Cleanser',
        variant: '473ml',
        brand: 'CeraVe',
        category: 'Skincare',
        unitPrice: 2950,
        quantity: 1,
        total: 2950
      }
    ],
    notes: 'Regular loyalty member.'
  },
  {
    id: 'ord-5',
    orderNumber: 'ORD-2024-005',
    date: '2024-10-19 09:45',
    clientName: 'Dr. Shahbaz Chaudhry',
    clientEmail: 'shahbaz@hospitalcare.org',
    clientPhone: '+92 300 8472910',
    totalAmount: 1120,
    isPaid: true,
    status: 'Pending',
    paymentMethod: 'CASH',
    items: [
      {
        id: 'item-6',
        productId: 'med-1',
        productName: 'Augmentin 625mg',
        variant: 'Pack of 14',
        brand: 'GSK',
        category: 'Antibiotics',
        unitPrice: 560,
        quantity: 2,
        total: 1120
      }
    ],
    notes: 'Prescription verified.'
  }
];

// Initial Brands matching Screenshot 4 (Both Cosmetics Brands and Medicine Companies)
export const INITIAL_BRANDS: Brand[] = [
  // Cosmetics Brands
  {
    id: 'b-cos-1',
    name: 'AVON',
    type: 'COSMETICS',
    category: 'Skincare & Fragrances',
    originCountry: 'United States',
    description: 'Global cosmetics and beauty brand renowned for skincare and fragrances.',
    logo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=100&auto=format&fit=crop&q=80',
    productsCount: 18,
    status: 'Active'
  },
  {
    id: 'b-cos-2',
    name: 'LUX',
    type: 'COSMETICS',
    category: 'Body Care & Bath',
    originCountry: 'United Kingdom',
    description: 'Iconic beauty bar and nourishing body wash formulations.',
    productsCount: 12,
    status: 'Active'
  },
  {
    id: 'b-cos-3',
    name: "L'Oréal",
    type: 'COSMETICS',
    category: 'Haircare & Makeup',
    originCountry: 'France',
    description: 'World-leading cosmetics luxury conglomerate and scientific beauty innovation.',
    productsCount: 35,
    status: 'Active'
  },
  {
    id: 'b-cos-4',
    name: 'Nivea',
    type: 'COSMETICS',
    category: 'Skincare & Creams',
    originCountry: 'Germany',
    description: 'Gentle dermatological body care, sun protection, and moisture creams.',
    productsCount: 22,
    status: 'Active'
  },
  {
    id: 'b-cos-5',
    name: 'Olay',
    type: 'COSMETICS',
    category: 'Anti-Aging & Serum',
    originCountry: 'United States',
    description: 'Science-backed anti-aging peptide and niacinamide moisturizers.',
    productsCount: 16,
    status: 'Active'
  },
  {
    id: 'b-cos-6',
    name: 'MAC Cosmetics',
    type: 'COSMETICS',
    category: 'Professional Makeup',
    originCountry: 'Canada',
    description: 'Stage-tested high pigment matte lipsticks, studio foundations, and powders.',
    productsCount: 28,
    status: 'Active'
  },
  {
    id: 'b-cos-7',
    name: 'Maybelline New York',
    type: 'COSMETICS',
    category: 'Eye & Lip Makeup',
    originCountry: 'United States',
    description: 'Trendsetting mascara, long-wear matte ink, and concealers.',
    productsCount: 20,
    status: 'Active'
  },
  {
    id: 'b-cos-8',
    name: 'CeraVe',
    type: 'COSMETICS',
    category: 'Dermatological Skincare',
    originCountry: 'United States',
    description: 'Essential ceramide hydration barrier repair developed with dermatologists.',
    productsCount: 14,
    status: 'Active'
  },

  // Medicine Companies / Pharma Manufacturers
  {
    id: 'b-med-1',
    name: 'GSK (GlaxoSmithKline)',
    type: 'MEDICINE',
    category: 'Pharmaceuticals & Vaccines',
    originCountry: 'United Kingdom',
    description: 'Major research-based biopharma producing Augmentin, Panadol, and Ventolin.',
    productsCount: 42,
    status: 'Active'
  },
  {
    id: 'b-med-2',
    name: 'Pfizer',
    type: 'MEDICINE',
    category: 'Cardiovascular & Oncology',
    originCountry: 'United States',
    description: 'Global biopharmaceutical innovator supplying Lipitor, Norvasc, and antibiotics.',
    productsCount: 30,
    status: 'Active'
  },
  {
    id: 'b-med-3',
    name: 'Abbott Laboratories',
    type: 'MEDICINE',
    category: 'Pediatric & Nutritional Pharma',
    originCountry: 'United States',
    description: 'Trusted healthcare company producing Brufen, Surbex, and Ensure clinical nutrition.',
    productsCount: 26,
    status: 'Active'
  },
  {
    id: 'b-med-4',
    name: 'Novartis',
    type: 'MEDICINE',
    category: 'Specialty Pharmaceuticals',
    originCountry: 'Switzerland',
    description: 'Leader in cardiovascular, ophthalmology, and immunology treatments.',
    productsCount: 19,
    status: 'Active'
  },
  {
    id: 'b-med-5',
    name: 'Sanofi',
    type: 'MEDICINE',
    category: 'Diabetes & Primary Care',
    originCountry: 'France',
    description: 'Healthcare solutions across diabetes, thrombosis, and pediatric vaccines.',
    productsCount: 24,
    status: 'Active'
  },
  {
    id: 'b-med-6',
    name: 'Getz Pharma',
    type: 'MEDICINE',
    category: 'Broad-Spectrum Therapeutics',
    originCountry: 'Pakistan',
    description: 'WHO-prequalified international pharmaceutical manufacturer.',
    productsCount: 38,
    status: 'Active'
  },
  {
    id: 'b-med-7',
    name: 'Searle Company Limited',
    type: 'MEDICINE',
    category: 'Therapeutics & Diagnostics',
    originCountry: 'Pakistan',
    description: 'Established national manufacturer with specialized therapeutic divisions.',
    productsCount: 22,
    status: 'Active'
  }
];

// Initial Employee Shift Schedule matching Screenshot 5 (Schedule of the week)
export const INITIAL_SCHEDULE_ASSIGNMENTS: EmployeeShiftAssignment[] = [
  {
    id: 'shift-1',
    weekNumber: 38,
    day: 'Monday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '12:00',
    employeeId: 'u-3',
    employeeName: 'Hamza Malik, Pharm.D',
    employeeRole: 'Pharmacist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Available - Trained',
    workstation: 'Dispensary Counter 1'
  },
  {
    id: 'shift-2',
    weekNumber: 38,
    day: 'Monday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '14:00',
    employeeId: 'u-5',
    employeeName: 'Ayesha Noor',
    employeeRole: 'Cashier',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Available - Trained',
    workstation: 'POS Front Desk'
  },
  {
    id: 'shift-3',
    weekNumber: 38,
    day: 'Tuesday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '12:00',
    employeeId: 'u-3',
    employeeName: 'Hamza Malik, Pharm.D',
    employeeRole: 'Pharmacist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Available - Trained',
    workstation: 'Dispensary Counter 1'
  },
  {
    id: 'shift-4',
    weekNumber: 38,
    day: 'Tuesday',
    shift: 'Evening',
    startTime: '14:00',
    endTime: '20:00',
    employeeId: 'u-4',
    employeeName: 'Bilal Khan',
    employeeRole: 'Inventory Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Senior Specialist',
    workstation: 'Stock & Receiving Bay'
  },
  {
    id: 'shift-5',
    weekNumber: 38,
    day: 'Wednesday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '12:00',
    employeeId: 'u-5',
    employeeName: 'Ayesha Noor',
    employeeRole: 'Cashier',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Available - Trained',
    workstation: 'POS Front Desk'
  },
  {
    id: 'shift-6',
    weekNumber: 38,
    day: 'Thursday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '16:00',
    employeeId: 'u-2',
    employeeName: 'Zainab Ahmed',
    employeeRole: 'Admin Supervisor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Senior Specialist',
    workstation: 'Floor Operations'
  },
  {
    id: 'shift-7',
    weekNumber: 38,
    day: 'Friday',
    shift: 'Evening',
    startTime: '16:00',
    endTime: '22:00',
    employeeId: 'u-6',
    employeeName: 'Saad Farooq',
    employeeRole: 'Staff Support',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Available - Trained',
    workstation: 'Beauty Section'
  },
  {
    id: 'shift-8',
    weekNumber: 38,
    day: 'Saturday',
    shift: 'Morning',
    startTime: '08:00',
    endTime: '14:00',
    employeeId: 'u-3',
    employeeName: 'Hamza Malik, Pharm.D',
    employeeRole: 'Pharmacist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150&auto=format&fit=crop&q=80',
    skillStatus: 'Certified',
    workstation: 'Dispensary Counter 1'
  }
];

