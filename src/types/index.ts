export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'ADMIN' 
  | 'PHARMACIST' 
  | 'INVENTORY_MANAGER' 
  | 'CASHIER' 
  | 'STAFF';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export type StorageCondition = 'Room Temperature (15-25°C)' | 'Cold Storage (2-8°C)' | 'Cool & Dry Place' | 'Protect from Light';

export interface Medicine {
  id: string;
  name: string;
  genericName: string;
  brand: string;
  category: string; // e.g. Antibiotics, Analgesics, Cardiovascular, Gastrointestinal, Respiratory
  strength: string; // e.g. 500mg, 10mg, 250mg/5ml
  dosageForm: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Suspension' | 'Ointment' | 'Eye Drops' | 'Inhaler';
  barcode: string;
  sku: string;
  batchNumber: string;
  supplierId: string;
  supplierName: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  mfgDate: string; // YYYY-MM-DD
  expiryDate: string; // YYYY-MM-DD
  storageCondition: StorageCondition;
  prescriptionRequired: boolean; // Rx required
  isQuarantined: boolean;
  notes?: string;
}

export interface Cosmetic {
  id: string;
  name: string;
  brand: string;
  category: 'Skincare' | 'Makeup' | 'Haircare' | 'Fragrances' | 'Beauty Accessories' | 'Body Care';
  shade?: string; // e.g. "Warm Beige #03", "Ruby Red"
  size: string; // e.g. "50ml", "100g", "30ml"
  barcode: string;
  batchNumber: string;
  supplierId: string;
  supplierName: string;
  purchasePrice: number;
  sellingPrice: number;
  quantity: number;
  reorderLevel: number;
  pao?: string; // Period After Opening: e.g. "12M", "6M"
  expiryDate: string; // YYYY-MM-DD
  discountPercent?: number;
  isQuarantined: boolean;
  image?: string;
}

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  balanceDue: number;
  rating: number; // 1-5
}

export interface PurchaseOrderItem {
  itemId: string;
  itemName: string;
  itemType: 'MEDICINE' | 'COSMETIC';
  quantity: number;
  unitCost: number;
  batchNumber: string;
  expiryDate: string;
}

export interface PurchaseOrder {
  id: string;
  orderNumber: string;
  supplierId: string;
  supplierName: string;
  date: string;
  items: PurchaseOrderItem[];
  totalAmount: number;
  paymentStatus: 'PAID' | 'PARTIAL' | 'UNPAID';
  notes?: string;
}

export interface CartItem {
  id: string;
  name: string;
  type: 'MEDICINE' | 'COSMETIC';
  batchNumber: string;
  expiryDate: string;
  unitPrice: number;
  quantity: number;
  prescriptionRequired: boolean;
  maxStock: number;
  discountPercent?: number;
}

export interface SaleItem {
  itemId: string;
  itemName: string;
  itemType: 'MEDICINE' | 'COSMETIC';
  batchNumber: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
}

export interface Sale {
  id: string;
  invoiceNumber: string;
  date: string; // ISO string
  cashierId: string;
  cashierName: string;
  customerName: string;
  customerPhone?: string;
  items: SaleItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paymentMethod: 'CASH' | 'CARD' | 'EASYPAISA' | 'BANK';
  doctorName?: string;
  prescriptionNumber?: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalVisits: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastVisit: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  role: UserRole;
  action: string;
  module: string;
  details: string;
}

export interface SystemSettings {
  pharmacyName: string;
  tagline: string;
  address: string;
  phone: string;
  email: string;
  licenseNumber: string;
  currencySymbol: string;
  taxRatePercent: number;
  expiryWarningDays: number;
  geminiApiKey: string;
  autoFefoEnabled: boolean;
}

// Order interface matching Screenshot 2 (List of Orders)
export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  variant?: string;
  brand: string;
  category: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export type OrderStatus = 'Delivered' | 'Pending' | 'Cancelled' | 'Processing';

export interface Order {
  id: string;
  orderNumber: string;
  date: string; // e.g. "2024-10-17 15:32"
  clientName: string;
  clientEmail?: string;
  clientPhone?: string;
  totalAmount: number;
  isPaid: boolean;
  status: OrderStatus;
  paymentMethod: 'COD' | 'ONLINE PAYMENT' | 'CASH' | 'CARD';
  items: OrderItem[];
  notes?: string;
}

// Brand interface matching Screenshot 4 (Brand List: Makeup brands & Medicine companies)
export interface Brand {
  id: string;
  name: string;
  type: 'COSMETICS' | 'MEDICINE';
  category: string;
  originCountry: string;
  description?: string;
  logo?: string; // Optional image
  productsCount: number;
  status: 'Active' | 'Inactive';
}

// Employee shift schedule assignment matching Screenshot 5 (Schedule of the week)
export type WeekDay = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
export type ShiftType = 'Morning' | 'Evening' | 'Night';

export interface EmployeeShiftAssignment {
  id: string;
  weekNumber: number; // e.g. 38
  day: WeekDay;
  shift: ShiftType;
  startTime: string; // e.g. "08:00"
  endTime: string;   // e.g. "12:00"
  employeeId: string;
  employeeName: string;
  employeeRole: string;
  avatar?: string;
  skillStatus: 'Available - Trained' | 'Certified' | 'Senior Specialist';
  workstation: string;
}

