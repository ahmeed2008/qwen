import React, { useState } from 'react';
import { Gift, Heart, Users, BookOpen, CheckCircle, TrendingUp } from 'lucide-react';

const HatimDonation = () => {
  const [donationType, setDonationType] = useState('deceased'); // deceased, living, general
  const [donorName, setDonorName] = useState('');
  const [dedicatedTo, setDedicatedTo] = useState('');
  const [completedJuz, setCompletedJuz] = useState([]);

  const donationStats = {
    totalHatims: 1247,
    activeUsers: 89,
    completedThisMonth: 34
  };

  const toggleJuz = (juz) => {
    if (completedJuz.includes(juz)) {
      setCompletedJuz(completedJuz.filter(j => j !== juz));
    } else {
      setCompletedJuz([...completedJuz, juz]);
    }
  };

  return (
    <div className="hatim-donation">
      <h1>🎁 Hatim Bağışı / Hediye Ezber Modülü</h1>
      
      <div className="donation-intro">
        <p>
          Sadece kendi ezberiniz için değil, vefat etmiş bir yakınınız için veya 
          içinden geldiği için bir "Hatim Bağışı" başlatın. Sistem, sizin adınıza 
          sanal bir hatim defteri tutar ve her tamamlanan cüz/sure onun hediye 
          listesine işlenir.
        </p>
      </div>

      <div className="donation-stats">
        <div className="stat-card">
          <BookOpen size={32} />
          <div>
            <h3>Toplam Hatim</h3>
            <p className="number">{donationStats.totalHatims}</p>
          </div>
        </div>
        <div className="stat-card">
          <Users size={32} />
          <div>
            <h3>Aktif Katılımcı</h3>
            <p className="number">{donationStats.activeUsers}</p>
          </div>
        </div>
        <div className="stat-card">
          <TrendingUp size={32} />
          <div>
            <h3>Bu Ay Tamamlanan</h3>
            <p className="number">{donationStats.completedThisMonth}</p>
          </div>
        </div>
      </div>

      <div className="donation-form">
        <h2>❤️ Yeni Hatim Bağışı Oluştur</h2>
        
        <div className="form-section">
          <h3>Bağış Türü</h3>
          <div className="radio-group">
            <label className={`option-card ${donationType === 'deceased' ? 'selected' : ''}`}>
              <input
                type="radio"
                checked={donationType === 'deceased'}
                onChange={() => setDonationType('deceased')}
              />
              <Heart size={24} />
              <div>
                <strong>Vefat Eden Yakın İçin</strong>
                <p>Ruhuna hediye etmek için</p>
              </div>
            </label>
            
            <label className={`option-card ${donationType === 'living' ? 'selected' : ''}`}>
              <input
                type="radio"
                checked={donationType === 'living'}
                onChange={() => setDonationType('living')}
              />
              <Users size={24} />
              <div>
                <strong>Yaşayan Biri İçin</strong>
                <p>Hediye olarak bağışlamak için</p>
              </div>
            </label>
            
            <label className={`option-card ${donationType === 'general' ? 'selected' : ''}`}>
              <input
                type="radio"
                checked={donationType === 'general'}
                onChange={() => setDonationType('general')}
              />
              <Gift size={24} />
              <div>
                <strong>Genel Sadaka</strong>
                <p>İçinizden geldiği için</p>
              </div>
            </label>
          </div>
        </div>

        <div className="form-section">
          <h3>İsim Bilgileri</h3>
          <div className="input-group">
            <label>Bağış Yapan (Siz)</label>
            <input
              type="text"
              placeholder="Adınız Soyadınız"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
            />
          </div>
          
          {(donationType === 'deceased' || donationType === 'living') && (
            <div className="input-group">
              <label>
                {donationType === 'deceased' ? 'Vefat Eden Yakın' : 'Hediye Edilecek Kişi'}
              </label>
              <input
                type="text"
                placeholder="İsim Soyisim"
                value={dedicatedTo}
                onChange={(e) => setDedicatedTo(e.target.value)}
              />
              {donationType === 'deceased' && (
                <small>Allah rahmet eylesin 🤲</small>
              )}
            </div>
          )}
        </div>

        <div className="form-section">
          <h3>📖 Cüz Seçimi</h3>
          <p className="hint">Tamamladığınız cüzleri işaretleyin</p>
          <div className="juz-checkbox-grid">
            {[...Array(30)].map((_, i) => (
              <button
                key={i + 1}
                className={`juz-checkbox ${completedJuz.includes(i + 1) ? 'checked' : ''}`}
                onClick={() => toggleJuz(i + 1)}
              >
                {completedJuz.includes(i + 1) && <CheckCircle size={16} />}
                {i + 1}. Cüz
              </button>
            ))}
          </div>
          <div className="progress-summary">
            <span>Tamamlanan: {completedJuz.length} / 30 Cüz</span>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${(completedJuz.length / 30) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <button className="btn-create-donation">
          <Gift size={20} />
          Hatim Bağışını Oluştur
        </button>
      </div>

      <div className="active-donations">
        <h2>📋 Aktif Hatim Bağışlarınız</h2>
        
        <div className="donation-list">
          <div className="donation-item">
            <div className="donation-header">
              <Heart size={24} className="icon-deceased" />
              <div>
                <h3>Mehmet Yılmaz İçin</h3>
                <p className="meta">Bağışlayan: Ahmet Yılmaz • 15 Ocak 2024</p>
              </div>
              <span className="status-badge in-progress">Devam Ediyor</span>
            </div>
            <div className="donation-progress">
              <div className="juz-completed">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="juz-dot completed"></div>
                ))}
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="juz-dot partial"></div>
                ))}
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="juz-dot pending"></div>
                ))}
              </div>
              <p>12/30 Cüz Tamamlandı (%40)</p>
            </div>
            <div className="donation-actions">
              <button className="btn-update">Güncelle</button>
              <button className="btn-view">Detaylar</button>
            </div>
          </div>

          <div className="donation-item">
            <div className="donation-header">
              <Gift size={24} className="icon-general" />
              <div>
                <h3>Genel Sadaka Hatimi</h3>
                <p className="meta">Bağışlayan: Ayşe Demir • 1 Şubat 2024</p>
              </div>
              <span className="status-badge completed">Tamamlandı ✓</span>
            </div>
            <div className="donation-progress">
              <div className="juz-completed">
                {[...Array(30)].map((_, i) => (
                  <div key={i} className="juz-dot completed"></div>
                ))}
              </div>
              <p>30/30 Cüz Tamamlandı (%100)</p>
            </div>
            <div className="donation-actions">
              <button className="btn-certificate">Sertifika İndir</button>
              <button className="btn-share">Paylaş</button>
            </div>
          </div>
        </div>
      </div>

      <div className="community-hatims">
        <h2>🌍 Topluluk Hatimleri</h2>
        <p className="subtitle">Diğer kullanıcıların başlattığı ortak hatimlere katılın</p>
        
        <div className="community-grid">
          <div className="community-card">
            <h3>Ramazan Hatimi 2024</h3>
            <p>Katılımcı: 45 / 60</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '75%' }}></div>
            </div>
            <button className="btn-join">Katıl</button>
          </div>
          
          <div className="community-card">
            <h3>Cuma Günü Hatimi</h3>
            <p>Katılımcı: 12 / 30</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '40%' }}></div>
            </div>
            <button className="btn-join">Katıl</button>
          </div>
          
          <div className="community-card">
            <h3>Hafızlık Yolculuğu</h3>
            <p>Katılımcı: 8 / 15</p>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '53%' }}></div>
            </div>
            <button className="btn-join">Katıl</button>
          </div>
        </div>
      </div>

      <div className="donation-benefits">
        <h2>📿 Hatim Bağışının Faziletleri</h2>
        <div className="benefits-list">
          <div className="benefit-item">
            <BookOpen size={24} />
            <div>
              <h3>Sürekli Sadaka</h3>
              <p>"İnsan öldüğü zaman amel defteri kapanır. Ancak üç şey bundan müstesnadır: Sadaka-i cariye, faydalanılan ilim ve kendisine dua eden hayırlı evlat." (Müslim)</p>
            </div>
          </div>
          <div className="benefit-item">
            <Heart size={24} />
            <div>
              <h3>Vefat Edenlere Ulaşır</h3>
              <p>Yapılan dualar, okunan Kuran'ın sevabı vefat edenlerimize Allah'ın izniyle ulaşır ve onları sevindirir.</p>
            </div>
          </div>
          <div className="benefit-item">
            <Users size={24} />
            <div>
              <h3>Topluluk Bereketi</h3>
              <p>Beraber yapılan ibadetlerde daha çok sevap ve bereket vardır. Topluluk hatimleri bu bereketten nasiplenmektir.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="certificate-preview">
        <h2>📜 Örnek Sertifika</h2>
        <div className="certificate">
          <div className="certificate-border">
            <h3>HATİM SERTİFİKASI</h3>
            <p className="dedication">Bu hatim ... ruhuna hediye edilmiştir</p>
            <p className="date">Tarih: ...</p>
            <p className="quran-verse">"Andolsun, biz Kur'an'ı öğüt alıp düşünesiniz diye kolaylaştırdık."</p>
            <p className="verse-ref">(Kamer Suresi, 17. Ayet)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HatimDonation;
