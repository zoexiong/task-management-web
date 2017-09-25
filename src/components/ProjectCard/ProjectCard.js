import './ProjectCard.css';

import React from 'react';

class ProjectCard extends React.Component{

    render() {

        if (this.props.project){
            return(
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-name">{this.props.project.name}</h4>
                        <h6 className="card-detail">{this.props.project.detail}</h6>
                        <p className="card-member">{this.props.project.member}</p>
                    </div>
                </div>
            )
        } else if (this.props.addNew){
            return(
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-name">+</h4>
                        <h6 className="card-detail">Create New Project</h6>
                        <p className="card-member"></p>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectCard;
