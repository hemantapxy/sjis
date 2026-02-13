import { useState, useEffect } from 'react';
import { timetableAPI } from '../../services/api';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const MyTimetable = () => {
    const [timetable, setTimetable] = useState([]);
    const [loading, setLoading] = useState(true);

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        fetchTimetable();
    }, []);

    const fetchTimetable = async () => {
        try {
            const response = await timetableAPI.getForStudent();
            setTimetable(response.data);
        } catch (error) {
            console.error('Error fetching timetable:', error);
        } finally {
            setLoading(false);
        }
    };

    const getScheduleForDay = (day) => {
        return timetable
            .filter(entry => entry.day === day)
            .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot));
    };

    if (loading) return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                <div className="text-xl font-bold text-slate-600">Loading your schedule...</div>
            </div>
        </div>
    );

    return (
        <DashboardLayout
            title="Class Timetable"
            subtitle="Plan your week and never miss a lecture"
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

                {timetable.length === 0 ? (
                    <div className="text-center text-slate-500 py-16 animate-in fade-in duration-500">
                        <div className="text-7xl mb-6">📅</div>
                        <p className="text-2xl font-black text-slate-400">No classes scheduled yet.</p>
                        <p className="text-slate-400 mt-2">Enjoy your free time!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {days.map(day => {
                            const daySchedule = getScheduleForDay(day);
                            if (daySchedule.length === 0) return null;

                            return (
                                <div key={day} className="rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-white transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
                                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-5 px-6 font-black text-xl flex justify-between items-center">
                                        {day}
                                        <span className="text-xs bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">{daySchedule.length} classes</span>
                                    </div>
                                    <div className="p-6 bg-slate-50/30 space-y-4">
                                        {daySchedule.map(entry => (
                                            <div key={entry._id} className="p-5 bg-white rounded-2xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow group">
                                                <div className="font-black text-slate-900 text-lg mb-1">{entry.timeSlot}</div>
                                                <div className="text-green-600 font-black text-xl mb-3 group-hover:scale-105 transition-transform origin-left">{entry.subject}</div>
                                                <div className="text-slate-600 font-bold flex items-center gap-2 text-sm">
                                                    <span className="text-emerald-400 text-lg">👨‍🏫</span>
                                                    {entry.teacherName}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyTimetable;

