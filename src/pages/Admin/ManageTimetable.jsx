import { useState, useEffect } from 'react';
import { adminAPI, timetableAPI } from '../../services/api';
import DashboardLayout from '../../components/Layout/DashboardLayout';

import { CLASSES, SUBJECTS } from '../../utils/constants';

const ManageTimetable = () => {
    const [teachers, setTeachers] = useState([]);
    const [formData, setFormData] = useState({
        branch: '',
        semester: '',
        day: 'Monday',
        timeSlot: '09:00 - 10:00',
        subject: '',
        teacherId: '',
        academicYear: ''
    });
    const [academicYears, setAcademicYears] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [availableSubjects, setAvailableSubjects] = useState([]);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const timeSlots = [
        '09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00',
        '01:00 - 02:00', '02:00 - 03:00', '03:00 - 04:00', '04:00 - 05:00'
    ];

    useEffect(() => {
        fetchTeachers();
        fetchAcademicYears();
    }, []);

    const fetchAcademicYears = async () => {
        try {
            const response = await adminAPI.getAcademicYears();
            setAcademicYears(response.data);
        } catch (error) {
            console.error('Error fetching academic years:', error);
        }
    };

    const fetchTeachers = async () => {
        try {
            const response = await adminAPI.getAllUsers();
            const teacherList = response.data.filter(user => user.role === 'Teacher');
            setTeachers(teacherList);
        } catch (error) {
            console.error('Error fetching teachers:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'branch') {
            setAvailableSubjects(SUBJECTS[value] || []);
            setFormData(prev => ({ ...prev, branch: value, subject: '' }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');
        try {
            await timetableAPI.create(formData);
            setMessage({ type: 'success', text: 'Timetable entry created successfully!' });
            setFormData({ ...formData, subject: '' });
        } catch (error) {
            console.error('Create timetable error:', error);
            const errorMsg = error.response?.data?.message || error.message || 'Failed to create timetable entry.';
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <DashboardLayout
            title="Manage Timetable"
            subtitle="Create and manage class schedules for branches"
        >
            <div className="glass-card">
                {/* Back to Dashboard Link */}
                <div className="mb-6">
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-slate-500 font-bold hover:text-blue-500 transition-colors"
                    >
                        <span>⬅️</span> Back to Dashboard
                    </button>
                </div>

                {message && (
                    <div className={`p-4 mb-8 rounded-2xl font-bold animate-in fade-in slide-in-from-top-4 duration-300 ${message.type === 'success'
                        ? 'bg-green-50 text-green-700 border-2 border-green-100'
                        : 'bg-red-50 text-red-700 border-2 border-red-100'}`}>
                        {message.type === 'success' ? '✅ ' : '❌ '}{message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="label-text">Branch</label>
                        <select
                            name="branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select Branch</option>
                            {CLASSES.map(branch => (
                                <option key={branch} value={branch}>{branch}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Semester</label>
                        <select
                            name="semester"
                            value={formData.semester}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select Semester</option>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Academic Year</label>
                        <select
                            name="academicYear"
                            value={formData.academicYear}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select Year</option>
                            {academicYears.map(year => (
                                <option key={year._id} value={year.yearName}>{year.yearName}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Day</label>
                        <select
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            {days.map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Time Slot</label>
                        <select
                            name="timeSlot"
                            value={formData.timeSlot}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            {timeSlots.map(slot => (
                                <option key={slot} value={slot}>{slot}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Subject</label>
                        <select
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="input-field"
                            disabled={!formData.branch}
                        >
                            <option value="">Select Subject</option>
                            {availableSubjects.map(sub => (
                                <option key={sub} value={sub}>{sub}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="label-text">Teacher</label>
                        <select
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleChange}
                            required
                            className="input-field"
                        >
                            <option value="">Select Teacher</option>
                            {teachers.map(teacher => (
                                <option key={teacher._id} value={teacher._id}>{teacher.name} ({teacher.stream})</option>
                            ))}
                        </select>
                    </div>

                    <div className="md:col-span-2 mt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-4 text-lg disabled:opacity-50"
                        >
                            {loading ? 'Creating...' : 'Create Timetable Entry 📅'}
                        </button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
};

export default ManageTimetable;

