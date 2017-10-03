import './ProjectDetailCard.css';
import AddTaskForm from '../AddTaskForm/AddTaskForm';
import CONSTS from '../../data/tasks';

import React from 'react';
import _ from 'lodash';

import uniqueId from 'lodash/uniqueId';
import Sortable from 'react-sortablejs';

class ProjectDetailCard extends React.Component{

    /**
     * constructor, set the initial state
     */
    constructor(props) {
        super(props);
        this.state = {
            // member object: the data source of this component
            member: null,
            addTask: false,
            // status of the new added task
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

    /**
     * before component mount, store data come from this.props into this.state
     * and then use data from this.state instead of from this.props for easy re-render
     */
    componentWillMount() {
        const member = this.props.member;
        this.setState({
            member : member
        })
    }

    /**
     * submit add task form and add new task to the member object, and update the project object
     * @param {Object} event, a event object
     */
    submitForm(event) {
        event.preventDefault();

        //clone this object without referencing it to prevent possible conflicts
        var member = _.clone(this.state.member);

        if (this.newTask.title && this.newTask.description && this.state.addStatus) {
            this.newTask.status = this.state.addStatus;
            var tasks = member.tasks.slice();
            var newTask = _.clone(this.newTask);
            tasks = tasks.concat(newTask);
            member.tasks = tasks;

            this.setState({
                member: member,
                addTask: false
            });

            member.index = this.props.index;
            //pass the updated member info to projectDetail component
            this.props.onChangeMember(member);
        }
    }

    // a task object used to temporarily store data comes from the add new task form
    newTask = {
        title: '',
        description: '',
        status: null
    };

    /**
     * update newTask object based on changes sent by addTaskForm
     * @param {Object} event, a onChange event from addTaskForm
     */
    changeForm(event) {
        const field = event.target.name;
        this.newTask[field] = event.target.value;
    }

    /**
     * update status of new task to be added based on user selection in addTaskForm
     * @param {String} val, a String contains the status of the new task
     */
    onSelect(val) {
        //this.newTask.status = val;
        this.setState({
            addStatus: val
        });
    }

    /**
     * update status of one existing task
     * @param {String} status, a String contains the new status of the task
     * @param {Number} taskIndex, an integer shows the index of the task to be modified
     */
    changeStatus(status, taskIndex){
        var member = _.clone(this.state.member);
        member.tasks[taskIndex].status = status;

        this.setState({
            member: member
        });

        this.props.onChangeMember(member);
    }

    /**
     * get a list of <li> elements that compose one task's status options
     * @param {Number} taskIndex, an integer shows the index of the task being rendered
     * @return {Array} return Array of <li> element, which are status options of one task
     */
    getStatusOptions(taskIndex) {
        return CONSTS.STATUS.map(function(status, i){
            return(
                // the index of the task will be added to the <li> element's onClick function
                // we can then update the status of the task accordingly
                <li key={i}><a onClick={(e) => {this.changeStatus(status, taskIndex)}}>{status}</a></li>
            )
        }, this);
    };

    /**
     * return corresponding color for different task status
     * @param {String} status, a String contains the status of the task
     * @return {String} return a String which represents one kind of color
     */
    getStyle(status) {
        var color = '';
        if (status === 'Done') {
            color = 'mediumseagreen';
        } else if (status === 'On Hold') {
            color = 'red';
        } else if (status === 'In Process') {
            color = 'orange';
        } else if (status === 'Schedule') {
            color = 'lightblue';
        } else if (status === 'Sent') {
            color = 'lightgray';
        }
        return color
    }


    /**
     * set the state of {addTask} to toggle between render the add task modal or not
     */
    toggleAddTask() {
        this.setState({
            addTask: !this.state.addTask
        });
    }

    /**
     * close the add task form when user click "X"
     */
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
                // render a list of task cards, each card contains one task
                tasks_list = this.state.member.tasks.map(function(task, i) {
                    return(
                        <div className="task detail" key={uniqueId()} style={{borderLeft: '8px solid ' + this.getStyle(task.status)}}>
                            <h5 className="task-title">{task.title}</h5>
                            <div className="btn-group">
                              <button type="button" id={'button-' + i} className='btn dropdown-toggle status' style={{backgroundColor: this.getStyle(task.status)}} data-toggle="dropdown">
                                  <p>{task.status}  <span className="caret"></span></p>
                              </button>
                              <ul className="dropdown-menu">
                                  /*get status option elements of one task*/
                                  {this.getStatusOptions(i)}
                              </ul>
                            </div>
                            <p className="task-description">{task.description}</p>
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
                        <h4>{this.state.member.name}</h4>
                    </div>
                    <Sortable
                        id={this.props.index}
                        options={{
                            group: 'shared',
                            sort: false,
                        }}
                        tag="div"
                        onChange={(order, sortable, evt) => {
                            this.props.onChange(evt);
                        }}
                        >
                        {tasks_list}
                    </Sortable>

                    <div className="task new-task add-new" onClick={this.toggleAddTask}>
                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                        <h4>Create New Task</h4>
                    </div>
                    {add_task}
                </div>
            )
        } else if (this.props.addNew) {
            return (
                <div className="tasks">
                    <div className="task name add-new" onClick={this.props.onClick}>
                        <h4>Add New Member</h4>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectDetailCard;