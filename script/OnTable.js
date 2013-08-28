/* OnTable.js
 * @Author Integ(7777js@gmail.com)
 **/

$(function(){
    var csv = $('#csv').text();
    var json = $.csv.toArrays(csv);
    var keyword = json.slice(0,1);
    keyword = keyword[0];
    var data = json.slice(1);
    var aoColumns = [
        { "sTitle": keyword[0]},
        { "sTitle": keyword[1]},
        { "sTitle": keyword[2]},
        { "sTitle": keyword[3]},
        { "sTitle": keyword[4]},
        { "sTitle": keyword[5]},
        { "sTitle": keyword[6]},
        { "sTitle": keyword[7]},
        { "sTitle": keyword[8]},
        { "sTitle": keyword[9]},
        { "sTitle": keyword[10]}
    ];
    var myTable = {};
    $('#makeTable').click(function(){
        var myTable = $('#data').dataTable({
            "bDestroy": true,
            "bRetrieve": true,
            "aaData": data,
            "aoColumns": aoColumns
        });
    });

    var keywordsHTML = '';
    $.each(keyword,function(i,e){
        keywordsHTML += '<option value="' + i +'">'+ e +'</option>';
    });
    $('#keywords').html(keywordsHTML);

    var customHTML = '';
    $.each(keyword,function(i,e){
        customHTML += '<li data-id="' + i + '">'+ e +'<span>已添加</span></li>';
    });
    $('#customCol').html(customHTML);
    $('#customCol li').click(function(){
        var span = $(this).children().text();
        var keywordId = $(this).data('id');
        if(span === '隐藏'){
            $(this).children().text('已添加');
            myTable.fnSetColumnVis(keywordId, true);
            myTable.fnAdjustColumnSizing();
        }
        if(span === '已添加'){
            $(this).children().text('隐藏');
            myTable.fnSetColumnVis(keywordId, false);
            myTable.fnAdjustColumnSizing();
        }
    });

    $('#resort').click(function(){
        var order = [];
        $('#customCol li').each(function(){
            order.push($(this).data('id'));
        });
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
