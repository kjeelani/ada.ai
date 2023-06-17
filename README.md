# ada.ai
API Documentation Assistant


## Example Blog Posts API

### Post Object

```json
{
  "id": "e52aff2f-773b-48aa-ae58-4e3d8ae81201",
  "ctime": "2023-06-17T17:58:47+0000",
  "title": "Example Post 1",
  "author": "Author 1",
}
```

### Paths

#### Health Check

`GET /health`

##### Response

```json
{
    "status": "healthy"
}
```

#### Get All Posts

`GET /posts`

##### Query Strings

| Field | Type | Description | Required |
| :---: | :--: | :---------- | :------: |
| `page` | `int` | The page you want | False |

##### Response

```json
[
    <list of post objects>
]
```

#### Create A New Post

`POST /posts`

##### Request Body

```json
{
    "title": "Example Post 2",
    "author": "Author 2"
}
```

> NOTE: You will get back a full `Post` object as a response

##### Response Body

A `Post` object

<hr>

#### Get A Specific Post

`GET /posts/{post_id}`

##### Response Body

A `Post` object

#### Delete A Specific Post

`DELETE /posts/{post_id}`

##### Response Body

A `Post` object: the post you just removed
