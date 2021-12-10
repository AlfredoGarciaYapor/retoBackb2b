const mongoose = require('mongoose');
// const { Company } = require('./companies.model')
const commentsSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required:true
        },
        creator:{
            type:String,
            required: true
        },
        correct:{
            type:Boolean,
            ref: 'Company',
            required: true
        }
    }
)

const questionSchema = new mongoose.Schema(
    {
        title:{
            type:String,
            required: true
        },
        description:{
            type:String,
            required:true
        },
        creator:{
            type:String,
            required: true
        },
        comments:[commentsSchema]
    }
);

const Question = mongoose.model('Question', questionSchema);

module.exports = {
    Question
};


