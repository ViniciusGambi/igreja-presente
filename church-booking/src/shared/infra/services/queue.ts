import 'reflect-metadata';
import { createConnection } from 'typeorm';

import { container } from 'tsyringe';
import '@shared/container/';
import PostNotSentMessagesService from '@modules/messages/services/PostNotSentMessagesService';

async function main(){
  const postNotSentMessagesService = container.resolve(PostNotSentMessagesService);
  while (true) {
    await postNotSentMessagesService.execute();
  }
}

createConnection().then(async connection => {
  console.log("Connected to DB - Queue");
  main();
});






