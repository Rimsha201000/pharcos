import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Watermark } from './components/Watermark';
import { DashboardView } from './pages/DashboardView';
import { OrderListView } from './pages/OrderListView';
import { SalesReportView } from './pages/SalesReportView';
import { PharmacyView } from './pages/PharmacyView';
import { CosmeticsView } from './pages/CosmeticsView';
import { BrandsCompaniesView } from './pages/BrandsCompaniesView';
import { EmployeeScheduleView } from './pages/EmployeeScheduleView';
import { ExpiryRadarView } from './pages/ExpiryRadarView';
import { POSView } from './pages/POSView';
import { SalesHistoryView } from './pages/SalesHistoryView';
import { PurchasingView } from './pages/PurchasingView';
import { SuppliersView } from './pages/SuppliersView';
import { CustomersView } from './pages/CustomersView';
import { ReportsView } from './pages/ReportsView';
import { AIAssistantView } from './pages/AIAssistantView';
import { UsersManagementView } from './pages/UsersManagementView';
import { AuditLogsView } from './pages/AuditLogsView';
import { SettingsView } from './pages/SettingsView';
import { LoginView } from './pages/LoginView';
import { PharmaCosmeticsOrbitBackground } from './components/PharmaCosmeticsOrbitBackground';

const MainLayout: React.FC = () => {
  const { currentView, currentUser } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // If unauthenticated or explicitly on login screen, display the professional login portal
  if (!currentUser || currentView === 'login') {
    return (
      <main className="relative min-h-screen">
        <LoginView />
        <Watermark />
      </main>
    );
  }

  // Enterprise application software layout with matching luxury orbit background
  return (
    <div className="relative min-h-screen flex flex-col text-slate-800 [overflow-x:clip] bg-slate-900/10">
      {/* Matching 3D Orbiting Medicines & Cosmetics Background from Login Screen */}
      <PharmaCosmeticsOrbitBackground variant="plum-velvet" />

      {/* Top Application Navbar */}
      <Navbar onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)} />

      {/* Main Software Workspace: Left Fixed Navigation + Dynamic Content Area */}
      <div className="relative z-10 flex-1 flex w-full">
        <Sidebar 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
        />

        <main className="flex-1 lg:pl-64 p-3 sm:p-5 lg:p-7 min-w-0 pb-16">
          <div className="max-w-[1500px] mx-auto">
            {currentView === 'dashboard' && <DashboardView />}
            {currentView === 'orders' && <OrderListView />}
            {currentView === 'salesReport' && <SalesReportView />}
            {currentView === 'pharmacy' && <PharmacyView />}
            {currentView === 'cosmetics' && <CosmeticsView />}
            {currentView === 'brands' && <BrandsCompaniesView />}
            {currentView === 'schedule' && <EmployeeScheduleView />}
            {currentView === 'expiry' && <ExpiryRadarView />}
            {currentView === 'pos' && <POSView />}
            {currentView === 'sales' && <SalesHistoryView />}
            {currentView === 'purchasing' && <PurchasingView />}
            {currentView === 'suppliers' && <SuppliersView />}
            {currentView === 'customers' && <CustomersView />}
            {currentView === 'reports' && <ReportsView />}
            {currentView === 'ai' && <AIAssistantView />}
            {currentView === 'users' && <UsersManagementView />}
            {currentView === 'audit' && <AuditLogsView />}
            {currentView === 'settings' && <SettingsView />}
          </div>
        </main>
      </div>

      {/* Permanent Developer Watermark */}
      <Watermark />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
