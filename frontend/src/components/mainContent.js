import React, { useState }  from "react"
import {Button, Select, Space, Table} from 'antd';
import 'antd/dist/antd.css';
import useRequest from "./useRequest";
import useMount from "./useMount";
import moment from 'moment'
import "./mainContent.scss"

const columns = [
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Nominal',
    dataIndex: 'nominal',
    key: 'nominal',
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => moment(text).format("YYYY-MM-DD HH:mm:ss")
  },
];


function MainContent() {
    const { Option } = Select;
    let [selected, setSelected] = useState(null)
    let [selectedMany, setSelectedMany] = useState(null)

    const {fetch, requestResult} = useRequest()

    const {isLoading: isLoadingSend, fetch: fetchSend, requestResult: requestResultSend} = useRequest()

    const selectedFirstCurr = (value) => {
        setSelected(value)
    }

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const handleChange = (value) => {
        setSelectedMany(value)
        console.log(`selected ${selectedMany}`);
    };

    useMount(() => fetch("quotation/get_currencies"));

    var params = []
    for (let i = 0; i < (selectedMany ? selectedMany.length:selectedMany || 0); i++) {
        params.push(selected + "_" + selectedMany[i])
    }

    console.log(params)
    console.log(params.join(","))
    const url = "quotation/get?q=" + params.join(",")

    const handleClick = () => {
        fetchSend(url);
        console.log('The link was clicked.');
    };

    return (
        <>
            <div className="content-text-style">
                Сhoose a currency
            </div>
            <div className="content-select">
                <Select
                    showSearch
                    placeholder="Choice a currency"
                    optionFilterProp="children"
                    value={selected}
                    onChange={selectedFirstCurr}
                    onSearch={onSearch}
                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                  >
                    {(requestResult || []).map(el => (
                    <Option key={el}>{el}</Option>
                  ))}
                </Select>

                <Select
                    mode="tags"
                    style={{width: '50%',}}
                    placeholder="Choice currencies"
                    // value={selectedMany}
                    onChange={handleChange}>
                    {(selected ? requestResult?.filter(el => el !== selected) : requestResult || []).map(el => (<Option key={el}>{el}</Option>))}
                </Select>
            </div>

            <div className="table">
            <Button type="primary" loading={isLoadingSend} onClick={handleClick}>
                Get Currency!
            </Button>

                <Table columns={columns} dataSource={requestResultSend ? requestResultSend.result: requestResultSend || []} />
            </div>

        </>
    )
}

export default MainContent