import { Link } from "react-router";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Understand Your
              <span className="text-[#006838] block">Tax Clarity</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Navigate Nigerian tax laws with confidence. Estimate your PAYE, track your status, and make informed financial decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tax-calculator"
                className="bg-[#00D64F] hover:bg-[#00B844] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
              >
                Start Estimating Tax
              </Link>
              <Link
                to="/status"
                className="border-2 border-[#006838] text-[#006838] hover:bg-[#006838] hover:text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
              >
                Check My Status
              </Link>
            </div>
          </div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-[#00D64F]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-[#006838]/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose TaxClarityNG?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Empowering Nigerians with transparent, accurate tax insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Accurate Estimations</h3>
              <p className="text-gray-600 leading-relaxed">
                Get precise PAYE calculations based on current Nigerian tax laws, including reliefs and deductions.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Visual Breakdowns</h3>
              <p className="text-gray-600 leading-relaxed">
                See your tax breakdown with interactive charts and clear explanations of deductions and net income.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-8 rounded-2xl bg-gradient-to-br from-green-50 to-white border border-green-100">
              <div className="w-16 h-16 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Rule Library</h3>
              <p className="text-gray-600 leading-relaxed">
                Access simplified explanations of Nigerian tax laws and regulations in plain English.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              How TaxClarityNG Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Simple steps to gain clarity on your taxes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Input Your Income</h3>
              <p className="text-gray-600 leading-relaxed">
                Enter your annual or monthly gross income and pension contribution rate. Our tool handles the rest.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Instant Estimates</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive accurate PAYE calculations based on current Nigerian tax laws, including all reliefs and deductions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-[#00D64F] rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Review & Plan</h3>
              <p className="text-gray-600 leading-relaxed">
                Check your tax status with visual breakdowns and get personalized tips to optimize your finances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#006838] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Take Control of Your Taxes?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Start with our tax estimator and get clarity on your financial obligations today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tax-calculator"
              className="bg-white text-[#006838] hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg text-lg transition-colors shadow-lg"
            >
              Estimate My Tax Now
            </Link>
            <Link
              to="/rule-library"
              className="border-2 border-white text-white hover:bg-white hover:text-[#006838] font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
            >
              Explore Rule Library
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[#00D64F]"
              >
                <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
                <path d="M7 21h10" />
                <path d="M12 3v18" />
                <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
              </svg>
              <span className="font-bold text-2xl">TaxClarityNG</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering Nigerians with tax transparency and financial clarity.
            </p>
            <p className="text-sm text-gray-500">
              © 2026 TaxClarityNG. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}