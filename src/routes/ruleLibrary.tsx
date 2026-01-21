interface Tag {
  label: string;
  type: "primary" | "secondary";
}

interface Rule {
  id: number;
  title: string;
  description: string;
  tags: Tag[];
}

const taxRules: Rule[] = [
  {
    id: 1,
    title: "Consolidated Relief Allowance (CRA)",
    description:
      "An allowance granted to reduce taxable income, calculated as ₦200,000 or 1% of gross income (whichever is higher) plus 20% of gross income.",
    tags: [
      { label: "Personal Income Tax", type: "primary" },
      { label: "Relief", type: "secondary" },
      { label: "Individual", type: "secondary" },
    ],
  },
  {
    id: 2,
    title: "Value Added Tax Exemptions",
    description:
      "Basic food items, medical products, books, and educational materials are exempt from VAT.",
    tags: [
      { label: "VAT", type: "primary" },
      { label: "Business", type: "secondary" },
      { label: "Consumption", type: "secondary" },
    ],
  },
  {
    id: 3,
    title: "Small Company Exemption",
    description:
      "Companies with turnover less than ₦25 million are exempt from paying Companies Income Tax (CIT).",
    tags: [
      { label: "Company Tax", type: "primary" },
      { label: "SME", type: "secondary" },
      { label: "Zero Tax", type: "secondary" },
    ],
  },
  {
    id: 4,
    title: "WHT Rates",
    description:
      "Rates vary between 5% and 10% depending on the transaction type and beneficiary status.",
    tags: [
      { label: "Video Call", type: "primary" },
      { label: "Deduction", type: "secondary" },
      { label: "Compliance", type: "secondary" },
    ],
  },
  {
    id: 5,
    title: "Direct Assessment",
    description:
      "Tax paid by self-employed individuals directly to the state government where they reside.",
    tags: [
      { label: "Video Call", type: "primary" },
      { label: "Freelance", type: "secondary" },
      { label: "Self-Employed", type: "secondary" },
    ],
  },
];

export default function RuleLibrary() {
  return (
    <div className="w-full max-w-250 mx-auto px-4 py-12 md:py-16">
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-green mb-4">
          Rule Library
        </h1>
        <p className="text-lg md:text-xl text-gray font-normal">
          Nigerian tax laws translated into plain English.
        </p>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-6">
        {taxRules.map((rule) => (
          <div
            key={rule.id}
            className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.02)] hover:shadow-md transition-shadow"
          >
            {/* Tags Row */}
            <div className="flex flex-wrap gap-3 mb-4">
              {rule.tags.map((tag, index) => (
                <span
                  key={index}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium border ${
                    tag.type === "primary"
                      ? "bg-veryLightGreen text-green border-lightGreen"
                      : "bg-white text-gray-600 border-gray-400"
                  }`}
                >
                  {tag.label}
                </span>
              ))}
            </div>

            {/* Content */}
            <h2 className="text-xl md:text-2xl font-bold text-green mb-3">
              {rule.title}
            </h2>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
              {rule.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}