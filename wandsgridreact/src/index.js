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
    const movies = [
      {id:1, movie:"Monty Python and the Holy Grail", year:1975, genre:'Comedy'},
      {id:2, movie:"Pulp Fiction", year:1994, genre:['Drama', 'Crime']},
      {id:3, movie:"The Green Mile", year:1999,genre:['Crime','Drama','Fantasy','Mistery']},
      {id:4, movie:"Requiem For a Dream", year:1999, genre:'Drama'},
      {id:4, movie:"Back to Future", year:1984, genre:'Sci-Fi'},
      {id:4, movie:"Silence of the Lambs", year:1991, genre:['Crime','Drama','Thriller']},
      {id:4, movie:"Ben Hur", year:1959, genre:['Adventure','Drama','History']},
      {id:4, movie:"Lord Of The Rings: The Return of the King", year:2003,
        genre:['Adventure','Drama','Fantasy']},
      {id:4, movie:"Gladiator", year:2000, genre:['Action','Adventure','Drama']},
      {id:4, movie:"A Clockwork Orange", year:1971, genre:['Crime','Drama','Sci-Fi']},
      {id:4, movie:"The Pianist", year:2002, genre:'Biography, Drama, Music'},
      {id:4, movie:"Lock, Stock and Two Smoking Barrels", year:1998,
        genre:['Comedy','Crime']},
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
         cssClass="table table-bordered table-striped"
        />
      </div>
    )
  }
}
ReactDOM.render(
  <Index />,
  document.getElementById('root')
)



