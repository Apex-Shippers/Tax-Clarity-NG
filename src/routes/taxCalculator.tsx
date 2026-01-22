import { useState, useMemo } from "react";

// --- Helper: Currency Formatter ---
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("NGN", "₦");
};

// --- Helper: Format Input Display (with commas) ---
const formatNumberInput = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export default function TaxCalculator() {
  // State
  const [grossIncome, setGrossIncome] = useState<number>(0);
  const [pensionRate, setPensionRate] = useState<number>(0);

  // --- Calculations ---
  const calculations = useMemo(() => {
    // 1. Pension
    const annualPension = (grossIncome * pensionRate) / 100;

    // 2. Consolidated Relief Allowance (CRA)
    // Higher of 200k or 1% of Gross + 20% of Gross
    const craFixed = 200000;
    const craOnePercent = grossIncome * 0.01;
    const effectiveFixed = Math.max(craFixed, craOnePercent);
    const craVariable = grossIncome * 0.2;
    const cra = effectiveFixed + craVariable;

    // 3. Taxable Income
    // Gross - Pension - CRA (simplified for standard computation)
    const taxableIncome = Math.max(0, grossIncome - annualPension - cra);

    // 4. PAYE Tax Calculation (Nigerian Tax Bands)
    let tax = 0;
    let taxable = taxableIncome;

    // Band 1: First 300k @ 7%
    if (taxable > 0) {
      const amount = Math.min(taxable, 300000);
      tax += amount * 0.07;
      taxable -= amount;
    }
    // Band 2: Next 300k @ 11%
    if (taxable > 0) {
      const amount = Math.min(taxable, 300000);
      tax += amount * 0.11;
      taxable -= amount;
    }
    // Band 3: Next 500k @ 15%
    if (taxable > 0) {
      const amount = Math.min(taxable, 500000);
      tax += amount * 0.15;
      taxable -= amount;
    }
    // Band 4: Next 500k @ 19%
    if (taxable > 0) {
      const amount = Math.min(taxable, 500000);
      tax += amount * 0.19;
      taxable -= amount;
    }
    // Band 5: Next 1.6M @ 21%
    if (taxable > 0) {
      const amount = Math.min(taxable, 1600000);
      tax += amount * 0.21;
      taxable -= amount;
    }
    // Band 6: Above 3.2M @ 24%
    if (taxable > 0) {
      tax += taxable * 0.24;
    }

    const annualTax = tax;
    const monthlyTax = annualTax / 12;

    // Net Income
    const annualNet = grossIncome - annualPension - annualTax;
    const monthlyNet = annualNet / 12;

    return {
      annualPension,
      cra,
      taxableIncome,
      annualTax,
      monthlyTax,
      annualNet,
      monthlyNet,
    };
  }, [grossIncome, pensionRate]);

  // --- Slider Handler ---
  const getSliderStyle = (value: number, min: number, max: number) => {
    const percentage = ((value - min) / (max - min)) * 100;
    return {
      background: `linear-gradient(to right, #00D64F 0%, #00D64F ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
    };
  };

  // --- Donut Chart Logic (Rotation Method) ---
  const totalForChart =
    calculations.annualNet +
    calculations.annualPension +
    calculations.annualTax;

  // SAFETY CHECK: Prevent division by zero if total is 0
  const safeTotal = totalForChart > 0 ? totalForChart : 1;

  // 1. Calculate Percentages
  const pNet = (calculations.annualNet / safeTotal) * 100;
  const pPension = (calculations.annualPension / safeTotal) * 100;
  const pTax = (calculations.annualTax / safeTotal) * 100;

  // 2. SVG Geometry
  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  // 3. Calculate Stroke Offsets (Length of the arc)
  // Formula: circumference - (percent/100 * circumference)
  const netStrokeOffset = circumference - (pNet / 100) * circumference;
  const pensionStrokeOffset = circumference - (pPension / 100) * circumference;
  const taxStrokeOffset = circumference - (pTax / 100) * circumference;

  // 4. Calculate Rotation Angles (Start position of the arc)
  // All start at -90deg (12 o'clock). We rotate subsequent circles to start where the previous ended.
  const netRotation = -90;
  const pensionRotation = netRotation + pNet * 3.6; // 3.6 = 360deg / 100%
  const taxRotation = pensionRotation + pPension * 3.6;

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12 font-sans">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-[3.5rem] font-bold text-[#006838] mb-3 tracking-tight">
          Tax Estimator
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-normal">
          Estimate your PAYE/Personal Income Tax liability.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Income Details */}
        <div className="bg-white rounded-4xl p-6 md:p-10 border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Income Details</h2>
          </div>

          {/* Annual Gross Income Input */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-lg text-gray-700 font-medium">
                Annual Gross Income
              </label>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(grossIncome)}
              </span>
            </div>

            {/* Custom Range Slider */}
            <input
              type="range"
              min="0"
              max="100000000"
              step="100000"
              value={grossIncome}
              onChange={(e) => setGrossIncome(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-6"
              style={getSliderStyle(grossIncome, 100000, 100000000)}
            />

            {/* Styles for Webkit slider thumb */}
            <style>{`
              input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #00D64F;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
              input[type=range]::-moz-range-thumb {
                height: 24px;
                width: 24px;
                border-radius: 50%;
                background: #ffffff;
                border: 2px solid #00D64F;
                cursor: pointer;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              }
            `}</style>

            {/* Text Input */}
            <div className="relative">
              <input
                type="text"
                value={formatNumberInput(grossIncome)}
                onChange={(e) => {
                  const val = Number(e.target.value.replace(/,/g, ""));
                  if (!isNaN(val)) setGrossIncome(val);
                }}
                className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
              />
            </div>
          </div>

          {/* Pension Contribution */}
          <div className="mb-8">
            <div className="flex justify-between items-end mb-4">
              <label className="text-lg text-gray-700 font-medium">
                Pension Contribution (%)
              </label>
              <span className="text-lg font-bold text-gray-900">
                {pensionRate}%
              </span>
            </div>

            <input
              type="range"
              min="0"
              max="20" // Slider limited to 20%
              step="1"
              value={pensionRate}
              onChange={(e) => setPensionRate(Number(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer mb-3"
              style={getSliderStyle(pensionRate, 0, 20)}
            />

            {/* Pension Input Field */}
            <div className="relative mb-3">
              <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                <span className="text-gray-500 font-medium">%</span>
              </div>
              <input
                type="number"
                min="0"
                max="100"
                value={pensionRate}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  // Allow free typing but maybe clamp on blur if needed.
                  // For now, simple binding allows flexibility.
                  setPensionRate(val);
                }}
                className="w-full px-4 py-3 text-gray-700 border border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all bg-white"
              />
            </div>

            <p className="text-gray-400 text-sm">
              Standard employee contribution is 8%.
            </p>
          </div>

          {/* Breakdown Summary Box */}
          <div className="bg-[#F9FAFB] rounded-2xl p-6 space-y-3">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-600 font-medium">
                Consolidated Relief (CRA):
              </span>
              <span className="text-gray-900 font-bold font-mono">
                {formatCurrency(calculations.cra)}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="text-gray-600 font-medium">Taxable Income:</span>
              <span className="text-gray-900 font-bold font-mono">
                {formatCurrency(calculations.taxableIncome)}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Breakdown Card */}
        <div className="bg-[#0D1225] text-white rounded-4xl p-6 md:p-10 shadow-xl min-h-150 flex flex-col justify-between relative overflow-hidden">
          <div>
            <h2 className="text-2xl font-bold mb-10">Breakdown</h2>

            {/* Donut Chart Container */}
            <div className="flex justify-center mb-10 relative">
              <div className="relative w-64 h-64">
                {/* SVG Chart */}
                <svg width="100%" height="100%" viewBox="0 0 160 160">
                  {/* Background Track */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#1F2937"
                    strokeWidth="20"
                  />

                  {/* Net Income (Green) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#00D64F"
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={netStrokeOffset}
                    transform={`rotate(${netRotation} 80 80)`}
                    style={{
                      transition:
                        "stroke-dashoffset 0.5s ease, transform 0.5s ease",
                    }}
                  />

                  {/* Pension (Yellow) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#FFC107"
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={pensionStrokeOffset}
                    transform={`rotate(${pensionRotation} 80 80)`}
                    style={{
                      transition:
                        "stroke-dashoffset 0.5s ease, transform 0.5s ease",
                    }}
                  />

                  {/* Tax (Red) */}
                  <circle
                    cx="80"
                    cy="80"
                    r={radius}
                    fill="transparent"
                    stroke="#FF5252"
                    strokeWidth="20"
                    strokeDasharray={circumference}
                    strokeDashoffset={taxStrokeOffset}
                    transform={`rotate(${taxRotation} 80 80)`}
                    style={{
                      transition:
                        "stroke-dashoffset 0.5s ease, transform 0.5s ease",
                    }}
                  />
                </svg>

                {/* Inner Hole (Dark Background) */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-32 h-32 bg-[#0D1225] rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-6 mb-12 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00D64F]"></span>
                <span className="text-green-500">Net Income</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FFC107]"></span>
                <span className="text-yellow-500">Pension</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF5252]"></span>
                <span className="text-red-500">Tax</span>
              </div>
            </div>
          </div>

          {/* Results Footer */}
          <div className="space-y-4">
            {/* Net Monthly Income Box */}
            <div className="bg-[#1A2035] rounded-xl p-4 flex justify-between items-center border border-[#2D3748]">
              <span className="text-[#00D64F] font-medium text-lg">
                Net Monthly Income
              </span>
              <span className="text-white font-bold text-2xl font-mono">
                {formatCurrency(Math.round(calculations.monthlyNet))}
              </span>
            </div>

            {/* Monthly Tax Box */}
            <div className="bg-[#1A2035] rounded-xl p-4 flex justify-between items-center border border-[#2D3748]">
              <span className="text-[#FF5252] font-medium text-lg">
                Monthly Tax
              </span>
              <span className="text-white font-bold text-lg font-mono">
                {formatCurrency(Math.round(calculations.monthlyTax))}
              </span>
            </div>

            <p className="text-gray-500 text-xs mt-6 leading-relaxed">
              Estimates based on standard computations. Actual liability may
              vary based on other reliefs (NHF, Life Assurance, etc).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
