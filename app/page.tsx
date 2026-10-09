'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cake, Heart, Star, Sparkles, Sun, Moon,
  Camera, Music, Coffee, Flame, MapPin,
  ArrowDown, Quote, Flower2, Gem, Crown, Compass,
  Wind, PartyPopper, Mail, Gift, Ribbon,
  ChevronLeft, ChevronRight, X,
  GraduationCap, School, Smile, Bike, Smartphone, BookOpen, Zap, Play, Pause, Mic, Volume2,
  Lock, KeyRound, Check,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════════════════ */
const BIRTHDAY_DATE = new Date('2026-07-03T00:00:00');
const NAME = 'cantikk';
const SENDER_NAME = 'Aku ❤️';
const YOUTUBE_MUSIC_ID = 'awWKxGftWh4'; // https://www.youtube.com/watch?v=awWKxGftWh4

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: (() => void) | undefined;
  }
}

/* ── Colors ── */
const C = {
  bg: 'rgba(250, 246, 241, 0.45)',
  bg2: 'rgba(243, 237, 228, 0.55)',
  cream: 'rgba(253, 251, 248, 0.50)',
  warm: '#e8dfd3',
  blush: '#d4899a',
  blushL: '#f5d5d5',
  blushD: '#a84f65',
  gold: '#c9a96e',
  goldL: '#e6cfa0',
  goldD: '#a88c4f',
  sage: '#b8c7b0',
  text: '#2d1f14',
  textM: '#6b5a4e',
  textL: '#9a897c',
};

const SERIF = "'Playfair Display', Georgia, serif";
const SANS = "'Quicksand', sans-serif";
const HANDWRITING = "'Caveat', cursive, sans-serif";

/* ── Image paths ── */
const IMG = {
  hero: '/hero.png',
  flowers: '/flowers.png',
  couple: '/couple.png',
  letter: '/letter.png',
  lights: '/lights.png',
  gift: '/gift.png',
};

/* ── Data ── */
const WISHES = [
  { Icon: Smile, title: 'Kebahagiaan Abadi', text: 'Semoga setiap harimu selalu dipenuhi senyum manis dan tawa bahagia bersamaku.' },
  { Icon: Sun, title: 'Kesehatan & Keselamatan', text: 'Semoga kamu selalu diberikan tubuh yang sehat, bugar, dan penuh semangat setiap hari.' },
  { Icon: Flower2, title: 'Perlindungan Allah', text: 'Semoga Allah senantiasa menjagamu dan melindungimu ke mana pun langkahmu pergi.' },
  { Icon: Wind, title: 'Kedamaian Hati', text: 'Semoga hatimu selalu tenang, damai, dan bebas dari segala rasa cemas maupun lelah.' },
  { Icon: Star, title: 'Iman yang Semakin Kuat', text: 'Semoga keimanan dan ketaatanmu kepada Allah semakin bertambah indah seiring waktu.' },
  { Icon: Sparkles, title: 'Doa-doa Terkabul', text: 'Semoga segala doa yang kau bisikkan dalam sujud didengar dan dikabulkan dengan cara terindah.' },
  { Icon: Gem, title: 'Impian Jadi Kenyataan', text: 'Semoga satu per satu cita-cita dan impian besarmu terwujud dengan mudah dan lancar.' },
  { Icon: Flame, title: 'Kekuatan Tanpa Batas', text: 'Semoga setiap tantangan yang hadir justru menjadikanmu wanita yang semakin tangguh dan hebat.' },
  { Icon: Heart, title: 'Cinta yang Tulus', text: 'Semoga kamu selalu merasakan betapa dalamnya rasa cantikk dan cinta tulusku untukmu.' },
  { Icon: Flower2, title: 'Hati yang Lembut & Cantik', text: 'Semoga kebaikan, kelembutan, dan kemurnian hatimu yang memesona selalu terjaga.' },
  { Icon: Crown, title: 'Keberanian Melangkah', text: 'Semoga kamu selalu percaya diri dan bangga atas dirimu yang begitu berharga.' },
  { Icon: Sun, title: 'Bahagia dalam Hal Kecil', text: 'Semoga kamu selalu menemukan alasan manis untuk tersenyum bahkan dari hal-hal sederhana.' },
  { Icon: Star, title: 'Masa Depan Cerah', text: 'Semoga masa depan kita berdua selalu terang, indah, dan penuh keberkahan.' },
  { Icon: Compass, title: 'Langkah Menuju Cita', text: 'Semoga setiap langkah yang kau ambil membawamu semakin dekat dengan kesuksesan.' },
  { Icon: Zap, title: 'Ketegaran Hati', text: 'Semoga kamu selalu dilimpahi ketabahan dan kekuatan saat menghadapi hari-hari yang berat.' },
  { Icon: Sparkles, title: 'Versi Terbaik Dirimu', text: 'Semoga kamu terus tumbuh menjadi sosok bidadari yang semakin anggun dan membanggakan.' },
  { Icon: Flower2, title: 'Berkah untuk Keluarga', text: 'Semoga keluargamu senantiasa diberikan kesehatan, kebahagiaan, dan limpahan rezeki.' },
  { Icon: Gem, title: 'Selalu Merasa Berharga', text: 'Jangan pernah lupa bahwa kamu adalah anugerah terindah dan sangat berarti bagiku.' }
];

  const MEMORIES = [
    {
      Icon: Sparkles,
      label: "Photobox ceunah",
      desc: "Momen seru berpose bareng di photobox, mengabadikan ekspresi lucu dan senyum manis kita berdua.",
      img: "images/img1.jpeg",
    },
    {
      Icon: GraduationCap,
      label: "Wisuda profesi josjiss",
      desc: "Momen membanggakan di hari kelulusan profesimu, ikut bahagia dan bangga melihat pencapaian hebatmu.",
      img: "images/img2.jpeg",
    },
    {
      Icon: Flame,
      label: "Rakum with u",
      desc: "Petualangan seru camping di Ranu Kumbolo, menikmati dinginnya udara dan hangatnya kebersamaan kita.",
      img: "images/img3.jpeg",
    },
    {
      Icon: Moon,
      label: "XXI edition",
      desc: "Kencan santai nonton film favorit di bioskop, ditemani popcorn dan obrolan seru berdua.",
      img: "images/img4.jpeg",
    },
    {
      Icon: Bike,
      label: "Merbabu with u",
      desc: "Perjalanan mendaki dan menaklukkan jalur Gunung Merbabu bersamamu, lelahnya terbayar dengan pemandangan dan momen indah.",
      img: "images/img5.jpeg",
    },
    {
      Icon: Heart,
      label: "Yang ini inget ga kapan wkwk",
      desc: "Momen manis yang penuh kenangan tak terlupakan, salah satu cerita indah dari perjalanan kisah kita.",
      img: "images/img6.jpeg",
    },
  ];

const QUOTES = [
  '"Dalam jutaan manusia di bumi, hatiku selalu dan selamanya memilihmu sebagai rumah terindah untuk pulang."',
  '"Mencintaimu adalah hal terindah dan paling membahagiakan dalam hidupku. Selamat ulang tahun, bidadari hatiku."',
  '"Setiap detik bersamamu adalah bait puisi cinta yang tak pernah ingin kuakhiri. Terima kasih telah menyempurnakan duniaku."',
  '"Tak peduli berapa banyak waktu berganti, rasa cantikk dan cintaku padamu akan selalu mekar lebih indah di setiap detiknya."',
];

const CONFETTI_COLORS = [C.blush, C.blushL, C.gold, C.goldL, C.sage, C.blushD];

/* ═══════════════════════════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════════════════════════ */
function getTimeLeft() {
  const diff = BIRTHDAY_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}
function pad(n: number) { return String(n).padStart(2, '0'); }

/* ═══════════════════════════════════════════════════════════════════════════
   CONFETTI
   ═══════════════════════════════════════════════════════════════════════════ */
function Confetti({ active }: { active: boolean }) {
  const [items, setItems] = useState<{ id: number; x: number; color: string; size: number; dur: number; del: number; shape: string }[]>([]);
  useEffect(() => {
    if (!active) { setItems([]); return; }
    setItems(Array.from({ length: 80 }, (_, i) => ({
      id: i, x: Math.random() * 100,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      size: 7 + Math.random() * 10,
      dur: 2.5 + Math.random() * 3,
      del: Math.random() * 1.8,
      shape: ['●', '◆', '▲', '★', '■'][Math.floor(Math.random() * 5)],
    })));
  }, [active]);
  if (!active || !items.length) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 999 }}>
      {items.map(x => (
        <span key={x.id} style={{ position: 'absolute', left: `${x.x}%`, top: '-5%', fontSize: x.size, color: x.color, animation: `confettiFall ${x.dur}s ease-in ${x.del}s forwards` }}>
          {x.shape}
        </span>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SHARED UI
   ═══════════════════════════════════════════════════════════════════════════ */

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
      <div style={{ width: 34, height: 1.5, background: C.gold }} />
      <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, fontFamily: SANS }}>{text}</span>
    </div>
  );
}

/* 🌹 White Rose Component */
function WhiteRose({ size = 32 }: { size?: number }) {
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        filter: 'drop-shadow(0 3px 10px rgba(212,137,154,0.25))',
      }}
    >
      {/* Soft green leaves behind */}
      <div
        style={{
          position: 'absolute',
          width: size * 0.45,
          height: size * 0.7,
          borderRadius: '80% 0% 80% 0%',
          background: 'linear-gradient(135deg, #a3b899, #7a9a6f)',
          transform: 'rotate(-40deg) translate(-25%, -20%)',
          opacity: 0.75,
          zIndex: 1,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: size * 0.4,
          height: size * 0.65,
          borderRadius: '0% 80% 0% 80%',
          background: 'linear-gradient(225deg, #b5c7ac, #89a87d)',
          transform: 'rotate(50deg) translate(25%, 20%)',
          opacity: 0.65,
          zIndex: 1,
        }}
      />

      {/* Layer 1: Outer Petals (5 petals) */}
      {[0, 72, 144, 216, 288].map((deg, i) => (
        <div
          key={`wr-out-${i}`}
          style={{
            position: 'absolute',
            zIndex: 2,
            width: size * 0.48,
            height: size * 0.52,
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            background: 'linear-gradient(to top, #f5edf0 0%, #ffffff 70%, #fffbfd 100%)',
            transformOrigin: 'bottom center',
            transform: `rotate(${deg}deg) translateY(-${size * 0.16}px)`,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06), inset 0 -2px 4px rgba(220,195,205,0.3)',
            opacity: 0.98,
          }}
        />
      ))}

      {/* Layer 2: Mid Petals (5 petals offset) */}
      {[36, 108, 180, 252, 324].map((deg, i) => (
        <div
          key={`wr-mid-${i}`}
          style={{
            position: 'absolute',
            zIndex: 3,
            width: size * 0.38,
            height: size * 0.44,
            borderRadius: '50% 50% 45% 45% / 60% 60% 40% 40%',
            background: 'linear-gradient(to top, #faeef3 0%, #ffffff 80%)',
            transformOrigin: 'bottom center',
            transform: `rotate(${deg}deg) translateY(-${size * 0.11}px)`,
            boxShadow: '0 1px 4px rgba(0,0,0,0.04), inset 0 -1px 3px rgba(212,137,154,0.25)',
            opacity: 0.96,
          }}
        />
      ))}

      {/* Layer 3: Inner swirl petals (4 petals) */}
      {[15, 105, 195, 285].map((deg, i) => (
        <div
          key={`wr-in-${i}`}
          style={{
            position: 'absolute',
            zIndex: 4,
            width: size * 0.28,
            height: size * 0.34,
            borderRadius: '50% 50% 40% 40%',
            background: 'linear-gradient(to top, #fce4ec 0%, #fff7f9 60%, #ffffff 100%)',
            transformOrigin: 'bottom center',
            transform: `rotate(${deg}deg) translateY(-${size * 0.06}px)`,
            boxShadow: 'inset 0 -1px 2px rgba(212,137,154,0.35)',
            opacity: 0.95,
          }}
        />
      ))}

      {/* Center Rose Spiral Heart */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: size * 0.22,
          height: size * 0.22,
          borderRadius: '50%',
          background: 'radial-gradient(circle, #f8bbd0 15%, #fce4ec 55%, #fff 100%)',
          boxShadow: 'inset 0 0 3px rgba(212,137,154,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: size * 0.1,
            height: size * 0.1,
            borderRadius: '50%',
            border: '1px solid rgba(212,137,154,0.5)',
            borderTopColor: 'transparent',
            transform: 'rotate(45deg)',
          }}
        />
      </div>
    </div>
  );
}


