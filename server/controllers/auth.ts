module.exports = {
    register: (req: Request, res: Response) => {
        console.log(req)
        console.log('welcome')
    },

    login: (req: Request, res: Response) => {
        console.log('hi')
    }
}