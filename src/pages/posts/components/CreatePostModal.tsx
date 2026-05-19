import React, { useState } from 'react';
import { Modal, Form, Input, Select, message } from 'antd';
import { createPost } from '../../../services/postService';
import { useAppDispatch } from '../../../store/hooks';
import { addPostToList } from '../postSlice';
import { t } from 'i18next';

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
      title={t('CREATE_NEW_POST')}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText={t('CREATE_POST')}
      cancelText={t('CANCEL')}
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
          label={t('TITLE')}
          rules={[
            { required: true, message: t('PLEASE_ENTER_POST_TITLE') },
            { min: 5, message: t('TITLE_MIN_LENGTH') }
          ]}
        >
          <Input placeholder={t('ENTER_POST_TITLE')} />
        </Form.Item>

        <Form.Item
          name="body"
          label={t('DESCRIPTION_BODY')}
          rules={[
            { required: true, message: t('PLEASE_ENTER_POST_DESCRIPTION') },
            { min: 10, message: t('DESCRIPTION_MIN_LENGTH') }
          ]}
        >
          <TextArea rows={6} placeholder={t('ENTER_POST_DESCRIPTION')} />
        </Form.Item>

        <Form.Item
          name="tags"
          label={t('TAGS')}
          rules={[
            { type: 'array', max: 5, message: t('TAGS_MAX_LENGTH') }
          ]}
        >
          <Select
            mode="tags"
            style={{ width: '100%' }}
            placeholder={t('ADD_TAGS')}
            tokenSeparators={[',']}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreatePostModal;
