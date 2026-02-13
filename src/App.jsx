import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Landing from './components/Landing';
import Login from './components/Login';
import AdminDashboard from './pages/Admin/AdminDashboard';
import TeacherDashboard from './pages/Teacher/TeacherDashboard';
import StudentPortal from './pages/Student/StudentPortal';

import ManageTimetable from './pages/Admin/ManageTimetable';
import MyTimetableTeacher from './pages/Teacher/MyTimetable';
import MyTimetableStudent from './pages/Student/MyTimetable';
import About from './pages/About';
import Contact from './pages/Contact';
import AcademicsPage from './pages/AcademicsPage';
import AdmissionsPage from './pages/AdmissionsPage';
import ConnectPage from './pages/ConnectPage';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Landing />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/academics" element={<AcademicsPage />} />
          <Route path="/admissions" element={<AdmissionsPage />} />
          <Route path="/connect" element={<ConnectPage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/timetable"
            element={
              <ProtectedRoute allowedRoles={['Admin']}>
                <ManageTimetable />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher"
            element={
              <ProtectedRoute allowedRoles={['Teacher']}>
                <TeacherDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/teacher/timetable"
            element={
              <ProtectedRoute allowedRoles={['Teacher']}>
                <MyTimetableTeacher />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <StudentPortal />
              </ProtectedRoute>
            }
          />
          <Route
            path="/student/timetable"
            element={
              <ProtectedRoute allowedRoles={['Student']}>
                <MyTimetableStudent />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
