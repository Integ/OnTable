/* OnTable.js
 * @Author Integ(7777js@gmail.com)
 **/

$(function(){
    var csv = $('#csv').text();
    var json = $.csv.toArrays(csv);
    var keyword = json.slice(0,1);
    keyword = keyword[0];
    var data = json.slice(1);
    var aoColumns = [];
    $.each(keyword, function(i,e){
        aoColumns[i] = {'sTitle': e};
    });
    var myTable = {};
    function drawTable(colOption){
        myTable = $('#data').dataTable({
            "bDestroy": true,
            "bRetrieve": true,
            "aaData": data,
            "aoColumns": colOption
        });
    }
    $('#makeTable').click(function(){
        drawTable(aoColumns);
    });

    var keywordsHTML = '';
    $.each(keyword,function(i,e){
        keywordsHTML += '<option value="' + i +'">'+ e +'</option>';
    });
    $('#keywords').html(keywordsHTML);

    var customHTML = '';
    $.each(keyword,function(i,e){
        customHTML += '<li data-id="' + i + '" data-visiable="true">'+ e +'<span>已添加</span></li>';
    });
    $('#customCol').html(customHTML);
    $('#customCol li').click(function(){
        var span = $(this).children().text();
        var keywordId = $(this).data('id');
        if(span === '隐藏'){
            $(this).children().text('已添加');
            $(this).removeClass('hideMe');
        }
        if(span === '已添加'){
            $(this).children().text('隐藏');
            $(this).addClass('hideMe');
        }
    });

    $('#resort').click(function(){
        var order = [];
        $('#customCol li').each(function(){
            if(!$(this).hasClass('hideMe')){
                order.push($(this).data('id'));
            }
        });
        var _aoColumns = [];
        $.each(order, function(i, e){
            _aoColumns[i] = {"sTitle": keyword[e]};
        });
        myTable.fnDestroy();
        $('#data').empty();
        drawTable(_aoColumns);
        $('#custom').bPopup().close();
    });

    $('#customCol').sortable();
    $('#fliter_open').on('click', function(e) {
        e.preventDefault();
        $('#fliter').bPopup();
    });
    $('#custom_open').on('click', function(e) {
        e.preventDefault();
        $('#custom').bPopup();
    });
});
