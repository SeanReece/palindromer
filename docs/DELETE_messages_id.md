# DELETE /api/messages/:id

## Description
Delete a single specific message. If successful, the message will be removed from palindromer immediately.


## Authentication
None


## Parameters
- **id** _(required)_ — The id of the message.

## Return format
An indication as to whether the request was successful. 

- **deleted** — Boolean. Was the message deleted?

## Errors
- **`400`** — The id was missing or invalid.
- **`404`** — The message does not exist. Perhaps it was already deleted?

## Example
**Request**

`DELETE` http://palindromer.seanreece.com/api/messages/55c13d7986c34d0100cce067

**Return**
``` json
{
  "deleted": "true"
}
```
