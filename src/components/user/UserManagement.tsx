import React, { useEffect, useState } from "react";
import { Table, Tag, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import {
  useGetAllUserQuery,
  useUpdateProfileMutation,
} from "../../redux/user/userApi";
import type { TableColumnsType, TableProps } from "antd";

interface UserData {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  role: string;
}

const UserManagement: React.FC = () => {
  const { data: userData, isFetching, refetch } = useGetAllUserQuery("");
  // const [updateUser] = useUpdateUserMutation();
  const [updateUser] = useUpdateProfileMutation();
  const [searchText, setSearchText] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserData[]>([]);

  useEffect(() => {
    if (userData?.data) {
      setFilteredUsers(userData.data); // Initialize filtered users with fetched data
    }
  }, [userData]);

  const toggleUserRole = async (userId: string) => {
    const updatedUser = filteredUsers.find((user) => user._id === userId);

    if (updatedUser) {
      const newRole = updatedUser.role === "USER" ? "ADMIN" : "USER";

      try {
        // Update user role in the backend
        await updateUser({ _id: userId, role: newRole }).unwrap();
        // After successful update, refetch the data to get the latest users
        refetch();
      } catch (error) {
        console.error("Failed to update user role:", error);
      }
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchText(searchValue);

    const filtered = userData?.data.filter(
      (user: UserData) =>
        user.name.toLowerCase().includes(searchValue) ||
        user.email.toLowerCase().includes(searchValue)
    ) || [];
    setFilteredUsers(filtered);
  };

  const columns: TableColumnsType<UserData> = [
    {
      title: "Name",
      dataIndex: "name",
      filters: [
        ...new Set(
          filteredUsers.map((user) => ({ text: user.name, value: user.name }))
        ),
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value as string),
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
      width: "20%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      width: "15%",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "25%",
    },
    {
      title: "Role",
      dataIndex: "role",
      render: (_: any, record: UserData) => (
        <Tag
          color={record.role === "ADMIN" ? "gold" : "blue"}
          onClick={() => toggleUserRole(record._id)} // Toggle role on click
          style={{ cursor: "pointer" }} // Pointer cursor to indicate interactivity
        >
          {record.role === "ADMIN" ? "Admin" : "User"}
        </Tag>
      ),
      width: "10%",
    },
  ];

  const onChange: TableProps<UserData>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log({ pagination, filters, sorter, extra });
  };

  return (
    <>
      <Input
        placeholder="Search by name or email"
        value={searchText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 16 }}
      />
      <Table
        columns={columns}
        dataSource={filteredUsers}
        loading={isFetching}
        rowKey={(record) => record._id}
        pagination={{ pageSize: 10 }}
        onChange={onChange}
      />
    </>
  );
};

export default UserManagement;
