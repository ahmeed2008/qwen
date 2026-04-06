import React, { useState } from 'react';
import { BookOpen, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const JuzBridge = () => {
  const [selectedJuz, setSelectedJuz] = useState(1);
  
  const juzData = {
    1: {
      name: "1. Cüz",
      lastPage: 21,
      lastSurah: "Bakara",
      lastVerses: "141-148",
      nextJuzFirstPage: 22,
      nextJuzFirstSurah: "Bakara",
      nextJuzFirstVerses: "149-153",
      bridgeText: "Bakara 141-153 arası ayetler cüz geçişini oluşturur"
    },
    2: {
      name: "2. Cüz",
      lastPage: 41,
      lastSurah: "Bakara",
      lastVerses: "252-259",
      nextJuzFirstPage: 42,
      nextJuzFirstSurah: "Bakara",
      nextJuzFirstVerses: "260-267",
      bridgeText: "Bakara 252-267 arası ayetler cüz geçişini oluşturur"
    },
    30: {
      name: "30. Cüz",
      lastPage: 604,
      lastSurah: "Nas",
      lastVerses: "1-6",
      nextJuzFirstPage: null,
      nextJuzFirstSurah: null,
      nextJuzFirstVerses: null,
      bridgeText: "Son cüz - Hatim tamamlandı!"
    }
  };

  const currentJuz = juzData[selectedJuz] || juzData[1];

  return (
    <div className="juz-bridge">
      <h1>📖 Ezber Köprüsü (Cüz Bağlama)</h1>
      
      <div className="bridge-intro">
        <p>
          Bir cüzü bitirdiğinizde, eski cüzün son sayfasından yeni cüzün ilk 
          sayfasına kadar kusursuz bir geçiş yapabilmeniz için otomatik olarak 
          "köprü metinleri" oluşturulur. Bu sayede cüz başlangıçlarındaki ezber 
          kopuklukları engellenir.
        </p>
      </div>

      <div className="juz-selector">
        <h2>Cüz Seçin</h2>
        <div className="juz-grid">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(juz => (
            <button
              key={juz}
              className={`juz-btn ${selectedJuz === juz ? 'active' : ''}`}
              onClick={() => setSelectedJuz(juz)}
            >
              {juz}. Cüz
            </button>
          ))}
        </div>
      </div>

      <div className="bridge-visualization">
        <div className="juz-card previous">
          <div className="juz-header">
            <BookOpen size={24} />
            <h3>{currentJuz.name}</h3>
          </div>
          <div className="juz-content">
            <p><strong>Son Sayfa:</strong> {currentJuz.lastPage}</p>
            <p><strong>Son Sure:</strong> {currentJuz.lastSurah}</p>
            <p><strong>Son Ayetler:</strong> {currentJuz.lastVerses}</p>
          </div>
          <div className="juz-status completed">
            <CheckCircle size={20} />
            <span>Tamamlandı</span>
          </div>
        </div>

        <div className="bridge-arrow">
          <ArrowRight size={48} />
          <span>Köprü</span>
        </div>

        <div className="juz-card next">
          <div className="juz-header">
            <BookOpen size={24} />
            <h3>{selectedJuz < 30 ? `${selectedJuz + 1}. Cüz` : 'Hatim Tamamlandı'}</h3>
          </div>
          <div className="juz-content">
            {currentJuz.nextJuzFirstPage ? (
              <>
                <p><strong>İlk Sayfa:</strong> {currentJuz.nextJuzFirstPage}</p>
                <p><strong>İlk Sure:</strong> {currentJuz.nextJuzFirstSurah}</p>
                <p><strong>İlk Ayetler:</strong> {currentJuz.nextJuzFirstVerses}</p>
              </>
            ) : (
              <p className="final-message">🎉 Tebrikler! Hatimi tamamladınız.</p>
            )}
          </div>
          <div className="juz-status pending">
            <AlertCircle size={20} />
            <span>Başlanacak</span>
          </div>
        </div>
      </div>

      <div className="bridge-practice">
        <h2>🌉 Köprü Pratiği</h2>
        <div className="practice-box">
          <div className="practice-section">
            <h3>Cüz Sonu Tekrarı</h3>
            <p className="reference">{currentJuz.lastSurah} {currentJuz.lastVerses}</p>
            <div className="arabic-preview">
              <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="translation">(... cüz sonu ayetleri ...)</p>
            </div>
            <button className="btn-practice">
              <BookOpen size={18} />
              Bu Kısmı Tekrar Et
            </button>
          </div>

          <div className="practice-divider">
            <span>+</span>
          </div>

          <div className="practice-section">
            <h3>Yeni Cüz Başlangıcı</h3>
            {currentJuz.nextJuzFirstSurah ? (
              <>
                <p className="reference">{currentJuz.nextJuzFirstSurah} {currentJuz.nextJuzFirstVerses}</p>
                <div className="arabic-preview">
                  <p>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
                  <p className="translation">(... yeni cüz başlangıç ayetleri ...)</p>
                </div>
                <button className="btn-practice">
                  <BookOpen size={18} />
                  Bu Kısmı Ezberle
                </button>
              </>
            ) : (
              <p className="no-more">Artık yeni cüz yok. Hatim tekrarına başlayabilirsiniz!</p>
            )}
          </div>
        </div>
      </div>

      <div className="bridge-tips">
        <h2>💡 Cüz Geçişlerinde Dikkat Edilecekler</h2>
        <div className="tips-list">
          <div className="tip-item">
            <strong>1. Köprü Günleri Oluşturun:</strong>
            <p>Cüz bitirmeden 3 gün önce son sayfaları, cüz bitirdikten sonra 3 gün yeni cüzün ilk sayfalarını yoğun tekrar edin.</p>
          </div>
          <div className="tip-item">
            <strong>2. Sayfa Numaralarını Karıştırmayın:</strong>
            <p>Cüz sonu sayfa numarası ile yeni cüz başlangıç sayfa numarasını sürekli tekrarlayın.</p>
          </div>
          <div className="tip-item">
            <strong>3. Konu Bağlantısı Kurun:</strong>
            <p>Eski cüzün son konusu ile yeni cüzün başlangıç konusu arasında bağlantı kurmaya çalışın.</p>
          </div>
          <div className="tip-item">
            <strong>4. Geçiş Duası:</strong>
            <p>Her cüz geçişinde "Allahümme balliğna hatme'l-Kur'an" duasını okuyun ve niyet edin.</p>
          </div>
          <div className="tip-item">
            <strong>5. Köprü Testi:</strong>
            <p>Cüz sonundan yeni cüz başlangıcına kadar kesintisiz okuma testi yapın.</p>
          </div>
        </div>
      </div>

      <div className="common-mistakes">
        <h2>⚠️ Sık Yapılan Hatalar</h2>
        <div className="mistakes-grid">
          <div className="mistake-card">
            <AlertCircle size={24} />
            <h3>Kopukluk</h3>
            <p>Cüz sonunda durup uzun süre ara vermek</p>
            <solution>Çözüm: Maksimum 1-2 gün ara verin</solution>
          </div>
          <div className="mistake-card">
            <AlertCircle size={24} />
            <h3>Ezber Kaybı</h3>
            <p>Yeni cüze başlayınca eski cüzü ihmal etmek</p>
            <solution>Çözüm: Eski cüzleri muracaat programına ekleyin</solution>
          </div>
          <div className="mistake-card">
            <AlertCircle size={24} />
            <h3>Sayfa Şaşırması</h3>
            <p>Cüz değişince sayfa numaralarını karıştırmak</p>
            <solution>Çözüm: İlk 10 gün her gün köprü pratiği yapın</solution>
          </div>
        </div>
      </div>

      <div className="progress-tracker">
        <h2>📊 Cüz İlerleme Durumu</h2>
        <div className="progress-bar-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(selectedJuz / 30) * 100}%` }}></div>
          </div>
          <p className="progress-text">{selectedJuz} / 30 Cüz Tamamlandı</p>
        </div>
        
        {selectedJuz > 0 && (
          <div className="milestone-badges">
            <div className={`badge ${selectedJuz >= 1 ? 'earned' : ''}`}>🥉 1. Cüz</div>
            <div className={`badge ${selectedJuz >= 5 ? 'earned' : ''}`}>🥉 5. Cüz</div>
            <div className={`badge ${selectedJuz >= 10 ? 'earned' : ''}`}>🥈 10. Cüz</div>
            <div className={`badge ${selectedJuz >= 15 ? 'earned' : ''}`}>🥈 15. Cüz</div>
            <div className={`badge ${selectedJuz >= 20 ? 'earned' : ''}`}>🥉 20. Cüz</div>
            <div className={`badge ${selectedJuz >= 25 ? 'earned' : ''}`}>🥉 25. Cüz</div>
            <div className={`badge ${selectedJuz >= 30 ? 'earned' : ''}`}>🏆 Hatim!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JuzBridge;
