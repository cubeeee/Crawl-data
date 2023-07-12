import React, { useEffect, useState } from "react";
import { Button, message, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { InitalProps } from "@typings/datatable";
import { API, ITEM_NAME, ProxyState } from "./constant";

const Delete: React.FC<InitalProps<ProxyState>> = (props) => {
  const { onReload, item } = props;
  const [loading, setLoading] = useState(false);
  const confirm = async () => {
    try {
      if (API.deleteItem) {
        setLoading(true);
        const response = await API.deleteItem(item._id);      
        if (response.data.status == 1) {
          message.open({
            type: "success",
            content: `Đã xóa ${ITEM_NAME} thành công`,
          });
          if (onReload) onReload();
        } else {
          console.log(response.data.message);
          message.open({
            type: "error",
            content: response.data.message,
          });
        }
      }
    } catch (error) {
      console.error(error);
      message.open({
        type: "error",
        content: "đã xãy ra lỗi",
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (loading) {
      message.open({
        key: "loading",
        type: "loading",
        content: "Loading...",
        duration: 0,
      });
    } else {
      message.destroy("loading");
    }
  }, [loading]);
  return (
    <>
      <Popconfirm
        title="Chắc chắn xóa?"
        onConfirm={confirm}
        okText="Yes"
        cancelText="No"
      >
        <Button danger icon={<DeleteOutlined />} />
      </Popconfirm>
    </>
  );
};

export default Delete;
