# Karicca.me

Personal portfolio site (frontend) that uses Tumblr as a CMS.

## Development

At least the following versions of node and npm should be installed on the machine:

```
$ node -v
v10.6.0

$ npm -v
6.1.0
```

### Clone

```sh
git clone git@github.com:scriptype/karicca.me.git
```

### Setup

```sh
cd karicca.me
npm i
```

### Running in local

```sh
npm run dev
```

Don't change `.html` files directly and anything inside `dist` folder.

## Deployment

After making new commits to master branch, just `git push`. `build` script will run in Travis to prepare the final static output.
