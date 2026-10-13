import React, { useState } from 'react';
import { 
  Search, Eye, Printer, CheckCircle2, XCircle, Clock, 
  ChevronDown, Plus, Filter, RefreshCw, X, Receipt, ShoppingCart
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order, OrderStatus } from '../types';

export const OrderListView: React.FC = () => {
  const { orders, updateOrder, deleteOrder, addOrder, settings, customers } = useApp();

  const [search, setSearch] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [activeDropdownId, setActiveDropdownId] = useState<string | null>(null);

  // Selected Order Modal for detailed view / receipt
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Order Form state
  const [newOrderForm, setNewOrderForm] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    totalAmount: 1200,
    isPaid: true,
    status: 'Pending' as OrderStatus,
    paymentMethod: 'COD' as Order['paymentMethod'],
    productName: 'Custom Pharmacy Package',
    brand: 'PharmaGlow',
    category: 'Healthcare',
    unitPrice: 1200,
    quantity: 1
  });

  // Filter orders
  const filteredOrders = orders.filter(o => {
    const matchesSearch = 
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.clientName.toLowerCase().includes(search.toLowerCase()) ||
      (o.clientEmail && o.clientEmail.toLowerCase().includes(search.toLowerCase())) ||
      (o.clientPhone && o.clientPhone.includes(search));
    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Pagination calculations
  const totalEntries = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));
  const startIndex = (currentPage - 1) * entriesPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + entriesPerPage);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrder(orderId, { status: newStatus });
    setActiveDropdownId(null);
  };

  const handlePaidToggle = (orderId: string, currentPaid: boolean) => {
    updateOrder(orderId, { isPaid: !currentPaid });
    setActiveDropdownId(null);
  };

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    addOrder({
      orderNumber: `ORD-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      clientName: newOrderForm.clientName,
      clientEmail: newOrderForm.clientEmail,
      clientPhone: newOrderForm.clientPhone,
      totalAmount: newOrderForm.totalAmount,
      isPaid: newOrderForm.isPaid,
      status: newOrderForm.status,
      paymentMethod: newOrderForm.paymentMethod,
      items: [
        {
          id: `item-${Date.now()}`,
          productId: `prod-${Date.now()}`,
          productName: newOrderForm.productName,
          brand: newOrderForm.brand,
          category: newOrderForm.category,
          unitPrice: newOrderForm.unitPrice,
          quantity: newOrderForm.quantity,
          total: newOrderForm.unitPrice * newOrderForm.quantity
        }
      ]
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Header */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              List of Orders
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
              Fulfillment Desk
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Monitor client orders, track delivery logistics, verify payments, and manage statuses.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 text-emerald-400" />
          <span>New Order</span>
        </button>
      </div>

      {/* Main Order List Card matching Screenshot 2 */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/70 shadow-lg p-5 sm:p-6 space-y-4">
        
        {/* Top Control Bar: "Show entries" and "Search" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          
          {/* Show [10] entries */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span>Show</span>
            <select
              value={entriesPerPage}
              onChange={(e) => {
                setEntriesPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-semibold text-slate-800 focus:outline-hidden focus:border-blue-500 shadow-2xs"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
            <span>Search:</span>
            <div className="relative">
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder=""
                className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 focus:outline-hidden focus:border-blue-500 w-44 sm:w-56 shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Data Table matching Screenshot 2 */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase text-[11px]">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Date Order</th>
                <th className="py-3 px-4">Client</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-center">Paid</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No orders found matching the search criteria.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((ord, idx) => (
                  <tr key={ord.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-center text-slate-500 font-semibold">
                      {startIndex + idx + 1}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-700 whitespace-nowrap">
                      {ord.date}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {ord.clientName}
                    </td>
                    <td className="py-3.5 px-4 text-right font-extrabold text-slate-900">
                      {ord.totalAmount.toLocaleString()}
                    </td>
                    
                    {/* Paid Badge (Yes / No in clean pill) */}
                    <td className="py-3.5 px-4 text-center">
                      {ord.isPaid ? (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#22c55e] text-white shadow-2xs">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#ef4444] text-white shadow-2xs">
                          No
                        </span>
                      )}
                    </td>

                    {/* Status Badge (Delivered, Pending, Cancelled in clean pill) */}
                    <td className="py-3.5 px-4 text-center">
                      {ord.status === 'Delivered' && (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#22c55e] text-white shadow-2xs">
                          Delivered
                        </span>
                      )}
                      {ord.status === 'Pending' && (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#f59e0b] text-white shadow-2xs">
                          Pending
                        </span>
                      )}
                      {ord.status === 'Cancelled' && (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#dc2626] text-white shadow-2xs">
                          Cancelled
                        </span>
                      )}
                      {ord.status === 'Processing' && (
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-bold bg-[#0284c7] text-white shadow-2xs">
                          Processing
                        </span>
                      )}
                    </td>

                    {/* Action Dropdown matching Screenshot 2 */}
                    <td className="py-3.5 px-4 text-center relative">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() => setActiveDropdownId(activeDropdownId === ord.id ? null : ord.id)}
                          className="px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs inline-flex items-center gap-1 shadow-2xs transition-colors"
                        >
                          <span>Action</span>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {activeDropdownId === ord.id && (
                          <div 
                            className="absolute right-0 mt-1 w-44 bg-white rounded-xl shadow-xl border border-slate-200 z-50 py-1 text-left text-xs font-medium animate-fadeIn"
                            onMouseLeave={() => setActiveDropdownId(null)}
                          >
                            <button
                              onClick={() => {
                                setViewingOrder(ord);
                                setActiveDropdownId(null);
                              }}
                              className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <Eye className="w-3.5 h-3.5 text-blue-500" />
                              <span>View Details</span>
                            </button>

                            <button
                              onClick={() => handlePaidToggle(ord.id, ord.isPaid)}
                              className="w-full px-3 py-1.5 text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                              <span>Toggle Paid ({ord.isPaid ? 'No' : 'Yes'})</span>
                            </button>

                            <div className="border-t border-slate-100 my-1" />

                            <button
                              onClick={() => handleStatusChange(ord.id, 'Delivered')}
                              className="w-full px-3 py-1.5 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-500" />
                              <span>Set Delivered</span>
                            </button>

                            <button
                              onClick={() => handleStatusChange(ord.id, 'Pending')}
                              className="w-full px-3 py-1.5 text-slate-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-2"
                            >
                              <span className="w-2 h-2 rounded-full bg-amber-500" />
                              <span>Set Pending</span>
                            </button>

                            <button
                              onClick={() => handleStatusChange(ord.id, 'Cancelled')}
                              className="w-full px-3 py-1.5 text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                            >
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Set Cancelled</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Bottom Pagination & Counter matching Screenshot 2 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 text-xs text-slate-500">
          <div>
            Showing {totalEntries > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + entriesPerPage, totalEntries)} of {totalEntries} entries
          </div>

          {/* Pagination buttons: Previous [1] Next */}
          <div className="inline-flex rounded-lg border border-slate-200 overflow-hidden shadow-2xs">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white border-r border-slate-200 font-medium transition-colors"
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3.5 py-1.5 font-bold transition-colors ${
                  currentPage === pageNum 
                    ? 'bg-[#0070f3] text-white' 
                    : 'bg-white text-slate-700 hover:bg-slate-50 border-r border-slate-200'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white font-medium transition-colors"
            >
              Next
            </button>
          </div>
        </div>

      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="font-heading font-extrabold text-lg text-slate-900">Order #{viewingOrder.orderNumber}</h3>
                <span className="text-xs text-slate-400">{viewingOrder.date}</span>
              </div>
              <button onClick={() => setViewingOrder(null)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Client</span>
                  <span className="font-bold text-slate-800">{viewingOrder.clientName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                  <span className="font-medium text-slate-700">{viewingOrder.clientEmail || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Status</span>
                  <span className={`font-bold ${viewingOrder.isPaid ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {viewingOrder.isPaid ? 'Paid' : 'Unpaid'} ({viewingOrder.paymentMethod})
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Fulfillment Status</span>
                  <span className="font-bold text-slate-800">{viewingOrder.status}</span>
                </div>
              </div>

              <div>
                <span className="font-bold text-slate-800 block mb-1.5 uppercase text-[10px]">Order Items</span>
                <div className="divide-y divide-slate-100 border rounded-xl overflow-hidden">
                  {viewingOrder.items.map(it => (
                    <div key={it.id} className="p-2.5 flex justify-between items-center bg-white text-xs">
                      <div>
                        <div className="font-bold text-slate-800">{it.productName}</div>
                        <div className="text-[11px] text-slate-400">{it.brand} | {it.category}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-slate-900">{settings.currencySymbol} {it.total.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-400">{it.quantity} × {it.unitPrice}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 font-bold text-sm border-t">
                <span>Total Amount:</span>
                <span className="text-slate-900 font-heading text-lg">{settings.currencySymbol} {viewingOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print
              </button>
              <button
                onClick={() => setViewingOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* New Order Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full p-6 animate-scaleUp">
            <div className="flex items-center justify-between border-b pb-3 mb-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">Create New Order</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg hover:bg-slate-100 text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Client Name</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.clientName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, clientName: e.target.value })}
                  placeholder="e.g. Nur E Ebrahim"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={newOrderForm.clientEmail}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, clientEmail: e.target.value })}
                    placeholder="ebrahim@gmail.com"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={newOrderForm.clientPhone}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, clientPhone: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Description</label>
                <input
                  type="text"
                  required
                  value={newOrderForm.productName}
                  onChange={(e) => setNewOrderForm({ ...newOrderForm, productName: e.target.value })}
                  placeholder="e.g. Nur E Ebrahim - Variant 3"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Brand</label>
                  <input
                    type="text"
                    value={newOrderForm.brand}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, brand: e.target.value })}
                    placeholder="AVON"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newOrderForm.category}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, category: e.target.value })}
                    placeholder="Body Care"
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price</label>
                  <input
                    type="number"
                    min="1"
                    value={newOrderForm.unitPrice}
                    onChange={(e) => {
                      const p = Number(e.target.value);
                      setNewOrderForm({ ...newOrderForm, unitPrice: p, totalAmount: p * newOrderForm.quantity });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newOrderForm.quantity}
                    onChange={(e) => {
                      const q = Number(e.target.value);
                      setNewOrderForm({ ...newOrderForm, quantity: q, totalAmount: q * newOrderForm.unitPrice });
                    }}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Total</label>
                  <input
                    type="number"
                    readOnly
                    value={newOrderForm.totalAmount}
                    className="w-full px-3 py-2 rounded-xl bg-slate-100 font-bold border border-slate-300"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Method</label>
                  <select
                    value={newOrderForm.paymentMethod}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="COD">COD</option>
                    <option value="ONLINE PAYMENT">ONLINE PAYMENT</option>
                    <option value="CASH">CASH</option>
                    <option value="CARD">CARD</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Payment Status</label>
                  <select
                    value={newOrderForm.isPaid ? 'true' : 'false'}
                    onChange={(e) => setNewOrderForm({ ...newOrderForm, isPaid: e.target.value === 'true' })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="true">Paid (Yes)</option>
                    <option value="false">Unpaid (No)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold"
                >
                  Save Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
