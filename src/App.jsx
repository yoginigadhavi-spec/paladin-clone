import { useState, useEffect } from "react";

const COLORS = {
  bg: "#0D0B07",
  surface: "#161209",
  card: "#1C1608",
  border: "#2E2206",
  gold: "#F0A500",
  goldLight: "#FFD166",
  goldDim: "#7A5200",
  text: "#F5EDD6",
  textMuted: "#8A7A5A",
  textDim: "#4A3D20",
  success: "#4CAF50",
  error: "#E05252",
};

const lessons = [
  {
    id: 1,
    era: "Ancient World",
    title: "The Rise of Rome",
    xp: 120,
    story: `In 509 BC, the Roman people did something extraordinary — they expelled their king and declared themselves a **Republic**. No more tyrants. No more kings. Power would be shared.\n\nThe Senate filled with noblemen called *Patricians*, while common citizens — the *Plebeians* — fought for centuries to earn equal rights. From these tensions, Rome forged a legal system that still echoes in modern law.\n\nBut the Republic had a fatal flaw: ambition.`,
    choices: [
      { text: "Follow Julius Caesar's rise to power", next: "caesar" },
      { text: "Explore the Plebeian struggle for rights", next: "plebs" },
    ],
    quiz: {
      question: "When did Rome transition from Kingdom to Republic?",
      options: ["753 BC", "509 BC", "27 BC", "44 BC"],
      answer: 1,
      explanation: "In 509 BC, the Romans expelled King Tarquinius Superbus and established the Roman Republic.",
    },
  },
  {
    id: 2,
    era: "Medieval",
    title: "The Black Death",
    xp: 140,
    story: `It arrived on twelve Genoese trading ships in 1347. Sailors were found dead or barely alive, their bodies covered in black boils oozing blood and pus. The people of Messina, Sicily, demanded the ships leave immediately. But it was too late.\n\nOver the next five years, the **Black Death** swept across Europe like a scythe. One-third of Europe's entire population — perhaps **25 million people** — perished.\n\nYet from the ashes of devastation, something unexpected grew: the seeds of the Renaissance.`,
    choices: [
      { text: "Discover how the plague changed society", next: "society" },
      { text: "Follow a doctor's desperate search for a cure", next: "medicine" },
    ],
    quiz: {
      question: "Approximately what fraction of Europe's population died in the Black Death?",
      options: ["1/10", "1/5", "1/3", "2/3"],
      answer: 2,
      explanation: "The Black Death killed roughly one-third of Europe's population between 1347 and 1351.",
    },
},
  {
    id: 3,
    era: "Modern",
    title: "The Space Race",
    xp: 160,
    story: `October 4, 1957. A beach ball-sized sphere of polished metal hurtled through orbit above Earth, beeping a simple radio signal back to the surface. **Sputnik** — the world's first artificial satellite — had launched.\n\nAmerica was stunned. If the Soviets could put a satellite in orbit, could they put a bomb there too? The Space Race had begun — not as science, but as pure geopolitical terror.\n\n"We choose to go to the Moon," Kennedy declared in 1962. "Not because it is easy, but because it is hard."`,
    choices: [
      { text: "Follow Neil Armstrong to the Moon", next: "moon" },
      { text: "Explore the Soviet side of the Space Race", next: "soviet" },
    ],
    quiz: {
      question: "What was the name of the first artificial satellite launched into orbit?",
      options: ["Explorer 1", "Vostok", "Sputnik", "Apollo"],
      answer: 2,
      explanation: "Sputnik, launched by the Soviet Union on October 4, 1957, was the world's first artificial satellite.",
    },
  },
];

