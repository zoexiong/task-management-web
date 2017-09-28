const PROJECTS = [
    {
        id:1,
        title: "Example",
        description: "Lorem ipsum",
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
                name: 'Robert Martinez',
                tasks: [
                    {
                        title: 'Lorem ipsum',
                        description: 'Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'Done'
                    },
                    {
                        title: 'Lorem2 ipsum',
                        description: 'Lorem2 ipsumLorem ipsumLorem ipsumLorem ipsumLorem ',
                        status: 'In Process'
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
        id:2,
        title: "Example",
        description: "Lorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsumLorem ipsum",
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
        title: "Empty",
        description: "Lorem ipsum",
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

module.exports = {
    PROJECTS: PROJECTS,
    MEMBERS: MEMBERS,
    STATUS: STATUS,
    OPTIONS: OPTIONS
};