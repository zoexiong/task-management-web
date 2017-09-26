import './ProjectList.css';
import React, {PropTypes} from 'react';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import ProjectCard from '../ProjectCard/ProjectCard';
import _ from 'lodash';
import PROJECTS from '../../data/tasks';
import ProjectDetail from '../ProjectDetail/ProjectDetail'

class ProjectList extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            projects: null,
            addNew: false,
            showDetail: false,
            detailIndex: null
        };

        this.processForm = this.processForm.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.toggleAddForm = this.toggleAddForm.bind(this);
    }

    componentDidMount() {

        const projects = PROJECTS;

        this.setState({
            projects : projects
        })
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        var newProject = _.clone(this.newProject);

        if (newProject.title && newProject.description && newProject.members) {

            // state array should not be mutated directly
            var projects = this.state.projects.slice();
            newProject.id = projects.length + 1;
            projects.push(newProject);

            this.setState({
                projects: projects,
                addNew: !this.state.addNew
            });

        }
    }

    newProject = {
        id: null,
        title: '',
        description: '',
        members: ['A']
    };

    changeForm(event) {
        const field = event.target.name;
        this.newProject[field] = event.target.value;
    }

    toggleAddForm() {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    handleCardClick(i, event) {
        console.log('i' + i);
        this.setState({detailIndex:i});
        this.setState({showDetail:true});
    }

    handleClickBack() {
        this.setState({showDetail: false});
    }

    renderList() {

        let projects_list = this.state.projects.map(function(project, i) {
            return(
                <ProjectCard project={project} key={i} onClick={this.handleCardClick.bind(this, i)} />
            );
        }, this);

        let list =
            <div className='list-group'>
                {projects_list}
                <ProjectCard addNew="true" onClick={this.toggleAddForm}/>
            </div>;

        return (
            <div className="list-container">
                {list}
            </div>
        )
    }

    render() {
        if (this.state.projects) {
            if (this.state.addNew) {
                return(
                    <div>
                        {this.renderList()}
                        <AddProjectForm
                            onSubmit={this.processForm}
                            onChange={this.changeForm}
                        />
                    </div>
                );
            } else if (this.state.showDetail) {
                var project = this.state.projects[this.state.detailIndex];
                return (
                    <div>
                        <button onClick={(e) => this.handleClickBack(e)}>Back</button>
                        <ProjectDetail project={project} />
                    </div>
                )
            } else {
                return(
                    this.renderList()
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




