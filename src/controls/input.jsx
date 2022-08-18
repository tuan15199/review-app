import React, { Component } from "react";

class Input extends Component {
  render() {
    const {
      // type,
      id,
      // name,
      label,
      labelSize,
      // placeHolder,
      // readOnly,
      // rows,
      loginRef,
      frmField,
      err,
      errMessage,
      ...others
    } = this.props;

    const size = labelSize ? labelSize : 3;
    const classLeft = `col-sm-${size} col-form-label`;
    const classRight = `col-sm-${12 - size}`;
    const numRows = others['rows'] ?  others['rows'] : 1;
    const inputClass = `form-control ${err ? "is-invalid" : ""}`;
    
    return (
      <div className="form-group row">
        <label htmlFor={id} className={classLeft}>
          {label}
        </label>
        <div className={classRight}>
          {numRows === 1 ? (
            <input
              ref={loginRef}
              // type={type}
              className={inputClass}
              id={id}
              // name={name}
              // readOnly={readOnly}
              // placeholder={placeHolder}
              {...others}
              {...frmField}
            />
          ) : (
            <textarea
              ref={loginRef}
              // rows={rows}
              className={inputClass}
              id={id}
              // name={name}
              // readOnly={readOnly}
              // placeholder={placeHolder}
              {...others}
              {...frmField}
            ></textarea>
          )}
          {err ? <div className="invalid-feedback">{errMessage}</div> : null}
        </div>
      </div>
    );
  }
}

export default Input;
