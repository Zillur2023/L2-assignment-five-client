import React, { useEffect, useState } from "react";
import { Table, Tag } from "antd";

import { useGetAllUserQuery, useUpdateUserMutation } from "../../redux/user/userApi";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const UserManagement: React.FC = () => {
    const { data:userData, isFetching } = useGetAllUserQuery('') 
    const [users, setUsers] = useState<UserData[]>([])
    const [updateUser] = useUpdateUserMutation()

  useEffect(() => {
    if (userData?.data) {
      setUsers(userData.data); // Setting user data
    }
  }, [userData]);

  // Function to toggle the user role
  const toggleUserRole = async (userId: string) => {
    const updatedUser = users.find((user) => user._id === userId);
    
    if (updatedUser) {
      const newRole = updatedUser.role === "user" ? "admin" : "user";

      // Optimistically update the local state
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, role: newRole } : user
        )
      );

      // Update the user role in the backend
      try {
        await updateUser({ _id: userId, role: newRole });
      } catch (error) {
        console.error("Failed to update user role:", error);
        // Revert the role back in case of an error
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === userId ? { ...user, role: updatedUser.role } : user
          )
        );
      }
    }
  };

  // Table columns
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: "15%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "10%",
      render: (_: any, record: UserData) => (
        <Tag
          color={record.role === "admin" ? "gold" : "blue"}
          onClick={() => toggleUserRole(record._id)} // Toggle role on click
          style={{ cursor: "pointer" }} // Pointer cursor to indicate interactivity
        >
          {record.role === "admin" ? "Admin" : "User"}
        </Tag>
      ),
    },
  ];

  // Data for the table
  const data = users.map((user: UserData) => ({
    key: user._id,
    ...user,
  }));

  return (
    <>
      <Table
        columns={columns}
        dataSource={data}
        loading={isFetching}
        rowKey={(record) => record._id}
      />
    </>
    
  );
};

export default UserManagement;
