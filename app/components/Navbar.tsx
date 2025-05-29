'use client';

import Link from 'next/link';
import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  MapIcon,
  HomeIcon,
  TruckIcon,
  DevicePhoneMobileIcon,
  HomeModernIcon,
  WrenchScrewdriverIcon,
  CogIcon,
  XMarkIcon,
  MapPinIcon,
  ChevronDownIcon,
  Bars3Icon,
  SunIcon,
  MoonIcon,
  CheckIcon,
  EyeIcon,
  EyeSlashIcon,
  FireIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  BuildingOffice2Icon,
  Square3Stack3DIcon,
  CubeIcon,
  SunIcon as VacationIcon,
  TrashIcon,
  DeviceTabletIcon,
  ComputerDesktopIcon,
  TvIcon,
  ScissorsIcon,
  BeakerIcon,
  WrenchIcon,
  CogIcon as PartsIcon,
  UserIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Category {
  id: string;
  name: string;
  icon?: any;
}

interface SubCategory extends Category {
  filters?: FilterOption[];
}

interface FilterOption {
  id: string;
  name: string;
  options?: string[];
}

interface CategoryWithSubcategories extends Category {
  subcategories?: SubCategory[];
}

interface NavbarProps {
  onCategoryChange?: (category: string | null) => void;
}

const fullCategories: CategoryWithSubcategories[] = [
  { 
    id: 'emlak', 
    name: 'Emlak', 
    icon: HomeIcon, 
    subcategories: [
      { id: 'konut', name: 'Konut', icon: HomeIcon, filters: [
        { id: 'oda-sayisi', name: 'Oda Sayısı', options: ['1+0', '1+1', '2+1', '3+1', '4+1', '5+1'] },
        { id: 'fiyat', name: 'Fiyat Aralığı' },
        { id: 'metrekare', name: 'Metrekare' }
      ]},
      { id: 'is-yeri', name: 'İş Yeri', icon: BuildingOfficeIcon },
      { id: 'arsa', name: 'Arsa', icon: Square3Stack3DIcon },
      { id: 'bina', name: 'Bina', icon: BuildingOffice2Icon },
      { id: 'devre-tatil', name: 'Devre Tatil', icon: VacationIcon },
    ]
  },
  { 
    id: 'vasita', 
    name: 'Vasıta', 
    icon: TruckIcon, 
    subcategories: [
      { id: 'otomobil', name: 'Otomobil', icon: TruckIcon, filters: [
        { id: 'marka', name: 'Marka', options: ['Volkswagen', 'BMW', 'Mercedes', 'Audi', 'Toyota', 'Honda'] },
        { id: 'model', name: 'Model' },
        { id: 'yil', name: 'Model Yılı' },
        { id: 'km', name: 'Kilometre' }
      ]},
      { id: 'arazi-suv-pickup', name: 'Arazi, SUV & Pick-up', icon: TruckIcon },
      { id: 'minivan-panelvan', name: 'Minivan & Panelvan', icon: TruckIcon },
      { id: 'motosiklet', name: 'Motosiklet', icon: CogIcon },
    ]
  },
  { 
    id: 'elektronik', 
    name: 'Elektronik', 
    icon: DevicePhoneMobileIcon, 
    subcategories: [
      { id: 'cep-telefonu', name: 'Cep Telefonu', icon: DevicePhoneMobileIcon },
      { id: 'bilgisayar', name: 'Bilgisayar', icon: ComputerDesktopIcon },
      { id: 'tablet', name: 'Tablet', icon: DeviceTabletIcon },
      { id: 'beyaz-esya', name: 'Beyaz Eşya', icon: CubeIcon },
      { id: 'televizyon', name: 'Televizyon', icon: TvIcon },
    ]
  },
  { 
    id: 'ev-esyalari', 
    name: 'Ev Eşyaları', 
    icon: HomeModernIcon, 
    subcategories: [
      { id: 'mobilya', name: 'Mobilya', icon: CubeIcon },
      { id: 'beyaz-esya', name: 'Beyaz Eşya', icon: CubeIcon },
      { id: 'ev-tekstili', name: 'Ev Tekstili', icon: ScissorsIcon },
      { id: 'mutfak-gerecleri', name: 'Mutfak Gereçleri', icon: BeakerIcon },
    ]
  },
  { 
    id: 'is-makineleri', 
    name: 'İş Makineleri', 
    icon: WrenchScrewdriverIcon, 
    subcategories: [
      { id: 'insaat', name: 'İnşaat', icon: WrenchScrewdriverIcon },
      { id: 'tarim', name: 'Tarım', icon: WrenchIcon },
      { id: 'sanayi', name: 'Sanayi', icon: CogIcon },
      { id: 'yedek-parca', name: 'Yedek Parça', icon: PartsIcon },
    ]
  },
  { 
    id: 'yedek-parca', 
    name: 'Yedek Parça', 
    icon: CogIcon, 
    subcategories: [
      { id: 'otomobil-yedek', name: 'Otomobil Yedek Parça', icon: TruckIcon },
      { id: 'motosiklet-yedek', name: 'Motosiklet Yedek Parça', icon: CogIcon },
      { id: 'is-makinesi-yedek', name: 'İş Makinesi Yedek Parça', icon: WrenchScrewdriverIcon },
      { id: 'diger-yedek', name: 'Diğer Yedek Parça', icon: PartsIcon },
    ]
  }
];

