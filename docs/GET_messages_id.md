# GET /api/messages/:id

## Description
Retrieve a single specific message.

## Authentication
None

## Parameters
- **id** — The ID of the message returned from a previous request to the API.

## Return format
A single message.

- **_id** — The message id. Use this in subsequent API calls that target specific messages.
- **text** — The message text that was sent in the request.
- **time** — The time the message was added to palindromer in UTC
- **isPalindrome** — Boolean representing whether the message is a palindrome or not.

## Errors
None


## Example
**Request**

`GET` http://palindromer.seanreece.com/api/messages/55c13d7986c34d0100cce067

**Return**
``` json
{
  "time": "2015-08-04T22:32:25.565Z",
  "views": 0,
  "_id": "55c13d7986c34d0100cce067",
  "text": "Straw Warts",
  "isPalindrome": true
}
```
