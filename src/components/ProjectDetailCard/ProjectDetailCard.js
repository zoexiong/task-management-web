import './ProjectDetailCard.css';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import CONSTS from '../../data/tasks';

import React from 'react';
import _ from 'lodash';

import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

class ProjectDetailCard extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            member: null,
            addTask: false,
            addStatus: null
        };

        this.onSelect = this.onSelect.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.toggleAddTask = this.toggleAddTask.bind(this);
        this.changeStatus = this.changeStatus.bind(this);
        this.getStatusOptions = this.getStatusOptions.bind(this);
        this.getStyle = this.getStyle.bind(this);
        this.onClose = this.onClose.bind(this);
    }

    componentWillMount() {
        const member = this.props.member;

        this.setState({
            member : member
        })
    }

    toggleAddTask() {
        this.setState({
            addTask: !this.state.addTask
        });
    }

    submitForm(event) {
        event.preventDefault();

        var member = _.clone(this.state.member);

        if (this.newTask.title && this.newTask.description && this.state.addStatus) {
            this.newTask.status = this.state.addStatus;
            var tasks = member.tasks.slice();
            tasks = tasks.concat(this.newTask);
            member.tasks = tasks;

            this.setState({
                member: member,
                addTask: false
            });

            member.index = this.props.index;
            this.props.onChangeMember(member);
        }
    }

    newTask = {
        title: '',
        description: '',
        status: null
    };

    changeForm(event) {
        const field = event.target.name;
        this.newTask[field] = event.target.value;
    }

    onSelect(val) {
        //this.newTask.status = val;
        this.setState({
            addStatus: val
        });
    }

    changeStatus(status, taskIndex){
        var member = _.clone(this.state.member);
        member.tasks[taskIndex].status = status;

        this.setState({
            member: member
        });

        this.props.onChangeMember(member);
    }

    getStatusOptions(taskIndex) {
        return CONSTS.STATUS.map(function(status, i){
            return(
                <li key={i}><a href="#" onClick={(e) => {this.changeStatus(status, taskIndex)}}>{status}</a></li>
            )
        }, this);
    };

    getStyle(status) {
        var color = '';
        if (status === 'Done') {
            color = 'mediumseagreen';
        } else if (status === 'On Hold') {
            color = 'yellow';
        } else if (status === 'In Process') {
            color = 'orange';
        } else if (status === 'Schedule') {
            color = 'lightblue';
        } else if (status === 'Sent') {
            color = 'lightgray';
        }
        return color
    }

    onClose() {
        this.setState({
            addTask: false
        });
    }

    render() {

        if (this.state.member){
            var tasks_list = <p></p>;
            var add_task = <p></p>;

            if (this.state.member.tasks){
                tasks_list = this.state.member.tasks.map(function(task, i) {
                    return(
                        //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                        <div className="task detail" key={uniqueId()} style={{borderLeft: '10px solid ' + this.getStyle(task.status)}}>
                            {task.title}
                            <div className="btn-group">
                              <button type="button" id={'button-' + i} className='btn dropdown-toggle status' style={{backgroundColor: this.getStyle(task.status)}} data-toggle="dropdown">
                                  <p>{task.status} <span className="caret"></span></p>
                              </button>
                              <ul className="dropdown-menu">
                                  {this.getStatusOptions(i)}
                              </ul>
                            </div>
                            <p>{task.description}</p>
                        </div>
                    );
                }, this);
            }

            if (this.state.addTask) {
                add_task = <AddTaskForm
                    onSubmit = {this.submitForm}
                    onChange = {this.changeForm}
                    onSelect = {this.onSelect}
                    onClose = {this.onClose}
                />
            }
            return(
                <div className="tasks">
                    <div className="task name">
                        <h4 className="card-name">{this.state.member.name}</h4>
                    </div>
                    <Sortable
                        id={this.props.index}
                        // See all Sortable options at https://github.com/RubaXa/Sortable#options
                        options={{
                            group: 'shared',
                            sort: false,
                        }}
                        tag="div" //default is div
                        onChange={(order, sortable, evt) => {
                            this.props.onChange(evt);
                        }}
                        >
                        {tasks_list}
                    </Sortable>

                    <div className="task" onClick={this.toggleAddTask}>
                        <div className="card-new">
                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                            <h4>Create New Task</h4>
                        </div>
                    </div>
                    {add_task}
                </div>
            )
        } else if (this.props.addNew) {
            return (
                <div className="tasks">
                    <div className="task name" onClick={this.props.onClick}>
                        <h4 id="add-new">Add New Member</h4>
                    </div>
                </div>
            )
        }

    }
}

ProjectDetailCard.propTypes = {
    items: React.PropTypes.array,
    onChange: React.PropTypes.func
};

export default ProjectDetailCard;