const { Question } = require('../models/questions.model')

async function getQuestionsList(req, res){

    console.log(req.body);

    try {
            const questionsList = await Question.find();
            
            console.log('%c⧭', 'color: #00e600', questionsList);
            if ( questionsList ) {
                res.status(200).json({"success": true, "data": questionsList});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error finding questions.", "data": []});
    }
}

async function createNewQuestion(req, res){
    const {userId, title, details} = req.body;

    console.log(req.body);

    try {
        if(userId && title && details){
            const newQuestion = await new Question({
                title: title,
                details: details,
                creator: userId,
                company: []
            }).save();
            if(newQuestion){
                return res.status(200).json({"success": true, "data": newQuestion});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }            
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: variable(s) faltante(s)"});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error creating question.", "data": []});
    }
}

async function getQuestion(req, res){
    const {questionId} = req.body;

    console.log(req.body);

    try {
        if(questionId){
            const questionsList = await Question.find({_id : questionId});
            
            console.log('%c⧭', 'color: #00e600', questionsList);
            if ( questionsList ) {
                res.status(200).json({"success": true, "data": questionsList});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: variable(s) faltante(s)"});
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error finding questions.", "data": []});
    }
}

async function createNewComment(req, res){
    const {userId, title, details, correct, questionId} = req.body;
    const newComment = {
        creator: userId,
        correct: correct,
        title: title,
        details: details
    }

    console.log(req.body);

    try {
        if(userId && title && details){
            const question = await new Question.findById(questionId, function(result){
                result.comments.push(newComment)
            }).save();
            if(newQuestion){
                return res.status(200).json({"success": true, "data": question});
            }else{
                return res.status(204).json({"success": true, "data": []});
            }            
        }else{
            return res.status(400).json({"success": true, "message": "Error BadRequest: variable(s) faltante(s)"});
        }

    } catch (err) {
        console.log(err);
        return res.status(500).json({ "message": "Error creating question.", "data": []});
    }
}

module.exports = {
    getQuestionsList,
    getQuestion,
    createNewQuestion,
    createNewComment,
}