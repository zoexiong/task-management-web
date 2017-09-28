//import './ProjectDetail.css';

import React from 'react';

import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';

class ProjectDetail extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            project: null,
        };

        // this.processForm = this.processForm.bind(this);
        // this.changeForm = this.changeForm.bind(this);
        // this.toggleAddForm = this.toggleAddForm.bind(this);
    }

    componentWillMount() {
        let project = this.props.project;
        this.setState({
            project : project
        })
    }

    render() {

        if (this.state.project.members){

            let members_list = this.state.project.members.map(function(member, i) {
                return(
                    //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                    <ProjectDetailCard member={member} key={i} />
                );
            });

            return(
                <div>
                    {members_list}
                    <ProjectDetailCard addNew="true" />
                </div>
            );
        } else {
            return (
                <ProjectDetailCard addNew="true" />
            )
        }

    }
}

export default ProjectDetail;

