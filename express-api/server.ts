import { Request, Response, NextFunction } from "express";

const express = require('express');
var bodyParser = require('body-parser')
const uuid = require('uuid');
const app = express();

app.use(bodyParser.json())

interface Post {
    id: string,
    ctime: string,
    title: string,
    author: string 
}

let blogPosts: Post[] = [
    {
        "id": "e52aff2f-773b-48aa-ae58-4e3d8ae81201",
        "ctime": "2023-06-17T17:58:47+0000",
        "title": "Example Post 1",
        "author": "Author 1",
    },
    {
        "id": "c69a3221-771b-48aa-ae58-2e3d8ae81201",
        "ctime": "2023-06-18T17:57:47+0000",
        "title": "Example Post 2",
        "author": "Author 2",
    }
]

function getPostByID(req: Request, res: Response) {
    for (var post of blogPosts) {
        if (post.id === req.params.id) {
            res.status(200).json(post);
            return;
        }
    }
    res.status(404);
}

function pushPost(req: Request, res: Response) {
    console.log(req.body)
    const date = new Date();
    const post: Post = {
        "id": uuid.v4(),
        "ctime": date.toISOString(),
        "title": req.body.title,
        "author": req.body.author
    }
    blogPosts.push(post);
    res.status(200).send(post);
}

function getAllPosts(req: Request, res: Response) {
    try {
        res.status(200).send(blogPosts);
    } catch {
        res.status(404);
    }
}

function deletePost(req: Request, res: Response) {
    for (let i = 0; i < blogPosts.length; i++) {
        if (blogPosts[i].id === req.params.id) {
            const tempPost: Post = blogPosts.splice(i, 1)[0];
            res.status(200).json(tempPost);
            return;
        }
    }
    res.status(404);
}

app.get('/', function (req: Request, res: Response) {
 return res.status(200).send("Test Express.JS API");
});

app.get('/health', function (req: Request, res: Response) {
    return res.status(200).json({
        "status": "healthy"
    });
});

app.get('/posts', getAllPosts);
app.get('/posts/:id', getPostByID);
app.post('/posts', pushPost);
app.delete('/posts/:id', deletePost);


app.listen(8080);