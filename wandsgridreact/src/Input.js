import React from 'react';
import PropTypes from 'prop-types';

export function Input(props){
  const leftLabel=props.leftLabel?(
    <span className="input-group-addon">
      {props.leftLabel}
    </span>
  ):null;
  return(
    <div className="form-group">
      <div className="input-group">
        {leftLabel}
        <input className={"form-control "+props.cssClass}
         type={props.type}
         placeholder={props.placeholder}
         onChange={props.onChange}
         name={props.name}
         value={props.value}
         readOnly={props.readonly}
        />
      </div>
    </div>
  );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired,
    value:PropTypes.oneOfType(
      [PropTypes.string,PropTypes.number]).isRequired,
    cssClass:PropTypes.string,
    placeholder:PropTypes.string,
    name:PropTypes.string,
    readOnly:PropTypes.bool,
}
