module.exports = {
    _id: "_design/inv",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith('inv:')) {
                    emit(doc.orgId, { _id: doc._id, email: doc.email, roleId: doc.roleId, groupId: doc.groupId, status: doc.status, orgId: doc.orgId });
                }
            }.toString()
        }
    },
    updates: {
        upsert: function (doc, req) {
            const requestBody = JSON.parse(req.body);
            if (!doc) {
                if ('id' in req && req['id']) {
                    // create new document
                    const { email, roleId, groupId, status, orgId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'email': email,
                            'roleId': roleId,
                            'groupId': groupId,
                            'status': status,
                            'orgId': orgId

                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }
            const { email, roleId, groupId, status, orgId } = requestBody;
            if (email) {
                doc['email'] = email;
            }
            if (roleId) {
                doc['roleId'] = roleId;
            }
            if (groupId) {
                doc['groupId'] = groupId;
            }
            if (status) {
                doc['status'] = status;
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            return [doc, '200']
        }
    }
}