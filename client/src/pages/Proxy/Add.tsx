import { PlusOutlined } from '@ant-design/icons';
import { InitalProps } from '@typings/datatable';
import { Button, Form, Input, Modal, Space, message } from 'antd';
import React, { useState } from 'react';
import { API, ITEM_NAME, ProxyState } from './constant';

const Add: React.FC<InitalProps<ProxyState>> = (props) => {
  const { onReload } = props;
  const initialValues = {
    
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values: {
    list: string
  }) => {
    try {
      if (API.addItem) {
        setLoading(true);
        const rows = values.list.split('\n');
        for(const row of rows) {
          const [ip, port, username, password] = row.split(':');
          const response = await API.addItem({
            ip,
            port: Number(port),
            username,
            password
          });
          if (response.data.status == 1) {
            message.open({
              type: 'success',
              content: `Đã thêm ${ITEM_NAME} thành công`
            });
          } else {
            message.open({
              type: 'error',
              content: response.data.message
            });
          }
        }
        setVisible(false);
        form.resetFields();
        if (onReload) onReload();
      }
    } catch (err) {
      console.error(err);
      message.open({
        type: 'error',
        content: 'Đã xảy ra lỗi'
      });
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      <Button
        onClick={() => setVisible(true)}
        type='primary'
        icon={<PlusOutlined />}
      >
        Thêm mới
      </Button>
      <Modal
        title={`Thêm ${ITEM_NAME}`}
        open={visible}
        onCancel={() => setVisible(false)}
        destroyOnClose
        footer={<div className='right-aligned'>
          <Space>
            <Button
              loading={loading}
              htmlType='button'
              onClick={() => setVisible(false)}
            >
              Huỷ
            </Button>
            <Button form='frm-multi' htmlType='submit' type='primary' loading={loading}>
              Lưu
            </Button>
          </Space>
        </div>}
      >
        <Form
          form={form}
          id='frm-multi'
          layout='vertical'
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label='List'
            name='list'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Input.TextArea rows={10} placeholder='ip:port:username:password' />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Add;