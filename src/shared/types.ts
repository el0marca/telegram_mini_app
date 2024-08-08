// import { ProcessedAddress } from "../addressStore/types";
// import { PaymentCard } from "../cardStore/types";
// import { Cart } from "../cartStore/types";
// import { CategoryItem } from "../catalogStore/types";
// import { Cart, CurrentOrder } from "../orderStore/types";
// import { CategoryItem, PostamatCart } from "../postamatStore/types";

export interface Location {
  lat: number;
  lng: number;
}

export interface CityBranch {
  id: string;
  title: string;
  location: Location | null;
  main_phone: string; // for output
  main_phone_nums: string; // for call
}

export enum LoginType {
  client_call = "client_call",
  sms = "sms",
  email = "email",
}

export interface AuthType {
  login_type: LoginType;
  phones_login_info: {
    phone_mask: string;
    phone_mask_nums_length: number;
    phone_start: string;
  };
}

interface CurrencyHash {
  id: string;
  name: string;
  name_long: string;
  name_one: string;
  name_plur: string;
  symbol: string;
  symbol_html: string;
}

export enum ViewType {
  LIST = "list",
  GRID = "grid",
}

export interface APP_REVIEW {
  show_modal: boolean;
  title: string;
  btn: string;
  ios_button_link: string;
  android_button_link: string;
  review_info: { modal_showed: boolean };
}
export interface UpdateAppInfo {
  builder_version_app_to_update: string;
  show_update: boolean;
  old_can_be_used: boolean;
  app_is_blocked: boolean;
  blocked_text: string;
  google_app: string;
  ios_app: string;
}
export interface CompanyInfo {
  id: string;
  mobile_logo_url: string;
  mobile_menu_logo_url: string | null;
  mobile_min_sum: number;
  mobile_auth_required: boolean;
  mobile_to_cart_after_add: boolean;
  mobile_item_view_type: ViewType;
  mobile_chat_enabled: boolean;
  city_branches: CityBranch[];
  auth_type: AuthType;
  currency_hash: CurrencyHash;
  mobile_delivery_type: MobileDeliveryType;
  pickup_points: string[];
  cart_coupled: { need_tare_txt: string; add_tare_btn_txt: string };
  mobile_slider_params: {
    enabled: boolean;
    change_speed: number;
  };
  is_bonus_avaliable: boolean;
  is_promocodes: boolean;
  bonus_total_percent: number;
  bonus_info: string;
  mobile_articles_enabled: boolean;
  mobile_articles_title: string;
  referal_info: MainReferalInfo;
  mobile_sub_category_view_type: Category_View_Type;
  mobile_category_view_type: Category_View_Type;
  mobile_grid_image_full: boolean;
  mobile_hello_text: string;
  mobile_logo_on_catalog: string;
  mobile_catalog_logo_url: string;
  mobile_hello_text_background_color: string;
  mobile_hello_text_font_color: string;
  update_app: UpdateAppInfo;
  mobile_add_btns_type: "default";
  mobile_item_image_type: "default" | "full";
  stores: Pickup_Point[];
  mobile_after_order: string;
  mobile_after_paid_order: string;
  mobile_order_error_message: string;
  mobile_after_pay_error_order: string;
  colors: ColorScheme;
  license_title: string;
  license_url: string;
  license_link_title: string;
  license_agee_default: boolean;
  license_agee_turn_on: boolean;
}

export interface ColorScheme {
  background: {
    primary: string;
    secondary: string;
  };
  text: {
    primary: string;
    secondary: string;
  };
  button: {
    primary_background: string;
    primary_text: string;
    secondary_background: string;
    secondary_text: string;
    accent_background: string;
    disabled: string;
    disabled_text: string;
  };
  header: {
    background: string;
    icon: string;
    bonus_button: string;
  };
  tabbar: {
    background: string;
    icon: string;
    active_icon: string;
  };
  chat_with_manager: {
    message_background: string;
    message_text: string;
  };
}
export enum Category_View_Type {
  SLIDER_TOP = "slider-top",
  SLIDER_ICONS_TOP = "slider-icons-top",
}
export interface Avatar {
  original: "string";
  thumb: "string";
  show: "string";
}

export interface ReferalInfo {
  referals_count: number;
  code: string;
  link: string;
  qr_link: string;
  message: string;
  show_message: string;
}

export interface ClientInfo {
  app_review: APP_REVIEW;
  mobile_avatar_image: Avatar | null;
  mobile_fio: string;
  birthday: string;
  mobile_custom_params?: UserAppSettings;
  _id: string;
  addresses: any[];
  bonuses: number;
  bottles: number;
  cards: any[];
  client_type: string;
  coolers_rent_count: number;
  created_at: string;
  //   current_order: CurrentOrder | null;
  debt: null;
  deletion_asked: boolean;
  districts: District[][];
  do_not_remind_automatically: boolean;
  email: null | string;
  has_rek: boolean;
  id: {
    $oid: string;
  };
  last_address: null | string;
  last_address_str: string;
  //   last_orders: CurrentOrder[];
  next_order_date_str: null | string;
  order_per_days: number;
  orders_count: number;
  persisted: boolean;
  phone: string;
  unreaded_client_messages_count: number;
  unreaded_messages_count: number;
  updated_at: string;
  ur_acccount_type: string;
  ur_account_number: string;
  ur_accounter_fio: string;
  ur_address: string;
  ur_bank_bik: string;
  ur_bank_title: string;
  ur_dir: string;
  ur_dir_rod: string;
  ur_dir_sokr: string;
  ur_email: string;
  ur_inn: string;
  ur_invoice_fio: string;
  ur_invoice_position: string;
  ur_kor_account: string;
  ur_kpp: string;
  ur_off_address: string;
  ur_ogrn_ip: string;
  ur_phone: string;
  ur_store_position: string;
  ur_store_sign: string;
  ur_title: string;
  ur_vat: string;
  referal_info: ReferalInfo;
  is_allow_new_address: boolean;
  review_json: { text: string } | null;
}

