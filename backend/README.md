### Installation

1. Install NPM packages Backend
   -- Command - npm i

2. Run the Backend at http://localhost:5000
   -- Command - npm start

## Registor API

# Endpoint

`POST http://localhost:5000/auth/registor`

# Reqested format

The Request data is in JSON format.

# Reqested data

The API returns the following data:
Field | Type | Description  
---------------|--------|------------
firstname | string | Admin firstname  
lastname | string | Admin lastname  
email | string | Admin email  
password | string | Admin password

# Conclusion

The Registor API will add record with authorization and returns information about a specific admin based on the requested body provided in the request. The response data includes the admin's fistname , lastname , email , token.

# Login API

# Endpoint

`POST http://localhost:5000/auth/login`

# Reqested format

The request data is in JSON format.

# Reqested data

The API returns the following data:
Field | Type | Description  
---------------|--------|------------
email | string | Admin email  
password | string | Admin password

# Conclusion

The Admin API returns information about a specific admin based on the reqested body in the request. The response data includes the admin's fistname , lastname , email , token.

## All Survey API

# Endpoint

`GET http://localhost:5000/survey`

# Conclusion

The All Survey API returns information about all survey record . The response data includes the survey's title , total question and total submission.

## Single Survey API

# Endpoint

`GET http://localhost:5000/survey/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
---------------|--------|------------
id | string | Survey Id

# Conclusion

The Single Survey API returns information about specific survey on the reqested param in the request . The response data includes the survey's title , all question and its question options.

## Add Survey API

# Endpoint

`POST http://localhost:5000/survey/add`

# Reqested format

The request data is in JSON format.

# Reqested body

The API returns the following data:
Field | Type | Description  
---------------|--------|------------
title | string | Survey title  
questions | array | It include object which contain question object has title and isRequired is boolean , option has of array name option

# Example Requested

{
"title": "12220sd",
"questions": [
{
"question": { "title":"question1" , "isRequired": false},
"options": ["answer"]
}
]
}

## Conclusion

The Add Survey API will add all requested body in database . The response data include success flag.

## Delete Survey API

# Endpoint

`DELETE http://localhost:5000/survey/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
------|--------|------------
id | string | Survey id

# Conclusion

The Delete Survey API will delete specific survey on the reqested param record . The response data include success flag.

## Status Survey API

# Endpoint

`POST http://localhost:5000/survey/{surveyId}/status`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
surveyId | string | Survey id

# Conclusion

The Status Survey API will change the specific survey activation and deactivation . The response data include survey's
id , title , status , createdAt , updated.

## Update Survey Title API

# Endpoint

`PUT http://localhost:5000/survey/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-----|--------|------------
id | string | Survey id

# Reqested data

The API returns the following data:
Field | Type | Description  
-----|--------|------------
title | string | Survey title

# Conclusion

The Update Survey Title API will update title of specific survey on the reqested param record . The response data include id , title ,status .

## Add Question API

# Endpoint

`POST http://localhost:5000/survey/{surveyId}/question/add`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
--------|--------|------------
surveyId | string | Survey id

# Reqested data

The API returns the following data:
Field | Type | Description  
------|--------|------------
title | string | question title
isRequired | boolean | it is used for question

# Conclusion

The Add Question API will add question on specific survey Id . The response data include question's
id , title , isRequired,surveyId , createdAt , updatedAt.

## Update Question API

# Endpoint

`PUT http://localhost:5000/survey/{surveyId}/question/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-------|---------|------------
surveyId | string | Survey id
id | string | question id

# Reqested data

The API returns the following data:
Field | Type | Description  
------|--------|------------
title | string | question title
isRequired | boolean | it is used for question

# Conclusion

The Update Question API will update specific question of specific survey record .The response data include question's
id , title , surveyId , createdAt , updatedAt.

## Delete Question API

# Endpoint

`DELETE http://localhost:5000/survey/{surveyId}/question/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
------|--------|------------
surveyId | string | Survey id
id | string | question id

# Conclusion

The Delete Question API will delete specific question of specific survey record .The response data include success flag.

## Add Option API

# Endpoint

`POST http://localhost:5000/survey/{surveyId}/{questionId}/option/add`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-------|--------|------------
surveyId | string | Survey id
questionId | string | Question id

# Reqested data

The API returns the following data:
Field | Type | Description  
-------|--------|------------
name | string | name of option

# Conclusion

The Add Option API will add specific question option of specific survey record. The response data include option
id , name , questionId , createdAt , updatedAt.

## Delete Option API

# Endpoint

`DELETE http://localhost:5000/survey/{surveyId}/{questionId}/option/{id}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
surveyId | string | Survey id
questionId | string | Question id
id | string | option id

# Conclusion

The Delete Option API will delete specific question option of specific survey record. The response data include success flag.

## Survey Submit API

# Endpoint

`POST http://localhost:5000/survey/{surveyId}/{userId}/submit`

# Reqested param

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
surveyId | string | Survey id
userId | string | UserId id

# Reqested data

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
questions | Array | This question array contain question id and option id as object

# Conclusion

The Survey Submit API will submit all selected question and option of that survey. The response data include success flag.

## User registor API

# Endpoint

`GET http://localhost:5000/survey/{id}/registor/user`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
id | string | Survey id

# Reqested data

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
name | string | user name
surname | string | user surname
email | string | user email

# Conclusion

The User registor API will registor user detail in database . The response data include user's ,
id, name , surname , email , createdAt , updatedAt.

## View submitted user record of specific survey API

# Endpoint

`GET http://localhost:5000/survey/view/{surveyId}`

# Reqested format

The request data is in JSON format.

# Reqested param

The API returns the following data:
Field | Type | Description  
-----------------|--------|------------
surveyId | string | Survey id

# Conclusion

The View submitted user record of specific survey API will return all user record of specific survey which include all submitted question of that survey with option . The response data include survey detail , user detail and submitted questions list with selected option.
