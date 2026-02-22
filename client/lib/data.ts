export interface Project {
    slug: string;
    title: string;
    status?: string;
    description: string;
    tags: string[];
    link?: string;
    github?: string;
    image?: string;
    overview: string;
    challenge: string;
    solution: string;
    features: string[];
    technologies: string[];
}

export const projects: Project[] = [
    {
        slug: "acetrack",
        title: "ACETRACK",
        status: "Done",
        description: "Modern Student Attendance Tracking System",
        tags: ["Next.js", "TypeScript", "Supabase", "Shadcn UI"],
        link: "https://finalacetrack.vercel.app/",
        image: "/Graphics/acetrack_detail.png", // Placeholder based on image
        overview: "ACETRACK is a comprehensive attendance management system designed for school organizations. It streamlines the tracking process with QR code precision and real-time data management.",
        challenge: "Developing a reliable and fast QR code scanning mechanism that works across various mobile devices while ensuring data integrity in a high-concurrency environment during peak attendance hours.",
        solution: "Built using Next.js for a performant frontend and Supabase for real-time database capabilities. Implemented a robust QR scanning library and optimized database queries to handle multiple simultaneous check-ins.",
        features: [
            "Real-time student check-ins",
            "QR code generation and scanning",
            "Event management and tracking",
            "Detailed attendance reports",
            "Admin dashboard for overview"
        ],
        technologies: ["Next.js", "TypeScript", "Supabase", "Shadcn UI", "Tailwind CSS", "Zustand"]
    },
    {
        slug: "stayko",
        title: "StayKo",
        status: "In Progress",
        description: "Discover your next home with integrated road-following navigation, real-time travel estimates, and direct owner contact—all in one place.",
        tags: ["Next.js", "TypeScript", "Supabase", "Shadcn UI", "MapLibre", "OSRM"],
        link: "https://stayko.vercel.app/",
        image: "/Graphics/stayko_detail.png", // Placeholder
        overview: "StayKo is a property discovery platform that goes beyond simple listings by providing detailed navigation and travel estimates, making it easier for users to find the perfect stay.",
        challenge: "Integrating complex map services for road-following navigation and calculating accurate travel times between the user's current location and multiple property listings.",
        solution: "Used MapLibre for highly customizable mapping and OSRM (Open Source Routing Machine) for efficient routing calculations. Integrated Supabase for real-time property updates and owner communications.",
        features: [
            "Interactive map with property markers",
            "Road-following navigation",
            "Real-time travel estimates",
            "Direct chat with property owners",
            "Advanced property filtering"
        ],
        technologies: ["Next.js", "TypeScript", "Supabase", "MapLibre", "OSRM", "Shadcn UI"]
    },
    {
        slug: "aquanet",
        title: "AquaNet",
        status: "Done",
        description: "A CAPSTONE PROJECT: Mobile App for Water Quality Monitoring and Management",
        tags: ["Expo", "React Native", "Supabase", "Tailwind CSS"],
        image: "/Graphics/aquanet_detail.png", // Placeholder
        overview: "AquaNet is a mobile application developed as a capstone project to monitor and manage water quality in real-time, providing crucial data for environmental management.",
        challenge: "Synchronizing data from various IoT sensors to a mobile platform with low latency and creating an intuitive visualization for complex water quality metrics.",
        solution: "Developed with React Native and Expo for cross-platform compatibility. Leveraged Supabase's real-time subscriptions to receive immediate sensor data and used specialized charting libraries for data visualization.",
        features: [
            "Real-time water quality monitoring",
            "Sensor data visualization",
            "Historical data analysis",
            "Alert system for critical levels",
            "Location-based monitoring"
        ],
        technologies: ["React Native", "Expo", "Supabase", "Tailwind CSS", "IoT Integration"]
    },
    // {
    //     slug: "transitmaster",
    //     title: "TransitMaster",
    //     status: "Done",
    //     description: "TransitMaster is a school vehicle management system for real-time monitoring, route planning, and usage analytics to keep transportation safe and organized.",
    //     tags: ["React", "Express", "Mapbox", "IoT"],
    //     image: "/Graphics/transitmaster_main.png", // Based on image
    //     overview: "TransitMaster is a comprehensive vehicle management system designed specifically for schools. It provides real-time GPS tracking, intelligent route planning, and detailed usage analytics to ensure safe and efficient school transportation.",
    //     challenge: "Integrating real-time GPS data from multiple vehicles, displaying them on interactive maps, and providing route optimization for multiple bus routes running simultaneously presented significant technical challenges.",
    //     solution: "Built a React frontend with Mapbox for real-time vehicle tracking and route visualization. Connected IoT devices on vehicles to an Express backend that processes location data in real-time. Implemented efficient route optimization algorithms using geographic data.",
    //     features: [
    //         "Real-time GPS tracking of all vehicles",
    //         "Interactive map visualization with Mapbox",
    //         "Intelligent route optimization",
    //         "Driver and admin dashboards",
    //         "Usage analytics and reports"
    //     ],
    //     technologies: ["React", "Express.js", "Mapbox API", "IoT/GPS hardware", "WebSocket for real-time updates", "Node.js"]
    // }
];