export interface District {
  id: string;
  title: string;
  zones: { coords: [number, number][] }[];
}

export interface CoupledMobileTokens {
  client_info: ClientInfo;
  email: string;
  phone: string;
  token: string;
}

export enum MobileDeliveryType {
  delivery_and_pickup = "delivery_and_pickup",
  only_delivery = "only_delivery",
  only_pickup = "only_pickup",
}

export enum SliderType {
  SIMPLE = "simple",
  LINK = "link",
  ITEM = "item",
  REVIEW_APP = "review_app",
}
export interface Slider {
  id: string;
  image_url: string;
  link: string;
  slider_type: SliderType;
  content: string;
  //   item: CategoryItem;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  images: [
    {
      thumb: string;
      show: string;
    }
  ];
}

interface MainReferalInfo {
  client_and_referal_fixed_sum: number;
  is_referal: boolean;
  referal_type: "client_and_referal_fixed" | string;
}

export interface MobileToken {
  token: string;
  company_info: CompanyInfo;
  client_info: ClientInfo;
  city_branch: CityBranch;
  //   current_order: CurrentOrder;
  cart: Cart;
  uniq_socket_hash: string;
  districts: District[];
  coupled_mobile_tokens: CoupledMobileTokens[];
  slides: Slider[];
  articles: Article[];
  //   postamat_cart: PostamatCart;
}

export interface MobileTokenServerResponse {
  mobile_token: MobileToken;
}

export interface UpdateClientInfo {
  mobile_fio: string;
  birthday: string;
  mobile_custom_params: UserAppSettings;
}

export interface UserAppSettings {
  vibration?: boolean;
}

export interface Pickup_Point {
  id: string;
  title: string;
  location: {
    lat: number;
    lng: number;
  };
  address: string;
  coords: [number, number];
  choose_delivery_time: boolean;
  choose_delivery_time_offset_minutes: number;
  time_periods_offsets: string;
  work_time: WorkTime[];
  app_avaliabile: boolean;
  store_type: "postamat" | string;
}

export interface WorkTime {
  id: string;
  start: string;
  end: string;
  all_day: boolean;
  is_working: boolean;
}

export interface Category {
  _id: string;
  categories: Category[];
  descr: string | null;
  icon_url: string;
  mobile_descr: string | null;
  title: string;
}
export interface Image {
  id: string;
  original: string;
  position: number;
  show: string;
  thumb: string;
}

export interface PriceConditions {
  price: number;
  quantity: number;
}
export interface CategoryItem {
  _id: string;
  actual_price: number;
  art: string;
  avaliable_in_cities: string[];
  category_id: string;
  coupled_item_id: string | null;
  descr: string;
  descr_short: string;
  has_toppings: boolean;
  icon_url: string;
  id: string;
  images: Image[];
  price: number;
  price_conditions: PriceConditions[];
  price_old: number | null;
  quantity: number;
  quants_conds: any[];
  recommendations: CategoryItem[];
  service: string | null;
  title: string;
  title_short: string;
  toppings: CategoryItem[];
  bonus_sum: number;
  min_order_count: number;
  warehouse_count: number;
  item_variants: CategoryItem[];
  variant_type: "bundle" | "variants";
}

export interface Catalog {
  categories: Category[];
  category: Category | null;
  items: CategoryItem[];
}

export interface CartItem {
  _id: string;
  bonus_sum: number;
  choosen_toppings: {
    id: string;
    title: string;
  }[];
  descr: string;
  icon_url: string;
  images: Array<Image>;
  item_id: string;
  model: ProductModel;
  old_price: number;
  price: number;
  quantity: number;
  title: string;
  topping_ids: string[];
}

interface ProductModel {
  _id: string;
  actual_price: number;
  art: string;
  avaliable_in_cities: Array<string>;
  bonus_sum: number;
  category_id: string;
  coupled_item_id: null | string;
  descr: string;
  descr_short: null | string;
  has_toppings: boolean;
  icon_url: string;
  id: string;
  images: Array<Image>;
  min_order_count: number;
  price: number;
  price_conditions: Array<PriceConditions>;
  price_old: string;
  quantity: number;
  quants_conds: Array<string>;
  recommendations: Array<CategoryItem>;
  service: boolean;
  title: string;
  toppings: Array<CategoryItem>;
  warehouse_count: number;
}

export interface Cart {
  id: string;
  count: number;
  items: CartItem[];
  total_quantity: number;
  sum_hash: number;
  total_sum: number;
  need_coupled_count: number;
  bonus_earn_sum: number;
  recommendations: CategoryItem[];
}
