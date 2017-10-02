const PROJECTS = [
    {
        id:1,
        title: "Paid",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
        members: [
            {
                name: 'Lori Lane',
                tasks:[
                    {
                        title: 'Publishing View',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
                        status: 'Done'
                    },
                    {
                        title: 'Icon Creation',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ',
                        status: 'In Process'
                    },
                    {
                        title: 'Debug View',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                        status: 'On Hold'
                    }]
            },
            {
                name: 'Robert Martinez',
                tasks: [
                    {
                        title: 'Lorem ipsum',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                        status: 'Done'
                    },
                    {
                        title: 'Lorem2 ipsum',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                        status: 'In Process'
                    }]
            },
            {
                name: 'Jennifer Lynch',
                tasks:[
                    {
                        title: 'Lorem2 ipsum',
                        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
                        status: 'In Process'
                    }]
            }]
    },
    {
        id:2,
        title: "Core",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ",
        members: [
            {
                name: 'Lori Lane',
                tasks:[
                    {
                        title: 'Lorem ipsum',
                        description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'Done'
                    },
                    {
                        title: 'Lorem2 ipsum',
                        description: 'Lorem2 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'In Process'
                    },
                    {
                        title: 'Lorem3 ipsum',
                        description: 'Lorem3 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'On Hold'
                    }]
            },
            {
                name: 'Jennifer Lynch',
                tasks:[
                    {
                        title: 'Lorem2 ipsum',
                        description: 'Lorem2 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'In Process'
                    }]
            }]
    },
    {
        id:3,
        title: "Publishing",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
        members: []
    },
    // {
    //     id:4,
    //     title: "Example",
    //     description: "Lorem ipsum",
    //     members: [
    //         {
    //             name: 'Lori Lane',
    //             tasks:[
    //                 {
    //                     title: 'Lorem ipsum',
    //                     description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
    //                     status: 'Done'
    //                 },
    //                 {
    //                     title: 'Lorem2 ipsum',
    //                     description: 'Lorem2 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
    //                     status: 'In Process'
    //                 },
    //                 {
    //                     title: 'Lorem3 ipsum',
    //                     description: 'Lorem3 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
    //                     status: 'On Hold'
    //                 }]
    //         },
    //         {
    //             name: 'Robert Martinez',
    //             tasks: [
    //                 {
    //                     title: 'Lorem ipsum',
    //                     description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
    //                     status: 'Done'
    //                 },
    //                 {
    //                     title: 'Lorem2 ipsum',
    //                     description: 'Lorem2 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
    //                     status: 'In Process'
    //                 }]
    //         }]
    // }
];

const MEMBERS = ['Lori Lane', 'Robert Martinez', 'Jennifer Lynch', 'Emily Howard', 'Jonathan Murphy', 'Ronald McCoy', 'Daniel Carter', 'Lauren Scott', 'Thomas Pena'];

const STATUS = ['Done', 'On Hold', 'In Process', 'Schedule', 'Sent'];

const OPTIONS = MEMBERS.map(function(name) {
    return(
    {value: name, label: name}
    );
});

const STATUS_OPTIONS = STATUS.map(function(status) {
    return(
    {value: status, label: status}
    );
});

module.exports = {
    PROJECTS: PROJECTS,
    MEMBERS: MEMBERS,
    STATUS: STATUS,
    OPTIONS: OPTIONS,
    STATUS_OPTIONS: STATUS_OPTIONS
};