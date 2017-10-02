import React, {PropTypes} from 'react';
import './AddProjectForm.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CONSTS from '../../data/tasks';

//UI part for add project page

class AddProjectForm extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            selectedMembers: [],
            options: []
        };
    }

    componentWillMount() {

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
                            <h4 className="modal-title">Create Project</h4>
                        </div>
                        <div className="modal-body">

                            <div className="card-panel login-panel">
                                <form className="col s12" action="/" onSubmit={this.props.onSubmit}>
                                    <div className="row">
                                        <div className="input-field">
                                            <label htmlFor='title'>Title (max 30 characters)</label>
                                            <br/>
                                            <input className="form-control validate" id="title" type="text" maxLength="30" name="title" onChange={this.props.onChange}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field col s12">
                                            <label htmlFor='description'>Description (max 100 characters)</label>
                                            <br/>
                                            <textarea className="form-control validate" rows="2" id="description" type="text-area" maxLength="100" name="description" onChange={this.props.onChange}/>
                                        </div>
                                    </div>
                                    <Select
                                        name="select-members"
                                        value= {this.state.selectedMembers}
                                        options={CONSTS.OPTIONS}
                                        onChange={(val) => {this.props.onSelect(val); this.setState({selectedMembers: val})}}
                                        simpleValue={true}
                                        multi={true}
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

AddProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    onSelect: PropTypes.func.isRequired
};

export default AddProjectForm;
