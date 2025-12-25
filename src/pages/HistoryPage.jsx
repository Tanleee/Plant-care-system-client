import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { Thermometer, Droplets, Sun, CalendarDays } from 'lucide-react';
import NavBar from "../components/shared/NavBar"; 
import Footer from "../components/shared/Footer";

// Dữ liệu giả lập (Mô phỏng 24h qua tại bàn làm việc)
const historyData = [
  { time: '00:00', temp: 24, hum: 60, light: 0 },
  { time: '04:00', temp: 23, hum: 62, light: 0 },
  { time: '08:00', temp: 25, hum: 58, light: 300 },
  { time: '12:00', temp: 32, hum: 45, light: 850 },
  { time: '16:00', temp: 30, hum: 50, light: 600 },
  { time: '20:00', temp: 27, hum: 55, light: 150 },
  { time: '23:59', temp: 25, hum: 58, light: 20 },
];

const HistoryPage = () => {
  return (
    <>
      <NavBar />
      <div style={{ minHeight: '100vh', background: '#f0fdf4', padding: '24px' }}> {/* Nền xanh nhẹ đồng bộ */}
        
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Header Trang */}
          <div style={{ marginBottom: '30px', textAlign: 'center' }}>
            <h1 style={{ color: '#065f46', fontSize: '1.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
              <CalendarDays /> Lịch sử Môi trường
            </h1>
            <p style={{ color: '#059669' }}>Theo dõi chất lượng không khí góc làm việc của bạn</p>
          </div>

          {/* Grid Biểu đồ */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>

            {/* 1. BIỂU ĐỒ NHIỆT ĐỘ & ĐỘ ẨM (Quan trọng nhất với Smart Clock) */}
            <div className="chart-card" style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#1e293b', display: 'flex', gap: '8px' }}>
                  <Thermometer color="#ea580c"/> Nhiệt độ & Độ ẩm
                </h3>
                <div style={{ fontSize: '0.9rem', color: '#64748b', background: '#f1f5f9', padding: '4px 12px', borderRadius: '20px' }}>
                  24 giờ qua
                </div>
              </div>

              <div style={{ height: '300px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea580c" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorHum" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                    <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3"/>
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    />
                    
                    {/* Đường Nhiệt độ (Cam) */}
                    <Area type="monotone" dataKey="temp" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" name="Nhiệt độ (°C)" />
                    {/* Đường Độ ẩm (Xanh dương) */}
                    <Area type="monotone" dataKey="hum" stroke="#0ea5e9" strokeWidth={3} fillOpacity={1} fill="url(#colorHum)" name="Độ ẩm (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 2. BIỂU ĐỒ ÁNH SÁNG (Cần thiết cho bàn làm việc) */}
            <div className="chart-card" style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.05)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, color: '#1e293b', display: 'flex', gap: '8px' }}>
                  <Sun color="#f59e0b"/> Cường độ Ánh sáng
                </h3>
              </div>

              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={historyData}>
                    <CartesianGrid vertical={false} stroke="#e2e8f0" strokeDasharray="3 3"/>
                    <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10}/>
                    <Tooltip 
                      cursor={{fill: '#fef3c7', opacity: 0.4}}
                      contentStyle={{ borderRadius: '12px', border: 'none' }}
                    />
                    <Bar dataKey="light" name="Ánh sáng (Lux)" radius={[6, 6, 0, 0]}>
                      {historyData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.light > 400 ? '#f59e0b' : '#cbd5e1'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.85rem', marginTop: '15px' }}>
                *Cột màu xám: Ánh sáng yếu • Cột màu vàng: Đủ sáng làm việc
              </p>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;