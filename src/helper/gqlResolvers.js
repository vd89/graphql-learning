const skip = undefined;
/**
 * Left-first composition for methods of any type.
 *
 * @param {[Function]} ...funcs Resolver implementations.
 * @return {Promise}.
 */
export const combine = (...funcs) => (...args) =>
  funcs.reduce(
      (prevPromise, resolver) =>
        prevPromise.then((prev) => (prev === skip ? resolver(...args) : prev)),
      Promise.resolve(),
  );


export const isAuth = (_, __, { email }) => {
  if (!email) {
    throw new Error('Access Denied! please login to continue');
  }
  return skip;
};
