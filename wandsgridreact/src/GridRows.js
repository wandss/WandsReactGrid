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
  checkType(value){
    if(!isNaN(Number(value))){
      value = Number(value)
    }
    if(value.toString().split('$').length>1){
      let newValue = value.toString().split('$');
      const currencySymbol=newValue[0]//.length>0?newValue[0]:'';
      newValue = Number(newValue[newValue.length-1]).toLocaleString();
      return currencySymbol+'$'+newValue

    }
    return value
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
           this.state.isSelected?'':'blue'}}
      >
       {this.checkType(this.props.row[key] instanceof Array?
         (this.props.row[key].join(', ')):
         (this.props.row[key]))}
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
