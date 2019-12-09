var inquirer = require("inquirer");
var fs = require("fs");

//questions for the Manager, asked first
let questionsManager = [
  {
    type: "input",
    name: "name",
    message: "What is your name?"
  },
  {
    type: "input",
    name: "id",
    message: "What is your ID?"
  },
  {
    type: "input",
    name: "email",
    message: "What is your email?"
  },
  {
    type: "input",
    name: "officeNo",
    message: "What is your office number?"
  }
];

//questions about the Engineer team member
let questionEngineer = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the team member?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID of the team member?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of the team member?"
  },
  {
    type: "input",
    name: "github",
    message: "What is the GitHub username of the team member?"
  }
];

//questions about the Intern team member
let questionIntern = [
  {
    type: "input",
    name: "name",
    message: "What is the name of the team member?"
  },
  {
    type: "input",
    name: "id",
    message: "What is the ID of the team member?"
  },
  {
    type: "input",
    name: "email",
    message: "What is the email of the team member?"
  },
  {
    type: "input",
    name: "school",
    message: "What is the name of the school?"
  }
];

//do we want another entry?
let flag = [
  {
    type: "confirm",
    name: "flag",
    message: "Do you want to add a team member?"
  }
];

//which set of questions to be displayed depending on the answer/role here
let role = [
  {
    name: "role",
    type: "list",
    message: "What is the role of the team member that you would like to add?",
    choices: ["Engineer", "Intern"]
  }
];

//to save the answers for the team members
let manager = [];
let intern = [];
let engineer = [];

//main function
async function questions() {
  const answersManager = await inquirer.prompt(questionsManager);
  manager.push(answersManager);

  //we keep asking for a new member entry until "No"
  while (true) {
    const addNewTeamMember = await inquirer.prompt(flag);
    if (addNewTeamMember.flag === false) {
      break;
    } else {
      let newTeamMember = await inquirer.prompt(role);
      if (newTeamMember.role === "Engineer") {
        answersEngineer = await inquirer.prompt(questionEngineer);
        engineer.push(answersEngineer);
      } else if (newTeamMember.role === "Intern") {
        answersIntern = await inquirer.prompt(questionIntern);
        intern.push(answersIntern);
      }
    }
  }
  console.log(manager, engineer, intern);
}

questions();
