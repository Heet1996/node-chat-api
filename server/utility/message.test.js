var expect=require('expect');
var {generateMessage}=require('./message.js');
describe("generateMessage",()=>{
	it("should expect from and text",()=>{
		var from="heet";
		var text="hello everyone";
		var obj=generateMessage(from,text);
		
		expect(obj.text).toEqual(text);
		expect(obj.from).toEqual(from);

	})


});