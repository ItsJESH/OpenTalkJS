import ollama from "ollama";
import fs from "fs";
let subDir = process.argv;
getQuestion(subDir);

async function getAnswer(q, question) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{ role: "user", content: question }],
    });
    fs.mkdirSync(`./Answers/${subDir[2]}`, { recursive: true });
    let answer_path = `./Answers/${subDir[2]}/a${q}.txt`;
    fs.writeFileSync(answer_path, response.message.content);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}

function getQuestion(subDir) {
  try {
    let q = Math.floor(Math.random() * 3) + 1;
    let p = `./Questions/${subDir[2]}/q${q}.txt`;
    console.log(p);
    let question = fs.readFileSync(p, "utf-8");
    console.log(question);
    getAnswer(q, question);
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}
