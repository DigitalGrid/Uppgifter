$(document).ready(function() {
  
  /* --------------------
  Event/Query handling
  -------------------- */

  //default (characters)
  ajaxRequest("http://gateway.marvel.com:80/v1/public/characters?orderBy=-modified&ts=1&apikey=964b1bd3afb3a3997b0587ab58e2007b&hash=a3495a1e2b60a394597d98cbf41af97c");
  
  //characters
  $("button#character").click(function() {
    ajaxRequest("http://gateway.marvel.com:80/v1/public/characters?orderBy=-modified&ts=1&apikey=964b1bd3afb3a3997b0587ab58e2007b&hash=a3495a1e2b60a394597d98cbf41af97c");
  });
  
  //comics
  $("button#comics").click(function() {
    ajaxRequest("http://gateway.marvel.com:80/v1/public/comics?orderBy=-modified&ts=1&apikey=964b1bd3afb3a3997b0587ab58e2007b&hash=a3495a1e2b60a394597d98cbf41af97c");
  });
  
  //series
  $("button#series").click(function() {
    ajaxRequest("http://gateway.marvel.com:80/v1/public/series?ts=1&apikey=964b1bd3afb3a3997b0587ab58e2007b&hash=a3495a1e2b60a394597d98cbf41af97c");
  });
  
  //search characters
  $("#search-input").on("input",function() {
    if($("#search-input").val() !== "") {
      var query = $("#search-input").val();
      var url = "http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=" + query + "&ts=1&apikey=964b1bd3afb3a3997b0587ab58e2007b&hash=a3495a1e2b60a394597d98cbf41af97c";
      ajaxRequest(url);
    } else {
      $(".results").html("");
    }
  });  
  
  
  /* --------------------
  Functions
  -------------------- */
  
  /*
  * the request
  * @param url - the url to send the request to
  */
  function ajaxRequest(url) {
    showLoading();
    $.ajax({
      type: "GET",
      dataType: "json",
      url: url,
      success: showResult
    });
  }    
  
  /*
  * show result from query
  * @param data - data from JSON-object
  */
  function showResult(data) {
    var html = "";    
    $.each(data.data.results, function(i, obj) {      
      var imagePath = obj.thumbnail.path + "." + obj.thumbnail.extension;
      var description = obj.description ? obj.description : "Description missing";
      var title = obj.name || obj.title;
      
      html += "<div class='result-container row'>";
      
      html += "<div class='poster-container col-xs-3'>";
      html += "<img class='img-responsive' src='" + imagePath + "' alt='result-poster'>";
      html += "</div>";
      
      html += "<div class='info-container col-xs-9'>";
      html += "<h2>" + title + "</h2>";
      html += "<p>" + description + "</p>";
      html += "</div>";
      
      html += "</div>";
    });
    $(".results").html(html);
  }
  
  /*
  * show loading gif
  */
  function showLoading() {
    var html = "<div class='loading'><img src='img/loading.gif'></div>";
    $(".results").html(html);
  }

});
