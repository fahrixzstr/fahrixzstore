// ========================================
// FAHRIXZ STORE - PRODUCT DATA
// ========================================

const products = [
{
    id: 1,
    name: 'Dana Premium',
    price: 'Rp35.000',
    harga: 35000,
    category: 'ewallet',
    badge: 'Best Seller',
    desc: 'Upgrade Dana Premium - Limit tinggi',
    image: 'assets/image/products/dana.jpg',
    rating: 4.9,
    reviews: 2847
  },
{
    id: 2,
    name: 'GoPay Plus',
    price: 'Rp42.000',
    harga: 42000,
    category: 'ewallet',
    badge: 'Hot',
    desc: 'Upgrade GoPay Plus - Cashback melimpah',
    image: 'assets/image/products/gopay.jpg',
    rating: 4.8,
    reviews: 1923
  },
{
    id: 3,
    name: 'OVO Premier',
    price: 'Rp38.000',
    harga: 38000,
    category: 'ewallet',
    badge: 'Popular',
    desc: 'Upgrade OVO Premier - Rewards besar',
    image: 'assets/image/products/ovo.jpg',
    rating: 4.7,
    reviews: 1567
  },
{
    id: 4,
    name: 'QRIS Merchant',
    price: 'Rp50.000',
    harga: 50000,
    category: 'qris',
    badge: 'New',
    desc: 'Daftar QRIS (ORDER KUOTA,DANA BISNIS,TOP INDOKU,Dan penyedia Layanan Qris Lainnya',
    image: 'assets/image/products/qris.jpg',
    rating: 4.9,
    reviews: 892
  },
{
    id: 5,
    name: 'Netflix Shared',
    price: 'Rp35.000',
    harga: 35000,
    category: 'streaming',
    badge: 'Best Seller',
    desc: 'Netflix 1 Bulan - Profile private',
    image: 'assets/image/products/netflix.jpg',
    rating: 4.8,
    reviews: 3421
  },
{
    id: 6,
    name: 'Spotify Premium',
    price: 'Rp25.000',
    harga: 25000,
    category: 'streaming',
    badge: 'Popular',
    desc: 'Spotify Premium 1 Bulan - No ads',
    image: 'assets/image/products/spotify.jpg',
    rating: 4.9,
    reviews: 2156
  },
{
    id: 7,
    name: 'ChatGPT Plus',
    price: 'Rp185.000',
    harga: 185000,
    category: 'ai',
    badge: 'Premium',
    desc: 'ChatGPT Plus 1 Bulan - GPT-4 Access',
    image: 'assets/image/products/chatgpt.jpg',
    rating: 4.9,
    reviews: 987
  },
{
    id: 8,
    name: 'Canva Pro',
    price: 'Rp35.000',
    harga: 35000,
    category: 'editing',
    badge: 'Hot',
    desc: 'Canva Pro 1 Bulan - Semua fitur',
    image: 'assets/image/products/canva.jpg',
    rating: 4.7,
    reviews: 1876
  },
{
    id: 9,
    name: 'Edit Video Profesional',
    price: 'Rp150.000',
    harga: 150000,
    category: 'editing',
    badge: 'New',
    desc: 'Jasa edit video - Reels, TikTok, YT',
    image: 'assets/image/products/videoedit.jpg',
    rating: 4.8,
    reviews: 543
  },
{
    id: 10,
    name: 'Edit Foto Profesional',
    price: 'Rp50.000',
    harga: 50000,
    category: 'editing',
    badge: 'Fast Process',
    desc: 'Jasa edit foto - Photoshop, Lightroom',
    image: 'assets/image/products/photoedit.jpg',
    rating: 4.6,
    reviews: 678
  },
{
    id: 11,
    name: 'Jasa Unband Wa (Minta Tinjauan)',
    price: 'Rp30.000',
    harga: 30.000,
    category: 'service',
    badge: 'Limited',
    desc: 'Jasa Unband/Buka Blokir WhatsApp',
    image: 'assets/image/products/WhatsApp1.jpg',
    rating: 4.5,
    reviews: 1234
  },
{
    id: 12,
    name: 'Suntik Followers',
    price: 'Rp30.000',
    harga: 30000,
    category: 'service',
    badge: 'Limited',
    desc: 'Followers real aktif - Bergaransi',
    image: 'assets/image/products/followers.jpg',
    rating: 4.4,
    reviews: 3456
  },
{
    id: 13,
    name: 'ShopeePay Pluss',
    price: 'Rp35.000',
    harga: 35000,
    category: 'ewallet',
    badge: 'Best Seller',
    desc: 'Upgrade ShopePay - Limit tinggi',
    image: 'assets/image/products/shopeepay.jpg',
    rating: 4.1,
    reviews: 2812
    },
{
    id: 14,
    name: 'Link Aja',
    price: 'Rp35.000',
    harga: 35000,
    category: 'ewallet',
    badge: 'Best Seller',
    desc: 'Upgrade Link Aja',
    image: 'assets/image/products/linkaja.jpg',
    rating: 4.9,
    reviews: 2847
 },
{
    id: 15,
    name: 'Bank Jago',
    price: 'Rp60.000',
    harga: 65000,
    category: 'bank',
    badge: 'Trending',
    desc: 'Aktivasi Rekeningi',
    image: 'assets/image/products/jago.jpg',
    rating: 4.9,
    reviews: 29871
  },
{
    id: 16,
    name: 'Seabank',
    price: 'Rp60.000',
    harga: 65000,
    category: 'bank',
    badge: 'Best Seller',
    desc: 'Aktivasi Rekening Digital',
    image: 'assets/image/products/seabnk.jpg',
    rating: 5.0,
    reviews: 28473
  },
{
    id: 17,
    name: 'BRImo',
    price: 'Rp65.000',
    harga: 60000,
    category: 'bank',
    badge: 'Populer',
    desc: 'Aktivasi Rekening BRImo',
    image: 'assets/image/products/brimo.jpg',
    rating: 5.0,
    reviews: 3452
  },
{
    id: 18,
    name: 'Jasa Unband Wa (Daftarkan Nomor Telpon Baru)',
    price: 'Rp75.000',
    harga: 75000,
    category: 'service',
    badge: 'Trending',
    desc: 'Jasa UNBAND/Buka Blokir WhatsApp',
    image: 'assets/image/products/WhatsApp.jpg',
    rating: 5.0,
    reviews: 1275189
  },
{
  id: 19,
  name: 'Adobe Creative Cloud',
  price: 'Rp95.000',
  harga: 95000,
  category: 'editing',
  badge: 'Premium',
  desc: 'Akses Photoshop, Illustrator, Premiere Pro',
  image: 'assets/image/products/adobe.jpg',
  rating: 4.9,
  reviews: 5400
 },
{
  id: 20,
  name: 'Microsoft 365 Family',
  price: 'Rp85.000',
  harga: 85000,
  category: 'cloud',
  badge: 'Best Seller',
  desc: 'Word, Excel, PowerPoint + 1TB OneDrive',
  image: 'assets/image/products/microsoft365.jpg',
  rating: 4.8,
  reviews: 8200
},
{
  id: 21,
  name: 'Google One 2TB',
  price: 'Rp45.000',
  harga: 45000,
  category: 'cloud',
  badge: 'Popular',
  desc: 'Penyimpanan cloud 2TB Google',
  image: 'assets/image/products/googleone.jpg',
  rating: 4.9,
  reviews: 6100
},
{
  id: 22,
  name: 'Apple iCloud+ 200GB',
  price: 'Rp35.000',
  harga: 35000,
  category: 'cloud',
  badge: 'Hot',
  desc: 'Backup iPhone & penyimpanan aman',
  image: 'assets/image/products/icloud.jpg',
  rating: 4.8,
  reviews: 7300
},
{
  id: 23,
  name: 'Dropbox Plus',
  price: 'Rp40.000',
  harga: 40000,
  category: 'cloud',
  badge: 'Trending',
  desc: 'Cloud storage profesional 2TB',
  image: 'assets/image/products/dropbox.jpg',
  rating: 4.7,
  reviews: 3100
},
{
  id: 24,
  name: 'NordVPN Secure',
  price: 'Rp55.000',
  harga: 55000,
  category: 'vpn',
  badge: 'Premium',
  desc: 'VPN keamanan internet global',
  image: 'assets/image/products/nordvpn.jpg',
  rating: 4.8,
  reviews: 9200
},
{
  id: 25,
  name: 'ExpressVPN Ultra',
  price: 'Rp60.000',
  harga: 60000,
  category: 'vpn',
  badge: 'Best Seller',
  desc: 'VPN cepat & aman multi device',
  image: 'assets/image/products/expressvpn.jpg',
  rating: 4.9,
  reviews: 8700
},
{
  id: 26,
  name: 'Discord Nitro',
  price: 'Rp45.000',
  harga: 45000,
  category: 'gaming',
  badge: 'Popular',
  desc: 'Boost Discord server & emoji premium',
  image: 'assets/image/products/discord.jpg',
  rating: 4.7,
  reviews: 6600
},
{
  id: 27,
  name: 'Xbox Game Pass Ultimate',
  price: 'Rp75.000',
  harga: 75000,
  category: 'gaming',
  badge: 'Hot',
  desc: 'Ratusan game Xbox & PC',
  image: 'assets/image/products/xbox.jpg',
  rating: 4.9,
  reviews: 5400
},
{
  id: 28,
  name: 'Notion AI Plus',
  price: 'Rp50.000',
  harga: 50000,
  category: 'ai',
  badge: 'Trending',
  desc: 'AI productivity & workspace tools',
  image: 'assets/image/products/notion.jpg',
  rating: 4.8,
  reviews: 4100
},
{
  id: 29,
  name: 'Grammarly Premium',
  price: 'Rp40.000',
  harga: 40000,
  category: 'ai',
  badge: 'Popular',
  desc: 'Cek grammar & writing assistant',
  image: 'assets/image/products/grammarly.jpg',
  rating: 4.7,
  reviews: 5200
},
{
  id: 30,
  name: 'Canva Pro Team',
  price: 'Rp35.000',
  harga: 35000,
  category: 'editing',
  badge: 'Best Seller',
  desc: 'Desain profesional tanpa batas',
  image: 'assets/image/products/canva.jpg',
  rating: 4.9,
  reviews: 12000
},
{
  id: 31,
  name: 'CapCut Pro',
  price: 'Rp30.000',
  harga: 30000,
  category: 'editing',
  badge: 'Hot',
  desc: 'Editor video tanpa watermark',
  image: 'assets/image/products/capcut.jpg',
  rating: 4.8,
  reviews: 9800
},
{
  id: 32,
  name: 'YouTube Premium',
  price: 'Rp30.000',
  harga: 30000,
  category: 'streaming',
  badge: 'Popular',
  desc: 'YouTube tanpa iklan + background play',
  image: 'assets/image/products/youtube.jpg',
  rating: 4.8,
  reviews: 8400
},
{
  id: 33,
  name: 'Disney+ Hotstar',
  price: 'Rp35.000',
  harga: 35000,
  category: 'streaming',
  badge: 'Hot',
  desc: 'Film & series eksklusif Disney',
  image: 'assets/image/products/disney.jpg',
  rating: 4.7,
  reviews: 7600
},
{
  id: 34,
  name: 'Amazon Prime Video',
  price: 'Rp28.000',
  harga: 28000,
  category: 'streaming',
  badge: 'Best Seller',
  desc: 'Film & series original Amazon',
  image: 'assets/image/products/primevideo.jpg',
  rating: 4.6,
  reviews: 5200
},
{
  id: 35,
  name: 'Apple TV+',
  price: 'Rp30.000',
  harga: 30000,
  category: 'streaming',
  badge: 'Trending',
  desc: 'Konten eksklusif Apple Original',
  image: 'assets/image/products/appletv.jpg',
  rating: 4.7,
  reviews: 3100
},
{
  id: 36,
  name: 'Spotify Family Plan',
  price: 'Rp45.000',
  harga: 45000,
  category: 'streaming',
  badge: 'Popular',
  desc: 'Spotify premium tanpa iklan multi user',
  image: 'assets/image/products/spotify.jpg',
  rating: 4.9,
  reviews: 12500
},
{
  id: 37,
  name: 'Adobe Photoshop',
  price: 'Rp85.000',
  harga: 85000,
  category: 'editing',
  badge: 'Premium',
  desc: 'Editing foto profesional dunia',
  image: 'assets/image/products/photoshop.jpg',
  rating: 4.9,
  reviews: 9800
},
{
  id: 38,
  name: 'Adobe Premiere Pro',
  price: 'Rp90.000',
  harga: 90000,
  category: 'editing',
  badge: 'Premium',
  desc: 'Editing video profesional',
  image: 'assets/image/products/premiere.jpg',
  rating: 4.8,
  reviews: 8700
},
{
  id: 39,
  name: 'Lightroom Premium',
  price: 'Rp35.000',
  harga: 35000,
  category: 'editing',
  badge: 'Hot',
  desc: 'Edit foto profesional mobile',
  image: 'assets/image/products/lightroom.jpg',
  rating: 4.8,
  reviews: 6700
},
{
  id: 40,
  name: 'Figma Pro',
  price: 'Rp45.000',
  harga: 45000,
  category: 'editing',
  badge: 'Trending',
  desc: 'UI/UX design tool profesional',
  image: 'assets/image/products/figma.jpg',
  rating: 4.9,
  reviews: 5400
},
{
  id: 41,
  name: 'Dropbox Business',
  price: 'Rp50.000',
  harga: 50000,
  category: 'cloud',
  badge: 'Popular',
  desc: 'Cloud storage untuk bisnis',
  image: 'assets/image/products/dropbox.jpg',
  rating: 4.7,
  reviews: 4100
},
{
  id: 42,
  name: 'MEGA Pro 2TB',
  price: 'Rp40.000',
  harga: 40000,
  category: 'cloud',
  badge: 'Hot',
  desc: 'Cloud storage enkripsi tinggi',
  image: 'assets/image/products/mega.jpg',
  rating: 4.6,
  reviews: 3900
},
{
  id: 43,
  name: 'TeraBox Premium',
  price: 'Rp25.000',
  harga: 25000,
  category: 'cloud',
  badge: 'Best Seller',
  desc: 'Storage besar gratis iklan',
  image: 'assets/image/products/terabox.jpg',
  rating: 4.5,
  reviews: 2900
},
{
  id: 44,
  name: 'ExpressVPN Secure',
  price: 'Rp60.000',
  harga: 60000,
  category: 'vpn',
  badge: 'Premium',
  desc: 'VPN cepat & aman global',
  image: 'assets/image/products/expressvpn.jpg',
  rating: 4.9,
  reviews: 8100
},
{
  id: 45,
  name: 'NordVPN Ultra',
  price: 'Rp55.000',
  harga: 55000,
  category: 'vpn',
  badge: 'Best Seller',
  desc: 'VPN privasi tingkat tinggi',
  image: 'assets/image/products/nordvpn.jpg',
  rating: 4.8,
  reviews: 9200
},
{
  id: 46,
  name: 'Minecraft Realms',
  price: 'Rp30.000',
  harga: 30000,
  category: 'gaming',
  badge: 'Popular',
  desc: 'Server Minecraft pribadi',
  image: 'assets/image/products/minecraft.jpg',
  rating: 4.7,
  reviews: 6100
},
{
  id: 47,
  name: 'Roblox Premium',
  price: 'Rp25.000',
  harga: 25000,
  category: 'gaming',
  badge: 'Hot',
  desc: 'Robux & fitur premium Roblox',
  image: 'assets/image/products/roblox.jpg',
  rating: 4.6,
  reviews: 7200
},
{
  id: 48,
  name: 'TikTok Boost Service',
  price: 'Rp20.000',
  harga: 20000,
  category: 'service',
  badge: 'Trending',
  desc: 'Boost views & engagement TikTok',
  image: 'assets/image/products/tiktok.jpg',
  rating: 4.5,
  reviews: 15000
},
{
  id: 49,
  name: 'Instagram Growth Service',
  price: 'Rp25.000',
  harga: 25000,
  category: 'service',
  badge: 'Hot',
  desc: 'Growth followers IG organik',
  image: 'assets/image/products/instagram.jpg',
  rating: 4.6,
  reviews: 13200
},
{
  id: 50,
  name: 'AI Voice Generator',
  price: 'Rp40.000',
  harga: 40000,
  category: 'ai',
  badge: 'Trending',
  desc: 'Clone suara pakai AI',
  image: 'assets/image/products/voiceai.jpg',
  rating: 4.7,
  reviews: 3400
},
{
  id: 51,
  name: 'LinkedIn Premium',
  price: 'Rp55.000',
  harga: 55000,
  category: 'subscription',
  badge: 'Professional',
  desc: 'Akses fitur premium LinkedIn',
  image: 'assets/image/products/linkedin.jpg',
  rating: 4.7,
  reviews: 4200
},
{
  id: 54,
  name: 'Duolingo Super',
  price: 'Rp35.000',
  harga: 35000,
  category: 'education',
  badge: 'Hot',
  desc: 'Belajar bahasa tanpa iklan',
  image: 'assets/image/products/duolingo.jpg',
  rating: 4.8,
  reviews: 7800
},
{
  id: 55,
  name: 'Coursera Plus',
  price: 'Rp75.000',
  harga: 75000,
  category: 'education',
  badge: 'Premium',
  desc: 'Kursus online global unlimited',
  image: 'assets/image/products/coursera.jpg',
  rating: 4.9,
  reviews: 3200
},
{
  id: 56,
  name: 'Udemy Course Bundle',
  price: 'Rp45.000',
  harga: 45000,
  category: 'education',
  badge: 'Best Seller',
  desc: 'Bundle kursus digital skill',
  image: 'assets/image/products/udemy.jpg',
  rating: 4.7,
  reviews: 8900
},
{
  id: 57,
  name: 'Zoom Pro',
  price: 'Rp60.000',
  harga: 60000,
  category: 'productivity',
  badge: 'Business',
  desc: 'Meeting online tanpa batas',
  image: 'assets/image/products/zoom.jpg',
  rating: 4.6,
  reviews: 5400
},
{
  id: 58,
  name: 'Google Workspace',
  price: 'Rp85.000',
  harga: 85000,
  category: 'productivity',
  badge: 'Premium',
  desc: 'Email & tools bisnis Google',
  image: 'assets/image/products/googleworkspace.jpg',
  rating: 4.9,
  reviews: 4100
},
{
  id: 59,
  name: 'Microsoft Office 365',
  price: 'Rp80.000',
  harga: 80000,
  category: 'productivity',
  badge: 'Best Seller',
  desc: 'Word, Excel, PowerPoint premium',
  image: 'assets/image/products/office365.jpg',
  rating: 4.8,
  reviews: 9200
},
{
  id: 60,
  name: 'Figma Team Plan',
  price: 'Rp50.000',
  harga: 50000,
  category: 'design',
  badge: 'Trending',
  desc: 'UI/UX design collaboration tool',
  image: 'assets/image/products/figma.jpg',
  rating: 4.9,
  reviews: 6500
},
{
  id: 61,
  name: 'Canva Enterprise',
  price: 'Rp40.000',
  harga: 40000,
  category: 'design',
  badge: 'Hot',
  desc: 'Desain profesional tim',
  image: 'assets/image/products/canva.jpg',
  rating: 4.8,
  reviews: 12000
},
{
  id: 62,
  name: 'Adobe Lightroom Mobile',
  price: 'Rp35.000',
  harga: 35000,
  category: 'editing',
  badge: 'Popular',
  desc: 'Edit foto profesional mobile',
  image: 'assets/image/products/lightroom.jpg',
  rating: 4.7,
  reviews: 7400
},
{
  id: 63,
  name: 'PicsArt Gold',
  price: 'Rp30.000',
  harga: 30000,
  category: 'editing',
  badge: 'Hot',
  desc: 'Edit foto & template premium',
  image: 'assets/image/products/picsart.jpg',
  rating: 4.6,
  reviews: 6800
},
{
  id: 64,
  name: 'CapCut Pro Team',
  price: 'Rp28.000',
  harga: 28000,
  category: 'editing',
  badge: 'Best Seller',
  desc: 'CapCut tanpa watermark + assets',
  image: 'assets/image/products/capcut.jpg',
  rating: 4.8,
  reviews: 9900
},
{
  id: 65,
  name: 'Adobe Illustrator',
  price: 'Rp85.000',
  harga: 85000,
  category: 'design',
  badge: 'Premium',
  desc: 'Desain vektor profesional',
  image: 'assets/image/products/illustrator.jpg',
  rating: 4.9,
  reviews: 5100
},
{
  id: 66,
  name: 'Adobe After Effects',
  price: 'Rp90.000',
  harga: 90000,
  category: 'design',
  badge: 'Premium',
  desc: 'Motion graphic profesional',
  image: 'assets/image/products/aftereffects.jpg',
  rating: 4.8,
  reviews: 4600
},
{
  id: 67,
  name: 'Dropbox Advanced',
  price: 'Rp45.000',
  harga: 45000,
  category: 'cloud',
  badge: 'Popular',
  desc: 'Cloud storage 2TB cepat',
  image: 'assets/image/products/dropbox.jpg',
  rating: 4.7,
  reviews: 3900
},
{
  id: 68,
  name: 'MEGA Cloud Pro',
  price: 'Rp40.000',
  harga: 40000,
  category: 'cloud',
  badge: 'Hot',
  desc: 'Cloud storage encrypted',
  image: 'assets/image/products/mega.jpg',
  rating: 4.6,
  reviews: 3600
},
{
  id: 69,
  name: 'TeraBox Unlimited',
  price: 'Rp25.000',
  harga: 25000,
  category: 'cloud',
  badge: 'Best Seller',
  desc: 'Storage besar unlimited akses',
  image: 'assets/image/products/terabox.jpg',
  rating: 4.5,
  reviews: 2900
},
{
  id: 70,
  name: 'ExpressVPN Ultra Secure',
  price: 'Rp60.000',
  harga: 60000,
  category: 'vpn',
  badge: 'Premium',
  desc: 'VPN super aman global',
  image: 'assets/image/products/expressvpn.jpg',
  rating: 4.9,
  reviews: 8800
},
{
  id: 71,
  name: 'NordVPN Advanced',
  price: 'Rp55.000',
  harga: 55000,
  category: 'vpn',
  badge: 'Best Seller',
  desc: 'VPN privacy protection',
  image: 'assets/image/products/nordvpn.jpg',
  rating: 4.8,
  reviews: 9200
},
{
  id: 72,
  name: 'Surfshark VPN',
  price: 'Rp50.000',
  harga: 50000,
  category: 'vpn',
  badge: 'Trending',
  desc: 'VPN unlimited device',
  image: 'assets/image/products/surfshark.jpg',
  rating: 4.7,
  reviews: 4100
},
{
  id: 73,
  name: 'Minecraft Server Hosting',
  price: 'Rp35.000',
  harga: 35000,
  category: 'gaming',
  badge: 'Popular',
  desc: 'Server Minecraft pribadi',
  image: 'assets/image/products/minecraft.jpg',
  rating: 4.7,
  reviews: 6100
},
{
  id: 74,
  name: 'Roblox Premium Plus',
  price: 'Rp30.000',
  harga: 30000,
  category: 'gaming',
  badge: 'Hot',
  desc: 'Robux & fitur premium',
  image: 'assets/image/products/roblox.jpg',
  rating: 4.6,
  reviews: 7200
},
{
  id: 75,
  name: 'Steam Wallet Topup',
  price: 'Rp50.000',
  harga: 50000,
  category: 'gaming',
  badge: 'Best Seller',
  desc: 'Saldo Steam game global',
  image: 'assets/image/products/steam.jpg',
  rating: 4.8,
  reviews: 8400
},
{
  id: 76,
  name: 'TikTok Growth Booster',
  price: 'Rp25.000',
  harga: 25000,
  category: 'service',
  badge: 'Trending',
  desc: 'Boost engagement TikTok',
  image: 'assets/image/products/tiktok.jpg',
  rating: 4.6,
  reviews: 15000
},
{
  id: 78,
  name: 'YouTube Monetization Service',
  price: 'Rp75.000',
  harga: 75000,
  category: 'service',
  badge: 'Premium',
  desc: 'Bantu monetisasi channel',
  image: 'assets/image/products/youtube.jpg',
  rating: 4.7,
  reviews: 5400
},
{
  id: 79,
  name: 'AI Voice Generator Pro',
  price: 'Rp40.000',
  harga: 40000,
  category: 'ai',
  badge: 'Trending',
  desc: 'Clone suara AI realistis',
  image: 'assets/image/products/voiceai.jpg',
  rating: 4.7,
  reviews: 3400
},
{
  id: 80,
  name: 'Runway AI Video Generator',
  price: 'Rp60.000',
  harga: 60000,
  category: 'ai',
  badge: 'Hot',
  desc: 'Generate video pakai AI',
  image: 'assets/image/products/runway.jpg',
  rating: 4.8,
  reviews: 2900
},
{
  id: 81,
  name: 'Telegram Premium',
  price: 'Rp30.000',
  harga: 30000,
  category: 'subscription',
  badge: 'Popular',
  desc: 'Fitur premium Telegram tanpa batas',
  image: 'assets/image/products/telegram.jpg',
  rating: 4.7,
  reviews: 8200
},
{
  id: 82,
  name: 'Zoom Business Pro',
  price: 'Rp65.000',
  harga: 65000,
  category: 'productivity',
  badge: 'Business',
  desc: 'Meeting online unlimited + tools bisnis',
  image: 'assets/image/products/zoom.jpg',
  rating: 4.6,
  reviews: 5400
},
{
  id: 83,
  name: 'Notion Workspace Pro',
  price: 'Rp50.000',
  harga: 50000,
  category: 'productivity',
  badge: 'Trending',
  desc: 'Workspace produktivitas all-in-one',
  image: 'assets/image/products/notion.jpg',
  rating: 4.8,
  reviews: 6100
},
{
  id: 84,
  name: 'GitHub Copilot',
  price: 'Rp55.000',
  harga: 55000,
  category: 'ai',
  badge: 'Premium',
  desc: 'AI coding assistant profesional',
  image: 'assets/image/products/githubcopilot.jpg',
  rating: 4.9,
  reviews: 4700
},
{
  id: 85,
  name: 'Midjourney AI',
  price: 'Rp60.000',
  harga: 60000,
  category: 'ai',
  badge: 'Hot',
  desc: 'Generate gambar AI realistis & artistik',
  image: 'assets/image/products/midjourney.jpg',
  rating: 4.9,
  reviews: 3900
},
{
  id: 86,
  name: 'Stable Diffusion Pro',
  price: 'Rp45.000',
  harga: 45000,
  category: 'ai',
  badge: 'Trending',
  desc: 'AI image generator open source premium',
  image: 'assets/image/products/stablediffusion.jpg',
  rating: 4.7,
  reviews: 4200
},
{
  id: 87,
  name: 'CapCut Cloud Assets',
  price: 'Rp30.000',
  harga: 30000,
  category: 'editing',
  badge: 'Best Seller',
  desc: 'Template & asset CapCut premium',
  image: 'assets/image/products/capcutassets.jpg',
  rating: 4.8,
  reviews: 9800
},
{
  id: 88,
  name: 'PicsArt Pro Gold',
  price: 'Rp28.000',
  harga: 28000,
  category: 'editing',
  badge: 'Hot',
  desc: 'Edit foto & template premium tanpa batas',
  image: 'assets/image/products/picsart.jpg',
  rating: 4.6,
  reviews: 6700
},
{
  id: 89,
  name: 'Spotify Duo Plan',
  price: 'Rp35.000',
  harga: 35000,
  category: 'streaming',
  badge: 'Popular',
  desc: 'Spotify premium 2 akun',
  image: 'assets/image/products/spotify.jpg',
  rating: 4.8,
  reviews: 9100
},
{
  id: 90,
  name: 'YouTube Music Premium',
  price: 'Rp28.000',
  harga: 28000,
  category: 'streaming',
  badge: 'Hot',
  desc: 'Music tanpa iklan & offline mode',
  image: 'assets/image/products/youtubemusic.jpg',
  rating: 4.7,
  reviews: 7600
},
{
  id: 91,
  name: 'Google Workspace Business',
  price: 'Rp90.000',
  harga: 90000,
  category: 'productivity',
  badge: 'Business',
  desc: 'Email bisnis + storage cloud',
  image: 'assets/image/products/googleworkspace.jpg',
  rating: 4.9,
  reviews: 4300
},
{
  id: 92,
  name: 'Apple Developer Account',
  price: 'Rp150.000',
  harga: 150000,
  category: 'developer',
  badge: 'Premium',
  desc: 'Akses developer Apple resmi',
  image: 'assets/image/products/appledev.jpg',
  rating: 4.8,
  reviews: 2100
},
{
  id: 93,
  name: 'PlayStation Plus',
  price: 'Rp80.000',
  harga: 80000,
  category: 'gaming',
  badge: 'Best Seller',
  desc: 'Game gratis & multiplayer online',
  image: 'assets/image/products/psplus.jpg',
  rating: 4.9,
  reviews: 8700
},
{
  id: 94,
  name: 'Xbox Game Pass PC',
  price: 'Rp70.000',
  harga: 70000,
  category: 'gaming',
  badge: 'Hot',
  desc: 'Ratusan game PC & Xbox',
  image: 'assets/image/products/xboxgamepass.jpg',
  rating: 4.8,
  reviews: 6400
},
{
  id: 95,
  name: 'Steam Wallet 100K',
  price: 'Rp95.000',
  harga: 95000,
  category: 'gaming',
  badge: 'Popular',
  desc: 'Topup saldo Steam global',
  image: 'assets/image/products/steam.jpg',
  rating: 4.8,
  reviews: 9100
},
{
  id: 96,
  name: 'TikTok Ads Service',
  price: 'Rp120.000',
  harga: 120000,
  category: 'service',
  badge: 'Trending',
  desc: 'Setup & optimasi iklan TikTok',
  image: 'assets/image/products/tiktokads.jpg',
  rating: 4.7,
  reviews: 5200
},
{
  id: 97,
  name: 'Instagram Ads Setup',
  price: 'Rp100.000',
  harga: 100000,
  category: 'service',
  badge: 'Hot',
  desc: 'Bantu setup ads Instagram',
  image: 'assets/image/products/instagramads.jpg',
  rating: 4.6,
  reviews: 4800
},
{
  id: 98,
  name: 'WhatsApp Business API Setup',
  price: 'Rp150.000',
  harga: 150000,
  category: 'service',
  badge: 'Premium',
  desc: 'Setup WA API untuk bisnis',
  image: 'assets/image/products/whatsappapi.jpg',
  rating: 4.9,
  reviews: 3100
},
{
  id: 99,
  name: 'AI Content Writer',
  price: 'Rp45.000',
  harga: 45000,
  category: 'ai',
  badge: 'Trending',
  desc: 'Auto generate artikel & caption',
  image: 'assets/image/products/aicontent.jpg',
  rating: 4.7,
  reviews: 5600
},
{
  id: 100,
  name: 'AI Chatbot Builder',
  price: 'Rp65.000',
  harga: 65000,
  category: 'ai',
  badge: 'Hot',
  desc: 'Buat chatbot otomatis bisnis',
  image: 'assets/image/products/aichatbot.jpg',
  rating: 4.8,
  reviews: 4300
},
{
  id: 101,
  name: 'Meta Ads Manager Course',
  price: 'Rp60.000',
  harga: 60000,
  category: 'education',
  badge: 'Trending',
  desc: 'Belajar iklan Facebook & Instagram',
  image: 'assets/image/products/metaads.jpg',
  rating: 4.7,
  reviews: 4100
},
{
  id: 102,
  name: 'Amazon AWS Cloud Credits',
  price: 'Rp85.000',
  harga: 85000,
  category: 'cloud',
  badge: 'Premium',
  desc: 'Kredit cloud AWS untuk developer',
  image: 'assets/image/products/aws.jpg',
  rating: 4.8,
  reviews: 3200
},
{
  id: 103,
  name: 'Google Cloud Platform Credits',
  price: 'Rp90.000',
  harga: 90000,
  category: 'cloud',
  badge: 'Hot',
  desc: 'Kredit GCP untuk project cloud',
  image: 'assets/image/products/gcp.jpg',
  rating: 4.9,
  reviews: 2800
},
{
  id: 104,
  name: 'Azure Cloud Credits',
  price: 'Rp88.000',
  harga: 88000,
  category: 'cloud',
  badge: 'Popular',
  desc: 'Microsoft Azure developer credits',
  image: 'assets/image/products/azure.jpg',
  rating: 4.8,
  reviews: 2500
},
{
  id: 105,
  name: 'Figma Enterprise Team',
  price: 'Rp55.000',
  harga: 55000,
  category: 'design',
  badge: 'Best Seller',
  desc: 'Kolaborasi desain UI/UX profesional',
  image: 'assets/image/products/figma.jpg',
  rating: 4.9,
  reviews: 6900
},
{
  id: 106,
  name: 'Sketch App License',
  price: 'Rp45.000',
  harga: 45000,
  category: 'design',
  badge: 'Trending',
  desc: 'Tool desain UI untuk Mac',
  image: 'assets/image/products/sketch.jpg',
  rating: 4.7,
  reviews: 3100
},
{
  id: 107,
  name: 'Blender Pro Assets Pack',
  price: 'Rp40.000',
  harga: 40000,
  category: 'design',
  badge: 'Hot',
  desc: 'Asset 3D untuk Blender premium',
  image: 'assets/image/products/blender.jpg',
  rating: 4.8,
  reviews: 3700
},
{
  id: 108,
  name: 'Envato Elements',
  price: 'Rp35.000',
  harga: 35000,
  category: 'design',
  badge: 'Popular',
  desc: 'Template desain unlimited',
  image: 'assets/image/products/envato.jpg',
  rating: 4.9,
  reviews: 8200
},
{
  id: 109,
  name: 'Canva Education Pro',
  price: 'Rp25.000',
  harga: 25000,
  category: 'design',
  badge: 'Best Seller',
  desc: 'Canva premium untuk pelajar',
  image: 'assets/image/products/canvaedu.jpg',
  rating: 4.8,
  reviews: 9100
},
{
  id: 110,
  name: 'Notion Templates Pack',
  price: 'Rp20.000',
  harga: 20000,
  category: 'productivity',
  badge: 'Hot',
  desc: 'Template Notion siap pakai',
  image: 'assets/image/products/notion.jpg',
  rating: 4.7,
  reviews: 7400
},
{
  id: 111,
  name: 'Slack Business Pro',
  price: 'Rp50.000',
  harga: 50000,
  category: 'productivity',
  badge: 'Popular',
  desc: 'Komunikasi tim profesional',
  image: 'assets/image/products/slack.jpg',
  rating: 4.8,
  reviews: 5200
},
{
  id: 112,
  name: 'Trello Premium',
  price: 'Rp35.000',
  harga: 35000,
  category: 'productivity',
  badge: 'Trending',
  desc: 'Manajemen project mudah',
  image: 'assets/image/products/trello.jpg',
  rating: 4.7,
  reviews: 4800
},
{
  id: 113,
  name: 'Asana Business Plan',
  price: 'Rp45.000',
  harga: 45000,
  category: 'productivity',
  badge: 'Hot',
  desc: 'Workflow & task management',
  image: 'assets/image/products/asana.jpg',
  rating: 4.8,
  reviews: 3900
},
{
  id: 114,
  name: 'Monday.com Pro',
  price: 'Rp60.000',
  harga: 60000,
  category: 'productivity',
  badge: 'Premium',
  desc: 'Project management enterprise',
  image: 'assets/image/products/monday.jpg',
  rating: 4.9,
  reviews: 3100
},
{
  id: 115,
  name: 'GitHub Pro Account',
  price: 'Rp55.000',
  harga: 55000,
  category: 'developer',
  badge: 'Trending',
  desc: 'Repository unlimited private',
  image: 'assets/image/products/github.jpg',
  rating: 4.8,
  reviews: 6200
},
{
  id: 116,
  name: 'Docker Pro Subscription',
  price: 'Rp65.000',
  harga: 65000,
  category: 'developer',
  badge: 'Hot',
  desc: 'Container development tools',
  image: 'assets/image/products/docker.jpg',
  rating: 4.7,
  reviews: 3400
},
{
  id: 117,
  name: 'JetBrains All Products Pack',
  price: 'Rp80.000',
  harga: 80000,
  category: 'developer',
  badge: 'Premium',
  desc: 'IDE coding lengkap',
  image: 'assets/image/products/jetbrains.jpg',
  rating: 4.9,
  reviews: 2900
},
{
  id: 118,
  name: 'Postman Pro',
  price: 'Rp40.000',
  harga: 40000,
  category: 'developer',
  badge: 'Best Seller',
  desc: 'API testing tools premium',
  image: 'assets/image/products/postman.jpg',
  rating: 4.8,
  reviews: 4100
},
{
  id: 119,
  name: 'Digital Ocean Credits',
  price: 'Rp70.000',
  harga: 70000,
  category: 'cloud',
  badge: 'Hot',
  desc: 'Cloud server developer credits',
  image: 'assets/image/products/digitalocean.jpg',
  rating: 4.8,
  reviews: 3000
},
{
  id: 120,
  name: 'Heroku Pro Plan',
  price: 'Rp50.000',
  harga: 50000,
  category: 'cloud',
  badge: 'Trending',
  desc: 'Deploy aplikasi cloud mudah',
  image: 'assets/image/products/heroku.jpg',
  rating: 4.7,
  reviews: 2800
}
];

