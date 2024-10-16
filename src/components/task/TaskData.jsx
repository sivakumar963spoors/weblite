export const cardData = [
    {
        title: 'File Upload Work',
        description: 'You need to do. Team needs to do. No progress past 10 days.',
        isPrivateForm:true,
        isPublicForm:false,
        isForm:true,
        isEmployee:false,
        stats: [
            { label: 'You', value: 0, color: 'green' },
            { label: 'Team', value: 0, color: 'green' },
            { label: 'Issues', value: 1, color: 'red' }
        ],
        additionalItems: ['Item 1', 'Item 2', 'Item 3'],
        resposedata:[
            {
                count:0,
                cardTitle:"filled yestarday",


            },
            {
                count:0,
                cardTitle:"filled today",
                

            },
        ]
    },
    {
        title: 'Notifications Work22',
        description: 'You need to do. Team needs to do. No progress past 10 days.',
        isForm:true,

        isPrivateForm:false,
        isPublicForm:true,
        isEmployee:false,
        stats: [
            { label: 'You', value: 0, color: 'green' },
            { label: 'Team', value: 1, color: 'orange' },
            { label: 'Issues', value: 2, color: 'red' }
        ],
        resposedata:[
            {
                count:0,
                cardTitle:"Pending your manager approvals",


            },
            {
                count:0,
                cardTitle:"Awaiting your approval",
                

            },
            {
                count:0,
                cardTitle:"Awaiting team approval",
                

            },
        ]
    },
    {
        title: 'Customer Location Updation',
        description: 'Pending your manager approvals.',
        isForm:false,
        isEmployee:true,
        isPrivateForm:false,
        isPublicForm:false,
        stats: [
            { label: 'Manager', value: 0, color: 'green' },
            { label: 'Team', value: 0, color: 'green' }
        ]
    },
    {
        title: 'Doc Download',
        description: 'Filled yesterday. Filled today.',
        isForm:false,

          
        isPrivateForm:false,
        isPublicForm:false,
        stats: [
            { label: 'Filled yesterday', value: 0, color: 'red' },
            { label: 'Filled today', value: 0, color: 'red' }
        ]
    }
];
