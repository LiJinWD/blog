// 获取所有分类
$.ajax({
    type: "get",
    url: "/categories",
    success: function (response) {
        let html = template('categoryTpl', { data: response });
        $('#category').html(html);
    }
});
// 图片处理
$('#feature').on('change', function (e) {
    e.preventDefault();
    let formData = new FormData();
    formData.append('thumbnail', this.files[0]);    
    $.ajax({
		type: "post",
		url: "/upload",
		data: formData,
		// 传递文件需要用到这两个属性
		processData: false,
		contentType: false,
        success: function (response) {            
            $('#thumbnail').val(response[0].thumbnail); 
        },
        error: function (err){
            console.log(err);
            
        }
    });
});

// 添加文章(未处理图片)
$('#addForm').on('submit', function (e) {
    let formData = $(this).serialize();
    $.ajax({
        type: "post",
        url: "/posts",
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
    return false;
    
});

// 修改文章(未处理图片)
$('#parentBox').on('submit', '#modifyForm', function () {
    let formData = $(this).serialize();
    $.ajax({
        type: "put",
        url: "/posts/" + $(this).data('id'),
        data: formData,
        success: function (response) {
            location.href = '/admin/posts.html'
        }
    });
});
// 创建用户中的上传头像(单独处理上传图片)
$('#parentBox').on('change', '#feature', function  () {
	let formdata = new FormData();
	formdata.append('avatar', this.files[0]);
	$.ajax({
		type: "POST",
		url: "/upload",
		data: formdata,
		// 传递文件需要用到这两个属性
		processData: false,
		contentType: false,
		success: function (response) {
            $('#preview').attr('src', response[0].avatar);
            $('#preview').show();
			$('#thumbnail').val(response[0].avatar);
		}
	});
})

// 有id是修改文章, 无id是添加文章
let id = getUrlParmas('id');
if (id) {
   $.ajax({
       type: "get",
       url: "/posts/" + id,
       success: function (response) {
        $.ajax({
            type: "get",
            url: "/categories",
            success: function (categories) {
                console.log(response);
                
                response.categories = categories;
                let html = template('modifyTpl', response);
                $('#parentBox').html(html);
            }
        });
       }
   }); 
}
// 处理url
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