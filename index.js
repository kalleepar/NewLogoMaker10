// Inquirer import
const inquirer = require("inquirer");

// File system module import
const fs = require("fs");

// Importing classes from ./lib/shapes
const { Triangle, Square, Circle } = require("./lib/shapes");


function writeToFile(fileName, answers) {
 
  let svgString = "";
 
  svgString =
    '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
 
  svgString += "<g>";

  svgString += `${answers.shape}`;

  
  let shapeChoice;
  if (answers.shape === "Triangle") {
    shapeChoice = new Triangle();
    svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeBackgroundColor}"/>`;

  } else if (answers.shape === "Square") {
    shapeChoice = new Square();

    svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeBackgroundColor}"/>`;

  } else {
    shapeChoice = new Circle();

    svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeBackgroundColor}"/>`;
  }

  
  svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.text}</text>`;
  
  svgString += "</svg>";

  svgString += "</g>";
 
 

  
  fs.writeFile(fileName, svgString, (err) => {
    err ? console.log(err) : console.log("Generated logo.svg");
  });
}



// Questions
function promptUser() {
  inquirer
    .prompt([
      // Text 
      {
        type: "input",
        message:
          "Enter three characters of text.",
        name: "text",
      },
      // Text color 
      {
        type: "input",
        message:
          "Choose the color of your text.",
        name: "textColor",
      },
      // Shape 
      {
        type: "list",
        message: "Choose a shape.",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
      },
      // Shape color 
      {
        type: "input",
        message:
          "Choose the color of your shape.",
        name: "shapeBackgroundColor",
      },
    ])
    .then((answers) => {
     
      if (answers.text.length > 3) {
        console.log("Please use three characters");
        promptUser();
      } else {
        
        writeToFile("logo.svg", answers);
      }
    });
}

// Calling promptUser function
promptUser();