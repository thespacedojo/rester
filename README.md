Rester
======

##Usage:

```sh
meteor add meteorclub:rester
```

Rester will create a route for every publicly accessible meteor method in your app.

If the meteor method takes no parameters, the the route will be:

`/<meteorMethodName>`

And if the meteor method does take parameters, the route will be:

`/<meteorMethodName>/[param1, {obj}, 1]`

