import React, { useState } from 'react';
import DateRangePicker from './components/dateRangePicker';

import { useSelector } from 'react-redux'
import { GoSettings } from 'react-icons/go';
import './style.css';
import ColumnsManager from './components/ColumnsManger.js';
import Table from './components/Table';

const columns = [
    {
        title: 'AD Request',
        dataIndex: 'requests',
        key: 'requests',
    },
    {
        title: 'AD Response',
        dataIndex: 'responses',
        key: 'responses',
    },
    {
        title: 'Impression',
        dataIndex: 'impressions',
        key: 'impression',
    },
    {
        title: 'Clicks',
        dataIndex: 'clicks',
        key: 'clicks',
    },
    {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'revenue',
    },
    {
        title: 'Fill Rate',
        dataIndex: 'fill_rate',
        key: 'fill_rate',
    },
    {
        title: 'CTR',
        dataIndex: 'ctr',
        key: 'ctr',
    },
];

const firstTwoColumn = [{
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    visible: true,
},
{
    title: 'App Name',
    dataIndex: 'app_name',
    key: 'app_name',
    visible: true,
}]


const Analytics = () => {
    const data = useSelector(state => state.data);
    const [columnsSetting, setColumnsSetting] = useState(columns);
    const [viewColumnsManager, setViewColumnsManager] = useState(false);


    return (
        <div className='Analytics-container'>
            <p className='title'>Analytics</p>
            <div className="topAnalytics-container">
                <DateRangePicker />

                <div className="topAnalytics-element" onClick={() => setViewColumnsManager(true)}>
                    <GoSettings color='blue' />
                    <p style={{ marginLeft: "10px" }}>Setting</p>
                </div>
            </div>
            <div className={`middleAnalytics-container ${viewColumnsManager || "view-middleAnalytics-container"}`}>
                <p>Dimensions and Metrics</p>
                <ColumnsManager firstTwoColumn={firstTwoColumn} columns={columnsSetting} onChange={setColumnsSetting} HandleViewColumnsManager={() => setViewColumnsManager(false)} />
            </div>
            {data && <Table columns={[...firstTwoColumn, ...columnsSetting]} data={data} />}
        </div>
    );
};

export default Analytics;
