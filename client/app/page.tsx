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
  BadgeCheck,
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
  ChevronDown,
} from "lucide-react";
import { ThemeAnimationType, useModeAnimation } from "react-theme-switch-animation";

// ─── Data ────────────────────────────────────────────────────────────────────

const techStack = {
  Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "Shadcn UI", "Vite", "ESLint", "Prettier"],
  Backend: ["Node.js", "Express", "MongoDB", "OAuth", "JWT", "REST", "Firebase", "Supabase"],
  DevOps: ["Docker", "GitHub Actions", "Vercel", "Render"],
  Tools: ["Git", "GitHub", "VS Code", "Postman", "Trello", "Notion", "Discord", "Figma", "Photoshop", "Canva", "Illustrator", "After Effects", "Premiere Pro", "Capcut"],
};

const experiences = [
  { title: "Web Development Intern", company: "DICT- DOrSU", period: "2026" },
  { title: "Full Stack Web Developer", company: "ACES - DOrSU", period: "2023 – Present" },
  { title: "Layout Artist", company: "PSYDO", period: "2025" },
  { title: "Full Stack Web Developer", company: "CODEBYTERS", period: "2024 – 2025" },
  { title: "Public Information Officer (PIO)", company: "ACES Organization", period: "2024 – 2025" },
  { title: "Intern", company: "Government Internship Program", period: "2023 – 2024" },
  { title: "Layout Artist / Photographer", company: "PESO DavOr", period: "2022 – 2024" },
  { title: "BS Information Technology", company: "Davao Oriental State University", period: "2022 – 2026" },
  { title: "Hello World! 👋", company: "Wrote my first line of code", period: "2021" },
];

const achievements = [
  { title: "Champion SIGLAKAS", subtitle: "Short Film", year: "2025" },
  { title: "Champion SIGLAKAS", subtitle: "Artistic Videography", year: "2024" },
  { title: "Champion SIGLAKAS", subtitle: "Artistic Videography", year: "2023" },
  { title: "2nd Placer SINEMATI", subtitle: "Short Film Competition", year: "2023" },
  { title: "5th Placer RSPC", subtitle: "Radio Broadcasting and Script Writing (Filipino)", year: "2022" },
  { title: "4th Placer RSPC", subtitle: "Best in Technical", year: "2022" },
  { title: "1st Placer DSPC", subtitle: "Radio Broadcasting and Script Writing (Filipino)", year: "2021" },
];

const certificates = [
  { title: "IDEAS Plugin CERTIFICATE OF PARTICIPATION", issuer: "IDEAS Plugin", year: "2025", image: "/ideas2025.png" },
  { title: "IDEAS Plugin CERTIFICATE OF PARTICIPATION", issuer: "IDEAS Plugin", year: "2024", image: "/ideas2024.png" },
  { title: "GTA Lab Mobile Certificate of Completion", issuer: "GTA Lab", year: "2024", image: "/GTA2024.png" },
];

const projects = [
  {
    title: "ACETRACK",
    status: "Done",
    description: "Modern Student Attendance Tracking System",
    tags: ["Next.js", "TypeScript", "Supabase", "Shadcn UI"],
    link: "https://finalacetrack.vercel.app/",
  },
  {
    title: "StayKo",
    status: "In Progress",
    description: "Discover your next home with integrated road-following navigation, real-time travel estimates, and direct owner contact—all in one place.",
    tags: ["Next.js", "TypeScript", "Supabase", "Shadcn UI", "MapLibre", "OSRM"],
    link: "https://stayko.vercel.app/",
  },
  {
    title: "AquaNet",
    status: "Done",
    description: "A CAPSTONE PROJECT: Mobile App for Water Quality Monitoring and Management",
    tags: ["Expo", "React Native", "Supabase", "Tailwind CSS"],
  },

];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Badge({ label }: { label: string }) {
  return (
    <span className="inline-block rounded-md border border-gray-200 bg-white px-2.5 py-0.5 text-xs font-medium text-black dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-white">
      {label}
    </span>
  );
}

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2 pb-3 dark:border-neutral-800">
      <span>{icon}</span>
      <h2 className="text-xs font-semibold uppercase tracking-widest">{title}</h2>
    </div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-xl border border-gray-200 bg-white p-5 dark:border-neutral-800 dark:bg-[#111111] ${className}`}>
      {children}
    </div>
  );
}

