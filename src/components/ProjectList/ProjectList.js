import './ProjectList.css';
import React from 'react';
import AddProjectForm from '../AddProjectForm/AddProjectForm';
import ProjectCard from '../ProjectCard/ProjectCard';
import _ from 'lodash';
import CONSTS from '../../data/tasks';
import ProjectDetail from '../ProjectDetail/ProjectDetail'

class ProjectList extends React.Component{

    /**
     * constructor, set the initial state
     */
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
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    /**
     * get projects data from static JSON file, store it in state
     */
    componentWillMount() {
        const projects = CONSTS.PROJECTS;
        this.setState({
            projects : projects
        })
    }

    /**
     * submit add project form and add new project to the state
     */
    processForm(event) {
        // prevent default action. in this case, action is the form submission event
        event.preventDefault();

        var newProject = _.clone(this.newProject);

        if (newProject.title && newProject.description) {
            // state array should not be mutated directly, so we use clone and slice
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

    // a project object used to temporarily store data comes from the add new project form
    newProject = {
        title: '',
        description: '',
    };

    /**
     * update newProject object based on changes sent by addProjectForm
     * @param {Object} event, a onChange event from addProjectForm
     */
    changeForm(event) {
        const field = event.target.name;
        this.newProject[field] = event.target.value;

    }

    /**
     * update selected members of new project to be added based on user selection in addProjectForm
     * @param {String} val, a String contains the names of selected members, separated by comma
     */
    onSelect(val) {
        this.setState({
            selectedMembers: val
        })
    }

    /**
     * set the state of {addNew} to toggle between render the add new project form or not
     */
    toggleAddForm() {
        this.setState({
            addNew: !this.state.addNew
        });
    }

    /**
     * close the add project form when user click "X"
     */
    onCloseModal() {
        this.setState({
           addNew: false
        });
    }

    /**
     * when user clicks on one project, go to project detail view
     */
    handleCardClick(i, event) {
        this.setState({detailIndex:i});
        this.setState({showDetail:true});
    }

    /**
     * when user clicks "back" button on project view, go back to projects view (main view)
     */
    handleClickBack() {
        this.setState({showDetail: false});
    }


    /**
     * when receive changes caused by user interaction passed from inner components, update the project data stored in state
     */
    projectOnChange(project) {
        // use clone to prevent mutate the state directly
        let projects = _.clone(this.state.projects);
        projects[this.state.detailIndex] = project;

        this.setState({
           projects: projects
        });
    }

    render() {
        // render projects view, project detail view or add new project view according to the state
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
                        onClose = {this.onCloseModal}
                    />
                </div>
            );
        } else if (this.state.showDetail) {
            if (this.state.projects) {
                var project = this.state.projects[this.state.detailIndex];
                return (
                    <div>
                        <button type="button" className="btn btn-primary btn-lg" onClick={(e) => this.handleClickBack(e)}>Back</button>
                        <h3 className="project-title">Project: {project.title}</h3>
                        <ProjectDetail project={project} onChange={this.projectOnChange} />
                    </div>
                )
            }
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




