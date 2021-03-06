import db from './../models';

const postController = {};

postController.post = (req, res) => {
    const {
        title,
        text,
        link,
        _creatorId
    } = req.body;

    // validation either text or link, not both

    const post = new db.Post({
        title,
        text,
        link,
        _creator: _creatorId,
    });

    post.save().then((newPost) => {
        return res.status(200).json({
            success: true,
            data: newPost
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });
};

postController.getAll = (req, res) => {
    db.Post.find({}).populate({
        path: '_creator',
        select: 'username createdAt -_id'
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator',
        match: { 'isDeleted': false }
    })
    .then((posts) => {
        return res.status(200).json({
            success: true,
            data: posts
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });
};


postController.getSinglePost = (req, res) => {
    db.Post.findById(req.params.id).populate({
        path: '_creator',
        select: 'username createdAt -_id'
    }).populate({
        path: '_comments',
        select: 'text createdAt _creator',
        match: { 'isDeleted': false }
    })
    .then((post) => {
        return res.status(200).json({
            success: true,
            data: post
        });
    }).catch((err) => {
        return res.status(500).json({
            message: err
        });
    });
};

export default postController;