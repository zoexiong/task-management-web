//import './ProjectDetail.css';

import React from 'react';

import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';

class ProjectDetail extends React.Component{

    constructor(props) {
        super(props);
    }

    render() {

        //if (this.props.project){

            let members_list = this.props.project.members.map(function(member, i) {
                return(
                    //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                    <ProjectDetailCard member={member} key={i} />
                );
            });

            return(
                <div>
                    {members_list}
                </div>
            )
        //}

    }
}

export default ProjectDetail;

