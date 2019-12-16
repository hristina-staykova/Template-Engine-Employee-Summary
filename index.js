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
let managers = [];
let interns = [];
let engineers = [];

//save the team information in a new html file
function saveTeamRoster(staticHTML) {
  fs.writeFileSync("output/teamroster.html", staticHTML);
}

//generate the html from the user answers
function generateHTML(managers, engineers, interns) {
  var managerHTML = "";
  var engineerHTML = "";
  var internHTML = "";

  managers.forEach(manager => {
    managerHTML += `<div class="col-4 pb-4">
    <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title" id="managerName">${manager.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Manager</h6>
            </div>
            <ul class="list-group list-group-flush">
                    <li class="list-group-item id"><i class="fas fa-id-card-alt"></i>
                    ${manager.id}</li>
                    <li class="list-group-item email"><i class="fas fa-at"></i>
                    ${manager.email}</li>
                    <li class="list-group-item" id="office"><i class="fas fa-building"></i>
                    ${manager.officeNo}</li>
            </ul>
    </div>
  </div>`;
  });

  engineers.forEach(engineer => {
    engineerHTML += `<div class="col-4 pb-4">
    <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title" id="engineerName">${engineer.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Engineer</h6>
            </div>
            <ul class="list-group list-group-flush">
                    <li class="list-group-item id"><i class="fas fa-id-card-alt"></i>
                    ${engineer.id}</li>
                    <li class="list-group-item email"><i class="fas fa-at"></i>
                     ${engineer.email}</li>
                    <li class="list-group-item" id="github"><i class="fab fa-github"></i>
                    ${engineer.github}</li>
            </ul>
    </div>
  </div>`;
  });

  interns.forEach(intern => {
    internHTML += `<div class="col-4 pb-4">
    <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title" id="internName">${intern.name}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Intern</h6>
            </div>
            <ul class="list-group list-group-flush">
                    <li class="list-group-item id"><i class="fas fa-id-card-alt"></i>
                    ${intern.id}</li>
                    <li class="list-group-item email"><i class="fas fa-at"></i>
                    ${intern.email}</li>
                    <li class="list-group-item" id="school"><i class="fas fa-graduation-cap"></i>
                    School: ${intern.school}</li>
            </ul>
    </div>
  </div>`;
  });

  //read main.html template file and replace the placeholders with the information from answers
  fs.readFile("templates/main.html", "utf8", function(err, staticHTML) {
    if (err) {
      throw err;
    }
    staticHTML = staticHTML.replace(
      "###___MANAGERS_PLACEHOLDER___###",
      managerHTML
    );
    staticHTML = staticHTML.replace(
      "###___ENGINEERS_PLACEHOLDER___###",
      engineerHTML
    );
    staticHTML = staticHTML.replace(
      "###___INTERNS_PLACEHOLDER___###",
      internHTML
    );
    saveTeamRoster(staticHTML);
  });
}

//main function
async function questions() {
  const answersManager = await inquirer.prompt(questionsManager);
  managers.push(answersManager);

  //we keep asking for a new member entry until "No"
  let addNewTeamMember;
  let checkFlag = true;
  while (checkFlag) {
    addNewTeamMember = await inquirer.prompt(flag);
    if (!addNewTeamMember.flag) {
      checkFlag = false;
    } else {
      let newTeamMember = await inquirer.prompt(role);
      if (newTeamMember.role === "Engineer") {
        answersEngineer = await inquirer.prompt(questionEngineer);
        engineers.push(answersEngineer);
      } else if (newTeamMember.role === "Intern") {
        answersIntern = await inquirer.prompt(questionIntern);
        interns.push(answersIntern);
      }
    }
  }
  generateHTML(managers, engineers, interns);
}

questions();
