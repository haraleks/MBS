import React from 'react';
import 'antd/dist/antd.css';
import './SelectOne.scss';
import { Select } from 'antd';

const { Option } = Select;

const onChange = (value) => {
  console.log(`selected ${value}`);
};

const onSearch = (value) => {
  console.log('search:', value);
};

function SelectOne() {
    return (
        <div>
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                <Option value="usd">USD</Option>
                <Option value="eur">EUR</Option>
                <Option value="rub">RUB</Option>
            </Select>
        </div>
    )
}

export default SelectOne