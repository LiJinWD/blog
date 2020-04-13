// 热门推荐
$.ajax('/posts/recommend')
    .done(suc => {        
        let hotTpl = `
            {{each data}}
            <li>
            <a href="/detail.html?id={{$value._id}}">
              <img src="{{$value.thumbnail}}" alt="">
              <span>{{$value.title}}</span>
            </a>
          </li>
            {{/each}}
    `;
    let html = template.render(hotTpl, { data: suc });
    $('#hotBox').html(html);
})