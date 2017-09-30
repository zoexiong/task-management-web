import './ProjectDetail.css';

import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CONSTS from '../../data/tasks';

import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';


import ReactDOM from 'react-dom';


class ProjectDetail extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            project: null,
            addMember: false,
            selectedMembers: [],
            options: [],
        };

        //this.handleClick = this.handleClick.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
        this.submitAddMember = this.submitAddMember.bind(this);
        this.toggleAddMember = this.toggleAddMember.bind(this);
        this.onChangeMember = this.onChangeMember.bind(this);
        this.onDnd = this.onDnd.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }

    componentWillMount() {
        let project = this.props.project;
        let options = CONSTS.OPTIONS;
        var members = project.members;
        this.filterOptions(members.map(function(member){return(member.name)}), options);
        this.setState({
            project: project
        })
    }

    //exclude team members already in the project from the add new member options
    //members: array of String, contains name of team members
    filterOptions(members, options) {
        var options = options.slice();
        var filteredOptions = options.filter(function(option) {
            return members.indexOf(option.value) < 0;
                });
        this.setState({
            options: filteredOptions
        });
    }

    toggleAddMember() {
        this.setState({
            addMember: !this.state.addMember
        });
    }

    submitAddMember() {
        if (this.state.selectedMembers) {
            let members = this.state.selectedMembers.split(',').map(function(name) {
                return(
                {name: name, tasks: []}
                );
            });
            members = this.state.project.members.concat(members);

            let project = _.clone(this.state.project);
            project.members = members;

            this.setState({
                project: project
            });

            //update the info and pass it to main view
            this.props.onChange(project);

            //filter out people added to the project from the "add new member" options
            this.filterOptions(this.state.selectedMembers.split(','), this.state.options);
        }


        this.setState({
            selectedMembers: [],
            addMember: false
        });
    }

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

    onDnd(event) {
        this.i = this.i + 1;
        if (this.i == 2) {
            let from = parseInt(event.from.id);
            let oldIndex = event.oldIndex;
            let to = parseInt(event.to.id);
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

