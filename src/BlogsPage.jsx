import React from 'react'
import { connect } from 'react-redux'
import BlogsList  from './BlogsList'
import  { fetchBlogs , deleteBlog } from './actions'

class BlogsPage extends React.Component
{
 
    componentDidMount()
    {
        console.log("DELETE",this.props.deleteBlog)
        this.props.fetchBlogs();
    
    }

    render() {
        return (
            <div>
                <BlogsList blogs = {this.props.blogs} deleteBlog = {this.props.deleteBlog} />
            </div>
        )
    }
}

BlogsPage.prototypes =
{
    blogs: React.PropTypes.array.isRequired,
    fetchBlogs:React.PropTypes.func.isRequired,
    deleteBlog:React.PropTypes.func.isRequired
}

function mapStateToProps(state) 
{
console.log('here',state)
   return state;
}
export default connect(mapStateToProps,{ fetchBlogs,deleteBlog})(BlogsPage);
