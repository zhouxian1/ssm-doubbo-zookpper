$(function(){
    
    var tasks = function(){
        
        $("#add_new_task").on("click",function(){
            var nt = $("#new_task").val();
            if(nt != ''){
                var task = '<li>'
                                +'<span class="close glyphicon glyphicon-remove"></span>'
                                +'<a href="#"><span class="fa fa-tag"></span>'+nt+'</a>'
                            +'</li>';
                    
                $("#tasks").prepend(task);
            }            
        });
    }();
    var labels = function(){

        $("#add_new_label").on("click",function(){
            var nt = $("#new_label").val();
            if(nt != ''){

                var task = '<li>'
                    +'<span class="close glyphicon glyphicon-remove"></span>'
                    +'<a href="#"><span class="fa fa-tag"></span>'+nt+'</a>'
                    +'</li>';

                $("#labels").prepend(task);
            }
        });
    }();

});
