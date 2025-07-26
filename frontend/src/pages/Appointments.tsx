import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Clock, User, UserCheck } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

interface Appointment {
  id: number;
  patient: { id: number; name: string };
  doctor: { id: number; name: string };
  scheduledAt: string;
  status: 'booked' | 'completed' | 'canceled';
  createdAt: string;
}

interface AppointmentForm {
  patientId: number;
  doctorId: number;
  scheduledAt: string;
  status: 'booked' | 'completed' | 'canceled';
}

interface Patient {
  id: number;
  name: string;
}

interface Doctor {
  id: number;
  name: string;
}

export const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AppointmentForm>();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appointmentsRes, patientsRes] = await Promise.all([
        axios.get('/api/appointments'),
        axios.get('/api/patients')
      ]);

      setAppointments(appointmentsRes.data);
      setPatients(patientsRes.data);
      
      // Mock doctors data
      setDoctors([
        { id: 1, name: 'Dr. Sarah Johnson' },
        { id: 2, name: 'Dr. Michael Chen' },
        { id: 3, name: 'Dr. Emily Rodriguez' }
      ]);
    } catch (error) {
      toast.error('Failed to fetch data');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: AppointmentForm) => {
    setIsSubmitting(true);
    try {
      const appointmentData = {
        ...data,
        scheduledAt: new Date(data.scheduledAt).toISOString()
      };

      if (editingAppointment) {
        await axios.patch(`/api/appointments/${editingAppointment.id}`, appointmentData);
        toast.success('Appointment updated successfully');
      } else {
        await axios.post('/api/appointments', appointmentData);
        toast.success('Appointment created successfully');
      }
      fetchData();
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    reset({
      patientId: appointment.patient.id,
      doctorId: appointment.doctor.id,
      scheduledAt: format(new Date(appointment.scheduledAt), "yyyy-MM-dd'T'HH:mm"),
      status: appointment.status
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`/api/appointments/${id}`);
        toast.success('Appointment deleted successfully');
        fetchData();
      } catch (error) {
        toast.error('Failed to delete appointment');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingAppointment(null);
    reset();
  };

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

  const filteredAppointments = appointments.filter(appointment =>
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
          <h1 className="text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="text-gray-600 mt-1">Schedule and manage patient appointments</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Schedule Appointment
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search appointments by patient or doctor name..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <Calendar className="w-8 h-8 text-warning-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{appointments.length}</p>
            <p className="text-sm text-gray-600">Total Appointments</p>
          </div>
        </div>
      </div>

      {/* Appointments Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell">Patient</th>
                <th className="table-header-cell">Doctor</th>
                <th className="table-header-cell">Date & Time</th>
                <th className="table-header-cell">Status</th>
                <th className="table-header-cell">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.patient.name}</p>
                        <p className="text-sm text-gray-500">ID: {appointment.patient.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center mr-3">
                        <UserCheck className="w-5 h-5 text-success-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{appointment.doctor.name}</p>
                        <p className="text-sm text-gray-500">ID: {appointment.doctor.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 text-gray-400 mr-2" />
                      <div>
                        <p className="text-gray-900">
                          {format(new Date(appointment.scheduledAt), 'MMM d, yyyy')}
                        </p>
                        <p className="text-sm text-gray-500">
                          {format(new Date(appointment.scheduledAt), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell">
                    {getStatusBadge(appointment.status)}
                  </td>
                  <td className="table-cell">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEdit(appointment)}
                        className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(appointment.id)}
                        className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAppointments.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No appointments found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingAppointment ? 'Edit Appointment' : 'Schedule New Appointment'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Patient</label>
                  <select
                    {...register('patientId', { required: 'Patient is required' })}
                    className="input"
                  >
                    <option value="">Select a patient</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.name}
                      </option>
                    ))}
                  </select>
                  {errors.patientId && (
                    <p className="form-error">{errors.patientId.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Doctor</label>
                  <select
                    {...register('doctorId', { required: 'Doctor is required' })}
                    className="input"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.name}
                      </option>
                    ))}
                  </select>
                  {errors.doctorId && (
                    <p className="form-error">{errors.doctorId.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Date & Time</label>
                  <input
                    {...register('scheduledAt', { required: 'Date and time is required' })}
                    type="datetime-local"
                    className="input"
                  />
                  {errors.scheduledAt && (
                    <p className="form-error">{errors.scheduledAt.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Status</label>
                  <select
                    {...register('status', { required: 'Status is required' })}
                    className="input"
                  >
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                  </select>
                  {errors.status && (
                    <p className="form-error">{errors.status.message}</p>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? 'Saving...' : (editingAppointment ? 'Update' : 'Schedule')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};