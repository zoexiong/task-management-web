//import './ProjectDetail.css';

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
        this.onChange = this.onChange.bind(this);
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

    onChange(member) {
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


    render() {
        var members_list = <p></p>;
        var selectAddMember = <p></p>;

        if (this.state.project.members){
            members_list = this.state.project.members.map(function(member, i) {
                return(
                    //<ProjectDetailCard member={member} key={i} onChange={this.onChange} index={i} />
                    <ProjectDetailCard
                        member={member}
                        items={member.tasks}
                        key={i}
                        onChange={this.onChange}
                        index={i}
                    />
                );
            }, this);
        }

        if (this.state.addMember) {
            selectAddMember =
                <div>
                    <Select
                        name="select-members"
                        value= {this.state.selectedMembers}
                        options={this.state.options}
                        onChange={(val) => {this.setState({selectedMembers: val})}}
                        simpleValue={true}
                        multi={true}
                    />
                    <button onClick={this.submitAddMember}>Submit</button>
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

