import React from 'react';
import { BookOpen, Repeat, Mic, AlertCircle, Eye, Link2, BarChart3, Gift, Calendar, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const features = [
    { 
      icon: <Calendar size={32} />, 
      title: 'Ezber Planı', 
      desc: 'Seviyene göre günlük ezber programı oluştur',
      link: '/plan'
    },
    { 
      icon: <Repeat size={32} />, 
      title: 'Akıllı Tekrar', 
      desc: 'Unutmayı engelleyen otomatik tekrar sistemi',
      link: '/muracaat'
    },
    { 
      icon: <Mic size={32} />, 
      title: 'Sesli Pratik', 
      desc: 'Kendi sesini kaydet ve hatalarını tespit et',
      link: '/audio'
    },
    { 
      icon: <AlertCircle size={32} />, 
      title: 'Hata Takibi', 
      desc: 'Zayıf noktalarını belirle ve daha sık tekrar et',
      link: '/errors'
    },
    { 
      icon: <Eye size={32} />, 
      title: 'Kısmi Gizleme', 
      desc: 'Metni kısmen gizleyerek kendini test et',
      link: '/partial-hide'
    },
    { 
      icon: <Link2 size={32} />, 
      title: 'Bağlam Takibi', 
      desc: 'Ayetler arası bağlantıları öğren',
      link: '/context'
    },
    { 
      icon: <BookOpen size={32} />, 
      title: 'Cüz Köprüsü', 
      desc: 'Cüz geçişlerinde kopuklukları önle',
      link: '/bridge'
    },
    { 
      icon: <BarChart3 size={32} />, 
      title: 'İstatistikler', 
      desc: 'İlerlemeni grafiklerle takip et',
      link: '/stats'
    },
    { 
      icon: <Gift size={32} />, 
      title: 'Hatim Bağışı', 
      desc: 'Vefat eden yakınların için hatim bağışla',
      link: '/hatim'
    },
  ];

  return (
    <div className="dashboard">
      <div className="welcome-section">
        <h1>📖 Kuran Ezber Platformuna Hoş Geldiniz</h1>
        <p>Allah'ın kelamını kalbinize nakşetme yolculuğunuzda yanınızdayız</p>
        
        <div className="quick-stats">
          <div className="stat-card">
            <h3>📊 Bugünkü Hedef</h3>
            <p className="stat-number">2 Sayfa</p>
          </div>
          <div className="stat-card">
            <h3>🔄 Tekrarlar</h3>
            <p className="stat-number">5 Sayfa</p>
          </div>
          <div className="stat-card">
            <h3>🔥 Seri Günler</h3>
            <p className="stat-number">7 Gün</p>
          </div>
        </div>
      </div>

      <div className="features-grid">
        {features.map((feature, index) => (
          <Link to={feature.link} key={index} className="feature-card">
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
            <span className="feature-link">Detaylı Bilgi →</span>
          </Link>
        ))}
      </div>

      <div className="daily-reminder">
        <h2>📿 Günlük Hatırlatma</h2>
        <blockquote>
          "Andolsun, biz Kur'an'ı öğüt alıp düşünesiniz diye kolaylaştırdık." 
          <cite>- Kamer Suresi, 17. Ayet</cite>
        </blockquote>
      </div>
    </div>
  );
};

export default Dashboard;
