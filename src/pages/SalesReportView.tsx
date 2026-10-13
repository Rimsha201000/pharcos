import React, { useState } from 'react';
import { 
  Calendar, Filter, Printer, Download, Receipt, ArrowUpDown, 
  Search, CheckCircle2, DollarSign, Package, Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SalesReportView: React.FC = () => {
  const { orders, sales, settings } = useApp();

  const [dateStart, setDateStart] = useState('2024-10-01');
  const [dateEnd, setDateEnd] = useState('2024-11-10');
  const [activeDateRange, setActiveDateRange] = useState({ start: '2024-10-01', end: '2024-11-10' });

  // Flatten order items to match the exact table in Screenshot 1
  interface ReportRow {
    id: string;
    dateTime: string;
    productName: string;
    brand: string;
    category: string;
    clientName: string;
    clientEmail: string;
    paymentMethod: string;
    price: number;
    qty: number;
    total: number;
  }

  // Pre-seed matching rows from Screenshot 1 & dynamic orders
  const reportRows: ReportRow[] = [
    {
      id: 'row-1',
      dateTime: '2024-10-17 15:32:52',
      productName: 'Nur E Ebrahim - Variant 3',
      brand: 'AVON',
      category: 'Body Care',
      clientName: 'Nur E Ebrahim',
      clientEmail: 'ebrahim@gmail.com',
      paymentMethod: 'COD',
      price: 250,
      qty: 2,
      total: 500
    },
    {
      id: 'row-2',
      dateTime: '2024-10-17 15:26:17',
      productName: 'Nur E Ebrahim - Variant 3',
      brand: 'AVON',
      category: 'Body Care',
      clientName: 'Nur E Ebrahim',
      clientEmail: 'ebrahim@gmail.com',
      paymentMethod: 'ONLINE PAYMENT',
      price: 300,
      qty: 4,
      total: 1200
    },
    {
      id: 'row-3',
      dateTime: '2024-10-17 15:26:17',
      productName: 'Nur E Ebrahim - Variant 1',
      brand: 'AVON',
      category: 'Body Care',
      clientName: 'Nur E Ebrahim',
      clientEmail: 'ebrahim@gmail.com',
      paymentMethod: 'ONLINE PAYMENT',
      price: 200,
      qty: 3,
      total: 600
    },
    {
      id: 'row-4',
      dateTime: '2024-10-17 14:51:58',
      productName: 'Nur E Ebrahim - Variant 3',
      brand: 'AVON',
      category: 'Body Care',
      clientName: 'Nur E Ebrahim',
      clientEmail: 'ebrahim@gmail.com',
      paymentMethod: 'COD',
      price: 300,
      qty: 3,
      total: 900
    }
  ];

  // Also include items from dynamic orders created in the system
  orders.forEach((ord, ordIdx) => {
    // Avoid duplicating the hardcoded initial 3
    if (ord.orderNumber !== 'ORD-2024-001' && ord.orderNumber !== 'ORD-2024-002' && ord.orderNumber !== 'ORD-2024-003') {
      ord.items.forEach((it, itIdx) => {
        reportRows.push({
          id: `ord-row-${ordIdx}-${itIdx}`,
          dateTime: ord.date.includes(':') && ord.date.length <= 16 ? `${ord.date}:00` : ord.date,
          productName: it.productName,
          brand: it.brand || 'PharmaGlow',
          category: it.category || 'General',
          clientName: ord.clientName,
          clientEmail: ord.clientEmail || 'client@example.com',
          paymentMethod: ord.paymentMethod,
          price: it.unitPrice,
          qty: it.quantity,
          total: it.total
        });
      });
    }
  });

  // Filter based on activeDateRange
  const filteredRows = reportRows.filter(row => {
    const rowDate = row.dateTime.substring(0, 10);
    return rowDate >= activeDateRange.start && rowDate <= activeDateRange.end;
  });

  const totalSalesAmount = filteredRows.reduce((sum, r) => sum + r.total, 0);

  const handleApplyFilter = () => {
    setActiveDateRange({ start: dateStart, end: dateEnd });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner & Title Bar */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Sales Report
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Audited Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Filter transactions by exact date intervals and print compliance sales records.
          </p>
        </div>

        {/* Quick summary badges */}
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-right">
            <span className="block text-[10px] font-bold uppercase text-slate-400">Total Filtered Sales</span>
            <span className="text-lg font-black text-slate-900 font-heading">
              {settings.currencySymbol} {totalSalesAmount.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Main Filter Card matching Screenshot 1 */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/70 shadow-lg p-5 sm:p-6 space-y-6">
        
        {/* Date Filter & Action Buttons Bar */}
        <div className="flex flex-wrap items-end gap-4 p-4 rounded-xl bg-slate-50/80 border border-slate-200/80">
          
          {/* Date Start */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Date Start
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateStart}
                onChange={(e) => setDateStart(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Date End */}
          <div className="flex-1 min-w-[200px]">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Date End
            </label>
            <div className="relative">
              <input
                type="date"
                value={dateEnd}
                onChange={(e) => setDateEnd(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
              />
            </div>
          </div>

          {/* Action Buttons (Filter & Print) - Styled exactly as Screenshot 1 */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyFilter}
              className="px-5 py-2.5 rounded-xl bg-[#0070f3] hover:bg-[#0051cc] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Data Table matching Screenshot 1 */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Date Time</th>
                <th className="py-3 px-4">Product</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4">Payment Method</th>
                <th className="py-3 px-4 text-right">Price</th>
                <th className="py-3 px-4 text-center">QTY</th>
                <th className="py-3 px-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No sales records found for selected date interval.
                  </td>
                </tr>
              ) : (
                filteredRows.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3 px-4 text-center text-slate-500 font-semibold">{idx + 1}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px] whitespace-nowrap">
                      {row.dateTime}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900">{row.productName}</div>
                      <div className="text-[11px] text-slate-500">Brand: <span className="font-semibold text-slate-700">{row.brand}</span></div>
                      <div className="text-[11px] text-slate-400">Category: {row.category}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{row.clientName}</div>
                      <div className="text-[11px] text-slate-500">Email: {row.clientEmail}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {row.paymentMethod}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right font-semibold text-slate-700">
                      {row.price.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center font-bold text-slate-900">
                      {row.qty}
                    </td>
                    <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                      {row.total.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {/* Total Sales Row matching Screenshot 1 */}
            <tfoot>
              <tr className="bg-slate-50/90 border-t-2 border-slate-300 font-extrabold text-slate-900">
                <td colSpan={7} className="py-4 px-6 text-center tracking-wider text-xs uppercase font-heading font-black">
                  TOTAL SALES
                </td>
                <td className="py-4 px-4 text-right text-sm text-slate-900 font-black font-heading">
                  {totalSalesAmount.toLocaleString()}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

      </div>

      {/* Printable Sheet Component (Visible only when printing) */}
      <div className="hidden print:block fixed inset-0 bg-white p-8 z-50 text-black">
        <div className="text-center pb-4 border-b border-black mb-4">
          <h2 className="text-2xl font-bold uppercase">{settings.pharmacyName}</h2>
          <p className="text-xs">{settings.address} | Phone: {settings.phone}</p>
          <h3 className="text-lg font-bold mt-2">AUDITED SALES REPORT</h3>
          <p className="text-xs">Interval: {activeDateRange.start} to {activeDateRange.end}</p>
        </div>

        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-black font-bold">
              <th className="py-2">#</th>
              <th className="py-2">Date Time</th>
              <th className="py-2">Product & Brand</th>
              <th className="py-2">Client</th>
              <th className="py-2">Method</th>
              <th className="py-2 text-right">Price</th>
              <th className="py-2 text-center">QTY</th>
              <th className="py-2 text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((r, idx) => (
              <tr key={r.id} className="border-b border-gray-200">
                <td className="py-1.5">{idx + 1}</td>
                <td className="py-1.5">{r.dateTime}</td>
                <td className="py-1.5">{r.productName} ({r.brand})</td>
                <td className="py-1.5">{r.clientName}</td>
                <td className="py-1.5">{r.paymentMethod}</td>
                <td className="py-1.5 text-right">{r.price}</td>
                <td className="py-1.5 text-center">{r.qty}</td>
                <td className="py-1.5 text-right">{r.total}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-black font-bold">
              <td colSpan={7} className="py-3 text-center uppercase">TOTAL SALES:</td>
              <td className="py-3 text-right">{settings.currencySymbol} {totalSalesAmount.toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-8 text-[10px] text-gray-500 flex justify-between border-t border-gray-300 pt-2">
          <span>Printed from PharmaGlow Management System</span>
          <span>Date: {new Date().toLocaleString()}</span>
        </div>
      </div>

    </div>
  );
};
