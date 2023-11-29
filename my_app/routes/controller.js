import fs from 'fs';
import path from 'path';

const __dirname = path.resolve(),
    filePath = path.join(__dirname, 'my_app', 'data', 'writing.json');

export function main (req, res) {
    const fileData = fs.readFileSync(filePath);
    const writings = JSON.parse(fileData);

    console.log(writings);

    console.log('메인 페이지 응답 완료');
    res.render('main', {
        list : writings
    });
}

export function writeForm (req, res) {
    console.log('글 작성 폼 응답 완료');
    res.render('write');
}

export function write (req, res) {
    console.log('글 작성 요청 확인');

    // body 조회
    const title = req.body.title;
    const contents = req.body.contents;
    const date = req.body.date;

    // 저장할 파일 조회
    const fileData = fs.readFileSync(filePath);
    const writings = JSON.parse(fileData);

    // data 입력
    writings.push({
        'title': title,
        'contents': contents,
        'date': date
    });

    // data 저장
    fs.writeFileSync(filePath, JSON.stringify(writings));

    // data 반환
    console.log('글 작성 응답 완료');
    res.render('detail', {
        'detail': {
            title: title,
            contents: contents,
            date: date
        }
    });
}

export function detail (req, res) {
    console.log('상세페이지 응답 완료');
    res.render('detail');
}