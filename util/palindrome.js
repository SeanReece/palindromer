//Checks whether the string is a palindrome. 
//Returns: true if palindrome, false otherwise
module.exports.isPalindrome = function(text){
	if(!text)
		return false;
	//Remove spaces to support long, multi-word palindromes. Ignore case. Remove special characters
	text = text.replace(/\s+/g, '').toLowerCase().replace(/[^a-z]/g, '');
	console.log(text);
	var reverse = text.split("").reverse().join("");
	return text === reverse;
}