// js/product.js
// Products Data - FahriXZ Store

const categories = [
  {id:'all',name:'Semua'},
  {id:'ewallet',name:'E-Wallet'},
  {id:'bank',name:'Bank Digital'},
  {id:'qris',name:'QRIS'},
  {id:'streaming',name:'Streaming'},
  {id:'music',name:'Music'},
  {id:'ai',name:'AI Tools'},
  {id:'editing',name:'Editing'},
  {id:'design',name:'Design'},
  {id:'cloud',name:'Cloud'},
  {id:'vpn',name:'VPN'},
  {id:'gaming',name:'Gaming'},
  {id:'service',name:'Jasa Digital'}
];

const products = [
  /* E-WALLET (7) */
  {name:'Dana Bisnis',price:'35K',category:'ewallet',badge:'Best Seller',image:'assets/image/e-wallet/dana-bisnis.jpg',desc:'Upgrade Dana Bisnis instan'},
  {name:'Dana Premium',price:'35K',category:'ewallet',badge:'Popular',image:'assets/image/e-wallet/dana-premium.jpg',desc:'Upgrade Dana Premium cepat'},
  {name:'Link Aja',price:'35K',category:'ewallet',badge:'Popular',image:'assets/image/e-wallet/linkaja.jpg',desc:'Upgrade LinkAja unlimited'},
  {name:'Doku',price:'35K',category:'ewallet',badge:'Fast Process',image:'assets/image/e-wallet/doku.jpg',desc:'Doku merchant register'},
  {name:'Shopee Pay',price:'35K',category:'ewallet',badge:'Best Seller',image:'assets/image/e-wallet/shopeepay.jpg',desc:'ShopeePay upgrade instant'},
  {name:'Gopay',price:'35K',category:'ewallet',badge:'Best Seller',image:'assets/image/e-wallet/gopay.jpg',desc:'Gopay upgrade cepat'},
  {name:'Ovo',price:'35K',category:'ewallet',badge:'Popular',image:'assets/image/e-wallet/ovo.jpg',desc:'OVO Gold instant'},

  /* BANK DIGITAL (6) */
  {name:'Bank Jago',price:'60K',category:'bank',badge:'Best Seller',image:'assets/image/Bank/jago.jpg',desc:'Rekening Jago langsung jadi'},
  {name:'Blu by BCA',price:'60K',category:'bank',badge:'Popular',image:'assets/image/Bank/blu.jpg',desc:'Blu BCA instant'},
  {name:'Livin by Mandiri',price:'60K',category:'bank',badge:'Best Seller',image:'assets/image/Bank/livin.jpg',desc:'Livin Mandiri activate'},
  {name:'Bank BCA',price:'60K',category:'bank',badge:'Popular',image:'assets/image/Bank/bca.jpg',desc:'BCA KlikBCA upgrade'},
  {name:'Bank BRI',price:'60K',category:'bank',badge:'Popular',image:'assets/image/Bank/bri.jpg',desc:'BRImo activate'},
  {name:'BSI Mobile',price:'60K',category:'bank',badge:'Fast Process',image:'assets/image/Bank/bsi.jpg',desc:'BSI Mobile register'},

  /* QRIS (5) */
  {name:'Order Kuota',price:'45K',category:'qris',badge:'Best Seller',image:'assets/image/QRIS/orderkuota.jpg',desc:'Order Kuota QRIS'},
  {name:'Top Indoku',price:'45K',category:'qris',badge:'Popular',image:'assets/image/QRIS/topindoku.jpg',desc:'Indoku merchant register'},
  {name:'Merchant BRI',price:'45K',category:'qris',badge:'Popular',image:'assets/image/QRIS/merchantbri.jpg',desc:'QRIS BRI merchant'},
  {name:'Gopay Merchant',price:'45K',category:'qris',badge:'Best Seller',image:'assets/image/e-wallet/gopay.jpg',desc:'Gopay Merchant activate'},
  {name:'Shopee Pay Partner',price:'45K',category:'qris',badge:'Best Seller',image:'assets/image/e-wallet/shopeepay.jpg',desc:'Shopee Partner join'},

  /* STREAMING (7) */
  {name:'Netflix',price:'35K',category:'streaming',badge:'Best Seller',image:'assets/image/netflix.jpg',desc:'Netflix 1 bulan premium'},
  {name:'YouTube Premium',price:'20K',category:'streaming',badge:'Best Seller',image:'assets/image/youtubepremium.jpg',desc:'YouTube Premium 1 bulan'},
  {name:'Disney+ Hotstar',price:'30K',category:'streaming',badge:'Popular',image:'assets/image/disney.jpg',desc:'Disney+ Hotstar 1 bulan'},
  {name:'Prime Video',price:'20K',category:'streaming',badge:'Popular',image:'assets/image/primevideo.jpg',desc:'Prime Video subscription'},
  {name:'LokLok VIP',price:'15K',category:'streaming',badge:'Best Seller',image:'assets/image/loklok.jpg',desc:'LokLok VIP 1 bulan'},
  {name:'Vidio Platinum',price:'25K',category:'streaming',badge:'Popular',image:'assets/image/vidio.jpg',desc:'Vidio Platinum aktif'},
  {name:'Spotify Premium',price:'25K',category:'music',badge:'Popular',image:'assets/image/spotify.jpg',desc:'Spotify Premium 1 bulan'},

  /* AI TOOLS (5) */
  {name:'ChatGPT Plus',price:'50K',category:'ai',badge:'Best Seller',image:'assets/image/ai/chatgpt.jpg',desc:'ChatGPT Plus 1 bulan'},
  {name:'Midjourney',price:'90K',category:'ai',badge:'Premium',image:'assets/image/ai/midjourney.jpg',desc:'Midjourney unlimited'},
  {name:'Claude Pro',price:'80K',category:'ai',badge:'Popular',image:'assets/image/ai/claude.jpg',desc:'Claude Pro subscription'},
  {name:'Perplexity Pro',price:'70K',category:'ai',badge:'Hot',image:'assets/image/ai/perplexity.jpg',desc:'Perplexity Pro 1 bulan'},
  {name:'Notion AI',price:'50K',category:'ai',badge:'Popular',image:'assets/image/ai/notionai.jpg',desc:'Notion AI workspace'},

  /* EDITING/DESIGN (6) */
  {name:'Canva Pro',price:'10K',category:'design',badge:'Best Seller',image:'assets/image/canva.jpg',desc:'Canva Pro 1 bulan'},
  {name:'CapCut Pro',price:'25K',category:'editing',badge:'Best Seller',image:'assets/image/capcut.jpg',desc:'CapCut Pro subscription'},
  {name:'Alight Motion',price:'20K',category:'editing',badge:'Popular',image:'assets/image/am.jpg',desc:'Alight Motion premium'},
  {name:'KineMaster Premium',price:'20K',category:'editing',badge:'Popular',image:'assets/image/kinemaster.jpg',desc:'KineMaster Premium'},
  {name:'Filmora Premium',price:'45K',category:'editing',badge:'Premium',image:'assets/image/filmora.jpg',desc:'Filmora all effects'},
  {name:'Lightroom Premium',price:'35K',category:'editing',badge:'Best Seller',image:'assets/image/lightroom.jpg',desc:'Lightroom All Plans'},

  /* CLOUD (5) */
  {name:'Google One',price:'25K',category:'cloud',badge:'Best Seller',image:'assets/image/googleone.jpg',desc:'Google One 100GB'},
  {name:'iCloud+',price:'30K',category:'cloud',badge:'Popular',image:'assets/image/icloud.jpg',desc:'iCloud+ 200GB'},
  {name:'Dropbox Premium',price:'45K',category:'cloud',badge:'Premium',image:'assets/image/dropbox.jpg',desc:'Dropbox 3TB'},
  {name:'MEGA Premium',price:'40K',category:'cloud',badge:'Fast Process',image:'assets/image/mega.jpg',desc:'MEGA 1TB unlimited'},
  {name:'Terabox Premium',price:'20K',category:'cloud',badge:'Murah',image:'assets/image/terabox.jpg',desc:'Terabox 1TB'},

  /* VPN (2) */
  {name:'NordVPN',price:'35K',category:'vpn',badge:'Premium',image:'assets/image/nordvpn.jpg',desc:'NordVPN 1 tahun'},
  {name:'ExpressVPN',price:'40K',category:'vpn',badge:'Best Seller',image:'assets/image/expressvpn.jpg',desc:'ExpressVPN 1 tahun'},

  /* GAMING (2) */
  {name:'Discord Nitro',price:'45K',category:'gaming',badge:'Popular',image:'assets/image/nitro.jpg',desc:'Discord Nitro 1 bulan'},
  {name:'Minecraft Realms',price:'30K',category:'gaming',badge:'Best Seller',image:'assets/image/minecraft.jpg',desc:'Minecraft Realm 1 bulan'},

  /* JASA DIGITAL (14) */
  {name:'Suntik Followers,Like,Share, Favorite,Coment Sosial Media',price:'25K',category:'service',badge:'Best Seller',image:'assets/image/edit-tiktok.jpg',desc:'Nominal Nya Req aja di chat,harga yang ada di katalog jasa suntik bukan harga asli,chat admin untuk info lebih lanjut'},
  {name:'Edit Poster',price:'20K',category:'service',badge:'Popular',image:'assets/image/edit1.jpg',desc:'Desain poster menarik'},
  {name:'Edit Banner',price:'25K',category:'service',badge:'Best Seller',image:'assets/image/edit1.jpg',desc:'Banner social media'},
  {name:'Edit Logo',price:'35K',category:'service',badge:'Premium',image:'assets/image/edit1.jpg',desc:'Logo profesional'},
  {name:'Edit Motion Graphic',price:'75K',category:'service',badge:'Premium',image:'assets/image/motiongraphic.jpg',desc:'Motion graphics 30dtk'},
  {name:'Jasa Prompt AI',price:'25K',category:'service',badge:'Popular',image:'assets/image/promptai.jpg',desc:'Prompt ChatGPT/MJ'},
  {name:'Jasa Generate Gambar AI',price:'30K',category:'service',badge:'Best Seller',image:'assets/image/edit1.jpg',desc:'Generate gambar AI'},
  {name:'Jasa Voice AI',price:'40K',category:'service',badge:'Premium',image:'assets/image/voiceai.jpg',desc:'Voice cloning AI'},
  {name:'Jasa Create Script Bot WhatsApp',price:'100K',category:'service',badge:'Hot',image:'assets/image/chatbot.jpg',desc:'Chatbot interaktif'},
  {name:'Jasa Buat Website Store',price:'250K',category:'service',badge:'Premium',image:'assets/image/web-store.jpg',desc:'Full website e-commerce'},
  {name:'Jasa Landing Page',price:'150K',category:'service',badge:'Best Seller',image:'assets/image/landingpage.jpg',desc:'Landing page menarik'},
  {name:'Jasa Edit HTML CSS',price:'50K',category:'service',badge:'Popular',image:'assets/image/htmlcss.jpg',desc:'Edit kode web'},
  {name:'Jasa Setup Firebase',price:'100K',category:'service',badge:'Premium',image:'assets/image/firebase.jpg',desc:'Setup Firebase lengkap'}
];

console.log(`📦 Total Products: ${products.length}`);
