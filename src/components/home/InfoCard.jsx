import React from 'react';
import { TrendingUp } from 'lucide-react';

const InfoCard = ({ icon: Icon, title, value, subtitle, trend }) => {
  return (
    <div className="info-card">
      <div className="info-card-header">
        <div className="info-icon-wrapper">
          <Icon size={20} />
        </div>
        <span className="info-title">{title}</span>
      </div>
      <div className="info-value">{value}</div>
      <div className="info-footer">
        <span className="info-subtitle">{subtitle}</span>
        {trend && (
          <div
            className={`info-trend ${trend > 0 ? 'trend-up' : 'trend-down'}`}
          >
            <TrendingUp size={14} />
            <span>{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
