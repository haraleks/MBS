import React from 'react';
import 'antd/dist/antd.css';
import './SelectMany.scss';
import { Select } from 'antd';

const { Option } = Select;
const children = [];
const currencies = ["USD", "RUB", "EUR", "AMD"]

for (let i = 0; i < 3; i++){
    children.push(<Option key={currencies[i]}>{currencies[i]}</Option>)
}

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function SelectMany() {
    return (
        <div>
          <Select
              mode="tags"
              style={{width: '50%',}}
              placeholder="Choice currencies"
              onChange={handleChange}>
              {children}
          </Select>
        </div>
    )
}

export default SelectMany