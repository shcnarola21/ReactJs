import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { SaveBlog } from './actions'
import { UpdateBlog } from './actions'
import { Redirect } from 'react-router'
import { fetchBlog } from './actions'
class BlogForm extends React.Component {
    componentWillReceiveProps = (nextProps) => {
        
        
        if (this.props.match.params._id)
        {
        this.setState(
            {            
                _id: nextProps.blog._id,
                title: nextProps.blog.title,
                cover: nextProps.blog.cover
            }
        )
    }
    }
    componentDidMount = () => {
        console.log(this.props.match.params._id);
        if (this.props.match.params._id) {
            this.props.fetchBlog(this.props.match.params._id);
        }
    }
    state = {
        _id: this.props.blog ? this.props.blog._id : '',
        title: this.props.blog ? this.props.blog.title : '',
        cover: this.props.blog ? this.props.blog.cover : '',
        errors: {},
        loading: false,
        notfoundErr: '',
        done: false
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: [e.target.value] })
    }

    handleSubmit = (e) => {
        e.preventDefault()

        //validations
        let errors = {};
        if (this.state.title === '') errors.title = 'Title Cant Be Empty';
        if (this.state.cover === '') errors.cover = 'Cover Cant Be Empty';
        this.setState({ errors })

        const isValid = Object.keys(errors).length === 0;
        if (isValid) {
            this.setState({ loading: true })
            const { _id, title, cover } = this.state;
            if (_id) {
                this.props.UpdateBlog({ _id, title, cover }).then(
                    () => {
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then((errors) => {
                        console.log(errors)
                        this.setState({ errors, loading: false })
                        console.log(this.state)
                    })
                )
            }
            else {
                    this.props.SaveBlog({ title, cover }).then(
                    () =>
                    {
                        this.setState({ done: true })
                    },
                    (err) => err.response.json().then((errors) => {
                        console.log(errors)
                        this.setState({ errors, loading: false })
                        console.log(this.state)
                    })
                )
            }
        }
    }
    render() {

        const form =
            (
                <div className='content'>
                    <h4 className="page-header">Add New Blog</h4>
                    {!!this.state.errors.global && <div className='alert alert-danger'><p>{this.state.errors.global}</p></div>}
                    <form role="form" className={classnames('form-horizontal', { loading: this.state.loading })} onSubmit={this.handleSubmit}>
                        <div className={classnames("form-group float-label-control", { errors: !!this.state.errors.title })}>
                            <label >Blog Title</label>
                            <input name='title'
                                value={this.state.title}
                                onChange={this.handleChange} type="text" className="form-control" placeholder="Enter Blog Title" />
                            <span  >{this.state.errors.title}</span>
                        </div>
                        <div className={classnames("form-group float-label-control", { errors: !!this.state.errors.cover })}>
                            <label>Cove Url</label>
                            <input name='cover'
                                value={this.state.cover}
                                onChange={this.handleChange} type="text" className="form-control" placeholder="" />
                            <span >{this.state.errors.cover}</span>

                        </div>
                        <div className="form-group float-label-control">

                            {this.state.cover !== '' && <img src={this.state.cover} className='img' alt='no img' />}
                        </div>
                        <button type='submit' className='btn btn-primary'>Save</button>
                    </form>
                </div>
            );
        return (
            <div>
                {this.state.done ? <Redirect to='/blogs' /> : form}
            </div>
        )
    }
}
function mapStateToProps(state, props) {
    if (props.match.params._id) {
        return { blog: state.blogs.find(item => item._id === props.match.params._id) }
    }
}
export default connect(mapStateToProps, { SaveBlog, fetchBlog, UpdateBlog })(BlogForm)