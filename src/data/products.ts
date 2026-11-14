export type ProductCategory =
  | "Systems"
  | "Components"
  | "Spares"
  | "Material handling"
  | "Services";

export type Product = {
  name: string;
  image: string;
  category: ProductCategory;
  description: string;
  range: string[];
  applications: string[];
  specifications?: { label: string; value: string }[];
};

export const products: Product[] = [
  {
    name: "SKE Fogging Systems",
    image: "ske_fogging_logo.jpg",
    category: "Systems",
    description: "High-pressure fogging systems for textile facilities.",
    range: ["High-pressure fogging systems"],
    applications: ["Fogging requirements in textile production facilities"],
  },
  {
    name: "SRM Technologies",
    image: "srm_logo.jpg",
    category: "Components",
    description:
      "Compact lattice aprons, flocked clearer rollers and Auto doffing spares.",
    range: [
      "Compact system spares",
      "Lattice aprons for all compact systems",
      "Flocked clearer rollers",
      "Auto doffing spares for Rieter, LMW and KTTM",
    ],
    applications: ["Textile machinery maintenance", "Component replacement"],
  },
  {
    name: "Rotorcraft",
    image: "rotorcraft_logo.jpg",
    category: "Systems",
    description:
      "Swiss compact spinning technology with mechanical yarn compacting and energy-efficient GreenCompact systems.",
    range: ["GreenCompact systems"],
    applications: ["Yarn compacting"],
  },
  {
    name: "Jumac",
    image: "jumac_logo.jpg",
    category: "Material handling",
    description:
      "Sliver cans, springs, castors, and material-handling accessories.",
    range: ["Sliver cans", "Can springs and castors", "Can accessories"],
    applications: [
      "Sliver collection and handling",
      "Movement between textile production processes",
    ],
  },
  {
    name: "Skaat",
    image: "skaat_logo.jpg",
    category: "Systems",
    description: "Digital slub, air slub, and fancy yarn technology.",
    range: [
      "Digital Slub and Air Slub",
      "Multi count, Multi twist and Multi effect",
      "Platinum Core systems",
    ],
    applications: [
      "Fancy yarn development",
      "Yarn effects and drafting applications",
    ],
  },
  {
    name: "Sagotharen",
    image: "sagotharen_logo.jpg",
    category: "Components",
    description:
      "Polyester and polyamide spindle tapes, joining kits, and presses.",
    range: [
      "Polyester spindle tapes",
      "Polyamide synthetic sandwich tapes",
      "Joining kits and joining presses",
    ],
    applications: [
      "Spindle drive applications",
      "Tape replacement and joining",
    ],
  },
  {
    name: "Saurer",
    image: "saurer_logo.jpg",
    category: "Components",
    description:
      "Drafting systems, spindles, bearings, and textile components.",
    range: [
      "Drafting systems",
      "Spindles and bearings",
      "Lubrication equipment",
      "All types of Bottom Rollers",
    ],
    applications: [
      "Textile machinery maintenance",
      "Drafting and component upgrades",
    ],
  },
  {
    name: "Wishark & Brujas",
    image: "wishark_brujas_logo.jpg",
    category: "Components",
    description: "Card clothing for textile production.",
    range: [
      "Cylinder wire",
      "Doffer wire",
      "Licker-in wire",
      "Flat tops",
      "Stationary tops",
      "Blow room wire",
      "Cleaning Fillets",
    ],
    applications: [
      "Textile fibre opening and cleaning",
      "Card clothing replacement",
    ],
  },
  {
    name: "JR Electronics & Services",
    image: "jrs_logo.jpg",
    category: "Services",
    description:
      "Sales and services of electrical and electronic components for textile industry.",
    range: [
      "PLC and VFD repair",
      "Servo-drive and motor repair",
      "Automation and field services",
      "All types of HMI repairing and conversion",
    ],
    applications: [
      "Electrical and electronic troubleshooting",
      "Machinery repair and service",
    ],
  },
  {
    name: "Kanai",
    image: "kanai_logo.jpg",
    category: "Components",
    description: "Rings and ring travellers.",
    range: ["Rings and ring travellers"],
    applications: [
      "Used across textile spinning mills for cotton, synthetic fibers, and blended yarns.",
    ],
  },
  {
    name: "AGMA",
    image: "agma_logo.jpg",
    category: "Components",
    description: "Cradles and spacers for quality yarn.",
    range: ["Drafting cradles", "Single spacers", "Twin spacers"],
    applications: [
      "Cotton, viscose, and blended-fibre processing",
      "Drafting component selection",
    ],
  },
  {
    name: "Basant Fibertek",
    image: "basant_fibertek_logo.jpg",
    category: "Components",
    description:
      "Precision pinned products for textile preparation, weaving, finishing, and nonwovens.",
    range: [
      "Pins, needles, and pinned rollers",
      "Spiked lattice for blow room",
      "Spiked bars for blow room and carding",
      "Open end rotors and opening rollers",
    ],
    applications: ["Fibre preparation"],
  },
  {
    name: "Fiberplus",
    image: "fiberplus_logo.jpg",
    category: "Systems",
    description:
      'Fiber Plus "Eco-Spin" Suction Compact Spinning System For All Type of Ring Frames.',
    range: ["Suction compact systems"],
    applications: ["For compacting fibers"],
  },
  {
    name: "White Plaast",
    image: "white_plaast_logo.jpg",
    category: "Material handling",
    description: "Bobbins, tubes, cones, dye cheeses and Doff box (crates).",
    range: [
      "Simplex bobbins and yarn tubes",
      "Solid and perforated cones",
      "Dye cheeses, yarn carriers and crates",
    ],
    applications: [
      "Yarn winding and handling",
      "Yarn dyeing and package handling",
    ],
  },
];
