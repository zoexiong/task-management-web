import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CONSTS from '../../data/tasks';

import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';

class ProjectDetail extends React.Component{

    /**
     * constructor, set the initial state
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            // project object: the data source of this component
            project: null,
            addMember: false,
            selectedMembers: [],
            //options of current selectable members (members who are not added to this project)
            options: [],
        };

        this.filterOptions = this.filterOptions.bind(this);
        this.submitAddMember = this.submitAddMember.bind(this);
        this.toggleAddMember = this.toggleAddMember.bind(this);
        this.onChangeMember = this.onChangeMember.bind(this);
        this.onDnd = this.onDnd.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    /**
     * before component mount, store data come from this.props into this.state
     * and then use data from this.state instead of from this.props for easy re-render
     */
    componentWillMount() {
        let project = this.props.project;
        //get the right form of name options for react-select
        let options = CONSTS.OPTIONS;
        var members = project.members;
        //exclude team members already in the project from the add new member options (one person can only be added once)
        this.filterOptions(members.map(function(member){return(member.name)}), options);

        this.setState({
            project: project
        })
    }

    /**
     * Exclude team members already in the project from the add new member options
     * @param {Array} members, array of member object
     * @param {Array} options, array of option object
     */
    filterOptions(members, options) {
        options = options.slice();
        var filteredOptions = options.filter(function(option) {
            return members.indexOf(option.value) < 0;
                });
        this.setState({
            options: filteredOptions
        });
    }

    /**
     * set the state of {addMember} to toggle between render the add member modal or not
     */
    toggleAddMember() {
        this.setState({
            addMember: !this.state.addMember
        });
    }

    /**
     * submit add member form and add new member to the project
     */
    submitAddMember() {
        if (this.state.selectedMembers) {
            let members = this.state.selectedMembers.split(',').map(function(name) {
                return(
                {name: name, tasks: []}
                );
            });
            //concat new selected members to the members list stored in state
            members = this.state.project.members.concat(members);

            let project = _.clone(this.state.project);
            project.members = members;

            //update the project data stored in state
            this.setState({
                project: project
            });

            //pass the updated project info to main view(project list view)
            this.props.onChange(project);

            //filter out people added to the project from the "add new member" options
            this.filterOptions(this.state.selectedMembers.split(','), this.state.options);
        }

        //close add member modal
        this.setState({
            selectedMembers: [],
            addMember: false
        });
    }

    /**
     * update project info when receive any changed member info from inner components
     * pass the updated info to main view
     * @param {Object} member, a member object (see data/tasks.js for more info)
     */
    onChangeMember(member) {
        let project = _.clone(this.state.project);
        let index = member.index;
        delete member.index;
        project.members[index] = member;

        this.setState({
            project: project
        });

        //update the info and pass it to main view
        this.props.onChange(project);
    }

    i = 0;

    /**
     * update the project info according to drag and drop event
     * @param {Object} event, a drag and drop event
     */
    onDnd(event) {
        // we use i to count and then filter useless drag and drop event since every drag and drop action will trigger two duplicate dnd events.
        this.i = this.i + 1;
        if (this.i === 2) {
            // get details from drag and drop event like from which element, to which element, old index, new index
            let from = parseInt(event.from.id, 10);
            let oldIndex = event.oldIndex;
            let to = parseInt(event.to.id, 10);
            let newIndex = event.newIndex;
            let project = _.clone(this.state.project);
            var insertTask = _.clone(project.members[from].tasks[oldIndex]);
            var tasks = project.members[to].tasks.slice();
            tasks.splice(newIndex, 0, insertTask);
            project.members[to].tasks = tasks;
            project.members[from].tasks.splice(oldIndex, 1);

            this.i = 0;

            // update the info and pass it to main view
            this.props.onChange(project);
        }
    }

    onCloseModal() {
        this.setState({
            addMember: false
        });
    }

    render() {
        var members_list = <p></p>;
        var selectAddMember = <p></p>;

        // render a list of projectDetailCards to present info of every member
        if (this.state.project.members){
            members_list = this.state.project.members.map(function(member, i) {
                return(
                    //<ProjectDetailCard member={member} key={i} onChange={this.onChange} index={i} />
                    <ProjectDetailCard
                        member={member}
                        items={this.state.project.members[i].tasks}
                        key={i}
                        onChangeMember={this.onChangeMember}
                        onChange={(evt) => {
                            console.log(evt);
                            this.onDnd(evt);
                        }}
                        index={i}
                    />
                );
            }, this);
        }

        // render a add new member card
        if (this.state.addMember) {
            selectAddMember =
                <div className="modal">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" onClick={this.onCloseModal}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 className="modal-title">Select New Member</h4>
                            </div>
                            <div className="modal-body">
                                <Select
                                    name="select-members"
                                    value= {this.state.selectedMembers}
                                    options={this.state.options}
                                    onChange={(val) => {this.setState({selectedMembers: val})}}
                                    simpleValue={true}
                                    multi={true}
                                />
                                <button className="btn-primary btn" onClick={this.submitAddMember}>Submit</button>
                            </div>
                        </div>
                    </div>
                </div>
        }

        return (
            <div>
                {members_list}
                <ProjectDetailCard addNew="true" onClick={this.toggleAddMember}/>
                {selectAddMember}
            </div>
        )
    }
}

export default ProjectDetail;

