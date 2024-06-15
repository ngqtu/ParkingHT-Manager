import "assets/css/inputField.css"
import icons from 'ultils/icons';

const InputFieldPass = ({ className, classNameInput, showPassword, onClick, value, onChange, placeholder,
         nameKey, invalidFields, setInvalidFields }) => {
    const { VisibilityOutlinedIcon, VisibilityOffOutlinedIcon } = icons;
    return (
        <div className='inputFieldDiv'>
            <div className={className}>
                <input
                    className={classNameInput}
                    type={showPassword ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    onFocus={() => setInvalidFields([])}
                />
                {showPassword ? (
                    <VisibilityOutlinedIcon
                        className="iconEye"
                        onClick={onClick}
                    />
                ) : (
                    <VisibilityOffOutlinedIcon
                        className="iconEye"
                        onClick={onClick}
                    />
                )}
            </div>
            {invalidFields?.some(el => el.name === nameKey)
                && <span className='errMessage'>{invalidFields.find(el => el.name === nameKey)?.mes}</span>
            } 
        </div>
    );
};

export default InputFieldPass;