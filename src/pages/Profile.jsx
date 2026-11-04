import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { bankingService } from '../services/bankingService';
import NotificationToast from '../components/NotificationToast';
import LoadingSpinner from '../components/LoadingSpinner';
import { User, Mail, Phone, CreditCard, Lock, Edit2, Save, X } from 'lucide-react';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveProfile = async () => {
    if (!profileData.name || !profileData.email || !profileData.phone) {
      setNotification({
        type: 'error',
        message: 'Please fill in all fields'
      });
      return;
    }

    setLoading(true);
    try {
      const response = await bankingService.updateProfile(user.customerId, profileData);
      updateUser(response.data);
      setIsEditing(false);
      setNotification({
        type: 'success',
        message: 'Profile updated successfully'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Failed to update profile'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'Please fill in all password fields'
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'New passwords do not match'
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setNotification({
        type: 'error',
        message: 'Password must be at least 6 characters long'
      });
      return;
    }

    setLoading(true);
    try {
      await bankingService.changePassword(
        user.customerId,
        passwordData.currentPassword,
        passwordData.newPassword
      );
      setIsChangingPassword(false);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setNotification({
        type: 'success',
        message: 'Password changed successfully'
      });
    } catch (error) {
      setNotification({
        type: 'error',
        message: error.message || 'Failed to change password'
      });
    } finally {
      setLoading(false);
    }
  };

  const cancelEdit = () => {
    setProfileData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || ''
    });
    setIsEditing(false);
  };

  const cancelPasswordChange = () => {
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setIsChangingPassword(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {notification && (
        <NotificationToast
          type={notification.type}
          message={notification.message}
          onClose={() => setNotification(null)}
        />
      )}

      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information and settings</p>
      </div>

      {/* Profile Information */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Edit2 size={18} />
              Edit Profile
            </button>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                name="name"
                value={profileData.name}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                value={profileData.email}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="input-field pl-10"
              />
            </div>
          </div>

          <div>
            <label className="label">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                name="phone"
                value={profileData.phone}
                onChange={handleProfileChange}
                disabled={!isEditing}
                className="input-field pl-10"
              />
            </div>
          </div>

          {isEditing && (
            <div className="flex gap-3 pt-2">
              <button
                onClick={handleSaveProfile}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save size={18} />}
                Save Changes
              </button>
              <button
                onClick={cancelEdit}
                disabled={loading}
                className="btn-secondary flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Account Details */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-primary-100 rounded-lg">
              <User size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Customer ID</p>
              <p className="font-semibold text-gray-900">{user?.customerId}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CreditCard size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Account Number</p>
              <p className="font-semibold text-gray-900">{user?.accountNumber}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CreditCard size={20} className="text-primary-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Account Type</p>
              <p className="font-semibold text-gray-900">{user?.accountType}</p>
            </div>
          </div>

          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg">
              <CreditCard size={20} className="text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-1">Account Status</p>
              <p className="font-semibold text-green-600">{user?.status}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Security</h2>
            <p className="text-sm text-gray-600 mt-1">Update your password</p>
          </div>
          {!isChangingPassword && (
            <button
              onClick={() => setIsChangingPassword(true)}
              className="btn-secondary flex items-center gap-2"
            >
              <Lock size={18} />
              Change Password
            </button>
          )}
        </div>

        {isChangingPassword && (
          <div className="space-y-4">
            <div>
              <label className="label">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="input-field"
                placeholder="Enter current password"
              />
            </div>

            <div>
              <label className="label">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="input-field"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label className="label">Confirm New Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="input-field"
                placeholder="Confirm new password"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="btn-primary flex items-center gap-2"
              >
                {loading ? <LoadingSpinner size="sm" /> : <Save size={18} />}
                Update Password
              </button>
              <button
                onClick={cancelPasswordChange}
                disabled={loading}
                className="btn-secondary flex items-center gap-2"
              >
                <X size={18} />
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
