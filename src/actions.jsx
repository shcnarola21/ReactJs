
import store from './store'
export const SET_BLOGS = 'SET_BLOGS'
export const ADD_BLOG = 'ADD_BLOG'
export const BLOG_FETCHED = 'BLOG_FETCHED'
export const UPDATE_BLOG = 'UPDATE_BLOG'
export const DELETE_BLOG = 'DELETE_BLOG'

function handleResponse(response) {
    console.log('HELLLLO');
    if (response.ok) {
        return response.json();

    }
    else {
        let error = new Error(response.statusText)
        error.response = response;
        throw error;
    }
}

export function SaveBlog(data) {
    console.log(data);
    return dispatch => {
        return fetch('/api/blogs', {
            method: 'POST',
            body: JSON.stringify(data),
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(handleResponse).then(data => dispatch({ type: 'ADD_BLOG', payload: data }));
    }
}
export function UpdateBlog(data) {
    console.log('UPDATE', data);
    return dispatch => {
        return fetch(`/api/blogs/${data._id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers:
            {
                "Content-Type": "application/json"
            }

        }).then(handleResponse).then(data => dispatch({ type: 'UPDATE_BLOG', blog: data }));

    }
}
export function deleteBlog(id) {

    
        fetch(`/api/blogdelete/${id}`, {
            method: 'GET',
            headers:
            {
                "Content-Type": "application/json"
            }
        }).then(handleResponse)
        .then(data =>  data.value)
        .then(response => {
                  store.dispatch({type:DELETE_BLOG ,blogId:id})
        })
}
export function fetchBlogs() {
    return dispatch => {
        fetch('/api/blogs')
            .then(response => response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return json;
            })
            .then(
            response => {
                dispatch({ type: SET_BLOGS, blogs: response });
            }
            ,
            error => {
                console.log(error)
            }
            );
    }
}
export function fetchBlog(_id) {
    return dispatch => {
        fetch(`/api/blogs/${_id}`)
            .then(response => response.json().then(json => ({ json, response })))
            .then(({ json, response }) => {
                if (!response.ok) {
                    return Promise.reject(json);
                }

                return json;
            })
            .then(
            response => {
                dispatch({ type: BLOG_FETCHED, blog: response });
            }
            ,
            error => {
                console.log(error)
            }
            );
    }
}