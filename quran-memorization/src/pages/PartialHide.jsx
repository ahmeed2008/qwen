import React, { useState } from 'react';
import { Eye, EyeOff, Grid3X3, Maximize, Minimize } from 'lucide-react';

const PartialHide = () => {
  const [hideMode, setHideMode] = useState('none'); // none, start, end, middle, random
  const [hideLevel, setHideLevel] = useState(1); // 1-5 (1 = az gizleme, 5 = çok gizleme)
  
  const sampleVerse = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
  const sampleVerses = [
    "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    "الرَّحْمَٰنِ الرَّحِيمِ",
    "مَالِكِ يَوْمِ الدِّينِ",
    "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ",
    "اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ",
    "صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الضَّالِّينَ"
  ];

  const hideText = (text, mode, level) => {
    if (mode === 'none') return text;
    
    const chars = text.split('');
    const totalChars = chars.length;
    
    switch(mode) {
      case 'start':
        const startCount = Math.floor((level / 5) * totalChars);
        return chars.map((c, i) => i < startCount ? '•' : c).join('');
      
      case 'end':
        const endCount = Math.floor((level / 5) * totalChars);
        return chars.map((c, i) => i >= totalChars - endCount ? '•' : c).join('');
      
      case 'middle':
        const middleStart = Math.floor((totalChars / 2) - ((level / 5) * totalChars / 2));
        const middleEnd = Math.floor((totalChars / 2) + ((level / 5) * totalChars / 2));
        return chars.map((c, i) => i >= middleStart && i <= middleEnd ? '•' : c).join('');
      
      case 'random':
        const hideProbability = level / 5;
        return chars.map(c => Math.random() < hideProbability ? '•' : c).join('');
      
      default:
        return text;
    }
  };

  return (
    <div className="partial-hide">
      <h1>👁️ Kısmi Gizleme (Ezber Testi) Yöntemi</h1>
      
      <div className="hide-intro">
        <p>
          Ekranda Kuran metni görünürken, metnin sadece istenen bölümlerini 
          gizleyerek kendinizi test edin. Başlangıcı hatırlıyorum sonunu unuttum 
          diyenler için ideal bir yöntem.
        </p>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <h2>🔒 Gizleme Modu</h2>
          <div className="mode-buttons">
            <button 
              className={hideMode === 'none' ? 'active' : ''}
              onClick={() => setHideMode('none')}
            >
              <Eye size={20} />
              Gizleme Yok
            </button>
            <button 
              className={hideMode === 'start' ? 'active' : ''}
              onClick={() => setHideMode('start')}
            >
              <Eye size={20} />
              Başlangıcı Gizle
            </button>
            <button 
              className={hideMode === 'end' ? 'active' : ''}
              onClick={() => setHideMode('end')}
            >
              <EyeOff size={20} />
              Sonu Gizle
            </button>
            <button 
              className={hideMode === 'middle' ? 'active' : ''}
              onClick={() => setHideMode('middle')}
            >
              <Grid3X3 size={20} />
              Ortayı Gizle
            </button>
            <button 
              className={hideMode === 'random' ? 'active' : ''}
              onClick={() => setHideMode('random')}
            >
              <Grid3X3 size={20} />
              Rastgele Gizle
            </button>
          </div>
        </div>

        <div className="control-group">
          <h2>📊 Gizleme Seviyesi: {hideLevel}/5</h2>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="5"
              value={hideLevel}
              onChange={(e) => setHideLevel(parseInt(e.target.value))}
            />
            <div className="level-indicators">
              <span>Az</span>
              <span>Orta</span>
              <span>Çok</span>
            </div>
          </div>
          <p className="hint">
            Seviye arttıkça daha fazla karakter gizlenir
          </p>
        </div>
      </div>

      <div className="practice-area">
        <h2>📖 Pratik Alanı</h2>
        
        <div className="verse-display">
          <div className="verse-header">
            <h3>Fatiha Suresi</h3>
            <div className="display-controls">
              <button className="btn-control">
                <Maximize size={18} />
                Tam Ekran
              </button>
              <button className="btn-control">
                <Minimize size={18} />
                Küçült
              </button>
            </div>
          </div>

          <div className="verses-container">
            {sampleVerses.map((verse, index) => (
              <div key={index} className="verse-item">
                <span className="verse-number">{index + 1}</span>
                <p className="arabic-text">
                  {hideText(verse, hideMode, hideLevel)}
                </p>
                {hideMode !== 'none' && (
                  <button className="btn-show-answer">
                    <Eye size={16} />
                    Göster
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="self-test-checklist">
          <h3>✅ Kendini Değerlendirme</h3>
          <label><input type="checkbox" /> Doğru okudum</label>
          <label><input type="checkbox" /> Tecvid kurallarına uydum</label>
          <label><input type="checkbox" /> Duraklamaları doğru yaptım</label>
          <label><input type="checkbox" /> Ezberim tamdı</label>
          
          <div className="test-actions">
            <button className="btn-next">Sonraki Ayet →</button>
            <button className="btn-retry">🔄 Tekrar Dene</button>
          </div>
        </div>
      </div>

      <div className="hide-methods">
        <h2>💡 Gizleme Yöntemleri ve Kullanım Alanları</h2>
        <div className="methods-grid">
          <div className="method-card">
            <h3>🔻 Sonu Gizle</h3>
            <p><strong>Kullanım:</strong> "Başlangıcı biliyorum, sonunu unuttum" durumunda</p>
            <p><strong>Fayda:</strong> Ayetin devamını hatırlamaya zorlar</p>
          </div>
          <div className="method-card">
            <h3>🔺 Başlangıcı Gizle</h3>
            <p><strong>Kullanım:</strong> "Sonunu biliyorum, başlangıcını unuttum" durumunda</p>
            <p><strong>Fayda:</strong> Ayete nasıl başladığınızı pekiştirir</p>
          </div>
          <div className="method-card">
            <h3>◼️ Ortayı Gizle</h3>
            <p><strong>Kullanım:</strong> Orta kısımları unutanlar için</p>
            <p><strong>Fayda:</strong> Ayetin bütünlüğünü korumayı öğretir</p>
          </div>
          <div className="method-card">
            <h3>🎲 Rastgele Gizle</h3>
            <p><strong>Kullanım:</strong> Genel tekrar ve test için</p>
            <p><strong>Fayda:</strong> Tüm ayeti aktif olarak hatırlamayı gerektirir</p>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h3>📝 İpuçları</h3>
        <ul>
          <li>Başlangıçta düşük gizleme seviyesi ile başlayın</li>
          <li>Ezberiniz geliştikçe seviyeyi artırın</li>
          <li>Farklı gizleme modlarını deneyerek zayıf noktalarınızı bulun</li>
          <li>Gizlenmiş kısımları sesli olarak tamamlayın</li>
          <li>Hata yaptığınız yerleri not alın ve tekrar edin</li>
        </ul>
      </div>
    </div>
  );
};

export default PartialHide;
