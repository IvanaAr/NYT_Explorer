

class App extends React.Component {
  constructor(props) {
      super(props)
      
      this.state = {
          articles: [],
      }
      this.setData = this.setData.bind(this);
  }


  setData(responseData) {
      
      // let articles=responseData.response.docs.slice(0,20)
      // this.setState({ articles: articles });
      // console.log(articles[0].web_url)

       let articles = [];
          for(var i = 0; i < 1; i++) {
            const article = responseData.response.docs[i];
            articles.push(article.web_url);
            console.log(article.web_url)
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
            (article, index) => <Item key={index} article={article}/>
          )
        }</div>
        )
  }

}


class Item extends React.Component {
  
  constructor(props){
  super(props)
  this.state={preview:{}
  }

this.done=this.done.bind(this);
}

done(results){
  this.setState({ preview: results });
  console.log(results)
  console.log("helo from second api")

    }
   

    componentDidMount() {
    const url='http://api.linkpreview.net/?key=5a901d221b994d82ced4d399f271c1f206b76f8e6a893&q='+this.props.article
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
              <p>{this.state.articles} </p> 
              <p>{this.state.preview.title}</p>
              <img src={this.state.preview.image}/>
              <p>{this.state.preview.description}</p>
              <p>{this.state.preview.url}</p> 
          </div>
        );
    }
}






function search() {


    const root = document.getElementById('root');
    ReactDOM.render( <App /> , root);

}
  