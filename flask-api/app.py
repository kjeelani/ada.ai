from flask import Flask, request
from dataclasses import dataclass
import json
import uuid
from datetime import datetime

app = Flask(__name__)

@dataclass
class Post:
    id: uuid.UUID
    ctime: datetime
    title: str
    author: str

    def __repr__(self):
        return f"{{id: {self.id}, ctime: {self.ctime}, title: {self.title}, author: {self.author}}}"


test_posts = [
    Post(str(uuid.uuid1()), str(datetime.now()), "S", "Author 1"),
    Post(str(uuid.uuid1()), str(datetime.now()), "A", "Author 2"),
    Post(str(uuid.uuid1()), str(datetime.now()), "M", "Author 3"),
    Post(str(uuid.uuid1()), str(datetime.now()), "R", "Author 4"),
    Post(str(uuid.uuid1()), str(datetime.now()), "T", "Author 5")
]

@app.errorhandler(404)
def error_page(error):
    return json.dumps({
        "404": "page not found"
    })

@app.route("/")
def index():
    return json.dumps({
        "index": "/"
    })

@app.get("/health")
def health():
    return json.dumps({
        "status": "healthy"
    })

@app.route("/posts", methods=["GET"])
@app.route("/posts/<string:post_id>")
def g_posts(post_id: str=None):
    if post_id is None:
        page = int(request.args.get("page", 1))
        page_size: int = int(request.args.get("page_size", 5))

        res = test_posts[:page_size + 1]

        return json.dumps({
            "metadata": {
                "page": page,
                "page_size": page_size
            },
            "posts": [repr(item) for item in res]
        })
    else:
        for post in test_posts:
            if post_id == post.id:
                return repr(post)

@app.post("/posts")
def p_posts():
    post = Post(
        id=uuid.uuid1(),
        ctime=datetime.now(),
        title=request.args.get("title", ""),
        author=request.args.get("author", "")
    )

    test_posts.append(post)

    return json.dumps(post)

@app.route("/posts/<string:post_id>", methods=["DELETE"])
def test(post_id: str=None):
    res = None
    for idx, post in enumerate(test_posts):
        if post_id == post.id:
            res = test_posts.pop(idx)
            break

    return repr(res)