const categories: Category[] = [
  { id: 'all', name: 'Tümü', icon: HomeIcon },
  { id: 'cok-izlenenler', name: 'Çok İzlenenler', icon: FireIcon },
  { id: 'yeni', name: 'Yeni', icon: SparklesIcon },
];

const cities: string[] = [
  'Adana', 'Adıyaman', 'Afyonkarahisar', 'Ağrı', 'Amasya', 'Ankara', 'Antalya', 'Artvin', 'Aydın', 'Balıkesir',
  'Bilecik', 'Bingöl', 'Bitlis', 'Bolu', 'Burdur', 'Bursa', 'Çanakkale', 'Çankırı', 'Çorum', 'Denizli',
  'Diyarbakır', 'Edirne', 'Elazığ', 'Erzincan', 'Erzurum', 'Eskişehir', 'Gaziantep', 'Giresun', 'Gümüşhane', 'Hakkari',
  'Hatay', 'Isparta', 'Mersin', 'İstanbul', 'İzmir', 'Kars', 'Kastamonu', 'Kayseri', 'Kırklareli', 'Kırşehir',
  'Kocaeli', 'Konya', 'Kütahya', 'Malatya', 'Manisa', 'Kahramanmaraş', 'Mardin', 'Muğla', 'Muş', 'Nevşehir',
  'Niğde', 'Ordu', 'Rize', 'Sakarya', 'Samsun', 'Siirt', 'Sinop', 'Sivas', 'Tekirdağ', 'Tokat',
  'Trabzon', 'Tunceli', 'Şanlıurfa', 'Uşak', 'Van', 'Yozgat', 'Zonguldak', 'Aksaray', 'Bayburt', 'Karaman',
  'Kırıkkale', 'Batman', 'Şırnak', 'Bartın', 'Ardahan', 'Iğdır', 'Yalova', 'Karabük', 'Kilis', 'Osmaniye', 'Düzce'
];

