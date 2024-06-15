import React, { memo, useCallback } from 'react';

const Select = ({ options = [], itemValue, onChange }) => {
  const handleChange = useCallback((event) => {
    onChange(event.target.value);
  }, [onChange]);
  return (
    <div className="selectGroup">
      <select className="select-component" defaultValue={itemValue} onChange={handleChange}>
        {options?.map((el) => (
          <option key={el.code} value={el.code}>
            {el.value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default memo(Select);