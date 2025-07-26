import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Calendar, 
  Users, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

interface TodayAppointment {
  id: number;
  patient: { name: string; phone: string };
  doctor: { name: string };
  scheduledAt: string;
  status: string;
}

interface QuickAction {
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  action: () => void;
}

export const FrontDesk: React.FC = () => {
  const [todayAppointments, setTodayAppointments] = useState<TodayAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTodayAppointments();
  }, []);

  const fetchTodayAppointments = async () => {
    try {
      const response = await axios.get('/api/appointments');
      const today = new Date().toDateString();
      const todayAppts = response.data.filter((apt: any) => 
        new Date(apt.scheduledAt).toDateString() === today
      );
      setTodayAppointments(todayAppts);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const quickActions: QuickAction[] = [
    {
      title: 'Register New Patient',
      description: 'Add a new patient to the system',
      icon: Users,
      color: 'bg-primary-500',
      action: () => toast.success('Redirecting to patient registration...')
    },
    {
      title: 'Schedule Appointment',
      description: 'Book a new appointment',
      icon: Calendar,
      color: 'bg-success-500',
      action: () => toast.success('Redirecting to appointment scheduling...')
    },
    {
      title: 'Check-in Patient',
      description: 'Mark patient as arrived',
      icon: CheckCircle,
      color: 'bg-warning-500',
      action: () => toast.success('Patient check-in feature...')
    },
    {
      title: 'Emergency Contact',
      description: 'Quick access to emergency contacts',
      icon: Phone,
      color: 'bg-error-500',
      action: () => toast.success('Emergency contacts...')
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <span className="badge-success">Completed</span>;
      case 'canceled':
        return <span className="badge-error">Canceled</span>;
      default:
        return <span className="badge-primary">Scheduled</span>;
    }
  };

  const filteredAppointments = todayAppointments.filter(appointment =>
    appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Front Desk</h1>
          <p className="text-gray-600 mt-1">
            Manage daily operations and patient check-ins
          </p>
        </div>
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">
              {format(new Date(), 'EEEE, MMMM d')}
            </p>
            <p className="text-sm text-gray-500">
              {format(new Date(), 'yyyy')}
            </p>
          </div>
          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
            <Clock className="w-6 h-6 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="card hover-lift hover-glow text-left transition-all duration-200"
          >
            <div className="card-body">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{action.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="card">
            <div className="card-header">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
                <span className="badge-primary">{todayAppointments.length} appointments</span>
              </div>
            </div>
            <div className="p-4">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search today's appointments..."
                  className="input pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="space-y-3">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{appointment.patient.name}</p>
                            <p className="text-sm text-gray-500">Dr. {appointment.doctor.name}</p>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <Phone className="w-3 h-3 mr-1" />
                              {appointment.patient.phone}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {format(new Date(appointment.scheduledAt), 'h:mm a')}
                          </p>
                          <div className="mt-1">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments scheduled for today</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Clinic Information */}
        <div className="space-y-6">
          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Clinic Information</h3>
            </div>
            <div className="card-body space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Address</p>
                  <p className="text-sm text-gray-600">
                    123 Healthcare Ave<br />
                    Medical District<br />
                    City, State 12345
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Phone</p>
                  <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">info@cliniccare.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Operating Hours</h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Monday - Friday</span>
                <span className="text-sm font-medium text-gray-900">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Saturday</span>
                <span className="text-sm font-medium text-gray-900">9:00 AM - 2:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Sunday</span>
                <span className="text-sm font-medium text-gray-900">Closed</span>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
            </div>
            <div className="card-body space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Emergency Services</span>
                <span className="text-sm font-medium text-error-600">911</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Poison Control</span>
                <span className="text-sm font-medium text-gray-900">1-800-222-1222</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">On-call Doctor</span>
                <span className="text-sm font-medium text-gray-900">+1 (555) 987-6543</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};