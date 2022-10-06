import gidPkg from 'graphql-iso-date';

import taskResolvers from './taskResolvers.js';
import userResolvers from './userResolvers.js';

const { GraphQLDateTime } = gidPkg;

const customDateScalarResolver = {
  Date: GraphQLDateTime,
};

const resolvers = [customDateScalarResolver, userResolvers, taskResolvers];

export default resolvers;
