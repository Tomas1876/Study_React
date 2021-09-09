import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', postsCtrl.write);

const post = new Router(); // /api/posts/:id
post.get('/', postsCtrl.read);
post.delete('/', postsCtrl.remove);
post.patch('/', postsCtrl.update);
/*
//아이디 검증이 필요하므로 chekObjectId 미들웨어 추가
post.get('/:id',postsCtrl.checkObjectId, postsCtrl.read)
post.delete('/:id',postsCtrl.checkObjectId, postsCtrl.remove)
post.patch('/:id',postsCtrl.checkObjectId, postsCtrl.upadte)
*/
//위 세 줄을 리팩토링 해 아래 한 줄로 만들 수 있다
posts.use('/:id', postsCtrl.checkObjectId, post.routes()); 

export default posts;
