'use client'

import { useState, useMemo } from 'react'
import { Calculator, DollarSign, Percent, Calendar, TrendingDown } from 'lucide-react'
import { calculateMortgage, formatPrice, formatNumber } from '@/lib/utils'

interface MortgageCalculatorProps {
  defaultPrice?: number
}

export default function MortgageCalculator({ defaultPrice = 500000 }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(defaultPrice)
  const [downPaymentPct, setDownPaymentPct] = useState(20)
  const [interestRate, setInterestRate] = useState(7.0)
  const [loanTerm, setLoanTerm] = useState(30)

  const downPayment = Math.round(homePrice * (downPaymentPct / 100))
  const loanAmount = homePrice - downPayment
  const monthlyTax = Math.round(homePrice * 0.012 / 12)
  const monthlyInsurance = Math.round(homePrice * 0.005 / 12)
  const monthlyPMI = downPaymentPct < 20 ? Math.round(loanAmount * 0.007 / 12) : 0

  const { monthly, totalPayment, totalInterest } = useMemo(
    () => calculateMortgage(homePrice, downPayment, interestRate, loanTerm),
    [homePrice, downPayment, interestRate, loanTerm]
  )

  const totalMonthly = monthly + monthlyTax + monthlyInsurance + monthlyPMI
  const principalPct = Math.round((monthly / totalMonthly) * 100)
  const interestPct = Math.round(((monthly - (loanAmount / (loanTerm * 12))) / totalMonthly) * 100)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="p-5 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-gray-900">Mortgage Calculator</h3>
        </div>
      </div>

      <div className="p-5 space-y-5">
        {/* Home Price */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-2">
            <DollarSign className="w-3.5 h-3.5" />
            Home Price
          </label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-900 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Down Payment */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
              <Percent className="w-3.5 h-3.5" />
              Down Payment
            </label>
            <span className="text-xs font-semibold text-blue-600">
              {downPaymentPct}% — {formatPrice(downPayment)}
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={50}
            value={downPaymentPct}
            onChange={(e) => setDownPaymentPct(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>3%</span>
            <span>50%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-gray-600">Interest Rate</label>
            <span className="text-xs font-semibold text-blue-600">{interestRate}%</span>
          </div>
          <input
            type="range"
            min={2}
            max={12}
            step={0.1}
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
            className="w-full accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>2%</span>
            <span>12%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-medium text-gray-600 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            Loan Term
          </label>
          <div className="flex gap-2">
            {[10, 15, 20, 30].map((yr) => (
              <button
                key={yr}
                onClick={() => setLoanTerm(yr)}
                className={`flex-1 py-2 text-xs font-medium rounded-xl border transition-colors
                  ${loanTerm === yr ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-200 hover:border-blue-400'}`}
              >
                {yr}yr
              </button>
            ))}
          </div>
        </div>

        {/* Result */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-xs text-blue-600 font-medium mb-1">Estimated Monthly Payment</p>
          <p className="text-3xl font-bold text-blue-700">
            {formatPrice(Math.round(totalMonthly))}
            <span className="text-sm text-blue-500 font-normal">/mo</span>
          </p>
        </div>

        {/* Breakdown */}
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Breakdown</p>
          {[
            { label: 'Principal & Interest', value: monthly, color: 'bg-blue-500' },
            { label: 'Property Tax (est.)', value: monthlyTax, color: 'bg-teal-500' },
            { label: 'Home Insurance', value: monthlyInsurance, color: 'bg-green-500' },
            ...(monthlyPMI > 0 ? [{ label: 'PMI', value: monthlyPMI, color: 'bg-amber-500' }] : []),
          ].map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
                <span className="text-gray-600">{label}</span>
              </div>
              <span className="font-semibold text-gray-900">{formatPrice(Math.round(value))}</span>
            </div>
          ))}
        </div>

        {/* Total Summary */}
        <div className="border-t border-gray-100 pt-4 space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Loan Amount</span>
            <span className="font-semibold">{formatPrice(loanAmount)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Interest Paid</span>
            <span className="font-semibold text-amber-600">{formatPrice(Math.round(totalInterest))}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Total Cost</span>
            <span className="font-semibold">{formatPrice(Math.round(totalPayment + downPayment))}</span>
          </div>
        </div>

        {downPaymentPct < 20 && (
          <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl">
            <TrendingDown className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">
              PMI applies when down payment is less than 20%. Consider increasing your down payment to eliminate PMI.
            </p>
          </div>
        )}

        <a
          href="#"
          className="block w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl text-center transition-colors"
        >
          Get Pre-Approved Today
        </a>
      </div>
    </div>
  )
}
