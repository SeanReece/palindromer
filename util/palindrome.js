//Checks whether the string is a palindrome. 
//Returns: true if palindrome, false otherwise
module.exports.isPalindrome = function(text){
	text = text.replace(/\s+/g, '').toLowerCase();	//Remove spaces to support long, multi-word palindromes. Ignore case
	var reverse = text.split("").reverse().join("");
	return text === reverse;
}