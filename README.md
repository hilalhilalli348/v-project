# Videoland - Modular Video Sharing Platform

Modern, modular ve ölçeklenebilir bir video paylaşım platformu. Next.js 15, TypeScript, Tailwind CSS ve Framer Motion kullanılarak geliştirilmiştir.

## 🏗️ Modular Mimari

Proje, temiz kod prensipleri ve ayrılmış endişeler (separation of concerns) prensibi ile yeniden yapılandırılmıştır:

### 📁 Klasör Yapısı

```
app/
├── components/           # Yeniden kullanılabilir UI bileşenleri
│   ├── ActionButtons.tsx # Beğeni, yorum, paylaş butonları
│   ├── Comments.tsx      # Yorum bileşeni  
│   ├── Navbar.tsx        # Navigasyon bileşeni
│   ├── VideoCard.tsx     # Video kart bileşeni (mobil/masaüstü)
│   ├── VideoGrid.tsx     # Video ızgara düzeni
│   ├── VideoModal.tsx    # Video detay modal'ı
│   ├── VideoPlayer.tsx   # Video oynatıcı bileşeni
│   └── index.ts          # Bileşen export'ları
├── context/              # React Context sağlayıcıları
│   └── ThemeContext.tsx  # Tema yönetimi
├── data/                 # Mock veri ve API işlemleri
│   └── mockData.ts       # Örnek video verileri
├── hooks/                # Özel React hook'ları
│   ├── useModal.ts       # Modal durum yönetimi
│   ├── useScrollEffect.ts # Scroll etkisi hook'u
│   └── useVideoPosts.ts  # Video gönderileri yönetimi
├── types/                # TypeScript tip tanımları
│   └── index.ts          # Ana tip tanımları
├── utils/                # Yardımcı fonksiyonlar
│   └── formatters.ts     # Sayı/metin formatlama fonksiyonları
├── globals.css           # Global CSS stilleri
├── layout.tsx           # Ana layout bileşeni
└── page.tsx             # Ana sayfa bileşeni
```

### 🔧 Temel Bileşenler

#### 1. VideoCard
- **Amaç**: Video içeriklerini görüntülemek
- **Özellikler**: Mobil ve masaüstü varyantları, hover efektleri, aksiyon butonları
- **Kullanım**: Hem mobil hem masaüstü düzenlerinde kullanılabilir

#### 2. VideoGrid
- **Amaç**: Video kartlarını responsive düzende göstermek
- **Özellikler**: Otomatik grid düzeni, responsive tasarım

#### 3. VideoModal
- **Amaç**: Video detaylarını modal içinde göstermek
- **Özellikler**: Video navigasyonu, detay bilgileri, yorum entegrasyonu

#### 4. ActionButtons
- **Amaç**: Beğeni, yorum ve paylaş işlemlerini yönetmek
- **Özellikler**: Farklı boyutlar, hover animasyonları

### 🎯 Custom Hook'lar

#### useVideoPosts
- Video gönderileri durum yönetimi
- Beğeni işlemi
- Post bulma işlemleri

#### useModal
- Modal açma/kapama durumları
- Video ve yorum modal'larını yönetme

#### useScrollEffect
- Scroll olaylarını dinleme
- Navbar'da scroll efektleri için

### 📱 Responsive Tasarım

- **Mobil**: Dikey video listesi (TikTok benzeri)
- **Masaüstü**: Grid düzeni (2-4 sütun)
- **Tablet**: Otomatik uyarlanabilir düzen

## 🚀 Teknolojiler

- **Next.js 15** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animasyonlar
- **React Player** - Video oynatma
- **Lucide React** - Modern icon kütüphanesi

## 📦 Kurulum

```bash
# Proje bağımlılıklarını yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Production sunucusunu başlat
npm start
```

## 🎨 Özellikler

### ✅ Tamamlanan
- ✅ Modular bileşen yapısı
- ✅ TypeScript tip güvenliği
- ✅ Custom hook'lar ile logic ayrımı
- ✅ Responsive tasarım
- ✅ Dark/Light tema desteği
- ✅ Video oynatma ve kontrolleri
- ✅ Beğeni sistemi
- ✅ Yorum sistemi
- ✅ Modal yapısı
- ✅ Navbar kategorileri
- ✅ Animasyonlar ve geçişler
- ✅ Lucide iconlar ile modern UI

### 🔄 Geliştirme Süreci
- 🔄 API entegrasyonu
- 🔄 Kullanıcı kimlik doğrulama
- 🔄 Video yükleme sistemi
- 🔄 Gerçek zamanlı bildirimler
- 🔄 Arama ve filtreleme

## 📊 Kod Kalitesi

- **Temiz Kod**: Her bileşen tek sorumluluk prensibine uyar
- **Tip Güvenliği**: %100 TypeScript coverage
- **Yeniden Kullanılabilirlik**: Modular bileşen yapısı
- **Performans**: Lazy loading, memoization
- **Bakım Kolaylığı**: Açık klasör yapısı ve dokümantasyon

## 🔍 Geliştirme Notları

### Hydration Hataları
- Nested button elementleri düzeltildi
- HTML semantic kurallarına uygun yapı

### Icon Kütüphanesi Değişikliği
- Heroicons'dan Lucide React'e geçiş yapıldı
- Daha modern ve zengin icon seçenekleri
- Tutarlı tasarım ve daha iyi performans

### Performans Optimizasyonları
- Dynamic import'lar ile code splitting
- React Player lazy loading
- Framer Motion optimizasyonları

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
