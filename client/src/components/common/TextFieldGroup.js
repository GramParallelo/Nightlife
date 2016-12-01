import React, { PropTypes } from 'react'
import classnames from 'classnames'

const TextFieldGroup = ({ field, value, placeholder, label, error, type, onChange, checkUserExists }) => {
  return (
    <div className={classnames("form-group", { 'has-error': error})}>
      <label htmlFor="" className="control-label">{label}</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={checkUserExists}
        type={type}
        name={field}
        className="form-control"
      />
      {error && <span className="help-block">{error}</span>}
    </div>
  );
}

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  checkUserExists: PropTypes.func
};

TextFieldGroup.defaultProps = {
  type: 'text'
}

export default TextFieldGroup
