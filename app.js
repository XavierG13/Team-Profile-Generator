const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// this section will hold the members created after user inputs their info/choice
let teamMembers = [];

// below are the arrays for adding members and the individual questionnaires for each role
const moreMembers = [
  {
    type: "list",
    message: "Would you like to add more team members?",
    name: "addMore",
    choices: ["Intern", "Engineer", "Finished with my team!"],
  },
];

const managerQuestions = [
  {
    type: "input",
    message: "What is manager's name?",
    name: "managerName",
  },
  {
    type: "input",
    message: "What is manager's id",
    name: "managerID",
  },
  {
    type: "input",
    message: "What is manager's email address?",
    name: "managerEmail",
  },
  {
    type: "input",
    message: "What is manager's office number?",
    name: "managerNumber",
  },
];

const engineerQuestions = [
  {
    type: "input",
    name: "engineerName",
    message: "What is your engineer's name?",
  },
  {
    type: "input",
    name: "engineerID",
    message: "What is your engineer's id?",
  },
  {
    type: "input",
    name: "engineerEmail",
    message: "What is your engineer's email?",
  },
  {
    type: "input",
    name: "engineerGitHub",
    message: "What is your engineer's GitHub username?",
  },
];

const internQuestions = [
  {
    type: "input",
    name: "internName",
    message: "What is your intern's name?",
  },
  {
    type: "input",
    name: "internID",
    message: "What is your intern's id?",
  },
  {
    type: "input",
    name: "internEmail",
    message: "What is your intern's email?",
  },
  {
    type: "input",
    name: "internSchool",
    message: "What is your intern's school?",
  },
];

//will ask user to add manager role, then choose a role they wish to add after manager has submitted their info, if Finish team is chosen app will render what has been given, if user wishes to add more members the user needs to continue selecting until they are ready to create team.
function createManager() {
  inquirer.prompt(managerQuestions).then((managerBio) => {
    const managerInfo = new Manager(
      managerBio.managerName,
      managerBio.managerID,
      managerBio.managerEmail,
      managerBio.managerNumber
    );
    teamMembers.push(managerInfo);
    addMoreMembers();
  });

  function addMoreMembers() {
    inquirer.prompt(moreMembers).then((memberRole) => {
      switch (memberRole.addMore) {
        case "Engineer":
          createEngineer();
          break;

        case "Intern":
          createIntern();
          break;

        case "Finished with my team!":
          console.log(teamMembers);
          console.log("Your team is ready!");
          createHTML();
          break;
      }
    });
  }

  //will initiate intern prompt and create intern for use in teamMember array
  function createIntern() {
    inquirer.prompt(internQuestions).then((internBio) => {
      const internInfo = new Intern(
        internBio.internName,
        internBio.internID,
        internBio.internEmail,
        internBio.internSchool
      );
      teamMembers.push(internInfo);
      addMoreMembers();
    });
  }

  //will initiate engineer prompt and create engineer for use in teamMember array
  function createEngineer() {
    inquirer.prompt(engineerQuestions).then((engineerBio) => {
      const engineerInfo = new Engineer(
        engineerBio.engineerName,
        engineerBio.engineerID,
        engineerBio.engineerEmail,
        engineerBio.engineerGitHub
      );
      teamMembers.push(engineerInfo);
      addMoreMembers();
    });
  }

  function createHTML() {
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }
}

createManager();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
