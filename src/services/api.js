import axios from 'axios';

// Backend URL for production
export const BASE_URL = 'https://sjis-backend.onrender.com';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({ baseURL: API_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getProfile: () => api.get('/auth/profile'),
  uploadProfilePicture: (formData) => api.post('/auth/upload-profile-picture', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
};

export const adminAPI = {
  addStudent: (studentData) => api.post('/admin/add-student', studentData),
  addTeacher: (teacherData) => api.post('/admin/add-teacher', teacherData),
  addAcademicYear: (yearData) => api.post('/admin/add-academic-year', yearData),
  getAcademicYears: () => api.get('/admin/academic-years'),
  getAllUsers: () => api.get('/admin/users'),
  getAnalytics: () => api.get('/admin/analytics'),
  addNotice: (noticeData) => api.post('/admin/notices', noticeData),
  deleteNotice: (id) => api.delete(`/admin/notices/${id}`),
  getAllNotices: () => api.get('/admin/notices'),
  getAttendance: (params) => api.get('/admin/attendance', { params }),
  getReports: (params) => api.get('/admin/reports', { params }),
  getActivityReports: (params) => api.get('/admin/activity-reports', { params }),
  getAtRiskStudents: (params) => api.get('/admin/at-risk', { params })
};

export const teacherAPI = {
  addResult: (resultData) => api.post('/teacher/results', resultData),
  addAttendance: (attendanceData) => api.post('/teacher/attendance', attendanceData),
  addActivityReport: (reportData) => api.post('/teacher/activity-reports', reportData),
  getStudents: (branch) => api.get(`/teacher/students${branch ? `?branch=${branch}` : ''}`),
  getBranches: () => api.get('/teacher/branches'),
  getSubjects: (branch) => api.get(`/teacher/subjects${branch ? `?branch=${branch}` : ''}`),
  getAcademicYears: () => api.get('/teacher/academic-years'),
  getNotices: () => api.get('/teacher/notices'),
  createAssignment: (assignmentData) => api.post('/teacher/assignments', assignmentData),
  getAssignments: (filters) => api.get('/teacher/assignments', { params: filters }),
  getAssignmentSubmissions: (id) => api.get(`/teacher/assignments/${id}/submissions`),
  gradeSubmission: (id, gradeData) => api.post(`/teacher/submissions/${id}/grade`, gradeData)
};

export const studentAPI = {
  getResults: (academicYear) => api.get(`/student/results${academicYear ? `?academicYear=${academicYear}` : ''}`),
  getAttendance: (academicYear) => api.get(`/student/attendance${academicYear ? `?academicYear=${academicYear}` : ''}`),
  getActivityReports: (academicYear) => api.get(`/student/activity-reports${academicYear ? `?academicYear=${academicYear}` : ''}`),
  getAcademicYears: () => api.get('/student/academic-years'),
  getNotices: () => api.get('/student/notices'),
  getAssignments: (academicYear) => api.get(`/student/assignments${academicYear ? `?academicYear=${academicYear}` : ''}`),
  submitAssignment: (id, submissionData) => api.post(`/student/assignments/${id}/submit`, submissionData)
};

export const timetableAPI = {
  create: (timetableData) => api.post('/timetable/create', timetableData),
  getForStudent: (branch) => api.get(`/timetable/student${branch ? `?branch=${branch}` : ''}`),
  getForTeacher: () => api.get('/timetable/teacher')
};

export default api;
