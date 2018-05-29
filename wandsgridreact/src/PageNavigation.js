import React from 'react';

export class PageNavigation extends React.Component{
  constructor(props){
    super(props);
    this.state={totalPages:this.props.pages, btnsArray:[], fullArray:[],
      actualPage:1
    };
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
    const actualPage = this.state.actualPage;
    if(e.target.id!==actualPage){
      if(e.target.id==='>>'){
        const starts = this.state.btnsArray[this.state.btnsArray.length-2]
        let btnsArray=this.state.fullArray.slice(starts, starts+5)

        if(btnsArray[btnsArray.length-1] < this.state.totalPages){
          btnsArray.push('>>')
        }

        btnsArray.unshift('<<');
        this.setState({actualPage:this.state.btnsArray.length,
          btnsArray:btnsArray})
        this.props.getPage(starts+1)
      }
      else{
        this.setState({actualPage:actualPage});
        this.props.getPage(e.target.id)
      }
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
 * Make the naviagtion to beggning works:
 *   <<
 * Create a button to go to the last and first pages "|< >|"
 * Move some logics from handleclick to a nre function
 *
 * Change the active page button's collor
 * Add Effects (transition)
 *
 * Check if is possible to make this component a functional component
 */
