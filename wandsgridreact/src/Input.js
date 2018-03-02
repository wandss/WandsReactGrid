import React from 'react';
import PropTypes from 'prop-types';

export class Input extends React.Component{
  render(){
    const leftLabel=this.props.leftLabel?(
      <span className="input-group-addon">
        {this.props.leftLabel}
      </span>
    ):null;
    return(
      <div className="form-group">
        <div className="input-group">
          {leftLabel}
          <input className={"form-control "+this.props.cssClass}
           type={this.props.type}
           placeholder={this.props.placeholder}
           onChange={this.props.onChange}
           name={this.props.name}
           value={this.props.value}
           readOnly={this.props.readonly}
          />
        </div>
      </div>
    );
  }
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
