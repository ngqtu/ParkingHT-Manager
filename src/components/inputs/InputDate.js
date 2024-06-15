import "assets/css/inputField.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InputDate = ({ value, className, classNameInput, nameKey, dateFormat, placeholder,
    invalidFields, setInvalidFields, onChange, label, readOnlyInput }) => {
    return (
        <div className='inputFieldDiv'>
            <div className={className}>
                {label && (
                    <label>{label}</label>
                )}
                <DatePicker
                    className={classNameInput}
                    selected={value}
                    dateFormat={dateFormat}
                    placeholderText={placeholder}
                    onChange={onChange}
                    onFocus={() => setInvalidFields([])}
                    readOnly={readOnlyInput}
                />
            </div>
            {invalidFields?.some(el => el.name === nameKey)
                && <span className='errMessage'>{invalidFields.find(el => el.name === nameKey)?.mes}</span>
            }
        </div>
    )
}

export default InputDate
