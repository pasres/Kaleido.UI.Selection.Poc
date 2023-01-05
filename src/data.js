export default {
  async getContacts(count = 100, minAge = 12, maxAge = 100) {
    const response = await fetch(
      'http://localhost:8087/api/selection?query=c.status%20%3D%202',
      {
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': '0123456789',
          'x-tenant-id': '8aa1006d-0cfd-4a00-a84e-237f8a1f223d',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    const json = await response.json();
    return json;
  },
};
