module.exports = {
    _id: "_design/sheet",
    views: {
        list: {
            map: function (doc) {
                if (doc._id.startsWith('sheet:')) {
                    if (doc.orgId)
                        emit(doc.orgId,
                            {
                                _id: doc._id, orgId: doc.orgId, userId: doc.userId, type: doc.type, label: doc.label,
                                description: doc.description, creationDate: doc.creationDate, submittedOn: doc.submittedOn,
                                status: doc.status, exported: doc.exported, total: doc.total,
                                approbations: doc.approbations
                            });
                }
            }.toString()
        },
        sheetsByUserId: {
            map: function (doc) {
                if (doc._id.startsWith('sheet:')) {
                    emit(doc.userId, {
                        _id: doc._id, orgId: doc.orgId, userId: doc.userId, type: doc.type, label: doc.label,
                        description: doc.description, creationDate: doc.creationDate, submittedOn: doc.submittedOn,
                        status: doc.status, exported: doc.exported, total: doc.total,
                        approbations: doc.approbations
                    });
                }
            }.toString()
        }

    },
    updates: {
        upsert: function (doc, req) {
            const requestBody = JSON.parse(req.body);
            const {
                orgId,
                userId,
                type,
                label,
                description,
                status,
                creationDate,
                submittedOn,
                exported,
                total
            } = requestBody;

            if (!doc) {
                if ('id' in req && req['id']) {
                    const { label, orgId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'userId': userId,
                            'label': label,
                            'description': description,
                            'orgId': orgId,
                            'type': type,
                            'status': status,
                            'creationDate': creationDate,
                            'submittedOn': submittedOn,
                            'exported': exported,
                            'total': total
                        }, '200']
                }
                return [null, 'No doc provided']
            }
            if (userId) {
                doc['userId'] = userId;
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            if (type) {
                doc['type'] = type;
            }
            if (label) {
                doc['label'] = label;
            }
            if (description) {
                doc['description'] = description;
            }
            if (status) {
                doc['status'] = status;
            }
            if (creationDate) {
                doc['creationDate'] = creationDate;
            }
            if (submittedOn) {
                doc['submittedOn'] = submittedOn;
            }
            if (exported) {
                doc['exported'] = exported;
            }
            if (total) {
                doc['total'] = total;
            }
            return [doc, '200']
        }
    }
}