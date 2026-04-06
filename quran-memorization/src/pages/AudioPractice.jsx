import React, { useState, useRef } from 'react';
import { Mic, Play, Pause, Square, Volume2, VolumeX, Headphones } from 'lucide-react';

const AudioPractice = () => {
  const [mode, setMode] = useState('listen'); // 'listen' or 'record'
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const timerRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      
      const chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecordings([...recordings, { 
          url, 
          timestamp: new Date().toLocaleTimeString(),
          duration: recordingTime 
        }]);
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Mikrofon erişim hatası:', err);
      alert('Mikrofona erişilemedi. Lütfen izinleri kontrol edin.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timerRef.current);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-practice">
      <h1>🎤 Çift Yönlü Sesli Dinleme ve Kapatma (Mascat) Modu</h1>
      
      <div className="mode-selector">
        <button 
          className={`mode-btn ${mode === 'listen' ? 'active' : ''}`}
          onClick={() => setMode('listen')}
        >
          <Headphones size={24} />
          <span>Sadece Dinle</span>
        </button>
        <button 
          className={`mode-btn ${mode === 'record' ? 'active' : ''}`}
          onClick={() => setMode('record')}
        >
          <Mic size={24} />
          <span>Kendini Kaydet ve Dinle</span>
        </button>
      </div>

      {mode === 'listen' && (
        <div className="listen-mode">
          <div className="qari-selector">
            <h2>📖 Kıraat Hocası Seçin</h2>
            <select>
              <option>Mishary Rashid Alafasy</option>
              <option>Abdul Basit Abdul Samad</option>
              <option>Maher Al Mueaqly</option>
              <option>Saad Al Ghamdi</option>
              <option>Abdurrahman As-Sudais</option>
            </select>
          </div>

          <div className="player-controls">
            <div className="current-verse">
              <h3>Bakara Suresi - Ayet 1-5</h3>
              <p className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            </div>
            
            <div className="controls">
              <button className="control-btn">
                <Square size={24} />
              </button>
              <button 
                className="control-btn play"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause size={32} /> : <Play size={32} />}
              </button>
              <button className="control-btn">
                <Square size={24} />
              </button>
            </div>

            <div className="playback-options">
              <label>
                <input type="checkbox" />
                Tekrarla (Loop)
              </label>
              <label>
                <input type="checkbox" />
                Yavaşlat (0.8x)
              </label>
            </div>
          </div>

          <div className="listening-tips">
            <h3>💡 Dinleme İpuçları</h3>
            <ul>
              <li>Hocanın telaffuzuna dikkat edin</li>
              <li>Tecvid kurallarını gözlemleyin</li>
              <li>Duraklama yerlerini not alın</li>
              <li>Ayetler arası geçişleri takip edin</li>
            </ul>
          </div>
        </div>
      )}

      {mode === 'record' && (
        <div className="record-mode">
          <div className="recording-interface">
            <h2>🎙️ Kendi Sesinizi Kaydedin</h2>
            <p className="instruction">
              Önce hocayı dinleyin, sonra mikrofona okuyun ve kendi sesinizi dinleyerek 
              hatalarınızı tespit edin.
            </p>

            <div className="recorder-controls">
              {!isRecording ? (
                <button className="btn-record" onClick={startRecording}>
                  <Mic size={32} />
                  Kaydı Başlat
                </button>
              ) : (
                <button className="btn-stop" onClick={stopRecording}>
                  <Square size={32} />
                  Kaydı Durdur ({formatTime(recordingTime)})
                </button>
              )}
            </div>

            <div className="reference-verse">
              <h3>Referans Ayet</h3>
              <p className="arabic-text">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="translation">"Rahman ve Rahim olan Allah'ın adıyla"</p>
            </div>
          </div>

          {recordings.length > 0 && (
            <div className="recordings-list">
              <h3>📼 Kayıtlarınız</h3>
              {recordings.map((recording, index) => (
                <div key={index} className="recording-item">
                  <div className="recording-info">
                    <span>Kayıt #{index + 1}</span>
                    <span>{recording.timestamp}</span>
                    <span>{formatTime(recording.duration)}</span>
                  </div>
                  <audio controls src={recording.url} />
                  <div className="self-check">
                    <h4>Kontrol Listesi:</h4>
                    <label><input type="checkbox" /> Harf hatası var mı?</label>
                    <label><input type="checkbox" /> Tecvid doğru mu?</label>
                    <label><input type="checkbox" /> Duraklamalar uygun mu?</label>
                    <label><input type="checkbox" /> Ezber doğru mu?</label>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="recording-tips">
            <h3>💡 Kendini Değerlendirme İpuçları</h3>
            <ul>
              <li>Kendi sesinizi objektif olarak dinleyin</li>
              <li>Hoca ile karşılaştırma yapın</li>
              <li>Harf çıkış noktalarını kontrol edin</li>
              <li>Tecvid kurallarını uygulayıp uygulamadığınızı kontrol edin</li>
              <li>Hata yaptığınız yerleri işaretleyin ve tekrar edin</li>
            </ul>
          </div>
        </div>
      )}

      <div className="mascat-explanation">
        <h3>ℹ️ Mascat Modu Nedir?</h3>
        <p>
          <strong>Mascat</strong>, Arapça "dinleme yeri" anlamına gelir. Bu modda iki farklı 
          çalışma yöntemi vardır:
        </p>
        <ol>
          <li>
            <Volume2 size={18} />
            <strong>Kıraat Esnasında:</strong> Sadece hocanın sesini dinlersiniz. 
            Ezberi pekiştirir ve doğru okumayı öğrenirsiniz.
          </li>
          <li>
            <Mic size={18} />
            <strong>Kendini Dinleme:</strong> Kendi sesinizi kaydedip dinlersiniz. 
            Hata tespiti yaparak kendinizi düzeltirsiniz.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default AudioPractice;
