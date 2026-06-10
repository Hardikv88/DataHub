import React, { useEffect, useMemo, useState } from "react";
import {
  Row,
  Col,
  Input,
  Select,
  Typography,
  Skeleton,
  Card,
  Result,
} from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { loadUsers, setSearchTerm, setSelectedRole } from "./userSlice";
import UserCard from "./components/UserCard";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import AddUserModal from "./components/AddUserModal";


const UserList: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const { users = [], loading, error, searchTerm, selectedRole } = useAppSelector(
    (state) => state.users,
  );
  
  // Add console logs to debug
  console.log('UserList state:', { users, loading, error, searchTerm, selectedRole });

  // Local state for debounced search
  const [localSearch, setLocalSearch] = useState(searchTerm);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  // Debounce search term update
  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(setSearchTerm(localSearch));
    }, 500);
    return () => clearTimeout(handler);
  }, [localSearch, dispatch]);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const userName = user.userName || user.name || '';
      const userEmail = user.userEmail || user.email || '';
      const userRole = user.userRole || user.role || '';
      
      const matchesSearch = `${userName} ${userEmail}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole && selectedRole !== "all"
          ? userRole.toLowerCase() === selectedRole.toLowerCase()
          : true;
      return matchesSearch && matchesRole;
    });
  }, [users, searchTerm, selectedRole]);

  if (error) {
    return (
      <Result
        status="error"
        title="Failed to Load Users"
        subTitle={error}
        extra={
          <Button type="primary" onClick={() => dispatch(loadUsers())}>
            Try Again
          </Button>
        }
      />
    );
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "calc(100vh - 70px)" }}>
      <div style={{ flex: 1, padding: "0 24px 24px 24px" }}>
        <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
          <Col>
            <h1 className="dashboard-heading">{t("ACTIVE_USERS")}</h1>
          </Col>
          <Col>
            <Button icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
              {t("ADD_NEW_MEMBER")}
            </Button>
          </Col>
        </Row>

        <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Input
              placeholder="Search by name or email..."
              prefix={<SearchOutlined />}
              size="large"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={8} lg={4}>
            <Select
              placeholder="Filter by Role"
              size="large"
              style={{ width: "100%" }}
              allowClear
              value={selectedRole}
              onChange={(val) => dispatch(setSelectedRole(val))}
              options={[
                { value: "all", label: "All" },
                { value: "admin", label: "Admin" },
                { value: "moderator", label: "Moderator" },
                { value: "user", label: "User" },
              ]}
            />
          </Col>
        </Row>

        <Row gutter={[24, 24]}>
          {loading
            ? Array.from({ length: 8 }).map((_, index) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={index}>
                  <Card style={{ borderRadius: 12 }}>
                    <Skeleton avatar active paragraph={{ rows: 2 }} />
                  </Card>
                </Col>
              ))
            : filteredUsers.map((user) => (
                <Col xs={24} sm={12} md={8} lg={6} xl={6} key={user.userId || user.id}>
                  <UserCard user={user} />
                </Col>
              ))}
        </Row>
        {!loading && filteredUsers.length === 0 && (
          <Row justify="center" style={{ marginTop: 40 }}>
            <Col>
              <Typography.Text type="secondary">
                No users found matching your criteria.
              </Typography.Text>
            </Col>
          </Row>
        )}

        <AddUserModal 
          visible={modalVisible} 
          onCancel={() => setModalVisible(false)} 
        />
      </div>
    </div>
  );
};

export default UserList;