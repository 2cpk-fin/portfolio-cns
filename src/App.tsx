import { useState, useEffect, useRef } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Assignment {
  id: string;
  week: string;
  module: string;
  title: string;
  subtitle: string;
  color: string;
  accent: string;
  icon: string;
  summary: string;
  tags: string[];
  details: {
    objective: string;
    method: string;
    outcome: string;
    keyPoints: string[];
  };
}

// ─── Data ────────────────────────────────────────────────────────────────────
const STUDENT = {
  name: "Trần Vũ Duy Hưng",
  id: "25020200",
  major: "Công nghệ Thông tin",
  class: "IT5",
  university: "UET – Đại học Quốc gia Hà Nội",
  role: "Full-stack Developer",
  goals: [
    "Thể hiện các kỹ năng số học",
    "Lưu trữ sản phẩm cá nhân dễ truy cập",
    "Xây dựng hồ sơ năng lực cho tương lai",
  ],
};

const ASSIGNMENTS: Assignment[] = [
  {
    id: "bai1",
    week: "Bài 1",
    module: "Mục 1.4",
    title: "Tệp tin & Thư mục",
    subtitle: "Thao tác cơ bản với hệ thống tệp",
    color: "#0ea5e9",
    accent: "#0284c7",
    icon: "📁",
    summary:
      "Thiết kế cấu trúc thư mục tối ưu, đặt tên tệp chuẩn và ghi lại quy trình bằng ảnh chụp màn hình.",
    tags: ["File System", "Tổ chức dữ liệu", "Naming Convention"],
    details: {
      objective:
        "Xây dựng hệ thống phân cấp thư mục hợp lý cho dự án học tập, áp dụng quy tắc đặt tên tệp nhất quán.",
      method:
        "Tạo cấu trúc thư mục theo chủ đề môn học, đặt tên theo chuẩn [MãMH]_[ChủĐề]_[Phiên bản]. Chụp ảnh minh họa từng bước.",
      outcome:
        "Hệ thống thư mục rõ ràng, dễ điều hướng. Tên tệp nhất quán, tránh ký tự đặc biệt và khoảng trắng.",
      keyPoints: [
        "Cấu trúc phân cấp: Môn học → Chủ đề → Phiên bản",
        "Quy tắc đặt tên: snake_case, không dấu cách",
        "Backup định kỳ lên Google Drive",
        "Screenshot minh hoạ từng bước thực hiện",
      ],
    },
  },
  {
    id: "bai2",
    week: "Bài 2",
    module: "Mục 2.4",
    title: "Tìm kiếm Học thuật",
    subtitle: "Đánh giá độ tin cậy tài liệu khoa học",
    color: "#8b5cf6",
    accent: "#7c3aed",
    icon: "🔬",
    summary:
      "Nghiên cứu kiến trúc Microservices trên IEEE, ACM, arXiv. Tổng hợp 10 tài liệu với bảng đánh giá độ tin cậy.",
    tags: ["Microservices", "IEEE/ACM", "Research", "Harvard Style"],
    details: {
      objective:
        "Tìm kiếm và đánh giá 10 tài liệu học thuật về kiến trúc Microservices trong hệ thống thương mại điện tử.",
      method:
        "Khai thác IEEE Xplore, ACM Digital Library, Google Scholar, arXiv. Đánh giá theo tiêu chí: tác giả, phương pháp, tính cập nhật, trích dẫn.",
      outcome:
        "Bảng tổng hợp 10 tài liệu với điểm tin cậy 4.5–5/5. Danh mục tham khảo Harvard Style hoàn chỉnh.",
      keyPoints: [
        "10 tài liệu: 5 bài báo Q1 (IEEE/ACM) + 3 sách O'Reilly + 2 whitepaper",
        "Từ khóa: Microservices Architecture, Scalability, Cloud-native",
        "Tập trung tài liệu 2024–2025 để bắt kịp xu hướng mới",
        "Newman & Richardson – những người định hình chuẩn kiến trúc hiện đại",
      ],
    },
  },
  {
    id: "bai3",
    week: "Bài 3",
    module: "Mục 3.4",
    title: "Prompt Engineering",
    subtitle: "Viết prompt hiệu quả cho tác vụ học tập",
    color: "#10b981",
    accent: "#059669",
    icon: "⚡",
    summary:
      "Phát triển Framework C-R-E-A-D, so sánh 3 cấp prompt: cơ bản → cải tiến → nâng cao với case study thực tế.",
    tags: ["Prompt Engineering", "LLM", "Chain-of-Thought", "C-R-E-A-D"],
    details: {
      objective:
        "Chuẩn hóa quy trình tương tác với LLM để giảm thiểu hallucination và tăng độ chính xác kỹ thuật.",
      method:
        "Phát triển prompt theo 3 cấp (Zero-shot → Few-shot → Role+Chain-of-Thought). Áp dụng Framework C-R-E-A-D.",
      outcome:
        "Prompt nâng cao đạt cấu trúc output chặt chẽ, phân tích sâu, tuân thủ định dạng học thuật. Rút ngắn 50% thời gian nghiên cứu.",
      keyPoints: [
        "C – Context: Cung cấp bối cảnh đầy đủ",
        "R – Role: Gán vai trò chuyên gia cho AI",
        "E – Explicit Task: Nhiệm vụ rõ ràng, đo lường được",
        "A – Audience: Xác định đối tượng nhận kết quả",
        "D – Deliverable: Chỉ định định dạng sản phẩm đầu ra",
      ],
    },
  },
  {
    id: "bai4",
    week: "Bài 4",
    module: "Mục 4.4",
    title: "Cộng tác Trực tuyến",
    subtitle: "Quản lý dự án nhóm với công cụ số",
    color: "#f59e0b",
    accent: "#d97706",
    icon: "🤝",
    summary:
      "Dự án xếp hạng đại học Việt Nam với vai trò Full-stack Developer. Áp dụng Kanban, Git Flow và Discord.",
    tags: ["Trello", "GitHub", "Discord", "Kanban", "Git Flow"],
    details: {
      objective:
        "Xây dựng quy trình cộng tác nhóm hiệu quả cho dự án 'Xếp hạng đại học Việt Nam' (xhdh-wine.vercel.app).",
      method:
        "Trello: Kanban (To Do → In Progress → Review → Done). GitHub: Git Flow với nhánh feature + rebase. Discord: kênh chuyên biệt.",
      outcome:
        "Git Flow hoàn chỉnh, quy tắc đặt tên tệp [Mã_Task]_[Tên_Tệp]_V[Phiên_Bản], API Docs trên GitHub.",
      keyPoints: [
        "Vai trò: Full-stack Developer & Backend Lead",
        "Giải quyết Merge Conflicts bằng Git rebase",
        "Nhật ký công việc 6 ngày/tuần với công cụ",
        "Quy chuẩn Media: đồng bộ tên tệp toàn nhóm",
      ],
    },
  },
  {
    id: "bai5",
    week: "Bài 5",
    module: "Mục 5.4",
    title: "Sáng tạo Nội dung AI",
    subtitle: "Chiến dịch Decentralized Pulse – Web3",
    color: "#ec4899",
    accent: "#db2777",
    icon: "🎨",
    summary:
      "Chiến dịch phổ cập Blockchain/Web3 kết hợp Claude AI, Midjourney và Canva Magic Studio.",
    tags: ["Claude AI", "Midjourney", "Canva", "Blockchain", "Web3"],
    details: {
      objective:
        "Tạo bộ nội dung truyền thông giáo dục bình dân hóa Blockchain & Web3 thông qua AI tạo sinh.",
      method:
        "Claude AI: Tech-Storytelling về giao dịch Blockchain. Midjourney: concept Cyber-Tech-Nature. Canva: tổng hợp Infographic.",
      outcome:
        "Bộ nội dung hoàn chỉnh: bài viết kỹ thuật + hình ảnh nghệ thuật + infographic chuyên nghiệp. Minh chứng con người là Editor & Director.",
      keyPoints: [
        "Claude AI: Logic kỹ thuật xuất sắc, cần hiệu chỉnh văn phong",
        "Midjourney: concept siêu thực, khó kiểm soát text",
        "Canva: layout nhanh, tổng hợp đa phương tiện",
        "Luôn kiểm chứng và cá nhân hóa đầu ra của AI",
      ],
    },
  },
  {
    id: "bai6",
    week: "Bài 6",
    module: "Mục 6.4",
    title: "AI có Trách nhiệm",
    subtitle: "Đạo đức & Liêm chính học thuật",
    color: "#ef4444",
    accent: "#dc2626",
    icon: "⚖️",
    summary:
      "6 nguyên tắc cá nhân sử dụng AI, phân tích chính sách UET, case study kiểm chứng dữ liệu thực tế.",
    tags: ["AI Ethics", "Academic Integrity", "UET Policy", "Fact-Checking"],
    details: {
      objective:
        "Xây dựng bộ nguyên tắc cá nhân toàn diện về sử dụng AI có trách nhiệm trong môi trường học thuật.",
      method:
        "Nghiên cứu chính sách AI của UET/ĐHQGHN. Thực hành Prompt Engineering 2 cấp. Đối chiếu số liệu từ TopCV/ITviec.",
      outcome:
        "6 Nguyên tắc 'Vàng' cá nhân. Lời khai báo AI minh bạch trong bài luận. Case study kiểm chứng loại bỏ hallucination.",
      keyPoints: [
        "Nguyên tắc Tự chủ: Tư duy trước, AI hỗ trợ sau",
        "Nguyên tắc Minh bạch: Khai báo công cụ trong mọi bài nộp",
        "Nguyên tắc Hoài nghi: Kiểm chứng 100% số liệu từ AI",
        "Nguyên tắc Liêm chính: Nói không với đạo văn",
        "Nguyên tắc Phản biện: Dùng AI như đối tác tranh luận",
        "Nguyên tắc Phát triển: AI tự động hóa thủ công, người tập trung sáng tạo",
      ],
    },
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function NavBar({ active, setActive }: { active: string; setActive: (s: string) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? "rgba(5,5,12,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.3s ease",
        padding: "0 2rem",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 60,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 15,
            color: "#a78bfa",
            letterSpacing: "0.05em",
          }}
        >
          TVD<span style={{ color: "#fff", opacity: 0.3 }}>.</span>H
        </span>
        <div style={{ display: "flex", gap: 4 }}>
          {["home", "projects", "about"].map((item) => (
            <button
              key={item}
              onClick={() => setActive(item)}
              style={{
                background: active === item ? "rgba(167,139,250,0.15)" : "transparent",
                border: active === item ? "1px solid rgba(167,139,250,0.3)" : "1px solid transparent",
                color: active === item ? "#a78bfa" : "rgba(255,255,255,0.5)",
                borderRadius: 8,
                padding: "6px 16px",
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
                transition: "all 0.2s",
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

function HeroSection({ onExplore }: { onExplore: () => void }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 80);
    return () => clearInterval(id);
  }, []);

  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*".split("");
  const scramble = (text: string, reveal: number) =>
    text
      .split("")
      .map((ch, i) =>
        i < reveal ? ch : chars[Math.floor(Math.random() * chars.length)]
      )
      .join("");

  const fullName = "Trần Vũ Duy Hưng";
  const reveal = Math.min(fullName.length, Math.floor(tick / 2));
  const displayed = reveal < fullName.length ? scramble(fullName, reveal) : fullName;

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid bg */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(167,139,250,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(167,139,250,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />
      {/* Glow orbs */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "15%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "20%",
          right: "15%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ textAlign: "center", position: "relative", maxWidth: 800 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(167,139,250,0.1)",
            border: "1px solid rgba(167,139,250,0.25)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#10b981",
              display: "inline-block",
              boxShadow: "0 0 6px #10b981",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
            }}
          >
            Portfolio Kỹ thuật số — IT5 · 2026
          </span>
        </div>

        <h1
          style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: "clamp(36px, 7vw, 76px)",
            fontWeight: 700,
            color: "#fff",
            lineHeight: 1.1,
            margin: "0 0 16px",
            letterSpacing: "-0.02em",
          }}
        >
          {displayed}
        </h1>

        <p
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.45)",
            margin: "0 0 12px",
            fontFamily: "'Space Mono', monospace",
            letterSpacing: "0.05em",
          }}
        >
          {STUDENT.id} · {STUDENT.class} · {STUDENT.university}
        </p>

        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.6)",
            maxWidth: 560,
            margin: "0 auto 48px",
            lineHeight: 1.7,
          }}
        >
          Nhập môn Công nghệ số & Ứng dụng Trí tuệ nhân tạo — Tổng hợp hành trình học tập qua 6 bài tập thành phần.
        </p>

        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={onExplore}
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              border: "none",
              borderRadius: 10,
              padding: "14px 32px",
              fontSize: 14,
              color: "#fff",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.06em",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(124,58,237,0.4)";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            XEM DỰ ÁN →
          </button>
          <button
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 10,
              padding: "14px 32px",
              fontSize: 14,
              color: "rgba(255,255,255,0.7)",
              cursor: "pointer",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.06em",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(167,139,250,0.5)";
              (e.currentTarget as HTMLButtonElement).style.color = "#a78bfa";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.15)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.7)";
            }}
          >
            LIÊN HỆ
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
          animation: "bounce 2s infinite",
        }}
      >
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)", letterSpacing: "0.12em", fontFamily: "'Space Mono', monospace" }}>
          SCROLL
        </span>
        <div
          style={{
            width: 1,
            height: 40,
            background: "linear-gradient(to bottom, rgba(255,255,255,0.15), transparent)",
          }}
        />
      </div>

      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(8px)} }
      `}</style>
    </section>
  );
}

function AssignmentCard({ assignment, onClick }: { assignment: Assignment; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.02)",
        border: `1px solid ${hovered ? hexToRgba(assignment.color, 0.4) : "rgba(255,255,255,0.07)"}`,
        borderRadius: 16,
        padding: "28px",
        cursor: "pointer",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hovered ? `0 16px 48px ${hexToRgba(assignment.color, 0.12)}` : "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, ${assignment.color}, transparent)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.25s",
        }}
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            background: hexToRgba(assignment.color, 0.12),
            border: `1px solid ${hexToRgba(assignment.color, 0.25)}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
          }}
        >
          {assignment.icon}
        </div>
        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              color: assignment.color,
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: 2,
            }}
          >
            {assignment.week}
          </div>
          <div
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.1em",
            }}
          >
            {assignment.module}
          </div>
        </div>
      </div>

      <h3
        style={{
          fontSize: 18,
          fontWeight: 700,
          color: "#fff",
          margin: "0 0 6px",
          lineHeight: 1.2,
        }}
      >
        {assignment.title}
      </h3>
      <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "0 0 14px", fontFamily: "'Space Mono', monospace" }}>
        {assignment.subtitle}
      </p>
      <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", margin: "0 0 20px", lineHeight: 1.6 }}>
        {assignment.summary}
      </p>

      {/* Tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {assignment.tags.map((tag) => (
          <span
            key={tag}
            style={{
              fontSize: 10,
              background: hexToRgba(assignment.color, 0.1),
              color: assignment.color,
              border: `1px solid ${hexToRgba(assignment.color, 0.2)}`,
              borderRadius: 6,
              padding: "3px 8px",
              fontFamily: "'Space Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Arrow */}
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: hexToRgba(assignment.color, 0.15),
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1)" : "scale(0.8)",
          transition: "all 0.25s",
        }}
      >
        <span style={{ color: assignment.color, fontSize: 14 }}>→</span>
      </div>
    </div>
  );
}

