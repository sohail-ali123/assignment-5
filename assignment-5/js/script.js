var SiteData = `<div class="container">
			<div class="main_details">
				<div class="image" style="background-image: url('https://images.punkapi.com/v2/keg.png')">
				</div>
				<div class="containt" align="left">
					<span class="beer_title" style="font-weight: bold; font-size: 25px;">Buzz</span><br/>
					<span class="tagline" style="font-weight: bold; font-size: 15px;">A Real Bitter Experience.</span><br/>
					<span class="first_brewed">First brewed in 09/2007.</span><br/>
				</div>
				<div class="expand_collapse expand"></div>
			</div>
			<div class="extra_details" align="left">
				<span style="font-weight: bold">Description : </span><span class="description">A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.</span><br/>
				<span style="font-weight: bold">Abbreviation(ABV) : </span><span  class="abv">4.5</span><br/>
				<span style="font-weight: bold">International Bitterness Units(IBU) : </span><span class="ibu">60</span><br/>
				<span style="font-weight: bold">Target FG : </span><span class="target_fg">1010</span><br/>
				<span style="font-weight: bold">Target OG : </span><span class="target_og">1044</span><br/>
				<span style="font-weight: bold">European Brewery Convention(EBC) : </span><span class="ebc">20</span><br/>
				<span style="font-weight: bold">Standard Reference Method(SRM) : </span><span class="srm">10</span><br/>
				<span style="font-weight: bold">pH : </span><span class="ph">4.4</span><br/>
				<span style="font-weight: bold">Attenuation level : </span><span class="attenuation_level">75</span><br/>
				<span style="font-weight: bold">Volume :</span><span class="volume">20 litres</span><br/>
				<span style="font-weight: bold">Boil Volume :</span><span class="boil_volume">25 litres</span><br/>
				
				<span style="font-weight: bold">Method</span>
				<span class="method">
					<ul>
						<li>Mash temp</li>
							<ul>
								<li>temp: 65 celsius</li>
								<li>Duration: 75</li>
							</ul>
						<li>Fermentation</li>
						    <ul>
								<li>temp : 19 celsius</li>
							</ul>
						<li>twist: null</li>
					</ul>
				</span><br/>
				<span style="font-weight: bold">Ingredients</span>
				<span class="ingredients">
					<ul>
						<li>Malt</li>
							<ul class="malt">
							</ul>
						<li>Hops</li>
						    <ul class="hops">
							</ul>
						<li class="yeast">Yeast: Wyeast 1056 - American Ale™</li>
					</ul>
				</span><br/>
				<span style="font-weight: bold">Food Pairing</span>
				<span class="food_pairing">
					<ul>
					</ul>
				</span><br/>
				<span style="font-weight: bold">Brewers tips : </span><span class="brewers_tips">The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.</span><br/>
				<span style="font-weight: bold">Contributed by : </span><span class="contributed_by">Sam Mason &#60;samjbmason&#62;</span><br/>
			</div>
		</div>`;


