// import $ from "jquery";
import React from 'react';


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

const url = new URL('http://api.linkpreview.net/?key=5a901d221b994d82ced4d399f271c1f206b76f8e6a893&q='+this.props.article.web_url);
  

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
    .then(function(json){
        console.log(json);
    })
    .catch(function(error) {
        console.log(error);
    });


  //   const url='http://api.linkpreview.net/?key=5a901d221b994d82ced4d399f271c1f206b76f8e6a893&q='+this.props.article.web_url
  //     $.ajax({
  //         url: url,
  //         method: 'GET',
  //         success: this.done
  //        }
  //     );
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


export default Item;