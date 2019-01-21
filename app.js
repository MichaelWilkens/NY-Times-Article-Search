$(document).ready(function() {

    var userSearch;
    var userNumber;
    var userStartYear;
    var userEndYear;

    
    
    $("#search-button").on("click", function () {
        if($('#top-articles').html() === ''){

            userSearch = $("#search").val();
            userNumber = $("#record-number").val();
            userStartYear = $("#starting-year").val();
            userEndYear = $("#end-year").val();
            checkYear();

            var corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
            var queryURL = corsAnywhereUrl + "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=XWETtvAlDOSEX34oS7ciPt77fzlyZZtb&q=" + userSearch + "&begin_date=" + userStartYear + "&end_date=" + userEndYear;

            console.log("userSearch: " + userSearch);
            console.log("userNumber: " + userNumber);
            console.log("userStartYear: " + userStartYear);
            console.log("userEndYear: " + userEndYear);

            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                eachRecord(response);
            });
        }
    });

    $('#clear-button').on('click', function(){
        $('#search').val('')
        $('#record-number').val('')
        $('#starting-year').val('')
        $('#end-year').val('')
        $('#top-articles').empty()
    })


    function checkYear() {
        if (!userStartYear) {
            userStartYear = 19000101;
        }
        if (!userEndYear) {
            userEndYear = 30000101;
        }
    }

    function eachRecord(response) {
        for (var i = 0; i < userNumber; i++) {
            // return (response.response.docs[i].web_url);
            $("#top-articles").append("<p><a href=" + response.response.docs[i].web_url + ">" + response.response.docs[i].headline.main + ' ' + response.response.docs[i].pub_date.slice(0,10) +"</a></p>");
            $('a').attr('target', '_blank')            
    }
}

});