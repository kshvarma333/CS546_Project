# CS546B_Project_Fall2019 - Trek the world
## Team members
* Vaishnavi Gopalakrishnan
* Trevor Cardwell
* Jenal Parmar
* Shreya Vhadadi
* Chirag Kamble
## Mission:
Our idea is to create an application that will offer several adventure trips like water rafting, hiking, kayaking, camping. It will provide the adventurers to find others who like to do the same, find events and register or unregister for the same. The value of this application is to create a social network for people who love adventures.
## Core Features:
###	* Login/ signup page
###	* Home page
####	For those not logged in, it will list the upcoming trips for the next 7 days.
####	For those logged in it will have a section for their upcoming registered trips.
###	* Events page
####	Lists location, weather (acquired via AJAX), other trip information.
####	Register button
#####	Users that are not logged in are redirected to login and then continue.
#####	Users that are logged in will have the trip added to their schedule
#####	If registered, a button to unregister is available if event is in future.
###	* User page
####	Users will be able to view all their past and future events. They can click on each and view details.
###	* Site Admin Portal
####	Users rights management
####	Full event administration. 
####	Assign tour guides
###	* Gallery
###	* Contact Us
## Future Enhancements:
###	* Trip Admin Portal – Separate page for trip guides or trip admin
###	* Advanced search (Adventure difficulty level, etc.)
###	* Live chat
###	* Follow other adventurers and see their trips.
###	* Sign up/Sign in via google
###	* Rate past events

## Users
The users collection will store all the users and their registered events. Users will be able to login, update their profile, search other people, and register/unregister an event. Tour guides can add and update events. Admins give access to guides and users.
```
{
    "_id": "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310",
    "loginID": "vaishoog@gmail.com",
    "hashedpassword": "123@Stevens",
    "accessLevel": "admin",
    "fname": "Vaishnavi",
    "lname": "Gopalakrishnan",
    "location": "NY",
    "regdEvents": {
        "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b"
        }
 }
```
Name	Type	Description
_id	string	A globally unique identifier to represent the user
loginId	string	A string field to represent unique email ID of the user
hashedPassword	string	A bcrypted string that is a hashed version of the user's password
accessLevel	string	A string field to represent the user's access level
fname	string	A string field to represent user's first name
lname	string	A string field to represent user's last name
location	string	A string field to represent location of the user
regdEvents	array	An array of user's registered events


### regdEvents (subdocument; not stored in a collection)
This subdocument is used to describe the various events registered by the users and events assigned for the tour guides.
```
{
    "_id": "5a5c4461-cdc9-4144-84f9-fcb278c5c122",
    "eventName": "Alps trekking"
}
```
Name	Type	Description
_id	string	A globally unique identifier to represent the event
eventName	string	A string field to represent the event name


## Events
The events collection will store all the events created, creation details, tour guide details and registered user details.
```
{
    "_id": "5a5c4461-cdc9-4144-84f9-fcb278c5c122",
    "eventName": "Alps trekking",
    "eventDesc": "Trekking the mountain Alps..."
    "createdBy":{
        "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b"
        "fname": "Vaishnavi",
        "lname": "Gopalakrishnan"
    },
    "location": "NY",
    "tourGuide":{
        "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b",
        "fName": "Francis",
        "lName": "Underwood"
    },
    "price": "100",
    "maxUsers": "50",
    "regdUsersCount": "27"
    "regdUsers":{
        "_id": "c5d0fd67-cdf3-4fc5-cdk-33d0373874893",
        "fName": "Trevor",
        "lName": "Cardwell"
    },
    "eventDate": “Nov 29, 2019”,
    "eventStatus": “Yet to start”
}
```
Name	Type	Description
_id	string	A globally unique identifier to represent the event
eventNum	int	A unique integer field to represent event number
eventName	string	A string field to represent name for the event
eventDesc	string	A string field to represent description for the event 
createdBy	array	An array to represent event creator profile 
location	string	A string field to represent the location of the event 
tourGuide	array 	An array to represent tour guide profile 
price	int	An integer field to represent the price for the event
maxUsers	int	An integer field to represent maximum number of users
regdUsersCount	int	An integer field to represent the number of registered users
regdUsers	array	An array to show all the registered users for the event
eventDate	date	A date field to represent the event date
eventStatus	string	A string field to represent the status of the event

### createdBy (subdocument; not stored in a collection)
This subdocument is used to describe the event creator details.
```
{
    "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b"
    "fname": "Vaishnavi",
    "lname": "Gopalakrishnan"
}
```
Name	Type	Description
_id	string	A globally unique identifier to represent the creator ID.
fName	string	A string field to represent the creator's first name
lName	string	A string field to represent the creator's last name

### tourGuide (subdocument; not stored in a collection)
This subdocument is used to describe the event tour guide details.
```
{
    "_id": "c5d0fd67-7977-4fc5-9088-33d0347c932b",
    "fName": "Francis",
    "lName": "Underwood"
}
```
Name	Type	Description
_id	string	A globally unique identifier to represent the guide ID
fName	string	A string field to represent the guide's first name
lName	string	A string field to represent the guide's last name

### regdUsers (subdocument; not stored in a collectionocument)
This subdocument is used to describe the user details who have registered for the event.
```
{
    "_id": "c5d0fd67-cdf3-4fc5-cdk-33d0373874893",
    "fName": "Trevor",
    "lName": "Cardwell"
}
```
Name	Type	Description
_id	string	A globally unique identifier to represent the user ID
fName	string	A string field to represent the registered user's first name
lName	string	A string field to represent the registered user's last name
