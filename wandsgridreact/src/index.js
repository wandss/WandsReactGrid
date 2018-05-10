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
    const movies = [{id:1, movie:"Monty Python and the Holy Grail", year:1975, genre:'Comedy'},
                    {id:2, movie:"Pulp Fiction", year:1994, genre:['Drama', 'Crime']},
                    {id:3, movie:"The Green Mile", year:1999,genre:['Crime','Drama','Fantasy','Mistery']},
                    {id:4, movie:"Requiem For a Dream", year:1999, genre:'Drama'},
    ]
    const colNames = {'movie':'Filmes','year':'Ano','genre':'Gênero'};
    return(
      <div>
        <GridComponent searchField
         getRowId={this.rowId}
         getRow={this.row}
         trueValueProps={{cssClass:'fa fa-check', color:'green'}}
         hiddenColumns={['year']}
         renameColumns={colNames}
         removeColumns={['id']}
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



