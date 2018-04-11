import React from 'react'
import BlogCard from './BlogCard'
import _ from 'lodash';


export default function BlogsList(blogs,deleteBlog) {
console.log('delete',deleteBlog)

    const emptyMessage = (
        <p>There are no blogs yet in your collection </p>
    );
    const blogslist = (
        <div className="row">
             {blogs.blogs.map(blog => <BlogCard blog={blog} key={blog._id} deleteBlog = {deleteBlog} />)}
        </div>
    );
    return (

        <div>
            {blogs.blogs.length === 0 ? emptyMessage : blogslist}
        </div>
    );
};
BlogsList.prototype =
    {
        blogs: React.PropTypes.array.isRequired,
        deleteBlog:React.PropTypes.func.isRequired
    }