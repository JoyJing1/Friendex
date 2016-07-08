"use strict";

const SearchApiUtil = {
	fetchMatches(query, success, error) {
    // console.log("fetchMatches(query, success, error) in search_api_util.js");

		$.ajax({
			url: `/api/search`,
			type: 'GET',
      data: { query: query },
			success(resp) {
        // console.log("successfully fetched api/search in fetchMatches in SearchApiUtil");
        // console.log(resp);
        success(resp);
      },
			error(xhr) {
				const errors = xhr.responseJSON;
        // console.log(xhr);
			}
		});
	}
};

module.exports = SearchApiUtil;
