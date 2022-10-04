import debug from 'debug';
import app from './src/app.js';
import appConfig from './src/appConfig.js';
import APServer from './src/gql/index.js';

const indexDebug = debug('app:index ->');
const { port } = appConfig;


(async ()=>{
  indexDebug('Starting the server');
  app.listen(port, () => {
    try {
      indexDebug(`Server is running on the http://localhost:${port}`);
      indexDebug(`Graphql Server Endpoint  http://localhost:${port}${APServer.graphqlPath}`);
    } catch (err) {
      indexDebug(err.message);
    }
  });
})();
