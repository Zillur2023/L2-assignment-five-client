import React, { useState } from 'react';
import { Modal, Input, Button, Typography } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { toast } from 'sonner';
import { useGetUserQuery, useUpdateProfileMutation } from '../../redux/user/userApi';

const { Title, Text } = Typography;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const ProfileCard: React.FC = () => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { data: UserData } = useGetUserQuery(user?.email, { skip: !user?.email });
  const [updateProfile] = useUpdateProfileMutation();

  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      name: UserData?.data?.name || '',
      email: UserData?.data?.email || '',
      phone: UserData?.data?.phone || '',
      address: UserData?.data?.address || '',
    },
  });

  const openModal = () => {
    reset({
      name: UserData?.data?.name,
      email: UserData?.data?.email,
      phone: UserData?.data?.phone,
      address: UserData?.data?.address,
    });
    setIsModalOpen(true);
  };

  const handleUpdateProfile = async (data: FormValues) => {
    setLoading(true);
    try {
      const result = await updateProfile({ ...UserData?.data, ...data }).unwrap();
      if (result.success) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile.');
      }
    } catch (error) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Profile Image */}
        <div className="flex justify-center bg-gray-200 p-6">
          <div className="flex items-center justify-center h-24 w-24 rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white text-3xl font-bold shadow-lg">
            {UserData?.data?.email[0].toUpperCase()}
          </div>
        </div>

        {/* User Information */}
        <div className="p-6">
          <Title level={4} className="text-center text-xl font-bold text-gray-800 mb-4">
            {UserData?.data?.name || 'Guest User'}
          </Title>

          <Text className="block text-gray-600 text-center mb-2">
            <strong>Email:</strong> {UserData?.data?.email || 'Not provided'}
          </Text>

          <Text className="block text-gray-600 text-center mb-2">
            <strong>Phone:</strong> {UserData?.data?.phone || 'Not provided'}
          </Text>

          <Text className="block text-gray-600 text-center mb-4">
            <strong>Address:</strong> {UserData?.data?.address || 'Not provided'}
          </Text>

          {/* Update Button */}
          <div className="flex justify-center">
            <Button
              type="primary"
              size="large"
              onClick={openModal}
              className="w-full rounded-md bg-blue-500 text-white hover:bg-blue-600"
            >
              Update Profile
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Updating Profile */}
      <Modal
        title="Update Profile"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <form onSubmit={handleSubmit(handleUpdateProfile)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Name is required' }}
              render={({ field }) => (
                <>
                  <Input
                    id="name"
                    {...field}
                    placeholder="Enter your name"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                </>
              )}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Controller
              name="email"
              control={control}
              rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <>
                  <Input
                    id="email"
                    {...field}
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md p-2"
                    readOnly
                  />
                  {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                </>
              )}
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <Controller
  name="phone"
  control={control}
  rules={{
    required: 'Phone number is required',
    pattern: {
      value: /^[0-9]{10}$/,
      message: 'Enter a valid 10-digit phone number',
    },
  }}
  render={({ field, fieldState: { error } }) => (
    <>
      <Input
        id="phone"
        {...field}
        placeholder="Enter your phone number"
        className="w-full border border-gray-300 rounded-md p-2"
      />
      {error && <Text type="danger">{error.message}</Text>}
    </>
  )}
/>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <Controller
              name="address"
              control={control}
              rules={{ required: 'Address is required' }}
              render={({ field }) => (
                <>
                  <Input
                    id="address"
                    {...field}
                    placeholder="Enter your address"
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                  {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                </>
              )}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full mt-4 bg-blue-500 text-white hover:bg-blue-600"
            loading={loading}
          >
            Save Changes
          </Button>
        </form>
      </Modal>
    </div>
  );
};

export default ProfileCard;
