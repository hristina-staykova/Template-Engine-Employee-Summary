var inquirer = require("inquirer");
var jest = require("jest");
var fs = require("fs");

let questions1 = [
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
    name: "role",
    type: "list",
    message: "What is the role of the team member?",
    choices: ["Manager", "Engineer", "Intern"]
  }
];

let questionManager = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is the office number of the team member?"
  }
];

let questionEngineer = [
  {
    type: "input",
    name: "github",
    message: "What is the GitHub username of the team member?"
  }
];

let questionIntern = [
  {
    type: "input",
    name: "school",
    message: "What is the name of the school?"
  }
];

let flag = [
  {
    type: "confirm",
    name: "flag",
    message: "Do you want to add a team member?"
  }
];

let manager;
let intern;
let engineer;
let addNewTeamMember = false;

async function questions() {
  const answers = await inquirer.prompt(questions1);
  if (answers.role === "Manager") {
    manager = await inquirer.prompt(questionManager);
  }

  if (answers.role === "Engineer") {
    engineer = await inquirer.prompt(questionEngineer);
  }

  if (answers.role === "Intern") {
    intern = await inquirer.prompt(questionIntern);
  }
  newTeamMember();
}

async function newTeamMember() {
  const newEntry = await inquirer.prompt(flag);
  if (newEntry.flag === true) {
    questions();
  }
}

newTeamMember();
