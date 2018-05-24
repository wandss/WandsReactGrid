import React from 'react';
import PropTypes from 'prop-types';

export function PageSizeSelector(props){
  const pageSizes=props.pageSizes;
  const options=pageSizes.map((size)=>
    <option key={size}>{size}</option>
  );
  function handleChange(e){
    props.getPageSize(e.target.value)
  }
  return(
    <div>
      <select onChange={handleChange}>
        {options}
      </select>
    </div>
  );
}

PageSizeSelector.defaultProps={
  pageSizes:[10,25,50,100]
}

PageSizeSelector.propTypes={
  getPageSize:PropTypes.func.isRequired,
}
