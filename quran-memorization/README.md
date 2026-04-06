# 📖 Kuran Ezber Platformu

Kuran-ı Kerim ezberleme sürecini kolaylaştırmak için tasarlanmış kapsamlı bir web uygulaması. Öğrenme, pekiştirme, unutmayı engelleme ve takip ihtiyaçlarına yönelik 9 temel özellik sunar.

## ✨ Özellikler

### 1. 📅 Seviyeye Göre Dinamik Ezber Planlaması

**Sıfırdan Başlayanlar İçin:**
- Günlük sayfa/ayet hedefi belirleme
- Otomatik bitiş tarihi hesaplama
- Kişiselleştirilmiş günlük program oluşturma

**Ezberi Bozulmuş/Kayıp Olanlar İçin:**
- Bilinen sureleri işaretleme
- Sadece zayıf kısımlar için tamir programı
- Hızlı yeniden kazanım stratejisi

### 2. 🔄 Akıllı Tekrar (Muracaat) Sistemi

- **Otomatik Tekrar Programı:** 1. gün, 3. gün, 7. gün, 15. gün ve 1 ay sonra
- **Tekrar Temizleme:** Günlük tekrarları yaparak listeyi temizleme
- **Otomatik Taşıma:** Yapılmayan tekrarlar bir sonraki güne taşınır
- **Unutma Eğrisi:** Bilimsel aralıklarla pekiştirme

### 3. 🎤 Çift Yönlü Sesli Dinleme ve Kapatma (Mascat) Modu

**Kıraat Esnasında:**
- Ünlü hocalardan ses seçimi (Mishary Rashid Alafasy, Abdul Basit, vb.)
- Sadece dinleme modu
- Hız kontrolü ve loop özelliği

**Kendini Dinleme Modu:**
- Mikrofon ile kendi sesini kaydetme
- Kaydı geri dinleyerek hata tespiti
- Harf, tecvid ve kıraat kontrolü

### 4. ⚠️ Hata Tespiti ve İşaretleme

- **Tek Tuşla İşaretleme:** Tıkandığınız yeri anında işaretleyin
- **Zayıf Ezberler Havuzu:** Hatalı kısımlar ayrı havuzda toplanır
- **Öncelikli Tekrar:** Zayıf bölümler daha sık tekrar edilir
- **Hata Analizi:** En çok hangi surede/hangi tür hata yapıyorsunuz?

### 5. 👁️ Kısmi Gizleme (Ezber Testi) Yöntemi

**Gizleme Modları:**
- Sonu Gizle (başlangıcı biliyorum)
- Başlangıcı Gizle (sonunu biliyorum)
- Ortayı Gizle
- Rastgele Gizle

**Ayarlanabilir Seviye:**
- 1-5 arası gizleme yoğunluğu
- İpucu seviyesi kontrolü
- Kademeli zorluk artırma

### 6. 🔗 Bağlam (Sırb) Takibi

- **Ayet Öncesi/Sonrası:** Bağlantılı ayetleri gösterme
- **Konu Bağlantısı:** Neyin hikayesine geçtiğini hatırlatma
- **Tema Takibi:** Sure içindeki tema değişimleri
- **Hikaye Akışı:** Manaya dayalı ezberleme
- **Geçiş İpuçları:** Ayetler arası köprüler kurma

### 7. 🌉 Ezber Köprüsü (Cüz Bağlama)

- **Otomatik Köprü Metinleri:** Cüz sonu + yeni cüz başı
- **Kopukluk Önleme:** Cüz geçişlerinde ezber kaybını engelleme
- **Köprü Pratiği:** Geçiş bölgeleri için özel tekrar
- **İlerleme Takibi:** 30 cüz için görsel ilerleme çubuğu
- **Başarı Rozetleri:** Her 5 cüzde bir ödül

### 8. 📊 Kişisel İstikrar ve İstatistik Takibi

