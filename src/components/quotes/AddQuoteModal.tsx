import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { useAppDispatch } from '../../store/hooks';
import { addQuoteLocal } from '../../pages/quotes/quoteSlice';
import type { Quote } from '../../services/quoteService';
import { useThemeContext } from '../../theme/ThemeContext';
import { GLOBAL_TEXT } from '../../constants/Strings';

const { TextArea } = Input;

interface AddQuoteModalProps {
  visible: boolean;
  onCancel: () => void;
}

const AddQuoteModal: React.FC<AddQuoteModalProps> = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const { isDarkMode } = useThemeContext();

  const handleFinish = (values: any) => {
    const newQuote: Quote = {
      id: Math.floor(Math.random() * 100000) + 1000, // Temporary ID
      quote: values.quote,
      author: values.author,
    };

    dispatch(addQuoteLocal(newQuote));
    message.success('Quote added successfully!');
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={GLOBAL_TEXT.ADD_NEW_QUOTE}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={GLOBAL_TEXT.ADD_QUOTE}
      cancelText={GLOBAL_TEXT.CANCEL}
      centered
      destroyOnClose
      style={{ borderRadius: 16 }}
      styles={{
        header: { 
          borderBottom: `1px solid ${isDarkMode ? '#303030' : '#f0f0f0'}`,
          paddingBottom: 16,
          marginBottom: 16
        },
        content: {
          background: isDarkMode ? '#1f1f1f' : '#ffffff',
          borderRadius: 16
        }
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ author: '' }}
      >
        <Form.Item
          name="quote"
          label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Quote Text</span>}
          rules={[
            { required: true, message: 'Please enter the quote text' },
            { min: 10, message: 'Quote must be at least 10 characters long' }
          ]}
        >
          <TextArea 
            rows={4} 
            placeholder="Enter the quote here..." 
            style={{ 
              borderRadius: 8,
              background: isDarkMode ? '#141414' : '#ffffff',
              borderColor: isDarkMode ? '#434343' : '#d9d9d9',
              color: isDarkMode ? '#ffffff' : '#000000'
            }}
          />
        </Form.Item>

        <Form.Item
          name="author"
          label={<span style={{ color: isDarkMode ? '#ffffff' : '#000000' }}>Author Name</span>}
          rules={[{ required: true, message: 'Please enter the author name' }]}
        >
          <Input 
            placeholder="Enter author name" 
            style={{ 
              borderRadius: 8,
              background: isDarkMode ? '#141414' : '#ffffff',
              borderColor: isDarkMode ? '#434343' : '#d9d9d9',
              color: isDarkMode ? '#ffffff' : '#000000'
            }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddQuoteModal;
