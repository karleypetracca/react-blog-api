const db = require("./conn"),
	fetch = require("node-fetch");

class BlogModel {
	constructor(id) {
		this.id = id;
	}

	// Posts //

	static async getAllPosts() {
		try {
			const allPosts = await db.any(`
				SELECT * FROM posts
				INNER JOIN authors
				ON posts.author_id = authors.id;
			`);
			return allPosts;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}

	static async getOnePost(id) {
		try {
			const onePost = await db.one(`
				SELECT * FROM posts
				INNER JOIN authors
				ON posts.author_id = authors.id 
			  WHERE posts.author_id = ${id};
			`);
			return onePost;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}

	// Comments //

	static async getAllComments(id) {
		try {
			const allComments = await db.any(`
				SELECT comments.comment, comments.post_id, comments.author_id, authors.author as comment_author, authors.email as comment_email FROM comments
				INNER JOIN authors
				ON comments.author_id = authors.id
			  WHERE post_id = ${id};
			`);
			return allComments;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}

	// Authors //

	static async getAllAuthors() {
		try {
			const allAuthors = await db.any(`
				SELECT * FROM authors;
			`);
			return allAuthors;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}

	static async getOneAuthor(id) {
		try {
			const oneAuthor = await db.one(`
				SELECT * FROM authors 
				INNER JOIN posts
				ON authors.id = posts.author_id
			  WHERE authors.id = ${id};
			`);
			return oneAuthor;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}

	// ADDING TO DB

	static async addComment(comment, author_id, post_id) {
		try {
			const postComment = await db.result(`
				INSERT INTO comments (comment, author_id, post_id)
				VALUES ('${comment}', ${author_id}, '${post_id}')
			`);
			return postComment;
		} catch (error) {
			console.error("ERROR", error);
			return error.message;
		}
	}
}

module.exports = BlogModel;
