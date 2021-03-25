CREATE CONSTRAINT email_unique ON (user:User) ASSERT user.email IS UNIQUE;
CREATE CONSTRAINT request_unique ON (r:Request) ASSERT (r.fromUserId, r.toUserId, r.type) IS NODE KEY;
CALL db.index.fulltext.createNodeIndex('usersSearch', ['User'], ['email', 'firstName', 'lastName', '_keywordsStr']);
