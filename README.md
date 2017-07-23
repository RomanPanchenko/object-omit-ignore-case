# What you'll get?

### Analog for [lodash "omit"](https://lodash.com/docs/4.17.4#omit), but with possibility to ignore case of omitted properties

**1. Install the package**

```sh
npm install object-omit-ignore-case --save
```

**2. Use it as lodash omit, but put '/i' at the end of each property which case should be ignored**
```js
var req = {
    headers: {
        'X-HTTP-Header': 'value',
        Auth: 'value'
    },
    body: {
        LOG: {
            'Body-Param1': 1,
            'Body-Param2': 2,
        }
    }
};

var omit_ic = require('object-omit-ignore-case');

var objectToLog = omit_ic(req, ['headers.x-http-header/i', 'body.log/i.body-param1/i']);
/*
objectToLog = {
    headers: {
      Auth: 'value'
    },
    body: {
        LOG: {
            Body-Param2: 2
        }
    }
}
*/


```

### That's it!
