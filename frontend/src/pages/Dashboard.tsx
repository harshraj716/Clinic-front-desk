import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  Calendar, 
  Activity,
  TrendingUp,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import axios from 'axios';
import { format } from 'date-fns';

interface DashboardStats {
  totalPatients: number;
  totalDoctors: number;
  totalAppointments: number;
  todayAppointments: number;
}

interface RecentAppointment {
  id: number;
  patient: { name: string };
  doctor: { name: string };
  scheduledAt: string;
  status: string;
}

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPatients: 0,
    totalDoctors: 0,
    totalAppointments: 0,
    todayAppointments: 0
  });
  const [recentAppointments, setRecentAppointments] = useState<RecentAppointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [patientsRes, doctorsRes, appointmentsRes] = await Promise.all([
        axios.get('/api/patients'),
        axios.get('/api/doctors'),
        axios.get('/api/appointments')
      ]);

      const appointments = appointmentsRes.data;
      const today = new Date().toDateString();
      const todayAppointments = appointments.filter((apt: any) => 
        new Date(apt.scheduledAt).toDateString() === today
      );

      setStats({
        totalPatients: patientsRes.data.length,
        totalDoctors: doctorsRes.data.length,
        totalAppointments: appointments.length,
        todayAppointments: todayAppointments.length
      });

      setRecentAppointments(appointments.slice(0, 5));
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Patients',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-primary-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Total Doctors',
      value: stats.totalDoctors,
      icon: UserCheck,
      color: 'bg-success-500',
      change: '+3%',
      changeType: 'increase'
    },
    {
      title: 'Total Appointments',
      value: stats.totalAppointments,
      icon: Calendar,
      color: 'bg-warning-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: "Today's Appointments",
      value: stats.todayAppointments,
      icon: Clock,
      color: 'bg-error-500',
      change: '+5%',
      changeType: 'increase'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="badge-success">Completed</span>;
      case 'canceled':
        return <span className="badge-error">Canceled</span>;
      default:
        return <span className="badge-primary">Booked</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here's what's happening at your clinic today.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {format(new Date(), 'EEEE, MMMM d')}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(), 'yyyy')}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="stats-card hover-lift">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {card.value.toLocaleString()}
                  </p>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="w-4 h-4 text-success-500 mr-1" />
                    <span className="text-sm text-success-600 font-medium">
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">vs last month</span>
                  </div>
                </div>
                <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Appointments */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Recent Appointments</h3>
          </div>
          <div className="card-body p-0">
            {recentAppointments.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {appointment.patient.name}
                            </p>
                            <p className="text-sm text-gray-500">
                              Dr. {appointment.doctor.name}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-900">
                          {format(new Date(appointment.scheduledAt), 'MMM d, h:mm a')}
                        </p>
                        <div className="mt-1">
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
          </div>
          <div className="card-body">
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group">
                <Users className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
                  Add Patient
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group">
                <Calendar className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
                  Schedule Appointment
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group">
                <UserCheck className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
                  Add Doctor
                </p>
              </button>
              <button className="p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-all duration-200 group">
                <Activity className="w-8 h-8 text-gray-400 group-hover:text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-600 group-hover:text-primary-600">
                  View Reports
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="card">
        <div className="card-header">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-success-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Database</p>
                <p className="text-sm text-success-600">Connected</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-8 h-8 text-success-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">API Server</p>
                <p className="text-sm text-success-600">Running</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <AlertCircle className="w-8 h-8 text-warning-500" />
              <div>
                <p className="text-sm font-medium text-gray-900">Backup</p>
                <p className="text-sm text-warning-600">Scheduled</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};