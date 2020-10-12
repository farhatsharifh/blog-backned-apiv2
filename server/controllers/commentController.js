import db from './../models';

const commentController = {};

commentController.post = (req, res) => {
    const {
        text,
        _creatorId, 
        _postId,
    } = req.body;

    // validation
    const comment = new db.Comment({
        text,
        _creator: _creatorId,
        _post: _postId,
    });

    comment.save().then((newComment) => {
        db.Post.findByIdAndUpdate(
            _postId,
            { $push: { '_comments': newComment._id } }
        ).then((existingPost) => {
            res.status(200).json({
                success: true,
                data: newComment,
                existingPost,
            });
        }).catch((err) => {
            console.log("*** err: ",err);
            res.status(500).json({
                message: err,
            });
        });
    }).catch((err) => {
        res.status(500).json({
            message: err,
        });
    });
}

export default commentController;