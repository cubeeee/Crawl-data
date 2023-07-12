import { PlusOutlined } from '@ant-design/icons';
import { InitalProps } from '@typings/datatable';
import { Button, Form, Input, Modal, Select, Space, message } from 'antd';
import React, { useState } from 'react';
import { API, ITEM_NAME, FacebookState, ROLES, Status } from './constant';

const Export: React.FC<InitalProps<FacebookState>> = (props) => {
  const { onReload } = props;
  const initialValues = {

  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const onSubmit = async (values) => {
    try {
      if (API.addItem) {
        setLoading(true);
        const response = await API.addItem(values);
        if (response.data.status === "success") {
          message.open({
            type: 'success',
            content: `Đã thêm ${ITEM_NAME} thành công`
          });
          setVisible(false);
          form.resetFields();
          if (onReload) onReload();
        } else {
          message.open({
            type: 'error',
            content: response.data.message
          });
        }
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
        type='text'
        style={{
            backgroundColor: 'rgb(250 173 20)',
            color: '#fff',
        }}
      >
        Export
      </Button>
      <Modal
        title={`Export ${ITEM_NAME}`}
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
            label='Number'
            name='number'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Input placeholder='Input number to output file maximum 500'/>
          </Form.Item>

        </Form>
      </Modal>
    </>
  )
}

export default Export;