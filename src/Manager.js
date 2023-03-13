class Manager {
  constructor(listUser = {}) {
    this.listUser = listUser;
  }
  has(id) {
    return !!this.listUser[id];
  }
  get(id) {
    return this.has(id) ? this.listUser[id] : null;
  }
  add(id, data) {
    if (!this.has(id)) this.listUser[id] = data;
  }
  delete(id) {
    if (this.has(id)) delete this.listUser[id];
  }
  update(id, newData) {
    if (this.has(id)) this.listUser[id] = newData;
  }
  getListId() {
    return Object.keys(this.listUser);
  }
}

module.exports = Manager;
