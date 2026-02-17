import React, { useState, useEffect } from 'react';
import { teacherAPI, authAPI, BASE_URL } from '../../services/api';
import DashboardLayout from '../../components/Layout/DashboardLayout';
import { CLASSES, SUBJECTS } from '../../utils/constants';

const SPORTS_OPTIONS = ['Cricket', 'Football', 'Basketball', 'Volleyball', 'Chess', 'Badminton', 'Athletics', 'Swimming', 'Table Tennis', 'Other'];
const DEBATE_OPTIONS = ['Inter-House Debate', 'Inter-School Debate', 'Regional Level', 'National Level', 'Model United Nations (MUN)', 'Public Speaking', 'Elocution', 'Other'];
const CSR_OPTIONS = ['NSS (National Service Scheme)', 'NCC (National Cadet Corps)', 'Scouts & Guides', 'Community Service', 'Plantation Drive', 'Swachh Bharat Abhiyan', 'Blood Donation Camp', 'Other'];
const ACHIEVEMENT_OPTIONS = ['Winner', 'Runner-up', 'First Position', 'Second Position', 'Third Position', 'Man of the Match', 'Participant', 'Other'];
const SESSION_OPTIONS = [
  '09:30 AM - 10:30 AM',
  '10:30 AM - 11:30 AM',
  '11:30 AM - 12:30 PM',
  '01:30 PM - 02:30 PM',
  '02:30 PM - 03:30 PM',
  '03:30 PM - 04:30 PM',
  '04:30 PM - 05:30 PM'
];

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const [branches, setBranches] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [isSelectionComplete, setIsSelectionComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  const [activeTab, setActiveTab] = useState('results');
  const [resultData, setResultData] = useState({
    student: '',
    academicYear: '',
    subject: '',
    grade: '',
    marks: '',
    totalMarks: '',
    remarks: '',
    examType: ''
  });
  const [attendanceData, setAttendanceData] = useState({
    student: '',
    academicYear: '',
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    remarks: '',
    subject: '',
    attendanceType: 'Regular',
    timing: ''
  });
  const [activityData, setActivityData] = useState({
    studentId: '',
    academicYear: '',
    sports: '',
    sportsInfo: '',
    debate: '',
    debateInfo: '',
    csr: '',
    csrInfo: '',
    punctuality: '',
    behavior: '',
    positiveBehavior: '',
    disruptiveBehavior: '',
    communication: '',
    confidence: '',
    persistence: '',
    selfManagement: '',
    remarks: ''
  });

  const [profile, setProfile] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const [notices, setNotices] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    fetchInitialData();
    fetchNotices();
  }, []);

  useEffect(() => {
    if (selectedBranch) {
      fetchSubjects(selectedBranch);
    } else {
      setAvailableSubjects([]);
      setSelectedSubject('');
    }
  }, [selectedBranch]);

  const fetchSubjects = async (branch) => {
    try {
      // Use local constant for subjects to ensure consistency
      if (SUBJECTS[branch]) {
        setAvailableSubjects(SUBJECTS[branch]);
      } else {
        // Fallback to API if not in constants (unlikely if branch selection is restricted)
        const response = await teacherAPI.getSubjects(branch);
        setAvailableSubjects(response.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to load subjects');
    }
  };

  const fetchInitialData = async () => {
    try {
      console.log('Fetching initial data...');
      const [yearsRes, profileRes] = await Promise.all([
        teacherAPI.getAcademicYears(),
        authAPI.getProfile()
      ]);
      console.log('Years response:', yearsRes);

      setProfile(profileRes.data);
      setBranches(CLASSES); // Use constant CLASSES

      if (yearsRes.data && Array.isArray(yearsRes.data)) {
        setAcademicYears(yearsRes.data);
      } else {
        console.error('Invalid years data format:', yearsRes.data);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Failed to load initial data: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleLoadStudents = async () => {
    if (!selectedBranch || !selectedYear) {
      alert('Please select Branch and Academic Year');
      return;
    }
    setLoading(true);
    try {
      const response = await teacherAPI.getStudents(selectedBranch);
      setStudents(response.data);
      setIsSelectionComplete(true);

      // Pre-fill some data
      setAttendanceData(prev => ({ ...prev, academicYear: selectedYear }));
      setResultData(prev => ({ ...prev, academicYear: selectedYear }));
      setActivityData(prev => ({ ...prev, academicYear: selectedYear }));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNotices = async () => {
    try {
      const response = await teacherAPI.getNotices();
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await authAPI.uploadProfilePicture(formData);
      setProfile({ ...profile, profilePicture: response.data.profilePicture });
      alert('Profile picture updated!');
      setShowUploadModal(false);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  const handleResultSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherAPI.addResult({ ...resultData, marks: Number(resultData.marks), totalMarks: Number(resultData.totalMarks) });
      setResultData({ student: '', academicYear: selectedYear, subject: selectedSubject, grade: '', marks: '', totalMarks: '', remarks: '', examType: '' });
      alert('Result added successfully');
    } catch (error) {
      console.error('Error adding result:', error);
    }
  };

  const handleAttendanceSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherAPI.addAttendance({ ...attendanceData, date: new Date(attendanceData.date) });
      setAttendanceData({
        student: '',
        academicYear: selectedYear,
        date: attendanceData.date,
        status: 'present',
        remarks: '',
        subject: selectedSubject,
        attendanceType: 'Regular',
        timing: ''
      });
      alert('Attendance recorded successfully');
    } catch (error) {
      console.error('Error adding attendance:', error);
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...activityData, studentId: activityData.studentId };
      await teacherAPI.addActivityReport(payload);
      setActivityData({
        studentId: '',
        academicYear: selectedYear,
        sports: '',
        sportsInfo: '',
        debate: '',
        debateInfo: '',
        csr: '',
        csrInfo: '',
        punctuality: '',
        behavior: '',
        positiveBehavior: '',
        disruptiveBehavior: '',
        communication: '',
        confidence: '',
        persistence: '',
        selfManagement: '',
        remarks: ''
      });
      alert('Activity report added successfully');
    } catch (error) {
      console.error('Error adding activity report:', error);
    }
  };

  // Assignment State
  const [assignments, setAssignments] = useState([]);
  const [assignmentData, setAssignmentData] = useState({
    title: '',
    description: '',
    class: '',
    subject: '',
    totalMarks: '',
    deadline: ''
  });
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [gradingData, setGradingData] = useState({ marks: '', feedback: '' });

  useEffect(() => {
    if (activeTab === 'assignments') {
      fetchAssignments();
    }
  }, [activeTab, selectedBranch, selectedYear]);

  const fetchAssignments = async () => {
    try {
      const filters = {};
      if (selectedBranch) filters.class = selectedBranch;
      if (selectedYear) filters.academicYear = selectedYear;
      const response = await teacherAPI.getAssignments(filters);
      setAssignments(response.data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    }
  };

  const fetchSubmissions = async (assignmentId) => {
    try {
      const response = await teacherAPI.getAssignmentSubmissions(assignmentId);
      setSubmissions(response.data);
    } catch (error) {
      console.error('Error fetching submissions:', error);
    }
  };

  const handleAssignmentSubmit = async (e) => {
    e.preventDefault();
    try {
      await teacherAPI.createAssignment({
        ...assignmentData,
        class: selectedBranch,
        academicYear: selectedYear,
        totalMarks: Number(assignmentData.totalMarks)
      });
      alert('Assignment created successfully!');
      setAssignmentData({ title: '', description: '', class: '', subject: '', totalMarks: '', deadline: '' });
      fetchAssignments();
    } catch (error) {
      console.error('Error creating assignment:', error);
      alert('Failed to create assignment');
    }
  };

  const handleGradeSubmit = async (submissionId) => {
    try {
      await teacherAPI.gradeSubmission(submissionId, {
        marks: Number(gradingData.marks),
        feedback: gradingData.feedback
      });
      alert('Submission graded!');
      fetchSubmissions(selectedAssignment._id); // Refresh submissions
      setGradingData({ marks: '', feedback: '' });
    } catch (error) {
      console.error('Error grading submission:', error);
      alert('Failed to grade submission');
    }
  };


  return (
    <DashboardLayout
      title="Teacher Dashboard"
      subtitle="Manage student results and attendance"
    >
      {/* Profile Header */}
      <div className="flex justify-between items-center mb-8 glass-card">
        <div className="flex items-center gap-4">
          <div className="relative group cursor-pointer" onClick={() => setShowUploadModal(true)}>
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-200">
              {profile?.profilePicture ? (
                <img
                  src={`${BASE_URL}${profile.profilePicture}`}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-3xl">👤</div>
              )}
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white text-xs font-bold">Edit</span>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {profile?.name ? `Welcome, ${profile.name}` : 'Welcome, Teacher'}
            </h2>
            <p className="text-slate-500 font-medium">
              {profile?.role && profile?.stream
                ? `${profile.role} • ${profile.stream}`
                : 'Manage your classroom'}
            </p>
          </div>
        </div>
      </div>

      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full animate-in zoom-in-95">
            <h3 className="text-2xl font-black mb-4">Update Profile Picture</h3>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 text-center bg-slate-50">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="profile-upload"
                />
                <label htmlFor="profile-upload" className="cursor-pointer block">
                  <div className="text-4xl mb-2">📸</div>
                  <span className="font-bold text-slate-500">Click to upload photo</span>
                </label>
              </div>
              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full py-3 bg-slate-100 font-bold rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="glass-card mb-8">
        <h3 className="text-xl font-black mb-6 flex items-center gap-2">
          <span>🎯</span> Step 1: Academic Context Selection
        </h3>
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="space-y-2">
            <label className="label-text">Branch / Course</label>
            <select
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="input-field"
              disabled={isSelectionComplete}
            >
              <option value="">Select Branch...</option>
              {branches.map(b => <option key={b} value={b}>{b}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="label-text">Academic Year</label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="input-field"
              disabled={isSelectionComplete}
            >
              <option value="">Select Year...</option>
              {academicYears.map(y => <option key={y._id} value={y._id}>{y.yearName}</option>)}
            </select>
          </div>
          <div>
            {!isSelectionComplete ? (
              <button
                onClick={handleLoadStudents}
                disabled={loading}
                className="w-full btn-primary py-4"
              >
                {loading ? '⏳ Loading...' : '🚀 Load Student List'}
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsSelectionComplete(false);
                  setStudents([]);
                }}
                className="w-full bg-slate-200 text-slate-700 rounded-2xl font-black py-4 hover:bg-slate-300 transition-all"
              >
                🔄 Reset Selection
              </button>
            )}
          </div>
        </div>
      </div>

      {!isSelectionComplete && activeTab !== 'notices' ? (
        <div className="glass-card text-center py-20 grayscale opacity-50">
          <div className="text-7xl mb-6">📝</div>
          <h2 className="text-2xl font-black text-slate-400">Please complete selection above to proceed.</h2>
        </div>
      ) : (
        <div className="glass-card">
          <div className="flex flex-wrap gap-4 mb-10">
            {[
              { id: 'results', label: 'Evaluation Center 📊', color: 'from-slate-800 to-slate-900' },
              { id: 'attendance', label: 'Attendance Registry ✅', color: 'from-emerald-700 to-emerald-800' },
              { id: 'activity', label: 'Co-curricular / Behavior 🏆', color: 'from-purple-700 to-purple-800' },
              { id: 'assignments', label: 'Assignments & Projects 📚', color: 'from-indigo-600 to-indigo-800' },
              { id: 'notices', label: 'Official Notices 📢', color: 'from-blue-700 to-blue-800' },
              { id: 'timetable', label: 'Academic Schedule 📅', path: '/teacher/timetable' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  if (tab.id === 'timetable') window.location.href = tab.path;
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
            <form onSubmit={handleResultSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
              <div className="space-y-2">
                <label className="label-text">Select Student</label>
                <select
                  value={resultData.student}
                  onChange={(e) => setResultData({ ...resultData, student: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Choose from {selectedBranch} list...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} {student.isAtRisk ? '(At Risk 🚩)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Exam Type</label>
                <select
                  value={resultData.examType}
                  onChange={(e) => setResultData({ ...resultData, examType: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Exam Type...</option>
                  <option value="Class Test">Class Test</option>
                  <option value="Unit Test">Unit Test</option>
                  <option value="Half Yearly">Half Yearly</option>
                  <option value="Final Exam">Final Exam</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Academic Year (Locked)</label>
                <input
                  type="text"
                  value={academicYears.find(y => y._id === selectedYear)?.yearName || ''}
                  className="input-field bg-slate-50"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Subject Unit</label>
                <select
                  value={resultData.subject}
                  onChange={(e) => setResultData({ ...resultData, subject: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Subject...</option>
                  {availableSubjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Letter Grade</label>
                <input
                  type="text"
                  value={resultData.grade}
                  onChange={(e) => setResultData({ ...resultData, grade: e.target.value })}
                  className="input-field"
                  placeholder="A+, B, etc."
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Obtained Marks</label>
                <input
                  type="number"
                  value={resultData.marks}
                  onChange={(e) => setResultData({ ...resultData, marks: e.target.value })}
                  className="input-field"
                  placeholder="85"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Maximum Marks</label>
                <input
                  type="number"
                  value={resultData.totalMarks}
                  onChange={(e) => setResultData({ ...resultData, totalMarks: e.target.value })}
                  className="input-field"
                  placeholder="100"
                  required
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="label-text">Performance Remarks</label>
                <textarea
                  value={resultData.remarks}
                  onChange={(e) => setResultData({ ...resultData, remarks: e.target.value })}
                  className="input-field min-h-[120px] resize-none"
                  placeholder="Provide constructive feedback for the student..."
                />
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full btn-primary py-5 text-lg">
                  Publish Evaluation Results 📊
                </button>
              </div>
            </form>
          ) : activeTab === 'attendance' ? (
            <form onSubmit={handleAttendanceSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
              <div className="space-y-2">
                <label className="label-text">Student Name</label>
                <select
                  value={attendanceData.student}
                  onChange={(e) => setAttendanceData({ ...attendanceData, student: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select from {selectedBranch} list...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} {student.isAtRisk ? '(At Risk 🚩)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Academic Year (Locked)</label>
                <input
                  type="text"
                  value={academicYears.find(y => y._id === selectedYear)?.yearName || ''}
                  className="input-field bg-slate-50"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Class Date</label>
                <input
                  type="date"
                  value={attendanceData.date}
                  onChange={(e) => setAttendanceData({ ...attendanceData, date: e.target.value })}
                  className="input-field"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Subject / Lecture</label>
                <select
                  value={attendanceData.subject}
                  onChange={(e) => setAttendanceData({ ...attendanceData, subject: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Subject...</option>
                  {availableSubjects.map((subject, index) => (
                    <option key={index} value={subject}>{subject}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Attendance Status</label>
                <select
                  value={attendanceData.status}
                  onChange={(e) => setAttendanceData({ ...attendanceData, status: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="present">✅ PRESENT</option>
                  <option value="absent">❌ ABSENT</option>
                  <option value="late">⏳ LATE ARRIVAL</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Attendance Category</label>
                <select
                  value={attendanceData.attendanceType}
                  onChange={(e) => setAttendanceData({ ...attendanceData, attendanceType: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="Regular">📅 REGULAR DAILY</option>
                  <option value="Half-yearly">📊 HALF-YEARLY SUMMARY</option>
                  <option value="Final">🏆 FINAL ANNUAL</option>
                </select>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="label-text">Class Timing</label>
                <select
                  value={attendanceData.timing}
                  onChange={(e) => setAttendanceData({ ...attendanceData, timing: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Select Session...</option>
                  {SESSION_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full btn-primary py-5 text-lg">
                  Record Attendance Logs ✅
                </button>
              </div>
            </form>
          ) : activeTab === 'activity' ? (
            <form onSubmit={handleActivitySubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-4">
              <div className="space-y-2">
                <label className="label-text">Select Student</label>
                <select
                  value={activityData.studentId}
                  onChange={(e) => setActivityData({ ...activityData, studentId: e.target.value })}
                  className="input-field"
                  required
                >
                  <option value="">Choose from {selectedBranch}...</option>
                  {students.map((student) => (
                    <option key={student._id} value={student._id}>
                      {student.name} {student.isAtRisk ? '(At Risk 🚩)' : ''}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Academic Year (Locked)</label>
                <input
                  type="text"
                  value={academicYears.find(y => y._id === selectedYear)?.yearName || ''}
                  className="input-field bg-slate-50"
                  readOnly
                />
              </div>
              <div className="space-y-2">
                <label className="label-text">Sports / Games</label>
                <select
                  value={SPORTS_OPTIONS.includes(activityData.sports) && activityData.sports !== 'Other' ? activityData.sports : (activityData.sports ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, sports: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Sport...</option>
                  {SPORTS_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.sports === 'Other') || (!SPORTS_OPTIONS.includes(activityData.sports) && activityData.sports)) && (
                  <input
                    type="text"
                    value={activityData.sports === 'Other' ? '' : activityData.sports}
                    onChange={(e) => setActivityData({ ...activityData, sports: e.target.value })}
                    className="input-field"
                    placeholder="Specify other sport..."
                    autoFocus
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">Sports Achievement / Role (Optional)</label>
                <select
                  value={ACHIEVEMENT_OPTIONS.includes(activityData.sportsInfo) && activityData.sportsInfo !== 'Other' ? activityData.sportsInfo : (activityData.sportsInfo ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, sportsInfo: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Achievement...</option>
                  {ACHIEVEMENT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.sportsInfo === 'Other') || (!ACHIEVEMENT_OPTIONS.includes(activityData.sportsInfo) && activityData.sportsInfo)) && (
                  <input
                    type="text"
                    value={activityData.sportsInfo === 'Other' ? '' : activityData.sportsInfo}
                    onChange={(e) => setActivityData({ ...activityData, sportsInfo: e.target.value })}
                    className="input-field"
                    placeholder="Specify achievement..."
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">Debate Achievement / Role (Optional)</label>
                <select
                  value={ACHIEVEMENT_OPTIONS.includes(activityData.debateInfo) && activityData.debateInfo !== 'Other' ? activityData.debateInfo : (activityData.debateInfo ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, debateInfo: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Achievement...</option>
                  {ACHIEVEMENT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.debateInfo === 'Other') || (!ACHIEVEMENT_OPTIONS.includes(activityData.debateInfo) && activityData.debateInfo)) && (
                  <input
                    type="text"
                    value={activityData.debateInfo === 'Other' ? '' : activityData.debateInfo}
                    onChange={(e) => setActivityData({ ...activityData, debateInfo: e.target.value })}
                    className="input-field"
                    placeholder="Specify achievement..."
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">CSR Achievement / Role (Optional)</label>
                <select
                  value={ACHIEVEMENT_OPTIONS.includes(activityData.csrInfo) && activityData.csrInfo !== 'Other' ? activityData.csrInfo : (activityData.csrInfo ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, csrInfo: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Achievement...</option>
                  {ACHIEVEMENT_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.csrInfo === 'Other') || (!ACHIEVEMENT_OPTIONS.includes(activityData.csrInfo) && activityData.csrInfo)) && (
                  <input
                    type="text"
                    value={activityData.csrInfo === 'Other' ? '' : activityData.csrInfo}
                    onChange={(e) => setActivityData({ ...activityData, csrInfo: e.target.value })}
                    className="input-field"
                    placeholder="Specify achievement..."
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">Debate / Culture</label>
                <select
                  value={DEBATE_OPTIONS.includes(activityData.debate) && activityData.debate !== 'Other' ? activityData.debate : (activityData.debate ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, debate: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Activity...</option>
                  {DEBATE_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.debate === 'Other') || (!DEBATE_OPTIONS.includes(activityData.debate) && activityData.debate)) && (
                  <input
                    type="text"
                    value={activityData.debate === 'Other' ? '' : activityData.debate}
                    onChange={(e) => setActivityData({ ...activityData, debate: e.target.value })}
                    className="input-field"
                    placeholder="Specify other activity..."
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">Social Responsibility (CSR)</label>
                <select
                  value={CSR_OPTIONS.includes(activityData.csr) && activityData.csr !== 'Other' ? activityData.csr : (activityData.csr ? 'Other' : '')}
                  onChange={(e) => setActivityData({ ...activityData, csr: e.target.value })}
                  className="input-field mb-2"
                >
                  <option value="">Select Activity...</option>
                  {CSR_OPTIONS.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
                {((activityData.csr === 'Other') || (!CSR_OPTIONS.includes(activityData.csr) && activityData.csr)) && (
                  <input
                    type="text"
                    value={activityData.csr === 'Other' ? '' : activityData.csr}
                    onChange={(e) => setActivityData({ ...activityData, csr: e.target.value })}
                    className="input-field"
                    placeholder="Specify other activity..."
                  />
                )}
              </div>
              <div className="space-y-2">
                <label className="label-text">Punctuality / Timing</label>
                <select
                  value={activityData.punctuality}
                  onChange={(e) => setActivityData({ ...activityData, punctuality: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="">Select Rating...</option>
                  {['Excellent', 'Good', 'Average', 'Poor'].map(g => (
                    <option key={g} value={g}>{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="label-text">Positive Behavior Highlights 🌟</label>
                    <textarea
                      value={activityData.positiveBehavior}
                      onChange={(e) => setActivityData({ ...activityData, positiveBehavior: e.target.value })}
                      className="input-field min-h-[100px] resize-none border-emerald-100 focus:border-emerald-500"
                      placeholder="e.g., Helped and mentored peers during group projects..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-text">Disruptive Behavior Notes ⚠️</label>
                    <textarea
                      value={activityData.disruptiveBehavior}
                      onChange={(e) => setActivityData({ ...activityData, disruptiveBehavior: e.target.value })}
                      className="input-field min-h-[100px] resize-none border-rose-100 focus:border-rose-500"
                      placeholder="e.g., Repeated interruptions during the math session..."
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="label-text">Communication Skills</label>
                <select
                  value={activityData.communication}
                  onChange={(e) => setActivityData({ ...activityData, communication: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="">Select Rating...</option>
                  {['Excellent', 'Good', 'Average', 'Poor'].map(g => (
                    <option key={g} value={g}>{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Confidence Level 🛡️</label>
                <select
                  value={activityData.confidence}
                  onChange={(e) => setActivityData({ ...activityData, confidence: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="">Select Rating...</option>
                  {['Excellent', 'Good', 'Average', 'Poor'].map(g => (
                    <option key={g} value={g}>{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Persistence & Grit ⚡</label>
                <select
                  value={activityData.persistence}
                  onChange={(e) => setActivityData({ ...activityData, persistence: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  <option value="">Select Rating...</option>
                  {['Excellent', 'Good', 'Average', 'Poor'].map(g => (
                    <option key={g} value={g}>{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="label-text">Self-Management 🧠</label>
                <select
                  value={activityData.selfManagement}
                  onChange={(e) => setActivityData({ ...activityData, selfManagement: e.target.value })}
                  className="input-field font-black"
                  required
                >
                  {['Excellent', 'Good', 'Average', 'Poor'].map(g => (
                    <option key={g} value={g}>{g.toUpperCase()}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="label-text">Additional Remarks</label>
                <textarea
                  value={activityData.remarks}
                  onChange={(e) => setActivityData({ ...activityData, remarks: e.target.value })}
                  className="input-field min-h-[120px] resize-none"
                  placeholder="Any further details regarding student's co-curricular profile..."
                />
              </div>
              <div className="md:col-span-2 mt-4">
                <button type="submit" className="w-full bg-purple-700 text-white rounded-2xl font-black py-5 text-lg hover:bg-purple-800 transition-all">
                  Submit Activity Report 🏆
                </button>
              </div>
            </form>
          ) : activeTab === 'assignments' ? (
            <div className="space-y-8 animate-in fade-in">
              {/* Create Assignment Form */}
              <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">➕ Create New Assignment</h3>
                <form onSubmit={handleAssignmentSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="label-text">Title</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g., Algebra Worksheet 1"
                      value={assignmentData.title}
                      onChange={(e) => setAssignmentData({ ...assignmentData, title: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-text">Total Marks</label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="e.g., 20"
                      value={assignmentData.totalMarks}
                      onChange={(e) => setAssignmentData({ ...assignmentData, totalMarks: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="label-text">Subject</label>
                    <select
                      className="input-field"
                      value={assignmentData.subject}
                      onChange={(e) => setAssignmentData({ ...assignmentData, subject: e.target.value })}
                      required
                    >
                      <option value="">Select Subject...</option>
                      {availableSubjects.map((subject, index) => (
                        <option key={index} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="label-text">Deadline</label>
                    <input
                      type="datetime-local"
                      className="input-field"
                      value={assignmentData.deadline}
                      onChange={(e) => setAssignmentData({ ...assignmentData, deadline: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="label-text">Description</label>
                    <textarea
                      className="input-field resize-none h-24"
                      placeholder="Instructions for the students..."
                      value={assignmentData.description}
                      onChange={(e) => setAssignmentData({ ...assignmentData, description: e.target.value })}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <button type="submit" className="w-full btn-primary py-3">🚀 Publish Assignment</button>
                  </div>
                </form>
              </div>

              {/* Assignments List */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold flex items-center gap-2">📚 Active Assignments</h3>
                {assignments.map(assignment => (
                  <div key={assignment._id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-lg text-slate-800">{assignment.title}</h4>
                        <p className="text-sm text-slate-500 mb-2">Subject: {assignment.subject} • Due: {new Date(assignment.deadline).toLocaleString()}</p>
                        <p className="text-slate-600 text-sm">{assignment.description}</p>
                      </div>
                      <div className="text-right">
                        <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                          {assignment.totalMarks} Marks
                        </span>
                        <button
                          onClick={() => {
                            if (selectedAssignment?._id === assignment._id) {
                              setSelectedAssignment(null);
                            } else {
                              setSelectedAssignment(assignment);
                              fetchSubmissions(assignment._id);
                            }
                          }}
                          className="block mt-2 text-indigo-600 font-bold text-sm hover:underline"
                        >
                          {selectedAssignment?._id === assignment._id ? 'Close Submissions' : 'View Submissions'}
                        </button>
                      </div>
                    </div>

                    {/* Submissions Section */}
                    {selectedAssignment?._id === assignment._id && (
                      <div className="mt-4 border-t border-slate-100 pt-4 animate-in slide-in-from-top-2">
                        {submissions.length === 0 ? (
                          <p className="text-sm text-slate-400 italic">No students found for this class.</p>
                        ) : (
                          <div className="space-y-3">
                            {submissions.map(sub => (
                              <div key={sub._id} className="bg-slate-50 p-3 rounded-lg text-sm">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-bold">{sub.studentId?.name || 'Unknown Student'}</span>
                                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${sub.status === 'Graded' ? 'bg-green-100 text-green-700' :
                                    sub.status === 'Submitted' ? 'bg-yellow-100 text-yellow-700' :
                                      'bg-red-100 text-red-700'
                                    }`}>
                                    {sub.status}
                                  </span>
                                </div>

                                {sub.status !== 'Missing' ? (
                                  <>
                                    <div className="mb-2 p-2 bg-white rounded border border-slate-200">
                                      <a href={sub.content} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        {sub.content}
                                      </a>
                                      <div className="text-xs text-slate-400 mt-1">
                                        Submitted: {new Date(sub.submissionDate).toLocaleString()}
                                        {new Date(sub.submissionDate) > new Date(assignment.deadline) && <span className="text-red-500 ml-2 font-bold">(LATE)</span>}
                                      </div>
                                    </div>

                                    {/* Grading Form */}
                                    <div className="flex gap-2 items-center bg-white p-2 rounded border border-slate-200">
                                      <input
                                        type="number"
                                        placeholder="Marks"
                                        className="border rounded p-1 w-20 text-sm"
                                        // If we haven't edited this specific card's grade, show original
                                        value={gradingData.id === sub._id ? gradingData.marks : (sub.marks || '')}
                                        onChange={(e) => setGradingData({ id: sub._id, marks: e.target.value, feedback: (gradingData.id === sub._id ? gradingData.feedback : (sub.feedback || '')) })}
                                        onFocus={() => {
                                          if (gradingData.id !== sub._id) {
                                            setGradingData({ id: sub._id, marks: sub.marks || '', feedback: sub.feedback || '' });
                                          }
                                        }}
                                      />
                                      <input
                                        type="text"
                                        placeholder="Feedback"
                                        className="border rounded p-1 flex-1 text-sm"
                                        value={gradingData.id === sub._id ? gradingData.feedback : (sub.feedback || '')}
                                        onChange={(e) => setGradingData({ id: sub._id, marks: (gradingData.id === sub._id ? gradingData.marks : (sub.marks || '')), feedback: e.target.value })}
                                        onFocus={() => {
                                          if (gradingData.id !== sub._id) {
                                            setGradingData({ id: sub._id, marks: sub.marks || '', feedback: sub.feedback || '' });
                                          }
                                        }}
                                      />
                                      <button
                                        onClick={() => {
                                          teacherAPI.gradeSubmission(sub._id, {
                                            marks: Number(gradingData.id === sub._id ? gradingData.marks : sub.marks),
                                            feedback: gradingData.id === sub._id ? gradingData.feedback : sub.feedback
                                          }).then(() => {
                                            alert('Graded!');
                                            fetchSubmissions(assignment._id);
                                            setGradingData({ marks: '', feedback: '' }); // Reset
                                          });
                                        }}
                                        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 text-xs font-bold"
                                      >
                                        Save
                                      </button>
                                    </div>
                                  </>
                                ) : (
                                  <div className="text-xs italic text-red-400">Not submitted yet.</div>
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-top-4">
              <h3 className="text-2xl font-black text-slate-900 mb-10 border-l-4 border-slate-900 pl-4 flex items-center gap-3">
                <span>📢</span> Institutional Bulletins
              </h3>
              {notices.length === 0 ? (
                <div className="text-center py-24 bg-slate-50/50 rounded-3xl border-2 border-dashed border-slate-200">
                  <div className="text-7xl mb-6 grayscale opacity-30 animate-bounce-slow">📭</div>
                  <p className="text-xl font-black text-slate-400">Registry is currently clear.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-8">
                  {notices.map((notice) => (
                    <div key={notice._id} className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:translate-y-[-4px] transition-all relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[5rem] -z-10 group-hover:bg-slate-100 transition-colors"></div>
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
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
          )}
        </div>
      )}
    </DashboardLayout >
  );
};

export default TeacherDashboard;
