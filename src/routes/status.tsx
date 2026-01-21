import { useEffect, useState } from "react";
import { Link } from "react-router";

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

export default function Status() {
  const [calculations, setCalculations] = useState<any>(null);

  useEffect(() => {
    const data = localStorage.getItem('taxCalculations');
    if (data) {
      setCalculations(JSON.parse(data));
    }
  }, []);

  if (!calculations) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 py-8 md:py-12 font-sans text-center">
        <p>No tax data found. Please use the Tax Estimator first.</p>
        <Link to="/tax-calculator" className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block">
          Go to Tax Estimator
        </Link>
      </div>
    );
  }

  // Donut Chart Logic (same as calculator)
  const totalForChart =
    calculations.annualNet +
    calculations.annualPension +
    calculations.annualTax;
    
  const safeTotal = totalForChart > 0 ? totalForChart : 1;

  const pNet = (calculations.annualNet / safeTotal) * 100;
  const pPension = (calculations.annualPension / safeTotal) * 100;
  const pTax = (calculations.annualTax / safeTotal) * 100;

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  const netStrokeOffset = circumference - (pNet / 100) * circumference;
  const pensionStrokeOffset = circumference - (pPension / 100) * circumference;
  const taxStrokeOffset = circumference - (pTax / 100) * circumference;

  const netRotation = -90;
  const pensionRotation = netRotation + pNet * 3.6;
  const taxRotation = pensionRotation + pPension * 3.6;

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 py-8 md:py-12 font-sans">
      {/* Header */}
      <div className="text-center mb-10 md:mb-16">
        <h1 className="text-4xl md:text-[3.5rem] font-bold text-[#006838] mb-3 tracking-tight">
          Your Tax Status
        </h1>
        <p className="text-gray-500 text-lg md:text-xl font-normal">
          Breakdown of your tax estimation and insights.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* LEFT COLUMN: Data Analysis */}
        <div className="bg-white rounded-[32px] p-6 md:p-10 border border-gray-100 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Analysis</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>Monthly Income:</strong> {formatCurrency(calculations.monthlyIncome)}</p>
            <p><strong>Annual Gross Income:</strong> {formatCurrency(calculations.grossIncome)}</p>
            <p><strong>Annual Tax:</strong> {formatCurrency(calculations.annualTax)}</p>
            <p><strong>Monthly Tax:</strong> {formatCurrency(calculations.monthlyTax)}</p>
            <p><strong>Net Monthly Income:</strong> {formatCurrency(calculations.monthlyNet)}</p>
            <p><strong>Pension Contribution:</strong> {calculations.pensionRate}% ({formatCurrency(calculations.annualPension)} annually)</p>
            <p><strong>Taxable Income:</strong> {formatCurrency(calculations.taxableIncome)} (after CRA of {formatCurrency(calculations.cra)})</p>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Tips and Suggestions</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Consider increasing your pension contribution for better retirement savings.</li>
              <li>Explore additional tax reliefs like NHF or Life Assurance to reduce your taxable income.</li>
              <li>Review your income sources to optimize your tax bracket.</li>
              <li>Consult a tax professional for personalized advice.</li>
            </ul>
          </div>
          <div className="mt-8">
            <Link
              to="/tax-calculator"
              className="bg-[#00D64F] hover:bg-[#00B844] text-white font-medium px-6 py-3 rounded-lg transition-colors inline-block"
            >
              Back to Tax Estimator
            </Link>
          </div>
        </div>

        {/* RIGHT COLUMN: Chart Breakdown */}
        <div className="bg-[#0D1225] text-white rounded-[32px] p-6 md:p-10 shadow-xl min-h-[600px] flex flex-col justify-between relative overflow-hidden">
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

                {/* Inner Hole */}
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
            <div className="bg-[#1A2035] rounded-xl p-4 flex justify-between items-center border border-[#2D3748]">
              <span className="text-[#00D64F] font-medium text-lg">
                Net Monthly Income
              </span>
              <span className="text-white font-bold text-2xl font-mono">
                {formatCurrency(Math.round(calculations.monthlyNet))}
              </span>
            </div>

            <div className="bg-[#1A2035] rounded-xl p-4 flex justify-between items-center border border-[#2D3748]">
              <span className="text-[#FF5252] font-medium text-lg">
                Monthly Tax
              </span>
              <span className="text-white font-bold text-lg font-mono">
                {formatCurrency(Math.round(calculations.monthlyTax))}
              </span>
            </div>

            <p className="text-gray-500 text-xs mt-6 leading-relaxed">
              *Estimates based on standard computations. Actual liability may vary.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}