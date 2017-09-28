//import './ProjectDetail.css';

import React from 'react';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CONSTS from '../../data/tasks';

import ProjectDetailCard from '../ProjectDetailCard/ProjectDetailCard';

class ProjectDetail extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state = {
            project: null,
            addMember: false,
            selectedMembers: [],
            options: []
        };

        //this.processForm = this.processForm.bind(this);
        this.filterOptions = this.filterOptions.bind(this);
        this.submitAddMember = this.submitAddMember.bind(this);
        this.toggleAddMember = this.toggleAddMember.bind(this);
    }

    componentWillMount() {
        let project = this.props.project;
        let options = CONSTS.OPTIONS;
        var members = project.members;
        members = members.map(function(member){
            return(
                member.name
            )
        });

        this.filterOptions(members, options);

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
            members = members.concat(this.state.project.members);

            let project = _.clone(this.state.project);
            project.members = members;

            this.setState({
                project: project
            });

            console.log(this.state.selectedMembers);

            //filter out peope added to the project from the "add new member" options
            this.filterOptions(this.state.selectedMembers.split(','), this.state.options);

            console.dir(this.state.options);
        }

        this.setState({
            selectedMembers: [],
            addMember: false
        });
    }

    render() {
        var members_list = <p></p>;
        var selectAddMember = <p></p>;

        if (this.state.project.members){
            members_list = this.state.project.members.map(function(member, i) {
                return(
                    //<ProjectDetailCard member={member} key={i} onClick={this.handleCardClick.bind(this, i)} />
                    <ProjectDetailCard member={member} key={i} />
                );
            });
        }

        if (this.state.addMember) {
            selectAddMember =
                <div>
                    <Select
                        name="select-members"
                        value= {this.state.selectedMembers}
                        options={this.state.options}
                        onChange={(val) => {this.setState({selectedMembers: val}); console.log(this.state.selectedMembers)}}
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

