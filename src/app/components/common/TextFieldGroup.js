import React from 'react';
import classnames from 'classnames';
import {Label} from 'semantic-ui-react';

const TextFieldGroup = ({name, value, label, error, type, onChange,placeholder,checkUserExists}) => {
    return (
        <div className={classnames("field text-center", {"error": error})}>
            <label>{label}</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                autoComplete="on"
                onBlur={checkUserExists}
            />
            {error  && <Label basic color="red" pointing>{error}</Label>}
        </div>
    );
};

TextFieldGroup.propTypes = {
    name: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    type: React.PropTypes.string.isRequired,
    placeholder: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired,
    checkUserExists: React.PropTypes.func
};

TextFieldGroup.defaultProps = {
    type: 'text'
};

export default TextFieldGroup;