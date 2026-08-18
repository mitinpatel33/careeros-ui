export type TemplateCategory = "classic" | "photo" | "modern";

export interface ResumeTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  rank: number;
  tagline: string;
  accent: string; // hex used for the mock thumbnail + chip color
}

const TOTAL = 18;

// Swap `thumbnail` generation for real preview images/renders whenever
// you have them — for now these are lightweight placeholders so the
// gallery is fully wired up and testable end to end.
export const RESUME_TEMPLATES: ResumeTemplate[] = [
  { id: "multicolor", name: "MultiColor", category: "modern", rank: 1, tagline: "A contemporary, colorful template adding a modern touch to a classic layout.", accent: "#2563eb" },
  { id: "standout", name: "StandOut", category: "modern", rank: 2, tagline: "A visually striking design that commands attention.", accent: "#0ea5e9" },
  { id: "visionary", name: "Visionary", category: "photo", rank: 3, tagline: "Paint a picture of your future success with a forward-thinking resume.", accent: "#7c3aed" },
  { id: "artistic", name: "Artistic", category: "modern", rank: 4, tagline: "A customizable, user-friendly template perfect for personalization.", accent: "#16a34a" },
  { id: "soothing", name: "Soothing", category: "classic", rank: 5, tagline: "A clean, minimalist template that showcases technical expertise.", accent: "#0f172a" },
  { id: "maverick", name: "Maverick", category: "photo", rank: 6, tagline: "Break free from the ordinary with a resume that reflects your style.", accent: "#db2777" },
  { id: "executive", name: "Executive", category: "classic", rank: 7, tagline: "A comprehensive, balanced template emphasizing skills and experience.", accent: "#1e293b" },
  { id: "superb", name: "Superb", category: "classic", rank: 8, tagline: "A well-organized template that highlights your unique skills.", accent: "#334155" },
  { id: "trailblazer", name: "Trailblazer", category: "photo", rank: 9, tagline: "Blaze your own path to career success with a groundbreaking resume.", accent: "#ea580c" },
  { id: "basic", name: "Basic", category: "classic", rank: 10, tagline: "A classic, clean template ideal for traditional industries.", accent: "#475569" },
  { id: "vertex", name: "Vertex", category: "modern", rank: 11, tagline: "A sleek, two-column structure engineered for confident storytelling.", accent: "#0891b2" },
  { id: "magnetic", name: "Magnetic", category: "photo", rank: 12, tagline: "Attract your dream job with a resume that's as captivating as a magnet.", accent: "#9333ea" },
  { id: "classic-elite", name: "Classic", category: "classic", rank: 13, tagline: "A timeless, well-structured template that prioritizes clarity.", accent: "#1e40af" },
  { id: "stylish", name: "Stylish", category: "photo", rank: 14, tagline: "A sleek, polished design with subtle flair for a refined look.", accent: "#be185d" },
  { id: "contemporary", name: "Contemporary", category: "modern", rank: 15, tagline: "A fresh, modern layout blending clean lines with a professional touch.", accent: "#059669" },
  { id: "prism", name: "Prism", category: "modern", rank: 16, tagline: "Reflect your diverse talents through a multi-faceted layout.", accent: "#4f46e5" },
  { id: "ledger", name: "Ledger", category: "classic", rank: 17, tagline: "A structured, authoritative layout that proves your value.", accent: "#374151" },
  { id: "summit", name: "Summit", category: "classic", rank: 18, tagline: "Rise above the competition with a streamlined layout.", accent: "#0f766e" },
];

export const CATEGORY_LABELS: Record<"all" | TemplateCategory, string> = {
  all: "All Templates",
  classic: "Classic Templates",
  photo: "Photo Templates",
  modern: "Modern Templates",
};

export const TEMPLATE_TOTAL = TOTAL;
