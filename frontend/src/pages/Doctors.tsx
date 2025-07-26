import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserCheck, Mail, Phone, Stethoscope } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  email: string;
  phone: string;
}

interface DoctorForm {
  name: string;
  specialization: string;
  email: string;
  phone: string;
  password?: string;
}

export const Doctors: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<DoctorForm>();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      // Since we don't have a doctors endpoint, we'll simulate it
      setDoctors([
        {
          id: 1,
          name: 'Dr. Sarah Johnson',
          specialization: 'Cardiology',
          email: 'sarah.johnson@clinic.com',
          phone: '+1 (555) 123-4567'
        },
        {
          id: 2,
          name: 'Dr. Michael Chen',
          specialization: 'Pediatrics',
          email: 'michael.chen@clinic.com',
          phone: '+1 (555) 234-5678'
        },
        {
          id: 3,
          name: 'Dr. Emily Rodriguez',
          specialization: 'Dermatology',
          email: 'emily.rodriguez@clinic.com',
          phone: '+1 (555) 345-6789'
        }
      ]);
    } catch (error) {
      toast.error('Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: DoctorForm) => {
    setIsSubmitting(true);
    try {
      if (editingDoctor) {
        // Update doctor
        const updatedDoctors = doctors.map(doc => 
          doc.id === editingDoctor.id 
            ? { ...doc, ...data }
            : doc
        );
        setDoctors(updatedDoctors);
        toast.success('Doctor updated successfully');
      } else {
        // Add new doctor
        const newDoctor = {
          id: Date.now(),
          ...data
        };
        setDoctors([...doctors, newDoctor]);
        toast.success('Doctor added successfully');
      }
      handleCloseModal();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    reset({
      name: doctor.name,
      specialization: doctor.specialization,
      email: doctor.email,
      phone: doctor.phone
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        setDoctors(doctors.filter(doc => doc.id !== id));
        toast.success('Doctor deleted successfully');
      } catch (error) {
        toast.error('Failed to delete doctor');
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingDoctor(null);
    reset();
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Doctors</h1>
          <p className="text-gray-600 mt-1">Manage healthcare providers and their information</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary mt-4 sm:mt-0"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Doctor
        </button>
      </div>

      {/* Search and Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name, specialization, or email..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="card">
          <div className="card-body text-center">
            <UserCheck className="w-8 h-8 text-success-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{doctors.length}</p>
            <p className="text-sm text-gray-600">Total Doctors</p>
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="card hover-lift hover-glow">
            <div className="card-body">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-success-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                    <p className="text-sm text-primary-600 font-medium">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <button
                    onClick={() => handleEdit(doctor)}
                    className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all duration-200"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(doctor.id)}
                    className="p-2 text-gray-400 hover:text-error-600 hover:bg-error-50 rounded-lg transition-all duration-200"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-3 text-gray-400" />
                  <span className="truncate">{doctor.email}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-3 text-gray-400" />
                  <span>{doctor.phone}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="badge-success">Active</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <UserCheck className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No doctors found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}
              </h3>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input
                    {...register('name', { required: 'Name is required' })}
                    type="text"
                    className="input"
                    placeholder="Enter doctor name"
                  />
                  {errors.name && (
                    <p className="form-error">{errors.name.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Specialization</label>
                  <input
                    {...register('specialization', { required: 'Specialization is required' })}
                    type="text"
                    className="input"
                    placeholder="Enter specialization"
                  />
                  {errors.specialization && (
                    <p className="form-error">{errors.specialization.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    type="email"
                    className="input"
                    placeholder="Enter email address"
                  />
                  {errors.email && (
                    <p className="form-error">{errors.email.message}</p>
                  )}
                </div>

                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input
                    {...register('phone', { 
                      required: 'Phone is required',
                      minLength: {
                        value: 10,
                        message: 'Phone must be at least 10 characters'
                      }
                    })}
                    type="tel"
                    className="input"
                    placeholder="Enter phone number"
                  />
                  {errors.phone && (
                    <p className="form-error">{errors.phone.message}</p>
                  )}
                </div>

                {!editingDoctor && (
                  <div className="form-group">
                    <label className="form-label">Password</label>
                    <input
                      {...register('password', { 
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters'
                        }
                      })}
                      type="password"
                      className="input"
                      placeholder="Enter password"
                    />
                    {errors.password && (
                      <p className="form-error">{errors.password.message}</p>
                    )}
                  </div>
                )}

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
                    {isSubmitting ? 'Saving...' : (editingDoctor ? 'Update' : 'Create')}
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