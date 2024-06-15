import React, { memo } from 'react';

const SelectCategory = ({ options = [], itemValue, onChange }) => {
  return (
    <div className="selectGroup">
      <select className="select-component" defaultValue={itemValue} onChange={onChange}>
        {options?.map((el) => (
          <option key={el.vehicleCategoryId} value={el.vehicleCategoryId}>
            {el.vehicleCategoryName}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(SelectCategory);