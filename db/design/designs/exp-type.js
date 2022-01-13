module.exports = {
    _id: "_design/expt",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith('expt:')) {
                    emit(doc.orgId, { _id: doc._id, code: doc.code, type: doc.type, multiplicator: doc.multiplicator, i18n: doc.i18n, status: doc.status, attachmentRequired: doc.attachmentRequired, orgId: doc.orgId });
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
                    const { code, type, multiplicator, i18n, status, attachmentRequired, orgId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'code': code,
                            'type': type,
                            'multiplicator': multiplicator,
                            'i18n': i18n,
                            'status': status,
                            'attachmentRequired': attachmentRequired,
                            'orgId': orgId

                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }
            const { code, type, multiplicator, i18n, status, attachmentRequired, orgId } = requestBody;
            if (code) {
                doc['code'] = code;
            }
            if (type) {
                doc['type'] = type;
            }
            if (multiplicator) {
                doc['multiplicator'] = multiplicator;
            }
            if (i18n) {
                doc['i18n'] = i18n;
            }
            if (status) {
                doc['status'] = status;
            }
            if (attachmentRequired) {
                doc['attachmentRequired'] = attachmentRequired;
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            return [doc, '200']
        }
    }
}