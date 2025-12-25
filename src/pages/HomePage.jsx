import React, { useEffect, useState } from "react";
import { useLoaderData, useRevalidator } from "react-router";
import {
  Clock, Wifi, WifiOff, Calendar, 
  Sun, Thermometer, List, Plus
} from "lucide-react";

import "./../assets/homePageStyle.css";
import NavBar from "../components/shared/NavBar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  // --- LOGIC DATA LOADER (GIỮ NGUYÊN) ---
  const initialData = useLoaderData();
  const revalidator = useRevalidator();

  const sensorData = React.useMemo(() => {
    if (initialData) {
      return {
        temperature: initialData.temperature || 28,
        humidity: initialData.humidity || 65,
        light: initialData.light || 450,
        isOnline: true, 
      };
    }
    return { temperature: 0, humidity: 0, light: 0, isOnline: false };
  }, [initialData]);

  // --- LOGIC ĐỒNG HỒ MỚI (Đã sửa để nhận giờ từ Control Page) ---
  const [clockData, setClockData] = useState({
    timeStr: "--:--",
    dateStr: "",
    city: "Hà Nội"
  });

  useEffect(() => {
    const updateClock = () => {
      // 1. Lấy cấu hình từ LocalStorage (được lưu bên ControlPage)
      const savedZone = localStorage.getItem('homeTimeZone') || 'Asia/Bangkok';
      const savedCity = localStorage.getItem('homeCityName') || 'Hà Nội';
      
      const now = new Date();

      // 2. Format giờ theo múi giờ đã chọn
      const timeString = now.toLocaleTimeString('vi-VN', {
        timeZone: savedZone,
        hour: '2-digit', 
        minute:'2-digit'
      });

      // 3. Format ngày theo múi giờ đã chọn
      const dateString = now.toLocaleDateString('vi-VN', {
        timeZone: savedZone,
        weekday: 'long', 
        day: 'numeric', 
        month: 'long'
      });

      setClockData({
        timeStr: timeString,
        dateStr: dateString,
        city: savedCity
      });
    };

    // Chạy ngay lập tức để không bị delay
    updateClock();

    // Cập nhật mỗi giây
    const timer = setInterval(updateClock, 1000);
    
    // Revalidate dữ liệu sensor (Giữ nguyên logic cũ của bạn)
    const interval = setInterval(() => revalidator.revalidate(), 300000);

    return () => { clearInterval(timer); clearInterval(interval); };
  }, [revalidator]);

  const tasks = [
    { id: 1, text: "Họp team thiết kế", time: "09:00", status: "active" },
    { id: 2, text: "Review code Frontend", time: "14:30", status: "pending" },
    { id: 3, text: "Gửi báo cáo cuối ngày", time: "17:00", status: "pending" },
  ];

  // --- GIAO DIỆN ---
  return (
    <>
      {/* <NavBar /> */}
      <div className="homepage">
        
        {/* HEADER */}
        <header className="header">
          <div className="header-top">
            <div className="header-title">
              <div className="logo-wrapper" style={{background: 'linear-gradient(135deg, #059669, #047857)'}}>
                <Clock size={32} color="white" />
              </div>
              <div className="title-group">
                <h1>Smart Desk Controller</h1>
                <p>Hệ thống quản lý thời gian & Môi trường</p>
              </div>
            </div>

            <div className={`status-indicator ${!sensorData.isOnline ? "offline" : ""}`}>
               {sensorData.isOnline ? (
                  <>
                    <div className="status-dot"></div>
                    <Wifi size={18} />
                    <span>Đã kết nối</span>
                  </>
               ) : (
                  <>
                    <div className="status-dot"></div>
                    <WifiOff size={18} />
                    <span>Mất tín hiệu</span>
                  </>
               )}
            </div>
          </div>
        </header>

        {/* --- MAIN GRID --- */}
        <div className="dashboard-grid">
          
          {/* 1. HERO CLOCK (Đã cập nhật để hiển thị tên thành phố) */}
          <div className="card" style={{ 
              gridColumn: 'span 12', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '3rem 2rem', 
              background: 'white' 
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Clock size={24} color="#10b981"/> 
              <span style={{fontSize: '1.1rem', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px'}}>
                Thời gian tại {clockData.city} {/* Hiển thị tên TP */}
              </span>
            </div>
            
            {/* Đồng hồ số siêu to */}
            <div className="clock-display" style={{ fontSize: '6rem', margin: '10px 0' }}>
              {clockData.timeStr} {/* Sử dụng giờ đã format */}
            </div>
            
            {/* Ngày tháng */}
            <div style={{ 
                fontSize: '1.5rem', 
                color: '#64748b', 
                fontWeight: '500',
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                background: '#f1f5f9',
                padding: '8px 24px',
                borderRadius: '50px'
            }}>
              <Calendar size={24} color="#64748b" />
              {clockData.dateStr} {/* Sử dụng ngày đã format */}
            </div>
          </div>

          {/* 2. MÔI TRƯỜNG (Giữ nguyên) */}
          
          {/* Thẻ Nhiệt độ */}
          <div className="card" style={{ gridColumn: 'span 6', position: 'relative', overflow: 'hidden' }}>
             <div className="card-title">
                <Thermometer size={24} color="#ea580c"/> 
                <span style={{fontSize: '1.2rem', fontWeight: '600', color: '#374151'}}>Nhiệt độ phòng</span>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                   <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#ea580c', lineHeight: 1 }}>
                      {sensorData.temperature}°
                   </div>
                   <p style={{ marginTop: 5, color: '#9a3412' }}>Trạng thái: Ổn định</p>
                </div>
                <div style={{ opacity: 0.1, transform: 'scale(1.5)', marginRight: 20 }}>
                    <Thermometer size={100} color="#ea580c"/>
                </div>
             </div>
          </div>

          {/* Thẻ Ánh sáng */}
          <div className="card" style={{ gridColumn: 'span 6', position: 'relative', overflow: 'hidden' }}>
             <div className="card-title">
                <Sun size={24} color="#f59e0b"/> 
                <span style={{fontSize: '1.2rem', fontWeight: '600', color: '#374151'}}>Ánh sáng</span>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                   <div style={{ fontSize: '3.5rem', fontWeight: '800', color: '#f59e0b', lineHeight: 1 }}>
                      {Math.round(sensorData.light)}
                   </div>
                   <p style={{ marginTop: 5, color: '#b45309' }}>Đơn vị: Lux</p>
                </div>
                <div style={{ opacity: 0.15, transform: 'scale(1.5)', marginRight: 20 }}>
                    <Sun size={100} color="#f59e0b"/>
                </div>
             </div>
          </div>

          {/* 3. TASK LIST (Giữ nguyên) */}
          <div className="card" style={{ gridColumn: 'span 12' }}>
            <div className="card-title" style={{ justifyContent: 'space-between', marginBottom: '20px' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <List size={24} color="#10b981"/> 
                  <span style={{fontSize: '1.2rem', fontWeight: '600'}}>Nhiệm vụ trong ngày</span>
               </div>
               <button style={{ 
                  background: '#10b981', color: 'white', border: 'none', 
                  padding: '10px 20px', borderRadius: '8px', cursor: 'pointer',
                  fontWeight: '600', display: 'flex', alignItems: 'center', gap: '5px',
                  boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
               }}>
                  <Plus size={18}/> Thêm việc
               </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
               {tasks.map((task) => (
                 <div key={task.id} className={`task-item ${task.status === 'active' ? 'active' : ''}`}>
                    <div style={{flex: 1}}>
                       <div style={{ fontWeight: '700', color: '#334155', fontSize: '1rem' }}>{task.text}</div>
                       <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <Clock size={14} /> {task.time}
                       </div>
                    </div>
                    {task.status === 'active' && (
                       <span style={{ fontSize: '0.75rem', color: '#047857', fontWeight: '700', background: '#d1fae5', padding: '6px 12px', borderRadius: '20px' }}>Now</span>
                    )}
                 </div>
               ))}
            </div>
          </div>

        </div>
        
        <footer className="footer">
           <p>Smart Desk System v2.0 • Designed by You</p>
        </footer>
      </div>
    </>
  );
};

export default HomePage;