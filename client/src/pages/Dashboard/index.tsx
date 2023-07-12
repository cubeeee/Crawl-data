import {
  Breadcrumb,
  Card,
  Col,
  Row,
  Statistic
} from "antd";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { FaAddressCard, FaBookMedical } from "react-icons/fa";
import styled from "styled-components";
import { API } from "./contant";
import { useAppSelector } from "@redux/hooks";

const CustomStatistic = styled(Statistic)`
  .ant-statistic-content-prefix svg {
    margin-bottom: -0.2rem;
  }
`;

const App: React.FC = () => {
  const { token } = useAppSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState<
    {
      productCount: number;
      userCount: number;
    }
  >({
    productCount: 0,
    userCount: 0
  });

  
  const fetchData = async () => {
    const response = await axios({
      method: "GET",
      url: `${API}/api/dashboard`,
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
    setState(response.data.data);
  }

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Trang Chủ</title>
      </Helmet>
      <Breadcrumb
        items={[
          {
            title: "Trang Chủ",
          },
        ]}
      />
      <Row
        style={{
          marginBottom: 20,
        }}
        gutter={16}
      >
        <Col xs={12} md={12} lg={8} xl={4}>
          <Card bordered={false} loading={loading}>
            <CustomStatistic
              title="User"
              value={state.userCount}
              prefix={<FaAddressCard />}
            />
          </Card>
        </Col>      
        <Col xs={12} md={12} lg={8} xl={4}>
          <Card bordered={false} loading={loading}>
            <CustomStatistic
              title="Product"
              value={state.productCount}
              prefix={<FaBookMedical />}
            />
          </Card>
        </Col>      
      </Row>
    </>
  );
};

export default App;
