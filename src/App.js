import React,{Component} from 'react';
import './App.css';

const dataset=[
  {
    ProductID:"1",
    name:"Nike",
    CategoryID:"A12",
    category:"Footwear",
    SubCategoryID:"X67",
    SubCategoryName:"Sports Shoes",
    Price:"4000"
  },
  {
    ProductID:"2",
    name:"Addidas",
    CategoryID:"A12",
    category:"Footwear",
    SubCategoryID:"X67",
    SubCategoryName:"Casuals",
    Price:"5000"
  },
  {
    ProductID:"3",
    name:"Louis Vuitton",
    CategoryID:"A12",
    category:"Shirt",
    SubCategoryID:"X67",
    SubCategoryName:"Formal Shirt",
    Price:"10000"
  },
  {
    ProductID:"4",
    name:"Lacoste",
    CategoryID:"A12",
    category:"Tshirt",
    SubCategoryID:"X67",
    SubCategoryName:"Colared Tshirt",
    Price:"5500"
  },
  {
    ProductID:"5",
    name:"gucci",
    CategoryID:"A12",
    category:"Trousers",
    SubCategoryID:"X67",
    SubCategoryName:"Joggers",
    Price:"7000"
  },
  {
    ProductID:"6",
    name:"Supreme",
    CategoryID:"A12",
    category:"Trousers",
    SubCategoryID:"X67",
    SubCategoryName:"Jeans",
    Price:"9000"
  },
  {
    ProductID:"7",
    name:"IphoneXs",
    CategoryID:"A12",
    category:"Electronics",
    SubCategoryID:"X67",
    SubCategoryName:"Phone",
    Price:"78000"
  }
]

function catCall(){ //API call to fetch categories
 const categories=[];
 dataset.forEach(({category},index)=>{
  if(!categories.includes(category)){
    categories.push(category)
  }
 })
 return categories
}

function apiCall(category){  //API call to fetch products of a category.
  let queried=[];
  dataset.forEach((element,index)=>{
    if(element.category===category){
      queried.push(element);
    }
  })
  return queried;
};

class App extends Component{
  constructor(props){
    super(props);
  }
  state={
    checkedElements:[],
    data:[],
    categories:[]
  };
  handleCheck(id){
    if(!this.state.checkedElements.includes(id)){ //If checked elements does not inlcude the category
      const checked=this.state.checkedElements;
      checked.push(id);
      this.state.checkedElements=checked;
    }else{
      let removalIndex;
      this.state.checkedElements.forEach((el,i)=>{
        if(el===id){
          removalIndex = i;
        }
      });
      const checked = this.state.checkedElements;
      checked.splice(removalIndex,1);
      this.state.checkedElements=checked
    }
    this.fetchAndFilter(this.state.checkedElements)
  }
  fetchAndFilter(cats){ //[shoes, shirts]
    let queryResult=[]
    for(let i=0;i<cats.length;i++){
      const catQueryResult = apiCall(cats[i]);
      if(catQueryResult.length===0){            
      continue;                               
      }
      else{
        for(let j=0;j<catQueryResult.length;j++){
          queryResult.push(catQueryResult[j]); 
        } 
      }
    }
    this.setState({data:queryResult})
  }
  componentDidMount(){
    // this.setState({categories:["shoes","shirts","caps"]})
    // catCall();
    const cats = catCall();
    this.setState({categories:cats});
  }
  render(){
    return (
      <div className="main-container">
        <div className='header-container'>
          <h1>Product Filter</h1>
        </div>
        <div className="app-container">
          <form className="checkbox-container">
            {this.state.categories.map((element,index)=>{
              return(
                <label key={index} htmlFor={element}>
                    {element}
                  <input class="filled-in" key={index+1} id={element} type="checkbox" onClick={(e)=>this.handleCheck(e.target.id)}/> 
                </label>
              )
            })}
          </form>
          <div className="results-container">
            {this.state.data.map((element,index)=>{
              return (
                <div key= {index+2} className="product">
                  <h2 key={index}>{element.name}</h2>
                  <h3 key={index+1}>{element.category}</h3>
                  <h4 key={index+2}>Sub-Category: {element.SubCategoryName} | <span>{element.Price} INR </span></h4>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default App;
