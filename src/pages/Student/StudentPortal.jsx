import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { studentAPI } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const StudentPortal = () => {
  const [results, setResults] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [activityReports, setActivityReports] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedAttendanceType, setSelectedAttendanceType] = useState('Regular');
  const [activeTab, setActiveTab] = useState('results');
  const [riskData, setRiskData] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const [notices, setNotices] = useState([]);

  // Extract unique exams from results with fallback for empty labels
  const exams = useMemo(() => {
    const uniqueExams = [...new Set(results.map(r => r.examType?.trim() || 'General Assessment'))];
    return uniqueExams.filter(Boolean);
  }, [results]);

  // Define categories to ensure they always show up in specific order
  const attendanceCategories = useMemo(() => ["Regular", "Half-yearly", "Final"], []);

  // Extract unique attendance types with fallback
  const attendanceTypes = useMemo(() => {
    const typesInRecords = [...new Set(attendance.map(a => a.attendanceType?.trim() || 'Regular'))];
    // Combine standard categories with any custom ones found in records
    const combined = [...new Set([...attendanceCategories, ...typesInRecords])];

    // Sort so Regular is first, followed by others in categories, then custom ones
    return combined.sort((a, b) => {
      const indexA = attendanceCategories.indexOf(a);
      const indexB = attendanceCategories.indexOf(b);
      if (indexA !== -1 && indexB !== -1) return indexA - indexB;
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [attendance, attendanceCategories]);

  useEffect(() => {
    if (activeTab === 'results' && exams.length > 0 && !selectedExam) {
      setSelectedExam(exams[0]);
    }
  }, [activeTab, exams, selectedExam]);

  useEffect(() => {
    setSelectedExam('');
  }, [selectedYear]);

  useEffect(() => {
    fetchAcademicYears();
    fetchNotices();
  }, []);

  useEffect(() => {
    if (selectedYear) {
      fetchStudentData();
    }
  }, [selectedYear]);

  const fetchAcademicYears = async () => {
    try {
      const response = await studentAPI.getAcademicYears();
      setAcademicYears(response.data);
      if (response.data.length > 0) {
        const activeYear = response.data.find(y => y.isActive) || response.data[response.data.length - 1];
        setSelectedYear(activeYear._id);
      }
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await studentAPI.getNotices();
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const [resultsRes, attendanceRes, activityRes] = await Promise.all([
        studentAPI.getResults(selectedYear),
        studentAPI.getAttendance(selectedYear),
        studentAPI.getActivityReports(selectedYear)
      ]);
      setResults(resultsRes.data);
      setAttendance(attendanceRes.data.records || []);
      setRiskData(attendanceRes.data.risk || null);
      setActivityReports(activityRes.data);
    } catch (error) {
      console.error('Error fetching student data:', error);
    }
  };

  const calculateAttendance = () => {
    if (selectedAttendanceType === 'Regular' && riskData) {
      return `${riskData.attendancePercentage}%`;
    }
    const filteredAttendance = attendance.filter(a => (a.attendanceType?.trim() || 'Regular') === selectedAttendanceType);
    const present = filteredAttendance.filter(a => a.status === 'present').length;
    const total = filteredAttendance.length;
    return total > 0 ? `${Math.round((present / total) * 100)}%` : 'N/A';
  };

  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (activeTab === 'assignments') {
      fetchAssignments();
    }
  }, [activeTab, selectedYear]);

  const fetchAssignments = async () => {
    try {
      const response = await studentAPI.getAssignments(selectedYear);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const handleAssignmentSubmit = async (assignmentId, content) => {
    if (!content) return alert('Please enter content or a link');
    try {
      await studentAPI.submitAssignment(assignmentId, { content });
      alert('Assignment submitted!');
      fetchAssignments(); // Refresh status
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Failed to submit assignment');
    }
  };

  return (
    <DashboardLayout
      title="Student Portal"
      subtitle={`Welcome back, ${user?.name} 👋`}
    >
      {/* Academic Year Selection */}
      <div className="glass-card mb-10 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10"></div>
        <h2 className="text-xl font-black text-slate-900 mb-6 border-l-4 border-slate-900 pl-4">
          Select Academic Year
        </h2>
        <div className="flex flex-wrap gap-3">
          {academicYears.map((year) => (
            <button
              key={year._id}
              onClick={() => setSelectedYear(year._id)}
              className={`px-8 py-3.5 rounded-2xl font-black text-sm transition-all duration-300 ${selectedYear === year._id
                ? 'bg-slate-900 text-white shadow-xl scale-[1.02]'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
            >
              {year.yearName} {year.isActive && <span className="ml-2 text-[10px] bg-emerald-500 text-white px-2 py-0.5 rounded-md uppercase">Current</span>}
            </button>
          ))}
        </div>
      </div>

      <div className="glass-card">
        <div className="flex flex-wrap gap-4 mb-10">
          {[
            { id: 'results', label: 'Progress Report 📊', color: 'from-slate-800 to-slate-900' },
            { id: 'attendance', label: 'Attendance Log ✅', color: 'from-emerald-700 to-emerald-800' },
            { id: 'activity', label: 'Co-curricular & Behavior 🏆', color: 'from-purple-700 to-purple-800' },
            { id: 'assignments', label: 'Assignments & Projects 📚', color: 'from-indigo-600 to-indigo-800' },
            { id: 'notices', label: 'Official Notices 📢', color: 'from-blue-700 to-blue-800' },
            { id: 'timetable', label: 'Class Schedule 📅', path: '/student/timetable' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.path) window.location.href = tab.path;
                else setActiveTab(tab.id);
              }}
              className={`flex-1 min-w-[200px] py-4 px-6 rounded-2xl font-black transition-all duration-300 ${activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-xl scale-[1.02]`
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'results' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-10 border-l-4 border-slate-900 pl-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Academic Transcripts</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Unified Evaluation Record</p>
              </div>
              <div className="bg-slate-900 text-white px-6 py-3 rounded-2xl shadow-xl">
                <span className="text-xs font-black uppercase tracking-widest opacity-60 block">GPA Equivalence</span>
                <span className="text-2xl font-black">{results.length > 0 ? 'Verified' : '--'}</span>
              </div>
            </div>

            {results.length > 0 ? (
              <>
                {/* Exam Selection */}
                <div className="mb-10 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    Select Examination Type
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exams.map((exam) => (
                      <button
                        key={exam}
                        onClick={() => setSelectedExam(exam)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all duration-300 ${selectedExam === exam
                          ? 'bg-slate-900 text-white shadow-lg scale-105'
                          : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-100'
                          }`}
                      >
                        {exam}
                      </button>
                    ))}
                  </div>
                </div>

                {selectedExam && (
                  <div className="animate-in fade-in slide-in-from-top-4">
                    {/* Performance Visualizations */}
                    <div className="mb-12 bg-slate-50/50 p-10 rounded-[2.5rem] border border-slate-100 shadow-inner">
                      <h3 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                        <span className="w-2 h-8 bg-slate-900 rounded-full"></span>
                        {selectedExam} Performance Visualizations
                      </h3>
                      <div className="h-[380px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={results.filter(r => (r.examType?.trim() || 'General Assessment') === selectedExam)}>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" />
                            <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#64748b' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#64748b' }} />
                            <Tooltip
                              contentStyle={{ backgroundColor: '#fff', borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem' }}
                            />
                            <Bar dataKey="marks" radius={[10, 10, 0, 0]} name="Marks Obtained" barSize={40}>
                              {results.filter(r => (r.examType?.trim() || 'General Assessment') === selectedExam).map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={[
                                  '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b',
                                  '#10b981', '#06b6d4', '#3b82f6', '#4f46e5', '#7c3aed'
                                ][index % 10]} />
                              ))}
                            </Bar>
                            <Bar dataKey="benchmarkMarks" fill="#cbd5e1" radius={[10, 10, 0, 0]} name="Subject Benchmark" barSize={40} />
                            <Bar dataKey="totalMarks" fill="#f1f5f9" radius={[10, 10, 0, 0]} name="Total Potential" barSize={40} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Results Table */}
                    <div className="custom-table-container shadow-xl">
                      <table className="custom-table">
                        <thead>
                          <tr>
                            <th>Subject Unit</th>
                            <th className="text-center">Earned</th>
                            <th className="text-center">Benchmark</th>
                            <th className="text-center">Status</th>
                            <th className="text-center">Grade</th>
                            <th>Faculty Observations</th>
                          </tr>
                        </thead>
                        <tbody>
                          {results
                            .filter(r => (r.examType?.trim() || 'General Assessment') === selectedExam)
                            .map((result) => (
                              <tr key={result._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="font-black text-slate-900">{result.subject}</td>
                                <td className="text-center font-black text-emerald-600 text-lg">
                                  {result.marks}
                                  <span className="block text-[8px] font-bold text-emerald-400 uppercase tracking-tighter">Achieved: {result.studentPercentage}%</span>
                                </td>
                                <td className="text-center font-black text-slate-400">
                                  {result.benchmarkMarks || '--'}
                                  <span className="block text-[8px] font-black text-slate-500 uppercase tracking-tighter mt-1 italic">Std: {result.benchmarkPercentage || 70}%</span>
                                </td>
                                <td className="text-center">
                                  <div className="flex flex-col items-center gap-1">
                                    <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm border ${result.status === 'Below Benchmark'
                                      ? 'bg-rose-50 text-rose-600 border-rose-100'
                                      : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                      }`}>
                                      {result.status || 'Standard Met'}
                                    </span>
                                    <span className={`text-[10px] font-black ${(result.variance || 0) > 0 ? 'text-emerald-500' : (result.variance || 0) < 0 ? 'text-rose-500' : 'text-slate-400'
                                      }`}>
                                      {(result.variance || 0) > 0 ? '↑' : (result.variance || 0) < 0 ? '↓' : '↔'} {Math.abs(result.variance || 0).toFixed(1)}% Variance
                                    </span>
                                  </div>
                                </td>
                                <td className="text-center">
                                  <span className="px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-md">
                                    {result.grade}
                                  </span>
                                </td>
                                <td className="italic text-slate-500 text-sm max-w-xs">{result.remarks || 'Standard evaluation achieved.'}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-8xl mb-6 grayscale opacity-20 animate-pulse-slow">📝</div>
                <h3 className="text-2xl font-black text-slate-600 mb-2">Registry Clear</h3>
                <p className="text-slate-400 font-bold max-w-sm mx-auto text-lg italic">No examinations recorded for the selected session.</p>
              </div>
            )}
          </div>
        ) : activeTab === 'attendance' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-10 border-l-4 border-slate-900 pl-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Participation Logs</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Official Attendance Records</p>
              </div>
              <div className={`${riskData?.isAtRisk && selectedAttendanceType === 'Regular' ? 'bg-rose-600' : 'bg-emerald-700'} text-white px-6 py-3 rounded-2xl shadow-xl transition-colors duration-500`}>
                <span className="text-xs font-black uppercase tracking-widest opacity-60 block">Metric Score</span>
                <span className="text-2xl font-black">{calculateAttendance()}</span>
              </div>
            </div>

            {riskData?.isAtRisk && selectedAttendanceType === 'Regular' && (
              <div className="mb-8 p-6 bg-rose-50 border-2 border-rose-100 rounded-[2rem] animate-in fade-in slide-in-from-top-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">🚩</div>
                  <div>
                    <h4 className="text-xl font-black text-rose-900 mb-1">Attention Required: Academic Risk Detected</h4>
                    <p className="text-rose-700 font-bold text-sm mb-3">Early disengagement patterns identified based on current participation data.</p>
                    <div className="flex flex-wrap gap-2">
                      {riskData.riskReasons.map((reason, idx) => (
                        <span key={idx} className="px-4 py-1.5 bg-rose-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
                          {reason}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {attendance.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-8xl mb-6 grayscale opacity-20 animate-pulse-slow">📅</div>
                <h3 className="text-2xl font-black text-slate-600 mb-2">No Records Found</h3>
                <p className="text-slate-400 font-bold max-w-sm mx-auto text-lg italic">Attendance logs for this session are currently empty.</p>
              </div>
            ) : (
              <>
                {/* Attendance Type Selection */}
                <div className="mb-10 p-6 bg-slate-50/50 rounded-3xl border border-slate-100">
                  <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                    Select Attendance Category
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {attendanceTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setSelectedAttendanceType(type)}
                        className={`px-6 py-2.5 rounded-xl font-black text-xs transition-all duration-300 ${selectedAttendanceType === type
                          ? 'bg-emerald-700 text-white shadow-lg scale-105'
                          : 'bg-white text-slate-500 hover:bg-slate-100 hover:text-slate-700 border border-slate-100'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="custom-table-container shadow-xl">
                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Calendar Date</th>
                        <th>Subject / Unit</th>
                        <th className="text-center">Category</th>
                        <th className="text-center">Registry Status</th>
                        <th>Class Timing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attendance
                        .filter(a => (a.attendanceType?.trim() || 'Regular') === selectedAttendanceType)
                        .sort((a, b) => new Date(b.date) - new Date(a.date))
                        .map((record) => (
                          <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="font-black text-slate-900">{new Date(record.date).toLocaleDateString(undefined, { dateStyle: 'full' })}</td>
                            <td className="font-bold text-slate-600 uppercase text-xs tracking-wider">{record.subject || 'General Session'}</td>
                            <td className="text-center">
                              <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                                {record.attendanceType || 'Regular'}
                              </span>
                            </td>
                            <td className="text-center">
                              <span className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm border ${record.status === 'present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                                record.status === 'absent' ? 'bg-rose-50 text-rose-700 border-rose-100' :
                                  'bg-amber-50 text-amber-700 border-amber-100'
                                }`}>
                                {record.status}
                              </span>
                            </td>
                            <td className="font-medium text-slate-700 text-sm">{record.timing || 'Not Specified'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ) : activeTab === 'activity' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-10 border-l-4 border-slate-900 pl-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Co-curricular & Behavior</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Holistic Development Evaluation</p>
              </div>
            </div>

            {activityReports.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-8xl mb-6 grayscale opacity-20 animate-pulse-slow">🏆</div>
                <h3 className="text-2xl font-black text-slate-600 mb-2">No Reports Published</h3>
                <p className="text-slate-400 font-bold max-w-sm mx-auto text-lg italic">Your co-curricular evaluation for this session is pending.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {activityReports.map((report) => {
                  const ratingToMark = (r) => {
                    if (r === 'Excellent') return 100;
                    if (r === 'Good') return 80;
                    if (r === 'Average') return 60;
                    if (r === 'Poor') return 40;
                    return 0;
                  };

                  const behaviorData = [
                    { subject: 'Punctuality', A: ratingToMark(report.punctuality), fullMark: 100 },
                    { subject: 'Behavior', A: ratingToMark(report.behavior), fullMark: 100 },
                    { subject: 'Communication', A: ratingToMark(report.communication), fullMark: 100 },
                    { subject: 'Confidence', A: ratingToMark(report.confidence), fullMark: 100 },
                    { subject: 'Persistence', A: ratingToMark(report.persistence), fullMark: 100 },
                    { subject: 'Self-Mgmt', A: ratingToMark(report.selfManagement), fullMark: 100 },
                  ];

                  return (
                    <div key={report._id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-lg mb-2 inline-block">Session {report.academicYear?.yearName || report.academicYear}</span>
                          <h4 className="text-2xl font-black text-slate-900">Activity & Skills Profile</h4>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-6 mb-10">
                        <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100/50">
                          <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">综合素质评估 (Holistic Evaluation)</span>
                          <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={behaviorData}>
                                <PolarGrid stroke="#e2e8f0" />
                                <PolarAngleAxis dataKey="subject" tick={{ fontWeight: 'bold', fontSize: 9, fill: '#64748b' }} />
                                <Radar name="Student" dataKey="A" stroke="#7c3aed" fill="#7c3aed" fillOpacity={0.4} />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="md:col-span-2">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Social-Emotional Skills</h5>
                          </div>
                          {[
                            { label: '🛡️ Confidence Level', value: report.confidence },
                            { label: '⚡ Persistence & Grit', value: report.persistence },
                            { label: '🧠 Self-Management', value: report.selfManagement },
                            { label: '⏰ Punctuality & Timing', value: report.punctuality },
                            { label: '💬 Communication', value: report.communication }
                          ].map((item, idx) => (
                            <div key={`se-${idx}`} className="flex justify-between items-center p-4 bg-slate-50/30 border border-slate-100 rounded-2xl">
                              <span className="text-sm font-bold text-slate-600">{item.label}</span>
                              <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${item.value === 'Excellent' ? 'bg-indigo-600 text-white' :
                                item.value === 'Good' ? 'bg-indigo-100 text-indigo-600' :
                                  item.value === 'Average' ? 'bg-slate-200 text-slate-700' :
                                    item.value === 'Poor' ? 'bg-slate-400 text-white' :
                                      'bg-slate-50 text-slate-300 border border-slate-100'
                                }`}>
                                {item.value || 'Not Rated'}
                              </span>
                            </div>
                          ))}

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 pt-8 border-t border-slate-100">
                            {report.positiveBehavior && (
                              <div className="p-5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                                <span className="block text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-2">🌟 Positive Highlights</span>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">"{report.positiveBehavior}"</p>
                              </div>
                            )}
                            {report.disruptiveBehavior && (
                              <div className="p-5 bg-rose-50/50 rounded-2xl border border-rose-100/50">
                                <span className="block text-[8px] font-black text-rose-600 uppercase tracking-widest mb-2">⚠️ Areas for Improvement</span>
                                <p className="text-sm font-medium text-slate-700 leading-relaxed italic">"{report.disruptiveBehavior}"</p>
                              </div>
                            )}
                          </div>

                          <div className="md:col-span-2 pt-4">
                            <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 border-b border-slate-100 pb-2">Activity Engagement</h5>
                          </div>
                          {[
                            { label: '🏃 Sports & Games', value: report.sports, info: report.sportsInfo },
                            { label: '🗣️ Debate & Culture', value: report.debate, info: report.debateInfo },
                            { label: '🤝 Social Responsibility', value: report.csr, info: report.csrInfo }
                          ].map((item, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl">
                              <span className="text-sm font-bold text-slate-500">{item.label}</span>
                              <div className="text-right">
                                <span className="block text-sm font-black text-slate-900 uppercase tracking-tight">{item.value || 'Not Participated'}</span>
                                {item.info && (
                                  <span className="block text-xs font-bold text-emerald-600 mt-1 bg-emerald-50 px-2 py-0.5 rounded-lg inline-block">
                                    🏆 {item.info}
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="pt-6 border-t border-slate-50">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Principal / Teacher Remarks</span>
                        <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 italic text-purple-900 text-sm">
                          "{report.remarks || 'Maintains a positive and proactive attitude towards all institutional activities.'}"
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeTab === 'assignments' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-10 border-l-4 border-slate-900 pl-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Assignments</h3>
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest mt-1">Pending & Submitted Tasks</p>
              </div>
            </div>

            {assignments.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
                <div className="text-8xl mb-6 grayscale opacity-20 animate-pulse-slow">📚</div>
                <h3 className="text-2xl font-black text-slate-600 mb-2">No Assignments</h3>
                <p className="text-slate-400 font-bold max-w-sm mx-auto text-lg italic">You have no pending assignments at this time.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {assignments.map(assignment => {
                  const isLate = new Date() > new Date(assignment.deadline) && !assignment.submission;
                  const status = assignment.submission ? assignment.submission.status : (isLate ? 'Missing' : 'Active');
                  const statusColor = assignment.submission
                    ? (assignment.submission.status === 'Graded' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700')
                    : (isLate ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700');

                  return (
                    <div key={assignment._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all p-6 relative overflow-hidden">
                      <div className={`absolute top-4 right-4 text-xs font-black uppercase px-3 py-1 rounded-full ${statusColor}`}>
                        {status}
                      </div>
                      <h4 className="text-xl font-black text-slate-900 mb-1 pr-16">{assignment.title}</h4>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">{assignment.subject}</p>

                      <p className="text-slate-600 text-sm mb-4 line-clamp-3">{assignment.description}</p>

                      <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-4 bg-slate-50 p-2 rounded-lg">
                        <span>🏆 {assignment.totalMarks} Marks</span>
                        <span>📅 Due: {new Date(assignment.deadline).toLocaleDateString()}</span>
                      </div>

                      {assignment.submission ? (
                        <div className="bg-slate-50 p-4 rounded-xl">
                          <p className="text-sm font-bold text-slate-700 mb-1">Your Submission:</p>
                          <a href={assignment.submission.content} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-xs hover:underline break-all block mb-2">
                            {assignment.submission.content}
                          </a>
                          {assignment.submission.status === 'Graded' && (
                            <div className="mt-2 border-t border-slate-200 pt-2">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-xs font-black uppercase text-slate-400">Grade</span>
                                <span className="text-lg font-black text-green-600">{assignment.submission.marks}/{assignment.totalMarks}</span>
                              </div>
                              <p className="text-xs italic text-slate-600">"{assignment.submission.feedback}"</p>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="mt-4">
                          <form onSubmit={(e) => {
                            e.preventDefault();
                            handleAssignmentSubmit(assignment._id, e.target.content.value);
                          }}>
                            <input
                              name="content"
                              type="text"
                              placeholder="Paste link or text here..."
                              className="input-field text-sm mb-2"
                              required
                            />
                            <button type="submit" className="w-full btn-primary py-2 text-sm">Submit Assignment 📤</button>
                          </form>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeTab === 'notices' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <h3 className="text-2xl font-black text-slate-900 mb-10 border-l-4 border-slate-900 pl-4">📢 Institutional Communications</h3>
            {notices.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                <div className="text-8xl mb-6 grayscale opacity-30 animate-bounce-slow">📭</div>
                <p className="text-xl font-black text-slate-400">Bulletin board is currently clear.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-8">
                {notices.map((notice) => (
                  <div key={notice._id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10 group-hover:bg-slate-100 transition-colors"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                      <h4 className="text-3xl font-black text-slate-900 tracking-tight">{notice.title}</h4>
                      <span className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-md">
                        {new Date(notice.createdAt).toLocaleDateString(undefined, { dateStyle: 'full' })}
                      </span>
                    </div>
                    <p className="text-slate-500 font-medium text-xl leading-relaxed whitespace-pre-wrap max-w-5xl">{notice.content}</p>
                    <div className="mt-10 pt-8 border-t border-slate-50 flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-xl">🏢</div>
                      <div>
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Source Delegation</span>
                        <span className="text-sm font-black text-slate-900 uppercase">Administrative Office</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default StudentPortal;


