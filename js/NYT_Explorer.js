//App component 
class App extends React.Component {
  constructor(props) {
      super(props)
      
      this.state = {
          articles: [],
      }
      this.setData = this.setData.bind(this);
  }

//display 20 articles
  setData(responseData) {
    let articles = [];
          for(var i = 0; i < 20; i++) {
            const article = responseData.response.docs[i];
            articles.push(article);
            // console.log(article)
          }
          this.setState({articles: articles});
          // console.log(articles)
          // console.log("hello from first api")
         
        }
//first api call
  componentDidMount() {
    const year=document.getElementById('date').value.slice(0,4);
    const month=document.getElementById('date').value.slice(5,7).replace(/^0+/,'');
      $.ajax({
           url: 'https://api.nytimes.com/svc/archive/v1/'+year+'/'+month+'.json',
          method: 'GET',
          data: {
              'api-key': "e5116ab98a934e51954e8ba2bb9e0edb"
          },

          success: this.setData
      });
  }
  render() {
    if (!this.state.articles || this.state.articles.length == 0) {
      return "";
    }
    return(
      <div> 
        {
          this.state.articles.map(
            (article, index) => <Item key={index} article={article} id={index}/>
          )
        }
      </div>
        )
  }

}


class Item extends React.Component {
  
  constructor(props){
  super(props)
  this.state={preview:{},
  selectedArticle:{"Title":this.props.article.headline.main,
      "Publish date":this.props.article.pub_date,
      "Rubric":this.props.article.section_name,
      "Link":this.props.article.web_url,
     
      

  }
  }
this.clickArticle=this.clickArticle.bind(this);
this.done=this.done.bind(this);

}
//schow details on click
clickArticle(){

  // console.log("hello from clickArticle")
  document.getElementById(this.props.id).style.display = "block";
}

done(results){
  this.setState({ preview: results });
  // console.log(results)
  // console.log("helo from second api")

   }
//second api call
//handing urls first api
    componentDidMount() {
    const url='http://api.linkpreview.net/?key=5a901d221b994d82ced4d399f271c1f206b76f8e6a893&q='+this.props.article.web_url
      $.ajax({
          url: url,
          method: 'GET',
          success: this.done
         }
      );
  }
  
//render results 
      render() {
        return ( 

  <div className="wholediv">
    <div className="previewdiv">
      <p id="title">{this.state.preview.title}</p>
      <p>Click on image to see details. <img id="imgpreview"  src={this.state.preview.image} onClick={(e) => this.clickArticle(e)}/></p>
      <p id="description ">{this.state.preview.description}</p>
    </div>
    <div className="articleDetails" id={this.props.id} style={{display:'none'}} >
      <pre>
        {'Article Details:'+ JSON.stringify(this.state.selectedArticle, null, 3)}
      </pre>
    </div>
    </div>
     );
   }
}






function search() {

    const root = document.getElementById('root');
    ReactDOM.unmountComponentAtNode(root);
    ReactDOM.render( <App /> , root);

}
  