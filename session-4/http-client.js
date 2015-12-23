$(function() {
    $('#btn').on('click', function(e) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:8888/london',
            success : function (data) {
            	console.log(data);
            }
        });
    })
});
