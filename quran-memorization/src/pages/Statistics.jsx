import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Target, Award, Activity } from 'lucide-react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, LineElement, PointElement);

const Statistics = () => {
  const [timeRange, setTimeRange] = useState('month'); // week, month, year

  const memorizationData = {
    week: { newPages: 14, reviewPages: 35, errors: 8 },
    month: { newPages: 60, reviewPages: 150, errors: 25 },
    year: { newPages: 400, reviewPages: 1200, errors: 150 }
  };

  const pieData = {
    labels: ['Yeni Ezber', 'Tekrar', 'Hatalı'],
    datasets: [
      {
        label: 'Sayfa Dağılımı',
        data: [memorizationData[timeRange].newPages, memorizationData[timeRange].reviewPages, memorizationData[timeRange].errors],
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800'],
        borderColor: ['#388E3C', '#1976D2', '#F57C00'],
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Hafta 1', 'Hafta 2', 'Hafta 3', 'Hafta 4'],
    datasets: [
      {
        label: 'Yeni Ezber',
        data: [12, 15, 18, 15],
        backgroundColor: '#4CAF50',
      },
      {
        label: 'Tekrar',
        data: [30, 35, 40, 45],
        backgroundColor: '#2196F3',
      },
    ],
  };

  const lineData = {
    labels: ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara'],
    datasets: [
      {
        label: 'Günlük Ortalama',
        data: [1.5, 1.8, 2.0, 2.2, 2.5, 2.3, 2.7, 3.0, 2.8, 3.2, 3.5, 3.8],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const surahStats = [
    { name: 'Bakara', pages: 48, errors: 12, completion: 85 },
    { name: 'Al-i Imran', pages: 40, errors: 8, completion: 92 },
    { name: 'Nisa', pages: 35, errors: 10, completion: 78 },
    { name: 'Maide', pages: 24, errors: 5, completion: 95 },
    { name: 'Enam', pages: 20, errors: 7, completion: 88 },
  ];

  return (
    <div className="statistics">
      <h1>📊 Kişisel İstikrar ve İstatistik Takibi</h1>
      
      <div className="stats-intro">
        <p>
          "Bu ay kaç sayfa yeni ezberledim?", "Kaç gün üst üste tekrarımı yaptım?", 
          "En çok hangi cüzde/surede hata yapıyorum?" sorularına anlık cevap veren 
          grafikler ve raporlar.
        </p>
      </div>

      <div className="time-range-selector">
        <button 
          className={timeRange === 'week' ? 'active' : ''}
          onClick={() => setTimeRange('week')}
        >
          Bu Hafta
        </button>
        <button 
          className={timeRange === 'month' ? 'active' : ''}
          onClick={() => setTimeRange('month')}
        >
          Bu Ay
        </button>
        <button 
          className={timeRange === 'year' ? 'active' : ''}
          onClick={() => setTimeRange('year')}
        >
          Bu Yıl
        </button>
      </div>

      <div className="stats-overview">
        <div className="stat-card primary">
          <Target size={32} />
          <div>
            <h3>Yeni Ezber</h3>
            <p className="number">{memorizationData[timeRange].newPages}</p>
            <span className="label">Sayfa</span>
          </div>
        </div>
        <div className="stat-card secondary">
          <Activity size={32} />
          <div>
            <h3>Tekrar</h3>
            <p className="number">{memorizationData[timeRange].reviewPages}</p>
            <span className="label">Sayfa</span>
          </div>
        </div>
        <div className="stat-card warning">
          <Award size={32} />
          <div>
            <h3>Seri Günler</h3>
            <p className="number">21</p>
            <span className="label">Gün</span>
          </div>
        </div>
        <div className="stat-card danger">
          <BarChart3 size={32} />
          <div>
            <h3>Hatalar</h3>
            <p className="number">{memorizationData[timeRange].errors}</p>
            <span className="label">Toplam</span>
          </div>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-container">
          <h2>📊 Sayfa Dağılımı</h2>
          <Pie data={pieData} />
        </div>

        <div className="chart-container">
          <h2>📈 Haftalık İlerleme</h2>
          <Bar data={barData} />
        </div>

        <div className="chart-container full-width">
          <h2>📉 Aylık Trend</h2>
          <Line data={lineData} />
        </div>
      </div>

      <div className="surah-analysis">
        <h2>📖 Sure Bazlı İstatistikler</h2>
        <table className="surah-table">
          <thead>
            <tr>
              <th>Sure</th>
              <th>Sayfa</th>
              <th>Hata</th>
              <th>Tamamlanma</th>
              <th>Durum</th>
            </tr>
          </thead>
          <tbody>
            {surahStats.map(surah => (
              <tr key={surah.name}>
                <td><strong>{surah.name}</strong></td>
                <td>{surah.pages}</td>
                <td className="error-count">{surah.errors}</td>
                <td>
                  <div className="progress-mini">
                    <div className="progress-fill-mini" style={{ width: `${surah.completion}%` }}></div>
                    <span>{surah.completion}%</span>
                  </div>
                </td>
                <td>
                  {surah.completion >= 90 ? (
                    <span className="status-badge success">Mükemmel</span>
                  ) : surah.completion >= 70 ? (
                    <span className="status-badge warning">İyi</span>
                  ) : (
                    <span className="status-badge danger">Geliştirilmeli</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="consistency-tracker">
        <h2>🔥 İstikrar Takvimi</h2>
        <div className="calendar-grid">
          {Array.from({ length: 30 }, (_, i) => {
            const intensity = Math.random();
            return (
              <div 
                key={i} 
                className={`calendar-day level-${intensity > 0.75 ? '4' : intensity > 0.5 ? '3' : intensity > 0.25 ? '2' : '1'}`}
                title={`Gün ${i + 1}`}
              >
                {i + 1}
              </div>
            );
          })}
        </div>
        <div className="legend">
          <span>Az</span>
          <div className="legend-item level-1"></div>
          <div className="legend-item level-2"></div>
          <div className="legend-item level-3"></div>
          <div className="legend-item level-4"></div>
          <span>Çok</span>
        </div>
      </div>

      <div className="achievements">
        <h2>🏆 Başarılar</h2>
        <div className="achievement-grid">
          <div className="achievement earned">
            <span className="icon">🌟</span>
            <h3>İlk Adım</h3>
            <p>İlk sayfayı ezberle</p>
          </div>
          <div className="achievement earned">
            <span className="icon">🔥</span>
            <h3>Alev Serisi</h3>
            <p>7 gün üst üste tekrar</p>
          </div>
          <div className="achievement earned">
            <span className="icon">📚</span>
            <h3>İlk Cüz</h3>
            <p>1. cüzü tamamla</p>
          </div>
          <div className="achievement locked">
            <span className="icon">🎯</span>
            <h3>Yarı Yol</h3>
            <p>15. cüze ulaş</p>
          </div>
          <div className="achievement locked">
            <span className="icon">💎</span>
            <h3>Mükemmeliyet</h3>
            <p>30 gün hatasız</p>
          </div>
          <div className="achievement locked">
            <span className="icon">👑</span>
            <h3>Hatim</h3>
            <p>Kuran'ı baştan sona ezberle</p>
          </div>
        </div>
      </div>

      <div className="insights">
        <h2>💡 Kişisel İçgörüler</h2>
        <div className="insights-list">
          <div className="insight-card positive">
            <TrendingUp size={24} />
            <div>
              <h3>Harika Gidiyorsunuz!</h3>
              <p>Son aydaki ezber hızınız %25 arttı. Bu tempoyu koruyun!</p>
            </div>
          </div>
          <div className="insight-card warning">
            <Calendar size={24} />
            <div>
              <h3>Dikkat!</h3>
              <p>Hafta sonları tekrar sayınız düşüyor. Programınızı gözden geçirin.</p>
            </div>
          </div>
          <div className="insight-card info">
            <Target size={24} />
            <div>
              <h3>Öneri</h3>
              <p>En çok hata yaptığınız sure "Bakara". Bu sureye daha fazla zaman ayırın.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="export-options">
        <h2>📤 Raporu Paylaş</h2>
        <div className="export-buttons">
          <button className="btn-export">PDF Olarak İndir</button>
          <button className="btn-export">Resim Olarak Kaydet</button>
          <button className="btn-export">Hocamla Paylaş</button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
