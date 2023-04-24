import { Request, Response } from "express";

module.exports = {
    getAllPosts: (req: Request, res: Response) => {
        console.log('all posts')
    },

    getCurrentUserPosts: (req: Request, res: Response) => {
        console.log('user posts')
    },

    addPost: (req: Request, res: Response) => {
        console.log('add posts')
    },

    editPost: (req: Request, res: Response) => {
        console.log('edit posts')
    },

    deletePost: (req: Request, res: Response) => {
        console.log('delete posts')
    }
}