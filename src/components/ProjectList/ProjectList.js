import './ProjectList.css';
import React from 'react';

import ProjectCard from '../ProjectCard/ProjectCard'

class ProjectList extends React.Component{
    constructor() {
        super();
        this.state = {projects: null};
        // //we used this.loadMoreNews() in this.handleScroll, so we need to bind it in constructor
        // this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {

        var projects = [
            {
                id:1,
                name: "Example",
                detail: "Lorem ipsum",
                member: ['A', 'B', 'C']
            },
            {
                id:2,
                name: "Example",
                detail: "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
                member: ['A', 'B', 'C']
            },
            {
                id:3,
                name: "Example",
                detail: "Lorem ipsum",
                member: ['A', 'B', 'C']
            },
            {
                id:5,
                name: "Example",
                detail: "Lorem ipsum",
                member: ['A', 'B', 'C']
            }
        ];

        this.setState({
            projects : projects
        })
    }

    renderProjects() {
        let projects_list = this.state.projects.map(function(project) {
            return(
                <ProjectCard project={project} href="#" key={project.id} />
            );
        });

        return(
            <div className='list-group'>
                {projects_list}
                <ProjectCard addNew="true" />
            </div>
        );
    }

    render() {



        if (this.state.projects) {
            return(
                <div className="list-container">
                    {this.renderProjects()}
                </div>
            );
        } else {
            return(
                <div className="list-container">
                    <div id='msg-app-loading'>
                        Loading
                    </div>
                    <ProjectCard addNew="true" />
                </div>
            );
        }
    }
}

export default ProjectList;
