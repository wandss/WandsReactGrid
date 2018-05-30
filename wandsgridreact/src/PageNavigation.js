import React from 'react';

export class PageNavigation extends React.Component{
  constructor(props){
    super(props);
    this.state={totalPages:this.props.pages, btnsArray:[], fullArray:[],
      activePage:1};
    this.createPagesArray=this.createPagesArray.bind(this);
  }
  createPagesArray(){
    const size = this.state.totalPages;
    let btnsArray = []
    for(let i=1;i<=size; i++){
      btnsArray.push(i)
    }
    const fullArray=btnsArray.slice();
    if(btnsArray.length>10){
      btnsArray=btnsArray.slice(0, 5);
      btnsArray.push('>>')
    }
    this.setState({btnsArray:btnsArray, fullArray:fullArray})
  }
  handleClick(e){
    if(this.state.activePage.toString()!==e.target.id.toString()){
      let goToPage=e.target.id;
      let btnsArray=this.state.btnsArray.slice();
      if(e.target.id==='>>'){
        const starts = btnsArray[btnsArray.length-2]
        btnsArray=this.state.fullArray.slice(starts, starts+5)

        if(btnsArray[btnsArray.length-1] < this.state.totalPages){
          btnsArray.push('>>')
        }

        btnsArray.unshift('<<');
        goToPage=starts+1
      }
      else if(e.target.id==='<<'){
        const ends = btnsArray[1]-1;
        btnsArray=this.state.fullArray.slice(ends-5, ends)
        if(btnsArray[btnsArray.length-1]){
          btnsArray.push('>>');
        }
        if(btnsArray[0]!==1){
          btnsArray.unshift('<<');
        }
        goToPage=ends;
      }
      this.setState({activePage:goToPage, btnsArray:btnsArray})
      this.props.getPage(goToPage)
    }
  }
  componentDidMount(){
    this.createPagesArray()
  }
  static getDerivedStateFromProps(nextProps, prevState){
    if(prevState.totalPages!==nextProps.pages){
      return {totalPages:nextProps.pages, btnsArray:prevState.btnsArray}
    }
    return null

  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(this.state.totalPages!==prevState.totalPages){
      this.createPagesArray()
    }
  }
  render(){
    const btns=this.state.btnsArray.map((btn)=>
      <button onClick={this.handleClick.bind(this)} key={btn} id={btn}>
        {btn}
      </button>
    );
    return(
      <div>
        {btns}
      </div>
    )
  }
}
/*TODO:
 * Create a button to go to the last and first pages "|< >|"
 * Move some logics from handleclick to a new function
 *
 * Change the active page button's collor
 * Add Effects (transition)
 * Add PropTypes
 *
 */
