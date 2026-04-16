import React from 'react';
import { Input as AntInput } from 'antd';
import type { InputProps as AntInputProps } from 'antd';
import { Colors } from '../../theme/colors';

export interface InputProps extends AntInputProps {
  label?: string;
  validationError?: string;
}

const Input: React.FC<InputProps> = ({ label, validationError, type, style, ...props }) => {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && (
        <label style={{textAlign: 'left', display: 'block', marginBottom: 8, fontWeight: 600, color: Colors.heading, fontSize: 14 }}>
          {label}
        </label>
      )}
      {type === 'password' ? (
        <AntInput.Password 
          size="large" 
          style={{ height: 44, borderRadius: 8, backgroundColor: Colors.bg, ...style }} 
          {...props} 
        />
      ) : (
        <AntInput 
          size="large" 
          type={type} 
          style={{ height: 44, borderRadius: 8, backgroundColor: Colors.bg, ...style }} 
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
