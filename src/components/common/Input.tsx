import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import { Colors } from '../../theme/colors';
import Text from "../../components/common/Text";
import { useThemeContext } from '../../theme/ThemeContext';

export interface InputProps extends AntInputProps {
  label?: string;
  validationError?: string;
}

const Input: React.FC<InputProps> = ({ label, validationError, type, style, ...props }) => {
  const { isDarkMode } = useThemeContext();
  const bgColor = isDarkMode ? Colors.bgDark : Colors.bgLight;
  const textColor = isDarkMode ? Colors.textDark : Colors.textLight;

  return (
    <div style={{ marginBottom: 16}}>
      {label && (
        <Text variant="text" style={{ marginBottom: 4, textAlign: 'left', display: 'block' }}>
          {label}
        </Text>
      )}
      {type === 'password' ? (
        <AntInput.Password 
          size="large" 
          className='text'
          style={{ height: 48, borderRadius: 8, backgroundColor: bgColor, color: textColor, ...style }} 
          {...props} 
        />
      ) : (
        <AntInput 
          size="large" 
          className='text'
          type={type} 
          style={{ height: 48, borderRadius: 8, backgroundColor: bgColor, color: textColor, ...style }} 
          {...props} 
        />
      )}
      {validationError && (
        <span style={{ color: Colors.danger, fontSize: 14, marginTop: 4, display: 'block' }}>
          {validationError}
        </span>
      )}
    </div>
  );
};

export default Input;
