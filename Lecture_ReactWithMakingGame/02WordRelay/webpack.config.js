const path = require('path');
//이건 노드에서 경로를 쉽게 조작할 수 있게 해주는 것
//노드 강의에서 더 알아보기

const webpack = require('webpack'); 

module.exports ={
    name: 'word-relay-setting', //웹팩 설정 이름
    mode: 'development', //실서비스에서는 production
    devtool: 'eval', //빠르게 하겠다는 뜻
    resolve:{
        extensions:['.js','.jsx'] //등등등 아래에서 입력할 파일의 확장자명을 적어준다
    },
    
    //중요!
    //entry는 입력 / output은 출력
    entry:{
        //app: ['./client.jsx', './WordRelay.jsx'],
        //위처럼 합칠 파일들을 적어줘야 하지만 지금 client.jsx가 WordRelay.jax를 불러와 사용하고 있다
        //이런 관계는 webpack이 다 파악하기 때문에 app의 값으로 WordRelay.jsx까지 적어줄 필요는 없다
        //client.jsx만 불러와도 webpack이 알아서 WordRelay.jsx까지 불러온다
        //물론 WordRelay.jsx에서 불러온 react와 reactDom까지 불러온다
        //jsx라는 확장자까지 생략 가능(위에서 resolve를 설정해야 함)
        app: ['./client']
    },
    module:{
        rules:[{
            test: /\.jsx?/, //규칙을 적용할 파일들 이건 정규표현식인데 js와 jsx파일에 룰을 적용하겠다는 뜻
            loader: 'babel-loader', //적용할 룰은 바벨
            options:{
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['> 1% in KR'], //대한민국에서 점유율 1% 이상인 브라우저만 지원하겠다는 뜻
                        }
                    }],
                    '@babel/preset-react'
                ],
                plugins:[]
            }
        }]
    }, //entry에 있는 파일을 읽어서 moule을 적용한 후 output으로 뺀다
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true})
    ],
    output:{
        path: path.join(__dirname, 'dist'), //현재 폴더 안에 들어있는 dist라는 뜻 path.join이 자동으로 현재폴더를 잡을 수 있게 해준다
        filename:'app.js'
    }
    //이렇게 설정하면 entry의 app에 적은 값들을 합쳐서 output의 filename을 가진 파일을 만들어준다
    //설정 후 터미널에서 webpack이라고 치면 됨 이때
    //webpack : 'webpack' 용어가 cmdlet, 함수, 스크립트 파일 또는 실행할 수 있는 프로그램 이름으로 인식되지 않습니다
    //혹은 내부 또는 외부명령, 실행할 수 있는 프로그램, 또는 배치 파일이 아닙니다
    // 등의 에러가 발생할 수 있다 노드를 사용하면 자주 볼 수 있는 에러
    // 명령어로 등록되지 않아서 발생하는 것
    //명령어로 등록하거나, package.json에 스크립트로 적어서 사용해도 됨("dev":"webpack")
    //스크립트로 사용할 경우 작성하고 터미널에서 npm run dev라고 명령해야 함
    //혹은 npx webpack 이라고 작성해도 된다
};