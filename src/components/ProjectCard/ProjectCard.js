import './ProjectCard.css';

import React from 'react';

class ProjectCard extends React.Component{

    render() {

        if (this.props.project){
            return(
                <div className="card" onClick={this.props.onClick}>
                    <h4 className="card-name">{this.props.project.title}</h4>
                    <h6 className="card-detail">{this.props.project.description}</h6>
                    <p className="card-member">Total members: {this.props.project.members.length}</p>
                </div>
            )
        } else if (this.props.addNew){
            return(
                <div className="card" onClick={this.props.onClick}>
                    <h4 className="card-name">+</h4>
                    <h6 className="card-detail">Create New Project</h6>
                    <p className="card-member"></p>
                </div>
            )
        }

    }
}

export default ProjectCard;

