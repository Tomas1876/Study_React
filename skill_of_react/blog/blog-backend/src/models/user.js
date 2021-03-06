import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt';
import  Jwt  from 'jsonwebtoken';

const UserSchema = new Schema({
    username:String,
    hashedPassword:String
});

//비밀번호를 파라미터로 받아서 계정의 hashedPassword를 설정
UserSchema.methods.setPassword = async function(password){
    if(!password){ return; }
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}
//파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증
UserSchema.methods.checkPassword = async function(password){
    if(!password){ return; }
    const result = await bcrypt.compare(password, this.hashedPassword);
    return result; //result는 boolean 값이다
}

//username으로 데이터를 찾을 수 있게 해준다
UserSchema.statics.findByUsername = function(username){
    return this.findOne({username}); //여기의 this는 모델 즉 User를 가리킨다
}

//특정 데이터 지워서 반환하기
UserSchema.methods.serialize = function(){
    const data = this.toJSON();
    delete data.hashedPassword;
    return data;
}

//토큰 발급하기
UserSchema.methods.generateToken = function(){
    const token = Jwt.sign(
        //첫번째 파라미터에는 토큰 안에 집어넣고 싶은 데이터를 넣는다
        {
            _id:this.id,
            username:this.username
        },
        process.env.JWT_SECRET, //두번째 파라미터에 암호
        {
            expiresIn:'7d' //7일간 유효하다는 뜻
        }
        
    )
    return token;
}
const User = mongoose.model('User', UserSchema);
export default User;
