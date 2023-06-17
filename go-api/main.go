package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type Post struct {
	ID           uuid.UUID `json:"id"`
	CreationTime time.Time `json:"ctime"`
	Title        string    `json:"title"`
	Author       string    `json:"author"`
}

type PostOpts struct {
	Title  string `json:"title"`
	Author string `json:"author"`
}

func NewPost(opts *PostOpts) *Post {
	return &Post{
		ID:           uuid.New(),
		CreationTime: time.Now(),
		Title:        opts.Title,
		Author:       opts.Author,
	}
}

var posts []Post

func main() {
	posts = make([]Post, 0)

	r := gin.Default()

	r.GET("/health", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"status": "healthy",
		})
	})

	postsGroup := r.Group("/posts")
	postsGroup.GET("/", func(c *gin.Context) {
		const minPage = 0

		const minPageSize = 5
		const maxPageSize = 35

		page, err := strconv.Atoi(c.Query("page"))
		if err != nil {
			c.JSON(http.StatusBadRequest, "page query string must be integer")
			return
		}

		pageSize, err := strconv.Atoi(c.Query("page_size"))
		if err != nil {
			c.JSON(http.StatusBadRequest, "page_size query string must be integer")
			return
		}

		if page < minPage {
			c.JSON(http.StatusBadRequest, fmt.Sprintf("page > %d", minPage))
			return
		}

		if pageSize < minPageSize || pageSize > maxPageSize {
			c.JSON(http.StatusBadRequest, fmt.Sprintf("%d <= page_size <= %d", minPageSize, maxPageSize))
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"metadata": gin.H{
				"page":      page,
				"page_size": pageSize,
			},
			"posts": posts,
		})
	})

	postsGroup.POST("/", func(c *gin.Context) {
		postOpts := PostOpts{}

		if err := c.BindJSON(&postOpts); err != nil {
			c.JSON(http.StatusBadRequest, "request body doesn't conform")
			return
		}

		newPost := NewPost(&postOpts)
		posts = append(posts, *newPost)

		c.JSON(http.StatusOK, *newPost)
	})

	postsGroup.GET("/:post_id", func(c *gin.Context) {
		postId, err := uuid.Parse(c.Param("post_id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, "post_id must be a uuid")
			return
		}

		for _, item := range posts {
			if item.ID == postId {
				c.JSON(http.StatusOK, item)
				return
			}
		}

		c.JSON(http.StatusNotFound, "post_id not found in posts")
	})

	postsGroup.DELETE("/:post_id", func(c *gin.Context) {
		postId, err := uuid.Parse(c.Param("post_id"))
		if err != nil {
			c.JSON(http.StatusBadRequest, "post_id must be a uuid")
			return
		}

		for i, item := range posts {
			if item.ID == postId {
				c.JSON(http.StatusOK, item)
				posts = append(posts[:i], posts[i+1:]...)
				return
			}
		}

		c.JSON(http.StatusNotFound, "post_id not found in posts")
	})

	r.Run()
}
