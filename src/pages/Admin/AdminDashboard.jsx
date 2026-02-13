import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminAPI } from '../../services/api';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis } from 'recharts';
import DashboardLayout from '../../components/Layout/DashboardLayout';

import { CLASSES } from '../../utils/constants';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [userType, setUserType] = useState('student');
  const [studentForm, setStudentForm] = useState({ name: '', email: '', password: '', course: '', year: '', fee: '' });
  const [teacherForm, setTeacherForm] = useState({ name: '', email: '', password: '', stream: '', department: '', assignedClass: '' });
  const [academicYearForm, setAcademicYearForm] = useState({ yearName: '', startDate: '', endDate: '' });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [analytics, setAnalytics] = useState(null);
  const [notices, setNotices] = useState([]);
  const [noticeForm, setNoticeForm] = useState({ title: '', content: '', targetAudience: 'all' });
  const [studentAttendance, setStudentAttendance] = useState([]);
  const [studentReports, setStudentReports] = useState([]);
  const [atRiskStudents, setAtRiskStudents] = useState([]);
  const [activityReportsAdmin, setActivityReportsAdmin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState('');
  const [academicYearsList, setAcademicYearsList] = useState([]);
  const [dashboardFilters, setDashboardFilters] = useState({ course: 'All', academicYear: 'All' });


  useEffect(() => {
    fetchUsers();
    fetchNotices();
    fetchAcademicYears();
  }, []);

  const fetchAcademicYears = async () => {
    try {
      const response = await adminAPI.getAcademicYears();
      setAcademicYearsList(response.data);
    } catch (error) {
      console.error('Error fetching academic years:', error);
    }
  };

  const fetchAttendance = async (queryId = searchId) => {
    setUserType('studentAttendance');
    setLoading(true);
    try {
      const params = {};
      if (queryId) params.studentId = queryId;
      if (dashboardFilters.course !== 'All') params.course = dashboardFilters.course;
      if (dashboardFilters.academicYear !== 'All') params.academicYear = dashboardFilters.academicYear;

      const response = await adminAPI.getAttendance(params);
      setStudentAttendance(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReports = async (queryId = searchId) => {
    setUserType('studentReports');
    setLoading(true);
    try {
      const params = {};
      if (queryId) params.studentId = queryId;
      if (dashboardFilters.course !== 'All') params.course = dashboardFilters.course;
      if (dashboardFilters.academicYear !== 'All') params.academicYear = dashboardFilters.academicYear;

      const response = await adminAPI.getReports(params);
      setStudentReports(response.data);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await adminAPI.getAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await adminAPI.getAllNotices();
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleNoticeSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addNotice(noticeForm);
      setNoticeForm({ title: '', content: '', targetAudience: 'all' });
      fetchNotices();
      alert('Notice created successfully!');
    } catch (error) {
      console.error('Error creating notice:', error);
    }
  };

  const handleNoticeDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await adminAPI.deleteNotice(id);
        fetchNotices();
      } catch (error) {
        console.error('Error deleting notice:', error);
      }
    }
  };

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.addStudent(studentForm);
      setGeneratedCredentials({ ...response.data, type: 'student', name: studentForm.name });
      setStudentForm({ name: '', email: '', password: '', course: '', year: '', fee: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating student:', error);
    }
  };

  const handleTeacherSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await adminAPI.addTeacher(teacherForm);
      setGeneratedCredentials({ ...response.data, type: 'teacher', name: teacherForm.name });
      setTeacherForm({ name: '', email: '', password: '', stream: '', department: '', assignedClass: '' });
      fetchUsers();
    } catch (error) {
      console.error('Error creating teacher:', error);
    }
  };

  const handleAcademicYearSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminAPI.addAcademicYear(academicYearForm);
      alert('Academic Year created successfully!');
      setAcademicYearForm({ yearName: '', startDate: '', endDate: '' });
    } catch (error) {
      console.error('Error creating academic year:', error);
      alert('Failed to create academic year');
    }
  };

  const fetchActivityReports = async (queryId = searchId) => {
    setUserType('activityReports');
    setLoading(true);
    try {
      const params = {};
      if (queryId) params.studentId = queryId;
      if (dashboardFilters.course !== 'All') params.course = dashboardFilters.course;
      if (dashboardFilters.academicYear !== 'All') params.academicYear = dashboardFilters.academicYear;

      const response = await adminAPI.getActivityReports(params);
      setActivityReportsAdmin(response.data);
    } catch (error) {
      console.error('Error fetching activity reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAtRiskStudents = async () => {
    setUserType('atRisk');
    setLoading(true);
    try {
      const params = {};
      if (searchId) params.studentId = searchId;
      if (dashboardFilters.course !== 'All') params.course = dashboardFilters.course;
      if (dashboardFilters.academicYear !== 'All') params.academicYear = dashboardFilters.academicYear;

      const response = await adminAPI.getAtRiskStudents(params);
      setAtRiskStudents(response.data);
    } catch (error) {
      console.error('Error fetching at-risk students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getAnalytics();
      setAnalytics(response.data);
      setUserType('analytics');
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  const teachers = users.filter(u => u.role === 'Teacher');
  const students = users.filter(u => u.role === 'Student');
  const courses = ['All', ...new Set([...CLASSES, ...students.map(s => s.course)])];
  const years = ['All', ...new Set([...academicYearsList.map(y => y.yearName), ...students.map(s => s.year)])];

  const filteredStudents = students.filter(s => {
    const courseMatch = selectedCourse === 'All' || s.course === selectedCourse;
    const yearMatch = selectedYear === 'All' || s.year === selectedYear;
    return courseMatch && yearMatch;
  });

  return (
    <DashboardLayout
      title="Admin Dashboard"
      subtitle="Manage students, teachers, and school analytics"
    >
      <div className="glass-card mb-12">
        <div className="flex flex-wrap gap-4 mb-8">
          {[
            { id: 'student', label: 'Add Student 👨‍🎓', color: 'from-slate-800 to-slate-900' },
            { id: 'teacher', label: 'Add Teacher 👨‍🏫', color: 'from-slate-700 to-slate-800' },
            { id: 'academicYear', label: 'Academic Year 📅', color: 'from-emerald-700 to-emerald-800' },
            { id: 'studentAttendance', label: 'Attendance 📅', color: 'from-orange-700 to-orange-800' },
            { id: 'atRisk', label: 'Risk Flags 🚩', color: 'from-red-700 to-red-800', action: fetchAtRiskStudents },
            { id: 'studentReports', label: 'Reports 📑', color: 'from-purple-700 to-purple-800', action: fetchReports },
            { id: 'notices', label: 'Notices 📢', color: 'from-blue-700 to-blue-800' },
            { id: 'activityReports', label: 'Activities 🏆', color: 'from-indigo-700 to-indigo-800', action: fetchActivityReports },
            { id: 'timetable', label: 'Timetable 📅', color: 'from-slate-900 to-black', action: () => navigate('/admin/timetable') },
            { id: 'analytics', label: 'Analytics 📊', color: 'from-slate-600 to-slate-700', action: fetchAnalytics },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => tab.action ? tab.action() : setUserType(tab.id)}
              className={`flex-1 min-w-[150px] py-4 px-6 rounded-2xl font-black transition-all duration-300 ${userType === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white shadow-xl scale-[1.02]`
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>


        {userType === 'student' ? (
          <form onSubmit={handleStudentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
            <div className="space-y-2">
              <label className="label-text">Full Name</label>
              <input
                type="text"
                value={studentForm.name}
                onChange={(e) => setStudentForm({ ...studentForm, name: e.target.value })}
                className="input-field"
                placeholder="John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Email Address</label>
              <input
                type="email"
                value={studentForm.email}
                onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })}
                className="input-field"
                placeholder="john@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Password (Optional)</label>
              <input
                type="password"
                value={studentForm.password}
                onChange={(e) => setStudentForm({ ...studentForm, password: e.target.value })}
                className="input-field"
                placeholder="Leave blank to auto-generate"
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Course / Branch</label>
              <select
                value={studentForm.course}
                onChange={(e) => setStudentForm({ ...studentForm, course: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select Course</option>
                {CLASSES.map(branch => (
                  <option key={branch} value={branch}>{branch}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="label-text">Admission Year</label>
              <select
                value={studentForm.year}
                onChange={(e) => setStudentForm({ ...studentForm, year: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select Year</option>
                {academicYearsList.map(year => (
                  <option key={year._id} value={year.yearName}>{year.yearName}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="label-text">Annual Fee (₹)</label>
              <input
                type="number"
                value={studentForm.fee}
                onChange={(e) => setStudentForm({ ...studentForm, fee: e.target.value })}
                className="input-field"
                placeholder="50000"
                required
              />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Create Student Profile 🎓
              </button>
            </div>
          </form>
        ) : userType === 'teacher' ? (
          <form onSubmit={handleTeacherSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
            <div className="space-y-2">
              <label className="label-text">Full Name</label>
              <input
                type="text"
                value={teacherForm.name}
                onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                className="input-field"
                placeholder="Dr. Jane Smith"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Email Address</label>
              <input
                type="email"
                value={teacherForm.email}
                onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                className="input-field"
                placeholder="jane@school.edu"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Password (Optional)</label>
              <input
                type="password"
                value={teacherForm.password}
                onChange={(e) => setTeacherForm({ ...teacherForm, password: e.target.value })}
                className="input-field"
                placeholder="Leave blank to auto-generate"
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Select Class (1-12)</label>
              <select
                value={teacherForm.assignedClass}
                onChange={(e) => setTeacherForm({ ...teacherForm, assignedClass: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select Class</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>Class {i + 1}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="label-text">Appointed Department</label>
              <input
                type="text"
                value={teacherForm.department}
                onChange={(e) => setTeacherForm({ ...teacherForm, department: e.target.value })}
                className="input-field"
                placeholder="e.g. Science, English, Mathematics"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Faculty Stream (General Category)</label>
              <select
                value={teacherForm.stream}
                onChange={(e) => setTeacherForm({ ...teacherForm, stream: e.target.value })}
                className="input-field"
                required
              >
                <option value="">Select Stream</option>
                {['CS', 'ECE', 'EEE', 'Mechanical', 'Civil', 'Agriculture', 'Forensic Science', 'Basic Sciences', 'Arts', 'Commerce'].map(stream => (
                  <option key={stream} value={stream}>{stream}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Create Teacher Profile 📚
              </button>
            </div>
          </form>
        ) : userType === 'academicYear' ? (
          <form onSubmit={handleAcademicYearSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-in fade-in slide-in-from-top-4">
            <div className="space-y-2">
              <label className="label-text">Year Identifier</label>
              <input
                type="text"
                value={academicYearForm.yearName}
                onChange={(e) => setAcademicYearForm({ ...academicYearForm, yearName: e.target.value })}
                className="input-field"
                placeholder="2024-2025"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Term Start Date</label>
              <input
                type="date"
                value={academicYearForm.startDate}
                onChange={(e) => setAcademicYearForm({ ...academicYearForm, startDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="label-text">Term End Date</label>
              <input
                type="date"
                value={academicYearForm.endDate}
                onChange={(e) => setAcademicYearForm({ ...academicYearForm, endDate: e.target.value })}
                className="input-field"
                required
              />
            </div>
            <div className="md:col-span-3 mt-4">
              <button type="submit" className="w-full btn-primary py-5 text-lg">
                Activate New Academic Year 📅
              </button>
            </div>
          </form>
        ) : userType === 'notices' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-slate-900 pl-4">📢 Official Communications</h3>
            <form onSubmit={handleNoticeSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 p-8 bg-slate-50/50 rounded-3xl border border-slate-100 shadow-inner">
              <div className="space-y-2">
                <label className="label-text">Notice Title</label>
                <input
                  type="text"
                  value={noticeForm.title}
                  onChange={(e) => setNoticeForm({ ...noticeForm, title: e.target.value })}
                  className="input-field"
                  placeholder="Final Examination Schedule"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Target Recipient Group</label>
                <select
                  value={noticeForm.targetAudience}
                  onChange={(e) => setNoticeForm({ ...noticeForm, targetAudience: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="All">Universal (All Users)</option>
                  <option value="Student">Student Body</option>
                  <option value="Teacher">Faculty Members</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="label-text">Message Content</label>
                <textarea
                  value={noticeForm.content}
                  onChange={(e) => setNoticeForm({ ...noticeForm, content: e.target.value })}
                  className="input-field min-h-[150px] resize-none"
                  placeholder="Enter the official announcement details here..."
                  required
                />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full btn-primary py-5 text-lg">
                  Broadcast Official Notice 📢
                </button>
              </div>
            </form>

            <div className="space-y-6">
              <h4 className="font-black text-slate-500 uppercase tracking-widest text-xs flex items-center gap-3">
                Current Active Broadcasts
                <span className="h-px flex-grow bg-slate-100"></span>
              </h4>
              {notices.length === 0 ? (
                <div className="text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic text-lg">No active communications found.</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {notices.map((notice) => (
                    <div key={notice._id} className="p-8 bg-white rounded-3xl border border-slate-100 flex justify-between items-start group shadow-sm hover:shadow-md transition-all">
                      <div className="flex-grow">
                        <div className="flex items-center gap-4 mb-3">
                          <span className="font-black text-slate-900 text-xl tracking-tight">{notice.title}</span>
                          <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${notice.targetAudience === 'All' ? 'bg-slate-100 text-slate-600' :
                            notice.targetAudience === 'Student' ? 'bg-blue-50 text-blue-700' :
                              'bg-emerald-50 text-emerald-700'
                            }`}>
                            {notice.targetAudience}
                          </span>
                        </div>
                        <p className="text-slate-500 font-medium text-lg leading-relaxed whitespace-pre-wrap max-w-4xl">{notice.content}</p>
                        <div className="flex items-center gap-4 mt-6">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-wider">{new Date(notice.createdAt).toLocaleString(undefined, { dateStyle: 'full', timeStyle: 'short' })}</p>
                          <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                          <span className="text-xs font-black text-slate-400 uppercase">Author: Administrative Office</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleNoticeDelete(notice._id)}
                        className="px-5 py-2 text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all font-black text-xs uppercase tracking-widest border border-red-100 opacity-0 group-hover:opacity-100"
                      >
                        Retract
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : userType === 'studentAttendance' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-l-4 border-slate-900 pl-4">
              <h3 className="text-2xl font-black text-slate-900">📅 Student Attendance Log</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Student ID (username)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-medium w-64"
                />
                <button
                  onClick={() => fetchAttendance()}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 p-6 bg-slate-50/50 rounded-2xl border border-slate-100">
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by Class</label>
                <select
                  value={dashboardFilters.course}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Classes</option>
                  {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Filter by Academic Year</label>
                <select
                  value={dashboardFilters.academicYear}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, academicYear: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Years</option>
                  {academicYearsList.map(year => <option key={year._id} value={year._id}>{year.yearName}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => fetchAttendance()}
                  className="px-8 py-2 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md active:scale-95"
                >
                  Apply Filters ⚡
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Student Info</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Date</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Status</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Subject Name</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                          <p className="text-slate-400 font-bold animate-pulse">Fetching records...</p>
                        </div>
                      </td>
                    </tr>
                  ) : studentAttendance.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="p-12 text-center text-slate-400 font-bold italic">No records found. Please enter a valid Student ID.</td>
                    </tr>
                  ) : (
                    studentAttendance.map((record) => (
                      <tr key={record._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="p-4 border-b">
                          <div className="font-bold text-slate-800">{record.studentName || 'Unknown Student'}</div>
                          <div className="text-[10px] text-slate-400 uppercase font-black">{record.academicYearName}</div>
                        </td>
                        <td className="p-4 border-b text-slate-600 text-sm font-bold">
                          {record.date ? new Date(record.date).toLocaleDateString() : 'Date Missing'}
                        </td>
                        <td className="p-4 border-b">
                          <span className={`px-4 py-1.5 rounded-xl font-black text-[10px] uppercase tracking-widest ${String(record.status).toLowerCase() === 'present' ? 'bg-emerald-50 text-emerald-700' :
                            String(record.status).toLowerCase() === 'absent' ? 'bg-rose-50 text-rose-700' :
                              'bg-amber-50 text-amber-700'
                            }`}>
                            {record.status || 'No Status'}
                          </span>
                        </td>
                        <td className="p-4 border-b text-slate-500 text-xs font-black uppercase">
                          {record.subject || 'No Subject'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : userType === 'atRisk' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-l-4 border-red-600 pl-4">
              <div>
                <h3 className="text-2xl font-black text-slate-900">🚩 At-Risk Students Identified</h3>
                <p className="text-slate-500 font-medium">Early intervention for low engagement</p>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search Student ID..."
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600 text-sm font-medium w-64"
                />
                <button
                  onClick={() => fetchAtRiskStudents()}
                  className="bg-red-600 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-colors shadow-md"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8 p-6 bg-red-50/20 rounded-2xl border border-red-100">
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Filter by Class</label>
                <select
                  value={dashboardFilters.course}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-red-100 focus:ring-2 focus:ring-red-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Classes</option>
                  {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-red-400 uppercase tracking-widest">Filter by Academic Year</label>
                <select
                  value={dashboardFilters.academicYear}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, academicYear: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-red-100 focus:ring-2 focus:ring-red-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">Active Year (Default)</option>
                  {academicYearsList.map(year => <option key={year._id} value={year._id}>{year.yearName}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => fetchAtRiskStudents()}
                  className="px-8 py-2 bg-red-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-md active:scale-95"
                >
                  Run Analysis ⚡
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Student Info</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Class / Year</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Attendance %</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Consecutive Absences</th>
                    <th className="p-4 font-black uppercase text-xs tracking-widest text-slate-500 border-b">Risk Reasons</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                          <div className="w-12 h-12 border-4 border-red-200 border-t-red-600 rounded-full animate-spin"></div>
                          <p className="text-slate-400 font-bold animate-pulse">Running risk analysis algorithms...</p>
                        </div>
                      </td>
                    </tr>
                  ) : atRiskStudents.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="p-12 text-center text-slate-400 font-bold italic">No students currently flagged as "at risk". Excellent!</td>
                    </tr>
                  ) : (
                    atRiskStudents.map((student) => (
                      <tr key={student._id} className="hover:bg-red-50/30 transition-colors">
                        <td className="p-4 border-b">
                          <div className="font-bold text-slate-800">{student.name}</div>
                          <div className="text-[10px] text-slate-400 uppercase font-black">{student.username}</div>
                        </td>
                        <td className="p-4 border-b text-slate-600 text-sm font-bold">
                          {student.course} | {student.year}
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex items-center gap-3">
                            <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${Number(student.attendancePercentage) < 50 ? 'bg-red-600' : 'bg-orange-500'}`}
                                style={{ width: `${student.attendancePercentage}%` }}
                              />
                            </div>
                            <span className="font-black text-slate-900 text-sm">{student.attendancePercentage}%</span>
                          </div>
                        </td>
                        <td className="p-4 border-b text-center">
                          <span className={`inline-block px-3 py-1 rounded-lg font-black text-sm ${student.maxConsecutiveAbsences >= 5 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                            {student.maxConsecutiveAbsences}
                          </span>
                        </td>
                        <td className="p-4 border-b">
                          <div className="flex flex-wrap gap-2">
                            {student.riskReasons.map((reason, idx) => (
                              <span key={idx} className="px-2 py-1 bg-red-600 text-white text-[9px] font-black uppercase tracking-wider rounded">
                                {reason}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : userType === 'studentReports' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-l-4 border-slate-900 pl-4">
              <h3 className="text-2xl font-black text-slate-900">📑 Academic Reports (Results)</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Student ID (username)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-medium w-64"
                />
                <button
                  onClick={() => fetchReports()}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 p-6 bg-purple-50/30 rounded-2xl border border-purple-100">
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Filter by Class</label>
                <select
                  value={dashboardFilters.course}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-purple-100 focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Classes</option>
                  {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-purple-400 uppercase tracking-widest">Filter by Academic Year</label>
                <select
                  value={dashboardFilters.academicYear}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, academicYear: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-purple-100 focus:ring-2 focus:ring-purple-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Years</option>
                  {academicYearsList.map(year => <option key={year._id} value={year._id}>{year.yearName}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => fetchReports()}
                  className="px-8 py-2 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-700 transition-all shadow-md active:scale-95"
                >
                  Fetch Reports ⚡
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? (
                <div className="md:col-span-2 text-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold animate-pulse">Compiling scholarly reports...</p>
                  </div>
                </div>
              ) : studentReports.length === 0 ? (
                <div className="md:col-span-2 text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic text-lg">No result records found.</p>
                </div>
              ) : (
                studentReports.map((report) => (
                  <div key={report._id} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-black text-slate-900 text-xl tracking-tight mb-1">{report.studentName}</h4>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{report.academicYearName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-slate-900">{report.grade}</div>
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Grade</div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                        <span className="font-bold text-slate-500">Subject:</span>
                        <span className="font-black text-slate-800 uppercase text-xs">{report.subject}</span>
                      </div>
                      <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                        <span className="font-bold text-slate-500">Score:</span>
                        <span className="font-black text-slate-800">{report.marks} / {report.totalMarks}</span>
                      </div>
                      <div className="flex justify-between text-sm py-2 border-b border-slate-50">
                        <span className="font-bold text-slate-500">Teacher:</span>
                        <span className="font-black text-slate-800">{report.teacherName}</span>
                      </div>
                      <div className="pt-4">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Principal Remarks</p>
                        <p className="text-slate-600 font-medium italic bg-slate-50 p-4 rounded-2xl border border-slate-100/50 text-sm">
                          "{report.remarks || 'No remarks provided.'}"
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : userType === 'activityReports' ? (
          <div className="animate-in fade-in slide-in-from-top-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-l-4 border-slate-900 pl-4">
              <h3 className="text-2xl font-black text-slate-900">🏆 Co-curricular Monitoring</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Student ID (username)"
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                  className="px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900 text-sm font-medium w-64"
                />
                <button
                  onClick={() => fetchActivityReports()}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-colors"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-12 p-6 bg-indigo-50/30 rounded-2xl border border-indigo-100">
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Filter by Class</label>
                <select
                  value={dashboardFilters.course}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, course: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Classes</option>
                  {CLASSES.map(cls => <option key={cls} value={cls}>{cls}</option>)}
                </select>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Filter by Academic Year</label>
                <select
                  value={dashboardFilters.academicYear}
                  onChange={(e) => setDashboardFilters({ ...dashboardFilters, academicYear: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl border border-indigo-100 focus:ring-2 focus:ring-indigo-600 outline-none font-bold text-slate-700 bg-white"
                >
                  <option value="All">All Years</option>
                  {academicYearsList.map(year => <option key={year._id} value={year._id}>{year.yearName}</option>)}
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => fetchActivityReports()}
                  className="px-8 py-2 bg-indigo-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-md active:scale-95"
                >
                  Apply Filters ⚡
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {loading ? (
                <div className="md:col-span-2 text-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-bold animate-pulse">Scanning student activity profiles...</p>
                  </div>
                </div>
              ) : activityReportsAdmin.length === 0 ? (
                <div className="md:col-span-2 text-center py-20 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold italic text-lg">No activity reports found.</p>
                </div>
              ) : (
                activityReportsAdmin.map((report) => {
                  const ratingToMark = (r) => {
                    if (r === 'Excellent') return 100;
                    if (r === 'Good') return 80;
                    if (r === 'Average') return 60;
                    if (r === 'Poor') return 40;
                    return 0;
                  };

                  const behaviorData = [
                    { subject: 'Punctuality', A: ratingToMark(report.punctuality) },
                    { subject: 'Behavior', A: ratingToMark(report.behavior) },
                    { subject: 'Communication', A: ratingToMark(report.communication) },
                    { subject: 'Confidence', A: ratingToMark(report.confidence) },
                    { subject: 'Persistence', A: ratingToMark(report.persistence) },
                    { subject: 'Self-Mgmt', A: ratingToMark(report.selfManagement) },
                  ];

                  return (
                    <div key={report._id} className="p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                      <div className="flex justify-between items-start mb-6 pb-6 border-b border-slate-50">
                        <div>
                          <h4 className="font-black text-slate-900 text-xl tracking-tight mb-1">{report.student?.name || 'Unknown Student'}</h4>
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{report.academicYear?.yearName || report.academicYear} | {report.student?.username}</p>
                        </div>
                        <div className="text-right">
                          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase rounded-lg">Verified BY {report.teacher?.name}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="h-[180px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={behaviorData}>
                              <PolarGrid stroke="#f1f5f9" />
                              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 8, fontWeight: 'bold' }} />
                              <Radar name="Student" dataKey="A" stroke="#4f46e5" fill="#4f46e5" fillOpacity={0.4} />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="space-y-3">
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Sports</span>
                            <span className="text-xs font-bold text-slate-700">{report.sports || 'N/A'}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">Debate</span>
                            <span className="text-xs font-bold text-slate-700">{report.debate || 'N/A'}</span>
                          </div>
                          <div className="p-3 bg-slate-50 rounded-xl">
                            <span className="text-[8px] font-black text-slate-400 uppercase block mb-1">CSR</span>
                            <span className="text-xs font-bold text-slate-700">{report.csr || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-slate-50">
                        {report.positiveBehavior && (
                          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <span className="block text-[8px] font-black text-emerald-600 uppercase tracking-widest mb-1">🌟 Positive Highlights</span>
                            <p className="text-[10px] font-medium text-slate-700 italic">"{report.positiveBehavior}"</p>
                          </div>
                        )}
                        {report.disruptiveBehavior && (
                          <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100">
                            <span className="block text-[8px] font-black text-rose-600 uppercase tracking-widest mb-1">⚠️ Improvement Areas</span>
                            <p className="text-[10px] font-medium text-slate-700 italic">"{report.disruptiveBehavior}"</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-6 bg-slate-900 p-4 rounded-2xl">
                        <span className="text-[8px] font-black text-slate-500 uppercase block mb-2 tracking-widest">Final Faculty Remarks</span>
                        <p className="text-white text-xs italic font-medium">"{report.remarks || 'Profile evaluation completed with satisfactory results.'}"</p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : userType === 'analytics' && analytics ? (
          <div className="space-y-12 animate-in fade-in slide-in-from-top-4">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { label: 'Enrolled Students', value: analytics.summary.totalStudents.toLocaleString(), color: 'bg-slate-900', icon: '👨‍🎓' },
                { label: 'Total Revenue', value: `₹${analytics.summary.totalRevenue.toLocaleString()}`, color: 'bg-emerald-700', icon: '💰' },
                { label: 'Faculty Members', value: analytics.summary.totalTeachers.toLocaleString(), color: 'bg-slate-600', icon: '👨‍🏫' },
              ].map((card, i) => (
                <div key={i} className={`${card.color} p-10 rounded-3xl text-white shadow-xl flex flex-col relative overflow-hidden group hover:scale-[1.02] transition-all`}>
                  <div className="text-6xl font-black mb-4 relative z-10">{card.value}</div>
                  <div className="text-lg font-black opacity-80 uppercase tracking-widest flex items-center gap-2 relative z-10">
                    <span>{card.icon}</span>
                    {card.label}
                  </div>
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 text-9xl opacity-10 group-hover:scale-125 transition-transform duration-500">{card.icon}</div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
                  Student Breakdown by Course
                </h4>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.keys(analytics.courseStats || {}).map(course => ({
                          name: course,
                          value: analytics.courseStats[course]
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {['#1e293b', '#0f766e', '#3b82f6', '#6366f1', '#64748b', '#94a3b8'].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem' }}
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
                  Faculty Breakdown by Stream
                </h4>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={Object.keys(analytics.streamStats || {}).map(stream => ({
                          name: stream,
                          value: analytics.streamStats[stream]
                        }))}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={120}
                        paddingAngle={8}
                        dataKey="value"
                      >
                        {['#0f766e', '#1e293b', '#3b82f6', '#6366f1', '#64748b', '#94a3b8'].map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem' }}
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
                <h4 className="text-xl font-black text-slate-900 mb-10 flex items-center gap-3">
                  <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
                  Growth & Revenue Analytics
                </h4>
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analytics.yearWiseStats}>
                      <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#94a3b8' }} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontWeight: 'bold', fill: '#94a3b8' }} />
                      <Tooltip
                        formatter={(value) => `₹${value.toLocaleString()}`}
                        contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', padding: '1rem' }}
                      />
                      <Legend iconType="circle" />
                      <Bar dataKey="revenue" name="Revenue" fill="#0f766e" radius={[10, 10, 0, 0]} barSize={40} />
                      <Bar dataKey="studentCount" name="Total Students" fill="#1e293b" radius={[10, 10, 0, 0]} barSize={40} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Year-wise Stats */}
            <div>
              <h3 className="text-2xl font-black text-slate-900 mb-8 border-l-4 border-slate-900 pl-4">📅 Performance & Enrolment History</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {analytics.yearWiseStats.map(stat => (
                  <div key={stat.year} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:translate-y-[-4px] transition-all">
                    <div className="flex justify-between items-start mb-6">
                      <span className="text-3xl font-black text-slate-900 tracking-tighter">{stat.year}</span>
                      {stat.growth !== null && (
                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${Number(stat.growth) >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                          {Number(stat.growth) >= 0 ? 'Growth ↑' : 'Loss ↓'} {Math.abs(stat.growth)}%
                        </span>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Enrolled</span>
                        <span className="text-xl font-black text-slate-900">{stat.studentCount}</span>
                      </div>
                      <div className="p-4 bg-emerald-50/30 rounded-2xl">
                        <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Revenue</span>
                        <span className="text-xl font-black text-emerald-700">₹{stat.revenue.toLocaleString()}</span>
                      </div>
                    </div>
                    {stat.students.length > 0 && (
                      <div className="space-y-3">
                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Student Registry:</div>
                        <div className="max-h-40 overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                          {stat.students.map(s => (
                            <div key={s._id} className="text-xs bg-slate-50/50 p-3 rounded-xl flex justify-between items-center border border-slate-100/50">
                              <span className="font-bold text-slate-700 truncate mr-4">{s.name}</span>
                              <span className="text-[9px] font-black bg-white text-slate-500 px-3 py-1 rounded-lg border border-slate-100 shadow-sm">{s.course}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null
        }

        {
          generatedCredentials && (
            <div className="mt-12 p-10 bg-slate-900 border border-slate-800 rounded-[2.5rem] animate-in fade-in zoom-in shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-12 opacity-5 scale-150 rotate-12">🔑</div>
              <h3 className="font-black text-white mb-8 text-2xl flex items-center gap-4">
                <span className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-xl shadow-lg">✓</span>
                Access Credentials Generated
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Authenticated User</p>
                  <p className="text-white font-black text-lg">{generatedCredentials.name}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Dashboard Handle</p>
                  <p className="text-blue-400 font-mono font-black text-lg">@{generatedCredentials.username}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-md p-6 rounded-2xl border border-slate-700">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Access Token</p>
                  <p className="text-emerald-400 font-mono font-black text-lg">{generatedCredentials.password}</p>
                </div>
              </div>
              <p className="mt-8 text-slate-500 text-sm font-bold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
                Please provide these credentials to the user immediately.
              </p>
            </div>
          )
        }

      </div >

      {/* Bottom Section: Lists */}
      < div className="grid grid-cols-1 lg:grid-cols-2 gap-10" >
        {/* Teachers Column */}
        < div className="glass-card" >
          <h2 className="text-2xl font-black text-slate-900 mb-10 border-l-4 border-slate-900 pl-4 flex items-center justify-between">
            Teacher Faculty
            <span className="text-[10px] bg-slate-100 text-slate-500 px-4 py-1.5 rounded-full font-black uppercase tracking-widest">{teachers.length} Active</span>
          </h2>
          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar">
            {teachers.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">No faculty records found.</p>
              </div>
            ) : (
              teachers.map((teacher) => (
                <div key={teacher._id} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-slate-300 hover:shadow-lg transition-all group">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-black text-slate-900 text-xl tracking-tight mb-1">{teacher.name}</p>
                      <p className="text-sm font-black text-slate-400 mb-4">{teacher.email}</p>
                      <p className="inline-flex px-4 py-1.5 bg-slate-100 text-slate-800 font-mono font-black text-[10px] rounded-lg tracking-widest">@{teacher.username}</p>
                    </div>
                    <span className="bg-slate-900 text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-md">
                      {teacher.stream}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div >

        {/* Students Column */}
        < div className="glass-card" >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 gap-6 border-l-4 border-slate-900 pl-4">
            <h2 className="text-2xl font-black text-slate-900">
              Student Registry
            </h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-slate-900 bg-white font-black text-xs uppercase tracking-widest text-slate-600"
              >
                {courses.map(course => <option key={course} value={course}>{course}</option>)}
              </select>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-100 rounded-2xl focus:outline-none focus:border-slate-900 bg-white font-black text-xs uppercase tracking-widest text-slate-600"
              >
                {years.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-3 custom-scrollbar">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                <p className="text-slate-400 font-bold italic">No matching student records.</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <div key={student._id} className="p-8 bg-white border border-slate-100 rounded-3xl hover:border-slate-300 hover:shadow-lg transition-all group">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                    <div className="flex-1">
                      <p className="font-black text-slate-900 text-xl tracking-tight mb-1 flex items-center gap-2">
                        {student.name}
                        {student.isAtRisk && <span className="text-sm bg-red-100 text-red-600 px-2 py-0.5 rounded-lg border border-red-200">🚩 Risk</span>}
                      </p>
                      <p className="text-sm font-black text-slate-400 mb-4">{student.email}</p>
                      <p className="inline-flex px-4 py-1.5 bg-slate-100 text-slate-800 font-mono font-black text-[10px] rounded-lg tracking-widest">@{student.username}</p>
                    </div>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <span className="bg-slate-100 text-slate-900 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-slate-200">{student.course}</span>
                      <span className="bg-blue-50 text-blue-800 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-blue-100">{student.year} Intake</span>
                      <span className="bg-emerald-50 text-emerald-800 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border border-emerald-100">₹{Number(student.fee).toLocaleString()} Paid</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div >
      </div >
    </DashboardLayout >
  );
};

export default AdminDashboard;

