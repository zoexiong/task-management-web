import './ProjectList.css';
import React, {PropTypes} from 'react';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import ProjectCard from '../ProjectCard/ProjectCard'

class ProjectList extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            projects: null,
            newProject: {
                id: 6,
                title: '',
                description: '',
                members: ['A']
            },
            addNew: false
        };

        this.processForm = this.processForm.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.toggleAddForm = this.toggleAddForm.bind(this);
    }

    componentDidMount() {

        var projects = [
            {
                id:1,
                title: "Example",
                description: "Lorem ipsum",
                members: ['A', 'B', 'C']
            },
            {
                id:2,
                title: "Example",
                description: "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
                members: ['A', 'B', 'C']
            },
            // {
            //     id:3,
            //     title: "Example",
            //     description: "Lorem ipsum",
            //     members: ['A', 'B', 'C']
            // },
            // {
            //     id:5,
            //     title: "Example",
            //     description: "Lorem ipsum",
            //     members: ['A', 'B', 'C']
            // }
        ];

        this.setState({
            projects : projects
        })
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();
        let newProject = this.state.newProject;

        if (newProject.title && newProject.description && newProject.members) {
            var projects = this.state.projects;
            projects.push(newProject);

            this.setState({
                projects : projects
            });
        }
    }

    changeForm(event) {
        const field = event.target.name;
        const newProject = this.state.newProject;
        newProject[field] = event.target.value;

        this.setState({
            newProject
        });
    }

    toggleAddForm() {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    render() {

        if (this.state.projects) {

            let projects_list = this.state.projects.map(function(project) {
                return(
                    <ProjectCard project={project} href="#" key={project.id} />
                );
            });

            let list =
                <div className='list-group'>
                    {projects_list}
                    <ProjectCard addNew="true" onClick={this.toggleAddForm}/>
                </div>;

            if (this.state.addNew) {
                return(
                    <div>
                        <div className="list-container">
                            {list}
                        </div>
                        <AddProjectForm
                            onSubmit={this.processForm}
                            onChange={this.changeForm}
                        />
                    </div>
                );
            } else {
                return(
                    <div className="list-container">
                        {list}
                    </div>
                );
            }

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




