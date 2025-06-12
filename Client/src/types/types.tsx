export interface Department {
  department_no: number;
  department_name: string;
  previewImage: string;
  products: Product[];
}

// export interface Product {
//   _id: string;
//   article_mapped_id: string;
//   article_id: string;
//   product_code: string;
//   prod_name: string;
//   price: number;
//   prodRatings: number;
//   detail_desc: string;
//   imageUrl: string;
//   department_name: string;
//   colour_group_name: string[];
//   prodSizes: string[];
//   prodStyle: string;
//   inStock: number;
//   media: string[];
// }

export interface Product {
  _id: string;
  article_id: string;
  detail_desc: string;
  price: number;
  article_mapped_id: string;
  product_code: number;
  prod_name: string;
  colour_group_code: string;
  department_name: string;
  department_no: number;
  colour_group_name: string;
  imageUrl: string;
  sizes: string[];
}

export enum ROLES {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
}

export interface UserRes {
  id: string;
  email: string;
  role: ROLES;
  customer_mapped_id?: number;
  age: number;
  fName?: string;
  lName?: string;
  isNewUser?: boolean;
}

export interface Feedback {
  customer_mapped_id: number;
  article_id: string;
  feedback: string;
  feedbackCategory: string;
  feedback_description: string;
  rating: number;
  media?: string[];
}

export enum ORDER_STATUS {
  PENDING = "Pending",
  CANCELLED = "Cancelled",
  COMPLETED = "Completed",
}

export enum PAYMENT_METHODS {
  CASH = "Cash on Delivery",
  CARD = "Credit Card",
  ONLINE = "Online Payment",
}

export interface OrderItem {
  image: string;
  name: string;
  color: string;
  quantity: number;
  total: number;
  article_id: string;
}

export interface Order {
  id: string;
  date: string;
  estimatedDelivery: string;
  status: ORDER_STATUS;
  paymentMethod: PAYMENT_METHODS;
  items: OrderItem[];
}

// Types for the data being passed to the service functions
export interface AddToCartData {
  customer_mapped_id: number;
  article_id: string;
  quantity: number;
  subtotal: number;
  shipping: string;
  size: string;
}

export interface CartItem {
  _id: string;
  customer_mapped_id: number;
  article_id: string;
  quantity: number;
  subtotal: number;
  shipping: string;
  size: string;
}

export interface UpdateCartItemParams {
  quantity: number;
  subtotal: number;
}
