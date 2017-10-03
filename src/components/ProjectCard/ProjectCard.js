import './ProjectCard.css';

import React from 'react';

class ProjectCard extends React.Component{

    render() {

        // if this card will be used to show a project, render this
        if (this.props.project){
            return(
                <div className="card" onClick={this.props.onClick}>
                    <h4 className="card-name">{this.props.project.title}</h4>
                    <p className="card-detail">{this.props.project.description}</p>
                    <p className="card-member">Total members: {this.props.project.members.length}</p>
                </div>
            )
        } else if (this.props.addNew){
            // if this card will be used to show a add new project card, render this
            return(
                <div className="card add-new card-new" data-toggle="modal" onClick={this.props.onClick}>
                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                    <h4>Create New Project</h4>
                </div>
            )
        }

    }
}

export default ProjectCard;