const skillTree = [
  { id: "ancient", label: "Ancient World", era: "3000 BC – 500 AD", unlocked: true, x: 50, y: 10, lessons: 8 },
  { id: "medieval", label: "Medieval", era: "500 – 1400 AD", unlocked: true, x: 20, y: 35, lessons: 6 },
  { id: "renaissance", label: "Renaissance", era: "1400 – 1600 AD", unlocked: false, x: 75, y: 38, lessons: 5 },
  { id: "revolution", label: "Age of Revolution", era: "1600 – 1800 AD", unlocked: false, x: 35, y: 62, lessons: 7 },
  { id: "industrial", label: "Industrial Age", era: "1800 – 1900 AD", unlocked: false, x: 65, y: 65, lessons: 6 },
  { id: "modern", label: "Modern Era", era: "1900 – Present", unlocked: true, x: 50, y: 88, lessons: 10 },
];

const dailyChallenges = [
  { q: "Which empire built the Colosseum?", opts: ["Greek", "Roman", "Ottoman", "Persian"], a: 1 },
  { q: "Who wrote 'The Art of War'?", opts: ["Confucius", "Sun Tzu", "Lao Tzu", "Mencius"], a: 1 },
  { q: "In what year did WWII end?", opts: ["1943", "1944", "1945", "1946"], a: 2 },
  { q: "Which civilization built Machu Picchu?", opts: ["Aztec", "Maya", "Inca", "Olmec"], a: 2 },
  { q: "The Renaissance began in which country?", opts: ["France", "England", "Germany", "Italy"], a: 3 },
];
/ ── Screens ──────────────────────────────────────────────────────────────────

function HomeScreen({ userData, onNav, onStartLesson }) {
  const currentLesson = lessons[0];
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
  });

  return (
    <div style={styles.screen}>
      {/* Header */}
      <div style={styles.homeHeader}>
        <div>
          <p style={{ ...styles.textMuted, fontSize: 12, marginBottom: 2 }}>{greeting}</p>
          <h2 style={{ ...styles.textGold, fontSize: 20, fontFamily: "'Playfair Display', serif", margin: 0 }}>
            {userData.name}
          </h2>
        </div>
        <div style={styles.streakBadge}>
          <span style={{ fontSize: 18 }}>🔥</span>
          <span style={{ ...styles.textGold, fontWeight: 700, fontSize: 16 }}>{userData.streak}</span>
          <span style={{ ...styles.textMuted, fontSize: 11 }}>streak</span>
        </div>
      </div>

      {/* XP Bar */}
      <div style={styles.xpCard}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ ...styles.textMuted, fontSize: 12 }}>Level {userData.level} · Apprentice Scholar</span>
          <span style={{ ...styles.textGold, fontSize: 12 }}>{userData.xp} / {userData.level * 500} XP</span>
        </div>
        <div style={styles.xpBarBg}>
          <div style={{ ...styles.xpBarFill, width: `${(userData.xp % 500) / 5}%` }} />
        </div>
      </div>

      {/* Daily Challenge */}
      <div style={styles.dailyChallengeCard} onClick={() => onNav("daily")}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ ...styles.textGold, fontSize: 11, letterSpacing: 2, marginBottom: 6 }}>⚔ DAILY CHALLENGE</p>
            <h3 style={{ ...styles.text, fontSize: 16, fontFamily: "'Playfair Display', serif", margin: 0 }}>
              5 Questions · 200 XP Bonus
            </h3>
            <p style={{ ...styles.textMuted, fontSize: 12, marginTop: 4 }}>Resets in 3h 42m</p>
          </div>
          <div style={styles.challengeIcon}>⚡</div>
        </div>
        <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
          {[1,2,3,4,5].map(i => (
            <div key={i} style={{ ...styles.challengeDot, background: i <= userData.dailyDone ? COLORS.gold : COLORS.border }} />
          ))}
        </div>
      </div>

      {/* Continue Learning */}
      <p style={{ ...styles.sectionLabel }}>CONTINUE LEARNING</p>
      {lessons.map((lesson, i) => (
        <div key={lesson.id} style={{ ...styles.lessonCard, opacity: i > 1 ? 0.5 : 1 }}
          onClick={() => i <= 1 && onStartLesson(lesson)}>
          <div style={styles.lessonCardLeft}>
            <span style={{ fontSize: 22 }}>{["🏛️", "☠️", "🚀"][i]}</span>
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ ...styles.textMuted, fontSize: 10, letterSpacing: 1.5, marginBottom: 3 }}>{lesson.era.toUpperCase()}</p>
            <p style={{ ...styles.text, fontSize: 15, fontWeight: 600, margin: 0 }}>{lesson.title}</p>
            <p style={{ ...styles.textGold, fontSize: 11, marginTop: 3 }}>+{lesson.xp} XP</p>
          </div>
          {i <= 1 ? (
            <div style={styles.arrowBtn}>→</div>
          ) : (
            <div style={{ ...styles.textMuted, fontSize: 18 }}>🔒</div>
          )}
        </div>
      ))}
    </div>
  );
}

function LessonScreen({ lesson, onComplete, onBack }) {
  const [phase, setPhase] = useState("story"); // story | choice | quiz | result
  const [chosen, setChosen] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [correct, setCorrect] = useState(false);

  const paragraphs = lesson.story.split("\n\n");

  function handleQuizSubmit(idx) {
    setQuizAnswer(idx);
    setCorrect(idx === lesson.quiz.answer);
    setTimeout(() => setPhase("result"), 1000);
  }

  if (phase === "result") {
    return (
      <div style={{ ...styles.screen, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 64, marginBottom: 16 }}>{correct ? "🏆" : "📚"}</div>
        <h2 style={{ ...styles.textGold, fontFamily: "'Playfair Display', serif", fontSize: 26, marginBottom: 8 }}>
          {correct ? "Excellent!" : "Keep Learning!"}
        </h2>
        <p style={{ ...styles.textMuted, fontSize: 14, marginBottom: 24 }}>
          {correct ? `+${lesson.xp} XP earned` : "No XP lost — history is for learning!"}
        </p>
        <div style={styles.xpBurst}>
          <span style={{ ...styles.textGold, fontSize: 28, fontWeight: 800 }}>+{correct ? lesson.xp : Math.floor(lesson.xp * 0.3)}</span>
          <span style={{ ...styles.textMuted, fontSize: 12 }}>XP</span>
        </div>
        <p style={{ ...styles.text, fontSize: 13, maxWidth: 280, marginTop: 20, lineHeight: 1.6, color: COLORS.textMuted }}>
          {lesson.quiz.explanation}
        </p>
        <button style={styles.primaryBtn} onClick={() => onComplete(correct ? lesson.xp : Math.floor(lesson.xp * 0.3))}>
          Continue →
        </button>
      </div>
    );
  }

  if (phase === "quiz") {
    return (
      <div style={styles.screen}>
        <button style={styles.backBtn} onClick={() => setPhase("choice")}>← Back</button>
        <p style={{ ...styles.textGold, fontSize: 11, letterSpacing: 2, marginBottom: 16 }}>📝 KNOWLEDGE CHECK</p>
        <h3 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 24, lineHeight: 1.4 }}>
          {lesson.quiz.question}
        </h3>
        {lesson.quiz.options.map((opt, i) => {
          let bg = COLORS.card;
          let border = COLORS.border;
          if (quizAnswer !== null) {
            if (i === lesson.quiz.answer) { bg = "#1a3a1a"; border = COLORS.success; }
            else if (i === quizAnswer && !correct) { bg = "#3a1a1a"; border = COLORS.error; }
          }
          return (
            <div key={i} style={{ ...styles.quizOption, background: bg, border: `1px solid ${border}` }}
              onClick={() => quizAnswer === null && handleQuizSubmit(i)}>
              <span style={{ ...styles.optionLabel }}>{String.fromCharCode(65 + i)}</span>
              <span style={{ ...styles.text, fontSize: 14 }}>{opt}</span>
              {quizAnswer !== null && i === lesson.quiz.answer && <span style={{ marginLeft: "auto" }}>✅</span>}
              {quizAnswer === i && i !== lesson.quiz.answer && <span style={{ marginLeft: "auto" }}>❌</span>}
            </div>
          );
        })}
      </div>
    );
  }

  if (phase === "choice") {
    return (
      <div style={styles.screen}>
        <button style={styles.backBtn} onClick={() => setPhase("story")}>← Back</button>
        <p style={{ ...styles.textGold, fontSize: 11, letterSpacing: 2, marginBottom: 12 }}>⚔ STORY CHOICE</p>
        <h3 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 20, marginBottom: 8 }}>
          What path do you follow?
        </h3>
        <p style={{ ...styles.textMuted, fontSize: 13, marginBottom: 24 }}>Your choice shapes the narrative, but the quiz awaits either way.</p>
        {lesson.choices.map((c, i) => (
          <div key={i} style={{ ...styles.choiceCard, border: chosen === i ? `2px solid ${COLORS.gold}` : `1px solid ${COLORS.border}` }}
            onClick={() => { setChosen(i); setTimeout(() => setPhase("quiz"), 400); }}>
            <span style={{ fontSize: 20 }}>{i === 0 ? "⚔️" : "📜"}</span>
            <span style={{ ...styles.text, fontSize: 14, lineHeight: 1.4 }}>{c.text}</span>
            <span style={{ ...styles.textGold }}>→</span>
          </div>
        ))}
      </div>
    );
  }

  // Story phase
  return (
    <div style={styles.screen}>
      <button style={styles.backBtn} onClick={onBack}>← Back</button>
      <div style={styles.lessonMeta}>
        <span style={styles.eraBadge}>{lesson.era}</span>
        <span style={{ ...styles.textGold, fontSize: 11 }}>+{lesson.xp} XP</span>
      </div>
      <h2 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 24, marginBottom: 20, lineHeight: 1.3 }}>
        {lesson.title}
      </h2>
      <div style={styles.storyDivider} />
      {paragraphs.map((p, i) => (
        <p key={i} style={{ ...styles.storyText }}
          dangerouslySetInnerHTML={{ __html: p.replace(/\*\*(.*?)\*\*/g, `<strong style="color:${COLORS.goldLight}">$1</strong>`).replace(/\*(.*?)\*/g, `<em style="color:${COLORS.text}">$1</em>`) }} />
      ))}
      <button style={{ ...styles.primaryBtn, marginTop: 24 }} onClick={() => setPhase("choice")}>
        Make a Choice →
      </button>
    </div>
  );
}

function SkillTreeScreen() {
  return (
    <div style={styles.screen}>
      <p style={styles.sectionLabel}>🗺 SKILL TREE</p>
      <h2 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 6 }}>Eras of History</h2>
      <p style={{ ...styles.textMuted, fontSize: 13, marginBottom: 20 }}>Unlock new civilizations and time periods</p>
      <div style={styles.treeContainer}>
        {skillTree.map(node => (
          <div key={node.id} style={{ ...styles.treeNode, left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }}>
            <div style={{ ...styles.treeNodeInner, border: `2px solid ${node.unlocked ? COLORS.gold : COLORS.border}`, opacity: node.unlocked ? 1 : 0.45 }}>
              <span style={{ fontSize: 10, textAlign: "center", ...styles.textMuted, letterSpacing: 0.5 }}>
                {node.unlocked ? "✦" : "🔒"}
              </span>
            </div>
            <p style={{ ...styles.treeLabel, color: node.unlocked ? COLORS.goldLight : COLORS.textMuted }}>{node.label}</p>
            <p style={{ ...styles.treeEra }}>{node.lessons} lessons</p>
          </div>
        ))}
        {/* Connector lines (decorative) */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
          <line x1="50%" y1="10%" x2="20%" y2="35%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="50%" y1="10%" x2="75%" y2="38%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="20%" y1="35%" x2="35%" y2="62%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="75%" y1="38%" x2="65%" y2="65%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="35%" y1="62%" x2="50%" y2="88%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
          <line x1="65%" y1="65%" x2="50%" y2="88%" stroke={COLORS.border} strokeWidth="1.5" strokeDasharray="4,4" />
        </svg>
      </div>
    </div>
  );
}

function DailyChallengeScreen({ userData, onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  function handleAnswer(i) {
    if (selected !== null) return;
    setSelected(i);
    const isCorrect = i === dailyChallenges[current].a;
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (current + 1 >= dailyChallenges.length) setDone(true);
      else { setCurrent(c => c + 1); setSelected(null); }
    }, 900);
  }
const leaderboard = [
  { rank: 1, name: "HistoryHawk", xp: 4820, streak: 21, avatar: "🦅" },
  { rank: 2, name: "ChronoSage", xp: 4415, streak: 14, avatar: "🧙" },
  { rank: 3, name: "TimeLord99", xp: 3990, streak: 18, avatar: "⚡" },
  { rank: 4, name: "YOU", xp: 3640, streak: 7, avatar: "⚔️", isUser: true },
  { rank: 5, name: "AncientMind", xp: 3210, streak: 5, avatar: "🏺" },
  { rank: 6, name: "Clio'sChild", xp: 2980, streak: 3, avatar: "📜" },
];
if (done) {
    return (
      <div style={{ ...styles.screen, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
        <h2 style={{ ...styles.textGold, fontFamily: "'Playfair Display', serif", fontSize: 26 }}>Challenge Complete!</h2>
        <p style={{ ...styles.textMuted, fontSize: 14, marginTop: 8 }}>{score} / {dailyChallenges.length} correct</p>
        <div style={{ ...styles.xpBurst, margin: "20px auto" }}>
          <span style={{ ...styles.textGold, fontSize: 32, fontWeight: 800 }}>+{score * 40}</span>
          <span style={{ ...styles.textMuted, fontSize: 12 }}>XP</span>
        </div>
        <button style={styles.primaryBtn} onClick={() => onComplete(score * 40)}>Claim Reward →</button>
      </div>
    );
  }

  const q = dailyChallenges[current];
  return (
    <div style={styles.screen}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={styles.sectionLabel}>⚡ DAILY CHALLENGE</p>
        <p style={{ ...styles.textMuted, fontSize: 12 }}>{current + 1}/{dailyChallenges.length}</p>
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${(current / dailyChallenges.length) * 100}%` }} />
      </div>
      <h3 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 20, margin: "24px 0", lineHeight: 1.4 }}>
        {q.q}
      </h3>
      {q.opts.map((opt, i) => {
        let bg = COLORS.card, border = COLORS.border;
        if (selected !== null) {
          if (i === q.a) { bg = "#1a3a1a"; border = COLORS.success; }
          else if (i === selected) { bg = "#3a1a1a"; border = COLORS.error; }
        }
        return (
          <div key={i} style={{ ...styles.quizOption, background: bg, border: `1px solid ${border}` }}
            onClick={() => handleAnswer(i)}>
            <span style={styles.optionLabel}>{String.fromCharCode(65 + i)}</span>
            <span style={{ ...styles.text, fontSize: 14 }}>{opt}</span>
          </div>
        );
      })}
    </div>
  );
}

function LeaderboardScreen({ userData }) {
  return (
    <div style={styles.screen}>
      <p style={styles.sectionLabel}>🏆 LEADERBOARD</p>
      <h2 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 22, marginBottom: 4 }}>This Week's Scholars</h2>
      <p style={{ ...styles.textMuted, fontSize: 13, marginBottom: 20 }}>Resets every Sunday</p>
      {leaderboard.map(entry => (
        <div key={entry.rank} style={{ ...styles.leaderRow, border: entry.isUser ? `1px solid ${COLORS.gold}` : `1px solid ${COLORS.border}`, background: entry.isUser ? "#1E1600" : COLORS.card }}>
          <span style={{ ...styles.rankNum, color: entry.rank <= 3 ? COLORS.gold : COLORS.textMuted }}>
            {entry.rank <= 3 ? ["🥇", "🥈", "🥉"][entry.rank - 1] : `#${entry.rank}`}
          </span>
          <span style={{ fontSize: 22, marginRight: 10 }}>{entry.avatar}</span>
          <div style={{ flex: 1 }}>
            <p style={{ ...styles.text, fontSize: 14, fontWeight: entry.isUser ? 700 : 400, margin: 0 }}>
              {entry.name}{entry.isUser ? " (You)" : ""}
            </p>
            <p style={{ ...styles.textMuted, fontSize: 11, marginTop: 2 }}>🔥 {entry.streak} day streak</p>
          </div>
          <span style={{ ...styles.textGold, fontSize: 14, fontWeight: 700 }}>{entry.xp.toLocaleString()} XP</span>
        </div>
      ))}
    </div>
  );
}

