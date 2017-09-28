import React, {PropTypes} from 'react';
import './AddProjectForm.css';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

import CONSTS from '../../data/tasks';

//UI part for add project page

console.log(CONSTS.MEMBERS);

var options = CONSTS.MEMBERS.map(function(name) {
    return(
        {value: name, label: name}
    );
});

function logChange(val) {
    console.log("Selected: " + JSON.stringify(val));
}

const AddProjectForm = ({
    onSubmit,
    onChange
}) => (
    <div className="container">
        <div className="card-panel login-panel">
            <form className="col s12" action="/" onSubmit={onSubmit}>
                <h4 className="center-align">Create Project</h4>

                <div className="row">
                    <div className="input-field col s12">
                        <input className="validate" id="title" type="text" name="title" onChange={onChange}/>
                        <label htmlFor='title'>Title</label>
                    </div>
                </div>

                <div className="row">
                    <div className="input-field col s12">
                        <input className="validate" id="description" type="text-area" name="description" onChange={onChange}/>
                        <label htmlFor='description'>Description</label>
                    </div>
                </div>

                <Select
                    name="select-members"
                    value=""
                    options={options}
                    onChange={logChange}
                    
                />


                <div className="row right-align">
                    <input type="submit" className="waves-effect waves-light btn indigo lighten-1" value='Add'/>
                </div>

            </form>
        </div>
    </div>
);

AddProjectForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default AddProjectForm;
