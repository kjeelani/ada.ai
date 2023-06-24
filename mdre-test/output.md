Test API
========
`/health`

`GET` _Check Health_


#### Response Body

```json
{"status":"healthy"}
```
---
`/posts`

`GET` _Get All Posts With Pagination_

|Query Strings|Type|Description|
|---|---|---|
|_`page`_|The page you want|integer|
|_`page_size`_|The size of each page|integer|

#### Response Body

```json
{"metadata":{"page":"0","page_size":"10"},"posts":[{"id":"e52aff2f-773b-48aa-ae58-4e3d8ae81201","ctime":"2023-06-17T17:58:47+0000","title":"Sample Title","author":"John Doe"}]}
```
`POST` _Create A New Post_


#### Request Body

```json
{"title":"Sample Title","author":"John Doe"}
```

#### Response Body

```json
{"id":"e52aff2f-773b-48aa-ae58-4e3d8ae81201","ctime":"2023-06-17T17:58:47+0000","title":"Sample Title","author":"John Doe"}
```
---
`/posts/:post_id`

`GET` _Get A Post By Id_

|Path Parameters|Type|Description|
|---|---|---|
|_`post_id`_|Post ID|string|

#### Response Body

```json
{"id":"e52aff2f-773b-48aa-ae58-4e3d8ae81201","ctime":"2023-06-17T17:58:47+0000","title":"Sample Title","author":"John Doe"}
```
`DELETE` _Delete A Post By Id_

|Path Parameters|Type|Description|
|---|---|---|
|_`post_id`_|Post ID|string|

#### Response Body

```json
{"id":"e52aff2f-773b-48aa-ae58-4e3d8ae81201","ctime":"2023-06-17T17:58:47+0000","title":"Sample Title","author":"John Doe"}
```
---
