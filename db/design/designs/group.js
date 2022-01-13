module.exports = {
    _id: '_design/grp',
    views: {
        all: {
            map: function (doc) {
                if (doc._id.startsWith('grp:')) {
                    emit(doc.orgId, {
                        _id: doc._id, name: doc.name, orgId: doc.orgId,
                        expenseTypes: doc.expenseTypes, members: doc.members, supervisors: doc.supervisors
                    });
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
                    const { name, orgId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'name': name,
                            'orgId': orgId
                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }

            const { name, members, supervisors, expenseTypes, orgId } = requestBody;

            if (name) {
                doc['name'] = name;
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            if (members) {
                doc['members'] = members;
            }
            if (supervisors) {
                doc['supervisors'] = supervisors;
            }
            if (expenseTypes) {
                doc['expenseTypes'] = expenseTypes;
            }
            return [doc, '200']
        }
    }
}