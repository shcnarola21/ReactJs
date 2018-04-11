import React from 'react'
import { Link } from 'react-router-dom'
import  { deleteBlog } from './actions';
var imgStyle = 
{
    height: '220px'
      
};
function deleteData(id)
{
    console.log(id)
     deleteBlog(id);
}

export default function Blogcard(blog,deleteBlog) 
{
  
    return (
          <div className="col-sm-4">
              <br/>
              <div className='card'>
              <img style ={imgStyle} className="card-img-top img-thumbnail img-responsive" src={blog.blog.cover} alt="Card image cap"/>
               <div className="card-block">
                <h4 className="card-title">{blog.blog.title}</h4>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <Link to={`/blog/${blog.blog._id}`} className='btn btn-primary'>Edit </Link>&nbsp;
                <button className='btn btn-danger' onClick = { () => deleteData(blog.blog._id)}>Delete </button>
            </div>
             <div>
             </div>
            </div>
            </div>
       );
}
Blogcard.prototypes =
    {
        blog: React.PropTypes.object.isRequired,
        deleteBlog:React.PropTypes.func.isRequired
    }