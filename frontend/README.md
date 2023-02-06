### Installation

1. Install NPM packages in Frontend and Backend
   -- Command - npm i

2. Run the Frontend at http://localhost:3000
   -- Command - npm run start

3. Run the Backend at http://localhost:3001
   -- Command - npm run start

Frontend - http://localhost:3000
-- Routes
1). Auth Routes
--- http://localhost:3000/login - Admin Login
--- http://localhost:3000/register - Admin Register

2). Admin Routes
--- http://localhost:3000 - Home page (Can only be accessed by admin after login)
--- http://localhost:3000/survey/create - Create Survey
--- http://localhost:3000/survey/update/:id - Update Survey (id - Unique ID for survey)
--- http://localhost:3000/survey/survey/view/:id - View Detailed report of survey (id - Unique ID for survey)

3). User Routes
--- http://localhost:3000/survey/:id - For user to submit survey

-- Flow for admin

1. Admin registers/login himself in the app.
2. Admin will redirected to home page after login/register
3. On home page there will be list of survey created and button to create new survey
4. On clicking create survey button, will get redirect to create survey page
5. To View, Update or Delete the survey admin can click on respective buttons showed in particular survey item
6. Clicking on activate/deactivate survey, the status of survey will be changed.
7. If survey is activated, admin can copy the link and can share to users and users can fill the survey. else users will not be able to fill survey

-- Flow for User

1. When user visits the survey fill page. They will asked to provide details like Name, Surname and Email to submit the survey.
2. After user enters the details, Will get redirected to the survey page where they can fill the inputs.
3. After submitting survey user will get success message.
