//import './ProjectDetailCard.css';

import React from 'react';

class ProjectDetailCard extends React.Component{

    render() {

        if (this.props.member){
            return(
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-name">{this.props.member.name}</h4>
                        <h4 className="card-name">{this.props.member.tasks}</h4>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectDetailCard;