const mongoose = require ('mongoose')

const Schema = mongoose.Schema;

const projectsSchema = new Schema ({
    title:{
        type:String,
        required: false,
    },
    git_url:{
        type:String,
        required:false,
    },
    page_url:{
        type:String,
        required:false,
    },
    description:{
        type:String,
        required:false,
    },
    image_url:{
        type:String,
        required:false,
    },



}, { timestamps: true })

// Model based on the Schema
//=> pluralize : GalleryDb => GalleryDbs
const projects = mongoose.model('portfolioprojectDB', projectsSchema)

module.exports = projects
