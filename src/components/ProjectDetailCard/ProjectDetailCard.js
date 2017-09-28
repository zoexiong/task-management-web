import './ProjectDetailCard.css';

import React from 'react';

class ProjectDetailCard extends React.Component{

    render() {

        if (this.props.member){

            var tasks_list = <p></p>

            if (this.props.member.tasks){
                tasks_list = this.props.member.tasks.map(function(task, i) {
                    return(
                        //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                        <div className="task" key={i} >
                            <p>{task.title} <span><button>{task.status}</button></span></p>
                            <p>{task.description}</p>
                        </div>
                    );
                });
            }


            return(
                <div className="tasks">
                    <h4 className="card-name">{this.props.member.name}</h4>
                    {tasks_list}
                    <div className="task" >
                        <p>+</p>
                        <p>Create New Task</p>
                    </div>
                </div>
            )
        } else if (this.props.addNew) {
            return (
                <div className="tasks">
                    <div className="task">
                        <p>Add New Member</p>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectDetailCard;