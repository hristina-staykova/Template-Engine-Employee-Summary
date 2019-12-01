var inquirer = require("inquirer");
var jest = require("jest");
var fs = require("fs");

let questions1 = [
  {
    type: "input",
    name: "name",
    message: "What is your name ?"
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
    name: "role",
    type: "list",
    message: "What is your role?",
    choices: ["Manager", "Engineer", "Intern"]
  }
];

let questionManager = [
  {
    type: "input",
    name: "officeNumber",
    message: "What is your office number?"
  }
];

let questionEngineer = [
  {
    type: "input",
    name: "github",
    message: "What is your GitHub username?"
  }
];

let questionIntern = [
  {
    type: "input",
    name: "school",
    message: "What is your school?"
  }
];

let flag = [
  {
    type: "confirm",
    name: "flag",
    message: "Do you want to add another team member?"
  }
];

let answers;
let manager;
let intern;
let engineer;
let addNewTeamMember = false;

async function questions() {
  answers = await inquirer.prompt(questions1);
  if (answers.role === "Manager") {
    manager = await inquirer.prompt(questionManager);
  }

  if (answers.role === "Engineer") {
    engineer = await inquirer.prompt(questionEngineer);
  }

  if (answers.role === "Intern") {
    intern = await inquirer.prompt(questionIntern);
  }

  let newEntry = await inquirer.prompt(flag);
  addNewTeamMember = newEntry.flag;
}

questions();
