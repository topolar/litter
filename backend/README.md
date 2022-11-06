# Litter Backend Imlementation
Production version is available at https://litter-backend.vercel.app

## Requirements
- [x] Create database schema of the post (title, content, picture, ..)
- [x] Create CRUD API for the posts

## Additional implementation
- [x] Users management
- [x] Authentification by Bearer JWT token
- [x] Support for Roles. For example: Only admin can query all users

## Development
- `npm start` - starts dev server on port 4000
- `npm codegen` - generates GraphQL helpers
- `npm prismagen` - compiles PRISMA schema
- `npm gen` - runs prismagen & codegen

## Deployment
Deployment is done automatically to Vercel by making push to GIT MASTER.