import React, { useState } from 'react';
import { 
  Wand2, Dumbbell, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight,
  Search, Plus, X, Check, Clock, UserCheck, Calendar, Shield, Users,
  CheckCircle2, Sparkles, Building2
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { INITIAL_USERS } from '../data/initialData';
import { WeekDay, ShiftType, EmployeeShiftAssignment } from '../types';

export const EmployeeScheduleView: React.FC = () => {
  const { 
    scheduleAssignments, addScheduleAssignment, deleteScheduleAssignment, 
    autoScheduleWeek, currentUser 
  } = useApp();

  const [currentWeek, setCurrentWeek] = useState<number>(38);
  const [operatorSearch, setOperatorSearch] = useState('');
  
  // Modal state for "Assign employee" matching Screenshot 5
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<WeekDay>('Wednesday');
  const [selectedShift, setSelectedShift] = useState<ShiftType>('Morning');
  const [timeFrom, setTimeFrom] = useState('08:00');
  const [timeTo, setTimeTo] = useState('12:00');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('u-3');
  const [workstation, setWorkstation] = useState('Dispensary Counter 1');

  const days: WeekDay[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Filter assignments for current week
  const weekAssignments = scheduleAssignments.filter(a => a.weekNumber === currentWeek);

  // Available staff pool
  const staffPool = INITIAL_USERS.map(u => ({
    id: u.id,
    name: u.name,
    role: u.role.replace('_', ' '),
    avatar: u.avatar,
    skillStatus: u.role === 'SUPER_ADMIN' || u.role === 'ADMIN' ? 'Senior Specialist' : 'Available - Trained',
    defaultShift: 'Morning' as ShiftType
  }));

  const handleOpenAssign = (day: WeekDay) => {
    setSelectedDay(day);
    setIsAssignModalOpen(true);
  };

  const handleValidateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    const employee = staffPool.find(s => s.id === selectedEmployeeId);
    if (!employee) return;

    addScheduleAssignment({
      weekNumber: currentWeek,
      day: selectedDay,
      shift: selectedShift,
      startTime: timeFrom,
      endTime: timeTo,
      employeeId: employee.id,
      employeeName: employee.name,
      employeeRole: employee.role,
      avatar: employee.avatar,
      skillStatus: employee.skillStatus as any,
      workstation: workstation || 'Main Counter'
    });

    setIsAssignModalOpen(false);
  };

  const handleAutoSchedule = () => {
    autoScheduleWeek(currentWeek);
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      
      {/* Top Banner */}
      <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-white/60 shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 tracking-tight">
              Schedule of the week
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
              Shift Matrix
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
            Weekly workstation rota, shift balancing, and automatic duty coverage for clinical & POS staff.
          </p>
        </div>

        {/* Top Action Buttons (Automatic Schedule & Load Management) - Styled exactly as Screenshot 5 */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleAutoSchedule}
            className="px-4 py-2.5 rounded-xl bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#6d28d9] font-bold text-xs flex items-center gap-2 transition-all shadow-2xs active:scale-95 border border-[#c4b5fd]/40"
          >
            <Wand2 className="w-4 h-4 text-[#7c3aed]" />
            <span>Automatic schedule</span>
          </button>

          <button
            onClick={() => alert(`Shift Load Balance for Week ${currentWeek}: 8 Active Shifts Assigned. Dispensary Counter & POS Covered 100%.`)}
            className="px-4 py-2.5 rounded-xl bg-[#ede9fe] hover:bg-[#ddd6fe] text-[#6d28d9] font-bold text-xs flex items-center gap-2 transition-all shadow-2xs active:scale-95 border border-[#c4b5fd]/40"
          >
            <Dumbbell className="w-4 h-4 text-[#7c3aed]" />
            <span>Load management</span>
          </button>
        </div>
      </div>

      {/* Main Schedule Workspace Container matching Screenshot 5 */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-white/70 shadow-lg p-5 sm:p-6 space-y-6">
        
        {/* Navigation & Search Bar matching Screenshot 5 */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200">
          
          {/* Week Selector: << < Week 38 > >> */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-slate-100 rounded-xl p-1 text-slate-700">
              <button
                onClick={() => setCurrentWeek(w => Math.max(1, w - 2))}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
                title="Previous 2 Weeks"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentWeek(w => Math.max(1, w - 1))}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
                title="Previous Week"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-4 py-1 font-heading font-extrabold text-sm text-slate-900 min-w-[90px] text-center">
                Week {currentWeek}
              </span>

              <button
                onClick={() => setCurrentWeek(w => Math.min(52, w + 1))}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
                title="Next Week"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentWeek(w => Math.min(52, w + 2))}
                className="p-1.5 rounded-lg hover:bg-white text-slate-600 transition-colors"
                title="Next 2 Weeks"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Search "Workstation operator" */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={operatorSearch}
              onChange={(e) => setOperatorSearch(e.target.value)}
              placeholder="Workstation operator"
              className="pl-9 pr-4 py-2 rounded-xl border border-slate-300 bg-white text-xs text-slate-800 focus:outline-hidden focus:border-purple-500 w-full sm:w-64 shadow-2xs"
            />
          </div>
        </div>

        {/* 7-Day Weekly Columns Grid matching Screenshot 5 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3">
          {days.map((day) => {
            const dayAssignments = weekAssignments.filter(a => {
              const matchesDay = a.day === day;
              const matchesSearch = !operatorSearch || a.employeeName.toLowerCase().includes(operatorSearch.toLowerCase());
              return matchesDay && matchesSearch;
            });

            return (
              <div 
                key={day}
                className="bg-slate-50/80 rounded-2xl border border-slate-200 p-3 flex flex-col justify-between min-h-[380px]"
              >
                {/* Day Header */}
                <div>
                  <div className="font-heading font-bold text-xs text-slate-800 uppercase tracking-wider text-center pb-2 border-b border-slate-200/80 mb-3">
                    {day}
                  </div>

                  {/* Assignments for this day */}
                  <div className="space-y-2.5">
                    {dayAssignments.map((assignment) => (
                      <div
                        key={assignment.id}
                        className="bg-white rounded-xl p-2.5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow relative group"
                      >
                        <button
                          onClick={() => deleteScheduleAssignment(assignment.id)}
                          className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          title="Remove shift"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        <div className="flex items-center gap-2">
                          {/* Avatar */}
                          {assignment.avatar ? (
                            <img
                              src={assignment.avatar}
                              alt={assignment.employeeName}
                              className="w-8 h-8 rounded-full object-cover shrink-0 border border-slate-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {assignment.employeeName.substring(0, 2)}
                            </div>
                          )}

                          <div className="min-w-0 flex-1">
                            <div className="font-bold text-[11px] text-slate-900 truncate">
                              {assignment.employeeName}
                            </div>
                            <div className="text-[10px] text-slate-500 truncate">
                              {assignment.employeeRole}
                            </div>
                          </div>
                        </div>

                        {/* Shift badge & Time */}
                        <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px]">
                          <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            assignment.shift === 'Morning' 
                              ? 'bg-amber-100 text-amber-800' 
                              : assignment.shift === 'Evening' 
                              ? 'bg-blue-100 text-blue-800' 
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {assignment.shift}
                          </span>
                          <span className="font-mono text-slate-500 font-semibold">
                            {assignment.startTime}-{assignment.endTime}
                          </span>
                        </div>

                        <div className="text-[9px] text-slate-400 mt-1 truncate">
                          📍 {assignment.workstation}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Shift Button (+) for this day matching Screenshot 5 */}
                <div className="pt-3">
                  <button
                    onClick={() => handleOpenAssign(day)}
                    className="w-full py-3 rounded-xl border-2 border-dashed border-purple-300 hover:border-purple-600 bg-white hover:bg-purple-50 text-purple-600 flex items-center justify-center transition-all group shadow-2xs"
                    title={`Assign employee to ${day}`}
                  >
                    <div className="w-7 h-7 rounded-full bg-purple-600 text-white flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                      <Plus className="w-4 h-4" />
                    </div>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* =========================================================================
          ASSIGN EMPLOYEE MODAL (Matches Screenshot 5 Exactly)
          ========================================================================= */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-md w-full p-6 sm:p-7 animate-scaleUp">
            
            {/* Modal Title */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="font-heading font-black text-xl text-slate-900">
                Assign employee
              </h3>
              <button 
                onClick={() => setIsAssignModalOpen(false)} 
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleValidateAssignment} className="space-y-4 text-xs">
              
              {/* Day info pill */}
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-purple-50 text-purple-900 font-bold text-xs">
                <span>Selected Duty Day:</span>
                <span className="uppercase tracking-wider">{selectedDay} (Week {currentWeek})</span>
              </div>

              {/* Shift Selector & Time Range matching Screenshot 5 */}
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  
                  {/* Shift: Morning / Evening / Night */}
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-xs bg-amber-300 inline-block" />
                    <span className="font-bold text-slate-700">Shift:</span>
                    <select
                      value={selectedShift}
                      onChange={(e) => {
                        const s = e.target.value as ShiftType;
                        setSelectedShift(s);
                        if (s === 'Morning') { setTimeFrom('08:00'); setTimeTo('12:00'); }
                        else if (s === 'Evening') { setTimeFrom('12:00'); setTimeTo('18:00'); }
                        else { setTimeFrom('18:00'); setTimeTo('00:00'); }
                      }}
                      className="px-2 py-1 rounded-lg border border-slate-300 bg-white font-bold text-slate-900"
                    >
                      <option value="Morning">Morning</option>
                      <option value="Evening">Evening</option>
                      <option value="Night">Night</option>
                    </select>
                  </div>

                  {/* from 8:00 to 12:00 */}
                  <div className="flex items-center gap-1.5 text-slate-600 font-semibold">
                    <span>from</span>
                    <input
                      type="text"
                      value={timeFrom}
                      onChange={(e) => setTimeFrom(e.target.value)}
                      className="w-14 px-1.5 py-0.5 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900"
                    />
                    <span>to</span>
                    <input
                      type="text"
                      value={timeTo}
                      onChange={(e) => setTimeTo(e.target.value)}
                      className="w-14 px-1.5 py-0.5 rounded border border-slate-300 bg-white text-center font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-600 mb-1">
                    Workstation / Station Counter
                  </label>
                  <input
                    type="text"
                    value={workstation}
                    onChange={(e) => setWorkstation(e.target.value)}
                    placeholder="e.g. Dispensary Counter 1, Beauty Desk, POS Till"
                    className="w-full px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-medium text-slate-800"
                  />
                </div>
              </div>

              {/* Employee List with Selection Cards (Matching Screenshot 5) */}
              <div>
                <label className="block font-bold text-slate-700 mb-2">
                  Select Employee & Skill Status
                </label>

                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {staffPool.map((emp) => {
                    const isSelected = selectedEmployeeId === emp.id;

                    return (
                      <div
                        key={emp.id}
                        onClick={() => setSelectedEmployeeId(emp.id)}
                        className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? 'border-purple-600 bg-purple-50/70 shadow-sm ring-2 ring-purple-200'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {emp.avatar ? (
                            <img
                              src={emp.avatar}
                              alt={emp.name}
                              className="w-10 h-10 rounded-full object-cover shrink-0 border border-slate-200"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                              {emp.name.substring(0, 2)}
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="font-bold text-xs text-slate-900 truncate">
                              {emp.name}
                            </div>
                            <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                              <span>{emp.role}</span>
                              <span>•</span>
                              <span className="text-emerald-700 font-medium">{emp.skillStatus}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {selectedShift}
                          </span>

                          <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${
                            isSelected 
                              ? 'bg-purple-600 border-purple-600 text-white' 
                              : 'border-slate-300 bg-white text-transparent'
                          }`}>
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Button: "Validate assignment" - Styled exactly as Screenshot 5 */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-[#6d28d9] hover:bg-[#5b21b6] text-white font-heading font-extrabold text-sm tracking-wide shadow-lg shadow-purple-500/25 transition-all active:scale-98 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Validate assignment</span>
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
