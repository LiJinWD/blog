$.ajax('/posts/search/' + getUrlParmas('keys')).done(suc => {
    let html = template('searchTpl', { data: suc });
    $('#searchBox').html(html);
})