function Modal({ assignment, onClose }: { assignment: Assignment; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        background: "rgba(0,0,0,0.75)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        style={{
          background: "#0d0d1a",
          border: `1px solid ${hexToRgba(assignment.color, 0.35)}`,
          borderRadius: 20,
          width: "100%",
          maxWidth: 680,
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        {/* Top accent */}
        <div style={{ height: 3, background: `linear-gradient(90deg, ${assignment.color}, transparent)`, borderRadius: "20px 20px 0 0" }} />

        <div style={{ padding: "32px" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28 }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  background: hexToRgba(assignment.color, 0.15),
                  border: `1px solid ${hexToRgba(assignment.color, 0.3)}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
              >
                {assignment.icon}
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: assignment.color, letterSpacing: "0.15em", textTransform: "uppercase" as const, marginBottom: 4 }}>
                  {assignment.week} · {assignment.module}
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: "#fff", margin: 0 }}>{assignment.title}</h2>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", margin: "4px 0 0", fontFamily: "'Space Mono', monospace" }}>{assignment.subtitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(255,255,255,0.5)",
                fontSize: 18,
                flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>

          {/* Sections */}
          {[
            { label: "🎯 Mục tiêu", content: assignment.details.objective },
            { label: "🔧 Phương pháp", content: assignment.details.method },
            { label: "✅ Kết quả", content: assignment.details.outcome },
          ].map(({ label, content }) => (
            <div key={label} style={{ marginBottom: 24 }}>
              <h4 style={{ fontSize: 12, fontFamily: "'Space Mono', monospace", color: assignment.color, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 10px" }}>
                {label}
              </h4>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
                {content}
              </p>
            </div>
          ))}

          {/* Key points */}
          <div
            style={{
              background: hexToRgba(assignment.color, 0.05),
              border: `1px solid ${hexToRgba(assignment.color, 0.15)}`,
              borderRadius: 12,
              padding: "20px 24px",
            }}
          >
            <h4 style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: assignment.color, letterSpacing: "0.1em", textTransform: "uppercase" as const, margin: "0 0 14px" }}>
              📌 Điểm nổi bật
            </h4>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {assignment.details.keyPoints.map((point, i) => (
                <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: assignment.color, fontSize: 12, marginTop: 2, flexShrink: 0, fontFamily: "'Space Mono', monospace" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 20 }}>
            {assignment.tags.map((tag) => (
              <span key={tag} style={{
                fontSize: 10,
                background: hexToRgba(assignment.color, 0.1),
                color: assignment.color,
                border: `1px solid ${hexToRgba(assignment.color, 0.2)}`,
                borderRadius: 6,
                padding: "4px 10px",
                fontFamily: "'Space Mono', monospace",
                letterSpacing: "0.06em",
              }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [selected, setSelected] = useState<Assignment | null>(null);

  return (
    <section style={{ padding: "100px 2rem", maxWidth: 1100, margin: "0 auto" }}>
      {/* Section header */}
      <div style={{ marginBottom: 64 }}>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 11,
          color: "#a78bfa",
          letterSpacing: "0.2em",
          textTransform: "uppercase" as const,
          marginBottom: 16,
        }}>
          02 — Trang Dự án
        </div>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
          Các bài tập thành phần
        </h2>
        <p style={{ fontSize: 16, color: "rgba(255,255,255,0.45)", maxWidth: 540, lineHeight: 1.7, margin: 0 }}>
          6 bài tập từ Bài 1–6, bao gồm các kỹ năng số cốt lõi từ quản lý tệp đến đạo đức AI.
        </p>
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 20,
        }}
      >
        {ASSIGNMENTS.map((a) => (
          <AssignmentCard key={a.id} assignment={a} onClick={() => setSelected(a)} />
        ))}
      </div>

      {selected && <Modal assignment={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}

function SkillBar({ label, pct, color }: { label: string; pct: number; color: string }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "'Space Mono', monospace" }}>{label}</span>
        <span style={{ fontSize: 12, color: color, fontFamily: "'Space Mono', monospace" }}>{pct}%</span>
      </div>
      <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
        <div
          style={{
            height: "100%",
            width: animated ? `${pct}%` : "0%",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            borderRadius: 2,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
    </div>
  );
}

function TimelineItem({ week, title, detail, color, last }: { week: string; title: string; detail: string; color: string; last?: boolean }) {
  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          background: color,
          boxShadow: `0 0 12px ${hexToRgba(color, 0.5)}`,
          flexShrink: 0,
          marginTop: 4,
        }} />
        {!last && <div style={{ width: 1, flex: 1, background: "rgba(255,255,255,0.07)", margin: "8px 0" }} />}
      </div>
      <div style={{ paddingBottom: last ? 0 : 28 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color, letterSpacing: "0.1em", textTransform: "uppercase" as const, marginBottom: 4 }}>
          {week}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", lineHeight: 1.6 }}>{detail}</div>
      </div>
    </div>
  );
}

function AboutSection() {
  const skills = [
    { label: "Tìm kiếm & Đánh giá học thuật", pct: 90, color: "#8b5cf6" },
    { label: "Prompt Engineering", pct: 85, color: "#10b981" },
    { label: "Cộng tác nhóm (Git/Trello)", pct: 88, color: "#f59e0b" },
    { label: "Sáng tạo nội dung AI", pct: 80, color: "#ec4899" },
    { label: "AI Ethics & Academic Integrity", pct: 92, color: "#ef4444" },
    { label: "Full-stack Development", pct: 82, color: "#0ea5e9" },
  ];

  return (
    <section style={{ padding: "100px 2rem", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ marginBottom: 64 }}>
        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "#a78bfa", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: 16 }}>
          03 — Trang Giới thiệu
        </div>
        <h2 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, color: "#fff", margin: "0 0 16px", lineHeight: 1.15 }}>
          Về bản thân
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
        {/* Left: Bio */}
        <div>
          {/* Avatar / identity */}
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "28px",
            marginBottom: 28,
          }}>
            <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: 16,
                background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                fontWeight: 700,
                color: "#fff",
                fontFamily: "'Space Mono', monospace",
                flexShrink: 0,
              }}>
                TVH
              </div>
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 4 }}>{STUDENT.name}</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", fontFamily: "'Space Mono', monospace" }}>{STUDENT.id} · {STUDENT.class}</div>
              </div>
            </div>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, margin: "0 0 16px" }}>
              Sinh viên Công nghệ Thông tin tại UET – ĐHQGHN. Full-stack Developer với đam mê về hệ thống phân tán, AI ứng dụng và xây dựng sản phẩm thực tế.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {STUDENT.goals.map((g, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ color: "#a78bfa", flexShrink: 0, marginTop: 2 }}>◆</span>
                  <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>{g}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Skill bars */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
            <h3 style={{ fontSize: 13, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" as const, margin: "0 0 24px" }}>
              Kỹ năng
            </h3>
            {skills.map((s) => <SkillBar key={s.label} {...s} />)}
          </div>
        </div>

        {/* Right: Timeline */}
        <div>
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px" }}>
            <h3 style={{ fontSize: 13, fontFamily: "'Space Mono', monospace", color: "rgba(255,255,255,0.4)", letterSpacing: "0.15em", textTransform: "uppercase" as const, margin: "0 0 28px" }}>
              Hành trình học tập
            </h3>
            {ASSIGNMENTS.map((a, i) => (
              <TimelineItem
                key={a.id}
                week={a.week}
                title={a.title}
                detail={a.subtitle}
                color={a.color}
                last={i === ASSIGNMENTS.length - 1}
              />
            ))}
          </div>

          {/* Reflection card */}
          <div style={{
            marginTop: 20,
            background: "rgba(167,139,250,0.05)",
            border: "1px solid rgba(167,139,250,0.15)",
            borderRadius: 16,
            padding: "24px",
          }}>
            <div style={{ fontSize: 11, fontFamily: "'Space Mono', monospace", color: "#a78bfa", letterSpacing: "0.12em", textTransform: "uppercase" as const, marginBottom: 12 }}>
              💬 Tổng kết
            </div>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.7, margin: 0 }}>
              Qua 6 bài tập, tôi đã chuyển hóa từ người dùng thụ động sang người kiến tạo chủ động trong hệ sinh thái số. AI không thay thế con người — người làm chủ AI mới là người dẫn đầu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { value: "6", label: "Bài tập hoàn thành" },
    { value: "10", label: "Tài liệu học thuật" },
    { value: "3", label: "Công cụ AI sử dụng" },
    { value: "6", label: "Nguyên tắc AI Ethics" },
  ];

  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      borderBottom: "1px solid rgba(255,255,255,0.06)",
      padding: "40px 2rem",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
      }}>
        {stats.map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 36,
              fontWeight: 700,
              color: "#a78bfa",
              lineHeight: 1,
              marginBottom: 8,
            }}>
              {s.value}
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", fontFamily: "'Space Mono', monospace" }}>
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid rgba(255,255,255,0.06)",
      padding: "40px 2rem",
      textAlign: "center",
    }}>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 13, color: "rgba(255,255,255,0.2)", marginBottom: 8 }}>
        {STUDENT.name} · {STUDENT.id} · {STUDENT.class}
      </div>
      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.12)" }}>
        Portfolio Kỹ thuật số — Nhập môn Công nghệ số & ỨDTTNT — 2026
      </div>
    </footer>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activePage, setActivePage] = useState("home");
  const projectsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollTo = (ref: React.RefObject<HTMLDivElement>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNavChange = (page: string) => {
    setActivePage(page);
    if (page === "projects") setTimeout(() => scrollTo(projectsRef), 50);
    if (page === "about") setTimeout(() => scrollTo(aboutRef), 50);
    if (page === "home") window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05050c",
        color: "#fff",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />

      <NavBar active={activePage} setActive={handleNavChange} />

      <HeroSection onExplore={() => handleNavChange("projects")} />

      <StatsBar />

      <div ref={projectsRef}>
        <ProjectsSection />
      </div>

      <div ref={aboutRef}>
        <AboutSection />
      </div>

      <Footer />
    </div>
  );
}
