import React from 'react';
import PropTypes from 'prop-types';
import './AddTaskForm.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CONSTS from '../../data/tasks';

//UI part for add task page

class AddTaskForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            status: ''
        };
    }

    render() {
        return(
            <div className="modal">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={this.props.onClose}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">Create Task</h4>
                        </div>
                        <div className="modal-body">
                            /*set state to {addTask: false} to not show this modal*/
                            <div className="card-panel login-panel">
                                <form className="col s12" action="/" onSubmit={this.props.onSubmit}>
                                    <div className="row">
                                        <div className="input-field">
                                            <label htmlFor='title'>Title (max 25 characters)</label>
                                            <br/>
                                            <input className="form-control validate" id="title" type="text" maxLength="25" name="title" onChange={this.props.onChange}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor='description'>Description (max 60 characters)</label>
                                            <br/>
                                            <textarea className="form-control validate" rows="2" id="description" type="text-area" maxLength="60" name="description" onChange={this.props.onChange}/>
                                        </div>
                                    </div>
                                    /*use react-select to add select task status feature */
                                    <Select
                                        name="select-status"
                                        value= {this.state.status}
                                        options={CONSTS.STATUS_OPTIONS}
                                        onChange={(val) => {this.props.onSelect(val); this.setState({status: val})}}
                                        simpleValue={true}
                                    />
                                    <input type="submit" className="btn-primary btn" value='Add'/>
                                </form>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

AddTaskForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default AddTaskForm;
