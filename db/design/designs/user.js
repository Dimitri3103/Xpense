module.exports = {
    _id: "_design/user",
    views: {
        "list": {
            map: function (doc) {
                if (doc._id.startsWith("user:")) {
                    emit(doc.orgId, {
                        _id: doc._id,
                        orgId: doc.orgId,
                        uid: doc.uid,
                        displayName: doc.displayName,
                        firstName: doc.firstName,
                        lastName: doc.lastName,
                        email: doc.email,
                        emailVerified: doc.emailVerified,
                        photoURL: doc.photoURL,
                        phoneNumber: doc.phoneNumber,
                        defaultCurrency: doc.defaultCurrency,
                        language: doc.language,
                        isCompany: doc.isCompany,
                        roleName: doc.roleName
                    });
                }
            }.toString(),
        },
    },
    updates: {
        upsert: function (doc, req) {
            const requestBody = JSON.parse(req.body);

            const {
                orgId,
                uid,
                displayName,
                firstName,
                lastName,
                email,
                emailVerified,
                photoURL,
                phoneNumber,
                defaultCurrency,
                language,
                isCompany,
                roleName

            } = requestBody;

            if (!doc) {
                if ("id" in req && req["id"]) {
                    // create new document
                    return [
                        {
                            '_id': req["id"],
                            'orgId': orgId,
                            'uid': uid,
                            'displayName': displayName,
                            'firstName': firstName,
                            'lastName': lastName,
                            'email': email,
                            'emailVerified': emailVerified,
                            'photoURL': photoURL,
                            'phoneNumber': phoneNumber,
                            'defaultCurrency': defaultCurrency,
                            'language': language,
                            'isCompany': isCompany,
                            'roleName': roleName

                        },
                        "200",
                    ];
                }
                // change nothing in database
                return [null, "No doc provided"];
            }
            if (orgId) {
                doc['orgId'] = orgId;
            }
            if (uid) {
                doc["uid"] = uid;
            }
            if (displayName) {
                doc["displayName"] = displayName;
            }
            if (firstName) {
                doc["firstName"] = firstName;
            }
            if (lastName) {
                doc["lastName"] = lastName;
            }
            if (email) {
                doc["email"] = email;
            }
            if (emailVerified) {
                doc["emailVerified"] = emailVerified;
            }
            if (displayName) {
                doc["displayName"] = displayName;
            }
            if (photoURL) {
                doc["photoURL"] = photoURL;
            }
            if (phoneNumber) {
                doc["phoneNumber"] = phoneNumber;
            }
            if (defaultCurrency) {
                doc["defaultCurrency"] = defaultCurrency;
            }
            if (language) {
                doc["language"] = language;
            }
            if (isCompany) {
                doc["isCompany"] = isCompany;
            }
            if (roleName) {
                doc["roleName"] = roleName;
            }

            return [doc, "200"];
        },
    },
};
