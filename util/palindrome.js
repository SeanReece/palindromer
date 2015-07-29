//Checks whether the string is a palindrome. 
//Returns: true if palindrome, false otherwise
module.exports.isPalindrome = function(text){
	var reverse = text.split("").reverse().join("");
	return text === reverse;
}