import React from 'react';
import PropTypes from 'prop-types';

export class GridRows extends React.Component{
  constructor(){
    super();
    this.state={isSelected:false};
  }
  handleClick(){
    const id = this.props.row.id;
    const row = this.props.row;
    const isSelected = !this.state.isSelected;

    if(this.props.getRowId !== undefined){
      this.props.getRowId(id);
    }
    if(this.props.getRow !== undefined){
      this.props.getRow(row);
    }
    this.setState({isSelected:isSelected});
  }
  isValueNegative(value){
    if(!isNaN(Number(value))){
      return Number(value)<0?true:false;
    }
    return false;
  }
  render(){
    const tdStyle={
      cursor:this.props.getRowId||this.props.getRow?
      'pointer':'default' };
    const keys = Object.keys(this.props.row);
    const row = keys.map((key,index)=>
      <td key={index} onClick={this.handleClick.bind(this)}
       style={{...tdStyle,
           color:this.isValueNegative(this.props.row[key])?'red':
           this.state.isSelected?'':'#3555FA'}}
      >
       {this.props.row[key] instanceof Array?
         (this.props.row[key].join(', ')):
         (this.props.row[key])}
      </td>
    );
    const rowStyle={
      color:this.state.isSelected?'green':'',
    };
    return(
      <tr style={rowStyle}>
        {row}
      </tr>
    )
  }
}
GridRows.propTypes={
  row:PropTypes.object,
  getRowId:PropTypes.func,
  getRow:PropTypes.func,
}
