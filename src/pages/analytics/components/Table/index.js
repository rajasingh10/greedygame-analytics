import React from 'react';
import { IoIosFunnel } from 'react-icons/io';

function Table({ columns, data }) {
    const visibleColumns = columns.filter((c) => c.visible);
    const changeDateFormat = (date) => {
        let formattedDate = new Date(date).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });
        return formattedDate;
    }

    return (
        <table className="responsive-table">
            <thead>
                <tr>
                    {visibleColumns.map((column) => (
                        <th key={column.key}>
                            <IoIosFunnel color='gray' /><br /><p>{column.title}</p>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr key={row.key}>
                        {visibleColumns.map((column) => {
                            if (column.dataIndex === 'date') {
                                return <td key={`${column.key}-${row.key}`}>{changeDateFormat(row[column.dataIndex])}</td>
                            }
                            else if (column.dataIndex === "requests" || column.dataIndex === "responses") {
                                return <td key={`${column.key}-${row.key}`}>{row[column.dataIndex].toLocaleString("en-US")}</td>
                            }
                            else if (column.dataIndex === "fill_rate" || column.dataIndex === "ctr") {
                                return <td key={`${column.key}-${row.key}`}>{row[column.dataIndex].toFixed(2)}%</td>
                            }
                            else if (column.dataIndex === "revenue") {
                                return <td key={`${column.key}-${row.key}`}>${row[column.dataIndex].toFixed(2)}</td>
                            }
                            else {
                                return <td key={`${column.key}-${row.key}`}>{row[column.dataIndex]}</td>
                            }

                        }
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default Table;
