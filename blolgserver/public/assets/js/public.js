// 随机推荐展示
$.ajax('/posts/random').done(suc => {
    let randomTpl = `
    {{each data}}
    <li>
      <a href="detail.html?id={{$value._id}}">
        <p class="title">{{$value.title}}</p>
        <p class="reading">阅读({{$value.meta.views}})</p>
        <div class="pic">
          <img src="{{$value.thumbnail}}" alt="">
        </div>
      </a>
    </li>
    {{/each}}
    `
    let html = template.render(randomTpl, { data: suc });
    $('#randomBox').html(html);


});
// 最新评论展示
$.ajax('/comments/lasted').done(suc => { 
    let Tpl = `
    {{each data}}
    <li>
        <a href="detail.html?id={{$value.post}}">
            <div class="avatar">
                <img src="{{$value.author.avatar}}" alt="">
            </div>
            <div class="txt">
                <p>
                  <span>{{$value.author.nickName}}</span>{{$value.createAt.substr(0,10)}}说:
                </p>
            <p>{{$value.content}}</p>
            </div>
        </a>
    </li>
    {{/each}}
    `
    let html = template.render(Tpl, { data: suc });
    $('#discuzBox').html(html);


});
// 最新分类
$.ajax('/categories').done(suc => { 
    
    let Tpl = `
    {{each data}}
    <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
    {{/each}}
    `
    let html = template.render(Tpl, { data: suc });    
    $('#topNav').html(html);
    $('#asideNav').html(html);


});

function getUrlParmas(name) {
    let json = {};
    location.search.substring(1).split('&').map(item => {
        json[item.split('=')[0]] = item.split('=')[1];
    });
   for (const key in json) {
       if (key == name) {
           return json[key];
       }
    }
    return 0;
} 



// 搜索
$('.search form').on('submit', function () {  
    location.href = 'search.html?keys=' + $(this).find('.keys').val(); 
    return false;
})