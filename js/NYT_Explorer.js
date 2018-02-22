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
          for(var i = 0; i < 20; i++) {
            const doc = responseData.response.docs[i];
            articles.push(doc.web_url);
          }
          this.setState({'articles': articles});

        }

  componentDidMount() {
      $.ajax({
          url: 'https://api.nytimes.com/svc/archive/v1/1999/2.json',
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
    return (<Item url={this.state.articles} />)
          
  }

}


class Item extends React.Component {
    render() {
        return ( 
          <div>
              <a href = { this.props.url } target = "_blank" > { this.props.url } </a> 
          </div>
        );
    }
}


function search() {


    const root = document.getElementById('root');
    ReactDOM.render( <App /> , root);

}
  