function ProfileScreen({ userData }) {
  const badges = [
    { icon: "🏛️", label: "Rome Scholar", earned: true },
    { icon: "⚔️", label: "7-Day Streak", earned: true },
    { icon: "📜", label: "Quiz Master", earned: false },
    { icon: "🌍", label: "World Traveler", earned: false },
    { icon: "🔥", label: "30-Day Streak", earned: false },
    { icon: "👑", label: "Top 3 Finisher", earned: false },
  ];
return (
    <div style={styles.screen}>
      <div style={styles.profileHeader}>
        <div style={styles.avatarCircle}>⚔️</div>
        <h2 style={{ ...styles.text, fontFamily: "'Playfair Display', serif", fontSize: 22, margin: "12px 0 4px" }}>{userData.name}</h2>
        <p style={{ ...styles.textGold, fontSize: 13 }}>Level {userData.level} · Apprentice Scholar</p>
      </div>
      <div style={styles.statsRow}>
        {[{ label: "Total XP", val: userData.xp.toLocaleString() }, { label: "Streak", val: `${userData.streak}🔥` }, { label: "Lessons", val: "3" }].map(s => (
          <div key={s.label} style={styles.statBox}>
            <p style={{ ...styles.textGold, fontSize: 20, fontWeight: 700, margin: 0 }}>{s.val}</p>
            <p style={{ ...styles.textMuted, fontSize: 11, marginTop: 4 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <p style={styles.sectionLabel}>🎖 BADGES</p>
      <div style={styles.badgeGrid}>
        {badges.map(b => (
          <div key={b.label} style={{ ...styles.badgeItem, opacity: b.earned ? 1 : 0.3 }}>
            <div style={styles.badgeIcon}>{b.icon}</div>
            <p style={{ ...styles.textMuted, fontSize: 10, textAlign: "center", marginTop: 6 }}>{b.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("home");
  const [activeLesson, setActiveLesson] = useState(null);
  const [userData, setUserData] = useState({
    name: "Scholar",
    level: 4,
    xp: 1840,
    streak: 7,
    dailyDone: 2,
  });

  function addXP(amount) {
    setUserData(u => {
      const newXP = u.xp + amount;
      const newLevel = Math.floor(newXP / 500) + 1;
      return { ...u, xp: newXP, level: newLevel };
    });
  }

  function handleLessonComplete(xp) {
    addXP(xp);
    setActiveLesson(null);
    setScreen("home");
  }

  function handleDailyComplete(xp) {
    addXP(xp);
    setUserData(u => ({ ...u, dailyDone: 5 }));
    setScreen("home");
  }

  const navItems = [
    { id: "home", icon: "🏠", label: "Home" },
    { id: "skills", icon: "🗺️", label: "Skills" },
    { id: "daily", icon: "⚡", label: "Daily" },
    { id: "board", icon: "🏆", label: "Ranks" },
    { id: "profile", icon: "⚔️", label: "Profile" },
  ];
return (
    <div style={styles.appWrapper}>
      <div style={styles.phone}>
        {/* Status bar */}
        <div style={styles.statusBar}>
          <span style={{ ...styles.textMuted, fontSize: 11 }}>Paladin</span>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 10, ...styles.textMuted }}>🔥{userData.streak}</span>
            <span style={{ ...styles.textGold, fontSize: 11, fontWeight: 700 }}>{userData.xp} XP</span>
          </div>
        </div>

        {/* Screen Content */}
        <div style={styles.content}>
          {activeLesson ? (
            <LessonScreen lesson={activeLesson} onComplete={handleLessonComplete} onBack={() => { setActiveLesson(null); setScreen("home"); }} />
          ) : screen === "home" ? (
            <HomeScreen userData={userData} onNav={setScreen} onStartLesson={l => { setActiveLesson(l); }} />
          ) : screen === "skills" ? (
            <SkillTreeScreen />
          ) : screen === "daily" ? (
            <DailyChallengeScreen userData={userData} onComplete={handleDailyComplete} />
          ) : screen === "board" ? (
            <LeaderboardScreen userData={userData} />
          ) : (
            <ProfileScreen userData={userData} />
          )}
        </div>

        {/* Bottom Nav */}
        {!activeLesson && (
          <div style={styles.bottomNav}>
            {navItems.map(n => (
              <div key={n.id} style={{ ...styles.navItem, opacity: screen === n.id ? 1 : 0.45 }} onClick={() => setScreen(n.id)}>
                <span style={{ fontSize: 20 }}>{n.icon}</span>
                <span style={{ fontSize: 9, ...styles.textMuted, color: screen === n.id ? COLORS.gold : COLORS.textMuted }}>{n.label}</span>
                {screen === n.id && <div style={styles.navDot} />}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Styles 
const styles = {
  appWrapper: {
    minHeight: "100vh",
    background: `radial-gradient(ellipse at 20% 20%, #1a1000 0%, #080600 60%)`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Crimson Pro', 'Georgia', serif",
    padding: "20px 0",
  },
  phone: {
    width: 390,
    minHeight: 780,
    maxHeight: 870,
    background: COLORS.bg,
    borderRadius: 44,
    border: `1px solid ${COLORS.border}`,
    boxShadow: `0 0 80px rgba(240,165,0,0.08), 0 40px 120px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.04)`,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    position: "relative",
  },
  statusBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 24px 8px",
    borderBottom: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
  },
  content: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    scrollbarWidth: "none",
  },
  screen: {
    padding: "20px 20px 100px",
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  bottomNav: {
    display: "flex",
    borderTop: `1px solid ${COLORS.border}`,
    background: COLORS.surface,
    padding: "10px 8px 16px",
  },
  navItem: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 3,
    cursor: "pointer",
    position: "relative",
    transition: "opacity 0.2s",
  },
navDot: {
    width: 4, height: 4,
    borderRadius: "50%",
    background: COLORS.gold,
    position: "absolute",
    bottom: -8,
  },
  text: { color: COLORS.text, margin: 0 },
  textGold: { color: COLORS.gold, margin: 0 },
  textMuted: { color: COLORS.textMuted, margin: 0 },
  sectionLabel: {
    color: COLORS.goldDim,
    fontSize: 10,
    letterSpacing: 2.5,
    fontFamily: "'Crimson Pro', serif",
    marginBottom: 12,
    marginTop: 20,
  },
  homeHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
  },
  streakBadge: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 12,
    padding: "8px 14px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 2,
  },
  xpCard: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 16,
    padding: "14px 16px",
    marginBottom: 16,
  },
  xpBarBg: {
    background: COLORS.border,
    borderRadius: 99,
    height: 6,
    overflow: "hidden",
  },
  xpBarFill: {
    background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
    height: "100%",
    borderRadius: 99,
    transition: "width 0.5s ease",
  },
  dailyChallengeCard: {
    background: `linear-gradient(135deg, #1E1400, #120D00)`,
    border: `1px solid ${COLORS.goldDim}`,
    borderRadius: 16,
    padding: "16px",
    marginBottom: 4,
    cursor: "pointer",
  },
  challengeIcon: {
    fontSize: 28,
    background: COLORS.border,
    borderRadius: "50%",
    width: 48, height: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
challengeDot: {
    flex: 1,
    height: 4,
    borderRadius: 99,
    transition: "background 0.3s",
  },
  lessonCard: {
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "14px",
    display: "flex",
    alignItems: "center",
    gap: 14,
    marginBottom: 10,
    cursor: "pointer",
    transition: "border-color 0.2s",
  },
  lessonCardLeft: {
    width: 44, height: 44,
    background: COLORS.border,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 22,
    flexShrink: 0,
  },
  arrowBtn: {
    color: COLORS.gold,
    fontSize: 18,
    fontWeight: 700,
  },
  backBtn: {
    background: "none",
    border: "none",
    color: COLORS.textMuted,
    fontSize: 14,
    cursor: "pointer",
    padding: 0,
    marginBottom: 16,
    fontFamily: "'Crimson Pro', serif",
  },
  lessonMeta: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  eraBadge: {
background: COLORS.border,
    color: COLORS.gold,
    fontSize: 11,
    letterSpacing: 1,
    padding: "4px 10px",
    borderRadius: 99,
  },
  storyDivider: {
    width: 40,
    height: 2,
    background: `linear-gradient(90deg, ${COLORS.gold}, transparent)`,
    marginBottom: 20,
  },
  storyText: {
    color: COLORS.text,
    fontSize: 15,
    lineHeight: 1.75,
    marginBottom: 16,
    fontFamily: "'Crimson Pro', serif",
  },
  primaryBtn: {
    background: `linear-gradient(135deg, ${COLORS.gold}, #C88000)`,
    color: "#0D0B07",
    border: "none",
    borderRadius: 99,
    padding: "14px 32px",
    fontSize: 15,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "'Crimson Pro', serif",
    alignSelf: "stretch",
    letterSpacing: 0.5,
  },
  quizOption: {
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 10,
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    transition: "all 0.3s",
  },
  optionLabel: {
    background: COLORS.border,
    color: COLORS.gold,
    fontSize: 12,
    fontWeight: 700,
    width: 26, height: 26,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  choiceCard: {
    borderRadius: 14,
    padding: "16px",
    marginBottom: 12,
    display: "flex",
    alignItems: "center",
    gap: 14,
    cursor: "pointer",
    background: COLORS.card,
    transition: "border 0.3s",
  },
  xpBurst: {
    background: COLORS.card,
    border: `2px solid ${COLORS.gold}`,
    borderRadius: 99,
    padding: "12px 32px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  treeContainer: {
    position: "relative",
    height: 420,
    background: COLORS.card,
    borderRadius: 20,
    border: `1px solid ${COLORS.border}`,
    overflow: "hidden",
  },
  treeNode: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: 80,
  },
  treeNodeInner: {
    width: 44, height: 44,
    borderRadius: "50%",
    background: COLORS.surface,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  treeLabel: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 6,
    fontWeight: 600,
    lineHeight: 1.2,
  },
  treeEra: {
    fontSize: 9,
    color: COLORS.textDim,
    textAlign: "center",
    marginTop: 2,
  },
  progressBar: {
    background: COLORS.border,
    borderRadius: 99,
    height: 4,
    marginBottom: 24,
    overflow: "hidden",
  },
  progressFill: {
    background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.goldLight})`,
    height: "100%",
    borderRadius: 99,
    transition: "width 0.4s ease",
  },
  leaderRow: {
    borderRadius: 14,
    padding: "14px 16px",
    marginBottom: 8,
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  rankNum: {
    fontSize: 16,
    fontWeight: 700,
    width: 32,
    textAlign: "center",
  },
  profileHeader: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
  },
  avatarCircle: {
    width: 72, height: 72,
    borderRadius: "50%",
    background: COLORS.card,
    border: `2px solid ${COLORS.gold}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 32,
  },
  statsRow: {
    display: "flex",
    gap: 10,
    marginBottom: 8,
  },
  statBox: {
flex: 1,
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "14px 10px",
    textAlign: "center",
  },
  badgeGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 12,
  },
  badgeItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    background: COLORS.card,
    border: `1px solid ${COLORS.border}`,
    borderRadius: 14,
    padding: "14px 10px",
    transition: "opacity 0.3s",
  },
  badgeIcon: {
    fontSize: 28,
  },
};

