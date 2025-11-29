import React from "react";
import { Calendar, MapPin, Clock, Users } from "lucide-react";
import { useNavigate, useRouteLoaderData } from "react-router";

export default function BookingsTab() {
  const tours = useRouteLoaderData("user");

  const navigate = useNavigate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getNextStartDate = (startDates) => {
    const today = new Date();
    const upcomingDates = startDates
      .map((date) => new Date(date))
      .filter((date) => date >= today)
      .sort((a, b) => a - b);

    return upcomingDates.length > 0
      ? upcomingDates[0]
      : new Date(startDates[startDates.length - 1]);
  };

  return (
    <div className="content-section">
      <div className="section-header">
        <h2 className="section-title">Các Tour Đã Đặt</h2>{" "}
        <p className="section-subtitle">
          Xem và quản lý các tour đã đặt của bạn
        </p>{" "}
      </div>

      <div className="bookings-list">
        {tours && tours.length > 0 ? (
          <>
            {tours.map((tour) => {
              const nextDate = getNextStartDate(tour.startDates);
              return (
                <div
                  key={tour._id}
                  className="booking-card"
                  onClick={() => navigate(`/tours/${tour.id}`)}
                >
                  <div className="booking-image">
                    <img
                      src={`/img/tours/${tour.imageCover}`}
                      alt={tour.name}
                      onError={(e) => {
                        e.target.src =
                          "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop";
                      }}
                    />
                  </div>
                  <div className="booking-info">
                    <h3 className="booking-title">{tour.name}</h3>
                    <div className="booking-details">
                      <div className="detail-item">
                        <Calendar size={16} />
                        <span>{formatDate(nextDate)}</span>
                      </div>
                      <div className="detail-item">
                        <MapPin size={16} />
                        <span>{tour.startLocation.description}</span>
                      </div>
                      <div className="detail-item">
                        <Clock size={16} />
                        <span>{tour.duration} ngày</span> {/* Đã dịch: days */}
                      </div>
                      <div className="detail-item">
                        <Users size={16} />
                        <span>Tối đa {tour.maxGroupSize} người</span>{" "}
                        {/* Đã dịch: Max [X] people */}
                      </div>
                    </div>
                    <div className="booking-status status-confirmed">
                      Đã Xác Nhận {/* Đã dịch: Confirmed */}
                    </div>
                  </div>
                  <div className="booking-price">${tour.price}</div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="empty-state">
            <Calendar size={48} className="empty-icon" />
            <h3>Chưa có tour nào được đặt</h3> {/* Đã dịch: No bookings yet */}
            <p>Hãy bắt đầu chuyến phiêu lưu bằng cách đặt một tour!</p>{" "}
            {/* Đã dịch: Start your adventure by booking a tour! */}
            <button
              className="btn-secondary"
              onClick={() => navigate("/tours")}
            >
              Tìm Tour Ngay
            </button>{" "}
          </div>
        )}
      </div>
    </div>
  );
}
