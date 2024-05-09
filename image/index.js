require('dotenv').config()
const express = require("express")
const app = express()
const DB = require("./models/DB")
const cloudinary = require('cloudinary').v2
const upload = require("./multer")
const schema = require("./models/schema")
const cors = require("cors")

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
const port = 3000

//to post name and image
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        const user = await schema.create({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_uri: result.public_id
        })

        return res.json(user)
    } catch (e) {
        return res.status(500).json(e.message)
    }
})

// to get all deatils

app.get("/", async (req, res) => {
    try {
        const user = await schema.find()
        return res.status(200).json(user)
    } catch (e) {
        console.log(e)
    }
})

//get one user
app.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await schema.findOne({ _id: id })
        console.info(user)
        return res.status(200).json(user)
    } catch (e) {
        console.log(e.message);
        return res.status(400).json(error)
    }
})

// delete image
app.delete('/:id', async (req, res) => {
    try {
        const user = await schema.findById(req.params.id)
        await cloudinary.uploader.destroy(user.cloudinary_uri)
        await user.deleteOne()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})
//upadate

app.put('/:id', upload.single('image'), async (req, res) => {
    try {
        let user = await schema.findById(req.params.id);
        if (req.file) {
            if (user.cloudinary_uri) {
                await cloudinary.uploader.destroy(user.cloudinary_uri);

            }
            const result = await cloudinary.uploader.upload(req.file.path)
            user.avatar = result.secure_url
            user.cloudinary_uri = result.public_id
        }

        if (req.body.name) {
            user.name = req.body.name
        }

        user = await user.save()
        return res.status(200).json(user)
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
})
app.listen(port, () => console.log(`server is running at port ${port}`))