// Product Badge Colors
function getBadgeColor(badge) {
  const colors = {
    'Best Seller': '#00d9ff',
    'Popular': '#667eea',
    'Premium': '#f59e0b',
    'Fast Process': '#22c55e',
    'Hot': '#ef4444',
    'New': '#22c55e',
    'Limited': '#a855f7'
  };
  return colors[badge] || '#00d9ff';
}

// Render Products
function renderProducts(productList) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  grid.style.display = 'grid';
  grid.innerHTML = productList.map((p, i) => `
    <div class="product-card" style="animation-delay:${i * 0.05}s">
      <div class="image-wrapper">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/image/placeholder.jpg'" loading="lazy">
        <span class="badge badge-${p.badge.toLowerCase().replace(/\s+/g, '-')}">${p.badge}</span>
        <button class="wishlist-btn" onclick="toggleWishlistItem(${p.id})" aria-label="Add to wishlist">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p style="color:var(--text-secondary);font-size:12px;margin-bottom:8px">${p.desc}</p>
        <div class="rating">
          <span class="rating-stars">★★★★★</span>
          <span class="rating-count">(${p.reviews.toLocaleString()})</span>
        </div>
        <div class="price-row">
          <span class="price">${p.price}</span>
        </div>
        <button class="order-btn" onclick="openOrderModal('${p.name}', '${p.price}')">
          Order Sekarang
        </button>
      </div>
    </div>
`).join('');

  const skeleton = document.getElementById('skeletonLoader');
  if (skeleton) {
    skeleton.style.display = 'none';
  }
}

