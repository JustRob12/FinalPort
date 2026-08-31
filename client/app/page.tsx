"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Moon,
  Sun,
  MapPin,
  FileText,
  ChevronRight,
  Mail,
  Briefcase,
  Monitor,
  Lightbulb,
  Award,
  Eye,
  Circle,
  X,
  ChevronLeft,
  Github,
  Facebook,
  Instagram,
  Linkedin,
  Share2,
  Heart,
  Trophy,
} from "lucide-react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";
import { projects } from "@/lib/data";

// ─── Data ────────────────────────────────────────────────────────────────────

const techStack = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn UI", "Vite", "ESLint"],
  Backend: ["Node.js", "Express", "MongoDB", "OAuth", "JWT", "REST", "Firebase", "Supabase"],
  DevOps: ["Docker", "GitHub Actions", "Vercel", "Render"],
  Tools: ["Git", "GitHub", "VS Code", "Postman", "Trello", "Figma", "Photoshop", "Canva", "Illustrator", "After Effects", "Premiere Pro", "Capcut"],
};

const experiences = [
  { title: "Web Developer / Video Editor & Graphic Designer", company: "Direct Response Marketing", period: "Present" },
  { title: "BS Information Technology (Cum Laude)", company: "Davao Oriental State University", period: "2026", highlight: true },
  { title: "Web Development Intern", company: "DICT - DOrSU", period: "2026" },
  { title: "Full Stack Web Developer", company: "ACES - DOrSU", period: "2023 – Present" },
  { title: "Layout Artist", company: "PSYDO", period: "2025" },
  { title: "Full Stack Web Developer", company: "CODEBYTERS", period: "2024 – 2025" },
  { title: "Public Information Officer (PIO)", company: "ACES Organization", period: "2024 – 2025" },
  { title: "Intern", company: "Government Internship Program", period: "2023 – 2024" },
  { title: "Layout Artist / Photographer", company: "PESO DavOr", period: "2022 – 2024" },
  { title: "Hello World! 👋", company: "Wrote my first line of code", period: "2021" },
];

const achievements = [
  { title: "Champion SIGLAKAS", subtitle: "Short Film Competition", year: "2025" },
  { title: "Champion SIGLAKAS", subtitle: "Artistic Videography", year: "2024" },
  { title: "Champion SIGLAKAS", subtitle: "Artistic Videography", year: "2023" },
  { title: "2nd Placer SINEMATI", subtitle: "Short Film Competition", year: "2023" },
  { title: "5th Placer RSPC", subtitle: "Radio Broadcasting & Script Writing (Filipino)", year: "2022" },
  { title: "4th Placer RSPC", subtitle: "Best in Technical", year: "2022" },
  { title: "1st Placer DSPC", subtitle: "Radio Broadcasting & Script Writing (Filipino)", year: "2021" },
];

