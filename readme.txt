## Introduction
This is a simple chat application where clients can create applications, chats, and send messages to chats.

## Configurations
- Create a new database in MySQL with any name.
- Edit the database information in the `.env` file.

## Installation
- Run npm install 
- Run npm start 

## Endpoints

1. Create a new application:
   - Method: POST
   - URL: `/api/applications`
   - Request Body:
     {
       "name": "school 1"
     }
     

   - Response:
   
     {
       "created": true,
       "token": "dc0fd9f069e002563c8bac01429ea3"
     }
     

2. Get all applications:
   - Method: GET
   - URL: `/api/applications`
   - Response:
     
     {
       "applications": [
         {
           "name": "school 1",
           "token": "dc0fd9f069e002563c8bac01429ea3",
           "createdAt": "2023-08-10T14:13:50.000Z",
           "updatedAt": "2023-08-10T14:13:50.000Z"
         },
         {
           "name": "school 2",
           "token": "3cff8f774ec0279d952d1f8250c894",
           "createdAt": "2023-08-10T14:13:57.000Z",
           "updatedAt": "2023-08-10T14:13:57.000Z"
         }
       ],
       "count": 2
     }
     

3. Create a new chat in a specific application:
   - Method: POST
   - URL: `/api/applications/dc0fd9f069e002563c8bac01429ea3/chats`
   - Request Body:
     
     {
       "name": "Physics"
     }
     

   - Response:
     
	 {
	   "created": true,
	   "chat_number": 1
	 }
     

4. Get all chats in a specific application:
   - Method: GET
   - URL: `/api/applications/dc0fd9f069e002563c8bac01429ea3/chats`
   - Response:
     
     {
       "chats": [
         {
           "number": 1,
           "name": "Physics",
           "createdAt": "2023-08-10T14:19:52.000Z",
           "updatedAt": "2023-08-10T14:19:52.000Z"
         },
         {
           "number": 2,
           "name": "Maths",
           "createdAt": "2023-08-10T14:22:31.000Z",
           "updatedAt": "2023-08-10T14:22:31.000Z"
         }
       ],
       "count": 2
     }
     

5. Create a new message in a specific chat in a specific application:
   - Method: POST
   - URL: `/api/applications/dc0fd9f069e002563c8bac01429ea3/chats/1/messages`
   - Request Body:
     
     {
       "body": "msg 1"
     }
     

   - Response:
     
     {
       "created": true,
       "message_number": 1
     }
     

6. Get all messages in a specific chat in a specific application:
   - Method: GET
   - URL: `/api/applications/dc0fd9f069e002563c8bac01429ea3/chats/1/messages`
   - Response:
     
     {
       "messages": [
         {
           "number": 1,
           "body": "msg 1",
           "createdAt": "2023-08-10T14:24:37.000Z",
           "updatedAt": "2023-08-10T14:24:37.000Z"
         },
         {
           "number": 2,
           "body": "msg 2",
           "createdAt": "2023-08-10T14:31:17.000Z",
           "updatedAt": "2023-08-10T14:31:17.000Z"
         }
       ],
       "count": 1
     }
     

   - Note: You can add a search query to search for messages that match your input. For example:
     - Method: GET
     - URL: `/api/applications/dc0fd9f069e002563c8bac01429ea3/chats/1/messages?search=msg 1`
     - Response:
       
       {
         "messages": [
           {
             "number": 1,
             "body": "msg 1",
             "createdAt": "2023-08-10T14:24:37.000Z",
             "updatedAt": "2023-08-10T14:24:37.000Z"
           }
         ],
         "count": 1
       }
       

## Notes
- Pagination is applied for all GET requests.
- Errors are handled by the error handler in the middlewares folder.
- The Cluster module is used to handle multiple concurrent requests.

