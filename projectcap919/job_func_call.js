const fs = require('fs');
const yargs = require('yargs');
const data = require('./job_func_def.js');

yargs.command({
    command: 'start',
    describe: 'Start Job searching app',
    builder:
    {},

    handler:
    function()
    {
        data.welcomeMSG();
    } 
})

yargs.command({
    command: 'searchjob',
    describe: 'Start searching for job',
    builder:
    {
        jobtype:
        {
            describe:'Job related to which sector',
            demandOption: true,
            type: 'string'
        },
        salaryrangefrom:
        {
            describe:'Lower limit of salary',
            demandOption: false,
            type: 'number'
        }
    },

    handler:
    function(argv)
    {
        data.getJob(argv.jobtype, argv.salaryrangefrom);
    }
})

yargs.command({
    command: 'companyinfo',
    describe: 'Information of the company',
    builder:
    {
        companyname:
        {
            describe:'Name of the company',
            demandOption: true,
            type: 'string'
        }
    },

    handler:
    function(argv)
    {
        data.getDescription(argv.companyname);
    }
})


yargs.command({
    command: 'getjobs',
    describe: 'Search on basis of skills',
    builder:
    {
        name:
        {
            describe:'Your name',
            demandOption: true,
            type: 'string'
        }
    },

    handler:
    function(argv)
    {
        data.getEmployment(argv.name);
    }
})

yargs.command({
    command: 'list',
    describe: 'list your note',
    handler(){
        data.getCompaniesData()
    }
})


yargs.command({
    command: 'searchlocation',
    describe: 'Start searching for job based on location ',
    builder:
    {
        joblocation:
        {
            describe:'Job related to location',
            demandOption: true,
            type: 'string'
        },
        designation:
        {
            describe:'Job related to designation',
            demandOption: false,
            type: 'string'
        },
    },

    handler:
    function(argv)
    {
        data.getLocation(argv.joblocation);
    }
})


yargs.command({
    command: 'apply_job',
    describe: 'Start searching for job based on location ',
    builder:
    {
        name:
        {
            describe:'name of the person',
            demandOption: true,
            type: 'string'
        },
        email_address:
        {
            describe:'email of the person',
            demandOption: true,
            type: 'string'
        },
        skills:
        {
            describe:'skills aquired of the person',
            demandOption: true,
            type: 'string'
        }
    },

    handler:
    function(argv)
    {
        data.apply_job(argv.name, argv.email_address, argv.skills);
    }
})

yargs.parse();