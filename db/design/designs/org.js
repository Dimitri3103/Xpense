module.exports = {
  _id: "_design/org",
  views: {
    find: {
      map: function (doc) {
        if (doc._id.startsWith('org:')) {
          emit(doc._id, {
            _id: doc._id, userId: doc.userId,
            name: doc.name, contact: doc.contact, status: doc.status, address: doc.address
          });
        }
      }.toString()
    }
  },
  updates: {
    upsert: function (doc, req) {
      const requestBody = JSON.parse(req.body);

      if (!doc) {
        if ("id" in req && req["id"]) {
          // create new document
          const { userId, name, contact, status, address } = requestBody;
          return [
            {
              '_id': req["id"],
              'userId': userId,
              'name': name,
              'contact': contact,
              'status': status,
              'address': address,
            }, "200",]
        }
        // change nothing in database
        return [null, "No doc provided"];
      }

      const { userId, name, address, contactName, phone, email } = requestBody;

      if (userId) {
        doc['userId'] = userId;
      }
      if (name) {
        doc['name'] = name;
      }
      if (address) {
        doc['address'] = address;
      }
      if (contactName) {
        doc['contact']['name'] = contactName;
      }
      if (phone) {
        doc['contact']['phone'] = phone;
      }
      if (email) {
        doc['contact']['email'] = email;
      }
      return [doc, '200'];
    }
  }
}