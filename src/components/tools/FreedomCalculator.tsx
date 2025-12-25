'use client';

import React, { useState, useEffect } from 'react';

export default function FreedomCalculator() {
    const [monthlyExpenses, setMonthlyExpenses] = useState<number>(3000);
    const [productPrice, setProductPrice] = useState<number>(27);
    const [targetIncome, setTargetIncome] = useState<number>(0);
    const [salesNeeded, setSalesNeeded] = useState<number>(0);

    useEffect(() => {
        // Target income is expenses * 1.5 (buffer) or just expenses? Let's do expenses for "Freedom" (Cover costs)
        // usually "Freedom" = Expenses * 1 for survival, * 2 for comfort. 
        // Let's use a "Freedom Multiplier" toggle or just stick to "Replace Salary"
        setTargetIncome(monthlyExpenses);
        if (productPrice > 0) {
            setSalesNeeded(Math.ceil(monthlyExpenses / productPrice));
        }
    }, [monthlyExpenses, productPrice]);

    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-700 shadow-2xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">💸 The Freedom Number Calculator</h2>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Monthly Expenses ($)</label>
                        <input
                            type="number"
                            value={monthlyExpenses}
                            onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="e.g. 5000"
                        />
                        <p className="text-xs text-slate-500 mt-1">Rent, food, bills, lifestyle.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Product Price ($)</label>
                        <input
                            type="number"
                            value={productPrice}
                            onChange={(e) => setProductPrice(Number(e.target.value))}
                            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                            placeholder="e.g. 27"
                        />
                        <p className="text-xs text-slate-500 mt-1">Cost of your eBook, course, or service.</p>
                    </div>
                </div>

                {/* Results */}
                <div className="flex flex-col justify-center items-center bg-slate-800 rounded-xl p-6 border border-slate-700">
                    <div className="text-center">
                        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">To Quit You Need</p>
                        <div className="text-5xl font-black text-primary mb-2">
                            {salesNeeded}
                        </div>
                        <p className="text-white text-lg font-bold">Sales / Month</p>
                    </div>

                    <div className="mt-6 pt-6 border-t border-slate-700 w-full text-center">
                        <p className="text-sm text-slate-400">That's just</p>
                        <div className="text-xl font-bold text-white mt-1">
                            {(salesNeeded / 30).toFixed(1)} Sales / Day
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                <h4 className="font-bold text-white mb-2">💡 Analysis:</h4>
                <p className="text-slate-400 text-sm">
                    If you sell a <strong>${productPrice}</strong> product, you only need to find <strong>{salesNeeded}</strong> people out of the billions online every month to replace your income.
                    {salesNeeded < 100 ? " This is highly achievable for a complete beginner." : " This volume requires paid ads or viral content."}
                </p>
            </div>
        </div>
    );
}
