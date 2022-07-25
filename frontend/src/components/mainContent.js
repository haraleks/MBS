import React, { useState }  from "react"
import {Button, Select, Table} from 'antd';
import 'antd/dist/antd.css';
import useRequest from "./useRequest";
import useMount from "./useMount";
import moment from 'moment'
import "./mainContent.scss"
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import "jspdf-autotable";

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

const headersCSV = [
  { label: "Code", key: "code" },
  { label: "Name", key: "name" },
  { label: "Price", key: "price" },
  { label: "Nominal", key: "nominal" },
  { label: "Date", key: "date" }
];

function MainContent() {
    const { Option } = Select;
    let [selected, setSelected] = useState(null)
    let [selectedExport, setSelectedExport] = useState(null)
    let [selectedMany, setSelectedMany] = useState(null)

    const {fetch, requestResult} = useRequest()

    const {isLoading: isLoadingSend, fetch: fetchSend, requestResult: requestResultSend} = useRequest()

    const selectedFirstCurr = (value) => {
        setSelected(value)
    }
    const onChange = (value) => {
        setSelectedExport(value)
    };

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
        console.log('The link was clicked.')
    };

    const data = requestResultSend ? requestResultSend.result: requestResultSend || []

    const csvReport = {
        data: data,
        headers: headersCSV,
        filename: 'currencies.csv'
    };

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    const exportPDF = (pdfData) => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(15);

        const title = "Currencies";
        const headers = [["Code", "Name", "Price", "Nominal", "Date"]];
        const data = pdfData.map(elt=> [elt.code, elt.name, elt.price, elt.nominal, elt.date]);
        console.log("data")
        console.log(data)
        let content = {
          startY: 50,
          head: headers,
          body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("report.pdf")
    }

    const renderSwitch = (param, data) => {
        switch(param) {
            case 'excel':
                return (
                    <div>
                        <Button variant="warning" onClick={(e) => exportToCSV(data,"curencies")}>Export to excel</Button>
                    </div>);
            case 'csv':
                return (
                     <div>
                         <Button variant="warning">
                             <CSVLink {...csvReport}>Export to CSV</CSVLink><br /><br />
                         </Button>
                     </div>
                );
            case 'pdf':
                return (
                     <div>
                         <Button variant="warning" onClick={() => exportPDF(data)}>Export to PDF</Button>
                     </div>
                )
            default:
                return ;
        }
    }


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

            <div className="button">
                <Button type="primary" loading={isLoadingSend} onClick={handleClick}>
                    Get Currency!
                </Button>
            </div>

            <div className="table">
                <Table columns={columns} dataSource={requestResultSend ? requestResultSend.result: requestResultSend || []} />
            </div>
            <div className="select-export">
            <Select
                showSearch
                placeholder="Select a person"
                optionFilterProp="children"
                onChange={onChange}
                onSearch={onSearch}
                value={selectedExport}
                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
              >
                <Option value="excel">Excel</Option>
                <Option value="csv">CSV</Option>
                <Option value="pdf">PDF</Option>
            </Select>
            {renderSwitch(selectedExport, data)}
            </div>
        </>
    )
}

export default MainContent