export default function Navbar({ onCategoryChange }: NavbarProps) {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string | null>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isCityMenuOpen, setIsCityMenuOpen] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>(['İstanbul']);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchMenuOpen, setIsSearchMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedSearchItems, setSelectedSearchItems] = useState<string[]>([]);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSubcategory, setHoveredSubcategory] = useState<string | null>(null);
  const [filterData, setFilterData] = useState<{[key: string]: string[]}>({});
  
  const [selectedSearchSubcategory, setSelectedSearchSubcategory] = useState<SubCategory | null>(null);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isFilterPanelConnected, setIsFilterPanelConnected] = useState(false);
  const [searchMenuView, setSearchMenuView] = useState<'categories' | 'filters'>('categories');

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const cityMenuRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchMenuRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrolled = window.scrollY > 0;
    setIsScrolled(scrolled);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (cityMenuRef.current && !cityMenuRef.current.contains(event.target as Node)) {
      setIsCityMenuOpen(false);
    }
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
    if (searchMenuRef.current && !searchMenuRef.current.contains(event.target as Node)) {
      setIsSearchMenuOpen(false);
      setExpandedCategory(null);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    // Set default category to 'all' on mount
    if (onCategoryChange) {
      onCategoryChange('all');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleScroll, handleClickOutside, onCategoryChange]);

  useEffect(() => {
    if (isScrolled) {
      setIsCityMenuOpen(false);
    }
  }, [isScrolled]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    if (categoryId === 'all') {
      setSelectedCategory('all');
      onCategoryChange?.('all');
    } else {
      const newCategory = categoryId === selectedCategory ? null : categoryId;
      setSelectedCategory(newCategory);
      onCategoryChange?.(newCategory);
    }
    setIsMenuOpen(false);
  }, [selectedCategory, onCategoryChange]);

  const handleCitySelect = useCallback((city: string) => {
    setSelectedCities(prev => {
      if (prev.includes(city)) {
        return prev.filter(c => c !== city);
      }
      return [...prev, city];
    });
  }, []);

  const removeCity = useCallback((city: string) => {
    setSelectedCities(prev => prev.filter(c => c !== city));
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleSearchCategoryClick = useCallback((categoryId: string, categoryName: string) => {
    setExpandedCategory(prev => prev === categoryId ? null : categoryId);
  }, []);

  const handleSearchSubcategoryClick = useCallback((subcategoryId: string, subcategoryName: string) => {
    // Find the subcategory and check if it has filters
    const parentCategory = fullCategories.find(cat => cat.subcategories?.some(sub => sub.id === subcategoryId));
    const subcategory = parentCategory?.subcategories?.find(sub => sub.id === subcategoryId);
    
    if (subcategory?.filters && subcategory.filters.length > 0) {
      // Has filters - open filter settings
      setSelectedSearchSubcategory(subcategory);
      setSearchMenuView('filters');
    } else {
      // No filters - directly select the subcategory (like "Hepsi" functionality)
      setSelectedSearchItems(prev => {
        if (prev.includes(subcategoryName)) {
          return prev;
        }
        return [...prev, subcategoryName];
      });
    }
    
    console.log('Subcategory clicked:', subcategoryId, subcategoryName);
  }, []);

  const removeSelectedSearchItem = useCallback((itemToRemove: string) => {
    setSelectedSearchItems(prev => prev.filter(item => item !== itemToRemove));
  }, []);

  // Handle "Hepsi" button click for categories and subcategories
  const handleSelectAll = useCallback((itemName: string) => {
    setSelectedSearchItems(prev => {
      if (prev.includes(itemName)) {
        return prev;
      }
      return [...prev, itemName];
    });
    // Don't open filters when "Hepsi" is clicked
  }, []);

  // Handle filter option selection
  const handleFilterOptionClick = useCallback((filterId: string, option: string) => {
    setFilterData(prev => {
      const currentOptions = prev[filterId] || [];
      const isSelected = currentOptions.includes(option);
      
      if (isSelected) {
        return {
          ...prev,
          [filterId]: currentOptions.filter(opt => opt !== option)
        };
      } else {
        return {
          ...prev,
          [filterId]: [...currentOptions, option]
        };
      }
    });
  }, []);

  // Handle filter input change
  const handleFilterInputChange = useCallback((filterId: string, value: string) => {
    setFilterData(prev => ({
      ...prev,
      [filterId]: value ? [value] : []
    }));
  }, []);

  // Save filters and select subcategory
  const handleSaveFilters = useCallback(() => {
    if (selectedSearchSubcategory) {
      // Just save the subcategory name without filter details
      // Filter details can be accessed via the filter button
      const itemName = selectedSearchSubcategory.name;

      setSelectedSearchItems(prev => {
        if (prev.includes(itemName)) {
          return prev;
        }
        return [...prev, itemName];
      });

      // Go back to categories view
      setSearchMenuView('categories');
      setFilterData({}); // Clear filter data
    }
  }, [selectedSearchSubcategory, filterData]);

  // Helper function to find subcategory from selected item name
  const findSubcategoryFromItemName = useCallback((itemName: string) => {
    // Extract subcategory name (remove filter info in parentheses)
    const subcategoryName = itemName.split(' (')[0];
    
    for (const category of fullCategories) {
      if (category.subcategories) {
        for (const subcategory of category.subcategories) {
          if (subcategory.name === subcategoryName) {
            return subcategory;
          }
        }
      }
    }
    return null;
  }, []);

  // Check if an item can have filters
  const canItemHaveFilters = useCallback((itemName: string) => {
    const subcategory = findSubcategoryFromItemName(itemName);
    return subcategory && subcategory.filters && subcategory.filters.length > 0;
  }, [findSubcategoryFromItemName]);

  // Open filter settings for a selected item
  const openFilterSettingsForItem = useCallback((itemName: string) => {
    const subcategory = findSubcategoryFromItemName(itemName);
    if (subcategory && subcategory.filters && subcategory.filters.length > 0) {
      // Extract existing filter data from item name if any
      const filterMatch = itemName.match(/\((.*)\)$/);
      if (filterMatch) {
        const existingFilters = filterMatch[1];
        // You could parse existing filters here if needed
        // For now, we'll start with empty filters
      }
      
      setSelectedSearchSubcategory(subcategory);
      setSearchMenuView('filters');
      setFilterData({}); // Start with empty filters or parse existing ones
    }
  }, [findSubcategoryFromItemName]);

  // Form handlers
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Login logic here
    console.log('Login form submitted:', loginForm);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Register logic here
    console.log('Register form submitted:', registerForm);
  };

  return (
    <>
      {/* Main Navbar - Hidden when scrolled */}
      <nav className={`fixed top-0 left-0 right-0 ${isDarkMode ? 'bg-zinc-900/95' : 'bg-white/95'} z-50 transition-all duration-300 ${
        isScrolled ? 'transform -translate-y-full' : ''
      }`}>
        <div className="w-full max-w-6xl mx-auto px-4 md:px-12 lg:px-24 xl:px-0">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-6">
              <Link href="/" className="flex items-center pl-[10px] md:pl-[10px]">
                <span className={`font-light text-4xl ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>V</span>
              </Link>

              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ara..."
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className={`${isDarkMode ? 'bg-zinc-800 text-white placeholder-zinc-400' : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500'} rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-zinc-700' : 'focus:ring-zinc-200'} transition-all duration-300 ${
                      isSearchFocused ? 'w-[300px]' : 'w-[200px]'
                    }`}
                  />
                  <MagnifyingGlassIcon className={`h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                </div>

                <div className="relative" ref={cityMenuRef}>
                  <button
                    onClick={() => setIsCityMenuOpen(!isCityMenuOpen)}
                    className={`flex items-center space-x-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-700 hover:text-zinc-900'} px-3 py-2 rounded-full transition-colors cursor-pointer hover:bg-[#155CFC] hover:text-white`}
                  >
                    <MapPinIcon className="h-5 w-5" />
                    <span className="text-sm">
                      {selectedCities.length === 1 
                        ? selectedCities[0]
                        : `${selectedCities.length} Şehir Seçildi`}
                    </span>
                    <ChevronDownIcon className="h-4 w-4" />
                  </button>

                  {isCityMenuOpen && (
                    <>
                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsCityMenuOpen(false)}
                      />
                      {/* Menu Panel */}
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className={`fixed left-0 top-0 h-screen w-96 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg z-50`}
                      >
                        <div className="flex flex-col h-full">
                          <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                            <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Şehir Seçimi</h3>
                            <div className="flex items-center space-x-4">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setIsCityMenuOpen(false);
                                }}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${
                                  isDarkMode 
                                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                }`}
                              >
                                <XMarkIcon className="h-6 w-6" />
                              </button>
                            </div>
                          </div>

                          <div className="flex-1 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            <div className="px-6">
                              <div className="relative mb-4">
                                <input
                                  type="text"
                                  placeholder="Şehir ara..."
                                  className={`w-full ${isDarkMode ? 'bg-zinc-800 text-white placeholder-zinc-400' : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500'} rounded-lg py-2 pl-9 pr-4 text-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-zinc-700' : 'focus:ring-zinc-200'}`}
                                />
                                <MagnifyingGlassIcon className={`h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                              </div>

                              {selectedCities.length > 0 && (
                                <div className="mb-4">
                                  <div className="flex items-center justify-end mb-2">
                                    <button
                                      onClick={() => setSelectedCities([])}
                                      className={`text-sm transition-colors flex items-center space-x-1 cursor-pointer ${
                                        isDarkMode 
                                          ? 'text-zinc-400 hover:text-white' 
                                          : 'text-zinc-600 hover:text-zinc-900'
                                      }`}
                                    >
                                      <XMarkIcon className="h-4 w-4" />
                                      <span>Tümünü Temizle</span>
                                    </button>
                                  </div>
                                </div>
                              )}

                              <div className="grid grid-cols-1 gap-1">
                                {cities
                                  .sort((a, b) => {
                                    const aSelected = selectedCities.includes(a);
                                    const bSelected = selectedCities.includes(b);
                                    if (aSelected && !bSelected) return -1;
                                    if (!aSelected && bSelected) return 1;
                                    return 0;
                                  })
                                  .map((city) => (
                                    <button
                                      key={city}
                                      onClick={() => handleCitySelect(city)}
                                      className={`text-left px-4 py-3 text-sm transition-colors cursor-pointer rounded-lg flex items-center justify-between ${
                                        selectedCities.includes(city)
                                          ? isDarkMode 
                                            ? 'text-white bg-zinc-800' 
                                            : 'text-zinc-900 bg-zinc-100'
                                          : isDarkMode
                                            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                                      }`}
                                    >
                                      <div className="flex items-center space-x-3">
                                        <MapPinIcon className="h-5 w-5" />
                                        <span>{city}</span>
                                      </div>
                                      {selectedCities.includes(city) && (
                                        <CheckIcon className="h-5 w-5" />
                                      )}
                                    </button>
                                  ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </div>

                <button
                  onClick={() => setIsSearchMenuOpen(!isSearchMenuOpen)}
                  className={`flex items-center space-x-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-700 hover:text-zinc-900'} px-3 py-2 rounded-full transition-colors cursor-pointer hover:bg-[#155CFC] hover:text-white`}
                >
                  <MagnifyingGlassIcon className="h-5 w-5" />
                  <span className="text-sm">Genel Arama</span>
                </button>
              </div>
            </div>

            {/* Right side buttons and hamburger menu */}
            <div className="flex items-center space-x-4">
              {/* Giriş Yap and Kayıt Ol buttons (visible above lg) */}
              <div className="hidden lg:flex items-center space-x-4">
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setActiveTab('login');
                  }}
                  className={`flex items-center space-x-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-700 hover:text-zinc-900'} px-3 py-2 rounded-full transition-colors cursor-pointer text-sm hover:bg-[#155CFC] hover:text-white`}
                >
                  <UserIcon className="h-4 w-4" />
                  <span>Giriş Yap</span>
                </button>
                <button
                  onClick={() => {
                    setIsLoginModalOpen(true);
                    setActiveTab('register');
                  }}
                  className={`flex items-center space-x-1 ${isDarkMode ? 'bg-zinc-800 text-zinc-300 hover:text-white' : 'bg-zinc-100 text-zinc-700 hover:text-zinc-900'} px-3 py-2 rounded-full transition-colors cursor-pointer text-sm hover:bg-[#155CFC] hover:text-white`}
                >
                  <UserPlusIcon className="h-4 w-4" />
                  <span>Kayıt Ol</span>
                </button>
              </div>

              {/* Hamburger Menu Button and content (visible below lg) */}
              <div className="relative" ref={menuRef}>
                <button
                  onClick={toggleMenu}
                  className={`flex items-center justify-center w-10 h-10 transition-colors cursor-pointer rounded-full ${isDarkMode 
                    ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                  }`}
                >
                  <Bars3Icon className="h-6 w-6" />
                </button>

                <AnimatePresence>
                  {isMenuOpen && (
                    <>
                      {/* Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/30 z-40"
                        onClick={() => setIsMenuOpen(false)}
                      />
                      {/* Menu Panel */}
                      <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 20 }}
                        className={`fixed right-0 top-0 h-screen w-96 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg z-50`}
                      >
                        <div className="flex flex-col h-full">
                          <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                            <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>Menü</h3>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${isDarkMode 
                                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                }`}
                              >
                                {isDarkMode ? (
                                  <SunIcon className="h-6 w-6" />
                                ) : (
                                  <MoonIcon className="h-6 w-6" />
                                )}
                              </button>
                              <button 
                                onClick={() => setIsMenuOpen(false)}
                                className={`p-2 rounded-full transition-colors cursor-pointer ${isDarkMode 
                                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                  : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                                }`}
                              >
                                <XMarkIcon className="h-6 w-6" />
                              </button>
                            </div>
                          </div>
                          <div className="flex-1 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                            {/* Menu content */}
                            <div className="px-6">
                              {/* Giriş Yap and Kayıt Ol buttons (visible below lg) */}
                              <div className="flex flex-col space-y-4">
                                <button
                                  onClick={() => {
                                    setIsLoginModalOpen(true);
                                    setActiveTab('login');
                                    setIsMenuOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 rounded-md transition-colors cursor-pointer flex items-center space-x-2 ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
                                >
                                  <UserIcon className="h-4 w-4" />
                                  <span>Giriş Yap</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setIsLoginModalOpen(true);
                                    setActiveTab('register');
                                    setIsMenuOpen(false);
                                  }}
                                  className={`w-full text-left px-4 py-2 rounded-md transition-colors cursor-pointer flex items-center space-x-2 ${isDarkMode ? 'bg-zinc-800 text-white hover:bg-zinc-700' : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'}`}
                                >
                                  <UserPlusIcon className="h-4 w-4" />
                                  <span>Kayıt Ol</span>
                                </button>
                              </div>
                              {/* Empty div for future content */}
                              <div className="mt-4"></div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Category Bar - Always visible */}
      <div className={`fixed left-0 right-0 ${isDarkMode ? 'bg-zinc-900/95' : 'bg-white/95'} border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'} z-30 transition-all duration-300 ${
        isScrolled ? 'top-0' : 'top-16'
      }`}>
        <div className="w-full max-w-6xl mx-auto px-4 md:px-12 lg:px-24 xl:px-0">
          <div className="flex flex-col">
            {/* Main Categories */}
            <div className={`flex items-center justify-between h-12 transition-all duration-300 ${
              isScrolled ? 'h-0 overflow-hidden' : ''
            }`}>
              <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide xl:hidden">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`flex items-center space-x-2 text-sm whitespace-nowrap transition-colors cursor-pointer ${
                      selectedCategory === category.id
                        ? isDarkMode ? 'text-white' : 'text-zinc-900'
                        : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                    }`}
                  >
                    {category.icon && <category.icon className="h-4 w-4" />}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              <div className="hidden xl:flex items-center space-x-6 overflow-x-auto scrollbar-hide">
                 {categories.map((category) => (
                   <button
                     key={category.id}
                     onClick={() => handleCategoryClick(category.id)}
                     className={`flex items-center space-x-2 text-sm whitespace-nowrap transition-colors cursor-pointer ${
                       selectedCategory === category.id
                         ? isDarkMode ? 'text-white' : 'text-zinc-900'
                         : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                     }`}
                   >
                     {category.icon && <category.icon className="h-4 w-4" />}
                     <span>{category.name}</span>
                   </button>
                 ))}
               </div>

              <div className="flex items-center space-x-4">
                <button className={`flex items-center space-x-1 text-sm cursor-pointer ${
                  isDarkMode 
                    ? 'text-zinc-400 hover:text-white' 
                    : 'text-zinc-600 hover:text-zinc-900'
                }`}>
                  <MapIcon className="h-4 w-4" />
                  <span>Haritadan Bak</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Genel Arama Menu Panel */}
      <AnimatePresence>
        {isSearchMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setIsSearchMenuOpen(false)}
            />
            {/* Menu Panel */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={`fixed left-0 top-0 h-screen w-96 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg z-50`}
              ref={searchMenuRef}
            >
              <div className="flex flex-col h-full">
                <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <div className="flex items-center space-x-3">
                    {searchMenuView === 'filters' && (
                      <button
                        onClick={() => setSearchMenuView('categories')}
                        className={`p-1 rounded transition-colors cursor-pointer ${
                          isDarkMode 
                            ? 'text-zinc-400 hover:text-white' 
                            : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        <ChevronDownIcon className="h-5 w-5 rotate-90" />
                      </button>
                    )}
                    <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                      {searchMenuView === 'categories' ? 'Genel Arama' : `${selectedSearchSubcategory?.name} Filtreleri`}
                    </h3>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => {
                        setIsSearchMenuOpen(false);
                        setSearchMenuView('categories');
                      }}
                      className={`p-2 rounded-full transition-colors cursor-pointer ${
                        isDarkMode 
                          ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                          : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                      }`}
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                <div className="flex-1 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <div className="px-6">
                    {searchMenuView === 'categories' ? (
                      <>
                        {/* Selected Items Display */}
                        {selectedSearchItems.length > 0 && (
                          <div className={`mb-4 p-3 rounded-lg ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`}>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>Seçilenler:</h4>
                              <button
                                onClick={() => setSelectedSearchItems([])}
                                className={`text-xs transition-colors flex items-center space-x-1 cursor-pointer ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'}`}
                              >
                                 <XMarkIcon className="h-3 w-3" />
                                <span>Tümünü Temizle</span>
                              </button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {selectedSearchItems.map((item) => (
                                <div
                                  key={item}
                                  className={`flex items-stretch rounded-full overflow-hidden ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`}
                                >
                                  <span 
                                    onClick={() => canItemHaveFilters(item) && openFilterSettingsForItem(item)}
                                    className={`px-3 py-1.5 text-sm ${isDarkMode ? 'text-white' : 'text-zinc-800'} ${
                                      canItemHaveFilters(item) ? 'cursor-pointer hover:bg-opacity-20 hover:bg-gray-500 transition-colors' : ''
                                    }`}
                                    title={canItemHaveFilters(item) ? "Filtre ayarları" : ""}
                                  >
                                    {item}
                                  </span>
                                  <button 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      removeSelectedSearchItem(item);
                                    }}
                                    className={`px-2 h-full cursor-pointer transition-colors flex items-center ${isDarkMode ? 'hover:bg-red-600 text-zinc-400 hover:text-white' : 'hover:bg-red-500 text-zinc-600 hover:text-white'}`}
                                    title="Kaldır"
                                  >
                                    <XMarkIcon className="h-3 w-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="relative mb-4">
                          <input
                            type="text"
                            placeholder="Ne aramıştınız?"
                            className={`w-full ${isDarkMode ? 'bg-zinc-800 text-white placeholder-zinc-400' : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500'} rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 ${isDarkMode ? 'focus:ring-zinc-700' : 'focus:ring-zinc-200'}`}
                          />
                          <MagnifyingGlassIcon className={`h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`} />
                        </div>

                        {/* Category and Subcategory List */}
                        <div className="mt-4">
                          <h3 className={`text-sm font-medium ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} mb-2`}>Kategoriler</h3>
                          <div className="space-y-1">
                            {fullCategories.map((category) => (
                              <div key={category.id}>
                                <button
                                  onClick={() => handleSearchCategoryClick(category.id, category.name)}
                                  onMouseEnter={() => setHoveredCategory(category.id)}
                                  onMouseLeave={() => setHoveredCategory(null)}
                                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium cursor-pointer flex items-center justify-between group ${
                                    expandedCategory === category.id
                                      ? isDarkMode 
                                        ? 'text-white bg-zinc-800' 
                                        : 'text-zinc-900 bg-zinc-100'
                                      : isDarkMode 
                                        ? 'text-zinc-300 hover:bg-zinc-800 hover:text-white' 
                                        : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900'
                                  }`}
                                >
                                  <div className="flex items-center space-x-2">
                                    {category.icon && <category.icon className="h-4 w-4" />}
                                    <span>{category.name}</span>
                                  </div>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleSelectAll(category.name);
                                    }}
                                    className={`text-xs px-2 py-1 rounded-md cursor-pointer ${
                                      hoveredCategory === category.id ? 'opacity-100' : 'opacity-0'
                                    } ${
                                      isDarkMode 
                                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-700' 
                                        : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200'
                                    }`}
                                  >
                                    Hepsi
                                  </button>
                                </button>
                                {category.subcategories && expandedCategory === category.id && (
                                  <div className="ml-4 mt-1 space-y-1">
                                    {category.subcategories.map((subcategory) => (
                                      <button
                                        key={subcategory.id}
                                        onClick={() => handleSearchSubcategoryClick(subcategory.id, subcategory.name)}
                                        onMouseEnter={() => setHoveredSubcategory(subcategory.id)}
                                        onMouseLeave={() => setHoveredSubcategory(null)}
                                        className={`w-full text-left px-3 py-2 rounded-lg text-sm cursor-pointer flex items-center justify-between ${
                                          isDarkMode 
                                            ? 'text-zinc-400 hover:bg-zinc-800 hover:text-white' 
                                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900'
                                        }`}
                                      >
                                        <div className="flex items-center space-x-2">
                                          {subcategory.icon && <subcategory.icon className="h-4 w-4" />}
                                          <span>{subcategory.name}</span>
                                        </div>
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleSelectAll(subcategory.name);
                                          }}
                                          className={`text-xs px-2 py-1 rounded-md cursor-pointer ${
                                            hoveredSubcategory === subcategory.id ? 'opacity-100' : 'opacity-0'
                                          } ${
                                            isDarkMode 
                                              ? 'text-zinc-400 hover:text-white hover:bg-zinc-700' 
                                              : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-200'
                                          }`}
                                        >
                                          Hepsi
                                        </button>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Filter View */
                      <>
                        {selectedSearchSubcategory?.filters?.map(filter => (
                          <div key={filter.id} className={`mb-6 pb-4 border-b ${isDarkMode ? 'border-zinc-700' : 'border-zinc-200'}`}>
                            <h4 className={`text-sm font-medium mb-3 ${isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`}>
                              {filter.name}
                            </h4>
                            {filter.options ? (
                              <div className="grid grid-cols-2 gap-2">
                                {filter.options.map(option => (
                                  <button
                                    key={option}
                                    onClick={() => handleFilterOptionClick(filter.id, option)}
                                    className={`px-3 py-2 text-sm rounded-lg border cursor-pointer ${
                                      filterData[filter.id]?.includes(option)
                                        ? isDarkMode
                                          ? 'bg-blue-600 border-blue-500 text-white'
                                          : 'bg-blue-500 border-blue-400 text-white'
                                        : isDarkMode 
                                          ? 'border-zinc-600 text-zinc-300 hover:bg-zinc-700 hover:border-zinc-500' 
                                          : 'border-zinc-300 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-400'
                                    }`}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            ) : (
                              <div className="space-y-2">
                                <input
                                  type="text"
                                  placeholder={`${filter.name} girin...`}
                                  value={filterData[filter.id]?.[0] || ''}
                                  onChange={(e) => handleFilterInputChange(filter.id, e.target.value)}
                                  className={`w-full px-3 py-2 text-sm rounded-lg ${
                                    isDarkMode 
                                      ? 'bg-zinc-700 text-white placeholder-zinc-400 border-zinc-600' 
                                      : 'bg-white text-zinc-900 placeholder-zinc-500 border-zinc-300'
                                  } border focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        
                        {/* Save Button */}
                        <div className="mt-6 pt-4">
                          <button
                            onClick={handleSaveFilters}
                            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg cursor-pointer font-medium"
                          >
                            Sakla
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Login/Register Modal */}
      <AnimatePresence>
        {(isLoginModalOpen || isRegisterModalOpen) && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-50"
              onClick={() => {
                setIsLoginModalOpen(false);
                setIsRegisterModalOpen(false);
              }}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 20 }}
              className={`fixed right-0 top-0 h-screen w-96 ${isDarkMode ? 'bg-zinc-900' : 'bg-white'} shadow-lg z-50`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col h-full">
                <div className={`flex items-center justify-between px-6 py-5 border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'}`}>
                  <h3 className={`text-base font-medium ${isDarkMode ? 'text-white' : 'text-zinc-900'}`}>
                    {activeTab === 'login' ? 'Giriş Yap' : 'Kayıt Ol'}
                  </h3>
                  <button 
                    onClick={() => {
                      setIsLoginModalOpen(false);
                      setIsRegisterModalOpen(false);
                    }}
                    className={`p-2 rounded-full transition-colors cursor-pointer ${
                      isDarkMode 
                        ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                        : 'text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex-1 py-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                  <div className="px-6">
                    {/* Tabs */}
                    <div className={`flex border-b ${isDarkMode ? 'border-zinc-800' : 'border-zinc-200'} mb-6`}>
                      <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
                          activeTab === 'login'
                            ? isDarkMode ? 'text-white border-b-2 border-blue-500' : 'text-zinc-900 border-b-2 border-blue-500'
                            : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        Giriş Yap
                      </button>
                      <button
                        onClick={() => setActiveTab('register')}
                        className={`flex-1 py-3 text-sm font-medium transition-colors cursor-pointer ${
                          activeTab === 'register'
                            ? isDarkMode ? 'text-white border-b-2 border-blue-500' : 'text-zinc-900 border-b-2 border-blue-500'
                            : isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-900'
                        }`}
                      >
                        Kayıt Ol
                      </button>
                    </div>

                    {/* Content */}
                    {activeTab === 'login' ? (
                      <form onSubmit={handleLoginSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            E-posta
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={loginForm.email}
                            onChange={handleLoginChange}
                            className={`w-full px-4 py-2 rounded-lg text-sm ${
                              isDarkMode 
                                ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                            } focus:outline-none focus:ring-2`}
                            placeholder="E-posta adresiniz"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Şifre
                          </label>
                          <div className="relative">
                            <input
                              type={showLoginPassword ? "text" : "password"}
                              id="password"
                              name="password"
                              value={loginForm.password}
                              onChange={handleLoginChange}
                              className={`w-full px-4 py-2 rounded-lg text-sm ${
                                isDarkMode 
                                  ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                  : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                              } focus:outline-none focus:ring-2`}
                              placeholder="Şifreniz"
                            />
                            <button
                              type="button"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors cursor-pointer ${
                                isDarkMode 
                                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                              }`}
                            >
                              {showLoginPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <label className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="checkbox"
                              name="rememberMe"
                              checked={loginForm.rememberMe}
                              onChange={handleLoginChange}
                              className={`rounded ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}
                            />
                            <span className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                              Beni hatırla
                            </span>
                          </label>
                          <button
                            type="button"
                            className={`text-sm ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} cursor-pointer`}
                          >
                            Şifremi unuttum
                          </button>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Giriş Yap
                        </button>
                      </form>
                    ) : (
                      <form onSubmit={handleRegisterSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="name" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Ad Soyad
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={registerForm.name}
                            onChange={handleRegisterChange}
                            className={`w-full px-4 py-2 rounded-lg text-sm ${
                              isDarkMode 
                                ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                            } focus:outline-none focus:ring-2`}
                            placeholder="Adınız ve soyadınız"
                          />
                        </div>
                        <div>
                          <label htmlFor="register-email" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            E-posta
                          </label>
                          <input
                            type="email"
                            id="register-email"
                            name="email"
                            value={registerForm.email}
                            onChange={handleRegisterChange}
                            className={`w-full px-4 py-2 rounded-lg text-sm ${
                              isDarkMode 
                                ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                            } focus:outline-none focus:ring-2`}
                            placeholder="E-posta adresiniz"
                          />
                        </div>
                        <div>
                          <label htmlFor="register-password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Şifre
                          </label>
                          <div className="relative">
                            <input
                              type={showRegisterPassword ? "text" : "password"}
                              id="register-password"
                              name="password"
                              value={registerForm.password}
                              onChange={handleRegisterChange}
                              className={`w-full px-4 py-2 rounded-lg text-sm ${
                                isDarkMode 
                                  ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                  : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                              } focus:outline-none focus:ring-2`}
                              placeholder="Şifreniz"
                            />
                            <button
                              type="button"
                              onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors cursor-pointer ${
                                isDarkMode 
                                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                              }`}
                            >
                              {showRegisterPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="confirm-password" className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'}`}>
                            Şifre Tekrar
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              id="confirm-password"
                              name="confirmPassword"
                              value={registerForm.confirmPassword}
                              onChange={handleRegisterChange}
                              className={`w-full px-4 py-2 rounded-lg text-sm ${
                                isDarkMode 
                                  ? 'bg-zinc-800 text-white placeholder-zinc-400 focus:ring-blue-500' 
                                  : 'bg-zinc-100 text-zinc-900 placeholder-zinc-500 focus:ring-blue-400'
                              } focus:outline-none focus:ring-2`}
                              placeholder="Şifrenizi tekrar girin"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors cursor-pointer ${
                                isDarkMode 
                                  ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' 
                                  : 'text-zinc-500 hover:text-zinc-900 hover:bg-zinc-200'
                              }`}
                            >
                              {showConfirmPassword ? (
                                <EyeSlashIcon className="h-5 w-5" />
                              ) : (
                                <EyeIcon className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="terms"
                            name="acceptTerms"
                            checked={registerForm.acceptTerms}
                            onChange={handleRegisterChange}
                            className={`rounded ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-100 border-zinc-300'}`}
                          />
                          <label htmlFor="terms" className={`text-sm ${isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} cursor-pointer`}>
                            <span>Kullanım koşullarını ve gizlilik politikasını kabul ediyorum</span>
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer"
                        >
                          Kayıt Ol
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}