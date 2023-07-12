import React, { useState } from 'react';
import { InitalProps } from '@typings/datatable';
import { API, ITEM_NAME, FacebookState, ROLES, Status } from './constant';
import { message, Button, Form, Input, Modal, Space, Tooltip, Select } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const Edit: React.FC<InitalProps<FacebookState>> = (props) => {
  const { onReload, item } = props;
  const initialValues = {
    ...item
  }
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [form] = Form.useForm();

  const onSubmit = async (values: FacebookState) => {
    try {
      if (API.editItem) {
        setLoading(true);
        const response = await API.editItem(item._id, values);
        if (response.data.status === "success") {
          message.open({
            type: 'success',
            content: `Đã sửa ${ITEM_NAME} thành công`
          });
          setVisible(false);
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
      <Tooltip title='Sửa'>
        <Button
          onClick={() => setVisible(true)}
          icon={<EditOutlined />}
        >
        </Button>
      </Tooltip>
      <Modal
        title={`Sửa ${ITEM_NAME}`}
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
            <Button form='frm-edit' htmlType='submit' type='primary' loading={loading}>
              Lưu
            </Button>
          </Space>
        </div>}
      >
        <Form
          form={form}
          id='frm-edit'
          layout='vertical'
          initialValues={initialValues}
          onFinish={onSubmit}
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label='FacebookId'
            name='facebookId'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Input/>
          </Form.Item>
          
          <Form.Item
            label='Status'
            name='status'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Select options={Status} />
          </Form.Item>

          <Form.Item
            label='Export'
            name='export'
            rules={[{ required: true, message: 'Thông tin bắt buộc' }]}
          >
            <Select options={ROLES} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Edit;