const Koa = require('koa');
const app = new Koa();

const koaStatic = require('koa-static');
const session = require('koa-generic-session');
const bodyParser = require('koa-bodyparser')
const router = require('koa-joi-router');
const Joi = router.Joi;
const public = router(); 

app.use(koaStatic('./public'));
app.use(bodyParser());
app.use(session());
app.use(public.middleware());
 
public.get('/get',async (ctx)=> {
  var amount = session;
  amount.count = amount.count || 0;
  amount.count++;
  ctx.body = amount.count;
})

 
const form = async (ctx, next) => {
  await ctx.render('form');
  return next();
}

const data = async (ctx, next) => {
  await ctx.render('data', { data: ctx.session.data });
  return next();
}

public.get('/Form', form);

app.listen(3000);