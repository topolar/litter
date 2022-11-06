/**
 * Used for local testing
 */
import httpServer from './express';

httpServer.listen(4000,()=>{
    console.log(`🚀  Server ready at: localhost:4000`);
});