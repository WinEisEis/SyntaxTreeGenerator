var test = {"hello":{"foo":{"bar":"world"}}};

var proxy = ObservableSlim.create(test, true, function(changes) {
	console.log(JSON.stringify(changes));
});

function traverseUp(childObj) {
	console.log(JSON.stringify(childObj.__getParent())); // prints out test.hello: {"foo":{"bar":"world"}}
	console.log(childObj.__getParent(2)); // attempts to traverse up two levels, returns undefined because test.hello does not have a parent object
};

traverseUp(proxy.hello.foo);


//[{"name":"S","children":[{"name":"NP","children":[{"name":"PPRS ฉัน"}]},{"name":"VP","children":[{"name":"VACT กิน"},{"name":"NP","children":[{"name":"NCMN ข้าว"}]}]}]}]