import React, { useState, useEffect } from "react";
import "../../../../pages/analytics/style.css"

function ColumnsManager({ firstTwoColumn, columns, onChange, HandleViewColumnsManager }) {
    const [columnsSetting, setColumnsSetting] = useState(columns);

    const handleColumnVisibility = (e, column) => {
        const updatedSetting = columnsSetting.map((c) => {
            if (c.key === column.key) {
                return { ...c, visible: !c.visible };
            }
            return c;
        });
        setColumnsSetting(updatedSetting);

    };

    const handleColumnDrag = (dragIndex, hoverIndex) => {
        const updatedSetting = [...columnsSetting];
        const [dragColumn] = updatedSetting.splice(dragIndex, 1);
        updatedSetting.splice(hoverIndex, 0, dragColumn);
        setColumnsSetting(updatedSetting);

    };

    const handleDragStart = (e, index) => {
        e.currentTarget.classList.add("dragging");
        e.dataTransfer.setData("text", index);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.target.classList.add("drag-over");
    };

    const handleDragLeave = (e) => {
        e.target.classList.remove("drag-over");
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        handleColumnDrag(e.dataTransfer.getData("text"), index);
        e.target.classList.remove("drag-over");
        e.currentTarget.classList.remove("dragging");
    };

    const handleApplyChanges = (e) => {
        e.preventDefault();
        onChange(columnsSetting);
    }

    useEffect(() => {
        const updatedSetting = columnsSetting.map((c) => {
            return { ...c, visible: true };
        });
        setColumnsSetting(updatedSetting);
        onChange(updatedSetting);
    }, [])

    return (
        <div>
            <div className="column-container">
                {firstTwoColumn.map((column, index) => {
                    return (
                        <div
                            className="column-item fixed"
                            style={{ borderLeftColor: "blue" }}
                        >
                            <h4>{column.title}</h4>
                        </div>
                    );
                })}
                {columnsSetting.map((column, index) => {
                    return (
                        <div
                            className="column-item"
                            key={column.key}
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, index)}
                            draggable={true}
                            onClick={(e) => handleColumnVisibility(e, column)}
                            style={{ borderLeftColor: column.visible ? "blue" : "gray" }}
                        >
                            <h4>{column.title}</h4>
                        </div>
                    );
                })}
            </div>
            <div className="columns-container-buttons">
                <button onClick={() => HandleViewColumnsManager()}>Close</button>
                <button onClick={(e) => handleApplyChanges(e)}>Apply Changes</button>
            </div>
        </div>
    );
}

export default ColumnsManager;
