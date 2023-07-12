import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from '@ant-design/icons';
import ImgBackground from '@assets/background.png';
import ImgLogo from '@assets/logo.svg';
import { API_LOCAL, RECAPTCHA_SITEKEY } from '@configs/index';
import { useAppDispatch } from '@redux/hooks';
import { loginSuccess } from '@redux/reducers/authSlice';
import { Button, Form, Input, Space, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Helmet } from 'react-helmet';
import styles from './style.module.scss';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const initialValues = {
    
  }
  const [isFetching, setIsFetching] = useState(false);
  const recaptchaRef = React.createRef<any>();
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      setIsFetching(true);
      const response = await axios.post(`${API_LOCAL}/auth/login`, {
        username: values.username,
        password: values.password,
      });
      if (response.data.status === 1) {
        dispatch(loginSuccess(response.data));
      } else {
        message.open({
          type: 'error',
          content: response.data.message,
        })
      }
    } catch (ex) {
      message.open({
        type: 'error',
        content: 'Đã có lỗi xảy ra, vui lòng thử lại sau!',
      })
    } finally {
      setIsFetching(false);
    }
  };
  return (
    <div style={{ backgroundImage: `url(${ImgBackground})` }} className={styles.container}>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Đăng Nhập</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.formContainer}>
          <div className={styles.formTop}>
            <div className={styles.formHeader}>
              <span className={styles.formLogo}>
                <img alt='logo' src={ImgLogo} />
              </span>
              <span className='ant-pro-form-login-title '>Admin</span>
            </div>
            <div className={styles.formDesc}>Đăng Nhập Vào Admin</div>
          </div>
          <div className={styles.formMain}>
            <Form onFinish={handleSubmit} initialValues={initialValues} autoComplete='off'>
              <Space direction='vertical' style={{ width: '100%', height: '100%', justifyContent: 'center' }}>
                <Form.Item
                  name='username'
                  rules={[
                    {
                      required: true,
                      message: 'Bạn chưa nhập tài khoản',
                    },
                  ]}>
                  <Input placeholder='Username' prefix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name='password'
                  rules={[
                    {
                      required: true,
                      message: 'Bạn chưa nhập mật khẩu',
                    },
                  ]}>
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder='Mật khẩu'
                    iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                  />
                </Form.Item>
                <ReCAPTCHA
                  ref={recaptchaRef}
                  size='invisible'
                  sitekey={RECAPTCHA_SITEKEY || ''}
                />
                <Button loading={isFetching} type='primary' htmlType='submit' block>Đăng Nhập</Button>
              </Space>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
