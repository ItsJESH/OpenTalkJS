import fs from 'fs';
import ollama from 'ollama';

let folder = 'Questions';

async function runChat(question) {
  try {
    const response = await ollama.chat({
      model: "llama3.2:1b",
      messages: [{ role: 'user', content: question }]
    });

    return response.message.content;
  } catch (error) {
    console.error("Error occurred:", error.message);
  }
}


fs.readdir(folder, (err, files) => {
  if (err) {
    return console.error('Error reading directory:', err.message);
  }

  files.forEach((file) => {
    const filepath = `${folder}/${file}`;
    fs.readFile(filepath, 'utf8', async (err, question) => {
      if (err) {
        return console.error(`Error reading file ${file}:`, err.message);
      }
      let ans_file = file
      const response = await runChat(question);
      fs.mkdirSync('Answers', { recursive: true })
      let answer_path = `Answers/${ans_file.replace('Q','A')}`
      fs.appendFileSync(answer_path, response)
    });
  });
});