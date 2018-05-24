import React from 'react';

export function Paginator(props){
  const pages = props.pages;
  function handleClick(e){
    props.getPage(e.target.id)
  }
  function createPagesArray(count){
    //const size = count>10?10:count;
    const size = count;
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
/*TODO:
 * When size is bigger than 10 create buttons
 * to navigate like "<<|>>" or "Prev | Next"
 */
