import { Breadcrumb, Button, Card, Input, Select, Space } from "antd";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { ITEM_NAME } from "./constan";
const Scan = () => {
    const [isInput, setIsInput] = useState<string>('getUid');
    const handleChange = (value: string) => {
        setIsInput(value);
    };
    return (
        <div >
            <Helmet>
                <meta charSet='utf-8' />
                <title>{ITEM_NAME}</title>
            </Helmet>
            <Breadcrumb items={[{
                title: 'Trang Chủ',
            }, {
                title: ITEM_NAME
            }]} />
            <Space>
                <Select
                defaultValue={isInput}
                style={{ width: 120 }}
                onChange={handleChange}
                options={[
                    { value: 'getUid', label: 'getUid' },
                    { value: 'getAll', label: 'getAll' },
                ]}
                />
                {
                    isInput === 'getUid' ? <Input placeholder='Enter uid user ' /> : <></>
                }
                <Button style={{
                    backgroundColor: '#1890ff',
                    color: '#fff'
                }}>Scan</Button>
            </Space>

            <Card style={{
                marginTop: '20px',
                height: '800px'
            }}>          
            </Card>
        </div>
    );
};


export default Scan;