var globelJsonData;
	
	$.getJSON('https://api.punkapi.com/v2/beers', function(jsonData) {
		globelJsonData = jsonData;
		var obj = $.parseHTML(SiteData);
		runModule(jsonData, obj);
	});
	
	function runModule(data, obj){
		var Main_obj = document.getElementById("Main_back");
		Main_obj.innerHTML = "";
		for(var i=0; i<data.length; i++){
			
			if(data[i].name.toUpperCase().indexOf($("#searchKeyword").val().toUpperCase())>-1){
			
			$(obj).children(".main_details").children(".containt").children(".beer_title").html(""+data[i].name);
			$(obj).children(".main_details").children(".containt").children(".tagline").html(""+data[i].tagline);
			
			$(obj).children(".main_details").children(".containt").children(".first_brewed").html("first brewed in "+data[i].first_brewed);
			$(obj).children(".main_details").children(".image").css("background-image","url("+data[i].image_url+")")
			
			$(obj).children(".extra_details").children(".description").html(""+data[i].description);
			$(obj).children(".extra_details").children(".abv").html(""+data[i].abv);
			$(obj).children(".extra_details").children(".ibu").html(""+data[i].ibu);
			$(obj).children(".extra_details").children(".target_fg").html(""+data[i].target_fg);
			$(obj).children(".extra_details").children(".target_og").html(""+data[i].target_og);
			$(obj).children(".extra_details").children(".ebc").html(""+data[i].ebc);
			$(obj).children(".extra_details").children(".srm").html(""+data[i].srm);
			$(obj).children(".extra_details").children(".ph").html(""+data[i].ph);
			$(obj).children(".extra_details").children(".attenuation_level").html(""+data[i].attenuation_level);
			$(obj).children(".extra_details").children(".volume").html(" "+data[i].volume.value+" "+data[i].volume.unit);
			$(obj).children(".extra_details").children(".boil_volume").html(" "+data[i].boil_volume.value+" "+data[i].boil_volume.unit);
			
			$(obj).children(".extra_details").children(".method").html(`<ul>
						<li>Mash temp</li>
							<ul>
								<li>temp: `+data[i].method.mash_temp[0].temp.value+` `+data[i].method.mash_temp[0].temp.unit+`</li>
								<li>Duration: `+data[i].method.mash_temp[0].duration+`</li>
							</ul>
						<li>Fermentation</li>
						    <ul>
								<li>temp : `+data[i].method.fermentation.temp.value+` `+data[i].method.fermentation.temp.unit+`</li>
							</ul>
						<li>twist: `+data[i].method.twist+`</li>
					</ul>`
			);
			
			for(var j = 0; j<data[i].ingredients.malt.length; j++){
				$(obj).children(".extra_details").children(".ingredients").children("ul").children(".malt").append(`<li>`+data[i].ingredients.malt[j].name+` `+data[i].ingredients.malt[j].amount.value+` `+data[i].ingredients.malt[j].amount.unit+`</li>`);
			}
			
			for(var j = 0; j<data[i].ingredients.hops.length; j++){
				$(obj).children(".extra_details").children(".ingredients").children("ul").children(".hops").append(`<li>name : `+data[i].ingredients.hops[j].name+`</li>
								<ul>
									<li>amount : `+data[i].ingredients.hops[j].amount.value+` `+data[i].ingredients.hops[j].amount.unit+`</li>
									<li>add : `+data[i].ingredients.hops[j].add+`</li>
								    <li>attrubute : `+data[i].ingredients.hops[j].attribute+`</li>
								</ul>`);
			}
			
			$(obj).children(".extra_details").children(".ingredients").children("ul").children(".yeast").html(data[i].ingredients.yeast);
			
			for(var j = 0; j<data[i].food_pairing.length; j++){
				$(obj).children(".extra_details").children(".food_pairing").children("ul").append(`<li>`+data[i].food_pairing[j]+`</li>`);
			}
				
			
			$(obj).children(".extra_details").children(".brewers_tips").html(""+data[i].brewers_tips);
			$(obj).children(".extra_details").children(".contributed_by").html(""+data[i].contributed_by);
			
			$(".Main_back").append($(obj).clone());
			
			}
		}
		
		
		$(".expand_collapse").click(function(){
		if($(this).hasClass("expand")){
			$(this).removeClass("expand");
			$(this).addClass("collapse");
			$(this).parent().parent().children(".extra_details").css("display","block");
			
		}else{
			$(this).removeClass("collapse");
			$(this).addClass("expand");
			$(this).parent().parent().children(".extra_details").css("display","none");
		}
		
		});
		$(".beer_title").click(function(){
			var url = $(this).html() +" in beer";
			url = url.replace("/ /g","+");
			window.open("https://www.google.com/search?q="+url);
		});
		
	    async function loaderRemove(){
			await sleep(3000);
			$(".loader").css("display","none");
		} 
		
		loaderRemove();
	}
	
	function sleep(ms) {
  		return new Promise(resolve => setTimeout(resolve, ms));
	}
	
	function searchText(){
		$(".Main_back").html("");
		var obj = $.parseHTML(SiteData);
		runModule(globelJsonData, obj);
		
	}