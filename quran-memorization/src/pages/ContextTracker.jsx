import React, { useState } from 'react';
import { Link2, BookOpen, Lightbulb, ChevronLeft, ChevronRight } from 'lucide-react';

const ContextTracker = () => {
  const [currentVerse, setCurrentVerse] = useState(5);
  
  const verses = [
    { num: 3, text: "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ", translation: "Onlar ki gayba inanırlar, namazı kılarlar ve kendilerine rızık olarak verdiklerimizden infak ederler." },
    { num: 4, text: "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ", translation: "Yine onlar ki, sana indirilene ve senden önce indirilene inanırlar; ahirete de kesin olarak inanırlar." },
    { num: 5, text: "أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ", translation: "İşte onlar, Rablerinden bir hidayet üzeredirler ve kurtuluşa erenler de işte onlardır." },
    { num: 6, text: "إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ", translation: "Şüphesiz inkâr edenlere gelince, onları uyarmışsın ya da uyarmamışsın, kendileri için birdir; inanmazlar." },
    { num: 7, text: "خَتَمَ اللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ", translation: "Allah onların kalplerini ve kulaklarını mühürlemiştir. Gözlerinde de bir perde vardır. Ve onlar için büyük bir azap vardır." },
  ];

  const contextNotes = {
    3: {
      before: "Ayet 1-2: Kur'an'ın muttakiler için hidayet olduğu belirtildi",
      connection: "Muttakilerin özellikleri sıralanmaya başlanıyor",
      after: "Ayet 4: Önceki kitaplara iman da ekleniyor"
    },
    4: {
      before: "Ayet 3: Gayba iman ve namaz zikredildi",
      connection: "Önceki semavi kitaplara iman eklendi",
      after: "Ayet 5: Bu özelliklere sahip olanların kurtuluşa ereceği müjdelendi"
    },
    5: {
      before: "Ayet 3-4: Muttakilerin dört özelliği sayıldı",
      connection: "Bu ayet önceki ayetlerin sonuç cümlesidir",
      after: "Ayet 6: İnkârcıların durumu anlatılmaya başlanıyor"
    },
    6: {
      before: "Ayet 5: Muttakilerin hidayette olduğu belirtildi",
      connection: "Konu değişiyor: İnkârcıların durumu",
      after: "Ayet 7: İnkârcıların kalplerinin mühürlendiği anlatılıyor"
    },
    7: {
      before: "Ayet 6: İnkârcıların uyarıdan faydalanmayacağı",
      connection: "İnkârcıların manevi körlüğünün sebepleri",
      after: "Ayet 8: İnsanlar arasında iman konusunda üç grup ortaya çıkacak"
    }
  };

  const currentContext = contextNotes[currentVerse];

  return (
    <div className="context-tracker">
      <h1>🔗 Bağlam (Sırb) Takibi</h1>
      
      <div className="context-intro">
        <p>
          Bir ayetin ezberi yapılırken, o ayetten önceki ve sonraki ayetle 
          olan bağlantısını öğrenin. Ezberin "sayfa bilinci" olmadan, 
          "manaya ve bütünlüğe" bağlı olarak yapılmasını sağlar.
        </p>
      </div>

      <div className="verse-navigation">
        <button 
          className="nav-btn"
          onClick={() => setCurrentVerse(Math.max(3, currentVerse - 1))}
          disabled={currentVerse <= 3}
        >
          <ChevronLeft size={24} />
          Önceki Ayet
        </button>
        
        <div className="current-verse-indicator">
          <span>Bakara {currentVerse}. Ayet</span>
        </div>
        
        <button 
          className="nav-btn"
          onClick={() => setCurrentVerse(Math.min(7, currentVerse + 1))}
          disabled={currentVerse >= 7}
        >
          Sonraki Ayet
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="context-container">
        <div className="verse-flow">
          <div className={`verse-card previous ${currentVerse === 3 ? 'disabled' : ''}`}>
            <div className="verse-label">Önceki Ayet ({currentVerse - 1})</div>
            <p className="arabic-text">{verses.find(v => v.num === currentVerse - 1)?.text || '...'}</p>
            <p className="translation">{verses.find(v => v.num === currentVerse - 1)?.translation}</p>
          </div>

          <div className="verse-card current">
            <div className="verse-label">Mevcut Ayet ({currentVerse})</div>
            <p className="arabic-text">{verses.find(v => v.num === currentVerse)?.text}</p>
            <p className="translation">{verses.find(v => v.num === currentVerse)?.translation}</p>
            <div className="verse-context">
              <h3>📌 Bağlam Notları</h3>
              <div className="context-item">
                <BookOpen size={18} />
                <strong>Önceki:</strong> {currentContext?.before}
              </div>
              <div className="context-item highlight">
                <Link2 size={18} />
                <strong>Bağlantı:</strong> {currentContext?.connection}
              </div>
              <div className="context-item">
                <BookOpen size={18} />
                <strong>Sonraki:</strong> {currentContext?.after}
              </div>
            </div>
          </div>

          <div className={`verse-card next ${currentVerse === 7 ? 'disabled' : ''}`}>
            <div className="verse-label">Sonraki Ayet ({currentVerse + 1})</div>
            <p className="arabic-text">{verses.find(v => v.num === currentVerse + 1)?.text || '...'}</p>
            <p className="translation">{verses.find(v => v.num === currentVerse + 1)?.translation}</p>
          </div>
        </div>
      </div>

      <div className="theme-tracker">
        <h2>🎯 Tema Takibi</h2>
        <div className="theme-flow">
          <div className="theme-segment">
            <span className="theme-number">1</span>
            <p>Muttakilerin Özellikleri</p>
            <small>Ayet 2-5</small>
          </div>
          <div className="theme-arrow">→</div>
          <div className="theme-segment active">
            <span className="theme-number">2</span>
            <p>İnkârcıların Durumu</p>
            <small>Ayet 6-7</small>
          </div>
          <div className="theme-arrow">→</div>
          <div className="theme-segment">
            <span className="theme-number">3</span>
            <p>İman Eden Gruplar</p>
            <small>Ayet 8-20</small>
          </div>
        </div>
      </div>

      <div className="story-connection">
        <h2>📖 Hikaye Akışı</h2>
        <div className="story-box">
          <Lightbulb size={24} />
          <div>
            <h3>Bakara Suresi Giriş Bölümü</h3>
            <p>
              Bakara suresinin ilk bölümünde (1-20. ayetler) insanlık üç kategoriye ayrılır:
              <strong> Muttakiler</strong> (korunanlar), <strong>Kafirler</strong> (inkârcılar) 
              ve <strong>Münafıklar</strong> (iki yüzlüler). Bu ayetlerde her grubun özellikleri 
              ve akıbetleri anlatılmaktadır.
            </p>
            <p className="memorization-tip">
              💡 <strong>Ezber İpucu:</strong> Bu bölümü ezberlerken "kimler hakkında konuşuluyor?" 
              sorusunu sürekli sorun. Böylece ayetler arası geçişleri daha kolay hatırlarsınız.
            </p>
          </div>
        </div>
      </div>

      <div className="transition-tips">
        <h2>🌉 Ayet Geçişlerini Kolaylaştırma</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Anahtar Kelimeler</h3>
            <p>Her ayetin son kelimesi ile sonraki ayetin ilk kelimesi arasında bağ kurun.</p>
            <example>Örn: "المفلحون" → "إن الذين"</example>
          </div>
          <div className="tip-card">
            <h3>Konu Değişimi</h3>
            <p>Konunun değiştiği yerleri işaretleyin. Bu, ezber kopukluklarını önler.</p>
            <example>Örn: Ayet 5'te 6'ya geçişte konu değişiyor</example>
          </div>
          <div className="tip-card">
            <h3>Sebep-Sonuç</h3>
            <p>Ayetler arasındaki sebep-sonuç ilişkilerini bulun.</p>
            <example>Örn: Özellikler sayıldı → Sonuç: Onlar kurtuluşa erdi</example>
          </div>
          <div className="tip-card">
            <h3>Tekrar Eden Kalıplar</h3>
            <p>Benzer yapıdaki ayetleri gruplayın.</p>
            <example>Örn: "الذين" ile başlayan ayetler</example>
          </div>
        </div>
      </div>

      <div className="context-benefits">
        <h2>✅ Bağlam Takibinin Faydaları</h2>
        <ul>
          <li>
            <strong>Mekanik Ezberi Önler:</strong> Sadece sesleri değil, manayı da ezberlersiniz.
          </li>
          <li>
            <strong>Kopuklukları Azaltır:</strong> Ayetler arası geçişler daha smooth olur.
          </li>
          <li>
            <strong>Unutmayı Zorlaştırır:</strong> Mantıksal bağlar unutmeyi engeller.
          </li>
          <li>
            <strong>Tefekkürü Artırır:</strong> Ayetlerin derin manasını düşünürsünüz.
          </li>
          <li>
            <strong>Hatırlamayı Kolaylaştırır:</strong> Bir ayeti unutsanız bile bağlamdan hatırlarsınız.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ContextTracker;