const certificates = [
  { title: "IDEAS Plugin CERTIFICATE OF PARTICIPATION", issuer: "IDEAS Plugin", year: "2025", image: "/ideas2025.png" },
  { title: "IDEAS Plugin CERTIFICATE OF PARTICIPATION", issuer: "IDEAS Plugin", year: "2024", image: "/ideas2024.png" },
  { title: "GTA Lab Mobile Certificate of Completion", issuer: "GTA Lab", year: "2024", image: "/GTA2024.png" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-gray-200 bg-white px-2.5 py-1 text-[11px] font-medium text-black dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-white transition-colors hover:border-gray-300 dark:hover:border-neutral-700">
      {label}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-3.5 flex items-center gap-2 border-b border-gray-100 dark:border-neutral-800/60 pb-2.5">
      <span className="text-black/70 dark:text-white/70">{icon}</span>
      <h2 className="text-xs font-bold uppercase tracking-widest text-black/90 dark:text-white/90">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-4 sm:p-5 dark:border-neutral-800 dark:bg-[#111111] shadow-xs transition-shadow hover:shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function Modal({ isOpen, onClose, image, title }: { isOpen: boolean; onClose: () => void; image: string; title: string }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl bg-white dark:bg-[#111111] p-2 shadow-2xl animate-in zoom-in-95 duration-300 border border-gray-200 dark:border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/80 backdrop-blur-md transition-all active:scale-95"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>
        <div className="p-2 sm:p-4">
          <div className="aspect-[16/10] sm:aspect-auto overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain max-h-[75vh]"
            />
          </div>
          <div className="mt-4 px-2 pb-1">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-black dark:text-white">{title}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function GFSlideshowModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const images = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, images.length]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-in fade-in duration-500"
      onClick={onClose}
    >
      <div
        className="relative max-w-xs w-full aspect-square overflow-hidden rounded-2xl bg-white dark:bg-[#111111] shadow-2xl animate-in zoom-in-95 duration-500 border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 rounded-full bg-black/40 p-2 text-white hover:bg-black/60 backdrop-blur-md transition-all"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>
        <div className="relative h-full w-full">
          {images.map((img, idx) => (
            <div
              key={img}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
                }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/gf/${img}`}
                alt="Pretty GF"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end justify-center pb-6">
                <div className="flex gap-1.5 opacity-70">
                  {images.map((_, dotIdx) => (
                    <div
                      key={dotIdx}
                      className={`h-1.5 rounded-full transition-all duration-300 ${dotIdx === currentIndex ? "w-6 bg-white" : "w-1.5 bg-white/40"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Home() {
  const { ref: toggleRef, toggleSwitchTheme, isDarkMode } = useModeAnimation({
    animationType: ThemeAnimationType.CIRCLE,
  });

  const [selectedCert, setSelectedCert] = useState<{ title: string; image: string } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isGFModalOpen, setIsGFModalOpen] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    { num: 7, caption: "Graduation & Academic Honors", ext: "png" },
    { num: 1, caption: "Speaking & Presenting", ext: "jpg" },
    { num: 2, caption: "Event Highlights", ext: "jpg" },
    { num: 3, caption: "Organization Activities", ext: "jpg" },
    { num: 4, caption: "Team & Tech Meetings", ext: "jpg" },
    { num: 5, caption: "Campus Moments", ext: "jpg" },
    { num: 6, caption: "Special Events", ext: "jpeg" },
  ];

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 340;
      ref.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getProfileImage = () => {
    if (!isDarkMode) {
      return isHovered ? "/dayshy.png" : "/day.png";
    }
    return isHovered ? "/nightshy.png" : "/night.png";
  };

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-[#fafafa] py-6 sm:py-10 font-['Inter',sans-serif] text-black dark:bg-[#0a0a0a] dark:text-white overflow-x-hidden">

        {/* Fixed Corner Theme Switcher */}
        <div className="fixed top-5 right-5 sm:top-6 sm:right-6 z-[110]">
          <button
            ref={toggleRef}
            onClick={toggleSwitchTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-md transition-all hover:scale-110 active:scale-95 dark:border-neutral-800 dark:bg-[#111111] dark:text-white"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </button>
        </div>

        {/* ── Widescreen Landscape Container ── */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">

          {/* ── REVISED FIRST CONTAINER: Modern Editorial Hero Profile Banner ── */}
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 sm:p-7 dark:border-neutral-800 dark:bg-[#111111] shadow-xs">

            {/* Top Bar: Availability & Location */}
            <div className="mb-5 flex flex-wrap items-center justify-end gap-2 border-b border-gray-100 dark:border-neutral-800/80 pb-3">
              <div className="flex items-center gap-3 text-xs text-black/70 dark:text-white/70 font-medium">
                <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Available for Work</span>
                </div>
                <span className="hidden sm:inline text-black/20 dark:text-white/20">&bull;</span>
                <div className="hidden sm:flex items-center gap-1">
                  <MapPin size={13} className="shrink-0 opacity-70" />
                  <span>City of Mati, Davao Oriental</span>
                </div>
              </div>
            </div>

            {/* Main Hero Layout: Avatar, Name & Bio, Action Cards */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6">

              {/* Left Group: Avatar + Name & Bio in a tight, cohesive layout */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start md:items-center gap-5 sm:gap-6 text-center sm:text-left flex-1 min-w-0">
                {/* Avatar */}
                <div
                  className="relative h-36 w-36 sm:h-40 sm:w-40 shrink-0 overflow-hidden rounded-2xl border-2 border-gray-200 dark:border-neutral-800 shadow-md group cursor-pointer"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getProfileImage()}
                    alt="Roberto Prisoris"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">Roberto Prisoris</span>
                  </div>
                </div>

                {/* Name & Bio */}
                <div className="space-y-2 min-w-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-black dark:text-white">
                      Roberto Prisoris
                    </h1>
                    <svg
                      viewBox="0 0 24 24"
                      className="h-6 w-6 sm:h-7 sm:w-7 shrink-0 inline-block text-[#0866FF]"
                      aria-label="Verified"
                    >
                      <path
                        d="M10.29 2.308a2.4 2.4 0 0 1 3.42 0l.47.47a2.4 2.4 0 0 0 2.22.65l.65-.13a2.4 2.4 0 0 1 2.8 1.95l.13.65a2.4 2.4 0 0 0 1.55 1.77l.62.24a2.4 2.4 0 0 1 1.43 3.1l-.24.62a2.4 2.4 0 0 0 .47 2.29l.41.53a2.4 2.4 0 0 1-.36 3.39l-.53.41a2.4 2.4 0 0 0-.82 2.21l.13.65a2.4 2.4 0 0 1-2.02 2.75l-.65.13a2.4 2.4 0 0 0-1.89 1.4l-.27.61a2.4 2.4 0 0 1-3.13 1.25l-.61-.27a2.4 2.4 0 0 0-2.33 0l-.61.27a2.4 2.4 0 0 1-3.13-1.25l-.27-.61a2.4 2.4 0 0 0-1.89-1.4l-.65-.13a2.4 2.4 0 0 1-2.02-2.75l.13-.65a2.4 2.4 0 0 0-.82-2.21l-.53-.41a2.4 2.4 0 0 1-.36-3.39l.41-.53a2.4 2.4 0 0 0 .47-2.29l-.24-.62a2.4 2.4 0 0 1 1.43-3.1l.62-.24a2.4 2.4 0 0 0 1.55-1.77l.13-.65a2.4 2.4 0 0 1 2.8-1.95l.65.13a2.4 2.4 0 0 0 2.22-.65l.47-.47Z"
                        fill="#0866FF"
                      />
                      <path
                        d="M8.5 12.3l2.4 2.4 4.8-4.8"
                        fill="none"
                        stroke="#FFFFFF"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <p className="text-xs sm:text-sm text-black/75 dark:text-neutral-300 leading-relaxed max-w-xl">
                    Building modern web applications, mobile platforms, and visual brand identities. Dedicated to high-performance code and polished UI/UX design.
                  </p>
                </div>
              </div>

              {/* Action Buttons (Right Column / Panel) */}
              <div className="w-full lg:w-52 shrink-0 flex flex-col sm:flex-row lg:flex-col gap-2.5 justify-center pt-3 lg:pt-0 border-t lg:border-t-0 lg:border-l border-gray-100 dark:border-neutral-800/80 lg:pl-6">
                <a
                  href="https://docs.google.com/document/d/1paps_by0DiSGQutX0el_28aZmsLQSx63/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:border-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 active:scale-95 shadow-2xs"
                >
                  <FileText size={14} strokeWidth={2} />
                  <span>View Resume</span>
                  <ChevronRight size={14} strokeWidth={2} />
                </a>

                <a
                  href="mailto:roberto.prisoris12@gmail.com"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-xs font-semibold text-black transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-800 active:scale-95 shadow-2xs"
                >
                  <Mail size={14} strokeWidth={2} />
                  <span>Send Email</span>
                </a>

                <button
                  onClick={() => setIsGFModalOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-pink-500 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-pink-600 dark:border-pink-900 dark:text-white dark:hover:bg-[#FFC0CB] dark:hover:text-pink-600 active:scale-95 shadow-2xs"
                >
                  <Heart size={14} strokeWidth={2} className="animate-pulse text-white dark:group-hover:text-pink-600" />
                  <span>Pretty GF</span>
                  <Heart size={14} strokeWidth={2} className="animate-pulse text-white dark:group-hover:text-pink-600" />
                </button>
              </div>

            </div>
          </div>

          {/* ── Main 2-Column Section (Projects, Graphics, Certs | Achievements, Experience) ── */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

            {/* Left Column (7 cols lg, 8 cols xl) */}
            <div className="space-y-4 lg:col-span-7 xl:col-span-8">

              {/* About */}
              <Card>
                <SectionTitle icon={<Monitor size={15} strokeWidth={1.8} />} title="About Me" />
                <div className="space-y-3 text-sm leading-relaxed text-black/85 dark:text-neutral-300">
                  <p>
                    Hello! I&apos;m Roberto Prisoris, a{" "}
                    <span className="font-bold text-black dark:text-white border-b-2 border-amber-400 dark:border-amber-500/70 px-0.5">
                      BSIT Graduate (Cum Laude)
                    </span>{" "}
                    from Davao Oriental State University and a versatile{" "}
                    <span className="font-semibold text-black dark:text-white border-b border-gray-300 dark:border-neutral-700">
                      Web & Mobile Developer and Graphics Designer
                    </span>.
                    I build high-performance web applications and mobile apps that integrate clean, maintainable code with high-impact visual design.
                  </p>
                  <p>
                    From concept to deployment, I specialize in crafting{" "}
                    <span className="font-semibold text-black dark:text-white">intuitive mobile apps, responsive full-stack web platforms</span>, and{" "}
                    <span className="font-semibold text-black dark:text-white">brand identities</span>.
                    My approach fuses technical precision with creative flair to deliver digital experiences that exceed user expectations.
                  </p>
                </div>
              </Card>

              {/* Featured Projects */}
              <Card>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle icon={<Lightbulb size={15} strokeWidth={1.8} />} title="Featured Projects" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                  {projects.map((project) => (
                    <Link
                      key={project.slug}
                      href={`/projects/${project.slug}`}
                      className="group flex flex-col justify-between rounded-xl border border-gray-200 p-4 hover:bg-neutral-50/80 dark:border-neutral-800 dark:hover:bg-neutral-900/60 transition-all hover:scale-[1.015] active:scale-[0.99] relative overflow-hidden"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1.5 mb-2">
                          <span className="text-xs font-extrabold uppercase tracking-tight text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {project.title}
                          </span>
                          {project.status && (
                            <span className="rounded-md border border-gray-200 px-1.5 py-0.5 text-[9px] font-bold dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-black/80 dark:text-white/80 shrink-0">
                              {project.status}
                            </span>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed text-black/75 dark:text-neutral-400 line-clamp-3 mb-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-gray-100 dark:border-neutral-800/60 flex items-center justify-between gap-1">
                        <div className="flex flex-wrap gap-1">
                          {project.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-[10px] font-medium border border-gray-200 dark:border-neutral-800 px-1.5 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-900">
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 2 && (
                            <span className="text-[10px] font-medium border border-gray-200 dark:border-neutral-800 px-1.5 py-0.5 rounded-md bg-neutral-50 dark:bg-neutral-900">
                              +{project.tags.length - 2}
                            </span>
                          )}
                        </div>
                        <ChevronRight
                          size={15}
                          className="text-black/30 dark:text-white/30 transition-all group-hover:text-black group-hover:translate-x-1 dark:group-hover:text-white shrink-0"
                        />
                      </div>
                    </Link>
                  ))}
                </div>
              </Card>

              {/* Graphics Designs */}
              <Card>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle icon={<Eye size={15} strokeWidth={1.8} />} title="Graphics Designs" />
                  <Link
                    href="/graphics"
                    className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                  >
                    View all
                  </Link>
                </div>
                <div className="relative group/carousel">
                  <button
                    onClick={() => scrollCarousel(carouselRef, "left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#111111]/95 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-all shadow-md -ml-2 sm:-ml-4 active:scale-95"
                    aria-label="Scroll left"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <div
                    ref={carouselRef}
                    className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide no-scrollbar snap-x"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {[
                      "/Graphics/SIGLAKAS 2025 OVERALL CHAMPION.jpg",
                      "/Graphics/58th LOGO.png",
                      "/Tshirts/17.png",
                      "/Tshirts/15.png",
                      "/Tshirts/13.png",
                      "/Tshirts/16.png",
                      "/Graphics/Buwan ng Wika.png",
                      "/Graphics/TARRAGONA TRAILBLAZERS.png",
                    ].map((src, i) => (
                      <div
                        key={i}
                        className="flex-none w-36 sm:w-44 aspect-square rounded-xl overflow-hidden border border-gray-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50 snap-start relative group/item"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt="Graphic Design"
                          className="h-full w-full object-cover group-hover/item:scale-105 transition duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollCarousel(carouselRef, "right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-9 w-9 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#111111]/95 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/carousel:opacity-100 transition-all shadow-md -mr-2 sm:-mr-4 active:scale-95"
                    aria-label="Scroll right"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </Card>

              {/* Certificates */}
              <Card>
                <SectionTitle icon={<Award size={15} strokeWidth={1.8} />} title="Certificates & Certifications" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {certificates.map((cert, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedCert({ title: cert.title, image: cert.image })}
                      className="group flex flex-col justify-between rounded-xl border border-gray-100 bg-neutral-50/60 p-3.5 dark:border-neutral-900 dark:bg-neutral-900/40 hover:bg-white dark:hover:bg-[#1a1a1a] transition-all hover:border-gray-200 dark:hover:border-neutral-800 cursor-pointer"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">{cert.issuer}</span>
                          <span className="text-[10px] font-extrabold tabular-nums opacity-60">{cert.year}</span>
                        </div>
                        <p className="text-xs font-bold leading-snug uppercase text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                          {cert.title}
                        </p>
                      </div>
                      <div className="mt-3 flex items-center justify-between text-[11px] font-medium text-black/60 dark:text-white/60">
                        <span>Click to view</span>
                        <Eye size={13} className="group-hover:scale-110 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>

            {/* Right Column (5 cols lg, 4 cols xl) */}
            <div className="space-y-4 lg:col-span-5 xl:col-span-4">

              {/* Achievements & Honors */}
              <Card>
                <SectionTitle icon={<Trophy size={15} strokeWidth={1.8} className="text-amber-500" />} title="Achievements & Honors" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
                  {achievements.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 rounded-lg border border-gray-100 bg-neutral-50/70 p-2.5 dark:border-neutral-900 dark:bg-neutral-900/40 transition hover:bg-neutral-100/70 dark:hover:bg-neutral-900">
                      <div className="mt-0.5 shrink-0 rounded-full bg-amber-100 p-1 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400">
                        <Trophy size={11} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <p className="text-xs font-bold uppercase tracking-tight text-black dark:text-white truncate">{item.title}</p>
                          <span className="text-[10px] font-bold text-black/40 dark:text-white/40">{item.year}</span>
                        </div>
                        <p className="text-[10px] text-black/60 dark:text-white/60 leading-tight mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Experience & Education */}
              <Card>
                <SectionTitle icon={<Briefcase size={15} strokeWidth={1.8} />} title="Experience & Education" />
                <div className="space-y-0">
                  {experiences.map((exp, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Timeline Dot & Line */}
                      <div className="flex flex-col items-center pt-0.5">
                        <Circle
                          size={8}
                          strokeWidth={2}
                          className={`${exp.highlight
                            ? "fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400"
                            : "fill-black text-black dark:fill-white dark:text-white"
                            }`}
                        />
                        {i < experiences.length - 1 && (
                          <div className="my-1 w-px flex-1 bg-gray-200 dark:bg-neutral-800" style={{ minHeight: "20px" }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-3 flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <p className={`text-xs font-bold leading-snug ${exp.highlight ? 'text-amber-700 dark:text-amber-300 font-extrabold' : ''}`}>
                            {exp.title}
                          </p>
                          <span className="text-[10px] opacity-60 tabular-nums uppercase shrink-0 font-medium">{exp.period}</span>
                        </div>
                        <p className="text-xs opacity-80 mt-0.5">{exp.company}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

            </div>
          </div>

          {/* ── Side-by-Side Section: Tech Stack (Left) and Social Links (Right) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Tech Stack (Left Card) */}
            <Card>
              <SectionTitle icon={<Monitor size={15} strokeWidth={1.8} />} title="Tech Stack & Skills" />
              <div className="space-y-3.5">
                {Object.entries(techStack).map(([category, techs]) => (
                  <div key={category}>
                    <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-black/50 dark:text-white/50">{category}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {techs.map((tech) => (
                        <Badge key={tech} label={tech} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Social Links (Right Card) */}
            <Card>
              <SectionTitle icon={<Share2 size={15} strokeWidth={1.8} />} title="Connect & Socials" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  { icon: <Github size={16} />, label: "GitHub", href: "https://github.com/JustRob12", color: "hover:text-[#2dba4e]" },
                  {
                    icon: <div style={{ maskImage: 'url(https://cdn.simpleicons.org/behance)', maskSize: 'contain', maskRepeat: 'no-repeat' }} className="h-4 w-4 bg-current" />,
                    label: "Behance",
                    href: "https://www.behance.net/robertoprisori",
                    color: "hover:text-[#0057ff]"
                  },
                  { icon: <Facebook size={16} />, label: "Facebook", href: "https://facebook.com/roberto.prisoris", color: "hover:text-[#1877f2]" },
                  {
                    icon: <div style={{ maskImage: 'url(https://cdn.simpleicons.org/tiktok)', maskSize: 'contain', maskRepeat: 'no-repeat' }} className="h-4 w-4 bg-current" />,
                    label: "TikTok",
                    href: "https://tiktok.com/me_robbb",
                    color: "hover:text-[#ff0050]"
                  },
                  { icon: <Instagram size={16} />, label: "Instagram", href: "https://instagram.com/me_robbb", color: "hover:text-[#e4405f]" },
                  { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://www.linkedin.com/in/roberto-jr-m-prisoris-9ab5433b0/", color: "hover:text-[#0a66c2]" },
                  { icon: <Mail size={16} />, label: "Email", href: "mailto:roberto.prisoris12@gmail.com", color: "hover:text-[#db4437]" },
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-3 rounded-xl border border-gray-100 bg-neutral-50/70 p-3 text-black/80 transition-all hover:border-gray-300 hover:bg-white dark:border-neutral-900 dark:bg-neutral-900/40 dark:text-white/80 dark:hover:border-neutral-800 dark:hover:bg-[#1a1a1a] ${social.color}`}
                  >
                    <span className="flex-shrink-0">{social.icon}</span>
                    <span className="text-xs font-bold uppercase tracking-wider truncate">{social.label}</span>
                  </a>
                ))}
              </div>
            </Card>

          </div>

          {/* ── Bottom Section: Widescreen Gallery Slider Carousel ── */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <SectionTitle icon={<Eye size={15} strokeWidth={1.8} />} title="Personal Gallery & Moments" />
              <Link
                href="/gallery"
                className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
              >
                View all
              </Link>
            </div>

            <div className="relative group/galleryCarousel">
              <button
                onClick={() => scrollCarousel(galleryCarouselRef, "left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#111111]/95 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/galleryCarousel:opacity-100 transition-all shadow-lg -ml-3 sm:-ml-4 active:scale-95"
                aria-label="Scroll left"
              >
                <ChevronLeft size={20} />
              </button>

              <div
                ref={galleryCarouselRef}
                className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide no-scrollbar snap-x"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {galleryImages.map((img) => (
                  <div
                    key={img.num}
                    className="flex-none w-52 sm:w-64 md:w-72 aspect-square rounded-xl overflow-hidden border border-gray-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 snap-start relative group/card shadow-2xs"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/Gallery/${img.num}.${img.ext}`}
                      alt={`Gallery photo ${img.num}`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => scrollCarousel(galleryCarouselRef, "right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/95 dark:bg-[#111111]/95 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/galleryCarousel:opacity-100 transition-all shadow-lg -mr-3 sm:-mr-4 active:scale-95"
                aria-label="Scroll right"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </Card>

        </div>
      </div>

      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        image={selectedCert?.image || ""}
        title={selectedCert?.title || ""}
      />

      <GFSlideshowModal
        isOpen={isGFModalOpen}
        onClose={() => setIsGFModalOpen(false)}
      />
    </div>
  );
}
