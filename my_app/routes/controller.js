import mongoose from 'mongoose';

const DB_NAME = 'express';
const USR = 'root';
const PW = 'root';
const MONGO_HOST = 'localhost:27017';
const MONGO_URL = `mongodb://${USR}:${PW}@${MONGO_HOST}/${DB_NAME}?authSource=admin`;


//-- Database --//
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true
}).then(() => {
    console.log('DB 연결 성공');
}).catch((err) => {
    console.error('DB 연결 실패:', err);
});

const {Schema} = mongoose;
const WritingSchema = new Schema({
    title: String,
    contents: String,
    date: {
        type: Date,
        default: Date.now
    }
})
const Writing = mongoose.model('Writing', WritingSchema);


//-- API --//
export async function main(req, res) {
    let writings = await Writing.find({});
    console.log(writings);

    console.log('메인 페이지 응답 완료');
    res.render('main', {
        list: writings
    });
}

export function writeForm(req, res) {
    console.log('글 작성 폼 응답 완료');
    res.render('write');
}

export async function write(req, res) {
    console.log('글 작성 요청 확인');

    // body 조회
    const {title} = req.body;
    const {contents} = req.body;

    // mongodb 에 저장
    const writing = new Writing({
        title: title,
        contents: contents
    })

    const result = await writing.save()
        .then((result) => {
            console.log('Data 저장 성공')
            res.redirect(`/detail/${result._id}`)
        }).catch((err) => {
            console.error(err)
            res.render('write')
        })
}

export async function detail(req, res) {
    const {id} = req.params;
    console.log('상세페이지 요청 확인 id : ', id);

    const detail = await Writing.findOne({_id: id})
        .then((result) => {
            console.log('상세페이지 응답 완료');
            res.render('detail', {'detail': result})
        }).catch((err) => console.log(err))
}

export async function editForm(req, res) {
    const {id} = req.params;

    const edit = await Writing.findOne(
        {_id: id}
    ).then((result) => {
        console.log('data 수정 폼 응답 완료')
        res.render('detail', {'edit': result})
    }).catch((err) => console.log('수정 폼 응답 실패 :', err))
}

export async function edit(req, res) {
    const {id} = req.params;
    const {title} = req.body;
    const {contents} = req.body;

    console.log('수정 요청 data :', req.params.title);

    const edit = await Writing.replaceOne(
        {
            _id: id
        }, {
            title: title,
            contents: contents
        }
    ).then((result) => {
        console.log('data 수정 완료')
        res.redirect(`/detail/${id}`)
    }).catch((err) => console.log('data 수정 실패 :', err))
}

export async function deleteContent(req, res){
    const {id} = req.params;

    const delete_content = await Writing.deleteOne(
        {
            _id: id
        }
    ).then(() => {
        console.log('data 삭제 완료')
        res.redirect('/')
    }).catch((err) => console.log('data 삭제 실패 :', err));
}