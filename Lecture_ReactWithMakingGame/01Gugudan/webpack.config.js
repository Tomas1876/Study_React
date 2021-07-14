const path = require('path');

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
                presets:['@babel/preset-env','@babel/preset-react'],
                plugins:[]
            }
        }]
    },
    output:{
        filename:'app.js',
        path:path.join(__dirname, 'dist',)
    }
};