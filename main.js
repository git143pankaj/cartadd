console.log("File is working")

$(document).ready(function(){
	var price_arr = [];
	$.get('https://api.myjson.com/bins/qzuzi', function(data, status){
		console.log(data);
			//$('#gtdata').html(data);
			
			var product_list = '';
			//for (var i = data.length - 1; i >= 0; i--) {
			for (var i = 0; i< data.length; i++) {
				price_arr.push(data[i].price);
				//console.log(data[i]);
				product_list += '<div class="col-md-3 col-sm-6 col-xs-12 each_item" i_price="'+data[i].price+'" i_discount="'+data[i].discount+'"><div class="pdbox"><div class="card">';
				product_list += '<img class="card-img-top" src="'+data[i].img_url+'" alt="Card image cap"/> <div class="card-body">  <h4 class="card-title"><a>'+ data[i].name +'</a></h4><p class="card-text"><i class="fas fa-rupee-sign"></i>'+data[i].price+' <span class="grey"><del><i class="fas fa-rupee-sign"></i>'+data[i].discount+'</del></span> <span class="grn">'+data[i].discount+'% off</span></p><a href="#" class="btn btn-primary" onclick="addCart()">Add to Cart</a></div></div></div></div>';
			
			}
			console.log(price_arr);
			var max_price =Math.max.apply(null, price_arr);
			var min_price =Math.min.apply(null, price_arr);
			priceRangeInit(min_price,max_price);
			$('#tab_product_list').html(product_list);

		});

$(".price-l-2-h").click(function(){
    sortingD("0",".container .each_item","#tab_product_list","i_price");
 
  });
  $(".price-h-2-l").click(function(){
    sortingD("1",".container .each_item","#tab_product_list","i_price");
 
  });
   $(".disc-h-2-l").click(function(){
    sortingD("1",".container .each_item","#tab_product_list","i_discount");
 
  });


});

function sortingD(v,item,div,params){
  
  var $sorted_items,
  getSorted = function(selector, attrName) {
    return $(
      $(selector).toArray().sort(function(a, b){
          var aVal = parseInt(a.getAttribute(attrName)),
              bVal = parseInt(b.getAttribute(attrName));
            if(v==0){
              return aVal-bVal;
            }else{
              return bVal-aVal;
            }          
      })
    );
  };
$sorted_items = getSorted(item,params).clone();
$(div).html($sorted_items);  
}
function priceSlider(min,max){
	$(".each_item").each(function(){
		var cur_val = parseInt($(this).attr("i_price"));
		if(cur_val>min&&cur_val<max){
			$(this).removeClass("hide");
		}
		else{
			$(this).addClass("hide");
		}
	});
}
function priceRangeInit(min,max){
    $( "#slider-range" ).slider({
      range: true,
      min: min,
      max: max,
      values: [ min, max ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "₹ " + ui.values[ 0 ] + " - ₹ " + ui.values[ 1 ] );
        priceSlider(ui.values[ 0 ],ui.values[ 1 ]);
      }
    });
    $( "#amount" ).val( "₹" + $( "#slider-range" ).slider( "values", 0 ) +
      " - ₹" + $( "#slider-range" ).slider( "values", 1 ) );
}
