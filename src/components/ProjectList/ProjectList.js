import './ProjectList.css';
import React, {PropTypes} from 'react';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import ProjectCard from '../ProjectCard/ProjectCard';
import _ from 'lodash';
import CONSTS from '../../data/tasks';
import ProjectDetail from '../ProjectDetail/ProjectDetail'

class ProjectList extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            projects: null,
            addNew: false,
            showDetail: false,
            detailIndex: null,
            selectedMembers: null
        };

        this.processForm = this.processForm.bind(this);
        this.changeForm = this.changeForm.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.toggleAddForm = this.toggleAddForm.bind(this);
        this.projectOnChange = this.projectOnChange.bind(this);
    }

    componentWillMount() {

        const projects = CONSTS.PROJECTS;

        this.setState({
            projects : projects
        })
    }

    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        var newProject = _.clone(this.newProject);

        if (newProject.title && newProject.description) {

            // state array should not be mutated directly
            var projects = this.state.projects.slice();
            newProject.id = projects.length + 1;
            newProject.members = this.state.selectedMembers.split(',').map(function(name) {
                return(
                    {name: name, tasks: []}
                );
            });
            projects.push(newProject);

            this.setState({
                projects: projects,
                addNew: !this.state.addNew,
                selectedMembers: []
            });
        }
    }

    newProject = {
        title: '',
        description: '',
    };

    changeForm(event) {
        const field = event.target.name;
        this.newProject[field] = event.target.value;
    }

    onSelect(val) {
        this.setState({
            selectedMembers: val
        })
    }

    toggleAddForm() {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    handleCardClick(i, event) {
        this.setState({detailIndex:i});
        this.setState({showDetail:true});
    }

    handleClickBack() {
        this.setState({showDetail: false});
    }

    projectOnChange(project) {
        let projects = _.clone(this.state.projects);
        projects[this.state.detailIndex] = project;

        this.setState({
           projects: projects
        });
    }

    render() {
        var projects_list = <ProjectCard addNew="true" onClick={this.toggleAddForm}/>;
        if (this.state.projects) {
            projects_list = this.state.projects.map(function (project, i) {
                return (
                    <ProjectCard project={project} key={i} onClick={this.handleCardClick.bind(this, i)}/>
                );
            }, this);
        }

        if (this.state.addNew) {
            return(
                <div className='list-group'>
                    {projects_list}
                    <ProjectCard addNew="true" onClick={this.toggleAddForm}/>
                    <AddProjectForm
                        onSubmit = {this.processForm}
                        onChange = {this.changeForm}
                        onSelect = {this.onSelect}
                    />
                </div>
            );
        } else if (this.state.showDetail) {
            var project = this.state.projects[this.state.detailIndex];
            return (
                <div>
                    <button onClick={(e) => this.handleClickBack(e)}>Back</button>
                    <ProjectDetail project={project} onChange={this.projectOnChange} />
                </div>
            )
        } else {
            return(
                <div className='list-group'>
                    {projects_list}
                    <ProjectCard addNew="true" onClick={this.toggleAddForm}/>
                </div>
            );
        }
    }
}

export default ProjectList;




