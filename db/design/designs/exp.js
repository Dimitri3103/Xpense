module.exports = {
    _id: "_design/exp",
    views: {
        "by-sheet": {
            map: function (doc) {
                if (doc._id.startsWith('exp:') && doc.sheetId) {
                    emit(doc.sheetId, {
                        _id: doc._id, sheetId: doc.sheetId, type: doc.type, date: doc.date,
                        amount: doc.amount, currency: doc.currency, tax: doc.tax, taxAmount: doc.taxAmount,
                        attachments: doc.attachments, label: doc.label, payMethod: doc.payMethod, category: doc.category
                    });
                }
            }.toString()
        }
    },
    updates: {
        "add-attachment": function (doc, req) {
            if (!doc) {
                return [null, '404']
            }

            const { name, originalName } = JSON.parse(req.body);

            doc.attachments.push({
                name: name,
                originalName: originalName
            });

            return [doc, '200'];
        },
        upsert: function (doc, req) {
            const requestBody = JSON.parse(req.body);
            const {
                sheetId,
                date,
                type,
                amount,
                currency,
                tax,
                taxAmount,
                attachments,
                label,
                payMethod,
                category

            } = requestBody;

            if (!doc) {
                if ('id' in req && req['id']) {
                    // create new document
                    return [
                        {
                            '_id': req['id'],
                            'sheetId': sheetId,
                            'date': date,
                            'type': type,
                            'amount': amount,
                            'currency': currency,
                            'tax': tax,
                            'taxAmount': taxAmount,
                            'attachments': attachments,
                            'label': label,
                            'payMethod': payMethod,
                            'category': category
                        }, '200']
                }
                // change nothing in database
                return [null, 'No doc provided']
            }


            if (sheetId) {
                doc['sheetId'] = sheetId;
            }
            if (date) {
                doc['date'] = date;
            }
            if (type) {
                doc['type'] = type;
            }
            if (amount) {
                doc['amount'] = amount;
            }
            if (currency) {
                doc['currency'] = currency;
            }
            if (tax) {
                doc['tax'] = tax;
            }
            if (taxAmount) {
                doc['taxAmount'] = taxAmount;
            }
            if (attachments) {
                doc['attachments'] = attachments;
            }
            if (label) {
                doc['label'] = label;
            }
            if (payMethod) {
                doc['payMethod'] = payMethod;
            }
            if (category) {
                doc['category'] = category;
            }

            return [doc, '200']
        }
    }
}
