const path = require('path');
const webpack = require('webpack'); 
module.exports = {
    mode :'development',
    devtool:'eval', //개발할 때는 eval, 배포할 때는 hidden-source-map
    resolve:{
        extensions:['.jsx', '.js']
    },
    entry:{
        app:'./client'
    },
    module:{
        rules:[{
            test : /\.jsx?/,
            loader:'babel-loader', //babel을 사용해야 옛날 브라우저에서도 jsx같은 비교적 최신 문법을 사용할 수 있게 해준다
            options:{
                //presets:['@babel/preset-env','@babel/preset-react'], //preset이란 plugin들의 모음 그 안에 설정을 또 적용할 수도 있다(아랫줄)
                presets:[
                    ['@babel/preset-env',{
                        targets:{
                            browsers:['last 2 chrome versions'], //최신순으로 크롬 두 버전만 지원하겠다는 뜻 그 이전 버전은 이제 지원 안된다
                            //이런 식으로 속성 지정 가능
                        }
                    }],
                    '@babel/preset-react'
                ],
                plugins:[]
            }
        }]
    },
    plugins:[
        new webpack.LoaderOptionsPlugin({debug:true})
    ],
    output:{
        filename:'app.js',
        path:path.join(__dirname, 'dist',)
    }
};