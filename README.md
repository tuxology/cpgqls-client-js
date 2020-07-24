# cpgqls-client

`cpgqls-client` is a simple Javascript library for communicating with an instance of a Code Property Graph server

## Install

```bash
npm install @tuxology/cpgqls-client
```

## Use

Make sure Joern has been started in server mode via `./joern --server`

```js
client = new CpgqlsClientLib.CpgqlsClient('localhost:8080');
client.execute(
  new CpgqlsClientLib.JoernQuery(
    'cpg.method.name.l',
      data => {
        console.log(data);
    },
  ), 
);
```

## Build

```bash
yarn install
yarn build
```


## Testing

Start Chrome/Chromium with CORS disabled and make sure Joern server is running

```bash
chrome --disable-web-security --user-data-dir="/tmp" &
yarn serve
```

Click on the served page. Browse to `index.html` page in `examples` directory and connect to `localhost:8080`
Fire up some Joern queries as you do in Joern shell. Refer Joern Docs for more info.
