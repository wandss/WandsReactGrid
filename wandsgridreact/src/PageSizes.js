import React from 'react';

export function PageSizes(props){
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
