export type ProductCategory = "Systems" | "Components" | "Material handling" | "Services" | "Product enquiries";

export type Product = {
  name: string;
  image: string;
  category: ProductCategory;
  description: string;
  range: string[];
  applications: string[];
  specifications?: { label: string; value: string }[];
  manufacturerUrl?: string;
};

export const products: Product[] = [
  {
    name: "SKE Fogging Systems", image: "ske_fogging_logo.jpg", category: "Systems",
    description: "High-pressure fogging systems for textile facilities.",
    range: ["High-pressure fogging systems"],
    applications: ["Fogging requirements in textile production facilities"],
  },
  {
    name: "SRM Technologies", image: "srm_logo.jpg", category: "Components",
    description: "Lattice aprons, clearer rollers, and monitoring systems.",
    range: ["Compact system spares", "Lattice aprons and clearer rollers", "Spindle monitoring systems"],
    applications: ["Textile machinery maintenance", "Component replacement and monitoring"],
  },
  {
    name: "Rotorcraft", image: "rotorcraft_logo.jpg", category: "Systems",
    description: "GreenCompact systems, compact drafting solutions, and textile components.",
    range: ["GreenCompact systems", "Compact drafting solutions", "Top arms and spindle lubrication"],
    applications: ["Yarn compacting", "Drafting and machinery upgrades"],
    manufacturerUrl: "https://www.swisstextilemachinery.ch/our-members/rotorcraft-ag",
  },
  {
    name: "Jumac", image: "jumac_logo.jpg", category: "Material handling",
    description: "Sliver cans, springs, castors, and material-handling accessories.",
    range: ["Sliver cans", "Can springs and castors", "Can accessories"],
    applications: ["Sliver collection and handling", "Movement between textile production processes"],
    manufacturerUrl: "https://www.jumaccans.com/product/spinning-cans/",
  },
  {
    name: "Skaat", image: "skaat_logo.jpg", category: "Systems",
    description: "Digital slub, air slub, and fancy yarn technology.",
    range: ["Digital Slub and Air Slub", "E-Draft and Colour Slub", "Core Platinum systems"],
    applications: ["Fancy yarn development", "Yarn effects and drafting applications"],
    manufacturerUrl: "https://www.skaatindia.com/products.html",
  },
  {
    name: "Sagotharen", image: "sagotharen_logo.jpg", category: "Components",
    description: "Polyester and polyamide spindle tapes, joining kits, and presses.",
    range: ["Polyester spindle tapes", "Polyamide synthetic sandwich tapes", "Joining kits and joining presses"],
    applications: ["Spindle drive applications", "Tape replacement and joining"],
    specifications: [
      { label: "Polyester reference grades", value: "NSP-8 / NSW-8" },
      { label: "Published tape thickness", value: "0.70 mm (NSP-8 / NSW-8)" },
      { label: "Joining method", value: "Adhesive-free finger joint (NSP-8 / NSW-8)" },
    ],
    manufacturerUrl: "https://www.sagotharen.com/products.html",
  },
  {
    name: "Saurer", image: "saurer_logo.jpg", category: "Components",
    description: "Drafting systems, spindles, bearings, and textile components.",
    range: ["Drafting systems", "Spindles and bearings", "Rings, travellers, and lubrication equipment"],
    applications: ["Textile machinery maintenance", "Drafting and component upgrades"],
    manufacturerUrl: "https://saurer.com/en",
  },
  {
    name: "Wishark & Brujas", image: "wishark_brujas_logo.jpg", category: "Components",
    description: "Card clothing for textile production.",
    range: ["Card clothing"],
    applications: ["Textile fibre preparation", "Card clothing replacement"],
  },
  {
    name: "JR Electronics & Services", image: "jrs_logo.jpg", category: "Services",
    description: "PLC, VFD, HMI, servo-drive, and motor repair services.",
    range: ["PLC, VFD, and HMI repair", "Servo-drive and motor repair", "Automation and field services"],
    applications: ["Electrical and electronic troubleshooting", "Machinery repair and service enquiries"],
    manufacturerUrl: "https://www.jrelectronicsandservices.com/",
  },
  {
    name: "Kanai", image: "kanai_logo.jpg", category: "Components",
    description: "Rings, travellers, card clothing, and metallic wire.",
    range: ["Rings and travellers", "Card clothing", "Metallic wire"],
    applications: ["Yarn production components", "Fibre preparation and carding"],
    manufacturerUrl: "https://www.kanaijuyo.co.jp/english/business/textilemacinery/",
  },
  {
    name: "AGMA", image: "agma_logo.jpg", category: "Components",
    description: "Cradles and spacers for textile drafting applications.",
    range: ["Drafting cradles", "Single spacers", "Twin spacers"],
    applications: ["Cotton, viscose, and blended-fibre processing", "Drafting component selection"],
    manufacturerUrl: "https://agmaproducts.com/our-products/",
  },
  {
    name: "Basant Fibertek", image: "basant_fibertek_logo.jpg", category: "Components",
    description: "Precision pinned products for textile preparation, weaving, finishing, and nonwovens.",
    range: ["Pins, needles, and pinned rollers", "Temple cylinders for weaving", "Stenter pin plates and nonwoven components"],
    applications: ["Fibre preparation and recycling", "Weaving, fabric finishing, and nonwoven production"],
    manufacturerUrl: "https://www.bwipins.com/",
  },
  {
    name: "Fiberplus", image: "fiberplus_logo.jpg", category: "Product enquiries",
    description: "Speak with our team about Fiberplus product information and availability.",
    range: ["Product details available from our team"],
    applications: ["Share your machine details and requirements for guidance"],
  },
  {
    name: "White Plaast", image: "white_plaast_logo.jpg", category: "Material handling",
    description: "Bobbins, tubes, cones, and dye cheeses for textile yarn handling.",
    range: ["Simplex bobbins and yarn tubes", "Solid and perforated cones", "Dye cheeses and yarn carriers"],
    applications: ["Yarn winding and handling", "Yarn dyeing and package handling"],
    manufacturerUrl: "https://www.whiteplast.com/yarncarriers",
  },
];
