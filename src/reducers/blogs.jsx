import { SET_BLOGS, ADD_BLOG, BLOG_FETCHED, UPDATE_BLOG,DELETE_BLOG } from '../actions';
export default function blogs(state = [], action = {}) {
    switch (action.type) {
        case SET_BLOGS:
            {
                return action.blogs;
            }
        case ADD_BLOG:
            {
                return [...state, action.payload]
            }
        case BLOG_FETCHED:
            {
                const index = state.findIndex(item => item_id => action.blog._id);
                if (index > -1) {
                    return state.map(item => {
                        if (item._id === action.blog._id) 
                        {
                            console.log('blog', action.blog)
                            return action.blog
                        }
                        else {
                            console.log('we', item)
                            return item;
                        }
                    })
                }
                else 
                {
                    return [...state, action.blog]
                }
            }
        case DELETE_BLOG :
        {
            console.log('REDUCER')
            return state.filter(item => item._id !== action.blogId)
        }
        case UPDATE_BLOG:
            {
            
                return (state.map(item => {
                    if (item._id === action.blog._id) {
                        return action.blog;
                    }
                    else {
                        console.log('THIS IS',item);
                        return item;
                    }
                }));
            }
        default:
            {
                return state;
            }
    }
}