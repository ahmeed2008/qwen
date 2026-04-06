import React, { useState } from 'react';
import { AlertCircle, Flag, TrendingUp, BookOpen } from 'lucide-react';

const ErrorTracking = () => {
  const [errors, setErrors] = useState([
    { id: 1, page: 5, surah: 'Bakara', verses: '10-15', type: 'harf', count: 3, date: '2024-01-15' },
    { id: 2, page: 12, surah: 'Bakara', verses: '40-45', type: 'tecvid', count: 2, date: '2024-01-14' },
    { id: 3, page: 20, surah: 'Al-i Imran', verses: '1-5', type: 'ezber', count: 5, date: '2024-01-13' },
    { id: 4, page: 25, surah: 'Nisa', verses: '20-25', type: 'duraklama', count: 1, date: '2024-01-12' },
  ]);

  const [currentError, setCurrentError] = useState({
    page: '',
    surah: '',
    verses: '',
    type: 'harf'
  });

  const errorTypes = [
    { value: 'harf', label: 'Harf Hatası', icon: '📝' },
    { value: 'tecvid', label: 'Tecvid Hatası', icon: '🎵' },
    { value: 'ezber', label: 'Ezber Unutma', icon: '🧠' },
    { value: 'duraklama', label: 'Duraklama Hatası', icon: '⏸️' },
  ];

  const addError = () => {
    if (currentError.page && currentError.surah) {
      setErrors([{
        id: Date.now(),
        ...currentError,
        count: 1,
        date: new Date().toISOString().split('T')[0]
      }, ...errors]);
      setCurrentError({ page: '', surah: '', verses: '', type: 'harf' });
    }
  };

  const weakPoints = errors.reduce((acc, error) => {
    acc[error.surah] = (acc[error.surah] || 0) + error.count;
    return acc;
  }, {});

  const mostErrors = Object.entries(weakPoints)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="error-tracking">
      <h1>⚠️ Hata Tespiti ve İşaretleme</h1>
      
      <div className="error-intro">
        <p>
          Ezber okurken tıkandığınız veya hata yaptığınız yerleri işaretleyin. 
          Bu bölümler otomatik olarak <strong>"Zayıf Ezberler"</strong> havuzuna 
          eklenir ve daha sık tekrar edilir.
        </p>
      </div>

      <div className="error-stats">
        <div className="stat-card">
          <AlertCircle size={32} />
          <h3>Toplam Hata</h3>
          <p className="number">{errors.reduce((sum, e) => sum + e.count, 0)}</p>
        </div>
        <div className="stat-card">
          <Flag size={32} />
          <h3>Zayıf Noktalar</h3>
          <p className="number">{Object.keys(weakPoints).length}</p>
        </div>
        <div className="stat-card">
          <TrendingUp size={32} />
          <h3>Bu Hafta</h3>
          <p className="number">{errors.filter(e => {
            const errorDate = new Date(e.date);
            const weekAgo = new Date();
            weekAgo.setDate(weekAgo.getDate() - 7);
            return errorDate >= weekAgo;
          }).reduce((sum, e) => sum + e.count, 0)}</p>
        </div>
      </div>

      <div className="add-error-section">
        <h2>🚩 Yeni Hata İşaretle</h2>
        <div className="error-form">
          <div className="form-row">
            <input
              type="text"
              placeholder="Sayfa No"
              value={currentError.page}
              onChange={(e) => setCurrentError({...currentError, page: e.target.value})}
            />
            <input
              type="text"
              placeholder="Sure Adı"
              value={currentError.surah}
              onChange={(e) => setCurrentError({...currentError, surah: e.target.value})}
            />
            <input
              type="text"
              placeholder="Ayetler (örn: 10-15)"
              value={currentError.verses}
              onChange={(e) => setCurrentError({...currentError, verses: e.target.value})}
            />
          </div>
          <div className="form-row">
            <select
              value={currentError.type}
              onChange={(e) => setCurrentError({...currentError, type: e.target.value})}
            >
              {errorTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
            <button className="btn-add-error" onClick={addError}>
              <Flag size={20} />
              İşaretle
            </button>
          </div>
        </div>
      </div>

      <div className="errors-grid">
        <div className="errors-list">
          <h2>📋 Tüm Hatalar</h2>
          {errors.map(error => (
            <div key={error.id} className="error-item">
              <div className="error-header">
                <span className="error-type">{errorTypes.find(t => t.value === error.type)?.icon}</span>
                <span className="page-ref">Sayfa {error.page}</span>
                <span className="date">{error.date}</span>
              </div>
              <h3>{error.surah} - {error.verses}. Ayetler</h3>
              <div className="error-meta">
                <span className="type-badge">{errorTypes.find(t => t.value === error.type)?.label}</span>
                <span className="count">Hata Sayısı: {error.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="weak-points">
          <h2>🎯 Zayıf Ezberler (Öncelikli Tekrar)</h2>
          <p className="hint">Bu sureler normalden daha sık tekrar edilmelidir</p>
          
          {mostErrors.map(([surah, count], index) => (
            <div key={surah} className={`weak-point priority-${index + 1}`}>
              <div className="priority-badge">#{index + 1}</div>
              <div className="weak-info">
                <h3>{surah}</h3>
                <p>Toplam Hata: {count}</p>
              </div>
              <button className="btn-prioritize">
                <BookOpen size={18} />
                Öncelikli Tekrar
              </button>
            </div>
          ))}

          <div className="repeat-schedule">
            <h3>📅 Zayıf Ezberler İçin Tekrar Programı</h3>
            <ul>
              <li><strong>Günlük:</strong> En zayıf 3 sure</li>
              <li><strong>Haftalık:</strong> Tüm zayıf sureler 2x</li>
              <li><strong>Aylık:</strong> Genel kontrol</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="error-analysis">
        <h2>📊 Hata Analizi</h2>
        <div className="analysis-grid">
          <div className="analysis-card">
            <h3>En Sık Yapılan Hata Türü</h3>
            <p className="big-stat">
              {errorTypes.find(t => t.value === errors.reduce((most, e) => 
                errors.filter(x => x.type === x.type).length > errors.filter(x => x.type === most.type).length ? e : most
              , errors[0]?.type)?.value)?.label || 'Veri yok'}
            </p>
          </div>
          <div className="analysis-card">
            <h3>En Fazla Hata Yapılan Sure</h3>
            <p className="big-stat">{mostErrors[0]?.[0] || 'Veri yok'}</p>
          </div>
          <div className="analysis-card">
            <h3>Ortalama Hata/Sayfa</h3>
            <p className="big-stat">{(errors.reduce((sum, e) => sum + e.count, 0) / errors.length).toFixed(1)}</p>
          </div>
        </div>
      </div>

      <div className="tips-section">
        <h3>💡 Hata Azaltma İpuçları</h3>
        <ul>
          <li>
            <strong>Yavaş Okuyun:</strong> Hızlı okumak hata oranını artırır.
          </li>
          <li>
            <strong>Dinleyin:</strong> Hoca okumalarını dikkatle dinleyin.
          </li>
          <li>
            <strong>Kaydedin:</strong> Kendi sesinizi kaydedip hatalarınızı tespit edin.
          </li>
          <li>
            <strong>Tekrar Edin:</strong> Zayıf noktaları daha sık tekrarlayın.
          </li>
          <li>
            <strong>Not Alın:</strong> Hata yaptığınız yerleri not edin.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ErrorTracking;
