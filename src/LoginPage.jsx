import React from 'react'
import { connect } from 'react-redux'
import BlogsList  from './BlogsList'
import  { fetchBlogs , deleteBlog } from './actions'

export class LoginPage extends React.Component
{

    constructor()
    {
        super();
    }
     render()
     {
         return(<h1>Login Form</h1>)
     }

}