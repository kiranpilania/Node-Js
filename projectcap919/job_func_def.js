const fs = require('fs');
const chalk = require('chalk');
const _ = require('lodash');

function welcomeMSG() {
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.yellow("                                                           **Welcome to Job Hunt**\n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("    **---- For searching the job based on jobtype and salary -> enter jobtype and salaryrangefrom you are searching for with searchjob command ----** \n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("    **---- For getting description of any particular company -> enter companyname you are searching for with companyinfo command ----**\n\n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("                                       **---- For getting list of companies -> enter list  command ----**\n\n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("    **---- For searching the job based on job location and designation -> enter joblocation and designation(optional) you are searching for with searchlocation command ----** \n\n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("         **---- To apply for job  -> enter name, email_address and skills to save your data with apply_job command ----**\n\n"));
    console.log(chalk.bold.yellow("               -----------------------------------------------------------------------------------------------------------------               \n"));
    console.log(chalk.bold.blue("         **---- For finding suitable job based on skills -> enter your name with getjobs command ----**\n\n"));

}


//defining the function to store json data
const job_dataNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('job_data.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const personNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('persondata.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
};

const writeNotes = function(notes){
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('persondata.json',dataJSON)}



var getJob = (jobtype, salaryrangefrom) => {
    const job_data = job_dataNotes()

    if (salaryrangefrom) {
        for (let i = 0; i < job_data.length; i++) {
            if (job_data[i].jobtype === jobtype && job_data[i].salary >= salaryrangefrom) {
                console.log(job_data[i].jobtype);
                console.log(job_data[i].designation);
                console.log(job_data[i].companyname);
                console.log(`Salary: ${job_data[i].salary}`);
                console.log('----------------------');
            }
        }
    }
    else {
        for (let i = 0; i < job_data.length; i++) {
            if (job_data[i].jobtype === jobtype) {
                console.log(job_data[i].jobtype);
                console.log(job_data[i].designation);
                console.log(job_data[i].companyname);
                console.log('----------------------');
            }
        }
    }
};



var getDescription = (companyname) => {
    const job_data = job_dataNotes()

    for (let i = 0; i < job_data.length; i++) {

        if (job_data[i].companyname === companyname) {
            console.log(job_data[i].companydescription);
        }
    }
};


var getCompaniesData = () => {
    const dataString = fs.readFileSync('job_data.json');
    const data = JSON.parse(dataString);

    console.log(chalk.inverse('Your titles: '))

    notes.forEach((note) => {
        console.log(note.title);
        console.log('----------------------');
    })
};



var getLocation = (joblocation, designation) => {
    const job_data = job_dataNotes()

    if (designation) {
        for (let i = 0; i < job_data.length; i++) {
            if (job_data[i].joblocation === joblocation && job_data[i].designation === designation ) {
                console.log(job_data[i].jobtype);
                console.log(`Designation: ${job_data[i].designation}`);
                console.log(job_data[i].companyname);
                console.log(job_data[i].salary);
                console.log('----------------------');
            }
        }
    }
    else {
        for (let i = 0; i < job_data.length; i++) {
            if (job_data[i].joblocation === joblocation) {
                console.log(job_data[i].jobtype);
                console.log(job_data[i].designation);
                console.log(job_data[i].companyname);
                console.log(job_data[i].salary);
                console.log('----------------------');
            }
        }
    }
};


var apply_job = (name, email_address, skills ) => {
    const notes = personNotes()
    const duplicateNotes = notes.filter(function(note){
        return note.name === name
    })
    if (duplicateNotes.length === 0){
        notes.push({
            name: name,
            email: email_address,
            skills: skills
        })
        writeNotes(notes)
        console.log('new note added!')
    }
    else{
        console.log('note title taken')
    }

}


var getEmployment = (name) => {

    const notes = personNotes()

    const job_data = job_dataNotes()

    for (let i = 0; i < notes.length; i++) {
        if (notes[i].name === name) {
            const personSkills = notes[i].skills;

            for (let j = 0; j < job_data.length; j++) {
                const requiredSkills = job_data[j].skillsrequired;

                if (personSkills == requiredSkills) {
                    console.log(`Matching job found for ${name}:`);
                    console.log(`Job Type: ${job_data[j].jobtype}`);
                    console.log(`Designation: ${job_data[j].designation}`);
                    console.log(`Company Name: ${job_data[j].companyname}`);
                    console.log(`Salary: ${job_data[j].salary}`);
                    console.log('----------------------');
                    console.log('\n');
                }
            }
        }
    }
};


//apply jobs -> for any particular company -> name email skills and get job on basis of skills
//company description
//skills_required 
//company rating and job location 
//by company names -> all designation
//remove by designation and company name
//company location based companies



module.exports = 
{ 
    welcomeMSG, 
    getJob, 
    getDescription, 
    getEmployment, 
    getCompaniesData, 
    getLocation,
    apply_job
} 