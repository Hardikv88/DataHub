import React, { useState } from 'react';
import { 
  Modal, 
  Form, 
  Input, 
  InputNumber, 
  Select, 
  DatePicker, 
  Button, 
  Row, 
  Col, 
  message 
} from 'antd';
import { addUser } from '../../../services/userService';
import { useAppDispatch } from '../../../store/hooks';
import { addUserToList } from '../userSlice';

interface AddUserModalProps {
  visible: boolean;
  onCancel: () => void;
}

const { Option } = Select;

const AddUserModal: React.FC<AddUserModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const payload = {
        ...values,
        birthDate: values.birthDate ? values.birthDate.format('YYYY-MM-DD') : undefined,
      };

      const newUser = await addUser(payload);
      
      // Since DummyJSON doesn't persist, we might need to ensure the ID is unique or just use what they return
      // dummyjson returns ID 209 for any new user usually
      dispatch(addUserToList(newUser));
      
      message.success('User added successfully');
      form.resetFields();
      onCancel();
    } catch (error: any) {
      console.error('Failed to add user:', error);
      message.error(error.message || 'Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Add New Member"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width={720}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          role: 'user',
          gender: 'male'
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="firstName"
              label="First Name"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input placeholder="John" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="lastName"
              label="Last Name"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input placeholder="Doe" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="maidenName"
              label="Maiden Name"
            >
              <Input placeholder="Optional" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter username' }]}
            >
              <Input placeholder="johndoe123" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Please enter a valid email' }
              ]}
            >
              <Input placeholder="john@example.com" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: 'Please enter phone number' }]}
            >
              <Input placeholder="+1 234 567 890" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="age"
              label="Age"
              rules={[
                { required: true, message: 'Age is required' },
                { type: 'number', min: 1, message: 'Age must be at least 1' }
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="25" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="gender"
              label="Gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select gender">
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="birthDate"
              label="Birth Date"
              rules={[{ required: true, message: 'Birth date is required' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: 'Please enter password' },
                { min: 6, message: 'Password must be at least 6 characters' }
              ]}
            >
              <Input.Password placeholder="******" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select role">
                <Option value="admin">Admin</Option>
                <Option value="moderator">Moderator</Option>
                <Option value="user">User</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="image"
              label="Profile Image URL"
            >
              <Input placeholder="https://example.com/avatar.jpg" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="university"
              label="University"
            >
              <Input placeholder="Stanford University" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              name="bloodGroup"
              label="Blood Group"
            >
              <Input placeholder="A+" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="height"
              label="Height (cm)"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="weight"
              label="Weight (kg)"
            >
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="eyeColor"
              label="Eye Color"
            >
              <Input placeholder="Blue" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item style={{ marginBottom: 0, textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Add Member
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUserModal;
