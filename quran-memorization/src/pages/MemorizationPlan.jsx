import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, Target } from 'lucide-react';

const MemorizationPlan = () => {
  const [planType, setPlanType] = useState('beginner');
  const [dailyPages, setDailyPages] = useState(1);
  const [knownSurahs, setKnownSurahs] = useState([]);
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  
  const calculateEndDate = () => {
    const totalJuz = 30;
    const daysNeeded = Math.ceil((totalJuz * 20) / dailyPages);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + daysNeeded);
    return endDate.toLocaleDateString('tr-TR');
  };

  const surahList = [
    'Fatiha', 'Bakara', 'Al-i Imran', 'Nisa', 'Maide', 
    'Enam', 'Araf', 'Enfal', 'Tevbe', 'Yunus'
  ];

  const toggleSurah = (surah) => {
    if (knownSurahs.includes(surah)) {
      setKnownSurahs(knownSurahs.filter(s => s !== surah));
    } else {
      setKnownSurahs([...knownSurahs, surah]);
    }
  };

  return (
    <div className="memorization-plan">
      <h1>📅 Ezber Planı Oluştur</h1>
      
      <div className="plan-options">
        <div className="option-card">
          <h2>🎯 Plan Tipi Seçin</h2>
          <div className="radio-group">
            <label>
              <input 
                type="radio" 
                checked={planType === 'beginner'}
                onChange={() => setPlanType('beginner')}
              />
              Sıfırdan Başlayanlar
            </label>
            <label>
              <input 
                type="radio" 
                checked={planType === 'repair'}
                onChange={() => setPlanType('repair')}
              />
              Ezberi Bozulmuş/Kayıp Olanlar
            </label>
          </div>
        </div>

        {planType === 'beginner' && (
          <div className="option-card">
            <h2>📊 Günlük Hedef</h2>
            <div className="slider-container">
              <label>Günde kaç sayfa ezberleyebilirsiniz?</label>
              <input 
                type="range" 
                min="0.5" 
                max="5" 
                step="0.5"
                value={dailyPages}
                onChange={(e) => setDailyPages(parseFloat(e.target.value))}
              />
              <div className="slider-value">{dailyPages} Sayfa/Gün</div>
            </div>
            
            <div className="start-date">
              <label>Başlangıç Tarihi:</label>
              <input 
                type="date" 
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="plan-summary">
              <h3>📈 Plan Özeti</h3>
              <p><Target size={18}/> Toplam Süre: {Math.ceil((30 * 20) / dailyPages)} gün</p>
              <p><Calendar size={18}/> Bitiş Tarihi: {calculateEndDate()}</p>
              <p><Clock size={18}/> Tahmini Hatim: {Math.ceil((30 * 20) / dailyPages / 30).toFixed(1)} ay</p>
            </div>
          </div>
        )}

        {planType === 'repair' && (
          <div className="option-card">
            <h2>✅ Bildiğiniz Sureleri İşaretleyin</h2>
            <p className="hint">Sadece zayıf olduğunuz veya unuttuğunuz kısımlar için tamir programı oluşturulacak</p>
            <div className="surah-grid">
              {surahList.map(surah => (
                <button
                  key={surah}
                  className={`surah-tag ${knownSurahs.includes(surah) ? 'selected' : ''}`}
                  onClick={() => toggleSurah(surah)}
                >
                  {knownSurahs.includes(surah) && <CheckCircle size={16}/>}
                  {surah}
                </button>
              ))}
            </div>
            <div className="repair-summary">
              <h3>🔧 Tamir Programı</h3>
              <p>Bilinmeyen sure sayısı: {surahList.length - knownSurahs.length}</p>
              <p>Tahmini tamir süresi: {(surahList.length - knownSurahs.length) * 3} gün</p>
            </div>
          </div>
        )}
      </div>

      <button className="create-plan-btn">
        ✨ Planımı Oluştur
      </button>

      <div className="sample-plan">
        <h3>📋 Örnek Günlük Program</h3>
        <table>
          <thead>
            <tr>
              <th>Zaman</th>
              <th> Aktivite</th>
              <th>Süre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Sabah Namazı Sonrası</td>
              <td>Yeni Ezber</td>
              <td>30 dk</td>
            </tr>
            <tr>
              <td>Öğle Namazı Sonrası</td>
              <td>Tekrar (1. Gün)</td>
              <td>20 dk</td>
            </tr>
            <tr>
              <td>Akşam Namazı Sonrası</td>
              <td>Tekrar (3. Gün)</td>
              <td>20 dk</td>
            </tr>
            <tr>
              <td>Yatsı Namazı Sonrası</td>
              <td>Genel Tekrar</td>
              <td>30 dk</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MemorizationPlan;
