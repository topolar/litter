# NestJS Litter Backend

## Requirements
- [x] Create database schema of the post (title, content, picture, ..)
- [x] Create CRUD API for the posts

## Additional implementation
- [x] Users management
- [x] Authentification by Bearer JWT token
- [x] Support for Roles. For example: Only admin can query all users


## `.env` settings
- `MONGODB_URI` - MongoDB URI
- `JWT_SECRET` - Secret for JWT signing

## Development
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment
Deployment is done automatically to Vercel by making push to GITHUB MAIN.
