# Litter Frontend
Production version is available at https://litter-frontend.vercel.app

## Frontend Requirements
- [x] Display a simple list of all posts, allow deleting each post.
      **Deletion is available in Post Popup menu!** 
- [x] Create a detail page of one particular post. 
      **Click to Share Icon to open detail page!**
- [x] Create form to add a post to the list

## Additional Implementation
- [x] Support for Sign-in by Firebase Authentification / Google Sign-in
- [x] Server Side Rendering (Thanks to NextJS)

## `.env` settings
- `NEXT_PUBLIC_GRAPHQL_URL` - url to GraphQL backend
- `FIREBASE_ADMIN` - Firebase Admin Config 
- `JWT_SECRET` - secret for JWT signign

## Development
- `npm run dev` - Start development server
- `npm run codegen` - Generate GraphQL helper

## Deployment
Deployment is done automatically to Vercel by making push to GIT MAIN.