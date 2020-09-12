import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:3333',
});

const test = async () => {
  const user = await client.post('/users', {
    name: 'Vini',
    email: 'vini@gmail.com',
    phone_number: '998457232',
    password: '123456',
  });

  const session = await client.post('/sessions', {
    email: 'vini@gmail.com',
    password: '123456',
  });
  console.log(session.data.user.id);
  console.log(session.data.token);

  client.defaults.headers.common = {
    Authorization: `bearer ${session.data.token}`,
  };

  const church = await client.post('/churchs', {
    name: 'Coração',
    admin_id: session.data.user.id,
  });

  const event = await client.post('/events', {
    name: 'Missa',
    church_id: church.data.id,
    max_reservations: 50,
  });
  console.log('event', event.data.id);
};

test();
