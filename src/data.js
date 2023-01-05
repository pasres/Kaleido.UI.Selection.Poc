export default {
  async getContacts(count = 100, minAge = 12, maxAge = 100) {
    const response = await fetch(
      `https://my.api.mockaroo.com/contacts.json?key=1bb25b60&count=${count}&min_age=${minAge}&max_age=${maxAge}`
    );
    const json = await response.json();
    return json;
  }
};
