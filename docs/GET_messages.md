# GET /api/messages

## Description
Retrieve a list of all messages. To retrieve a single message use [**`GET` messages/:id**](https://github.com/500px/api-documentation/blob/master/docs/GET_messages_id.md) endpoint.


## Authentication
None


## Parameters
None

## Return format
An array of messages as as they have been saved in the database.

- **_id** — The message id. Use this in subsequent API calls that target specific messages.
- **text** — The message text that was sent in the request.
- **time** — The time the message was added to palindromer in UTC
- **isPalindrome** — Boolean representing whether the message is a palindrome or not.

## Errors
None


## Example
**Request**

`GET` http://palindromer.seanreece.com/api/messages

**Return**
``` json
[
{
  "time": "2015-08-04T22:32:25.565Z",
  "views": 0,
  "_id": "55c13d7986c34d0100cce067",
  "text": "Straw Warts",
  "isPalindrome": true
},
{
  "time": "2015-08-04T22:32:25.565Z",
  "views": 0,
  "_id": "55c13c2986c34d0100cce066",
  "text": "Testing",
  "isPalindrome": false
}
]
```
