import React from "react";
import { useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import "./../../assets/footerStyle.css";

// Footer Component
function FooterSection({ title, items, links }) {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (link === "#" || link === "/#") {
      // Nếu link là # thì không làm gì
      return;
    }
    navigate(link);
  };

  return (
    <div className="footer-section">
      <h3 className="footer-section-title">{title}</h3>
      <ul className="footer-links">
        {items.map((item, index) => (
          <li key={index}>
            <span
              onClick={() => handleClick(links[index])}
              className="footer-link"
              style={{
                cursor:
                  links[index] === "#" || links[index] === "/#"
                    ? "default"
                    : "pointer",
              }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const footerSections = [
    {
      title: "Công Ty",
      items: ["Về Chúng Tôi", "Tuyển Dụng", "Truyền Thông"],
      links: ["/about", "/#", "/#"],
    },
    {
      title: "Hỗ Trợ",
      items: ["Trung Tâm Trợ Giúp", "Liên Hệ", "Câu Hỏi Thường Gặp"],
      links: ["/#", "/contact", "/#"],
    },
    {
      title: "Pháp Lý",
      items: ["Chính Sách Bảo Mật", "Điều Khoản Dịch Vụ", "Chính Sách Cookie"],
      links: ["/#", "/#", "/#"],
    },
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand-section">
            <div className="footer-brand">
              <div className="footer-logo">
                <Leaf size={32} color="green" />
              </div>
              <span className="footer-brand-name">Smart Clock</span>
            </div>
            <p className="footer-brand-description">
              Chăm sóc cây trồng thông minh, giám sát và quản lý vườn cây của
              bạn từ xa với công nghệ IoT hiện đại
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <FooterSection
              key={index}
              title={section.title}
              items={section.items}
              links={section.links}
            />
          ))}
        </div>

        {/* Copyright */}
        <div className="footer-copyright">
          <p className="footer-copyright-text">
            © 2025 Smart Clock Tất cả các quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
