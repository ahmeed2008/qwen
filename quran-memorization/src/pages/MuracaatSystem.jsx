import React, { useState } from 'react';
import { Repeat, CheckCircle, Clock, AlertTriangle, Calendar } from 'lucide-react';

const MuracaatSystem = () => {
  const [todayReviews, setTodayReviews] = useState([
    { id: 1, page: 1, surah: 'Fatiha', verses: '1-7', interval: '1. Gün', status: 'pending' },
    { id: 2, page: 5, surah: 'Bakara', verses: '1-5', interval: '3. Gün', status: 'pending' },
    { id: 3, page: 10, surah: 'Bakara', verses: '20-25', interval: '7. Gün', status: 'completed' },
    { id: 4, page: 15, surah: 'Bakara', verses: '40-45', interval: '15. Gün', status: 'pending' },
    { id: 5, page: 20, surah: 'Bakara', verses: '60-65', interval: '1 Ay', status: 'pending' },
  ]);

  const [showCompleted, setShowCompleted] = useState(false);

  const markAsComplete = (id) => {
    setTodayReviews(todayReviews.map(review => 
      review.id === id ? { ...review, status: 'completed' } : review
    ));
  };

  const markAsIncomplete = (id) => {
    setTodayReviews(todayReviews.map(review => 
      review.id === id ? { ...review, status: 'pending' } : review
    ));
  };

  const pendingCount = todayReviews.filter(r => r.status === 'pending').length;
  const completedCount = todayReviews.filter(r => r.status === 'completed').length;

  return (
    <div className="muracaat-system">
      <h1>🔄 Akıllı Tekrar (Muracaat) Sistemi</h1>
      
      <div className="muracaat-intro">
        <p>
          Ezberin kalıcı olması için en kritik adımdır. Yeni ezberlediğiniz sayfalar 
          otomatik olarak <strong>1. gün, 3. gün, 7. gün, 15. gün ve 1 ay</strong> sonra 
          tekrar listesine düşer.
        </p>
      </div>

      <div className="muracaat-stats">
        <div className="stat-box pending">
          <AlertTriangle size={32} />
          <div>
            <h3>Yapılacak</h3>
            <p className="number">{pendingCount}</p>
          </div>
        </div>
        <div className="stat-box completed">
          <CheckCircle size={32} />
          <div>
            <h3>Tamamlanan</h3>
            <p className="number">{completedCount}</p>
          </div>
        </div>
        <div className="stat-box total">
          <Repeat size={32} />
          <div>
            <h3>Toplam</h3>
            <p className="number">{todayReviews.length}</p>
          </div>
        </div>
      </div>

      <div className="filter-toggle">
        <label>
          <input 
            type="checkbox" 
            checked={showCompleted}
            onChange={() => setShowCompleted(!showCompleted)}
          />
          Tamamlananları Göster
        </label>
      </div>

      <div className="review-list">
        <h2>📋 Bugünkü Tekrar Listesi</h2>
        
        {todayReviews
          .filter(review => showCompleted || review.status === 'pending')
          .map(review => (
          <div key={review.id} className={`review-item ${review.status}`}>
            <div className="review-info">
              <div className="review-header">
                <span className="page-number">Sayfa {review.page}</span>
                <span className={`interval-badge ${review.interval.split(' ')[0]}`}>
                  {review.interval}
                </span>
              </div>
              <h3>{review.surah}</h3>
              <p className="verses">{review.verses}. Ayetler</p>
            </div>
            
            <div className="review-actions">
              {review.status === 'pending' ? (
                <button 
                  className="btn-complete"
                  onClick={() => markAsComplete(review.id)}
                >
                  <CheckCircle size={20} />
                  Tamamla
                </button>
              ) : (
                <button 
                  className="btn-undo"
                  onClick={() => markAsIncomplete(review.id)}
                >
                  Geri Al
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="muracaat-info">
        <h3>ℹ️ Tekrar Sistemi Nasıl Çalışır?</h3>
        <ul>
          <li>
            <Clock size={18} />
            <strong>1. Gün:</strong> Ezberlediğiniz sayfa ilk pekiştirme
          </li>
          <li>
            <Clock size={18} />
            <strong>3. Gün:</strong> Kısa vadeli hafızadan uzun vadeli hafızaya geçiş
          </li>
          <li>
            <Clock size={18} />
            <strong>7. Gün:</strong> Unutma eğrisini kırma
          </li>
          <li>
            <Clock size={18} />
            <strong>15. Gün:</strong> Kalıcı hale getirme
          </li>
          <li>
            <Clock size={18} />
            <strong>1 Ay:</strong> Uzun vadeli pekiştirme
          </li>
        </ul>
        <p className="warning">
          <AlertTriangle size={18} />
          Yapılmayan tekrarlar bir sonraki güne otomatik olarak eklenir. 
          Ezber açığı oluşmaması için günlük tekrarlarınızı düzenli yapın!
        </p>
      </div>

      <div className="upcoming-reviews">
        <h3>📅 Yaklaşan Tekrarlar</h3>
        <table>
          <thead>
            <tr>
              <th>Tarih</th>
              <th>Sayfa</th>
              <th>Sure</th>
              <th>İnterval</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Yarın</td>
              <td>25</td>
              <td>Bakara</td>
              <td>1. Gün</td>
            </tr>
            <tr>
              <td>2 Gün Sonra</td>
              <td>30</td>
              <td>Al-i Imran</td>
              <td>3. Gün</td>
            </tr>
            <tr>
              <td>5 Gün Sonra</td>
              <td>35</td>
              <td>Nisa</td>
              <td>7. Gün</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MuracaatSystem;
