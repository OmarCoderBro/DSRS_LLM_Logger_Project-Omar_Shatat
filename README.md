# Thanks so much for this opportunity DSRS
# Welcome to EchoLog 👋

#### When I read the prompt, I thought about the super vast demand of using LLMs, especially for an organization, where costs might be getting a little too high. Whatever organization it may be, being able to not only track the LLM requests, but derive analysis on the performance of these LLMs through metrics I've included in this project, could be really beneficial. See, it's not enough to track when someone made an LLM call, and what model they used. I thought that including metrics like the hallucination score through span detection, finding the latency of these requests, and tracking other minor metrics like prompt and response length, would allow an organization, or even just a user, to centralize his or her LLM usage for whatever LLM they use, and really delve into what affects the performance and cost of using an LLM. This would in turn allow us to compare models and their latency, allowing organizations to optimize performance across huge teams, potentially saving a lot of money.

### Let's get to some of the project details.

#### The current code is configured to support the Gemini AI API. That is why the entire model pipeline mentions Google GenAI frequently. However, in the code, specifically the Express server, I label clearly where the API key is taken from our .env file, and I also comment where exactly the logic is to request a response from the Gemini API. That said, you can totally integrate OpenAI, Meta, or any other popular LLM by following the instructions I set in my code, mainly in the server.js Express app file, where our post request lives which fetches the AI's response.

#### The tech stack I chose consists of the following.
  - **Backend:** Node.js, Express.js, Flask, HuggingFace Hallucination Detection Model (link to which is further down), Gemini AI API
  - **Frontend:** React.js, Recharts for visualization
  - **Database:** Local PostgreSQL database integration
  - **Testing:** Jest

#### Technologies I wanted to integrate that could have helped the app, but not enough time. 
  - **Socket.io**, for automatic live updates of the LLM log tab, whenever a user clicks the submit button.
  - Ready for **AWS (S3, EC2)** for hosting.

#### Why these architectural and design choices? 🤔: One thing that may stick out to you is the HuggingFace model in a Flask app. I was recently part of research with AI hallucination, and already had the pipeline setup from one of my projects, so I took that code and implemented it in EchoLog, which added a whole new dimension of analysis when it came to analyzing LLM calls. I chose a PostgreSQL database, because I wanted a fast, reliable, and structured relational database, which allowed me to store multiple data-types, and I also had past experience with PostgreSQL. I chose Node and Express for creating my API endpoints, because it was easy to stick with JavaScript syntax and retain that consistency throughout my frontend and backend. JavaScript also has really cool database interaction with PostgreSQL through a 'pool' connection, with node-postgres.

#### Created APIs: 
- Created a log API, which allows me to take an LLM log and insert it into my PostgreSQL database. API endpoint is called /api/log in server.js.
- Created a query API, which allowed me to take a prompt, and get back the Gemini LLM response for that prompt. API endpoint is called /api/query in server.js.
- Created a clear API, which allowed me to clear all contents from my PostgreSQL database. API endpoint is called /api/clear-logs in server.js
 
#### **Repository Set-Up**: The repository is set up with both frontend and backend folders, the frontend folder leading to my React app, and the backend folder holding my Express app, a pool connection to a PostgreSQL database, as well as a 'hallucination_flask' folder which stores my Flask app. Besides the 2 main backend files, the frontend is made up of numerous functional components, each of which can be configured by itself. These include all 4 of the main pages, and an accompanying CSS file for each of these React componentds.

#### There is also a testing folder in our frontend src folder, called 'component_testing.test.js.' The tests are minimal because I was very new to JS testing, but they aim to test the core functionality, which is adding logs, and clearing logs.

# Running EchoLog locally 

#### Clone repo: git clone <this repository's link>, and then cd into repository's folder

#### Create a .env file in the backend folder, with its only contents being 
#### GEMINI_API_KEY=your_gemini_api_key_here

#### cd into backend and run "npm install"
#### In backend, run "python3 -m venv venv"
#### and then run "source venv/bin/activate" or "venv\Scripts\activate" on Windows
#### In backend, also run "pip install -r requirements.txt"

#### cd into 2nd frontend folder where node_modules exists
#### npm install

## Running the App 💻

#### For simplicity, create 3 terminals.
#### First terminal, go into backend, and run "node server.js" => Should start running on PORT 4000
#### Second terminal, go into backend/hallucination_flask and run "python hallucination_api.py" => Should start running on PORT 3001
#### Third terminal, go into frontend/frontend, and run "npm start" => Should start running on PORT 3000

#### NOTE: You can change these ports by updating server.js and hallucination_api.py, but React will default run on 3000.

### The React app should take you to EchoLog, and the app should be fully running! 🧑‍💻 👩‍💻 

#### If you reach any PORT troubles, run "lsof -i :{Port number}"
#### Should return back to you a table of current running servers, with their corresponding 5-number ID. If nothing is returned back, that PORT is clear.
#### To kill any server running on that port, run "kill -9 {5-number ID for that row}", until all rows in the returned table are empty
#### Once you run "lsof -i :{Port number}", and the table is clear, then that Port is clear and you're all good to go!

# Bonus Challenge (System Evolution) 📈
- As for evolving this system to ensure cost optimization and efficiency, I'd say that a couple things are really important to implement. The first thing is the async handling which I was going to implement, but ran out of time. This can be through Polling or Socket.io, and would definitely handle a larger user base a lot easier, by processing more requests more rapidly with live frontend updates, which I think is important for a platform like this.
- I would also add load handling, which means running the backend servers by different means. Of course, I would have hosted on AWS, but I think what is more important is making sure this app is hosted in a way which ensures that the heavy number of requests does not overstimulate a certain server in our backend, so whether it means distributing across more servers, or balancing the load of requests across our current servers, I think that is definitely something to keep in mind for a platform that will definitely experience bottleneck if it is not scaled.
- As far as user management, rate limiting would also be among some of the most important performance optimization integrations. Without rate limiting, the number of requests a user can make is unrestricted, which can cause the backend to be unresponsive or slow for other users. This is now leading me to believe that there should be a limit to the size of the response, etc, which can be done with prompt engineering and I have done something similar to that in the past.
- As far as user experience, adding authentication, user profiles, the option for an enterprise profile or an individual profile, and even the option to add multiple API keys and switch between them would be pretty helpful if we are trying to get a broad overview of the performance of LLMs across different companies.

### Advanced Filtering
- I implemented the advanced filtering on the logs, allowing users to be able to filter by date and model. ✅

# Check out a demo to EchoLog! (sorry for no sound 🙂) 
## (https://drive.google.com/file/d/1xYykHHFXlC45cYkzDMcLrF8gEx-zD_Oy/view?usp=sharing)

# Thanks for viewing this project! 
# Thanks so much for this opportunity DSRS, I truly appreciate the chance to become a part of your team, and this was a really cool project to build in such a short amount of time!













