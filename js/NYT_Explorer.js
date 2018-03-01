class App extends React.Component {
  constructor(props) {
      super(props)
      
      this.state = {
          articles: [],
      }
      this.setData = this.setData.bind(this);
  }


  setData(responseData) {
    
       let articles = [];
          for(var i = 0; i < 1; i++) {
            const article = responseData.response.docs[i];
            articles.push(article);
            console.log(article)
          }
          this.setState({articles: articles});
          console.log(articles)
          console.log("hello from first api")
         
        }

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
      return 'Nothing to display';
    }
    return(
      <div id="articles"> 
        {
          this.state.articles.map(
            (article, index) => <Item key={index} article={article}  id={index} />
          )
        }</div>
        )
  }

}


class Item extends React.Component {
  
  constructor(props){
  super(props)
  this.state={preview:{},
  selectedArticle:{"title":this.props.article.headline.main,
      "publish date":this.props.article.pub_date,
      "rubric":this.props.article.section_name,
      "link":this.props.article.web_url,
      

  }
  }
this.clickArticle=this.clickArticle.bind(this);
this.done=this.done.bind(this);
}
clickArticle(){
  
  
  console.log("hello from clickArticle")

   
   document.getElementById(this.props.id).style.display = "block";
    

}

done(results){
  this.setState({ preview: results });
  console.log(results)
  console.log("helo from second api")

    }
   

    componentDidMount() {
    const url='http://api.linkpreview.net/?key=5a901d221b994d82ced4d399f271c1f206b76f8e6a893&q='+this.props.article.web_url
      $.ajax({
          url: url,
          method: 'GET',
          success: this.done
         }
      );
  }
  

    render() {
        return ( 
          <div>
               
              <p>{this.state.preview.title}</p>
              <img width="120" src={this.state.preview.image} onClick={(e) => this.clickArticle(e)}/>
              <p>{this.state.preview.description}</p>
              <div id={this.props.id} style={{display:'none'}} >
  {'Article Details'+JSON.stringify(this.state.selectedArticle,null,3)}
</div>
          </div>
        );
    }
}




function search() {


    const root = document.getElementById('root');
    ReactDOM.render( <App /> , root);

}
  