var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();
var fs = require('fs');
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res, next) {
	console.log(req.body);
 	res.json(postPack({token:'this is token', expireIn: 1212121212121, userId:2121233445}));	   
});

router.post('/register', function (req, res, next) {
	console.log(req.body);
	res.json(postPack({token:'this is token', expireIn: 1212121212121, userId:2121233445}));
});

router.get('/message', function(req, res, next) {
	res.json(getPack([{avatar:'this is avatar', name: 'this is name', userId: 121212121, content:'this is content', time: 212121121}, {avatar:'this is avatar', name: 'this is name', userId: 221212121, content:'this is content', time: 212121121}]));
});

router.get('/channels', function(req, res, next) {
	if(req.query.mode == 0) {
        var json = getPack([
            {name: 'this is name', id: 12131221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]},
            {name: 'this is name', id: 12111221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]},
            {name: 'this is name', id: 15121221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]},
            {name: 'this is name', id: 12121221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]}
        ]);
		res.json(json)
	} else {
		res.json(getPack([
            {name: 'this is name', channels:[
                {name: 'this is name', id: 12131221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]},
                {name: 'this is name', id: 12131221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]}
            ]},
            {name: 'this is name', channels:[
                {name: 'this is name', id: 12131221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]},
                {name: 'this is name', id: 12131221212, avatar: 'this is avatar', type:2, desc:'this is desc', runReadNumber:5, label:[1,2,3,4,5,6]}
            ]}]));
	}
});

router.get('/user/:userId', function(req, res, next) {
    res.json(postPack(
        {id: 1212345,
            avatar: 'this is avatar',
            name: 'this is name',
            postedNmauber: 1212134667,
            channelNumber:12,
            joinTime: 121212,
            activities:[
                {
                    id:222121,
                    name: 'this is name',
                    type:4,
                    content:'this is content',
                    time:1212466
                },
                {
                    id:133321,
                    name: 'this is name',
                    type:4,
                    content:'this is content',
                    time:1212466
                },{
                    id:111121,
                    name: 'this is name',
                    type:4,
                    content:'this is content',
                    time:1212466
                }
            ]
        }
    ));
});

router.get('/createChannelPermission', function(req, res, next) {
    res.json(postPack({canCreate:true}));
});

router.get('/channelType', function(req, res, next) {
    res.json(getPack([
        {
            id: 1,
            name:'this is name',
            avatar: 'this is avatar'
        },
        {
            id: 2,
            name:'this is name',
            avatar: 'this is avatar'
        },
        {
            id: 3,
            name:'this is name',
            avatar: 'this is avatar'
        }
    ]));
});

router.get('/label', function(req, res, next) {
    res.json(getPack([
        {
            id:1,
            name:'this is name'
        },
        {
            id:2,
            name:'this is name'
        },
        {
            id:3,
            name:'this is name'
        }
    ]));
});

router.get('/example/1', function(req, res, next) {
    res.json(getPack([{ method: 'GET1' }, {method: 'GET2'},  {method: 'GET3'},  {method: 'GET4'}]))
});

router.get('/example/2', function(req, res, next) {
	res.json(postPack({method :'GET'}))
});

router.post('/example/1', function(req, res, next) {
    console.log(req.body);
    res.json(postPack({method: 'POST'}));
});

router.post('/example/2', function (req, res, next) {
	console.log(req.body);
	res.json(getPack([{method : 'POST'}]));
})

router.post('/upload', multipartMiddleware, function(req, res) {
    console.log(req.body, req.files);
    for(var key in req.files) {
        var file = req.files[key];
        var newPath = "./" + Math.round(new Date().getTime()) + file.originalFilename;
        console.log(newPath);
        fs.rename(file.path, newPath);
    }
    res.json(postPack({method: 'multipart'}));
    // don't forget to delete all req.files when done
});

router.put('/example', function(req, res, next) {
    console.log(req.body);
    res.json(postPack({method: 'PUT'}));
})

router.delete('/example', function(req, res, next){
    res.json(getPack([{method: 'DELETE'}]));
})

function getPack(data) {
	var a = new Array();
	for (var index in data) {
		a[index] = {
			id : "/example/" + index,
			model:data[index]
		}
	}
    return {
        version:"1.0",
        encoding:"UTF-8",
        errorCode:"200",
        errorMsg: "100000",
		feed: {
			id: "/example",
            entities: a
        }
    }
}

function postPack(data) {
    return {
        version:"1.0",
        encoding:"UTF-8",
        errorCode:"200",
        errorMsg: "OK",
		entity: {
			id:"/example",
			model:data
		}
    }
}

module.exports = router;