function Modal({ isOpen, onClose, image, title }: { isOpen: boolean; onClose: () => void; image: string; title: string }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div
        className="relative max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-xl bg-white dark:bg-[#111111] p-1 shadow-2xl animate-in zoom-in-95 duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 backdrop-blur-md transition"
        >
          <X size={20} />
        </button>
        <div className="p-2 sm:p-4">
          <div className="aspect-[4/3] sm:aspect-auto overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="mt-4 px-2 pb-2">
            <h3 className="text-sm font-bold uppercase tracking-tight text-black dark:text-white">{title}</h3>
          </div>
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
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  const galleryImages = [1, 2, 3, 4, 5, 6];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentGalleryIndex((prev) => (prev + 1) % galleryImages.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const scrollCarousel = (ref: React.RefObject<HTMLDivElement | null>, direction: "left" | "right") => {
    if (ref.current) {
      const scrollAmount = 300;
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
      <div className="min-h-screen bg-white py-10 font-['Inter',sans-serif] text-black dark:bg-[#0a0a0a] dark:text-white overflow-x-hidden">

        {/* Fixed Corner Toggle */}
        <div className="fixed top-6 right-6 z-[110]">
          <button
            ref={toggleRef}
            onClick={toggleSwitchTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-black shadow-lg transition-all hover:scale-110 active:scale-95 dark:border-neutral-800 dark:bg-[#111111] dark:text-white"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={18} strokeWidth={2} /> : <Moon size={18} strokeWidth={2} />}
          </button>
        </div>

        <div className="mx-auto max-w-5xl px-4 relative z-10">

          {/* ── Profile Header (No Border) ── */}
          <div className="rounded-xl bg-white p-5 dark:bg-[#111111]">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
              {/* Avatar */}
              <div
                className="h-42 w-42 shrink-0 overflow-hidden rounded-2xl cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getProfileImage()}
                  alt="Roberto Prisoris"
                  className="h-full w-full object-cover transition-all duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex-1 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5">
                  <h1 className="text-xl font-bold tracking-tight">
                    Roberto Prisoris
                  </h1>
                  <BadgeCheck size={16} strokeWidth={2} className="mx-auto sm:mx-0" />
                </div>

                <div className="flex items-center justify-center sm:justify-start gap-1 mt-1 text-xs">
                  <MapPin size={11} strokeWidth={1.8} />
                  City of Mati, Davao Oriental, Philippines
                </div>

                <p className="mt-2 text-sm font-medium">
                  Web & Mobile Developer / Graphics Designer
                </p>

                {/* Buttons Group */}
                <div className="mt-3 flex flex-wrap justify-center sm:justify-start gap-2">
                  <a
                    href="https://docs.google.com/document/d/1paps_by0DiSGQutX0el_28aZmsLQSx63/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-black px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:border-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                  >
                    <FileText size={12} strokeWidth={2} />
                    View Resume
                    <ChevronRight size={12} strokeWidth={2} />
                  </a>
                  <a
                    href="mailto:roberto.prisoris12@gmail.com"
                    className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-800"
                  >
                    <Mail size={12} strokeWidth={2} />
                    Send Email
                  </a>

                  {/* Achievements Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setIsAchievementsOpen(!isAchievementsOpen)}
                      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-black transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-800"
                    >
                      <Trophy size={12} strokeWidth={2} className="text-yellow-500" />
                      Achievements
                      <ChevronDown size={12} strokeWidth={2} className={`transition-transform duration-200 ${isAchievementsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isAchievementsOpen && (
                      <div className="absolute left-0 mt-2 w-64 rounded-xl border border-gray-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-[#161616] z-50">
                        <div className="space-y-1">
                          {achievements.map((item, idx) => (
                            <div key={idx} className="flex gap-3 rounded-lg p-2 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900/50">
                              <div className="mt-0.5 shrink-0 p-1">
                                <Trophy size={12} className="text-yellow-500" />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className="text-[10px] font-bold uppercase tracking-tight truncate">{item.title}</p>
                                <p className="text-[9px] text-black/60 dark:text-white/60 leading-tight">{item.subtitle}</p>
                                <p className="text-[8px] font-bold mt-1 text-black/40 dark:text-white/40">{item.year}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Pretty GF Link */}
                  <div className="flex justify-center sm:justify-start">
                    <a
                      href="https://www.facebook.com/ledehbuuug"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-pink-500 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-pink-600 dark:border-neutral-800 dark:text-white dark:hover:bg-[#FFC0CB]"
                    >
                      <Heart size={12} strokeWidth={2} />
                      Pretty GF
                      <Heart size={12} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── Two-column layout ── */}
          <div className="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-3">

            {/* ── Left column ── */}
            <div className="space-y-3 lg:col-span-2">

              {/* About */}
              <Card>
                <SectionTitle icon={<Monitor size={14} strokeWidth={1.8} />} title="About" />
                <div className="space-y-3 text-sm leading-relaxed">
                  <p>
                    Hello! I&apos;m Roberto Prisoris, a versatile{" "}
                    <span className="font-bold border-b border-gray-200 dark:border-neutral-800">Web & Mobile Developer and Graphics Designer</span>{" "}
                    passionate about crafting seamless digital solutions. I specialize in building
                    robust applications that merge high-performance code with high-impact visual
                    design.
                  </p>
                  <p>
                    From concept to deployment, I focus on creating{" "}
                    <span className="font-bold border-b border-gray-200 dark:border-neutral-800">intuitive mobile apps, responsive web platforms</span>,
                    and <span className="font-bold border-b border-gray-200 dark:border-neutral-800">engaging brand identities</span>. My approach
                    combines technical precision with creative flair, ensuring every project is not only
                    functional but also visually stunning.
                  </p>
                  <p>
                    I thrive on solving complex problems and am constantly evolving my tech stack to
                    deliver modern, efficient, and user-centric experiences that exceed expectations.
                  </p>
                </div>
              </Card>

              {/* Tech Stack */}
              <Card>
                <SectionTitle icon={<Monitor size={14} strokeWidth={1.8} />} title="Tech Stack" />
                <div className="space-y-4">
                  {Object.entries(techStack).map(([category, techs]) => (
                    <div key={category}>
                      <p className="mb-2 text-xs font-bold uppercase tracking-wider">{category}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {techs.map((tech) => (
                          <Badge key={tech} label={tech} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Projects */}
              <Card>
                <SectionTitle icon={<Lightbulb size={14} strokeWidth={1.8} />} title="Projects" />
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {projects.map((project) => (
                    <div
                      key={project.title}
                      className="rounded-lg border border-gray-200 p-4 hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900 cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold uppercase">{project.title}</span>
                        {project.status && (
                          <span className="rounded-sm border border-gray-200 px-1.5 py-0.5 text-[10px] font-bold dark:border-neutral-800">
                            {project.status}
                          </span>
                        )}
                      </div>
                      <p className="text-xs leading-relaxed text-black/80 dark:text-neutral-400">{project.description}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1">
                        {project.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-medium border border-gray-200 dark:border-neutral-800 px-1 rounded-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Graphics Designs */}
              <Card>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle icon={<Eye size={14} strokeWidth={1.8} />} title="Graphics Designs" />
                  <Link
                    href="/graphics"
                    className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                  >
                    View all
                  </Link>
                </div>
                <div className="relative group/carousel">
                  {/* Left Arrow */}
                  <button
                    onClick={() => scrollCarousel(carouselRef, "left")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#111111]/80 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/carousel:opacity-100 transition shadow-sm -ml-2 sm:-ml-4"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  <div
                    ref={carouselRef}
                    className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar snap-x h-28 sm:h-40"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {[
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
                        className="flex-none w-32 sm:w-40 aspect-square rounded-lg overflow-hidden border border-gray-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50 snap-start"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={src}
                          alt="Graphic Design"
                          className="h-full w-full object-cover hover:scale-105 transition duration-500"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={() => scrollCarousel(carouselRef, "right")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 flex items-center justify-center rounded-full bg-white/80 dark:bg-[#111111]/80 border border-gray-200 dark:border-neutral-800 text-black dark:text-white opacity-0 group-hover/carousel:opacity-100 transition shadow-sm -mr-2 sm:-mr-4"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </Card>

              {/* Socials */}
              <Card>
                <SectionTitle icon={<Share2 size={14} strokeWidth={1.8} />} title="Socials" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                      className={`flex items-center gap-3 rounded-lg border border-gray-100 bg-neutral-50 p-2.5 text-black/60 transition-all hover:border-gray-200 hover:bg-white dark:border-neutral-900 dark:bg-neutral-900/50 dark:text-white/60 dark:hover:border-neutral-800 dark:hover:bg-[#1a1a1a] ${social.color}`}
                    >
                      <span className="flex-shrink-0">{social.icon}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest">{social.label}</span>
                    </a>
                  ))}
                </div>
              </Card>
            </div>

            {/* ── Right column ── */}
            <div className="space-y-3">

              {/* Experience */}
              <Card>
                <SectionTitle icon={<Briefcase size={14} strokeWidth={1.8} />} title="Experience" />
                <div className="space-y-0">
                  {experiences.map((exp, i) => (
                    <div key={i} className="flex gap-3">
                      {/* Timeline */}
                      <div className="flex flex-col items-center pt-0.5">
                        <Circle
                          size={8}
                          strokeWidth={2}
                          className={`${exp
                            ? "fill-black text-black dark:fill-white dark:text-white"
                            : "fill-none"
                            }`}
                        />
                        {i < experiences.length - 1 && (
                          <div className="my-1 w-px flex-1 bg-gray-200 dark:bg-neutral-800" style={{ minHeight: "20px" }} />
                        )}
                      </div>

                      {/* Content */}
                      <div className="pb-4 flex-1">
                        <p className="text-xs font-bold leading-snug">{exp.title}</p>
                        <p className="text-xs opacity-80 mt-0.5">{exp.company}</p>
                        <p className="text-[10px] opacity-60 mt-0.5 tabular-nums uppercase">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Certificates */}
              <Card>
                <SectionTitle icon={<Award size={14} strokeWidth={1.8} />} title="Certificates" />
                <div className="space-y-4">
                  {certificates.map((cert, i) => (
                    <div key={i} className="flex items-start justify-between gap-2 border-b border-gray-200 last:border-b-0 pb-3 dark:border-neutral-800">
                      <div className="flex-1">
                        <p className="text-xs font-bold leading-snug uppercase">{cert.title}</p>
                        <p className="text-xs opacity-80 mt-0.5">{cert.issuer}</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <button
                          onClick={() => setSelectedCert({ title: cert.title, image: cert.image })}
                          className="hover:opacity-50 transition-colors p-1"
                        >
                          <Eye size={13} strokeWidth={1.8} />
                        </button>
                        <span className="text-[10px] tabular-nums font-bold uppercase">{cert.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Personal Gallery */}
              <Card>
                <div className="flex items-center justify-between mb-2">
                  <SectionTitle icon={<Eye size={14} strokeWidth={1.8} />} title="Gallery" />
                  <Link
                    href="/gallery"
                    className="text-[10px] font-bold uppercase tracking-widest text-black/60 hover:text-black dark:text-white/60 dark:hover:text-white transition-colors"
                  >
                    View all
                  </Link>
                </div>
                <div className="relative aspect-video sm:aspect-[16/16] rounded-lg overflow-hidden border border-gray-100 dark:border-neutral-900 bg-neutral-50 dark:bg-neutral-900/50">
                  {galleryImages.map((num, idx) => (
                    <div
                      key={num}
                      className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentGalleryIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`/Gallery/${num}.${num === 6 ? 'jpeg' : 'jpg'}`}
                        alt={`Gallery slide ${num}`}
                        className="h-full w-full object-cover transition-transform duration-[2000ms] hover:scale-105"
                      />
                    </div>
                  ))}
                  <div className="absolute bottom-2 right-2 z-20 flex gap-1">
                    {galleryImages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`h-1 w-1 rounded-full transition-all ${idx === currentGalleryIndex ? "w-3 bg-white" : "bg-white/40"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </Card>

            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={!!selectedCert}
        onClose={() => setSelectedCert(null)}
        image={selectedCert?.image || ""}
        title={selectedCert?.title || ""}
      />
    </div>
  );
}
