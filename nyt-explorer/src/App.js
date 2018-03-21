import React, { Component } from 'react';
import './App.css';
// import $ from "jquery";
import Item from "./Item.js"


class App extends Component {

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
  const url = new URL('https://api.nytimes.com/svc/archive/v1/'+year+'/'+month+'.json');

    url.searchParams.append('api-key', "e5116ab98a934e51954e8ba2bb9e0edb")

    const request = new Request(
      url,
      {
        method: 'GET',
        mode: 'cors'
      }
    );

   


    fetch(request)
    .then(function(response) {
        console.log(response);
        return response.json()
    })
    .then(responseData=>
        this.setData(responseData))
    
    .catch(function(error) {
        console.log(error);
    });
  //     $.ajax({
  //          url: 'https://api.nytimes.com/svc/archive/v1/'+year+'/'+month+'.json',
  //         method: 'GET',
  //         data: {
  //             'api-key': "e5116ab98a934e51954e8ba2bb9e0edb"
  //         },

  //         success: this.setData
  //     });
  }
  render() {
    if (!this.state.articles || this.state.articles.length === 0) {
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

export default App;
