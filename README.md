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

<details>

<summary>Health check for the API (just another route)</summary>

##### Response

```json
{
    "status": "healthy"
}
```

</details>

<hr>

#### Get All Posts

`GET /posts`

<details>

<summary>Query all pools (LIMIT 20)</summary>

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

</details>

#### Create A New Post

`POST /posts`

<details>

<summary>Insert a new pool into memory</summary>

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

</details>

<hr>

#### Get A Specific Post

`GET /posts/{post_id}`

##### Response Body

A `Post` object

#### Delete A Specific Post

`DELETE /posts/{post_id}`

##### Response Body

A `Post` object: the post you just removed
