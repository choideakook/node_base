export function main (req, res) {
    res.render('main');
}


export function writeForm (req, res) {
    res.render('write');
}

export function write (req, res) {
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
}

export function detail (req, res) {
    res.render('detail');
}