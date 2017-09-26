//import './ProjectDetail.css';

import React from 'react';

class ProjectDetail extends React.Component{

    render() {

        if (this.props.project){
            return(
                <div className="card">
                    <div className="card-body">
                        <h4 className="card-name">{this.props.project.title}</h4>
                        <h6 className="card-detail">{this.props.project.description}</h6>
                        <p className="card-member">{this.props.project.members}</p>
                    </div>
                </div>
            )
        }

    }
}

export default ProjectDetail;
