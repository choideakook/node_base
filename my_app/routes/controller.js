exports.main = function (req, res) {
    res.render('main');
};

exports.writeForm = function (req, res) {
    res.render('write');
};

exports.write = function (req, res) {
    const title = req.body.title;
    const contents = req.body.contents;
    const date = req.body.date;

    res.render('detail', {
        'detail': {
            title: title,
            contents: contents,
            date: date
        }
    });
};

exports.detail = function (req, res) {
    res.render('detail');
};