**Anlık Sorulara Cevaplar:**
- Bu ay kaç sayfa yeni ezberledim?
- Kaç gün üst üste tekrarımı yaptım?
- En çok hangi cüzde/surede hata yapıyorum?

**Grafikler ve Raporlar:**
- Pasta grafik: Sayfa dağılımı
- Çubuk grafik: Haftalık ilerleme
- Çizgi grafik: Aylık trend
- İstikrar takvimi: GitHub contribution benzeri görünüm
- Sure bazlı istatistikler

**Başarı Sistemi:**
- Rozetler ve başarımlar
- Seri gün takibi
- Topluluk karşılaştırması

### 9. 🎁 Hatim Bağışı / Hediye Ezber Modülü

**Bağış Türleri:**
- Vefat eden yakınlar için (ruhuna hediye)
- Yaşayan biri için (hediye olarak)
- Genel sadaka (içinizden geldiği için)

**Özellikler:**
- Sanal hatim defteri
- Cüz bazlı ilerleme takibi
- Topluluk hatimlerine katılım
- Sertifika oluşturma ve indirme
- Paylaşım özellikleri

## 🛠️ Teknik Detaylar

### Kullanılan Teknolojiler
- **Frontend:** React 19
- **Build Tool:** Vite
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **Charts:** Chart.js + react-chartjs-2
- **Date Handling:** date-fns
- **Styling:** CSS3 (Modern, Responsive)

### Kurulum

```bash
# Bağımlılıkları yükle
cd quran-memorization
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build oluştur
npm run build

# Build'i önizle
npm run preview
```

### Proje Yapısı

```
quran-memorization/
├── src/
│   ├── App.jsx                 # Ana uygulama ve routing
│   ├── index.css               # Global stiller
│   ├── main.jsx                # Uygulama giriş noktası
│   └── pages/                  # Sayfa bileşenleri
│       ├── Dashboard.jsx       # Ana sayfa
│       ├── MemorizationPlan.jsx
│       ├── MuracaatSystem.jsx
│       ├── AudioPractice.jsx
│       ├── ErrorTracking.jsx
│       ├── PartialHide.jsx
│       ├── ContextTracker.jsx
│       ├── JuzBridge.jsx
│       ├── Statistics.jsx
│       └── HatimDonation.jsx
├── public/                     # Statik dosyalar
├── package.json
└── vite.config.js
```

## 📱 Responsive Tasarım

Uygulama tüm cihazlarda sorunsuz çalışır:
- 📱 Mobil (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Büyük Ekran (1400px+)

## 🎨 Renk Paleti

- **Primary:** #1e3a5f (Koyu Mavi)
- **Secondary:** #2d5a87 (Orta Mavi)
- **Success:** #4CAF50 (Yeşil)
- **Warning:** #FF9800 (Turuncu)
- **Danger:** #f44336 (Kırmızı)
- **Background:** #f5f7fa (Açık Gri)

## 🚀 Gelecek Özellikler

- [ ] Backend entegrasyonu (kullanıcı hesapları)
- [ ] Veritabanı desteği (ileri düzey veri saklama)
- [ ] AI destekli hata tespiti
- [ ] Sosyal özellikler (arkadaş ekleme, yarışmalar)
- [ ] Offline mod (PWA)
- [ ] Çoklu dil desteği
- [ ] Ses tanıma ile otomatik hata tespiti
- [ ] Canlı ders ve hoca bağlantısı

## 📝 Lisans

Bu proje eğitim amaçlı geliştirilmiştir.

## 🤝 Katkıda Bulunma

Geliştirmelere katkıda bulunmak için:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/YeniOzellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'i push edin (`git push origin feature/YeniOzellik`)
5. Pull Request açın

## 📞 İletişim

Sorularınız ve önerileriniz için lütfen issue açın.

---

**Allah kabul etsin! 🤲**

*"Andolsun, biz Kur'an'ı öğüt alıp düşünesiniz diye kolaylaştırdık."*  
(Kamer Suresi, 17. Ayet)
