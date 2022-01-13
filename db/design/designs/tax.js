module.exports = {
    _id: "_design/tx",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith('tx:')) {
                    emit(doc.orgId, { _id: doc._id, code: doc.code, i18n: doc.i18n, defaultRate: doc.defaultRate, orgId: doc.orgId });
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
                    const { code, i18n, defaultRate, orgId } = requestBody;
                    return [
                        {
                            '_id': req['id'],
                            'code': code,
                            'i18n': i18n,
                            'defaultRate': defaultRate,
                            'orgId': orgId

                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }
            const { code, i18n, defaultRate, orgId } = requestBody;

            if (code) {
                doc['code'] = code;
            }
            if (i18n) {
                doc['i18n'] = i18n;
            }
            if (defaultRate) {
                doc['defaultRate'] = defaultRate;
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            return [doc, '200']
        }
    }
}