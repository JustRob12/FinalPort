"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ChevronLeft,
    Github,
    ExternalLink,
    CheckCircle2,
    ArrowRight,
    Monitor,
    Lightbulb,
    Award,
    Globe,
    Code2
} from "lucide-react";
import { projects } from "@/lib/data";

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const project = projects.find((p) => p.slug === slug);

    if (!project) {
        notFound();
    }

    const relatedProjects = projects.filter((p) => p.slug !== slug).slice(0, 2);

    return (
        <div className="min-h-screen bg-white py-10 font-['Inter',sans-serif] text-black dark:bg-[#0a0a0a] dark:text-white">
            <div className="mx-auto max-w-4xl px-4">

                {/* Back Navigation */}
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors mb-8 group"
                >
                    <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                    Back to Portfolio
                </Link>

                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-full border border-gray-200 bg-white px-3 py-0.5 text-xs font-medium text-black dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-white shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">{project.title}</h1>
                    <p className="text-lg text-black/70 dark:text-white/70 leading-relaxed max-w-3xl">
                        {project.description}
                    </p>
                </div>

                {/* Project Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gray-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 mb-10 shadow-lg">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={project.image || "/placeholder-project.png"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-16">
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md"
                        >
                            <Globe size={18} />
                            Visit Website
                        </a>
                    )}
                    {project.github && (
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#111111] dark:text-white dark:hover:bg-neutral-800 shadow-sm"
                        >
                            <Github size={18} />
                            View Code
                        </a>
                    )}
                    {!project.github && (
                        <button
                            disabled
                            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-black/40 cursor-not-allowed dark:border-neutral-800 dark:bg-[#111111] dark:text-white/40 shadow-sm"
                        >
                            <Code2 size={18} />
                            Code Private
                        </button>
                    )}
                </div>

                <hr className="border-gray-100 dark:border-neutral-900 mb-16" />

                {/* Detailed Content */}
                <div className="space-y-16">
                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Overview</h2>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-lg">
                            {project.overview}
                        </p>
                    </section>

                    {/* The Challenge */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">The Challenge</h2>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-lg">
                            {project.challenge}
                        </p>
                    </section>

                    {/* The Solution */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">The Solution</h2>
                        <p className="text-black/70 dark:text-white/70 leading-relaxed text-lg">
                            {project.solution}
                        </p>
                    </section>

                    {/* Key Features */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Key Features</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {project.features.map((feature, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle2 size={20} className="text-black dark:text-white mt-1 shrink-0" />
                                    <span className="text-black/70 dark:text-white/70 leading-tight py-0.5">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Technologies Used */}
                    <section>
                        <h2 className="text-2xl font-bold mb-6">Technologies Used</h2>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="rounded-md border border-gray-200 bg-neutral-50 px-3 py-1.5 text-sm font-medium text-black dark:border-neutral-800 dark:bg-[#1a1a1a] dark:text-white"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>

                <hr className="border-gray-100 dark:border-neutral-900 my-16" />

                {/* Related Projects */}
                <section className="pb-20">
                    <h2 className="text-2xl font-bold mb-8">Related Projects</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {relatedProjects.map((rp) => (
                            <Link
                                key={rp.slug}
                                href={`/projects/${rp.slug}`}
                                className="group block rounded-2xl border border-gray-200 p-6 bg-white hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#111111] dark:hover:bg-neutral-900 transition-all shadow-sm"
                            >
                                <div className="aspect-video w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-800 mb-4">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={rp.image || "/placeholder-project.png"}
                                        alt={rp.title}
                                        className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500"
                                    />
                                </div>
                                <h3 className="text-lg font-bold mb-2 group-hover:underline">{rp.title}</h3>
                                <p className="text-sm text-black/60 dark:text-white/60 mb-4 line-clamp-2">
                                    {rp.description}
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {rp.tags.slice(0, 3).map((tag) => (
                                        <span key={tag} className="text-[10px] font-medium border border-gray-200 dark:border-neutral-800 px-1.5 rounded-sm">
                                            {tag}
                                        </span>
                                    ))}
                                    {rp.tags.length > 3 && (
                                        <span className="text-[10px] font-medium border border-gray-200 dark:border-neutral-800 px-1.5 rounded-sm">
                                            +{rp.tags.length - 3}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    );
}