function SectionTitle({ children, center }: { children: React.ReactNode; center?: boolean }) {
  return (
    <h2 style={{
      fontSize: 'clamp(2rem, 5vw, 3.5rem)',
      fontWeight: 600, fontFamily: SERIF, fontStyle: 'italic',
      lineHeight: 1.15, color: C.text,
      textAlign: center ? 'center' : 'left',
    }}>{children}</h2>
  );
}

function CountdownBox({ value, label }: { value: number; label: string }) {
  return (
    <div style={{
      minWidth: 78, padding: '18px 14px', textAlign: 'center',
      background: 'rgba(255,255,255,0.7)', backdropFilter: 'blur(20px)',
      border: `1px solid ${C.warm}`,
      borderRadius: 16,
      boxShadow: '0 4px 16px rgba(45,31,20,0.06)',
    }}>
      <div style={{
        fontSize: 32, fontWeight: 700, fontFamily: SERIF,
        color: C.blushD, lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }} suppressHydrationWarning>{pad(value)}</div>
      <div style={{
        marginTop: 6, fontSize: 9, fontWeight: 700,
        letterSpacing: '0.18em', textTransform: 'uppercase',
        color: C.textL, fontFamily: SANS,
      }}>{label}</div>
    </div>
  );
}

function Btn({ onClick, children, primary = true, id }: { onClick?: () => void; children: React.ReactNode; primary?: boolean; id?: string }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      id={id}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: primary ? '15px 38px' : '14px 34px',
        borderRadius: 50,
        border: primary ? 'none' : `1.5px solid ${hov ? C.blush : C.warm}`,
        background: primary
          ? `linear-gradient(135deg, ${C.blush}, ${C.blushD})`
          : (hov ? 'rgba(212,137,154,0.06)' : 'transparent'),
        color: primary ? '#fff' : C.text,
        fontWeight: 700, fontSize: 15, cursor: 'pointer',
        fontFamily: SANS, letterSpacing: '0.03em',
        boxShadow: primary
          ? (hov ? `0 14px 40px rgba(168,79,101,0.35)` : `0 6px 24px rgba(168,79,101,0.2)`)
          : 'none',
        transform: hov ? 'translateY(-3px)' : 'translateY(0)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}
    >{children}</button>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   HERO — full-screen with photo collage
   ═══════════════════════════════════════════════════════════════════════════ */

function HeroSection({ onCelebrate, active = false }: { onCelebrate: () => void; active?: boolean }) {
  const sRef = useRef<HTMLElement>(null);
  const [time, setTime] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  // GSAP entrance - triggered when unlocked / active is true with silky smooth choreography
  useEffect(() => {
    if (!sRef.current || !active) return;
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      const tl = gsap.timeline({
        delay: 0.15,
        defaults: { ease: 'power3.out' }
      });

      if (isMobile) {
        // Mobile entrance: Image smooth bloom first, followed by staggered text
        tl.fromTo('[data-h="img1"]', { scale: 0.75, opacity: 0, y: 20 }, { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' })
          .fromTo('[data-h="img3"]', { scale: 0.8, y: 30, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.8')
          .fromTo('[data-h="label"]', { x: -24, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8 }, '-=0.6')
          .fromTo('[data-h="title"]', { y: 35, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.6')
          .fromTo('[data-h="name"]', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
          .fromTo('[data-h="desc"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
          .fromTo('[data-h="cd"]', { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
          .fromTo('[data-h="btns"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5');
      } else {
        // Desktop entrance: Elegant synchronized reveal
        tl.fromTo('[data-h="label"]', { x: -35, opacity: 0 }, { x: 0, opacity: 1, duration: 0.85, ease: 'power2.out' })
          .fromTo('[data-h="title"]', { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, '-=0.5')
          .fromTo('[data-h="name"]', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.7')
          .fromTo('[data-h="desc"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6')
          .fromTo('[data-h="cd"]', { y: 25, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.85 }, '-=0.5')
          .fromTo('[data-h="btns"]', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, '-=0.5')
          .fromTo('[data-h="img1"]', { scale: 0.75, opacity: 0, rotate: -3 }, { scale: 1, opacity: 1, rotate: 0, duration: 1.3, ease: 'power2.out' }, '-=1.4')
          .fromTo('[data-h="img2"]', { scale: 0.8, y: 40, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 1.0, ease: 'power2.out' }, '-=0.9')
          .fromTo('[data-h="img3"]', { scale: 0.8, y: 30, opacity: 0 }, { scale: 1, y: 0, opacity: 1, duration: 0.9, ease: 'power2.out' }, '-=0.7');
      }

      // Parallax
      gsap.to('[data-h="img1"]', { y: -40, scrollTrigger: { trigger: sRef.current, start: 'top top', end: 'bottom top', scrub: true } });
      gsap.to('[data-h="img2"]', { y: -25, scrollTrigger: { trigger: sRef.current, start: 'top top', end: 'bottom top', scrub: true } });
    }, sRef);
    return () => ctx.revert();
  }, [active]);

  const isBday = mounted && Object.values(time).every(v => v === 0);

  return (
    <section ref={sRef} id="hero" style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center',
      padding: '80px 5vw',
      overflow: 'hidden',
      background: C.bg,
    }}>
      {/* Decorative shape */}
      <div style={{ position: 'absolute', top: '-15%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%', background: `linear-gradient(135deg, ${C.blushL}40, ${C.goldL}30)`, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-8%', width: '40vw', height: '40vw', borderRadius: '50%', background: `linear-gradient(135deg, ${C.sage}30, ${C.cream})`, filter: 'blur(60px)', pointerEvents: 'none' }} />

      {/* 🌸 Floating WhiteRose in Hero */}
      <div style={{ position: 'absolute', top: '14%', left: '6%', opacity: 0.25, animation: 'floatY 9s ease-in-out 1s infinite', pointerEvents: 'none' }}><WhiteRose size={40} /></div>
      <div style={{ position: 'absolute', top: '26%', right: '5%', opacity: 0.24, animation: 'floatY 11s ease-in-out 2s infinite', pointerEvents: 'none' }}><WhiteRose size={36} /></div>
      <div style={{ position: 'absolute', bottom: '15%', left: '2%', opacity: 0.22, animation: 'floatY 10s ease-in-out 3s infinite', pointerEvents: 'none' }}><WhiteRose size={34} /></div>
      <div style={{ position: 'absolute', bottom: '8%', right: '3%', opacity: 0.20, animation: 'floatY 13s ease-in-out 1.2s infinite', pointerEvents: 'none' }}><WhiteRose size={38} /></div>

      <div className="hero-grid" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(32px, 5vw, 80px)',
        maxWidth: 1200, margin: '0 auto', width: '100%',
        alignItems: 'center',
      }}>
        {/* Left — Text */}
        <div>
          {/* Premium Tag Pill */}
          <div data-h="label" style={{ marginBottom: 20 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 30,
              boxShadow: `0 2px 12px ${C.blushL}40`,
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: C.blushD,
                fontFamily: SANS,
              }}>
                Wishing you a joyous birthday
              </span>
            </div>
          </div>

          {/* Main Hero Title */}
          <h1 data-h="title" style={{
            fontSize: 'clamp(3.2rem, 7.5vw, 5.8rem)',
            fontWeight: 700,
            fontFamily: SERIF,
            fontStyle: 'italic',
            lineHeight: 1.05,
            color: C.text,
            letterSpacing: '-0.02em',
            marginBottom: 16,
          }}>
            <span style={{ display: 'block', fontSize: '0.42em', fontStyle: 'normal', fontWeight: 600, fontFamily: SANS, color: C.textM, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 4 }}>
              Happy Birthday,
            </span>
            <span style={{
              background: `linear-gradient(135deg, ${C.text} 0%, ${C.blushD} 60%, ${C.blush} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(212,137,154,0.15))',
            }}>
              Cantikkkk!
            </span>
          </h1>

          {/* Subtitle / Note */}
          <div data-h="desc" style={{
            marginBottom: 36,
            maxWidth: 440,
            position: 'relative',
            paddingLeft: 16,
          }}>
            <p style={{
              fontSize: 'clamp(15px, 2vw, 18px)',
              lineHeight: 1.6,
              color: C.textM,
              fontFamily: SANS,
              fontWeight: 500,
              margin: 0,
            }}>
              Hai, this is for you
            </p>
            <p style={{
              fontSize: 'clamp(18px, 2.4vw, 22px)',
              lineHeight: 1.4,
              color: C.blushD,
              fontFamily: HANDWRITING,
              fontWeight: 700,
              marginTop: 4,
              marginBottom: 0,
              alignItems: 'center',
              gap: 6,
            }}>
              my favourite person <Heart size={15} style={{ fill: C.blush, color: C.blush, display: 'inline' }} />
            </p>
          </div>

          <div data-h="btns" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Btn id="celebrate-btn" onClick={onCelebrate} primary>
              <PartyPopper size={16} /> Rayakan Hari Ini
            </Btn>
            <Btn onClick={() => document.getElementById('letter')?.scrollIntoView({ behavior: 'smooth' })} primary={false}>
              <Mail size={16} /> Baca Surat
            </Btn>
          </div>
        </div>

        <div
          className="hero-photos"
          style={{
            position: "relative",
            height: "clamp(450px, 65vh, 700px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Glow Background — Primary */}
          <div
            className="hero-glow-primary"
            style={{
              position: "absolute",
              width: 380,
              height: 380,
              borderRadius: "50%",
              background: "rgba(255,182,193,.25)",
              filter: "blur(80px)",
              zIndex: 0,
            }}
          />

          {/* Glow Background — Secondary (gold accent) */}
          <div
            className="hero-glow-secondary"
            style={{
              position: "absolute",
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: "rgba(201,169,110,.18)",
              filter: "blur(60px)",
              zIndex: 0,
              top: "15%",
              left: "10%",
            }}
          />

          {/* Decorative gradient ring behind image */}
          <div
            className="hero-ring"
            style={{
              position: "absolute",
              width: "78%",
              height: "83%",
              borderRadius: "58% 42% 63% 37% / 38% 62% 38% 62%",
              zIndex: 1,
              opacity: 0.5,
              filter: "blur(2px)",
            }}
          />

          {/* Main Image */}
          <div
            data-h="img1"
            style={{
              width: "70%",
              height: "75%",
              overflow: "hidden",
              borderRadius: "58% 42% 63% 37% / 38% 62% 38% 62%",
              boxShadow: `0 25px 60px rgba(0,0,0,.18), 0 0 0 3px rgba(255,255,255,.6), 0 0 0 6px ${C.blushL}40`,
              position: "relative",
              zIndex: 3,
            }}
          >
            <img
              src="images/head.jpeg"
              alt=""
              className="img-cover"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover"
              }}
            />
            {/* Subtle inner vignette overlay */}
            <div style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              boxShadow: "inset 0 -30px 50px rgba(0,0,0,.08)",
              pointerEvents: "none",
              zIndex: 4,
            }} />
          </div>

          {/* Love Badge */}
          <div
            data-h="img3"
            style={{
              position: 'absolute',
              top: '5%',
              right: '12%',
              width: 90,
              height: 90,
              borderRadius: '50%',
              background:
                'linear-gradient(135deg,#ff8fa3,#ff4d6d)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 5,
              animation: 'float 4s ease-in-out infinite',
            }}
          >
            <Heart size={44} style={{ color: '#fff', fill: '#fff', filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.15))' }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FULL-WIDTH PHOTO BANNER
   ═══════════════════════════════════════════════════════════════════════════ */

function PhotoBanner({ src, alt, height = 400 }: { src: string; alt: string; height?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(ref.current!, {
        scaleY: 0.8, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        ease: 'power3.out',
      });
      gsap.to(ref.current!.querySelector('img'), {
        y: -30,
        scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} style={{
      width: '100%', height, overflow: 'hidden', position: 'relative',
    }}>
      <img src={src} alt={alt} style={{
        width: '100%', height: '120%', objectFit: 'cover',
        display: 'block', position: 'absolute', top: 0, left: 0,
      }} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(250,246,241,0.3), rgba(250,246,241,0.1) 40%, rgba(250,246,241,0.3))',
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LOVE LETTER — Envelope opening animation (both elements always in DOM)
   ═══════════════════════════════════════════════════════════════════════════ */

function LetterSection() {
  const ref = useRef<HTMLElement>(null);
  // Envelope refs
  const envelopeWrapRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  // Letter paper ref
  const letterRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'closed' | 'opening' | 'open'>('closed');

  // Scroll entrance animations
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-lt="photo"]', {
        x: -60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        ease: 'power3.out',
      });
      gsap.from('[data-lt="text"]', {
        x: 60, opacity: 0, duration: 1,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        ease: 'power3.out', delay: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Set initial hidden state for letter paper (always in DOM)
  useEffect(() => {
    if (letterRef.current) {
      gsap.set(letterRef.current, { y: 80, opacity: 0, scale: 0.94 });
    }
    // Hide letter lines initially
    const lines = document.querySelectorAll('[data-letter-line]');
    if (lines.length) gsap.set(lines, { opacity: 0, y: 16 });
  }, []);

  const handleOpen = () => {
    if (phase !== 'closed') return;
    setPhase('opening');

    const tl = gsap.timeline({ onComplete: () => setPhase('open') });

    // 1. Envelope jiggles left-right
    tl.to(envelopeWrapRef.current, { rotation: -3, duration: 0.13, ease: 'power1.inOut' })
      .to(envelopeWrapRef.current, { rotation: 3, duration: 0.13, ease: 'power1.inOut' })
      .to(envelopeWrapRef.current, { rotation: -2, duration: 0.1, ease: 'power1.inOut' })
      .to(envelopeWrapRef.current, { rotation: 0, duration: 0.1, ease: 'power1.inOut' })

      // 2. Flap folds open via 3D rotateX (hinge at top edge)
      .to(flapRef.current, {
        rotateX: -175,
        duration: 0.9,
        ease: 'power2.inOut',
      }, '+=0.08')

      // 3. Letter paper rises up from inside the envelope
      .to(letterRef.current, {
        y: 0, opacity: 1, scale: 1,
        duration: 0.8, ease: 'power3.out',
      }, '-=0.35')

      // 4. Envelope fades away as letter fully appears
      .to(envelopeWrapRef.current, {
        opacity: 0, y: 24, scale: 0.96,
        duration: 0.4, ease: 'power2.in',
      }, '-=0.2')

      // 5. Letter content lines stagger in
      .to('[data-letter-line]', {
        opacity: 1, y: 0,
        duration: 0.45, stagger: 0.09, ease: 'power2.out',
      }, '-=0.1');
  };

  return (
    <section ref={ref} id="letter" style={{
      padding: '120px 5vw', overflow: 'hidden',
      background: C.cream,
      position: 'relative',
    }}>
      {/* 🌸 Floating Flowers in Letter Section */}
      <div style={{ position: 'absolute', top: '14%', right: '4%', opacity: 0.22, animation: 'floatY 11s ease-in-out 2.5s infinite', pointerEvents: 'none' }}><WhiteRose size={36} /></div>
      <div style={{ position: 'absolute', bottom: '14%', left: '4%', opacity: 0.20, animation: 'floatY 10s ease-in-out 1.5s infinite', pointerEvents: 'none' }}><WhiteRose size={34} /></div>
      <div className="split-section" style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 'clamp(40px, 6vw, 88px)',
        maxWidth: 1100, margin: '0 auto', alignItems: 'center',
      }}>
        {/* ── Photo side ── */}
        <div data-lt="photo" className="polaroid-card" style={{
          transform: 'rotate(-2deg)',
          padding: '16px 16px 22px 16px',
          background: '#fff',
          boxShadow: '0 12px 32px rgba(45,31,20,0.08)',
        }}>
          <div className="polaroid-washi" style={{ background: 'rgba(212,137,154,0.28)' }} />
          <div className="polaroid-photo" style={{ height: 'clamp(320px, 45vh, 460px)' }}>
            <img src='images/surat.jpeg' alt="Love letter" className="img-cover" />
          </div>
        </div>

        {/* ── Text side ── */}
        <div data-lt="text">
          <SectionLabel text="Dari Hati Terdalam" />
          <SectionTitle>Cuma kata tapi<br />dari hati</SectionTitle>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8, color: C.textM, marginBottom: 28, fontFamily: SANS }}>
            Bacanya sambil rebahan enak nih wkwkwk ...
          </p>

          {/*
            IMPORTANT: Both envelope and letter paper are ALWAYS in the DOM.
            GSAP controls visibility — the letter starts hidden (set in useEffect),
            and GSAP slides it up while fading the envelope out.
          */}
          <div style={{ position: 'relative', perspective: 900 }}>

            {/* ════ ENVELOPE ════ */}
            <div
              ref={envelopeWrapRef}
              onClick={handleOpen}
              style={{
                position: 'relative',
                cursor: phase === 'closed' ? 'pointer' : 'default',
                userSelect: 'none',
                display: phase === 'open' ? 'none' : 'block',
              }}
            >
              {/* Envelope body */}
              <div style={{
                position: 'relative',
                background: 'linear-gradient(160deg, #fdf6ec 0%, #fef0e0 100%)',
                border: `1.5px solid ${C.warm}`,
                borderRadius: '4px 4px 14px 14px',
                boxShadow: '0 14px 40px rgba(45,31,20,0.10), 0 2px 6px rgba(45,31,20,0.06)',
                overflow: 'visible',
              }}>

                {/* Inner V-fold decoration */}
                <svg viewBox="0 0 400 200" style={{
                  position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                  pointerEvents: 'none', zIndex: 1, borderRadius: '4px 4px 14px 14px',
                }} preserveAspectRatio="none">
                  <polygon points="0,0 200,118 0,200" fill={`${C.goldL}28`} stroke={C.warm} strokeWidth="0.8" />
                  <polygon points="400,0 200,118 400,200" fill={`${C.goldL}28`} stroke={C.warm} strokeWidth="0.8" />
                  <polygon points="0,200 200,118 400,200" fill={`${C.blushL}20`} stroke={C.warm} strokeWidth="0.8" />
                </svg>

                {/* Postage stamp */}
                <div style={{
                  position: 'absolute', top: 16, right: 20, zIndex: 10,
                  width: 50, height: 60, border: `2px dashed ${C.gold}`,
                  borderRadius: 4, background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transform: 'rotate(4deg)',
                  boxShadow: '0 2px 6px rgba(45,31,20,0.08)',
                }}>
                  <WhiteRose size={24} />
                </div>

                {/* Address lines (decorative) */}
                <div style={{ position: 'absolute', bottom: 24, left: 24, zIndex: 10 }}>
                  {[28, 64, 52].map((w, i) => (
                    <div key={i} style={{
                      width: w, height: 1.5, borderRadius: 2, marginBottom: 5,
                      background: i === 0 ? C.gold : C.textL,
                      opacity: 0.45 + i * 0.18,
                    }} />
                  ))}
                </div>

                {/* ── FLAP (hinged at top edge, 3D rotateX) ── */}
                <div
                  ref={flapRef}
                  style={{
                    position: 'absolute', top: 0, left: 0, right: 0,
                    transformOrigin: 'top center',
                    transformStyle: 'preserve-3d',
                    zIndex: 20,
                  }}
                >
                  {/* Flap triangle shape */}
                  <svg viewBox="0 0 400 175"
                    style={{ width: '100%', display: 'block', filter: 'drop-shadow(0 3px 8px rgba(45,31,20,0.10))' }}
                    preserveAspectRatio="none"
                  >
                    <polygon points="0,0 400,0 200,145" fill="#fef5e7" stroke={C.warm} strokeWidth="1" />
                    <line x1="0" y1="1" x2="400" y2="1" stroke={C.warm} strokeWidth="1.5" />
                  </svg>

                  {/* Wax seal on flap */}
                  <div style={{
                    position: 'absolute', bottom: 8, left: '50%',
                    transform: 'translateX(-50%)', zIndex: 25,
                  }}>
                    <div style={{
                      width: 66, height: 66, borderRadius: '50%',
                      background: `radial-gradient(circle at 36% 36%, ${C.blush}, ${C.blushD})`,
                      border: '3px solid #fff8f0',
                      boxShadow: `0 6px 22px rgba(168,79,101,0.48), inset 0 1px 3px rgba(255,255,255,0.35)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      animation: phase === 'closed' ? 'pulseGlow 2.5s ease-in-out infinite' : 'none',
                    }}>
                      <Mail size={30} style={{ color: '#fff' }} />
                    </div>
                  </div>
                </div>

                {/* ── Envelope body text ── */}
                <div style={{
                  position: 'relative', zIndex: 2, textAlign: 'center',
                  padding: 'clamp(28px,5vw,48px) clamp(20px,4vw,32px)',
                  paddingTop: 'clamp(90px,16vw,130px)',
                  paddingBottom: 'clamp(44px,6vw,68px)',
                  minHeight: 240,
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                }}>
                  <p style={{
                    visibility: 'hidden', fontSize: 10, fontWeight: 700, letterSpacing: '0.24em',
                    textTransform: 'uppercase', color: C.gold, fontFamily: SANS, marginBottom: 10,
                  }}>✦ Surat Cinta Tersegel ✦</p>

                  <h3 style={{
                    visibility: 'hidden', fontSize: 'clamp(18px, 3vw, 23px)', fontFamily: SERIF,
                    fontStyle: 'italic', fontWeight: 600, color: C.text, marginBottom: 6,
                    lineHeight: 1.3,
                  }}>Teruntuk cantikk Tercinta 🌸</h3>

                  <p style={{ visibility: 'hidden', fontSize: 13, color: C.textL, fontFamily: SANS, marginBottom: 20, lineHeight: 1.6 }}>
                    Sebuah pesan cinta yang ditulis dengan seluruh hati...
                  </p>

                  {/* Animated click hint */}
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                    animation: phase === 'closed' ? 'floatY 2s ease-in-out infinite' : 'none',
                  }}>
                    <Mail size={18} style={{ color: C.blush, opacity: 0.7 }} />
                    <p style={{
                      fontSize: 11, color: C.textL, fontFamily: SANS,
                      letterSpacing: '0.06em',
                    }}>
                      {phase === 'opening' ? '✦ Membuka surat...' : 'Klik untuk membuka segel'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ════ LETTER PAPER (always in DOM, initially hidden via GSAP) ════ */}
            <div
              ref={letterRef}
              style={{
                position: phase === 'open' ? 'relative' : 'absolute',
                top: 0, left: 0, right: 0,
                background: '#fffefb',
                border: `1.5px solid ${C.warm}`,
                borderRadius: 16,
                boxShadow: '0 20px 64px rgba(45,31,20,0.10)',
                overflow: 'hidden',
                pointerEvents: phase === 'open' ? 'auto' : 'none',
              }}
            >
              {/* Notebook ruled lines */}
              <div style={{
                position: 'absolute', inset: 0, pointerEvents: 'none',
                backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${C.blushL}38 32px)`,
                backgroundPositionY: 66,
              }} />
              {/* Left margin red line */}
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 48,
                borderLeft: `1.5px solid rgba(212,137,154,0.22)`,
              }} />

              <div style={{ padding: 'clamp(24px,4vw,44px)', paddingLeft: 'clamp(42px,6vw,70px)', position: 'relative', zIndex: 2 }}>
                {/* Greeting header */}
                <div data-letter-line style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
                  <Flower2 size={18} style={{ color: C.blush }} />
                  <p style={{ fontSize: 16, fontWeight: 600, fontFamily: SERIF, fontStyle: 'italic', color: C.blushD }}>
                    Untuk Kamu :
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15, lineHeight: 1.95, color: C.textM, fontFamily: SANS }}>
                  <p data-letter-line>
                    Halloo cantikkk!<br />
                    Welcome back!
                  </p>

                  <p data-letter-line style={{ color: C.text }}>
                    Untuk yang abis naik merbabuu nihhh<br />
                    Selamat sudah sampai bawah lagi dengan selamat, mas kangen hehe!
                  </p>

                  <p data-letter-line>
                    Mas awali pake bismillah ya wkwkkw<br />
                    Mas harap hari ini dan seterusnya memberimu banyak kebahagiaan dan kesenangan.
                  </p>

                  <p data-letter-line style={{ color: C.text }}>
                    Mmmmm.. makasiiii banyak banyak sudah hadir dan menemani perjalanan takdir ini.
                  </p>

                  <p data-letter-line>
                    Aku yakin kita bisa melewati semuanya bareng-bareng dan mendapati hal yang luar biasa baiknya di depan nanti 🥹
                  </p>

                  <p data-letter-line style={{ color: C.text }}>
                    Sekali lagi selamat ulang tahun cantikkku 🥰🤍<br />
                    Semoga Allah memberimu panjang umur, sehat selalu, dijauhkan dari segala penyakit dan marabahaya, dimudahkan jalanmu, dilancarkan segala urusanmu, dikabulkan segala do&apos;a mu.<br />
                    Aamiin Allahumma Aamiin.
                  </p>

                  <p data-letter-line>
                    Semoga perasaan kamu ke aku gapernah berubah ya, tetap sabar sama aku, tetap kuat di tengah masalah apapun yang akan datang kedepannya.
                  </p>

                  <p data-letter-line style={{ fontWeight: 600, color: C.blushD, fontStyle: 'italic' }}>
                    I will be the man who gives u the love deserve. The man who makes u feel the luckiest girl ✨
                  </p>

                  {/* Signature */}
                  <div data-letter-line style={{
                    marginTop: 16, paddingTop: 16,
                    borderTop: `1px dashed ${C.warm}`,
                    display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
                  }}>
                    <div>
                      <span style={{ fontFamily: SERIF, fontSize: '1.45em', fontStyle: 'italic', color: C.blushD, fontWeight: 600 }}>- 911</span>
                      <p style={{ fontSize: 12, color: C.textL, marginTop: 4 }}>10 Okt 2026</p>
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {[Flower2, Heart, Flower2].map((Ic, i) => (
                        <Ic key={i} size={i === 1 ? 16 : 14}
                          style={{ color: C.blush, animation: `floatY ${2 + i * 0.4}s ease-in-out infinite` }} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MEMORIES — photo cards with overlay text
   ═══════════════════════════════════════════════════════════════════════════ */

function MemoriesSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('[data-m="header"] > *', {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '[data-m="header"]', start: 'top 80%' },
        ease: 'power3.out',
      });
      // Cards — staggered reveal as they enter viewport
      gsap.utils.toArray<HTMLElement>('[data-m="timeline-item"]').forEach((el) => {
        const isLeft = el.classList.contains('timeline-left');
        const card = el.querySelector('[data-m="card"]');
        const dot = el.querySelector('[data-m="dot"]');
        const connector = el.querySelector('[data-m="connector"]');

        gsap.from(card, {
          x: isLeft ? -50 : 50,
          opacity: 0,
          duration: 0.85,
          scrollTrigger: { trigger: el, start: 'top 85%' },
          ease: 'power3.out',
        });

        gsap.from(dot, {
          scale: 0,
          opacity: 0,
          duration: 0.6,
          scrollTrigger: { trigger: el, start: 'top 85%' },
          ease: 'back.out(1.7)',
        });

        if (connector) {
          gsap.from(connector, {
            scaleX: 0,
            opacity: 0,
            transformOrigin: isLeft ? 'right center' : 'left center',
            duration: 0.5,
            scrollTrigger: { trigger: el, start: 'top 85%' },
            ease: 'power2.out',
            delay: 0.2,
          });
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="memories" style={{ padding: '120px 5vw', background: C.bg, position: 'relative', overflow: 'hidden' }}>
      {/* Decorative background gradients */}
      <div style={{ position: 'absolute', top: '10%', left: '-5%', width: '30vw', height: '30vw', borderRadius: '50%', background: `radial-gradient(circle, ${C.blushL}15, transparent 70%)`, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-5%', width: '35vw', height: '35vw', borderRadius: '50%', background: `radial-gradient(circle, ${C.goldL}12, transparent 70%)`, pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1060, margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <div data-m="header" style={{ textAlign: 'center', marginBottom: 72 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 34, height: 1.5, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, fontFamily: SANS }}>Jejak Cerita Cinta</span>
            <div style={{ width: 34, height: 1.5, background: C.gold }} />
          </div>
          <SectionTitle center>Kisah Manis Kita</SectionTitle>
          <p style={{ marginTop: 14, fontSize: 15, color: C.textM, fontFamily: SANS, maxWidth: 460, margin: '14px auto 0', lineHeight: 1.6 }}>
            Setiap detik bersamamu adalah anugerah terindah yang selalu mewarnai hari-hariku dengan cinta dan kebahagiaan.
          </p>
        </div>

        {/* Timeline container */}
        <div className="timeline-container">
          {/* Vertical line */}
          <div className="timeline-line" />

          {MEMORIES.map(({ Icon, label, desc, img }, i) => {
            const isLeft = i % 2 === 0;
            const rotateDeg = i % 3 === 0 ? -2.5 : i % 3 === 1 ? 2 : -1.5;

            return (
              <div
                key={i}
                data-m="timeline-item"
                className={`timeline-item ${isLeft ? 'timeline-left' : 'timeline-right'}`}
              >
                {/* Side with Polaroid Card */}
                <div className="timeline-side">
                  <div
                    data-m="card"
                    className="polaroid-card"
                    style={{ transform: `rotate(${rotateDeg}deg)` }}
                  >
                    {/* Washi Tape */}
                    <div className="polaroid-washi" />

                    {/* Pin Icon indicator */}
                    <div className="polaroid-icon-pin">
                      <Icon size={16} />
                    </div>

                    {/* Polaroid Photo Frame */}
                    <div className="polaroid-photo">
                      <img src={img} alt={label} />
                    </div>

                    {/* Polaroid Caption */}
                    <div className="polaroid-caption">
                      <h3 className="polaroid-title">{label}</h3>
                    </div>
                  </div>
                </div>

                {/* Center dot */}
                <div className="timeline-center">
                  <div data-m="dot" className="timeline-dot" />
                </div>

                {/* Connector line (direct child of timeline-item for percentage-based positioning) */}
                <div data-m="connector" className="timeline-connector" />

                {/* Spacing spacer side */}
                <div className="timeline-side timeline-spacer" style={{ pointerEvents: 'none' }} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   WISHES — icon + text cards
   ═══════════════════════════════════════════════════════════════════════════ */

function WishesSection() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);

  // Mouse drag support
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const checkScroll = useCallback(() => {
    if (!trackRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    const items = trackRef.current.querySelectorAll('.wishes-slide-item');
    if (!items.length) return;
    const trackCenter = scrollLeft + clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    items.forEach((item, idx) => {
      const el = item as HTMLElement;
      const itemCenter = el.offsetLeft + el.offsetWidth / 2;
      const diff = Math.abs(trackCenter - itemCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    setActiveIdx(closestIdx);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll]);

  // Mouse drag handler
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - trackRef.current.offsetLeft;
    scrollLeftStart.current = trackRef.current.scrollLeft;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    e.preventDefault();
    const x = e.pageX - trackRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    trackRef.current.scrollLeft = scrollLeftStart.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll('.wishes-slide-item');
    const targetIdx = direction === 'left' ? Math.max(0, activeIdx - 1) : Math.min(WISHES.length - 1, activeIdx + 1);
    const targetEl = items[targetIdx] as HTMLElement;
    if (targetEl) {
      const left = targetEl.offsetLeft - (trackRef.current.clientWidth - targetEl.offsetWidth) / 2;
      trackRef.current.scrollTo({ left, behavior: 'smooth' });
    }
  };

  const scrollToIndex = (index: number) => {
    if (!trackRef.current) return;
    const items = trackRef.current.querySelectorAll('.wishes-slide-item');
    const targetEl = items[index] as HTMLElement;
    if (targetEl) {
      const left = targetEl.offsetLeft - (trackRef.current.clientWidth - targetEl.offsetWidth) / 2;
      trackRef.current.scrollTo({ left, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-w="header"] > *', {
        y: 40, opacity: 0, stagger: 0.15, duration: 0.8,
        scrollTrigger: { trigger: '[data-w="header"]', start: 'top 80%' },
        ease: 'power3.out',
      });
      gsap.from('[data-w="slider"]', {
        y: 50, opacity: 0, duration: 0.8,
        scrollTrigger: { trigger: '[data-w="slider"]', start: 'top 85%' },
        ease: 'power3.out',
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="wishes" style={{ padding: '120px 5vw', background: C.cream, position: 'relative', overflow: 'hidden' }}>
      {/* Background floating element decorations */}
      <Flower2 size={18} style={{ position: 'absolute', top: '15%', left: '8%', color: C.blush, opacity: 0.18, animation: 'floatY 6s ease-in-out infinite' }} />
      <Star size={14} style={{ position: 'absolute', top: '25%', right: '10%', color: C.gold, opacity: 0.12, animation: 'floatY 8s ease-in-out 1s infinite' }} />
      <Sparkles size={18} style={{ position: 'absolute', bottom: '15%', left: '12%', color: C.blushL, opacity: 0.16, animation: 'floatY 7s ease-in-out 0.5s infinite' }} />
      <Gem size={14} style={{ position: 'absolute', bottom: '20%', right: '15%', color: C.goldL, opacity: 0.12, animation: 'floatY 9s ease-in-out 1.5s infinite' }} />
      {/* 🌸 Floating Flowers in Wishes Section */}
      <div style={{ position: 'absolute', top: '12%', left: '3%', opacity: 0.22, animation: 'floatY 10s ease-in-out 2s infinite', pointerEvents: 'none' }}><WhiteRose size={34} /></div>
      <div style={{ position: 'absolute', top: '18%', right: '4%', opacity: 0.20, animation: 'floatY 12s ease-in-out 3s infinite', pointerEvents: 'none' }}><WhiteRose size={38} /></div>
      <div style={{ position: 'absolute', bottom: '12%', right: '3%', opacity: 0.22, animation: 'floatY 9s ease-in-out 2.5s infinite', pointerEvents: 'none' }}><WhiteRose size={36} /></div>
      <div style={{ position: 'absolute', bottom: '16%', left: '3%', opacity: 0.18, animation: 'floatY 13s ease-in-out 1s infinite', pointerEvents: 'none' }}><WhiteRose size={30} /></div>

      <div style={{ maxWidth: 1160, margin: '0 auto', position: 'relative', zIndex: 5 }}>
        {/* Header */}
        <div data-w="header" style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 34, height: 1.5, background: C.gold }} />
            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.gold, fontFamily: SANS }}>Harapan & Doa</span>
            <div style={{ width: 34, height: 1.5, background: C.gold }} />
          </div>
          <SectionTitle center>Doa & Harapan Cinta</SectionTitle>
          <p style={{ marginTop: 14, fontSize: 15, color: C.textM, fontFamily: SANS, maxWidth: 520, margin: '14px auto 0', lineHeight: 1.6 }}>
            Ini untaian doa dan harapan tulusku untukmu, cantikk:
          </p>
        </div>

        {/* Wishes Slider */}
        <div data-w="slider" className="wishes-slider-container">
          {/* Controls top/bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, padding: '0 8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Sparkles size={15} style={{ color: C.blush }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: C.blushD, fontFamily: SANS }}>
                Doa ke-{activeIdx + 1} dari {WISHES.length}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                type="button"
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className="wishes-nav-btn"
                aria-label="Previous wish"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className="wishes-nav-btn"
                aria-label="Next wish"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Cards Track */}
          <div
            ref={trackRef}
            className="wishes-track"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
          >
            {WISHES.map(({ Icon, title, text }, i) => (
              <div
                key={i}
                data-w="card"
                className="wishes-slide-item"
                onClick={() => scrollToIndex(i)}
              >
                <div className="wish-card" style={{ height: '100%', minHeight: 240, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  {/* Overlay number */}
                  <div className="wish-card-number">
                    {i + 1 < 10 ? `0${i + 1}` : `${i + 1}`}
                  </div>

                  <div>
                    {/* Icon tab */}
                    <div className="wish-icon-container">
                      <Icon size={22} style={{ color: C.blushD, strokeWidth: 1.5 }} />
                    </div>

                    {/* Title & Description */}
                    <h3 style={{ fontSize: 17, fontWeight: 700, color: C.text, fontFamily: SANS, marginBottom: 10 }}>{title}</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.75, color: C.textM, fontFamily: SANS }}>{text}</p>
                  </div>

                  {/* Bottom slide-out line decoration */}
                  <div className="wish-card-line" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PHOTO GALLERY — Premium Bento + Lightbox with Thumbnail Strip
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Gallery data with span information for masonry feel ── */
const GALLERY_ITEMS = [
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.21.jpeg',
    label: 'Beautiful Moments',
    desc: 'Setiap momen indah bersamamu selalu terasa istimewa.',
    Icon: Heart, accent: '#c9a96e', tag: 'Memories', rowSpan: 2,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.21 (1).jpeg',
    label: 'Sweet Smiles',
    desc: 'Senyuman manismu yang selalu menghangatkan hati.',
    Icon: Sparkles, accent: '#d4899a', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.21 (2).jpeg',
    label: 'Pure Joy',
    desc: 'Tawa dan kebahagiaan yang kita bagikan bersama.',
    Icon: Heart, accent: '#e098ae', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.21 (3).jpeg',
    label: 'Cherished Day',
    desc: 'Hari-hari penuh warna dan kenangan berharga.',
    Icon: Star, accent: '#c9a96e', tag: 'Memories', rowSpan: 2,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.22.jpeg',
    label: 'Lovely Time',
    desc: 'Saat-saat sederhana yang berubah menjadi luar biasa bersamamu.',
    Icon: Heart, accent: '#d4899a', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.22 (1).jpeg',
    label: 'Sweet Memory',
    desc: 'Kenangan manis yang akan selalu tersimpan abadi.',
    Icon: Sparkles, accent: '#e098ae', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.22 (2).jpeg',
    label: 'Happy Vibes',
    desc: 'Selalu ada tawa dan kehangatan di setiap langkah kita.',
    Icon: Heart, accent: '#c9a96e', tag: 'Memories', rowSpan: 2,
  },
  {
    src: '/images/gallerys/WhatsApp Video 2026-10-09 at 21.40.25.mp4',
    label: 'Video Moment',
    desc: 'Momen video spesial penuh kebersamaan dan tawa.',
    Icon: Play, accent: '#d4899a', tag: 'Memories', rowSpan: 2,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.40.26.jpeg',
    label: 'Precious Time',
    desc: 'Setiap detik bersamamu adalah anugerah terindah.',
    Icon: Star, accent: '#e098ae', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.44.13.jpeg',
    label: 'Endless Smile',
    desc: 'Senyum yang selalu menjadi alasan hari-hariku lebih cerah.',
    Icon: Heart, accent: '#c9a96e', tag: 'Memories', rowSpan: 1,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.44.114.jpeg',
    label: 'Special Day',
    desc: 'Momen spesial di hari yang begitu istimewa.',
    Icon: Sparkles, accent: '#d4899a', tag: 'Memories', rowSpan: 2,
  },
  {
    src: '/images/gallerys/WhatsApp Image 2026-10-09 at 21.44.123.jpeg',
    label: 'Together Always',
    desc: 'Bersama mengukir kisah manis yang tak akan pernah terlupakan.',
    Icon: Heart, accent: '#e098ae', tag: 'Memories', rowSpan: 1,
  },
];

const GALLERY_TAGS = [
  'Memories'
];

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Memories': 'Setiap senyumanmu adalah bahagiaku, dan setiap momen bersamamu adalah anugerah terindah.',
};

/* ── Thumbnail (memoized) ── */
const LightboxThumb = React.memo(function LightboxThumb({
  src, label, isActive, onClick, isVideo,
}: { src: string; label: string; isActive: boolean; onClick: () => void; isVideo: boolean }) {
  return (
    <div onClick={onClick} className="lb-thumb" style={{ cursor: 'pointer', flexShrink: 0 }}>
      {isVideo ? (
        <div style={{
          width: 38, height: 28, borderRadius: 6, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          background: '#f3ede4',
          border: isActive ? '2px solid #d4899a' : '2px solid transparent',
          opacity: isActive ? 1 : 0.4,
          transition: 'all 0.25s ease',
          boxShadow: isActive ? '0 2px 8px rgba(212,137,154,0.3)' : 'none',
        }}>
          <Play size={10} style={{ color: '#d4899a' }} />
        </div>
      ) : (
        <img src={src} alt={label} loading="lazy" decoding="async" style={{
          width: 38, height: 28, objectFit: 'cover', borderRadius: 6, display: 'block',
          border: isActive ? '2px solid #d4899a' : '2px solid transparent',
          opacity: isActive ? 1 : 0.4,
          transition: 'all 0.25s ease',
          boxShadow: isActive ? '0 2px 8px rgba(212,137,154,0.3)' : 'none',
        }} />
      )}
    </div>
  );
});

/* ── Pill Dot (memoized) ── */
const PillDot = React.memo(function PillDot({ isActive, onClick }: { isActive: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} style={{
      height: 6, borderRadius: 3, border: 'none', outline: 'none', padding: 0, cursor: 'pointer',
      width: isActive ? 22 : 6,
      background: isActive ? 'linear-gradient(90deg, #d4899a, #c9a96e)' : '#e8dfd3',
      boxShadow: isActive ? '0 0 10px rgba(212, 137, 154, 0.4)' : 'none',
      transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    }} />
  );
});

/* ── Lightbox ── */
function GalleryLightbox({ images, current, onClose, onNav, onMediaPlayStateChange }: {
  images: typeof GALLERY_ITEMS; current: number;
  onClose: () => void; onNav: (dir: number) => void;
  onMediaPlayStateChange?: (playing: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const item = images[current];

  const onCloseRef = useRef(onClose);
  const onNavRef = useRef(onNav);
  onCloseRef.current = onClose;
  onNavRef.current = onNav;

  // Pastikan volume kembali normal saat modal ditutup
  useEffect(() => {
    return () => {
      onMediaPlayStateChange?.(false);
    };
  }, [onMediaPlayStateChange]);

  // Saat berpindah item (jika bukan mp4 atau berganti video), update status
  useEffect(() => {
    if (!item.src.endsWith('.mp4')) {
      onMediaPlayStateChange?.(false);
    }
  }, [item.src, onMediaPlayStateChange]);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onCloseRef.current();
      if (e.key === 'ArrowRight') onNavRef.current(1);
      if (e.key === 'ArrowLeft') onNavRef.current(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  /* ── Touch swipe support for mobile ── */
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    let startX = 0;
    let startY = 0;
    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
        if (dx < 0) onNavRef.current(1);
        else onNavRef.current(-1);
      }
    };
    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  const goTo = (index: number) => {
    onNav(index - current);
  };

  return (
    <div
      onClick={onClose}
      className="clean-lightbox-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'rgba(24, 14, 12, 0.8)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        cursor: 'zoom-out',
      }}
    >
      {/* Main card */}
      <div
        ref={cardRef}
        onClick={e => e.stopPropagation()}
        className="clean-lightbox-card"
        style={{
          background: '#ffffff',
          borderRadius: 28,
          maxWidth: 520,
          width: '100%',
          maxHeight: '90vh',
          boxShadow: '0 24px 70px rgba(45, 31, 20, 0.3), 0 4px 20px rgba(212, 137, 154, 0.2)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'default',
          border: '1px solid rgba(245, 213, 213, 0.8)',
          position: 'relative',
        }}
      >
        {/* Top bar with count, title snippet and close */}
        <div className="clean-lightbox-topbar">
          <div className="clean-lightbox-badge">
            <Flower2 size={14} style={{ color: "#d4899a" }} />
            <span>Foto {current + 1} dari {images.length}</span>
          </div>

          <button
            onClick={onClose}
            className="clean-lightbox-close"
            aria-label="Tutup"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Frame */}
        <div className="clean-lightbox-media-wrap">
          {item.src.endsWith('.mp4') ? (
            <video
              key={item.src}
              src={item.src}
              controls
              autoPlay
              playsInline
              onPlay={() => onMediaPlayStateChange?.(true)}
              onPause={() => onMediaPlayStateChange?.(false)}
              onEnded={() => onMediaPlayStateChange?.(false)}
              className="clean-lightbox-media"
            />
          ) : (
            <img
              key={item.src}
              src={item.src}
              alt={item.label}
              className="clean-lightbox-media"
            />
          )}

          {/* Navigation overlay buttons */}
          <button
            type="button"
            onClick={() => onNav(-1)}
            className="clean-nav-btn prev"
            aria-label="Sebelumnya"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            type="button"
            onClick={() => onNav(1)}
            className="clean-nav-btn next"
            aria-label="Selanjutnya"
          >
            <ChevronRight size={22} />
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Gallery Section ── */
function GallerySection({ onMediaPlayStateChange }: { onMediaPlayStateChange?: (playing: boolean) => void }) {
  const ref = useRef<HTMLElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeTag, setActiveTag] = useState('Memories');

  const filtered = GALLERY_ITEMS.filter(g => g.tag === activeTag);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      // Header entrance
      gsap.from('[data-g="header"] > *', {
        y: 50, opacity: 0, stagger: 0.12, duration: 0.9,
        scrollTrigger: { trigger: '[data-g="header"]', start: 'top 82%' },
        ease: 'power3.out',
      });

      // Decorative elements
      gsap.from('[data-g="deco"]', {
        scale: 0, rotate: -180, opacity: 0, duration: 1.2,
        scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        ease: 'elastic.out(1, 0.5)',
        stagger: 0.2,
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // Animate cards whenever filtered list changes
  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>('[data-g="card"]');
    gsap.fromTo(cards,
      { y: 40, opacity: 0, scale: 0.94 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
    );

    cards.forEach((el, i) => {
      const img = el.querySelector('img');
      const ov = el.querySelector('[data-ov]');
      const cap = el.querySelector('[data-cap]');
      const cup = el.querySelector('[data-cup]');

      const enter = () => {
        gsap.to(el, { y: -8, scale: 1.02, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        if (img) gsap.to(img, { scale: 1.12, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        if (ov) gsap.to(ov, { opacity: 1, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
        if (cap) gsap.to(cap, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        if (cup) gsap.to(cup, { opacity: 0, overwrite: 'auto' });
      };
      const leave = () => {
        gsap.to(el, { y: 0, scale: 1, duration: 0.4, ease: 'power2.inOut', overwrite: 'auto' });
        if (img) gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.inOut', overwrite: 'auto' });
        if (ov) gsap.to(ov, { opacity: 0, duration: 0.35, ease: 'power2.inOut', overwrite: 'auto' });
        if (cap) gsap.to(cap, { y: 16, opacity: 0, duration: 0.3, ease: 'power2.in', overwrite: 'auto' });
        if (cup) gsap.to(cup, { y: 0, opacity: 1, overwrite: 'auto' });
      };

      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });
  }, [filtered]);

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightbox]);

  const navLightbox = useCallback((dir: number) => {
    setLightbox(prev => {
      if (prev === null) return null;
      return (prev + dir + filtered.length) % filtered.length;
    });
  }, [filtered]);

  return (
    <>
      <section ref={ref} id="gallery" style={{
        padding: '120px 5vw 140px',
        background: `linear-gradient(160deg, ${C.cream} 0%, ${C.bg} 50%, ${C.bg2} 100%)`,
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Ambient blobs */}
        <div style={{ position: 'absolute', top: '-5%', right: '-8%', width: '45vw', height: '45vw', borderRadius: '50%', background: `radial-gradient(circle at 40% 40%, ${C.blushL}28, transparent 68%)`, pointerEvents: 'none', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '-8%', left: '-6%', width: '38vw', height: '38vw', borderRadius: '50%', background: `radial-gradient(circle at 60% 60%, ${C.goldL}22, transparent 68%)`, pointerEvents: 'none', filter: 'blur(40px)' }} />

        {/* Floating decorative icons */}
        <Camera data-g="deco" size={24} style={{ position: 'absolute', top: '10%', right: '7%', color: C.blush, opacity: 0.18, animation: 'floatY 7s ease-in-out infinite' }} />
        <Flower2 data-g="deco" size={20} style={{ position: 'absolute', top: '22%', left: '4%', color: C.gold, opacity: 0.18, animation: 'floatY 6s ease-in-out 1s infinite' }} />
        <Star data-g="deco" size={16} style={{ position: 'absolute', bottom: '18%', right: '10%', color: C.blushD, opacity: 0.14, animation: 'floatY 8s ease-in-out 0.5s infinite' }} />
        <Sparkles data-g="deco" size={20} style={{ position: 'absolute', bottom: '12%', left: '9%', color: C.sage, opacity: 0.12, animation: 'floatY 9s ease-in-out 2s infinite' }} />

        <div style={{ maxWidth: 1140, margin: '0 auto', position: 'relative', zIndex: 5 }}>

          {/* ── Header ── */}
          <div data-g="header" style={{ textAlign: 'center', marginBottom: 52 }}>

            {/* Pill label */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{ height: 1, width: 46, background: `linear-gradient(to right, transparent, ${C.gold}80)` }} />
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 22px', borderRadius: 50,
                background: `linear-gradient(135deg, ${C.blushL}60, ${C.goldL}35)`,
                border: `1px solid ${C.blushL}90`,
                boxShadow: `0 4px 18px ${C.blushL}50`,
              }}>
                <Camera size={13} style={{ color: C.blushD }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.blushD, fontFamily: SANS }}>Galeri Foto</span>
              </div>
              <div style={{ height: 1, width: 46, background: `linear-gradient(to left, transparent, ${C.gold}80)` }} />
            </div>

            {/* Main title */}
            <h2 style={{
              fontSize: 'clamp(2.4rem, 5.5vw, 4rem)',
              fontWeight: 600, fontFamily: SERIF, fontStyle: 'italic',
              lineHeight: 1.1, color: C.text, marginBottom: 16,
            }}>
              Momen <span style={{
                color: C.blush,
                background: `linear-gradient(135deg, ${C.blush}, ${C.blushD})`,
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              }}>Indah</span> Kita
            </h2>

            <p style={{ fontSize: 15, color: C.textM, fontFamily: SANS, maxWidth: 460, margin: '0 auto 28px', lineHeight: 1.75 }}>
              {CATEGORY_DESCRIPTIONS[activeTag] || 'Setiap foto menyimpan cerita, setiap momen adalah hadiah yang tak ternilai.'}
            </p>

            {/* ── Filter Pills ── */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, flexWrap: 'wrap' }}>
              {GALLERY_TAGS.map(tag => {
                const active = tag === activeTag;
                return (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    style={{
                      padding: '8px 20px', borderRadius: 50, cursor: 'pointer',
                      fontFamily: SANS, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em',
                      border: active ? 'none' : `1.5px solid ${C.warm}`,
                      background: active
                        ? `linear-gradient(135deg, ${C.blush}, ${C.blushD})`
                        : 'rgba(255,255,255,0.65)',
                      color: active ? '#fff' : C.textM,
                      boxShadow: active ? `0 6px 20px rgba(168,79,101,0.28)` : '0 2px 8px rgba(45,31,20,0.05)',
                      transform: active ? 'translateY(-2px)' : 'none',
                      transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Masonry Grid ── */}
          <div className="gallery-masonry" style={{
            columns: 'var(--gallery-cols, 4)',
            columnGap: 18,
          }}>
            {filtered.map((item, i) => {
              const { src, label, desc, Icon, accent, tag, rowSpan } = item;
              const globalIdx = GALLERY_ITEMS.indexOf(item);

              return (
                <div
                  key={`${tag}-${i}`}
                  data-g="card"
                  onClick={() => setLightbox(i)}
                  style={{
                    breakInside: 'avoid',
                    marginBottom: 18,
                    position: 'relative',
                    borderRadius: 20,
                    overflow: 'hidden',
                    cursor: 'pointer',
                    boxShadow: '0 6px 28px rgba(45,31,20,0.08)',
                    display: 'block',
                    /* Vary aspect ratio for masonry feel */
                    aspectRatio: rowSpan === 2 ? '3/4' : (i % 3 === 0 ? '4/5' : '3/4'),
                  }}
                >
                  {/* Photo */}
                  {/* Photo or Video */}
                  {src.endsWith('.mp4') ? (
                    <video
                      src={src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <img
                      src={src} alt={label}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'none' }}
                    />
                  )}

                  {/* Vignette gradient (always on) */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(180deg, transparent 45%, rgba(20,10,5,0.75) 100%)`,
                    pointerEvents: 'none',
                  }} />

                  {/* Hover overlay */}
                  <div data-ov style={{
                    position: 'absolute', inset: 0,
                    background: `linear-gradient(160deg, ${accent}22 0%, transparent 40%, rgba(15,8,4,0.38) 100%)`,
                    opacity: 0, pointerEvents: 'none',
                  }} />

                  {/* Tag pill top-left */}
                  <div style={{
                    position: 'absolute', top: 14, left: 14,
                    display: 'inline-flex', alignItems: 'center', gap: 5,
                    padding: '5px 12px', borderRadius: 50,
                    background: 'rgba(255,255,255,0.18)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.28)',
                  }}>
                    <Icon size={10} style={{ color: '#fff' }} />
                    <span style={{ fontSize: 9, fontWeight: 700, color: '#fff', fontFamily: SANS, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{tag}</span>
                  </div>

                  {/* Index number top-right */}
                  <div style={{
                    position: 'absolute', top: 14, right: 14,
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', fontFamily: SANS }}>{String(i + 1).padStart(2, '0')}</span>
                  </div>

                  {/* Bottom caption (slides up on hover) */}
                  <div data-cap style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    padding: '24px 18px 18px',
                    opacity: 0, transform: 'translateY(16px)',
                    background: 'linear-gradient(0deg, rgba(15,8,4,0.6) 0%, transparent 100%)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
                      {/* View button */}
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
                        background: `linear-gradient(135deg, ${accent}CC, ${accent})`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: `0 4px 14px ${accent}60`,
                      }}>
                        <Camera size={13} style={{ color: '#fff' }} />
                      </div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox !== null && (
        <GalleryLightbox
          images={filtered}
          current={lightbox}
          onClose={() => setLightbox(null)}
          onNav={navLightbox}
          onMediaPlayStateChange={onMediaPlayStateChange}
        />
      )}
    </>
  );
}


/* ═══════════════════════════════════════════════════════════════════════════
   QUOTE
   ═══════════════════════════════════════════════════════════════════════════ */

function QuoteSection() {
  const [cur, setCur] = useState(0);
  const textRef = useRef<HTMLParagraphElement>(null);

  const changeTo = useCallback((idx: number) => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        opacity: 0, y: -8, duration: 0.25,
        onComplete: () => {
          setCur(idx);
          if (textRef.current) gsap.fromTo(textRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
        },
      });
    } else setCur(idx);
  }, []);

  useEffect(() => {
    const t = setInterval(() => changeTo((cur + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, [cur, changeTo]);

  return (
    <section style={{
      padding: '100px 5vw',
      background: `linear-gradient(135deg, ${C.blushL}50, ${C.cream}, ${C.goldL}30)`,
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: '-20%', right: '-15%', width: '50vw', height: '50vw', borderRadius: '50%', background: `${C.blushL}40`, filter: 'blur(80px)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 5 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 14, marginBottom: 20 }}>
          <Quote size={30} style={{ color: C.blush, opacity: 0.6 }} />
        </div>

        <p ref={textRef} style={{
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontFamily: SERIF, fontStyle: 'italic',
          fontWeight: 400, lineHeight: 1.6,
          color: C.text,
        }}>{QUOTES[cur]}</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {QUOTES.map((_, i) => (
            <button key={i} onClick={() => changeTo(i)} style={{
              width: i === cur ? 28 : 8, height: 8, borderRadius: 4,
              border: 'none', cursor: 'pointer', padding: 0,
              background: i === cur ? `linear-gradient(135deg, ${C.blush}, ${C.gold})` : C.warm,
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FINAL — with big background photo
   ═══════════════════════════════════════════════════════════════════════════ */

/* ── Voice Note Player Component ── */
function VoiceNotePlayer({
  onCelebrate,
  onPlayStateChange,
}: {
  onCelebrate?: () => void;
  onPlayStateChange?: (playing: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      onPlayStateChange?.(false);
    } else {
      audio.volume = 1.0;
      audio.play().then(() => {
        setIsPlaying(true);
        onPlayStateChange?.(true);
        onCelebrate?.();
      }).catch((err) => {
        console.error('Audio play error:', err);
      });
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration || 0);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    onPlayStateChange?.(false);
    onCelebrate?.();
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds) || seconds === 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  // 24 custom wave bars
  const waveHeights = [24, 40, 65, 30, 80, 50, 95, 45, 70, 85, 35, 90, 60, 75, 40, 85, 50, 95, 30, 65, 45, 80, 35, 60];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
        padding: '16px 20px',
        borderRadius: 28,
        background: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(25px)',
        WebkitBackdropFilter: 'blur(25px)',
        border: '1px solid rgba(255, 255, 255, 0.35)',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.15) inset',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Hidden native audio element */}
      <audio
        ref={audioRef}
        src="/images/ucapan.mp4"
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onEnded={handleEnded}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />
      {/* Header bar: Icon, title & time */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mic size={14} color="#fff" />
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#fff', fontFamily: SANS, letterSpacing: '0.04em' }}>
            Pesan Suara Untukmu
          </span>
        </div>
        <span style={{ fontSize: 12, fontWeight: 600, color: 'rgba(255, 255, 255, 0.85)', fontVariantNumeric: 'tabular-nums', fontFamily: SANS }}>
          {formatTime(currentTime)} / {formatTime(duration)}
        </span>
      </div>

      {/* Main player controls & waveform */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: 52,
            height: 52,
            minWidth: 52,
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #ffffff 0%, #ffe4ec 100%)',
            color: C.blushD,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: isPlaying
              ? '0 0 24px rgba(255, 255, 255, 0.8), 0 8px 20px rgba(212, 137, 154, 0.4)'
              : '0 8px 20px rgba(0, 0, 0, 0.15)',
            transform: isPlaying ? 'scale(1.05)' : 'scale(1)',
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {isPlaying ? <Pause size={22} fill={C.blushD} /> : <Play size={22} fill={C.blushD} style={{ marginLeft: 3 }} />}
        </button>

        {/* Animated Waveform track */}
        <div
          onClick={(e) => {
            if (!audioRef.current || duration === 0) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const pos = (e.clientX - rect.left) / rect.width;
            audioRef.current.currentTime = pos * duration;
          }}
          style={{
            flex: 1,
            height: 38,
            display: 'flex',
            alignItems: 'center',
            gap: 3.5,
            cursor: 'pointer',
            padding: '0 4px',
          }}
        >
          {waveHeights.map((h, i) => {
            const barProgress = (i / waveHeights.length) * 100;
            const isPlayed = barProgress <= progress;
            return (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  borderRadius: 4,
                  background: isPlayed
                    ? 'linear-gradient(to top, #ffffff, #ffe0ea)'
                    : 'rgba(255, 255, 255, 0.3)',
                  boxShadow: isPlayed && isPlaying ? '0 0 8px rgba(255, 255, 255, 0.8)' : 'none',
                  animation: isPlaying ? `heartbeat ${1.2 + (i % 5) * 0.2}s ease-in-out infinite` : 'none',
                  transition: 'height 0.2s ease, background 0.2s ease',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function FinalSection({
  onCelebrate,
  onVoiceStateChange,
}: {
  onCelebrate: () => void;
  onVoiceStateChange?: (playing: boolean) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from('[data-f="heart"]', { scale: 0.3, opacity: 0, duration: 1.2, ease: 'elastic.out(1,0.4)', scrollTrigger: { trigger: ref.current, start: 'top 60%' } });
      gsap.from('[data-f="title"]', { y: 40, opacity: 0, duration: 0.8, scrollTrigger: { trigger: ref.current, start: 'top 55%' }, delay: 0.3 });
      gsap.from('[data-f="text"]', { y: 30, opacity: 0, duration: 0.7, stagger: 0.15, scrollTrigger: { trigger: ref.current, start: 'top 50%' }, delay: 0.6 });
      gsap.from('[data-f="cta"]', { y: 20, opacity: 0, duration: 0.6, scrollTrigger: { trigger: ref.current, start: 'top 45%' }, delay: 0.9 });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} style={{
      position: 'relative',
      padding: '0', minHeight: '80vh',
      overflow: 'hidden',
    }}>
      {/* Background image */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="images/footer.jpeg"
          alt="Footer background"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(45,31,20,0.6) 0%, rgba(45,31,20,0.75) 50%, rgba(45,31,20,0.85) 100%)',
        }} />
      </div>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 5,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        minHeight: '80vh', padding: '80px 24px', textAlign: 'center',
      }}>

        <div data-f="title">
          <h2 style={{
            fontSize: 'clamp(2.4rem, 7vw, 4.5rem)',
            fontWeight: 600, fontFamily: SERIF, fontStyle: 'italic',
            lineHeight: 1.15, color: '#fff', marginBottom: 20,
          }}>
            Selamat Ulang Tahun,<br />{NAME}
          </h2>
        </div>

        <div style={{ width: 60, height: 1.5, background: 'rgba(255,255,255,0.3)', margin: '0 auto 24px' }} data-f="text" />

        <p data-f="text" style={{ fontSize: 17, lineHeight: 1.85, color: 'rgba(255,255,255,0.92)', maxWidth: 540, margin: '0 auto 12px', fontFamily: SANS }}>
          "Terima kasih telah hadir dalam hidupku, membawa kehangatan, dan menjadi alasan terbesar di balik setiap senyumanku."
        </p>

        <div data-f="text" style={{ display: 'flex', justifyContent: 'center', gap: 14, marginBottom: 32 }}>
          {[Flower2, Heart, Gem, Heart, Flower2].map((Ic, i) => (
            <Ic key={i} size={i === 2 ? 22 : 18} style={{
              color: 'rgba(255,255,255,0.85)',
              animation: `floatY ${2 + i * 0.2}s ease-in-out ${i * 0.1}s infinite`,
            }} />
          ))}
        </div>

        <p style={{ marginTop: 36, fontSize: 12, color: 'rgba(255,255,255,0.85)', fontWeight: 600, fontFamily: SANS, letterSpacing: '0.06em' }}>
          Dipersembahkan dengan segenap cinta & ketulusan hati <Heart size={13} style={{ color: '#ff8fa3', fill: '#ff8fa3', display: 'inline', verticalAlign: 'middle' }} />
        </p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   PIN LOCK SCREEN — Secret Birthday Gate with Flower Blooming Scene
   ═══════════════════════════════════════════════════════════════════════════ */

const SECRET_PIN = '2000';

function PinLockScreen({ onUnlock, onBlooming }: { onUnlock: () => void; onBlooming: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [pinHidden, setPinHidden] = useState(false);
  const lockRef = useRef<HTMLDivElement>(null);

  const handleKey = (digit: string) => {
    if (pin.length < SECRET_PIN.length && !success) {
      const newPin = pin + digit;
      setPin(newPin);
      if (newPin.length === SECRET_PIN.length) {
        verifyPin(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (!success) {
      setPin(prev => prev.slice(0, -1));
      setError(false);
    }
  };

  const verifyPin = (inputPin: string) => {
    if (inputPin === SECRET_PIN) {
      setSuccess(true);
      setError(false);

      // Attempt Fullscreen
      try {
        if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen().catch(() => { });
        } else if ((document.documentElement as any).webkitRequestFullscreen) {
          (document.documentElement as any).webkitRequestFullscreen();
        }
      } catch (e) { }

      // Hide PIN card and trigger bloom overlay at parent level
      setTimeout(() => {
        setPinHidden(true);
        onBlooming();
      }, 250);

      // Transition to full website with smooth crossfade while petals fade out
      setTimeout(() => {
        onUnlock();
      }, 3400);
    } else {
      setError(true);
      if (lockRef.current) {
        gsap.fromTo(lockRef.current,
          { x: -12 },
          {
            x: 12, duration: 0.08, repeat: 4, yoyo: true, ease: 'power1.inOut', onComplete: () => {
              gsap.set(lockRef.current, { x: 0 });
              setTimeout(() => {
                setPin('');
                setError(false);
              }, 500);
            }
          }
        );
      }
    }
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleKey(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 999999,
      background: `linear-gradient(135deg, ${C.bg} 0%, ${C.bg2} 50%, #faede8 100%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      overflow: 'hidden',
    }}>
      {/* Decorative ambient background */}
      <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '50vw', height: '50vw', borderRadius: '50%', background: `radial-gradient(circle, ${C.blushL}40, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-10%', left: '-10%', width: '45vw', height: '45vw', borderRadius: '50%', background: `radial-gradient(circle, ${C.goldL}35, transparent 70%)`, filter: 'blur(50px)', pointerEvents: 'none' }} />

      <div
        ref={lockRef}
        style={{
          width: '100%',
          maxWidth: 380,
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '36px 28px 32px',
          boxShadow: '0 20px 60px rgba(45, 31, 20, 0.12), 0 0 0 1px rgba(245, 213, 213, 0.6)',
          textAlign: 'center',
          position: 'relative',
          opacity: pinHidden ? 0 : 1,
          transform: pinHidden ? 'scale(0.9) translateY(20px)' : 'none',
          transition: 'all 0.5s ease',
        }}
      >
        {/* Cute Lock Icon Header */}
        <div style={{
          width: 64,
          height: 64,
          borderRadius: 22,
          margin: '0 auto 20px',
          background: success
            ? `linear-gradient(135deg, #a8d5ba, #81c784)`
            : (error ? `linear-gradient(135deg, #f8bbd0, #e57373)` : `linear-gradient(135deg, ${C.blushL}, ${C.blush})`),
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(212, 137, 154, 0.25)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          {success ? (
            <Check size={28} style={{ color: '#fff' }} />
          ) : (
            <Lock size={26} style={{ color: '#fff' }} />
          )}
        </div>

        <h2 style={{
          fontFamily: SERIF,
          fontSize: '1.6rem',
          fontWeight: 600,
          fontStyle: 'italic',
          color: C.text,
          marginBottom: 6,
        }}>
          {success ? 'Akses Diterima ❤️' : 'Special Birthday Surprise'}
        </h2>

        <p style={{
          fontSize: 13,
          color: error ? '#d32f2f' : C.textM,
          fontFamily: SANS,
          marginBottom: 26,
          transition: 'color 0.2s ease',
        }}>
          {success
            ? 'Membuka kejutan cinta spesial untukmu...'
            : (error ? 'PIN salah! Coba lagi ya cantikk' : `Masukkan ${SECRET_PIN.length} digit PIN untuk membuka surat cintamu`)}
        </p>

        {/* PIN Digit Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 14,
          marginBottom: 32,
        }}>
          {Array.from({ length: SECRET_PIN.length }).map((_, idx) => {
            const filled = pin.length > idx;
            return (
              <div
                key={idx}
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  border: `2px solid ${error ? '#e57373' : (filled ? C.blushD : C.warm)}`,
                  background: filled ? (error ? '#e57373' : C.blush) : 'transparent',
                  transform: filled ? 'scale(1.2)' : 'scale(1)',
                  boxShadow: filled ? `0 0 12px ${C.blush}60` : 'none',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              />
            );
          })}
        </div>

        {/* Keypad Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 12,
          maxWidth: 270,
          margin: '0 auto',
        }}>
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(num => (
            <button
              key={num}
              type="button"
              onClick={() => handleKey(num)}
              style={{
                height: 56,
                borderRadius: 18,
                border: `1.5px solid ${C.warm}`,
                background: '#fff',
                color: C.text,
                fontSize: 20,
                fontWeight: 700,
                fontFamily: SANS,
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(45, 31, 20, 0.04)',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)'; }}
              onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            >
              {num}
            </button>
          ))}

          {/* Empty spacer */}
          <div />

          {/* Key 0 */}
          <button
            type="button"
            onClick={() => handleKey('0')}
            style={{
              height: 56,
              borderRadius: 18,
              border: `1.5px solid ${C.warm}`,
              background: '#fff',
              color: C.text,
              fontSize: 20,
              fontWeight: 700,
              fontFamily: SANS,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(45, 31, 20, 0.04)',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
          >
            0
          </button>

          {/* Backspace Key */}
          <button
            type="button"
            onClick={handleDelete}
            style={{
              height: 56,
              borderRadius: 18,
              border: 'none',
              background: 'rgba(212, 137, 154, 0.1)',
              color: C.blushD,
              fontSize: 14,
              fontWeight: 700,
              fontFamily: SANS,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseDown={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(0.92)'; }}
            onMouseUp={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
            aria-label="Delete digit"
          >
            ⌫
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   LILY BLOOM OVERLAY — Full-screen celebration after PIN unlock
   ═══════════════════════════════════════════════════════════════════════════ */

function LilyBloomOverlay() {
  // Lightweight, smooth 24 golden-ratio Lily flowers for instant 60fps rendering
  const blossoms = useMemo(() => {
    const count = 24;
    return Array.from({ length: count }, (_, i) => {
      const goldenAngle = 137.507764;
      const angle = i * goldenAngle;
      const rad = (angle * Math.PI) / 180;

      const norm = Math.pow(i / count, 0.7);
      const dist = 6 + norm * 50;

      const tx = Math.round(Math.cos(rad) * dist * 1.15 * 10) / 10;
      const ty = Math.round(Math.sin(rad) * dist * 10) / 10;

      const delay = Math.round((Math.pow(i / (count - 1), 1.1) * 1.2) * 100) / 100;
      const fallDrift = Math.round(((i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 12)));
      const fallRotate = (i % 2 === 0 ? 1 : -1) * (140 + (i % 4) * 40);

      const size = Math.round(75 + (i % 4) * 16);
      const rot = Math.round((i * 47) % 360);

      return { tx, ty, delay, size, rot, fallDrift, fallRotate, id: i, zIndex: i + 10 };
    });
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      <style>{`
        /* 1. Mother flower at center */
        @keyframes motherLilySequence {
          0% {
            opacity: 0;
            transform: translate3d(-50%, -50%, 0) scale(0.2) rotate(-25deg);
          }
          18% {
            opacity: 1;
            transform: translate3d(-50%, -50%, 0) scale(1.06) rotate(4deg);
          }
          32% {
            transform: translate(-50%, -50%) scale(1) rotate(0deg);
          }
          62% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1) rotate(10deg);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, calc(-50% + 120vh)) scale(0.9) rotate(220deg);
          }
        }

        /* 2. Ultra-smooth radial bloom & outward flow -> 3. Gentle gravity fall down */
        @keyframes smoothBloomAndFall {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.15) rotate(0deg);
          }
          12% {
            opacity: 1;
          }
          48% {
            opacity: 1;
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(180deg);
          }
          65% {
            opacity: 1;
            transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(185deg);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--dx) + var(--fdrift)), calc(-50% + var(--dy) + 130vh)) scale(0.88) rotate(calc(185deg + var(--frot)));
          }
        }

        /* Background soft glow fade */
        @keyframes bgBloomTransition {
          0% { opacity: 0; }
          12% { opacity: 1; }
          60% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>

      {/* Ambient bloom background crossfades out as flowers fall */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(255, 240, 245, 0.98) 0%, rgba(253, 226, 236, 0.96) 50%, rgba(248, 205, 222, 0.98) 100%)',
          animation: 'bgBloomTransition 4.5s ease-out forwards',
        }}
      />

      {/* Central Mother Rose Flower */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 140,
          height: 140,
          zIndex: 8,
          animation: 'motherLilySequence 4.5s cubic-bezier(0.2, 0.9, 0.3, 1) forwards',
          willChange: 'transform, opacity',
        }}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <WhiteRose size={140} />
        </div>
      </div>

      {/* 24 optimized White Rose flowers */}
      {blossoms.map((b) => (
        <div
          key={b.id}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: b.size,
            height: b.size,
            zIndex: b.zIndex,
            animation: `smoothBloomAndFall 4.5s cubic-bezier(0.2, 0.85, 0.3, 1) ${b.delay}s both`,
            willChange: 'transform, opacity',
            '--dx': `${b.tx}vw`,
            '--dy': `${b.ty}vh`,
            '--fdrift': `${b.fallDrift}px`,
            '--frot': `${b.fallRotate}deg`,
          } as React.CSSProperties}
        >
          <div style={{ width: '100%', height: '100%', transform: `rotate(${b.rot}deg)` }}>
            <WhiteRose size={b.size} />
          </div>
        </div>
      ))}
    </div>
  );
}




/* ═══════════════════════════════════════════════════════════════════════════
   ROOT PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function BirthdayPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [blooming, setBlooming] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [musicMuted, setMusicMuted] = useState(false);

  const ytPlayerRef = useRef<any>(null);
  const shouldPlayRef = useRef(false);

  // Initialize YouTube IFrame Player
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const createPlayer = () => {
      if (!window.YT || !window.YT.Player || ytPlayerRef.current) return;
      try {
        ytPlayerRef.current = new window.YT.Player('youtube-audio-player', {
          height: '1',
          width: '1',
          videoId: YOUTUBE_MUSIC_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            loop: 1,
            playlist: YOUTUBE_MUSIC_ID,
            playsinline: 1,
            rel: 0,
            enablejsapi: 1,
          },
          events: {
            onReady: (event: any) => {
              try {
                event.target.setVolume(55);
                if (shouldPlayRef.current) {
                  event.target.playVideo();
                }
              } catch { }
            },
            onStateChange: (event: any) => {
              if (event.data === (window.YT.PlayerState?.ENDED ?? 0)) {
                try {
                  event.target.playVideo();
                } catch { }
              }
            },
          },
        });
      } catch (err) {
        console.warn('YouTube Player initialization error:', err);
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        createPlayer();
      };
    }
  }, []);

  // Play background music on unlock
  const startBacksound = () => {
    shouldPlayRef.current = true;
    setMusicMuted(false);
    if (ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        ytPlayerRef.current.playVideo();
      } catch (err) {
        console.log('Autoplay policy caught, will play on user interaction:', err);
      }
    }
  };

  const toggleMusic = () => {
    if (!ytPlayerRef.current || typeof ytPlayerRef.current.getPlayerState !== 'function') {
      setMusicMuted((prev) => !prev);
      shouldPlayRef.current = !shouldPlayRef.current;
      return;
    }
    try {
      const state = ytPlayerRef.current.getPlayerState();
      if (state === 1) { // playing
        ytPlayerRef.current.pauseVideo();
        setMusicMuted(true);
        shouldPlayRef.current = false;
      } else {
        ytPlayerRef.current.playVideo();
        setMusicMuted(false);
        shouldPlayRef.current = true;
      }
    } catch {
      setMusicMuted((prev) => !prev);
    }
  };

  const handleCelebrate = () => {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 6000);
    // Ensure backsound is running
    if (!musicMuted && ytPlayerRef.current && typeof ytPlayerRef.current.playVideo === 'function') {
      try {
        ytPlayerRef.current.playVideo();
      } catch { }
    }
  };

  // Audio ducking: lower backsound volume when voice note plays
  const handleVoiceStateChange = (playing: boolean) => {
    if (!ytPlayerRef.current || typeof ytPlayerRef.current.setVolume !== 'function') return;
    const targetVolume = playing ? 15 : 55;
    try {
      ytPlayerRef.current.setVolume(targetVolume);
    } catch { }
  };

  return (
    <>
      {/* Hidden YouTube Audio Player */}
      <div
        style={{
          position: 'fixed',
          top: -9999,
          left: -9999,
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
      >
        <div id="youtube-audio-player" />
      </div>
      {/* PIN Gate with soft fade out */}
      {!unlocked && (
        <PinLockScreen
          onUnlock={() => {
            setUnlocked(true);
            setTimeout(() => setBlooming(false), 3800);
            startBacksound();
          }}
          onBlooming={() => {
            setBlooming(true);
            startBacksound();
          }}
        />
      )}

      {/* 🌸 Lily Bloom Overlay */}
      {blooming && <LilyBloomOverlay />}

      {/* 🎵 Floating Background Music Toggle */}
      {unlocked && (
        <button
          onClick={toggleMusic}
          aria-label={musicMuted ? "Play Music" : "Mute Music"}
          style={{
            position: 'fixed',
            top: 24,
            right: 24,
            zIndex: 9999,
            width: 46,
            height: 46,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: `1.5px solid ${C.blushL}`,
            boxShadow: '0 8px 25px rgba(212, 137, 154, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: C.blushD,
            transition: 'all 0.3s ease',
          }}
        >
          {musicMuted ? (
            <Music size={18} style={{ opacity: 0.4 }} />
          ) : (
            <Music size={18} style={{ animation: 'spinSlow 10s linear infinite' }} />
          )}
        </button>
      )}

      <Confetti active={confetti} />

      {/* 🌸 Ambient Warm Glowing Bokeh & Light Orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {/* Soft floating glow 1 - Top Left Blush */}
        <div style={{
          position: 'absolute',
          top: '-5%',
          left: '-5%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 213, 213, 0.42) 0%, rgba(245, 213, 213, 0.08) 55%, transparent 70%)',
          filter: 'blur(50px)',
          animation: 'bgFloatDrift1 22s ease-in-out infinite',
        }} />

        {/* Soft floating glow 2 - Top Right Gold */}
        <div style={{
          position: 'absolute',
          top: '12%',
          right: '-8%',
          width: '48vw',
          height: '48vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(230, 207, 160, 0.38) 0%, rgba(230, 207, 160, 0.06) 60%, transparent 75%)',
          filter: 'blur(60px)',
          animation: 'bgFloatDrift2 26s ease-in-out infinite',
        }} />

        {/* Soft floating glow 3 - Middle Sage/Rose Glow */}
        <div style={{
          position: 'absolute',
          top: '48%',
          left: '-10%',
          width: '50vw',
          height: '50vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(213, 221, 210, 0.35) 0%, rgba(245, 213, 213, 0.15) 50%, transparent 70%)',
          filter: 'blur(65px)',
          animation: 'bgFloatDrift3 24s ease-in-out infinite',
        }} />

        {/* Soft floating glow 4 - Bottom Right Blush/Cream */}
        <div style={{
          position: 'absolute',
          bottom: '5%',
          right: '-6%',
          width: '52vw',
          height: '52vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(245, 213, 213, 0.40) 0%, rgba(230, 207, 160, 0.15) 50%, transparent 70%)',
          filter: 'blur(55px)',
          animation: 'bgFloatDrift1 28s ease-in-out infinite reverse',
        }} />

        {/* Tiny Bokeh Sparkle Lights */}
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '20%',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: '#c9a96e',
          boxShadow: '0 0 16px 6px rgba(201, 169, 110, 0.5)',
          animation: 'pulseSparkle 4s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '60%',
          right: '25%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#d4899a',
          boxShadow: '0 0 20px 8px rgba(212, 137, 154, 0.5)',
          animation: 'pulseSparkle 5s ease-in-out 1.5s infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '35%',
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: '#e6cfa0',
          boxShadow: '0 0 14px 4px rgba(230, 207, 160, 0.6)',
          animation: 'pulseSparkle 4.5s ease-in-out 2.5s infinite',
        }} />
      </div>

      {/* 🌸 Global Floating Flowers Layer (White Rose) */}
      {unlocked && (
        <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1, overflow: 'hidden' }}>
          {/* Top-left cluster */}
          <div style={{ position: 'absolute', top: '12%', left: '5%', opacity: 0.22, animation: 'floatY 10s ease-in-out 1.5s infinite' }}>
            <WhiteRose size={34} />
          </div>

          {/* Top-right cluster */}
          <div style={{ position: 'absolute', top: '15%', right: '6%', opacity: 0.20, animation: 'floatY 11s ease-in-out 2.5s infinite' }}>
            <WhiteRose size={38} />
          </div>

          {/* Mid-left */}
          <div style={{ position: 'absolute', top: '48%', left: '3%', opacity: 0.18, animation: 'floatY 12s ease-in-out 3.5s infinite' }}>
            <WhiteRose size={32} />
          </div>

          {/* Mid-right */}
          <div style={{ position: 'absolute', top: '50%', right: '4%', opacity: 0.20, animation: 'floatY 9s ease-in-out 1.2s infinite' }}>
            <WhiteRose size={36} />
          </div>

          {/* Bottom-left */}
          <div style={{ position: 'absolute', bottom: '12%', left: '5%', opacity: 0.22, animation: 'floatY 10s ease-in-out 2s infinite' }}>
            <WhiteRose size={40} />
          </div>

          {/* Bottom-right */}
          <div style={{ position: 'absolute', bottom: '16%', right: '3%', opacity: 0.20, animation: 'floatY 12s ease-in-out 1s infinite' }}>
            <WhiteRose size={36} />
          </div>

          {/* Subtle edge accents */}
          <div style={{ position: 'absolute', top: '65%', left: '1%', opacity: 0.16, animation: 'floatY 14s ease-in-out 4s infinite' }}>
            <WhiteRose size={26} />
          </div>
          <div style={{ position: 'absolute', top: '30%', right: '1%', opacity: 0.16, animation: 'floatY 15s ease-in-out 3s infinite' }}>
            <WhiteRose size={28} />
          </div>
        </div>
      )}

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          filter: unlocked ? 'none' : 'blur(24px)',
          opacity: unlocked ? 1 : 0.4,
          transform: unlocked ? 'none' : 'scale(0.98)',
          transition: 'filter 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <HeroSection onCelebrate={handleCelebrate} active={unlocked} />
        <LetterSection />
        <MemoriesSection />
        <WishesSection />
        <GallerySection onMediaPlayStateChange={handleVoiceStateChange} />
        <QuoteSection />
        <FinalSection
          onCelebrate={handleCelebrate}
          onVoiceStateChange={handleVoiceStateChange}
        />
      </main>
    </>
  );
}
