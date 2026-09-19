import { motion } from "framer-motion";
import { ArrowLeft, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function About() {
  const navigate = useNavigate();
  const text = "About Myself";

  const [displayedText, setDisplayedText] = useState("");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [downloading, setDownloading] = useState(false);

  // TYPING EFFECT
  useEffect(() => {
    let index = 0;
    let interval: NodeJS.Timeout;

    const startTyping = () => {
      setDisplayedText("");
      interval = setInterval(() => {
        index++;
        setDisplayedText(text.slice(0, index));

        if (index === text.length) {
          clearInterval(interval);
          setTimeout(() => {
            index = 0;
            startTyping();
          }, 5000);
        }
      }, 120);
    };

    startTyping();
    return () => clearInterval(interval);
  }, []);

  // DOWNLOAD FUNCTION
  const handleDownload = () => {
    if (downloading) return;

    setDownloading(true);
    setCountdown(3);

    let time = 3;

    const timer = setInterval(() => {
      time--;
      setCountdown(time);

      if (time <= 0) {
        clearInterval(timer);

        // Create a complete HTML document for PDF/print
        const resumeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prince Tiwari - Resume</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            background: #000000;
            color: #ffffff;
            padding: 24px;
            min-height: 100vh;
        }

        .container {
            max-width: 900px;
            margin: 0 auto;
        }

        .resume-wrapper {
            background: #0d0d12;
            border: 1px solid #222228;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 12px 48px rgba(0, 0, 0, 0.85);
        }

        .header {
            background: #07070a;
            border-bottom: 2px solid #262630;
            padding: 40px;
            display: flex;
            gap: 36px;
            align-items: center;
        }

        .profile-photo {
            width: 140px;
            height: 140px;
            border-radius: 14px;
            border: 3px solid #3b4252;
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
            flex-shrink: 0;
            object-fit: cover;
        }

        .header-content {
            flex: 1;
        }

        .header-content h1 {
            font-size: 38px;
            margin-bottom: 6px;
            font-weight: 800;
            letter-spacing: -0.5px;
            color: #ffffff;
        }

        .header-content .title {
            font-size: 15px;
            color: #10b981;
            margin-bottom: 16px;
            font-weight: 600;
            letter-spacing: 1.5px;
            text-transform: uppercase;
        }

        .contact-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
            font-size: 13px;
        }

        .contact-item {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #15151c;
            border-radius: 6px;
            border: 1px solid #2b2b36;
        }

        .contact-item a {
            color: #ffffff;
            text-decoration: none;
            word-break: break-all;
        }

        .content {
            padding: 40px;
            background: #0d0d12;
        }

        .section {
            margin-bottom: 30px;
        }

        .section:last-child {
            margin-bottom: 0;
        }

        .section-title {
            font-size: 16px;
            font-weight: 700;
            color: #ffffff;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 2px solid #282834;
            text-transform: uppercase;
            letter-spacing: 2px;
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .section-title::before {
            content: "";
            width: 4px;
            height: 18px;
            background: #10b981;
            display: inline-block;
            border-radius: 2px;
        }

        .summary-text {
            color: #d0d0d8;
            line-height: 1.8;
            font-size: 14px;
            background: #14141b;
            padding: 18px;
            border-left: 3px solid #10b981;
            border-radius: 6px;
            border: 1px solid #262632;
        }

        .skills-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
        }

        .skill-category {
            background: #14141b;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #262632;
        }

        .skill-category h3 {
            color: #10b981;
            font-size: 13px;
            margin-bottom: 12px;
            font-weight: 700;
            letter-spacing: 0.8px;
            text-transform: uppercase;
        }

        .skill-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
        }

        .skill-tag {
            background: #1f1f2a;
            color: #e2e8f0;
            padding: 6px 12px;
            border-radius: 16px;
            font-size: 12px;
            font-weight: 500;
            border: 1px solid #333345;
        }

        .project {
            background: #14141b;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #262632;
            border-left: 3px solid #10b981;
            margin-bottom: 14px;
        }

        .project h3 {
            color: #ffffff;
            font-size: 15px;
            margin-bottom: 4px;
            font-weight: 700;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .project-date {
            font-size: 11px;
            color: #94a3b8;
            font-weight: 500;
        }

        .project-tech {
            color: #38bdf8;
            font-size: 12px;
            font-family: monospace;
            margin-bottom: 10px;
        }

        .project ul {
            padding-left: 18px;
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.7;
        }

        .education-item {
            background: #14141b;
            padding: 18px;
            border-radius: 8px;
            border: 1px solid #262632;
            border-left: 3px solid #10b981;
            margin-bottom: 12px;
        }

        .education-item h3 {
            color: #ffffff;
            font-size: 15px;
            font-weight: 700;
            margin-bottom: 4px;
            display: flex;
            justify-content: space-between;
        }

        .education-item p {
            color: #cbd5e1;
            font-size: 13px;
            line-height: 1.6;
        }

        .strengths-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
        }

        .strength-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            background: #14141b;
            border-radius: 6px;
            border: 1px solid #262632;
            color: #e2e8f0;
            font-size: 13px;
        }

        .strength-item span {
            color: #10b981;
            font-weight: bold;
        }

        @media print {
            body { background: #ffffff; color: #000000; padding: 0; }
            .resume-wrapper { background: #ffffff; border: none; box-shadow: none; }
            .header { background: #f8fafc; border-bottom: 2px solid #cbd5e1; }
            .header-content h1 { color: #0f172a; }
            .content { background: #ffffff; }
            .summary-text, .skill-category, .project, .education-item, .strength-item { background: #f8fafc; border: 1px solid #e2e8f0; color: #1e293b; }
            .skill-tag { background: #e2e8f0; color: #0f172a; border: 1px solid #cbd5e1; }
            .section-title { color: #0f172a; border-bottom: 2px solid #e2e8f0; }
            .project h3, .education-item h3 { color: #0f172a; }
            .project ul { color: #334155; }
        }

        @media (max-width: 768px) {
            .header { flex-direction: column; text-align: center; }
            .contact-info { grid-template-columns: 1fr; }
            .skills-grid { grid-template-columns: 1fr; }
            .strengths-list { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="resume-wrapper">
            <!-- Header -->
            <div class="header">
                <img src="/assets/prince_tiwari.png" alt="Prince Tiwari" class="profile-photo">
                <div class="header-content">
                    <h1>PRINCE TIWARI</h1>
                    <p class="title">ASPIRING DATA ANALYST</p>
                    <div class="contact-info">
                        <div class="contact-item">
                            <span>📞</span>
                            <span>9244985868</span>
                        </div>
                        <div class="contact-item">
                            <span>✉️</span>
                            <a href="mailto:princetiwari722007@gmail.com">princetiwari722007@gmail.com</a>
                        </div>
                        <div class="contact-item">
                            <span>📍</span>
                            <span>Bhopal, Madhya Pradesh</span>
                        </div>
                        <div class="contact-item">
                            <span>💼</span>
                            <a href="https://www.linkedin.com/in/prince-tiwari-03786b26a/" target="_blank">LinkedIn Profile</a>
                        </div>
                        <div class="contact-item">
                            <span>💻</span>
                            <a href="https://github.com/prince803tiwari" target="_blank">github.com/prince803tiwari</a>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div class="content">
                <!-- Professional Summary -->
                <section class="section">
                    <h2 class="section-title">Career Objective & Summary</h2>
                    <div class="summary-text">
                        Data-driven and detail-oriented B.Tech CSE student with a strong foundation in Python, Excel, and data analysis. Passionate about turning data into meaningful insights and solving real-world problems through analytical thinking. To obtain a challenging role as a Data Analyst where I can apply my analytical skills, technical knowledge, and passion for data to contribute to data-driven decision making and grow in the field of Data Science and Analytics.
                    </div>
                </section>

                <!-- Education -->
                <section class="section">
                    <h2 class="section-title">Education</h2>
                    <div class="education-item">
                        <h3>Bansal Institute Of Science And Technology, Bhopal <span>2024 – 2028</span></h3>
                        <p><strong>B.Tech in Computer Science and Engineering</strong></p>
                        <p>CGPA: 7.36 (Till 5th Sem)</p>
                    </div>
                    <div class="education-item">
                        <h3>Higher Secondary (12th)</h3>
                        <p>Score: 79%</p>
                    </div>
                    <div class="education-item">
                        <h3>Secondary (10th)</h3>
                        <p>Score: 83%</p>
                    </div>
                </section>

                <!-- Projects -->
                <section class="section">
                    <h2 class="section-title">Projects</h2>
                    <div class="project">
                        <h3>Blinkit Data Analysis Project <span class="project-date">Sept 2026</span></h3>
                        <div class="project-tech">Python | Pandas | NumPy | Matplotlib | Seaborn</div>
                        <ul>
                            <li>Performed exploratory data analysis (EDA) on Blinkit sales data to uncover key trends and business insights.</li>
                            <li>Cleaned and processed raw data using Pandas and NumPy.</li>
                            <li>Created insightful visualizations to analyze sales performance, category trends, and customer behaviour.</li>
                            <li>Provided data-driven recommendations to improve business performance.</li>
                        </ul>
                    </div>

                    <div class="project">
                        <h3>Excel Sales Analytics Dashboard <span class="project-date">Sept 2026</span></h3>
                        <div class="project-tech">Excel | PivotTables | Slicers | VBA</div>
                        <ul>
                            <li>Built an interactive sales analytics dashboard to track key business metrics.</li>
                            <li>Used PivotTables and Slicers for dynamic data analysis and visualization.</li>
                            <li>Implemented VBA automation to streamline data processing tasks.</li>
                            <li>Helped in identifying sales trends, top products, and regional performance.</li>
                        </ul>
                    </div>

                    <div class="project">
                        <h3>IPL Data Analysis Capstone Project <span class="project-date">Sept 2026</span></h3>
                        <div class="project-tech">Python | Pandas | NumPy | Matplotlib | Seaborn</div>
                        <ul>
                            <li>Analyzed IPL historical data to discover patterns and performance insights across teams and players.</li>
                            <li>Performed data cleaning, feature engineering, and exploratory analysis.</li>
                            <li>Created various visualizations to highlight key statistics and trends.</li>
                            <li>Presented actionable insights based on data-driven analysis.</li>
                        </ul>
                    </div>
                </section>

                <!-- Technical Skills -->
                <section class="section">
                    <h2 class="section-title">Technical Skills</h2>
                    <div class="skills-grid">
                        <div class="skill-category">
                            <h3>Programming Languages</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Python (Intermediate)</span>
                                <span class="skill-tag">C++ (Basic)</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Data Analysis & Libraries</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Pandas</span>
                                <span class="skill-tag">NumPy</span>
                                <span class="skill-tag">Matplotlib</span>
                                <span class="skill-tag">Seaborn</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Data Tools</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Excel (Advanced)</span>
                                <span class="skill-tag">PivotTables</span>
                                <span class="skill-tag">Slicers</span>
                                <span class="skill-tag">Power Pivot</span>
                                <span class="skill-tag">DAX</span>
                                <span class="skill-tag">VBA</span>
                            </div>
                        </div>
                        <div class="skill-category">
                            <h3>Version Control & Core Concepts</h3>
                            <div class="skill-tags">
                                <span class="skill-tag">Git</span>
                                <span class="skill-tag">GitHub</span>
                                <span class="skill-tag">Data Cleaning</span>
                                <span class="skill-tag">Data Visualization</span>
                                <span class="skill-tag">EDA</span>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Key Strengths -->
                <section class="section">
                    <h2 class="section-title">Key Strengths</h2>
                    <div class="strengths-list">
                        <div class="strength-item"><span>✔</span> Analytical and logical thinking</div>
                        <div class="strength-item"><span>✔</span> Strong problem-solving skills</div>
                        <div class="strength-item"><span>✔</span> Quick learner and adaptable</div>
                        <div class="strength-item"><span>✔</span> Detail-oriented and organized</div>
                        <div class="strength-item"><span>✔</span> Self-motivated and passionate about data</div>
                        <div class="strength-item"><span>✔</span> Effective communication and teamwork</div>
                    </div>
                </section>

                <!-- Achievements -->
                <section class="section">
                    <h2 class="section-title">Achievements</h2>
                    <div class="strengths-list">
                        <div class="strength-item"><span>🏆</span> Completed multiple data analysis projects using real-world datasets.</div>
                        <div class="strength-item"><span>📈</span> Consistently improving technical and analytical skills through hands-on practice.</div>
                        <div class="strength-item"><span>🎓</span> Maintained CGPA of 7.36 till 5th semester.</div>
                    </div>
                </section>

                <!-- Interests -->
                <section class="section">
                    <h2 class="section-title">Interests</h2>
                    <div class="skill-tags">
                        <span class="skill-tag">Data Analytics</span>
                        <span class="skill-tag">Artificial Intelligence / Machine Learning</span>
                        <span class="skill-tag">Explore new technologies</span>
                        <span class="skill-tag">Reading and self-learning</span>
                    </div>
                </section>
            </div>
        </div>
    </div>
</body>
</html>
        `;

        const blob = new Blob([resumeHTML], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Prince_Tiwari_Resume.html";

        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.open(url, "_blank");
        setTimeout(() => URL.revokeObjectURL(url), 10000);

        setDownloading(false);
        setCountdown(null);
      }
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white px-4 sm:px-6 py-10">
      {/* ANIMATED BACKGROUND EFFECTS */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl opacity-20" />
      </div>

      {/* BACK BUTTON */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        onClick={() => navigate(-1)}
        className="
          fixed
          top-5
          left-5
          z-50
          flex
          items-center
          gap-2
          px-4
          py-2
          rounded-full
          border
          border-white/15
          bg-white/8
          backdrop-blur-xl
          hover:bg-white/15
          hover:border-white/30
          transition-all
          duration-300
          shadow-lg
        "
      >
        <ArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </motion.button>

      {/* MAIN CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen gap-8">
        {/* IMAGE SECTION */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex flex-col items-center"
        >
          <img
            src="/assets/prince_tiwari.png"
            alt="Prince Tiwari"
            className="
              w-[200px]
              sm:w-[280px]
              md:w-[320px]
              rounded-2xl
              border
              border-white/15
              object-cover
              shadow-[0_20px_60px_rgba(0,0,0,0.6)]
              hover:border-white/25
              transition-all
              duration-300
            "
          />

          {/* DIVIDER LINE */}
          <div
            className="
              mt-6
              h-[1px]
              bg-gradient-to-r
              from-transparent
              via-white/20
              to-transparent
              w-[90vw]
              sm:w-[400px]
              md:w-[500px]
            "
          />
        </motion.div>

        {/* GLASS BOX CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="
            relative
            w-full
            max-w-4xl
            h-[500px]
            sm:h-[550px]
            md:h-[600px]
            rounded-3xl
            border
            border-white/10
            bg-white/5
            backdrop-blur-3xl
            overflow-hidden
            shadow-[0_20px_70px_rgba(0,0,0,0.5)]
            group
          "
        >
          {/* GLASS LIGHT EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-transparent to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

          {/* HEADER SECTION */}
          <div
            className="
              relative
              z-20
              flex
              items-center
              justify-center
              px-6
              py-6
              sm:py-8
              border-b
              border-white/10
              bg-black/30
              backdrop-blur-2xl
            "
          >
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-extrabold
                tracking-tight
              "
            >
              {displayedText}
              <span className="animate-pulse ml-2">|</span>
            </h1>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div
            className="
              relative
              z-10
              h-[calc(100%-80px)]
              overflow-y-auto
              px-6
              sm:px-10
              md:px-12
              py-8
              scrollbar-thin
              scrollbar-track-transparent
              scrollbar-thumb-white/10
              hover:scrollbar-thumb-white/20
            "
          >
            <div
              className="
                text-white/70
                text-sm
                sm:text-base
                leading-8
                tracking-wide
                space-y-6
              "
            >
              <p>
                Hello! I am <strong className="text-white font-semibold">Prince Tiwari</strong>, an aspiring Data Analyst and B.Tech Computer Science and Engineering student at Bansal Institute Of Science And Technology, Bhopal (2024 – 2028).
              </p>

              <p>
                I am passionate about turning data into meaningful insights and solving real-world business problems through analytical and logical thinking. With a maintained CGPA of <span className="text-emerald-400 font-semibold">7.36 till 5th semester</span>, I combine strong academic rigor with extensive hands-on analytical practice.
              </p>

              <p>
                My technical foundation is rooted in <strong className="text-white">Python</strong> (Pandas, NumPy, Matplotlib, Seaborn) and <strong className="text-white">Advanced Microsoft Excel</strong> (PivotTables, Slicers, Power Pivot, DAX, VBA Macros). I specialize in exploratory data analysis (EDA), data cleaning, statistical modeling, and interactive KPI dashboard creation.
              </p>

              <p>
                I have developed multiple high-impact data projects using real-world datasets:
              </p>

              <ul className="list-disc pl-6 space-y-2 text-white/80">
                <li>
                  <strong className="text-white">Blinkit Sales & EDA Project:</strong> Performed comprehensive exploratory data analysis on sales patterns, processed raw data with Pandas and NumPy, and generated actionable recommendations to improve category performance and delivery efficiencies.
                </li>
                <li>
                  <strong className="text-white">Excel Sales Analytics Dashboard:</strong> Engineered a dynamic, interactive dashboard utilizing PivotTables, multi-dimensional Slicers, and custom VBA automation to identify top products, regional sales trends, and executive metrics.
                </li>
                <li>
                  <strong className="text-white">IPL Data Analysis Capstone Project:</strong> Analyzed historical cricket data to uncover performance patterns across teams and players, executing feature engineering, statistical evaluations, and insightful visualizations.
                </li>
              </ul>

              <p>
                My career objective is to obtain a challenging role as a Data Analyst where I can apply my analytical skills, technical knowledge, and passion for data to contribute to data-driven decision making and grow in the field of Data Science and Analytics.
              </p>

              <p>
                Beyond data modeling, I am constantly exploring new advancements in Artificial Intelligence, Machine Learning, and continuous self-learning.
              </p>
            </div>
          </div>
        </motion.div>

        {/* DOWNLOAD BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          onClick={handleDownload}
          disabled={downloading}
          className="
            group
            relative
            overflow-hidden
            flex
            items-center
            justify-center
            gap-3
            px-8
            sm:px-10
            py-3
            sm:py-4
            rounded-2xl
            border
            border-white/15
            bg-white/8
            backdrop-blur-xl
            hover:bg-white/15
            hover:border-white/30
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition-all
            duration-300
            shadow-[0_10px_40px_rgba(0,0,0,0.4)]
            hover:shadow-[0_15px_50px_rgba(255,255,255,0.08)]
          "
        >
          {/* BUTTON GLOW EFFECT */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-all duration-500" />

          {/* BUTTON CONTENT */}
          <div className="relative z-10 flex items-center gap-3">
            <Download
              size={20}
              className="
                group-hover:scale-110
                group-hover:-translate-y-1
                transition-all
                duration-300
              "
            />
            <span className="font-semibold tracking-wide">
              {downloading ? `Downloading in ${countdown}s` : "Download Resume"}
            </span>
          </div>
        </motion.button>
      </div>
    </div>
  );
}