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
    return(
      <div>
        <GridComponent searchField
         getRowId={this.rowId}
         getRow={this.row}
         trueValueProps={{cssClass:'fa fa-check', color:'green'}}
<<<<<<< HEAD
=======
         hiddenColumns={['sold_out','id']}
         renameColumns={{'Price':'Preço','Artist':'Artista', 'Genre':'Gênero', 'Stars':'Rank'}}
         removeColumns={['Rank', 'date']}
>>>>>>> hideColumns
        />
      </div>
    )
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
