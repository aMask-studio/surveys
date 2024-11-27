const exp = require('express');
const app = exp();
const cors = require('cors');
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: '_',
    user: '_',
    password: '_',
    database: '_',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// var query=function(sql,options,callback){

//   connection.getConnection(function(err,conn){
//       if(err){
//           callback(err,null,null);
//       }else{
//           conn.query(sql,options,function(err,results,fields){
//               //Event driven callback
//               callback(err,results,fields);
//           });
//           conn.release();
//       }
//   });
// };

app.use(bodyParser.json());
app.use(cors());

app.get('/questions', async (req, res) => {
    // res.header("Access-Control-Allow-Origin", "http://koyltoh4.beget.tech");
    // res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    try {
      const [rows,fields] = await pool.query('SELECT * FROM question');
      var answers = await GetAnswersByQuestions(rows);
      var question_answers = GetQuestionAndAnswers(rows,answers);
      
      res.json(question_answers);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
});
app.post('/send_result',async(req,res)=>{
    // res.header("Access-Control-Allow-Origin", "*");
    try {
        for (let result of req.body) {
            const [check_question] = await pool.query(`SELECT * FROM result_survey WHERE question=? and surveyed=?`,[result.question,result.surveyed]);
            var queryText = ``;
            var values = [];
            console.log(check_question);
            if(check_question.length>0){
                queryText = `UPDATE result_survey SET answer=? WHERE question=? and surveyed=?`;
                values = [result.answer,result.question,result.surveyed];
            } else {
                queryText = `INSERT INTO result_survey(question, answer, surveyed) VALUES(?,?,?)`;
                values = [result.question, result.answer, result.surveyed];
            }
            await pool.query(queryText, values);
        }
        
        console.log('Все результаты успешно вставлены!');
        res.status(201).json({ result: 1 });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});
async function GetAnswersByQuestions(questions){
    var id = [];
    var id_string = "";

    questions.forEach((element) => {
        id.push(element.id);
    });

    if(id.length>1){
        id_string = id.toString().replace(',',' or ');
    } else {
        id_string = id[0].toString();
    }

    const [rows,fields] = await pool.query(`SELECT * FROM answer WHERE question=${id_string}`);

    return rows;
}
function GetQuestionAndAnswers(questions,answers){
    var question_answers = [];
    let answers_for_question = [];
    if(questions.length>1){
        questions.forEach((element) => {
            answers_for_question = [];
            if(answers.length>1){
                answers.forEach((element_2) => {
                    if(element.id==element_2.question){
                        answers_for_question.push(element_2);
                    }
                });
            } else {
                answers_for_question.push(answers[0]);
            }
            question_answers.push({id:element.id,text:element.text,answers:answers_for_question});
        });
    } else {
        if(answers.length>1){
            answers.forEach((element) => {
                answers_for_question.push(element);
            });
        } else {
            answers_for_question.push(answers[0]);
        }
        question_answers.push({id:questions[0].id,text:questions[0].text,answers:answers_for_question});
    }
    //console.log(question_answers);
    return question_answers;
}

app.listen(port, () => console.log(`Listening on port ${port}`));
