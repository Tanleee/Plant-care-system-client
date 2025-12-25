import React, { useState, useEffect, useMemo } from 'react';
import * as d3 from 'd3';
import { DateTime } from 'luxon';
import * as topojson from 'topojson-client';
// Import file bản đồ bạn đã có trong máy
import worldData from './world-110m.json';

const WorldClockMap = ({ cities = [] }) => {
  const [time, setTime] = useState(new Date());

  // Cập nhật thời gian thực mỗi giây
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Cấu hình bản đồ
  const width = 960;
  const height = 480;
  
  const projection = d3.geoEquirectangular()
    .translate([width / 2, height / 2])
    .scale(150); // Độ zoom

  const pathGenerator = d3.geoPath().projection(projection);

  // Tính toán vùng tối (Night Region)
  const getNightPath = (date) => {
    const solarPosition = getSolarPosition(date || new Date());
    const circle = d3.geoCircle()
      .center([solarPosition.lng - 180, -solarPosition.lat])
      .radius(90);
    return circle();
  };

  const getSolarPosition = (date) => {
    const century = (date.getTime() - 946728000000) / 3155760000000;
    const longitude = (date.getUTCHours() + date.getUTCMinutes() / 60 + date.getUTCSeconds() / 3600) / 24 * 360 - 180;
    const latitude = 23.44 * Math.sin(2 * Math.PI * (date.getTime() / 31557600000 + 0.25)); 
    return { lat: latitude, lng: -longitude };
  };

  // Xử lý dữ liệu bản đồ
  const world = useMemo(() => {
    if (!worldData) return [];
    return topojson.feature(worldData, worldData.objects.countries).features;
  }, []);

  return (
    <div className="map-section" style={{ background: '#1e293b', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}>
      <svg viewBox={`0 0 ${width} ${height}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
        
        {/* 1. Lớp nền đại dương */}
        <rect width={width} height={height} fill="#1e293b" />

        {/* 2. Vẽ Đất liền */}
        <g>
          {world.map((d, i) => (
            <path
              key={`country-${i}`}
              d={pathGenerator(d)}
              fill="#334155"     // Màu đất
              stroke="#1e293b"   // Viền đất trùng màu nền
              strokeWidth="0.5"
            />
          ))}
        </g>

        {/* 3. Vẽ Vùng tối (Shadow) */}
        <path
          d={pathGenerator(getNightPath(time))}
          fill="rgba(0, 0, 0, 0.55)" // Màu tối che phủ
          style={{ pointerEvents: 'none' }}
        />

        {/* 4. Vẽ các điểm thành phố và Giờ */}
        {cities.map((city, i) => {
          const coords = projection([city.lng, city.lat]);
          if (!coords) return null;
          const [x, y] = coords;
          
          // Lấy giờ địa phương
          const localTime = DateTime.now().setZone(city.zone).toFormat('HH:mm');
          
          return (
            <g key={i} transform={`translate(${x}, ${y})`} style={{ cursor: 'pointer' }}>
              
              {/* Vòng tròn tỏa sáng */}
              <circle r={8} fill="#10B981" opacity="0.3">
                <animate attributeName="r" values="4;12;4" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" repeatCount="indefinite" />
              </circle>
              
              {/* Chấm tâm */}
              <circle r={3} fill="#10B981" stroke="#fff" strokeWidth={1} />
              
              {/* Nhãn tên và giờ (Luôn hiển thị) */}
              <g transform="translate(8, 4)">
                {/* Nền đen mờ phía sau chữ để dễ đọc */}
                <rect x="-2" y="-10" width="70" height="24" rx="4" fill="rgba(0,0,0,0.6)" />
                
                <text 
                  x="2" y="0" 
                  fontSize="9" 
                  fill="#ffffff" 
                  fontWeight="bold" 
                  fontFamily="sans-serif"
                >
                  {city.city || city.name} {/* Chấp nhận cả key 'city' hoặc 'name' */}
                </text>
                
                <text 
                  x="2" y="10" 
                  fontSize="9" 
                  fill="#34d399" 
                  fontWeight="bold" 
                  fontFamily="monospace"
                >
                  {localTime}
                </text>
              </g>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default WorldClockMap;