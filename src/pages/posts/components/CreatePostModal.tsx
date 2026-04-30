import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { createPost } from '../../../services/postService';
import { useAppDispatch } from '../../../store/hooks';
import { addPostToList } from '../postSlice';

interface CreatePostModalProps {
  visible: boolean;
  onCancel: () => void;
}

const { TextArea } = Input;

const CreatePostModal: React.FC<CreatePostModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);
      
      const payload = {
        ...values,
        userId: 1, // Mock user ID as per DummyJSON requirements
      };

      const newPost = await createPost(payload);
      
      // Update local state
      dispatch(addPostToList(newPost));
      
      message.success('Post created successfully!');
      form.resetFields();
      onCancel();
    } catch (error: any) {
      if (error.errorFields) {
        // Validation error, no need for toast
        return;
      }
      console.error('Failed to create post:', error);
      message.error(error.message || 'Failed to create post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Create New Post"
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Create Post"
      cancelText="Cancel"
      destroyOnClose
      width={600}
    >
      <Form
        form={form}
        layout="vertical"
        name="create_post_form"
        initialValues={{ tags: [] }}
      >
        <Form.Item
          name="title"
          label="Title"
          rules={[
            { required: true, message: 'Please enter post title' },
            { min: 5, message: 'Title must be at least 5 characters' }
          ]}
        >
          <Input placeholder="Enter post title" />
        </Form.Item>

        <Form.Item
          name="body"
          label="Description (Body)"
          rules={[
            { required: true, message: 'Please enter post description' },
            { min: 10, message: 'Description must be at least 10 characters' }
          ]}
        >
          <TextArea rows={6} placeholder="Enter post description" />
        </Form.Item>

        <Form.Item
          name="tags"
          label="Tags"
          rules={[
            { type: 'array', max: 5, message: 'You can add up to 5 tags' }
          ]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder="Add tags"
            tokenSeparators={[',']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
