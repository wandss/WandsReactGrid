import React from 'react';

export function Paginator(props){
  const pages = 23;
  function handleClick(e){
    props.getPage(e.target.id)
  }
  function createPagesArray(count){
    const size = count>10?10:count;
    const array = []
    for(let i=1;i<=size; i++){
      array.push(i)
    }
    return(array)
  }
  const buttons = createPagesArray(pages).map((btn)=>
    <button onClick={handleClick} key={btn} id={btn}>
      {btn}
    </button>
  )
  return(
    <div>
      {buttons}
    </div>
  );
}
