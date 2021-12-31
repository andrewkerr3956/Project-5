const handler = async (req, res) => {
    if (req.method == 'POST') {
        if (req.body.user == "admin" && req.body.pass == "test") {
            const success = "Successfully logged in."
            console.log(success)
            res.send({ success })
        }
        else {
            const error = "There was an error."
            console.log(error)
            res.send({ error })
        }
    }
}

export default handler;