// Filter Products
function filterProducts(category) {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  const filtered = category === 'all' ? products : products.filter(p => p.category === category);
  renderProducts(filtered);
}

// Search Products
function searchProducts() {
  const keyword = (document.getElementById('searchInput')?.value || '').toLowerCase();
  if (!keyword) {
    renderProducts(products);
    return;
  }
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(keyword) ||
    p.category.toLowerCase().includes(keyword) ||
    p.desc.toLowerCase().includes(keyword)
  );
  renderProducts(filtered);
}

// Wishlist
let wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');

function toggleWishlistItem(id) {
  const idx = wishlist.indexOf(id);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Dihapus dari wishlist', 'success');
  } else {
    wishlist.push(id);
    showToast('Ditambahkan ke wishlist', 'success');
  }
  localStorage.setItem('wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistCount');
  if (badge) {
    badge.textContent = wishlist.length;
    badge.classList.toggle('hidden', wishlist.length === 0);
  }
}

// Order Modal
let currentOrder = {};

function openOrderModal(name, price) {
  const orderId = generateOrderId();
  currentOrder = { name, price, id: orderId };

  const modalProduct = document.getElementById('modalProduct');
  const modalPrice = document.getElementById('modalPrice');
  const modalOrderId = document.getElementById('modalOrderId');
  const modal = document.getElementById('orderModal');

  if (modalProduct) modalProduct.textContent = name;
  if (modalPrice) modalPrice.textContent = price;
  if (modalOrderId) modalOrderId.textContent = orderId;
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeOrderModal() {
  const modal = document.getElementById('orderModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function sendOrderToWhatsApp() {
  const adminNumber = '6285609949819';
  const message = encodeURIComponent(
    `📦 *PESANAN BARU*\n\n` +
    `🛒 Produk : ${currentOrder.name}\n` +
    `💰 Harga : ${currentOrder.price}\n` +
    `📦 Quantity : x1\n` +
    `🆔 ID : ${currentOrder.id}\n\n` +
    `Mohon segera diproses ya kak.`
  );
  window.open(`https://wa.me/${adminNumber}?text=${message}`, '_blank');
  showToast('Mengarahkan ke WhatsApp...', 'success');
  closeOrderModal();
}

function generateOrderId() {
  const prefix = 'FXZ-ID';
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.random().toString(36).toUpperCase().slice(-4);
  return prefix + timestamp + random;
}

// Close modal on background click
document.addEventListener('click', (e) => {
  const modal = document.getElementById('orderModal');
  if (e.target === modal) closeOrderModal();
});

console.log("✅ Product.js loaded!");
