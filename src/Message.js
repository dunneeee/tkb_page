class Message {
  static formatMessage(req) {
    const result = [];
    const entries = req.body.entry;
    for (let entry of entries) {
      let messaging = entry.messaging;
      for (let message of messaging) {
        let senderId = message.sender.id;
        let m = message?.message?.text;
        result.push({
          senderId,
          message: m || null,
        });
      }
    }
    return result;
  }
}

module.exports = Message;
