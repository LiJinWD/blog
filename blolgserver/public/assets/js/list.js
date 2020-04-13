let id = getUrlParmas('categoryId');
$.ajax('/posts/category/' + id).done(suc => {    
    let html = template('listTpl', {data: suc});
    $('#listBox').html(html);
});
$.ajax('/categories/' + id).done(suc => $('#hBox').text(suc.title))

