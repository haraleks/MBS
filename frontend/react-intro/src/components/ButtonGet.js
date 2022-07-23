import React, { useState } from 'react';
import "./ButtonGet.scss"
import 'antd/dist/antd.css';
import { Button, Space } from 'antd';


function ButtonGet() {

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
            }, 6000);
    };

    return (
        <div>
            <Space style={{width: '100%',}}>
                <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                    Get Currency!
                </Button>
            </Space>
        </div>
    );
}

export default ButtonGet