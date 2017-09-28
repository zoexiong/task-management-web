import './ProjectDetailCard.css';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

import React from 'react';
import _ from 'lodash';

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
            this.props.onChange(member);
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

    render() {

        if (this.state.member){
            var tasks_list = <p></p>;
            var add_task = <p></p>;

            if (this.state.member.tasks){
                tasks_list = this.state.member.tasks.map(function(task, i) {
                    return(
                        //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                        <div className="task" key={i} >
                            <p>{task.title} <span><button>{task.status}</button></span></p>
                            <p>{task.description}</p>
                        </div>
                    );
                });
            }

            if (this.state.addTask) {
                add_task = <AddTaskForm
                    onSubmit = {this.submitForm}
                    onChange = {this.changeForm}
                    onSelect = {this.onSelect}
                />
            }
            return(
                <div className="tasks">
                    <h4 className="card-name">{this.props.member.name}</h4>
                    {tasks_list}
                    <div className="task" onClick={this.toggleAddTask}>
                        <p>+</p>
                        <p>Create New Task</p>
                    </div>
                    {add_task}
                </div>
            )
        } else if (this.props.addNew) {
            return (
                <div className="tasks">
                    <div className="task" onClick={this.props.onClick}>
                        <p>Add New Member</p>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectDetailCard;