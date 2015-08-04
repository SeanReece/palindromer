# POST /api/messages

## Description
Add a new message. Message (if accepted) will be stored and is publicly available using the [**`GET` messages**](https://github.com/SeanReece/palindromer/blob/master/docs/GET_messages.md) endpoint.


## Authentication
None


## Parameters
- **text** _(required)_ — The message text to be saved

## Return format
A single message as it has been saved in the database.

- **_id** — The message id. Use this in subsequent API calls that target specific messages.
- **text** — The message text that was sent in the request.
- **time** — The time the message was added to palindromer in UTC
- **isPalindrome** — Boolean representing whether the message is a palindrome or not.

## Errors
- **`400`** — The message text was blank. Specifiy message text!


## Example
**Request**

`POST` http://palindromer.seanreece.com/api/messages

    { "text": "Straw Warts" }

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
