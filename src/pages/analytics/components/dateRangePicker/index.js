import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { setData } from '../../../../Redux/dataSlice';

import { BsCalendar2Day } from 'react-icons/bs';
import "../../../../pages/analytics/style.css"


function DateRangePicker() {
    const dispatch = useDispatch();

    useEffect(() => {
        const handleData = async () => {

            try {
                const appsDataResponse = await axios.get("http://go-dev.greedygame.com/v3/dummy/apps");
                const reportDataResponse = await axios.get("http://go-dev.greedygame.com/v3/dummy/report?startDate=2021-05-01&endDate=2021-05-03");

                if (appsDataResponse && reportDataResponse) {
                    const appIds = appsDataResponse.data.data;
                    const data = reportDataResponse.data.data;
                    const filteredData = data.filter(object => {
                        return appIds.some(appIdObject => {
                            return object.app_id === appIdObject.app_id;
                        });
                    }).map(object => {
                        const { app_id, ...remainingFields } = object;
                        const appName = appIds.find(appIdObject => appIdObject.app_id === object.app_id).app_name;
                        return { ...remainingFields, app_name: appName, fill_rate: (object.requests / object.responses) * 100, ctr: (object.clicks / object.impressions) * 100 };
                    });
                    filteredData.length = appIds.length
                    console.log(filteredData)
                    dispatch(setData(filteredData));
                }
                else {
                    dispatch(setData([]));
                }


            }
            catch (error) {
                console.error(error);
            }

        };
        handleData();
    }, [dispatch]);

    return (
        <div className="topAnalytics-element">
            <BsCalendar2Day color='blue' />
            <p style={{ marginLeft: "10px" }}>June 01-June 30,2021</p>
        </div>
    );
}

export default DateRangePicker;