const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const connect = require("./schemas");

connect();

const corsOptions = {
    origin: true,
    credentials: true
};


app.use( 
    session({
        resave: false,
        saveUninitialized: true,
        secret: "cpu",
        cookie: {
            httpOnly:true,
            secure: false
        }
    })
);

app.use(cors(corsOptions));

//json data을 사용하기 위해서 선언
app.use(express.json());

//배열 같은 데이터들같은 추가적인것을 가져오기 위해 extended:true.로 설정
app.use(express.urlencoded({extended:true}));


//라우터 : 서버.js에서 모든 작업을 다 할수 있지만 가독성이 낮고, 협업하기 어렵기 떄문에
//         따라서 routes폴더 내부에서 각 router파일들을 만들어서 가져와서 사용, 
//         memberRouter로 가기위한 경로는 /member임을 선언.
app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));
app.use("/comment",require("./routes/commentRouter"));


//서버가 실행되기위함
app.listen(8080, () => {
    console.log("listen umm...");
});