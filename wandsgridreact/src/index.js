import React from "react";
import ReactDOM from 'react-dom';
import {GridComponent} from './GridComponent';

class Index extends React.Component{
  rowId(id){
    console.log(id)
  }
  row(row){
    console.log(row)
  }

  render(){
    const movies = [{id:1, movie:"Monty Python and the Holy Grail", year:1975},
                    {id:2, movie:"Pulp Fiction", year:1994},
                    {id:3, movie:"The Green Mile", year:1999},]
    const colNames = {'movie':'Filmes','year':'Ano'};
    return(
      <div>
        <GridComponent searchField
         getRowId={this.rowId}
         getRow={this.row}
         trueValueProps={{cssClass:'fa fa-check', color:'green'}}
         hiddenColumns={['sold_out']}
         renameColumns={colNames}
         removeColumns={['id', 'Ano']}
         gridData={movies}
        />
      </div>
    )
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)



