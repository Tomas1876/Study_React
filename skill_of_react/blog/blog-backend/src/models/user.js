import mongoose, {Schema} from 'mongoose'
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
    username:String,
    hashedPassword:String
});

//비밀번호를 파라미터로 받아서 계정의 hashedPassword를 설정
UserSchema.methods.setPassword = async function(password){
    const hash = await bcrypt.hash(password, 10);
    this.hashedPassword = hash;
}
//파라미터로 받은 비밀번호가 해당 계정의 비밀번호와 일치하는지 검증
UserSchema.methods.checkPassword = async function(){
    const result = await bcrypt.compare(password, 10);
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

const User = mongoose.model('User', UserSchema);
export default User;
