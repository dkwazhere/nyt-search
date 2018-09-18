// Setup Variables
// ==============================
var authKey = "5a3fcbf68ac1437080c5081b94c5726d";
var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL Base
var queryUrlBase =
  "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

// Variable to track number of articles
var articleCounter = 0;

// Functions
// ==============================

function runQuery(numArticles, queryURL) {
  // AJAX function
  $.ajax({ url: queryURL, method: "GET" }).done(function(NYTData) {
    for (var i = 0; i < NYTData.response.docs.length; i++) {
      console.log(NYTData.response.docs[i].headline.main);
      console.log(NYTData.response.docs[i].document_type);
      console.log(NYTData.response.docs[i].pub_date);
      console.log(NYTData.response.docs[i].byline.original);
      console.log(NYTData.response.docs[i].web_url);
    }

    // Logging to console.
    console.log(queryURL);
    console.log(numArticles);
    console.log(NYTData);
  });
}

// Main Process
// ==============================
$("#searchBtn").on("click", function() {
  // Get search term
  queryTerm = $("#search")
    .val()
    .trim();
  // Add in the Search Term
  var newURL = queryUrlBase + "&q=" + queryTerm;

  // Get # of records
  numResults = $("#numRecords").val();

  // Get the start year and end year
  startYear = $("#startYear")
    .val()
    .trim();
  endYear = $("#endYear")
    .val()
    .trim();

  if (parseInt(startYear)) {
    // Add the date imformation to the URL
    startYear = startYear + "0101";
    newURL = newURL + "&begin_date=" + startYear;
  }

  if (parseInt(endYear)) {
    // Add the date imformation to the URL
    endYear = endYear + "0101";
    newURL = newURL + "&end_date=" + endYear;
  }

  // Send the AJAX call the newly assembled URL
  runQuery(numResults, newURL);
  return false;
});

// PSEUDO
// 1. Retrieve User inputs and convert to variables
// 2. Use those variables to run AJAX call to the nytimes.
// 3. Break down the NYT object to useable fields.
// 4. Dynamically generate html content.

// 5. Dealing with 'edge cases' --bugs or situations that are not intuitive.
